<?php
/**
* API v2.0.0
* generated with tools/json2php.py from https://github.com/Slevinski/apitxt
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, If-Modified-Since');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('X-Powered-By: SignPuddle 3');

require "include/common.php";
require "include/data.php";
require "include/signwriting.php";
require "include/user.php";

$_ENV['SLIM_MODE'] = 'development'; //'development' or 'production'
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->configureMode('production', function () use ($app) {
    error_reporting(E_NONE);
    ini_set('display_errors', 0);
    $app->config(array(
        'log.enable' => true,
        'debug' => false,
        'entry_limit' => 100
    ));
});

$app->configureMode('development', function () use ($app) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    $app->config(array(
        'log.enable' => false,
        'debug' => true,
        'entry_limit' => 100
    ));
});

/********************/
/* halting functions */
$app->notFound(function () use ($app) {
  halting(404,'Not Found');
});

/********************/
/* common functions */
function getFile($file){
  global $app;
  $parts = explode('.',$file);
  $rel_api = $file;
  $abs_api = dirname(__FILE__) . '/' . $rel_api;
  if ($parts[1] != 'php' && $file != 'Slim' && file_exists($abs_api)){
    switch ($parts[1]){
      case 'db':
        $app->contentType('application/x-sqlite3');
        $app->response->headers->set('Content-Disposition','attachment; filename=' . pathinfo($app->request->getResourceUri(),PATHINFO_FILENAME) . '.db');
        break;
      case 'css':
        $app->contentType('text/css');
        break;
      case 'svg':
        $app->contentType('image/svg+xml');
        break;
      case 'htm':
      case 'html':
        $app->contentType('text/html; charset=utf-8');
        break;
      case 'js':
        $app->contentType('application/javascript');
        break;
      case 'json':
        $app->contentType('application/json');
        break;
      default:
        $app->contentType('text/plain; charset=utf-8');
        break;
    }
    echo file_get_contents($rel_api);
  } else {
    $app->notFound();
  }
}

function echoFile($file){
  $handle = fopen($file, 'r');
  if ($handle) {
    while (($line = fgets($handle)) !== false) {
      echo $line;
    }
    fclose($handle);
  }
}
/**********/
// ## Group main
$app->get('', function () use ($app) {
  $app->redirect('');
});
$app->options('/', function (){});
$app->get('/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'Available routes:' . "\n";
  echo '' . "\n";
  echo '/tools' . "\n";
  echo '/fsw' . "\n";
  echo '/swu' . "\n";
  echo '/user' . "\n";
  echo '/collection' . "\n";
  echo '/apitxt' . "\n";
});

/**********/
// ## Group user
// SignPuddle 3 collections are organized by country and language codes
$app->options('/user/who', function (){});
$app->get('/user/who', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'BR' . "\n";
  echo 'US' . "\n";
});

$app->options('/user/pass', function (){});
$app->post('/user/pass', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
    echo json_pretty(userPass());
});

$app->options('/user/login', function (){});
$app->put('/user/login', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('application/json');
    $data = $app->request->getbody();
    $data = json_decode($data,true);
    $results = userVerify($data['username'],$data['pass'],$data['validated']);
    echo json_pretty($results);
});

$app->options('/user/:name', function (){});
$app->put('/user/:name', function ($name) use ($app) {
  $timein = microtime(true);
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $user = userVerified($pass);
  if ($user!=$name) haltForbidden($user . " not " . $name);
  $data = $app->request->getbody();
  $data = json_decode($data,true);
  userProfileUpdate($name,$data);
  $app->response->setStatus(204);
  return;
});

$app->options('/user/:name', function (){});
$app->post('/user/:name', function ($name) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'profile created and returned' . "\n";
});

$app->options('/user/:name/password', function (){});
$app->post('/user/:name/password', function ($name) use ($app) {
  $timein = microtime(true);
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $user = userVerified($pass,true);
  if (!$user) haltForbidden();
  $data = $app->request->getbody();
  $data = json_decode($data,true);
  $old = isset($data['old'])?$data['old']:'';
  $new = isset($data['new'])?$data['new']:'';
  if ($old && $new){
    userPasswordUpdate($name,$old,$new);
    $app->response->setStatus(204);
    return;
  } else {
    haltBadRequest();
  }
});

