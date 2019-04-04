<?php

function Timestamp($value="now"){
  $dt = new DateTime($value);
  $dt->setTimezone(new DateTimeZone('UTC'));
  return $dt->format('Y-m-d\TH:i:s\Z');
}

$db_security = dirname(__FILE__) . '/../data/security.db';
if (file_exists($db_security)){
  $db0 = new PDO('sqlite:' . $db_security);
  $db0->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} else {
  $db0 = false;
}

$db_file = dirname(__FILE__) . '/../data/iswa2010.db';
if (file_exists($db_file)){
  $db = new PDO('sqlite:' . $db_file );
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} else {
  $db = false;
}

function _sqliteRegex($string, $pattern, $ci) {
  if ($ci) $string = mb_strtolower($string,'UTF-8');
  $cnt = @preg_match($pattern, $string);
  if ($cnt===false){
    $pattern = preg_quote(substr($pattern,1,-1),'/');
    $cnt = @preg_match('/' . $pattern . '/', $string);
  }
  if ($cnt) {
    return true;
  } else if ($cnt===0) {
    return false;
  } else {
    haltBadRequest("invalid search pattern " . $pattern);
  }
}

function entry_orderby($sort,$default){
  $orderby = ' order by ' . $default;
  if ($sort){
    if ($sort[0]=='-') {
      $desc = 1; 
      $sort = substr($sort,1);
    } else {
      $desc = 0;
    }
    $orderby = ' order by entry.' . $sort;
    if ($desc) {
      $orderby .= ' desc'; 
    }
  }
  return $orderby;
}

function filter($filter,$valids){
  $params = array();
  if ($filter){
    $ops = ["<=",">=","!=","<",">","="];
    $filters = explode(',',$filter);
    foreach ($filters as $filter){
      foreach ($ops as $op){
        if (strpos($filter,$op)){
          $param = explode($op,$filter);
          if (in_array($param[0],$valids)){
            if ($op=="=" and strpos($filter,"%")){
              $op = "like";
            }
            $num = count($params);
//            $sel .= " and " . $param[0] . " " . $op . " :" . $param[0] . $num;
            $params[] =[$param[0] . ' ' .$op, ':' . $param[0] . $num, $param[1]];
          }
          break;
        }
      }
    }
  }
  return $params;
}

$collection_dbs = array();
function collection_db($collection){
  global $db0,$collection_dbs;
  if (array_key_exists($collection,$collection_dbs)){
    return $collection_dbs[$collection];
  } else {

    $collection_file = dirname(__FILE__) . '/../data/db/' . $collection . '.db';
    if (file_exists($collection_file)){
      $collection_db = new PDO('sqlite:' . $collection_file);
      $collection_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $collection_db->sqliteCreateFunction('regex', '_sqliteRegex', 3);
      $collection_dbs[$collection] = $collection_db;
      return $collection_db;
    } else {
      haltNotFound();
      $sel = 'SELECT code from collection_alt where alt=:collection;';
      try {
        $stmt = $db0->prepare($sel);
        $stmt->bindParam(':collection', $collection, PDO::PARAM_STR);
        $stmt->execute();
        $code = $stmt->fetch();
        if ($code){
          return collection_db($code[0]);
        } else {
          haltBadRequest('invalid collection code');
        }
      } catch (PDOException $e) {
        haltBadRequest($e->getCode() . ' ' . $e->getMessage());
      }  
  //      haltNoDatabase();
    }
  }
}

function lastModified($collection){
  $db = collection_db($collection);
  try {
    $sel = 'SELECT max(updated_at) from entry;';
    $result=$db->query($sel);
    $max = $result->fetchAll();
    return $max[0][0];
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function lastModifiedCollection(){
  global $db0;
  try {
    $sel = 'SELECT max(updated_at) from collection;';
    $result=$db0->query($sel);
    $max = $result->fetchAll();
    return $max[0][0];
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }
}

function collectionListing($name){
  $dir = 'data/db/';
  $ext = '.db';
  $out = [];
  if ($name){
    if (strpos($name,"*")!==false){
      $collections = $dir . $name . $ext;
      $files = glob($collections);
    } else {
      $collections = $dir . '*' . $name . '*' . $ext;
      $files = glob($collections);
    }
  } else {
    $collections = $dir . '*' . $ext;
    $files = glob($collections);
  }
  foreach ($files as $filename) {
    $out[] = str_replace($ext,'',str_replace($dir,'',$filename));
  }
  return $out;
}

function collectionStats($collection){
  $db = collection_db($collection);
  $return = array();

  $sel = 'SELECT count(*) from entry;';
  $results=$db->query($sel);
  $return['entries'] = $results->fetch(PDO::FETCH_COLUMN);

  $sel = 'SELECT count(distinct user) from entry;';
  $results=$db->query($sel);
  $return['users'] = $results->fetch(PDO::FETCH_COLUMN);

  $sel = 'SELECT count(*) from entry where updated_at>="' . Timestamp("-1 day") . '";';
  $results=$db->query($sel);
  $return['day'] = $results->fetch(PDO::FETCH_COLUMN);

  $sel = 'SELECT count(*) from entry where updated_at>="' . Timestamp("-1 week") . '";';
  $results=$db->query($sel);
  $return['week'] = $results->fetch(PDO::FETCH_COLUMN);

  $sel = 'SELECT count(*) from entry where updated_at>="' . Timestamp("-1 month") . '";';
  $results=$db->query($sel);
  $return['month'] = $results->fetch(PDO::FETCH_COLUMN);

  $sel = 'SELECT count(*) from entry where updated_at>="' . Timestamp("-1 year") . '";';
  $results=$db->query($sel);
  $return['year'] = $results->fetch(PDO::FETCH_COLUMN);

  return $return;
}

function collectionsSecurity(){
  global $db0;
  $sel = 'SELECT * from collection;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($results) {
      return $results;
    }
  } catch (PDOException $e) {
  }
  haltForbidden();
}

