<?php

define ("SP_ADMIN",5);
define ("SP_MANAGE",4);
define ("SP_EDIT",3);
define ("SP_ADD",2);
define ("SP_VIEW",1);
define ("SP_NONE",0);
date_default_timezone_set('UTC');

function collectionRights($collection){
  global $db0;
  $sel = 'select view_pass, add_pass, edit_pass from collection where name=:collection;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':collection', $collection, PDO::PARAM_STR);
    $stmt->execute();
    $results = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($results) {
      return $results;
    }
  } catch (PDOException $e) {
  }
  $return = array();
  $return['view_pass'] = 0;
  $return['add_pass'] = 1;
  $return['edit_pass'] = 1;
  return $return;
}

function collectionOwner($collection){
  global $db0;
  $sel = 'select user from collection where name=:collection;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':collection', $collection, PDO::PARAM_STR);
    $stmt->execute();
    $results = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($results) {
      return $results['user'];
    }
  } catch (PDOException $e) {
  }
  return 'admin';
}

function passRequired($collection,$right){
  if ($right==SP_ADMIN) return SP_ADMIN;
  if ($right==SP_MANAGE) return SP_MANAGE;
  $rights = collectionRights($collection);
  if ($right==SP_EDIT && !$rights['edit_pass']) $right--;
  if ($right==SP_ADD && !$rights['add_pass']) $right--;
  if ($right==SP_VIEW && !$rights['view_pass']) $right--;
  return $right;
}

function rightsCheck($collection,$pass,$right,$ik=false){
  $required = passRequired($collection,$right);
  if (!$required) return true;
  $rights = userRights($collection,$pass);
  if ($rights>=$required){
    return true;
  } else {
    if ($required==SP_EDIT && $ik){
      $db = collection_db($collection);
      $user = userVerified($pass,1);
      try {
        $sql = 'SELECT user from entry where user=:user and ';
        if(is_int($ik)){
          $sql .= 'id=:id;';
          $stmt = $db->prepare($sql);
          $stmt->bindParam(':id', $ik, PDO::PARAM_INT);
        } else {
          $sql .= 'key=:key';
          $stmt = $db->prepare($sql);
          $stmt->bindParam(':key', $ik, PDO::PARAM_STR);
        }
        $stmt->bindParam(':user', $user, PDO::PARAM_STR);
        $stmt->execute();
        $entries = $stmt->fetchAll(PDO::FETCH_CLASS);
        if(count($entries)){
          return true;
        }
      } catch (PDOException $e) {
        haltBadRequest($e->getCode() . ' ' . $e->getMessage());
      }  
    } else if ($required==SP_MANAGE && !$ik){
      $user = userVerified($pass);
      $owner = collectionOwner($collection);
      if ($owner == $user) {
        return true;
      }
    }
    haltForbidden();
  }
}

function userIP(){
  //  return $_SERVER['REMOTE_ADDR']?:($_SERVER['HTTP_X_FORWARDED_FOR']?:$_SERVER['HTTP_CLIENT_IP']);
  return array(@$_SERVER['REMOTE_ADDR']?:'',@$_SERVER['HTTP_X_FORWARDED_FOR']?:'',@$_SERVER['HTTP_CLIENT_IP']?:'');
}

function userPass(){
  global $db0;
  $ip = userIP();
  $pass = md5(uniqid());
  $created = TimestampNow();
  if ($stmt = $db0->prepare("INSERT INTO VERIFY (pass,ip0,ip1,ip2,created_at) VALUES ('$pass',:ip0,:ip1,:ip2,'$created')")) {
    $stmt->bindValue(':ip0',$ip[0], PDO::PARAM_STR);
    $stmt->bindValue(':ip1',$ip[1], PDO::PARAM_STR);
    $stmt->bindValue(':ip2',$ip[2], PDO::PARAM_STR);
    $stmt->execute();
    $return = array();
    $return['pass'] = $pass;
    $return['ip'] = $ip[2] ?: ($ip[1] ?: $ip[0]);
    return $return;
  }
}

function userVerify($username,$pass,$validated){
  global $db0;
  //  if (!$username) return;
  $ip = userIP();
  $sel = 'select name,email,display,signname,detail,password, security, country, signed, voiced, interface, dictionary, literature, fingerspell, alphabet, keyboard from user where name=:username;';
  $stmt = $db0->prepare($sel);
  $stmt->bindParam(':username', $username, PDO::PARAM_STR);
  $stmt->execute();
  $user = $stmt->fetch(PDO::FETCH_ASSOC);
  if (md5($user['password'] . $pass)==$validated){
    $sel = 'update verify set user=:username where ip0=:ip0 and ip1=:ip1 and ip2=:ip2 and pass=:pass;';
    try {
      $stmt = $db0->prepare($sel);
      $stmt->bindParam(':username', $username, PDO::PARAM_STR);
      $stmt->bindParam(':ip0', $ip[0], PDO::PARAM_STR);
      $stmt->bindParam(':ip1', $ip[1], PDO::PARAM_STR);
      $stmt->bindParam(':ip2', $ip[2], PDO::PARAM_STR);
      $stmt->bindParam(':pass', $pass, PDO::PARAM_STR);
      $exec = $stmt->execute();
    } catch (PDOException $e) {
      haltBadRequest($e->getCode() . ' ' . $e->getMessage());
    }
    if ($stmt->rowCount()==0) {
      haltForbidden("Unable to verify user" . $ip[1]);
    }
    unset($user['password']);
    $user['collections'] = userCollection($username);
    return $user;
  } else {
    haltForbidden("Invalid username or password ");
  }
}