$app->options('/user/:name/password', function (){});
$app->put('/user/:name/password', function ($name) use ($app) {
  $timein = microtime(true);
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $user = userVerified($pass,true);
  if (!$user) haltForbidden();
  $data = $app->request->getbody();
  $data = json_decode($data,true);
  $user = isset($data['user'])?$data['user']:'';
  if ($user){
    userPasswordReset($user);
    $app->response->setStatus(204);
    return;
  } else {
    haltBadRequest();
  }
});

$app->options('/user/email', function (){});
$app->get('/user/email', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  rightscheck("",$pass,SP_ADMIN);
  $users = userEmailRequests();
  echo json_pretty($users);
  return;
});

$app->options('/user/email/:email', function (){});
$app->put('/user/email/:email', function ($email) use ($app) {
  $timein = microtime(true);
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $user = userVerified($pass,true);
  if (!$user) haltForbidden();
  userNameLookup($email);
  $app->response->setStatus(204);
  return;
});

/**********/
// ## Group userfiles
$app->get('/user', function () use ($app) {
  $app->redirect('user/');
});
$app->options('/user/', function (){});
$app->get('/user/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/user.html');
});

/**********/
// ## Group collection
// Resources related to collections in general
$app->options('/collection', function (){});
$app->get('/collection', function () use ($app) {
  $name = $app->request()->get('name');
  $timein = microtime(true);
  $app->contentType('text/plain');
  $collections = collectionListing($name);
  if (count($collections)){
    echo json_pretty($collections);
  } else {
    $app->response->setStatus(204);
  }
  return;
});

$app->options('/collection/:name', function (){});
$app->delete('/collection/:name', function ($name) use ($app) {
  $timein = microtime(true);
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  collectionDelete($name,$pass);
  collectionSecurityDelete($name,$pass);
  collectionManageDelete($name,$pass);
  $app->response->setStatus(204);
});

$app->options('/collection/security', function (){});
$app->get('/collection/security', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $headers = getHeaders();
  $check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';
  $lastModified = lastModifiedCollection();
  if ($lastModified <= $check){
    haltNotModified();
  }
  $app->response->headers->set('Last-Modified', $lastModified);
  echo json_pretty(collectionsSecurity());
});

$app->options('/collection/:name/security', function (){});
$app->get('/collection/:name/security', function ($name) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  echo json_pretty(collectionSecurity($name));
});

$app->options('/collection/:name/security', function (){});
$app->put('/collection/:name/security', function ($name) use ($app) {
  $timein = microtime(true);
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $data = $app->request->getbody();
  $data = json_decode($data,true);
  collectionSecurityUpdate($name,$data,$pass);
  $app->response->setStatus(204);
  return;
});

$app->options('/collection/:name/security', function (){});
$app->delete('/collection/:name/security', function ($name) use ($app) {
  $timein = microtime(true);
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  collectionSecurityDelete($name,$pass);
  $app->response->setStatus(204);
});

$app->options('/collection/:name/users', function (){});
$app->get('/collection/:name/users', function ($name) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  echo json_pretty(collectionUsers($name));
});

$app->options('/collection/manage/unknown', function (){});
$app->get('/collection/manage/unknown', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo json_pretty(collectionManageUnknown());
});

$app->options('/collection/:name/manage', function (){});
$app->get('/collection/:name/manage', function ($name) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  echo json_pretty(collectionUsersDetail($name,$pass));
});

$app->options('/collection/:name/manage', function (){});
$app->put('/collection/:name/manage', function ($name) use ($app) {
  $timein = microtime(true);
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $data = $app->request->getbody();
  $data = json_decode($data,true);
  collectionManageUpdate($name,$data,$pass);
  $app->response->setStatus(204);
  return;
});

$app->options('/collection/:name/manage', function (){});
$app->delete('/collection/:name/manage', function ($name) use ($app) {
  $timein = microtime(true);
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  collectionManageDelete($name,$pass);
  $app->response->setStatus(204);
});

