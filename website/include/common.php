<?php

function uiLang(){
  global $app;
  return $app->request->headers->get('Accept-Language') || 'en-US';
}

function invalidName($name){
  $parts = explode("-",$name);
  if (count($parts)!=4) return "four parts needed";
  if (!preg_match('/^[a-z]{2,3}$/', $parts[0])) return "invalid language code";
  if (!preg_match('/^[A-Z]{2}$/', $parts[1])) return "invalid country code";
  $cats = ['interface','dictionary','litterature','alphabet','fingerspell'];
  if (!in_array($parts[2],$cats)) return "invalid category";
  if (!preg_match('/^[a-zA-Z0-9_]+$/', $parts[3])) return "invalid subname";

  return false;
}
function invalidNameWild($name){
  $parts = explode("-",$name);
  if (count($parts)!=4) return "four parts needed";
  if (!preg_match('/^[a-z*]{1,3}$/', $parts[0])) return "invalid language code";
  if (!preg_match('/^[A-Z*]{1,2}$/', $parts[1])) return "invalid country code";
  if (!preg_match('/^[a-z*]+$/', $parts[2])) return "invalid category";
  if (!preg_match('/^[a-zA-Z0-9_*]+$/', $parts[3])) return "invalid subname";

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

function haltNoContent(){
  halting(204,'');
}

function haltNotModified($txt=""){
  halting(304,$txt);
}

function haltMultipleChoices($err="Multiple Choices"){
  halting(300,$err);
}

function haltSeeOther($err="See Other"){
  halting(303,$err);
}

function haltBadRequest($err="Bad Request"){
  halting(400,$err);
}

function haltUnauthorized($err='Unauthorized') {
  halting(401,$err);
}

function haltNotFound($err='Not Found'){
  halting(404,$err);
}

function haltConflict($err="Conflict") {
  halting(409,$err);
}

function haltValidation($err="Validation Problems") {
  halting(422,$err);
}

function haltGeneral($err="Server Error"){
  halting(500,$err);
}

function haltNoDatabase($err='No Database') {
  halting(500,$err);
}

/********************/
/* common functions */

function searchtime($timein){
  return intval((microtime(true)-$timein)*1000*100)/100 . ' ms';
}

?>