<?php

define ("SP_ADMIN",5);
define ("SP_MANAGE",4);
define ("SP_EDIT",3);
define ("SP_ADD",2);
define ("SP_VIEW",1);
date_default_timezone_set('UTC');
function userIP(){
//  return $_SERVER['REMOTE_ADDR']?:($_SERVER['HTTP_X_FORWARDED_FOR']?:$_SERVER['HTTP_CLIENT_IP']);
  return array(@$_SERVER['REMOTE_ADDR']?:'',@$_SERVER['HTTP_X_FORWARDED_FOR']?:'',@$_SERVER['HTTP_CLIENT_IP']?:'');
}

function userSalt(){
  global $db0;
  $ip = userIP();
  $salt = md5(uniqid());
  $created = date('Y/m/d H:i:s');
  if ($stmt = $db0->prepare("INSERT INTO VERIFY (salt,ip0,ip1,ip2,created_at) VALUES ('$salt',:ip0,:ip1,:ip2,'$created')")) {
    $stmt->bindValue(':ip0',$ip[0], PDO::PARAM_STR);
    $stmt->bindValue(':ip1',$ip[1], PDO::PARAM_STR);
    $stmt->bindValue(':ip2',$ip[2], PDO::PARAM_STR);
    $stmt->execute();
    return $salt;
  }
}

function userVerify($username,$salt,$salted){
  global $db0;
  $ip = userIP();
  $sel = 'select name,email,display,signname,detail,password from user where name=:username;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (md5($user['password'] . $salt)==$salted){
      $sel = 'update verify set user=:username where ip0=:ip0 and ip1=:ip1 and ip2=:ip2 and salt=:salt;';
      try {
        $stmt = $db0->prepare($sel);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->bindParam(':ip0', $ip[0], PDO::PARAM_STR);
        $stmt->bindParam(':ip1', $ip[1], PDO::PARAM_STR);
        $stmt->bindParam(':ip2', $ip[2], PDO::PARAM_STR);
        $stmt->bindParam(':salt', $salt, PDO::PARAM_STR);
        $exec = $stmt->execute();
        if ($stmt->rowCount()==0) {
          haltUnauthorized("Unable to verify user" . $ip[1]);
        }
      } catch (PDOException $e) {
        haltValidation($e->getCode() . ' ' . $e->getMessage());
      }
      unset($user['password']);
      return $user;
    } else {
      haltUnauthorized("Invalid username or password");
    }
  } catch (PDOException $e) {
    haltValidation($e->getCode() . ' ' . $e->getMessage());
  }   
}

function userVerified($salt){
  global $db0;
  $ip = userIP();
  $sel = 'select user from verify where salt=:salt and ip0=:ip0 and ip1=:ip1 and ip2=:ip2;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':salt', $salt, PDO::PARAM_STR);
    $stmt->bindParam(':ip0', $ip[0], PDO::PARAM_STR);
    $stmt->bindParam(':ip1', $ip[1], PDO::PARAM_STR);
    $stmt->bindParam(':ip2', $ip[2], PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
      return $user['user'];
    }
  } catch (PDOException $e) {
  }   
  return '';
}

function userSecurity($user){
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
  return '';
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

function userTranslate($user){
  global $db;
  $sel = 'select language, approved from translator where user=:user;';
  try {
    $stmt = $db->prepare($sel);
    $stmt->bindParam(':user', $user, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($user) {
      $langs = array();
      foreach ($user as $i=>$row){
        $langs[$row['language']] = $row['approved'];
      }
      return $langs;
    }
  } catch (PDOException $e) {
  }   
  return '';
}

?>