$app->options('/collection/:name/manage/:user', function (){});
$app->delete('/collection/:name/manage/:user', function ($name,$user) use ($app) {
  $timein = microtime(true);
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  collectionManageRemove($name,$user,$pass);
  $app->response->setStatus(204);
});

$app->options('/collection/:name/request/:source', function (){});
$app->post('/collection/:name/request/:source', function ($name,$source) use ($app) {
  $timein = microtime(true);
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $user = userVerified($pass);
  if (!$user) haltForbidden();
  rightscheck($source,$pass,SP_VIEW);
  $err = invalidName($source);
  if ($err){
    haltBadRequest($err);
  }
  $parts = explode("-",$source);
  $err = invalidName($name,$parts[2]);
  if ($err){
    haltBadRequest($err);
  }
  $dir = 'data/db/';
  $infile = $dir . $source . ".db";
  $outfile = $dir . $name . ".db";
  if (!file_exists($infile)) haltBadRequest('Source collection does not exist: ' . $source);
  if (file_exists($outfile)) haltBadRequest('Collection already exists: ' . $name);
  if (copy($infile,$outfile)){
    $data = array();
    $data["user"] = $user;
    $data["security"] = SP_EDIT;
    collectionManageUpdate($name,$data,$pass,true);
  
    $data = $app->request->getbody();
    $data = json_decode($data,true);
    $title = isset($data['title'])?$data['title']:'New Collection';
    $data = array();
    $data["title"] = $title;
    $data["user"] = "admin";
    $data["view_pass"] = 0;
    $data["add_pass"] = 1;
    $data["edit_pass"] = 1;
    $data["register_level"] = 0;
    $data["upload_level"] = 4;
    collectionSecurityUpdate($name,$data,$pass,true);
    $app->response->setStatus(204);
    return;
  } else {
    haltForbidden();
  }
});

/**********/
// ## Group collectionfiles
$app->get('/collection', function () use ($app) {
  $app->redirect('collection/');
});
$app->options('/collection/', function (){});
$app->get('/collection/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/collection.html');
});

/**********/
// ## Group interface
// Resources related to interface collections
$app->options('/interface', function (){});
$app->get('/interface', function () use ($app) {
  $name = $app->request()->get('name');
  $timein = microtime(true);
  $app->contentType('text/plain');
  $dir = 'data/db/';
  $ext = '.db';
  $out = [];
  if ($name){
    if (strpos($name,"interface")!==false){
      $interfaces = $dir . '*' . $name . '*' . $ext;
      $files = glob($interfaces);
    } else {
      $interfaces = $dir . '*interface*' . $name . '*' . $ext;
      $files = glob($interfaces);
      if (count($files)==0) {
        $interfaces = $dir . '*' . $name . '*interface*' . $ext;
        $files = glob($interfaces);
      }
    }
  } else {
    $interfaces = $dir . '*interface*' . $ext;
    $files = glob($interfaces);
  }
  foreach ($files as $filename) {
    $out[] = str_replace($ext,'',str_replace($dir,'',$filename));
  }
  if (count($out)){
    echo json_pretty($out);
  } else {
    $app->response->setStatus(204);
  }
  return;
});

$app->options('/interface/:name', function (){});
$app->get('/interface/:name', function ($name) use ($app) {
  $update = $app->request()->get('update');
  $timein = microtime(true);
  $app->contentType('text/plain');
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  rightscheck($name,$pass,SP_VIEW);
  $check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';
  if (strpos($name,'.')){
    $parts = explode('.',$name);
    $name = $parts[0];
    $format = $parts[1];
    if (!in_array($format,['db','txt','json'])){
      haltNotFound();
    }
  } else {
    $format = 'json';
  }
  $dir = 'data/' . $format . '/';
  $ext = '.' . $format;
  $file = $dir . $name . $ext;
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $lastModified = lastModified($name);
  if ($lastModified <= $check  && !$update){
    haltNotModified();
  }
  if ($format=='json' && (!file_exists($file) || $update)) {
    $json = interface2json($name);
    file_put_contents($file,$json);
  } else if ($format=='txt' && (!file_exists($file) || $update)) {
    $txt = interface2txt($name);
    file_put_contents($file,$txt);
  }
  if(file_exists($file)) {
    $app->response->headers->set('Last-Modified', $lastModified);
    getFile($file);
  } else {
    haltNotFound();
  }
});

