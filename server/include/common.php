<?php

function uiLang(){
  global $app;
  return $app->request->headers->get('Accept-Language') || 'en-US';
}

function getHeaders(){
  $headers = array();
  foreach(getallheaders() as $key => $value) {
    $header = str_replace(' ','-',ucwords(str_replace('-',' ',strtolower($key))));
    $headers[$header] = $value;
  }
  return $headers;
}

function fixname($name,$id){
  $normalizeChars = array(
    'Š'=>'S', 'š'=>'s', 'Ð'=>'Dj','Ž'=>'Z', 'ž'=>'z', 'À'=>'A', 'Á'=>'A', 'Â'=>'
A', 'Ã'=>'A', 'Ä'=>'A',
    'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E', 'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'
I', 'Í'=>'I', 'Î'=>'I',
    'Ï'=>'I', 'Ñ'=>'N', 'Ń'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'
O', 'Ø'=>'O', 'Ù'=>'U', 'Ú'=>'U',
    'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss','à'=>'a', 'á'=>'a', 'â'=>'
a', 'ã'=>'a', 'ä'=>'a',
    'å'=>'a', 'æ'=>'a', 'ç'=>'c', 'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'
i', 'í'=>'i', 'î'=>'i',
    'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ń'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'
o', 'ö'=>'o', 'ø'=>'o', 'ù'=>'u',
    'ú'=>'u', 'û'=>'u', 'ü'=>'u', 'ý'=>'y', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y', 'ƒ'=>'
f',
    'ă'=>'a', 'î'=>'i', 'â'=>'a', 'ș'=>'s', 'ț'=>'t', 'Ă'=>'A', 'Î'=>'I', 'Â'=>'
A', 'Ș'=>'S', 'Ț'=>'T',
  );
  $name = str_replace(" ","_",$name);
  $name = mb_ereg_replace("([^\w\s\d\-_.])", '', $name);
  $name = mb_ereg_replace("([\.]{2,})", '', $name);
  $name = $name?:$id;
  return strtr($name, $normalizeChars);
}

function wrapit ($val){
  if (strpos($val, '"') !== false) {
    $val = str_replace('"','""',$val);
    return '"' . $val . '"';
  } else {
    return $val;
  }
}

function invalidName($name,$cat=""){
  $parts = explode("-",$name);
  if (count($parts)!=4) return "four parts needed";
  if (!preg_match('/^[a-z]{2,3}$/', $parts[0])) return "invalid language code";
  if (!preg_match('/^[A-Z]{2}$/', $parts[1])) return "invalid country code";
  if ($cat){
    if ($cat != $parts[2]) return "invalid category, expected " . $cat;
  } else {
    $cats = ['interface','dictionary','literature','alphabet','fingerspell'];
    if (!in_array($parts[2],$cats)) return "invalid category";
  }
  if (!preg_match('/^[a-zA-Z0-9_]+$/', $parts[3])) return "invalid subname";

  return false;
}

function invalidNameWild($name){
  $parts = explode("-",$name);
  if (count($parts)!=4) return "invalid name: four parts needed";
  if (!preg_match('/^[a-z*]{1,3}$/', $parts[0])) return "invalid language code";
  if (!preg_match('/^[A-Z*]{1,2}$/', $parts[1])) return "invalid country code";
  if (!preg_match('/^[a-z*]+$/', $parts[2])) return "invalid category";
  if (!preg_match('/^[a-zA-Z0-9_*]+$/', $parts[3])) return "invalid subname";

  return false;
}

function invalidKey($key){
  $parts = explode(".",$key);
  if (count($parts)<3) return "invalid key: at lease three lowercase words separated by periods";
  if (!preg_match('/^([a-z0-9]+)(\.[a-z0-9]+){2,}$/', $key)) return "invalid key: lowercase words should be separated by periods";
  return false;
}


/********************/
/* halting functions */
function halting($status,$text){
  global $app;
  $app->contentType('text/plain;charset=utf-8');
  $app->response->setStatus($status);
  echo $text;
  $app->stop();
}

function haltNoContent($txt="No Content"){
  halting(204,$txt);
}

function haltMultipleChoices($txt="Multiple Choices"){
  halting(300,$txt);
}

function haltNotModified($txt="Not Modified"){
  halting(304,$txt);
}

function haltBadRequest($err="Bad Request"){
  halting(400,$err);
}

function haltForbidden($err='Forbidden') {
  halting(403,$err);
}

function haltNotFound($err='Not Found'){
  halting(404,$err);
}

function haltConflict($err="Conflict") {
  halting(409,$err);
}

function haltTooManyRequests($err="Too Many Requests") {
  halting(429,$err);
}

function haltGeneral($err="Server Error"){
  halting(500,$err);
}

function haltNoDatabase($err='No Database') {
  halting(500,$err);
}

function haltNotImplemented($err='Not Implemented') {
  halting(501,$err);
}
function haltServiceUnavailable($err='Service Unavailable') {
  halting(503,$err);
}

/********************/
/* common functions */

function searchtime($timein){
  return intval((microtime(true)-$timein)*1000*100)/100 . ' ms';
}

?>