function collectionSecurity($collection){
  global $db0;
  $sel = 'SELECT * from collection where name=:collection;';
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
  $return['name'] = $collection;
  $return['title'] = "Unknown Collection";
  $return['view_pass'] = 0;
  $return['add_pass'] = 1;
  $return['edit_pass'] = 1;
  $return['register_level'] = 0;
  $return['upload_level'] = 4;
  return $return;
}

function collectionSecurityInsert($collection,$data,$pass,$force=false){
  //request must be from a logged in user
  $user = userVerified($pass);
  if (!$user) {
    haltForbidden();
  }
  $dt = Timestamp();
  global $db0;

  $stmt = $db0->prepare("INSERT into collection (name, title, user, view_pass, add_pass, edit_pass, register_level, upload_level, created_at, updated_at) values (:name, :title, :user, :view_pass, :add_pass, :edit_pass, :register_level, :upload_level, :dt, :dt);");
  $stmt->bindValue(':name',$collection, PDO::PARAM_STR);
  $stmt->bindValue(':title',$data["title"], PDO::PARAM_STR);
  $stmt->bindValue(':user',$user, PDO::PARAM_STR);
  $stmt->bindValue(':view_pass',$data["view_pass"], PDO::PARAM_STR);
  $stmt->bindValue(':add_pass',$data["add_pass"], PDO::PARAM_STR);
  $stmt->bindValue(':edit_pass',$data["edit_pass"], PDO::PARAM_STR);
  $stmt->bindValue(':register_level',$data["register_level"], PDO::PARAM_STR);
  $stmt->bindValue(':upload_level',$data["upload_level"], PDO::PARAM_STR);
  $stmt->bindValue(':dt',$dt, PDO::PARAM_STR);
  try {
    $stmt->execute();
  } catch(PDOException $exception){ 
    haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
  } 
}

function collectionSecurityUpdate($collection,$data,$pass,$force=false){
  if (!$force) {rightsCheck($collection,$pass,SP_MANAGE);}

  global $db0;

  $dt = Timestamp();
  if ($stmt = $db0->prepare("UPDATE collection set title=:title, view_pass=:view_pass, add_pass=:add_pass, edit_pass=:edit_pass, register_level=:register_level, upload_level=:upload_level, updated_at=:updated_at where name=:name;")) {
    $stmt->bindValue(':title',$data["title"], PDO::PARAM_STR);
    $stmt->bindValue(':view_pass',$data["view_pass"], PDO::PARAM_STR);
    $stmt->bindValue(':add_pass',$data["add_pass"], PDO::PARAM_STR);
    $stmt->bindValue(':edit_pass',$data["edit_pass"], PDO::PARAM_STR);
    $stmt->bindValue(':register_level',$data["register_level"], PDO::PARAM_STR);
    $stmt->bindValue(':upload_level',$data["upload_level"], PDO::PARAM_STR);
    $stmt->bindValue(':updated_at',$dt, PDO::PARAM_STR);
    $stmt->bindValue(':name',$collection, PDO::PARAM_STR);
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
    if (!$stmt->rowCount()){
      collectionSecurityInsert($collection,$data,$pass,$force);
    };
  }
}

function collectionSecurityDelete($collection,$pass){
  rightsCheck($collection,$pass,SP_MANAGE);
  global $db0;
  if ($stmt = $db0->prepare("DELETE FROM collection where name=:name;")) {
    $stmt->bindValue(':name',$collection, PDO::PARAM_STR);
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }  
}

function collectionUsers($collection){
  global $db0;
  $sel = 'SELECT user, security from usercollection where collection = :collection order by user;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':collection', $collection, PDO::PARAM_STR);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($results) {
      return $results;
    }
  } catch (PDOException $e) {
  }
  haltNoContent();
}

function collectionUsersDetail($collection,$pass){
  rightsCheck($collection,$pass,SP_MANAGE);
  global $db0;
  $sel = 'SELECT name, display, email, usercollection.security from user left join usercollection on name = user and collection = :collection order by name;';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->bindParam(':collection', $collection, PDO::PARAM_STR);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($results) {
      return $results;
    }
  } catch (PDOException $e) {
  }
  haltNoContent();
}