$app->options('/interface/:name/key', function (){});
$app->get('/interface/:name/key', function ($name) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $lastModified = lastModified($name);
  if ($lastModified <= $check){
    haltNotModified();
  }
  $app->response->headers->set('Last-Modified', $lastModified);
  echo json_pretty(interfaceKeys($name,$pass));
});

$app->options('/interface/:name/search/:text', function (){});
$app->get('/interface/:name/search/:text', function ($name,$text) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  echo json_pretty(interfaceSearch($name,$text,$pass));
});

$app->options('/interface/:name/entry', function (){});
$app->post('/interface/:name/entry', function ($name) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  if (!$pass){
    haltForbidden();
  }
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $data = $app->request->getbody();
  $data = json_decode($data,true);
  interfaceKeyNew($name,$data,$pass);
  $app->response->setStatus(201);
  return;
});

$app->options('/interface/:name/entry/:key', function (){});
$app->get('/interface/:name/entry/:key', function ($name,$key) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $entries = interfaceKeyEntry($name,$key,$pass);
  if (!$entries){
    haltNoContent();
  }
  $lastModified = max(array_map(function($o) {return $o->updated_at;},$entries));
  if ($lastModified <= $check){
    haltNotModified();
  }
  $app->response->headers->set('Last-Modified', $lastModified);
  echo json_pretty($entries);
});

$app->options('/interface/:name/entry/:key', function (){});
$app->put('/interface/:name/entry/:key', function ($name,$key) use ($app) {
  $timein = microtime(true);
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  $data = $app->request->getbody();
  $data = json_decode($data,true);
  interfaceKeyUpdate($name,$key,$data,$pass);
  $app->response->setStatus(204);
  return;
});

$app->options('/interface/:name/entry/:key', function (){});
$app->delete('/interface/:name/entry/:key', function ($name,$key) use ($app) {
  $timein = microtime(true);
  $err = invalidName($name);
  if ($err){
    haltBadRequest($err);
  }
  $headers = getHeaders();
  $pass = isset($headers['Pass'])?$headers['Pass']:'';
  interfaceKeyDelete($name,$key,$pass);
  $app->response->setStatus(204);
});

/**********/
// ## Group interfacefiles
$app->get('/interface', function () use ($app) {
  $app->redirect('interface/');
});
$app->options('/interface/', function (){});
$app->get('/interface/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/interface.html');
});

/**********/
// ## Group tools
// Resources related to tools
$app->get('/tools', function () use ($app) {
  $app->redirect('tools/');
});
$app->options('/tools/', function (){});
$app->get('/tools/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'Available routes:' . "\n";
  echo '' . "\n";
  echo '/tools/' . "\n";
  echo '/tools/test{?text}' . "\n";
  echo '/tools/define' . "\n";
  echo '/tools/define/{section}' . "\n";
  echo '/tools/define/{section}/{part}' . "\n";
  echo '/tools/parse{?text,utf}' . "\n";
  echo '/tools/encode{?text,slash}' . "\n";
  echo '/tools/decode{?text}' . "\n";
  echo '/tools/utf8{?text}' . "\n";
});

$app->options('/tools/define', function (){});
$app->get('/tools/define', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $define = SignWriting\define();
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo json_pretty($define);
});

$app->options('/tools/define/:section', function (){});
$app->get('/tools/define/:section', function ($section) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  global $regex_define;
  if ($section == "regex"){
    return $regex_define();
  }
  global $sample_define;
  if ($section == "sample"){
    return $sample_define();
  }
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $define = SignWriting\define($section);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo json_pretty($define);
});

$app->options('/tools/define/:section/:part', function (){});
$app->get('/tools/define/:section/:part', function ($section,$part) use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $define = SignWriting\define($section,$part);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo json_pretty($define);
});