function userRights($collection,$pass){
  $user = userVerified($pass);
  if ($user) {
    $default = userDefault($user);
    $specific = userSpecific($user,$collection);
    return max($default,$specific);
  } else {
    return SP_NONE;
  }
}

function userVerified($pass,$named=false){
  global $db0;
  $ip = userIP();
  $sel = 'select user from verify where pass=:pass and ip0=:ip0 and ip1=:ip1 and ip2=:ip2;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':pass', $pass, PDO::PARAM_STR);
    $stmt->bindParam(':ip0', $ip[0], PDO::PARAM_STR);
    $stmt->bindParam(':ip1', $ip[1], PDO::PARAM_STR);
    $stmt->bindParam(':ip2', $ip[2], PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
      $username = $user['user'];
      $userip = $ip[2] ?: ($ip[1] ?: $ip[0]);
      return $username ?: ($named ? $userip : '');
    }
  } catch (PDOException $e) {
  }   
  return '';
}

function userDefault($user){
  global $db0;
  $sel = 'select security from user where name=:user;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':user', $user, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
      return $user['security'];
    }
  } catch (PDOException $e) {
  }   
  return SP_NONE;
}

function userSpecific($user,$collection){
  global $db0;
  $sel = 'select security from usercollection where user=:user and collection=:collection;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':user', $user, PDO::PARAM_STR);
    $stmt->bindParam(':collection', $collection, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
      return $user['security'];
    }
  } catch (PDOException $e) {
  }   
  return SP_NONE;
}

function userCollection($user){
  global $db0;
  $sel = 'select collection,security from usercollection where user=:user;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':user', $user, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($user) {
      $collections = array();
      foreach ($user as $i=>$row){
        $collections[$row['collection']] = $row['security'];
      }
      return $collections;
    }
  } catch (PDOException $e) {
  }   
  return '';
}

function userProfileUpdate($user,$profile){
  global $db0;

  $sql = "update user set ";
  $fields = ["email","display","signname","detail","country","signed","voiced","interface","dictionary","literature","fingerspell","alphabet","keyboard"];
  $vals = array();
  foreach ($fields as $field){
    if (isset($profile[$field])){
      $vals[] = $field . "=:" . $field;
    }
  }
  $sql .= implode(",",$vals);
  $sql .= " where name=:name;";
  try {
    $stmt = $db0->prepare($sql);
    foreach ($fields as $field){
      if (isset($profile[$field])){
        $stmt->bindParam(":" . $field, $profile[$field], PDO::PARAM_STR);
      }
    }
    $stmt->bindParam(":name", $user, PDO::PARAM_STR);

    $exec = $stmt->execute();
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }
  if ($stmt->rowCount()==0) {
    haltNotFound("Invalid user");
  }
}

function userPasswordUpdate($user,$old,$new){
  global $db0;

  if ($old=="username"){
    haltBadRequest();
  }
  $sql = "update user set password=:new where name=:name and password=:old;";
  try {
    $stmt = $db0->prepare($sql);
    $stmt->bindParam(":new", $new, PDO::PARAM_STR);
    $stmt->bindParam(":old", $old, PDO::PARAM_STR);
    $stmt->bindParam(":name", $user, PDO::PARAM_STR);

    $exec = $stmt->execute();
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }
  if ($stmt->rowCount()==0) {
    $sql = "update user set password=:new,temp='' where name=:name and temp=:old;";
    try {
      $stmt = $db0->prepare($sql);
      $stmt->bindParam(":new", $new, PDO::PARAM_STR);
      $stmt->bindParam(":old", $old, PDO::PARAM_STR);
      $stmt->bindParam(":name", $user, PDO::PARAM_STR);
  
      $exec = $stmt->execute();
    } catch (PDOException $e) {
      haltBadRequest($e->getCode() . ' ' . $e->getMessage());
    }
    if ($stmt->rowCount()==0) {
      haltBadRequest("Invalid user or password");
    }
  }
}

function userPasswordReset($user){
  global $db0;
  if (!$user){
    haltBadRequest();
  }

  $temp = md5(mt_rand());
  $sql = "update user set temp=:temp  where name=:name and temp='' or temp='username';";
  try {
    $stmt = $db0->prepare($sql);
    $stmt->bindParam(":temp", $temp, PDO::PARAM_STR);
    $stmt->bindParam(":name", $user, PDO::PARAM_STR);

    $exec = $stmt->execute();
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }
  if ($stmt->rowCount()==0) {
    $sel = 'select name from user where name=:name;';
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':name', $user, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user){
      haltNotFound("Invalid username");
    }
  }
}

function userNameLookup($email){
  global $db0;
  if (!$email){
    haltBadRequest();
  }

  $sql = "update user set temp='username' where email=:email;";
  try {
    $stmt = $db0->prepare($sql);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);

    $exec = $stmt->execute();
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }
  if ($stmt->rowCount()==0) {
    haltNotFound("Invalid email");
  }
}

function userEmailRequests(){
  global $db0;
  $sel = "select name, display, email, temp from user where temp!='';";
  try {
    $results = $db0->query($sel);
    $users = $results->fetchAll(PDO::FETCH_ASSOC);
    if ($users) {
      return $users;
    }
  } catch (PDOException $e) {
  }   
  return [];
}
?>