function collectionManageUnknown(){
  global $db0;
  $sel = 'SELECT distinct collection from usercollection where collection not in (select name from collection);';
  try {
    $stmt = $db0->prepare($sel);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_COLUMN);
    if ($results) {
      return $results;
    } else {
      return [];
    }
  } catch (PDOException $e) {
  }
}

function collectionManageUpdate($collection,$data,$pass,$force=false){
  if (!$force) {rightsCheck($collection,$pass,SP_MANAGE);}

  global $db0;
  if ($stmt = $db0->prepare("UPDATE usercollection set security=:security where collection=:collection and user=:user;")) {
    $stmt->bindValue(':collection',$collection, PDO::PARAM_STR);
    $stmt->bindValue(':user',$data["user"], PDO::PARAM_STR);
    $stmt->bindValue(':security',$data["security"], PDO::PARAM_INT);
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
  if ($stmt = $db0->prepare("INSERT OR IGNORE INTO usercollection (collection, user, security) values (:collection, :user, :security);")) {
    $stmt->bindValue(':collection',$collection, PDO::PARAM_STR);
    $stmt->bindValue(':user',$data["user"], PDO::PARAM_STR);
    $stmt->bindValue(':security',$data["security"], PDO::PARAM_INT);
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
}

function collectionManageRemove($collection,$user,$pass){
  rightsCheck($collection,$pass,SP_MANAGE);
  global $db0;
  if ($stmt = $db0->prepare("DELETE from usercollection where collection=:collection and user=:user;")) {
    $stmt->bindValue(':collection',$collection, PDO::PARAM_STR);
    $stmt->bindValue(':user',$user, PDO::PARAM_STR);
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
}

function collectionManageDelete($collection,$pass){
  rightsCheck($collection,$pass,SP_MANAGE);
  global $db0;
  if ($stmt = $db0->prepare("DELETE from usercollection where collection=:collection;")) {
    $stmt->bindValue(':collection',$collection, PDO::PARAM_STR);
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
}

function collectionDelete($collection,$pass){
  rightsCheck($collection,$pass,SP_MANAGE);
  $dir = realpath('data');

  $ext = 'db';
  $file = $dir . "/" . $ext . "/" . $collection . '.' . $ext;
  $trash = $dir . "/trash/" . $collection . '.' . $ext;
  $ver = 0;
  while(file_exists($trash)){
    $ver++;
    $trash = $dir . "/trash/" . $collection . '_' . $ver . '.' . $ext;
  }
  @rename($file, $trash);

  $ext = 'json';
  $file = $dir . "/" . $ext . "/" . $collection . '.' . $ext;
  @unlink($file);

  $ext = 'txt';
  $file = $dir . "/" . $ext . "/" . $collection . '.' . $ext;
  @unlink($file);
}

function interface2json($interface,$pass=""){
  //  rightsCheck($interface,$pass,SP_VIEW);
  $db = collection_db($interface);
  try {
    $sel = 'SELECT key, message, description, icon, user, created_at, updated_at from entry;';
    $results=$db->query($sel);
    $entries = $results->fetchAll(PDO::FETCH_ASSOC);
    $return = array();
    $return['name'] = $interface;
    $return['data'] = array();
    if($entries){
      foreach ($entries as $entry){
        $key = $entry['key'];
        unset($entry['key']);
        $return['data'][$key] = $entry;
      }
    }
    return json_pretty($return);
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function interface2txt($interface,$pass=""){
  //  rightsCheck($interface,$pass,SP_VIEW);
  $db = collection_db($interface);
  try {
    $sel = 'SELECT key, message, description, icon, user, created_at, updated_at from entry;';
    $results=$db->query($sel);
    $entries = $results->fetchAll(PDO::FETCH_ASSOC);
    $lines = array();
    if($entries){
      foreach ($entries as $entry){
        $lines[] = implode($entry,"\t");
      }
    }
    return implode($lines,"\n");
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function interfaceKeys($interface,$pass){
  rightsCheck($interface,$pass,SP_VIEW);
  $db = collection_db($interface);
  try {
    $sel = 'SELECT key from entry order by key;';
    $results=$db->query($sel);
    $entries = $results->fetchAll(PDO::FETCH_COLUMN);
    return $entries;
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function interfaceSearch($interface,$text,$pass){
  rightsCheck($interface,$pass,SP_VIEW);
  $db = collection_db($interface);
  $text = "%" . $text . "%";
  try {
    $sql = 'SELECT key, message from entry where message like :message order by message;';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':message', $text, PDO::PARAM_STR);
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $entries;
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  

}

function interfaceKeySearch($interface,$key,$pass){
  rightsCheck($interface,$pass,SP_VIEW);
  $db = collection_db($interface);
  try {
    $sql = 'SELECT key, message, description, icon, user, created_at, updated_at from entry where key like :key order by key;';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':key', $key, PDO::PARAM_STR);
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $entries;
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function interfaceEntryNew($interface,$data,$pass){
  rightsCheck($interface,$pass,SP_ADD);
  $user = userVerified($pass,true);

  $db = collection_db($interface);
  try {
    $key = $data['key'];
  } catch (Exception $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }
  $err = invalidKey($key);
  if ($err){
    haltBadRequest($err);
  }
  $dt = Timestamp();
  if ($stmt = $db->prepare("INSERT INTO entry (key,message, description, icon, user, created_at, updated_at) VALUES ('$key',:message, :description, :icon, :user, :created_at, :updated_at)")) {
    $stmt->bindValue(':message',$data["message"], PDO::PARAM_STR);
    $stmt->bindValue(':description',$data["description"], PDO::PARAM_STR);
    $stmt->bindValue(':icon',$data["icon"], PDO::PARAM_STR);
    $stmt->bindValue(':user',$user, PDO::PARAM_STR);
    $stmt->bindValue(':created_at',$dt, PDO::PARAM_STR);
    $stmt->bindValue(':updated_at',$dt, PDO::PARAM_STR);
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
}

function interfaceEntryUpdate($interface,$key,$data,$pass){
  rightsCheck($interface,$pass,SP_EDIT,$key);

  $db = collection_db($interface);

  try {
    $newkey = $data['key'];
  } catch (Exception $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }
  $err = invalidKey($newkey);
  if ($err){
    haltBadRequest($err);
  }

  $dt = Timestamp();

  if ($stmt = $db->prepare("UPDATE entry set key=:newkey, message=:message, description=:description, icon=:icon, updated_at=:updated_at where key=:key;")) {
    $stmt->bindValue(':newkey',$data["key"], PDO::PARAM_STR);
    $stmt->bindValue(':message',$data["message"], PDO::PARAM_STR);
    $stmt->bindValue(':description',$data["description"], PDO::PARAM_STR);
    $stmt->bindValue(':icon',$data["icon"], PDO::PARAM_STR);
    $stmt->bindValue(':updated_at',$dt, PDO::PARAM_STR);
    $stmt->bindValue(':key',$key, PDO::PARAM_STR);
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
}

function interfaceEntryDelete($interface,$key,$pass){
  rightsCheck($interface,$pass,SP_EDIT,$key);
  $db = collection_db($interface);
  $err = invalidKey($key);
  if ($err){
    haltBadRequest($err);
  }
  if ($stmt = $db->prepare("DELETE FROM entry where key='$key';")) {
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
}

function dictionary2json($dictionary,$pass=""){
  //  rightsCheck($dictionary,$pass,SP_VIEW);
  $db = collection_db($dictionary);
  try {
    $sel = 'SELECT id, sign, terms, lower, signtext, text, source, detail, user, created_at, updated_at from entry;';
    $results=$db->query($sel);
    $entries = $results->fetchAll(PDO::FETCH_ASSOC);
    $return = array();
    $return['name'] = $dictionary;
    $return['data'] = array();
    if($entries){
      foreach ($entries as $i=>$entry){
        $entries[$i]['terms'] = explode("|",$entry['terms']);
        $entries[$i]['lower'] = explode("|",$entry['lower']);
        $entries[$i]['detail'] = json_decode($entry['detail']);
      }
      $return['data'] = $entries;
    }
    return json_pretty($return);
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function dictionary2txt($dictionary,$pass=""){
  //  rightsCheck($dictionary,$pass,SP_VIEW);
  $db = collection_db($dictionary);
  try {
    $sel = 'SELECT id, sign, terms, lower, signtext, text, source, detail, user, created_at, updated_at from entry;';
    $results=$db->query($sel);
    $entries = $results->fetchAll(PDO::FETCH_ASSOC);
    $lines = array();
    if($entries){
      foreach ($entries as $entry){
        foreach ($entry as $key=>$val){
          $entry[$key] = wrapit($val);
        }
        $lines[] = implode($entry,"\t");
      }
    }
    return implode($lines,"\n");
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function dictionarySigns($collection){
  $collection_db = collection_db($collection);
  try {
    $sel = 'SELECT sign from entry where sign!="";';
    $stmt = $collection_db->prepare($sel);
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_COLUMN);
    return implode(" ", $entries);
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function dictionarySigntexts($collection){
  $collection_db = collection_db($collection);
  try {
    $sel = 'SELECT signtext from entry where signtext!="";';
    $stmt = $collection_db->prepare($sel);
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_COLUMN);
    return implode("\n",$entries);
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function dictionaryISWA(){
  $groups = ['S100','S10e','S11e','S144','S14c','S186','S1a4','S1ba','S1cd','S1f5','S205','S216','S22a','S255','S265','S288','S2a6','S2b7','S2d5','S2e3','S2f7','S2ff','S30a','S32a','S33b','S359','S36d','S376','S37f','S387'];
  $alphabet = ["name"=>"iswa-2010","data"=>[]];
  foreach ($groups as $i=>$group){
    $j = $i +1;
    $start = SignWriting\key2char($group . '00');
    $egroup = $j==count($groups)?"S38C":$groups[$j];
    $end = SignWriting\key2char($egroup . '00',-1);
    $cursor = 1;
    do {
      $from = SignWriting\key2char($group . '00',96*($cursor-1));
      $to = SignWriting\key2char($group . '00',96*$cursor-1);
      if (SignWriting\swu2key($from)<"S20500" && $from!=$start){
        $from = SignWriting\key2char($group . '00',96*($cursor-1)+16);
      }
      $alphabet['data'][$start][] = $from;
      $cursor++;
    } while ($to < $end);
  }
  return $alphabet;
}

function dictionaryAlphabet($collection,$lastModified=""){
  $groups = ['S100','S10e','S11e','S144','S14c','S186','S1a4','S1ba','S1cd','S1f5','S205','S216','S22a','S255','S265','S288','S2a6','S2b7','S2d5','S2e3','S2f7','S2ff','S30a','S32a','S33b','S359','S36d','S376','S37f','S387'];
  if (!$lastModified){
    $lastModified = lastModified($collection);
  }
  $name = str_replace('-dictionary-','-alphabet-',$collection);
  $alphabet = ["name"=>$name,"last-modified"=>$lastModified,"data"=>[]];
  $signs = dictionarySigns($collection);
  foreach ($groups as $i=>$group){
    $j = $i +1;
    $start = SignWriting\key2char($group . '00');
    $egroup = $j==count($groups)?"S38C":$groups[$j];
    $end = SignWriting\key2char($egroup . '00',-1);
    $cursor = 1;
    do {
      $from = SignWriting\key2char($group . '00',96*($cursor-1));
      $to = SignWriting\key2char($group . '00',96*$cursor-1);
      $regex = '/[' . SignWriting\char2utf32($from) . '-' . SignWriting\char2utf32($to) . ']/u';
      if (preg_match($regex, $signs)) {
        if (SignWriting\swu2key($from)<"S20500" && $from!=$start){
          $from = SignWriting\key2char($group . '00',96*($cursor-1)+16);
        }
        $alphabet['data'][$start][] = $from;
      };
      $cursor++;
    } while ($to < $end);
  }
  return $alphabet;
}

function dictionaryResults($entries,$results,$offset,$limit,$sort){
  $offset = $offset?:0;
  switch ($results){
    case "sign":
      $entries = array_filter($entries, function($entry) {
        return isset($entry["sign"])?$entry["sign"]:false;
      });
      break;
    case "signtext":
      $entries = array_filter($entries, function($entry) {
        return isset($entry["signtext"])?$entry["signtext"]:false;
      });
      break;
    case "term":
    case "terms":
      $entries = array_filter($entries, function($entry) {
        return isset($entry["terms"])?$entry["terms"]:false;
      });
      break;
  }
  switch ($results){
    case "sign": 
    case "signtext": 
      $total = count($entries);
      if ($limit>0){
        $entries = array_slice($entries,$offset,$limit);
      } else {
        $entries = array_slice($entries,$offset);
      }
      $data = array();
      if($entries){
        foreach ($entries as $i=>$entry){
          $data[] = [$entry['id'],$entry[$results]];
        }
      }
      break;
    case "term":
      $total = count($entries);
      if ($limit>0){
        $entries = array_slice($entries,$offset,$limit);
      } else {
        $entries = array_slice($entries,$offset);
      }
      $data = array();
      if($entries){
        foreach ($entries as $i=>$entry){
          $terms = explode('|',$entry['terms']);
          $data[] = [$entry['id'],$terms[0]];
        }
      }
      break;
    case "terms":
      $idStr = "";
      $termStr = "";
      $lowerStr = "";
      $ids = array();
      $terms = array();
      $lowers = array();
      if($entries){
        foreach ($entries as $i=>$entry){
          $term = $entry['terms'];
          if ($termStr) { $termStr .= "|"; }
          $termStr .= $term;

          if (substr($sort,-5)=="lower"){
            $lower = $entry['lower'];
            if ($lowerStr) { $lowerStr .= "|"; }
            $lowerStr .= $lower;
          }

          $id = $entry['id'];
          if ($idStr) { $idStr .= "|"; }
          $idStr .= $id;
          $num = substr_count($term, "|");
          while($num--){$idStr .= '|' . $id;}
        }

        $terms = explode('|',$termStr);
        if (substr($sort,-5)=="lower"){
          $lowers = explode('|',$lowerStr);
        }
        $ids = explode('|',$idStr);

        $total = count($terms);
        switch ($sort){
          case "terms":
            array_multisort($terms,$ids);
            break;
          case "-terms":
            array_multisort($terms,SORT_DESC,$ids);
            break;
          case "lower":
            array_multisort($lowers,$terms,$ids);
            break;
          case "-lower":
            array_multisort($lowers,SORT_DESC,$terms,$ids);
            break;
        }
        if ($limit>0){
          $ids = array_slice($ids,$offset,$limit);
          $terms = array_slice($terms,$offset,$limit);
        } else {
          $ids = array_slice($ids,$offset);
          $terms = array_slice($terms,$offset);
        }
        $data = array();
        if($terms){
          foreach ($terms as $i=>$term){
            $data[] = [$ids[$i],$term];
          }
        }
      }
      break;
    default:
      $total = count($entries);
      if ($limit>0){
        $data = array_slice($entries,$offset,$limit);
      } else {
        $data = array_slice($entries,$offset);
      }
      if($data){
        foreach ($data as $i=>$entry){
          $data[$i]['terms'] = array_filter(explode('|',$entry['terms']));
          $data[$i]['lower'] = array_filter(explode('|',$entry['lower']));
          $data[$i]['detail'] = json_decode($entry['detail']);
        }
      }
  }
  $return = array();
  $return ['total'] = $total;
  $return ['data'] = $data;
  return $return;
}

function dictionarySearch($collection,$offset,$limit,$filter,$sort,$results){
  $collection_db = collection_db($collection);
  try {
    $sel = 'SELECT id, sign, terms, lower, signtext, text, source, detail, user, created_at, updated_at from entry';
    $valids = ["id","user","created_at","updated_at","sign","signtext","terms","lower","text","source","detail"];
    $params = filter($filter,$valids);
    $where = array();
    if (count($params)){
      foreach ($params as $param){
        $where[] = $param[0] . " " . $param[1];
      }
    }
    if (count($where)){
      $sel .= " where " . implode(" and ",$where);
    }

    $sel .= entry_orderby($sort,'sign') . ';';
    $stmt = $collection_db->prepare($sel);
    if (count($params)){
      foreach ($params as $param){
        $stmt->bindValue($param[1], $param[2], PDO::PARAM_STR);
      }
    }
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $return = dictionaryResults($entries, $results, $offset, $limit, $sort);

    return $return;
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function dictionarySearchSign($collection,$query,$offset,$limit,$filter,$sort,$results){
  $collection_db = collection_db($collection);
  $regex = SignWriting\queryu2regex($query);
  if (!$regex){
    haltBadRequest('invalid query string');
  }

  foreach ($regex as $i=>$re){
    $re = str_replace('/',"",$re);
    $re = "'/^" . $re . "$/u'";
    $regex[$i] = $re;
  }
  try {
    $sel = 'SELECT id, sign, terms, lower, signtext, text, source, detail, user, created_at, updated_at from entry where REGEX(sign,' . $regex[0] . ',0)';
    $valids = ["id","user","created_at","updated_at","sign","signtext","terms","lower","text","source","detail"];
    $params = filter($filter,$valids);
    if (count($params)){
      foreach ($params as $param){
        $sel .= " and " . $param[0] . " " . $param[1];
      }
    }
    $cnt = count($regex);
    $end = '';
    $part = '';
    for ($i=1;$i<$cnt;$i++) {
      $part = ' and id in (select id from entry where REGEX(sign,' . $regex[$i] . ',0)';
      $part .= 'END)';
      if ($end) {
        $end = str_replace('END)',$part . ')',$end);
      } else {
        $end = $part;
      }
    }
    $end = str_replace('END)',')',$end);
    $sel .= $end;

    $sel .= entry_orderby($sort,'sign') . ';';
    $stmt = $collection_db->prepare($sel);
    if (count($params)){
      foreach ($params as $param){
        $stmt->bindValue($param[1], $param[2], PDO::PARAM_STR);
      }
    }
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $return = dictionaryResults($entries, $results, $offset, $limit, $sort);

    return $return;
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function dictionarySearchSigntext($collection,$query,$offset,$limit,$filter,$sort,$results){
  $collection_db = collection_db($collection);
  $regex = SignWriting\queryu2regex($query);
  if (!$regex){
    haltBadRequest('invalid query string');
  }
 
  foreach ($regex as $i=>$re){
    $regex[$i] = $re . "u";
  }

  $orderby = entry_orderby($sort,'signtext');

  try {
    $sel = 'SELECT id, sign, terms, lower, signtext, text, source, detail, user, created_at, updated_at from entry where REGEX(signtext,"' . $regex[0] . '",0)';
    $valids = ["id","user","created_at","updated_at","sign","signtext","terms","lower","text","source","detail"];
    $params = filter($filter,$valids);
    if (count($params)){
      foreach ($params as $param){
        $sel .= " and " . $param[0] . " " . $param[1];
      }
    }
    $sel .= $orderby;
    $stmt = $collection_db->prepare($sel);
    if (count($params)){
      foreach ($params as $param){
        $stmt->bindValue($param[1], $param[2], PDO::PARAM_STR);
      }
    }
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $cnt = count($regex);
    if ($cnt>1 && count($entries)){
      $signtext = '';
      for ($i=0;$i<count($entries);$i++) {
        $signtext .= $entries[$i]['signtext'];
      }
      foreach ($regex as $pattern){
        $count = preg_match_all($pattern, $signtext, $matches);
        $signtext = implode(array_unique($matches[0]),' ');
      }
        
      if ($signtext){
        $words = array_unique(explode(' ',$signtext));
      } else {
        $words = array();
      }
      if (count($words)){
        foreach ($words as $i=>$word){
          $words[$i] = '(signtext LIKE "%' . $word . '%")';
        }
        $sel = 'SELECT id, sign, terms, lower, signtext, text, source, detail, user, created_at, updated_at from entry where ' . implode($words,' or ');
        if (count($params)){
          foreach ($params as $param){
            $sel .= " and " . $param[0] . " " . $param[1];
          }
        }
        $stmt = $collection_db->prepare($sel);
        if (count($params)){
          foreach ($params as $param){
            $stmt->bindValue($param[1], $param[2], PDO::PARAM_STR);
          }
        }
        $stmt->execute();
        $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);
      } else {
        $entries = array(); 
      }
    }

    $return = dictionaryResults($entries, $results, $offset, $limit, $sort);

    return $return;
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function dictionarySearchId($dictionary,$id,$pass){
  rightsCheck($dictionary,$pass,SP_VIEW);
  $db = collection_db($dictionary);
  $list = array();
  $parts = explode(',',$id);
  foreach ($parts as $part) {
    $vals = explode('-',$part);
    if (count($vals)==1){
      $list[] = intval($vals[0]);
    } else if (count($vals)==2){
      for ($i=intval($vals[0]);$i<=intval($vals[1]);$i++){
        $list[] = $i;
      }
    }
  }
  $list = implode(",",$list);
  try {
    $sql = 'SELECT id, sign, terms, lower, signtext, text, source, detail, user, created_at, updated_at from entry where id in (' . $list . ') order by id;';
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if($entries){
      foreach ($entries as $i=>$entry){
        $entries[$i]['terms'] = explode("|",$entry['terms']);
        $entries[$i]['lower'] = explode("|",$entry['lower']);
        $entries[$i]['detail'] = json_decode($entry['detail']);
      }
    }
    return $entries;
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}

function dictionarySearchTerms($collection,$search,$type,$case,$offset,$limit,$filter,$sort,$results){
  $collection_db = collection_db($collection);
  if (!$case) {
    $search = mb_strtolower($search,'UTF-8');
    $col = 'lower'; 
  } else {
    $col = 'terms'; 
  }
  
  if ($type == 'start' || $type == 'exact'){
    $search = "(^|\|)" . $search; 
  }
  if ($type == 'end' || $type == 'exact'){
    $search = $search . "(\||$)" ; 
  }
  $search = "/" . $search . "/";
  try {
    $sel = 'SELECT id, sign, terms, lower, signtext, text, source, detail, user, created_at, updated_at from entry ';
    $sel .= 'where REGEX(' . $col . ',:search,0)';
    $valids = ["id","user","created_at","updated_at","sign","signtext","terms","lower","text","source","detail"];
    $params = filter($filter,$valids);
    $where = array();
    if (count($params)){
      foreach ($params as $param){
        $where[] = $param[0] . " " . $param[1];
      }
    }
    if (count($where)){
      $sel .= " and " . implode(" and ",$where);
    }

    $sel .= entry_orderby($sort,'sign') . ';';
    $stmt = $collection_db->prepare($sel);
    $stmt->bindValue(':search',$search, PDO::PARAM_STR);
    if (count($params)){
      foreach ($params as $param){
        $stmt->bindValue($param[1], $param[2], PDO::PARAM_STR);
      }
    }
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $return = dictionaryResults($entries, $results, $offset, $limit, $sort);

    return $return;
  } catch (PDOException $e) {
    haltBadRequest($e->getCode() . ' ' . $e->getMessage());
  }  
}


function dictionaryEntryNew($dictionary,$data,$pass){
  rightsCheck($dictionary,$pass,SP_ADD);
  $user = userVerified($pass,true);
  if (!$user){ haltForbidden();}
  $data['user'] = $user;

  $db = collection_db($dictionary);
  $dt = Timestamp();
  $data['created_at'] = $dt;
  $data['updated_at'] = $dt;

  if(!isset($data['terms'])){
    $data['terms'] = '';
  } else {
    $data['terms'] = implode("|",$data['terms']);
  }
  $data['lower'] = mb_strtolower($data['terms'],"UTF-8");

  if(!isset($data['detail'])){
    $data['detail'] = '{}';
  } else {
    $json = json_encode($data['detail'],JSON_NUMERIC_CHECK);
    $data['detail'] = $json=="[]"?"{}":$json;
  }
 
  if ($stmt = $db->prepare("INSERT INTO entry (sign, terms, lower, signtext, text, source, detail, user, created_at, updated_at) VALUES (:sign, :terms, :lower, :signtext, :text, :source, :detail, :user, :created_at, :updated_at)")) {
    $fields = ["sign","terms","lower","signtext","text","source","detail","user","created_at","updated_at"];
    foreach ($fields as $field){
      if (!isset($data[$field])){
        $data[$field] = '';
      }
      $stmt->bindValue(':' . $field,$data[$field], PDO::PARAM_STR);
    }
    try {
      $stmt->execute();
      return $db->lastInsertId(); 
    } catch(PDOException $exception){
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
}

function dictionaryEntryUpdate($dictionary,$id,$data,$pass){
  rightsCheck($dictionary,$pass,SP_EDIT,$id);

  $db = collection_db($dictionary);

  $data['id'] = $id;
  $dt = Timestamp();
  $data['updated_at'] = $dt;

  if(!isset($data['terms'])){
    $data['terms'] = '';
  } else {
    $data['terms'] = implode("|",$data['terms']);
  }
  $data['lower'] = mb_strtolower($data['terms'],"UTF-8");

  if(!isset($data['detail'])){
    $data['detail'] = '{}';
  } else {
    $json = json_encode($data['detail'],JSON_NUMERIC_CHECK);
    $data['detail'] = $json=="[]"?"{}":$json;
  }
  if ($stmt = $db->prepare("UPDATE entry set sign=:sign, terms=:terms, lower=:lower, signtext=:signtext, text=:text, source=:source, detail=:detail, updated_at=:updated_at where id=:id;")) {
    $fields = ["id", "sign","terms","lower","signtext","text","source","detail","updated_at"];
    foreach ($fields as $field){
      if (!isset($data[$field])){
        $data[$field] = '';
      }
      $stmt->bindValue(':' . $field,$data[$field], PDO::PARAM_STR);
    }
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
}

function dictionaryEntryDelete($dictionary,$id,$pass){
  rightsCheck($dictionary,$pass,SP_EDIT,$id);
  $db = collection_db($dictionary);
  $id = intval($id);
  if ($stmt = $db->prepare("DELETE FROM entry where id='$id';")) {
    try {
      $stmt->execute();
    } catch(PDOException $exception){ 
      haltBadRequest($exception->getCode() . ' ' . $exception->getMessage()); 
    } 
  }
}

function collection_term($collection,$term,$text,$query,$source,$offset,$limit,$sort){
  $collection_db = collection_db($collection);
  $sql = 'SELECT group_concat(id,",") id, term from term ';
  $where = array();

  if ($term){
    $where[] = 'REGEX(lower,:term,0)';
  }

  if ($text){
    $where[] = 'id in (select id from entry where REGEX(text,"/' . mb_strtolower($text) . '/",1))';
  }

  if ($source){
    $where[] = 'id in (select id from entry where REGEX(source,"/' . mb_strtolower($source) . '/",1))';
  }


  $regex = SignWriting\query2regex($query);
  if ($regex){
    foreach ($regex as $i=>$re){
      $re = str_replace('/',"",$re);
      $re = "'/^" . $re . "$/'";
      $regex[$i] = $re;
    }
    $sel = 'id in (select id from entry where REGEX(sign,' . $regex[0] . ',0)';
    $cnt = count($regex);
    $end = '';
    $part = '';
    for ($i=1;$i<$cnt;$i++) {
      $part = ' and id in (select id from entry where REGEX(sign,' . $regex[$i] . ',0)';
      $part .= 'END)';
      if ($end) {
        $end = str_replace('END)',$part . ')',$end);
      } else {
        $end = $part;
      }
    }
    $end = str_replace('END)',')',$end);
    $sel .= $end . ')';
    $where[] = $sel;
  }

  if (count($where)){
    $sql .= 'where ' . implode($where, ' and '); 
  }
  $sql .= ' group by term ';
  $sql .= entry_orderby($sort,'lower');

  $stmt = $collection_db->prepare($sql);
  if ($term){
    $term = mb_strtolower($term);
    $term = '/' . $term . '/';
    $stmt->bindParam(':term', $term, PDO::PARAM_STR);
  }
  $stmt->execute();
  $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $total = count($entries);
  if ($limit>0){
    $data = array_slice($entries,$offset,$limit);
  } else {
    $data = array_slice($entries,$offset);
  }
  $return = array();
  $return['total'] = $total;
  $return['data'] = $data;
  return $return;
}

function getSymbols($keys) {
  global $db;
  if (!$db) { haltNoDatabase();}

  if (is_array($keys)){
    $list = '("' . implode('","',$keys) . '")';
  } else {
    $list = '("' . $keys . '")';
  }
  $syms = array();
  $sql = 'SELECT symkey as key,width as w,height as h,svg as g from symbol where symkey in ';
  $sql .= $list . ';';
  $results=$db->query($sql);
  $syms=array();
  $syms = $results->fetchAll(PDO::FETCH_CLASS);
  if($syms){
    return $syms;
  } else {
    return array();
  }
}

function json_check() {
  switch (json_last_error()) {
    case JSON_ERROR_NONE:
      //'No errors';
      break;
    case JSON_ERROR_DEPTH:
      haltBadRequest('Maximum stack depth exceeded');
      break;
    case JSON_ERROR_STATE_MISMATCH:
      haltBadRequest('Underflow or the modes mismatch');
      break;
    case JSON_ERROR_CTRL_CHAR:
      haltBadRequest('Unexpected control character found');
      break;
    case JSON_ERROR_SYNTAX:
      haltBadRequest('Syntax error, malformed JSON');
      break;
    case JSON_ERROR_UTF8:
      haltBadRequest('Malformed UTF-8 characters, possibly incorrectly encoded');
      break;
    default:
      haltBadRequest('Unknown error');
      break;
  }
}

function json_pretty($object){
  return json_encode($object, JSON_PRETTY_PRINT, JSON_NUMERIC_CHECK);
}