$app->options('/tools/parse', function (){});
$app->get('/tools/parse', function () use ($app) {
  $text = $app->request()->get('text');
  $utf = $app->request()->get('utf');
  $timein = microtime(true);
  $app->contentType('text/plain');
  $timein = microtime(true);
  if (!in_array($utf,[8,16,32,'x'])){
    $utf = 16;
  }
  $app->contentType('text/plain;charset=utf-8');
  $parse = SignWriting\parse($text);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  $json = json_pretty($parse);
  echo SignWriting\cast($json,$utf);
});

$app->options('/tools/encode', function (){});
$app->get('/tools/encode', function () use ($app) {
  $text = $app->request()->get('text');
  $slash = $app->request()->get('slash');
  $timein = microtime(true);
  $app->contentType('text/plain');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $encode = SignWriting\encode($text,$slash);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $encode;
});

$app->options('/tools/decode', function (){});
$app->get('/tools/decode', function () use ($app) {
  $text = $app->request()->get('text');
  $timein = microtime(true);
  $app->contentType('text/plain');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $decode = SignWriting\decode($text);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $decode;
});

$app->options('/tools/utf8', function (){});
$app->get('/tools/utf8', function () use ($app) {
  $text = $app->request()->get('text');
  $timein = microtime(true);
  $app->contentType('text/plain');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  
  $encode = SignWriting\utf8($text);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $encode;
});

$app->options('/tools/test', function (){});
$app->get('/tools/test', function () use ($app) {
  $text = $app->request()->get('text');
  $timein = microtime(true);
  $app->contentType('text/plain');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $test = SignWriting\test($text);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $test;
});

/**********/
// ## Group toolsfiles
$app->get('/tools', function () use ($app) {
  $app->redirect('tools/');
});
$app->options('/tools/', function (){});
$app->get('/tools/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/tools.html');
});

/**********/
// ## Group FSW
// Resources related to Formal SignWriting in ASCII (FSW)
$app->options('/fsw', function (){});
$app->get('/fsw', function () use ($app) {
  $text = $app->request()->get('text');
  $style = $app->request()->get('style');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $timein = microtime(true);
  $fsw = SignWriting\fsw($text,$style);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $fsw;
});

$app->options('/fsw/all', function (){});
$app->get('/fsw/all', function () use ($app) {
  $text = $app->request()->get('text');
  $style = $app->request()->get('style');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $timein = microtime(true);
  $fsw = SignWriting\fswAll($text,$style);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $fsw;
});

$app->options('/fsw/swu', function (){});
$app->get('/fsw/swu', function () use ($app) {
  $text = $app->request()->get('text');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $timein = microtime(true);
  $swu = SignWriting\fsw2swu($text);
  $app->contentType('text/plain;charset=utf-8');
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $swu;
});

$app->options('/fsw/svg/:text', function (){});
$app->get('/fsw/svg/:text', function ($text) use ($app) {
  $timein = microtime(true);
  $app->contentType('image/svg+xml;charset=utf-8');
  $timein = microtime(true);
  $req = $app->request();
  if ($req->get('throwStatus')=='500') {haltNoDatabase();}
  $app->contentType('image/svg+xml;charset=utf-8');
  $svg = SignWriting\svg($text);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $svg;
});

$app->options('/fsw/svg/font/:text', function (){});
$app->get('/fsw/svg/font/:text', function ($text) use ($app) {
  $timein = microtime(true);
  $app->contentType('image/svg+xml;charset=utf-8');
  $timein = microtime(true);
  $req = $app->request();
  if ($req->get('throwStatus')=='500') {haltNoDatabase();}
  $app->contentType('image/svg+xml;charset=utf-8');
  $svg = SignWriting\svg($text,true);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $svg;
});

/**********/
// ## Group fswfiles
$app->get('/fsw', function () use ($app) {
  $app->redirect('fsw/');
});
$app->options('/fsw/', function (){});
$app->get('/fsw/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/fsw.html');
});

/**********/
// ## Group swu
// Resources related to Formal SignWriting in ASCII (SWU)
$app->options('/swu', function (){});
$app->get('/swu', function () use ($app) {
  $text = $app->request()->get('text');
  $style = $app->request()->get('style');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $timein = microtime(true);
  $swu = SignWriting\swu($text,$style);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $swu;
});

$app->options('/swu/all', function (){});
$app->get('/swu/all', function () use ($app) {
  $text = $app->request()->get('text');
  $style = $app->request()->get('style');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $timein = microtime(true);
  $swu = SignWriting\swuAll($text,$style);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $swu;
});

$app->options('/swu/fsw', function (){});
$app->get('/swu/fsw', function () use ($app) {
  $text = $app->request()->get('text');
  $timein = microtime(true);
  $app->contentType('text/plain;charset=utf-8');
  $timein = microtime(true);
  $fsw = SignWriting\swu2fsw($text);
  $app->contentType('text/plain;charset=utf-8');
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $fsw;
});

$app->options('/swu/svg/:text', function (){});
$app->get('/swu/svg/:text', function ($text) use ($app) {
  $timein = microtime(true);
  $app->contentType('image/svg+xml;charset=utf-8');
  $timein = microtime(true);
  $req = $app->request();
  if ($req->get('throwStatus')=='500') {haltNoDatabase();}
  $app->contentType('image/svg+xml;charset=utf-8');
  $svg = SignWriting\svg($text);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $svg;
});

$app->options('/swu/svg/font/:text', function (){});
$app->get('/swu/svg/font/:text', function ($text) use ($app) {
  $timein = microtime(true);
  $app->contentType('image/svg+xml;charset=utf-8');
  $timein = microtime(true);
  $req = $app->request();
  if ($req->get('throwStatus')=='500') {haltNoDatabase();}
  $app->contentType('image/svg+xml;charset=utf-8');
  $svg = SignWriting\svg($text,true);
  $searchTime = searchtime($timein);
  header("Search-Time: " . $searchTime);
  echo $svg;
});

/**********/
// ## Group swufiles
$app->get('/swu', function () use ($app) {
  $app->redirect('swu/');
});
$app->options('/swu/', function (){});
$app->get('/swu/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/swu.html');
});

/**********/
// ## Group apitxt
// ApiTxt uses eleven types of element to define an API.
$app->options('/apitxt/root', function (){});
$app->get('/apitxt/root', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'Every document should start with a root element.' . "\n";
  echo '' . "\n";
  echo '**root line**' . "\n";
  echo '' . "\n";
  echo 'root	name	title	host' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - uniquely identifies a document' . "\n";
  echo '+ field 2 - title - name of the document' . "\n";
  echo '+ field 3 - host - website URL' . "\n";
  echo '' . "\n";
  echo '**example**' . "\n";
  echo '' . "\n";
  echo 'root	apitxt	ApiTxt	https://signpuddle.com/apitxt' . "\n";
  echo '' . "\n";
  echo '' . "\n";
  echo '**root line relationships**' . "\n";
  echo '' . "\n";
  echo '```' . "\n";
  echo '    root' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - routes' . "\n";
  echo '     | - groups' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**root object**' . "\n";
  echo '' . "\n";
  echo '```json' . "\n";
  echo '{' . "\n";
  echo '  "root" : field[1],' . "\n";
  echo '  "title" : field[2],' . "\n";
  echo '  "host" : field[3],' . "\n";
  echo '  "lines" : []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->options('/apitxt/group', function (){});
$app->get('/apitxt/group', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The group organizes resources into sections' . "\n";
  echo '' . "\n";
  echo '**group line**' . "\n";
  echo '' . "\n";
  echo 'group	name	description' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - the short name used for sections' . "\n";
  echo '+ field 2 - description - information about the group' . "\n";
  echo '' . "\n";
  echo '**group example**' . "\n";
  echo '' . "\n";
  echo 'group	Section name	an example section' . "\n";
  echo '' . "\n";
  echo '**group line relationships**' . "\n";
  echo '' . "\n";
  echo '```' . "\n";
  echo '    group' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - routes' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**group object**' . "\n";
  echo '' . "\n";
  echo '```json' . "\n";
  echo '{' . "\n";
  echo '  "group" : field[1],' . "\n";
  echo '  "description" : field[2],' . "\n";
  echo '  "lines": []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->options('/apitxt/route', function (){});
$app->get('/apitxt/route', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The route element allows access to a resource' . "\n";
  echo '' . "\n";
  echo '**route line**' . "\n";
  echo '' . "\n";
  echo 'route	URI template	name	description' . "\n";
  echo '' . "\n";
  echo '+ field 1 - URI template - a resource pattern with parameters' . "\n";
  echo '+ field 2 - name - the route name must be unique' . "\n";
  echo '+ field 3 - description - information about the resource' . "\n";
  echo '' . "\n";
  echo '**route example**' . "\n";
  echo '' . "\n";
  echo 'route	/example	an example route	a description of the route' . "\n";
  echo '' . "\n";
  echo '**route line relationships**' . "\n";
  echo '' . "\n";
  echo '```' . "\n";
  echo '    route' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - parameters' . "\n";
  echo '     | - methods' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**route object**' . "\n";
  echo '' . "\n";
  echo '```json' . "\n";
  echo '{' . "\n";
  echo '  "route" : field[1],' . "\n";
  echo '  "name" : field[2],' . "\n";
  echo '  "description" : field[3],' . "\n";
  echo '  "lines": [],' . "\n";
  echo '  "parameters": []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->options('/apitxt/parameter', function (){});
$app->get('/apitxt/parameter', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The parameter element is applied to the previous route' . "\n";
  echo '' . "\n";
  echo '**parameter line**' . "\n";
  echo '' . "\n";
  echo 'parameter	name	example	type	description' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - the name of a parameter for a route' . "\n";
  echo '+ field 2 - example - an example value for the parameter' . "\n";
  echo '+ field 3 - type - the parameter type, such as "string", "number", "boolean", "string, optional", "string, required"' . "\n";
  echo '+ field 4 - description - information about the parameter' . "\n";
  echo '' . "\n";
  echo '**parameter example**' . "\n";
  echo '' . "\n";
  echo 'parameter	country_code	US	string	the country code of interest' . "\n";
  echo '' . "\n";
  echo '**parameter line relationships**' . "\n";
  echo '' . "\n";
  echo 'parameter lines are added to a parameters array' . "\n";
  echo '' . "\n";
  echo '**parameters array**' . "\n";
  echo '' . "\n";
  echo '```json' . "\n";
  echo '{"parameters":' . "\n";
  echo '  [' . "\n";
  echo '    {' . "\n";
  echo '      "name" : " field[1],' . "\n";
  echo '      "example" : field[2],' . "\n";
  echo '      "type" : field[3],' . "\n";
  echo '      "description" : field[4]' . "\n";
  echo '    }' . "\n";
  echo '  ]' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->options('/apitxt/method', function (){});
$app->get('/apitxt/method', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The method element represents an action that can be performed on a route' . "\n";
  echo '' . "\n";
  echo '**method line**' . "\n";
  echo '' . "\n";
  echo 'method	HTTP method	name	description' . "\n";
  echo '' . "\n";
  echo '+ field 1 - HTTP method - the type of action to perform: GET, POST, PUT, DELETE' . "\n";
  echo '+ field 2 - name - the name of the action' . "\n";
  echo '+ field 3 - description - information about the method' . "\n";
  echo '' . "\n";
  echo '**method example**' . "\n";
  echo '' . "\n";
  echo 'method	GET	Get an example	This method retrieves an example document' . "\n";
  echo '' . "\n";
  echo '**method line relationships**' . "\n";
  echo '' . "\n";
  echo '```' . "\n";
  echo '    method' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - code' . "\n";
  echo '     | - requests' . "\n";
  echo '     | - responses' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**method object**' . "\n";
  echo '' . "\n";
  echo '```json' . "\n";
  echo '{' . "\n";
  echo '  "method" : field[1],' . "\n";
  echo '  "name" : field[2],' . "\n";
  echo '  "description" : field[3],' . "\n";
  echo '  "lines" : [],' . "\n";
  echo '  "code" : [],' . "\n";
  echo '  "dialog" : [' . "\n";
  echo '    {' . "\n";
  echo '      "request" : {},' . "\n";
  echo '      "responses" : []' . "\n";
  echo '    }' . "\n";
  echo '  ]' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->options('/apitxt/request', function (){});
$app->get('/apitxt/request', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The request element is associated with a specific method and can be paired with multiple responses.' . "\n";
  echo '' . "\n";
  echo '**request line**' . "\n";
  echo '' . "\n";
  echo 'request	name	type' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - uniquely identifies a request' . "\n";
  echo '+ field 2 - type - the content type of the request body' . "\n";
  echo '' . "\n";
  echo '**request example**' . "\n";
  echo '' . "\n";
  echo 'request	matching text within request body	plain/text' . "\n";
  echo '' . "\n";
  echo '**request line relationships**' . "\n";
  echo '' . "\n";
  echo '```' . "\n";
  echo '    request' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - headers' . "\n";
  echo '     | - body' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**request object**' . "\n";
  echo '' . "\n";
  echo '```json' . "\n";
  echo '{' . "\n";
  echo '  "name" : field[1],' . "\n";
  echo '  "type" : field[2],' . "\n";
  echo '  "lines" : [],' . "\n";
  echo '  "headers" : {},' . "\n";
  echo '  "body" : []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->options('/apitxt/response', function (){});
$app->get('/apitxt/response', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The response element is associated with a specific request, or associated with a specific method with an assumed generic request.' . "\n";
  echo '' . "\n";
  echo '**response line**' . "\n";
  echo '' . "\n";
  echo 'response	status	type' . "\n";
  echo '' . "\n";
  echo '+ field 1 - status - an HTTP response code indicating the status of the request' . "\n";
  echo '+ field 2 - type - the content type of the response body' . "\n";
  echo '' . "\n";
  echo '**response example**' . "\n";
  echo '' . "\n";
  echo 'response	200	plain/text' . "\n";
  echo '' . "\n";
  echo '**response line relationships**' . "\n";
  echo '' . "\n";
  echo '```' . "\n";
  echo '    response' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - headers' . "\n";
  echo '     | - body' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**response object**' . "\n";
  echo '' . "\n";
  echo '```json' . "\n";
  echo '{' . "\n";
  echo '  "status" : field[1],' . "\n";
  echo '  "type" : field[2],' . "\n";
  echo '  "lines" : [],' . "\n";
  echo '  "headers" : {},' . "\n";
  echo '  "body" : []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->options('/apitxt/header', function (){});
$app->get('/apitxt/header', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The header element is applied to a preceding request or response' . "\n";
  echo '' . "\n";
  echo '**header line**' . "\n";
  echo '' . "\n";
  echo 'header	name	value' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - the header variable name' . "\n";
  echo '+ field 2 - value - the header variable value' . "\n";
  echo '' . "\n";
  echo '**header example**' . "\n";
  echo '' . "\n";
  echo 'header	X-Powered-By	ApiTxt' . "\n";
  echo '' . "\n";
  echo '**header object**' . "\n";
  echo '' . "\n";
  echo '```json' . "\n";
  echo '{ field[1] : field[2] }' . "\n";
  echo '```' . "\n";
});

$app->options('/apitxt/body', function (){});
$app->get('/apitxt/body', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The body element adds contents to a preceding request or response.' . "\n";
  echo '' . "\n";
  echo 'The text of the body is everything after the string "body <TAB>"' . "\n";
});

$app->options('/apitxt/line', function (){});
$app->get('/apitxt/line', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The line element adds additional text to frame elements.' . "\n";
  echo '' . "\n";
  echo 'For the root, group, route, method, request, and response, the lines add details to an element.' . "\n";
  echo '' . "\n";
  echo 'The text of the line is everything after the string "line <TAB>".' . "\n";
});

$app->options('/apitxt/code', function (){});
$app->get('/apitxt/code', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'The code element adds functionality to the method element.' . "\n";
  echo '' . "\n";
  echo 'The code element contains programming text.  ApiTxt comes integrated with the PHP project the Slim Framework v2.  The conversion to working PHP adds boilerplate details for routes and method, with named parameters and query parameters available as functional variables.' . "\n";
  echo '' . "\n";
  echo 'The text of the code is everything after the string "code <TAB>".' . "\n";
});

/**********/
// ## Group apitxtfiles
$app->get('/apitxt', function () use ($app) {
  $app->redirect('apitxt/');
});
$app->options('/apitxt/', function (){});
$app->get('/apitxt/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/apitxt.html');
});

$app->run();
