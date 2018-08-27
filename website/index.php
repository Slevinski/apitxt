<?php
/**
* API v1.0.0
* generated with tools/json2php.py from https://github.com/Slevinski/apitxt
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, ETag, If-None-Match');
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
// ## Group files
$app->get('', function () use ($app) {
  $app->redirect('/');
});
$app->options('/', function (){});
$app->get('/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/html');
  getFile('index.html');
});

$app->options('/index.js', function (){});
$app->get('/index.js', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('application/javascript');
  getFile('index.js');
});

$app->options('/index.css', function (){});
$app->get('/index.css', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/css');
  getFile('index.css');
});

$app->options('/include/common.css', function (){});
$app->get('/include/common.css', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/css');
  getFile('include/common.css');
});

$app->options('/include/common.js', function (){});
$app->get('/include/common.js', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/javascript');
  getFile('include/common.js');
});

$app->options('/include/world.js', function (){});
$app->get('/include/world.js', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/javascript');
  getFile('include/world.js');
});

$app->options('/include/min.js', function (){});
$app->get('/include/min.js', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/javascript');
  getFile('include/min.js');
});

$app->options('/include/SuttonSignWriting.min.js', function (){});
$app->get('/include/SuttonSignWriting.min.js', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/javascript');
  getFile('include/SuttonSignWriting.min.js');
});

$app->options('/include/icons.js', function (){});
$app->get('/include/icons.js', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/javascript');
  getFile('include/icons.js');
});

$app->options('/include/noscript.css', function (){});
$app->get('/include/noscript.css', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/css');
  getFile('include/noscript.css');
});

$app->options('/include/icon.svg', function (){});
$app->get('/include/icon.svg', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('image/svg+xml');
  getFile('include/icon.svg');
});

/**********/
// ## Group tools
// Resources related to tools
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

/**********/
// ## Group toolsfiles
$app->get('/tools', function () use ($app) {
  $app->redirect('/tools/');
});
$app->options('/tools/', function (){});
$app->get('/tools/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/tools.html');
});

/**********/
// ## Group fsw
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
  $app->redirect('/fsw/');
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
  $app->redirect('/swu/');
});
$app->options('/swu/', function (){});
$app->get('/swu/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/swu.html');
});

/**********/
// ## Group user
// SignPuddle 3 collections are organized by country and language codes
$app->get('/user/who', function () use ($app) {
  $app->redirect('/user/who/');
});
$app->options('/user/who/', function (){});
$app->get('/user/who/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  echo 'BR' . "\n";
  echo 'US' . "\n";
});

$app->options('/user/salt', function (){});
$app->get('/user/salt', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
    echo userSalt();
});

$app->options('/user/login', function (){});
$app->post('/user/login', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
    $data = $app->request->getbody();
    $data = json_decode($data,true);
    $results = userVerify($data['username'],$data['salt'],$data['salted']);
    $return = array();
    $return['meta']=array();
    $return['results']=$results;
    $return['meta']['method']='POST';
    $return['meta']['location']='/user/login';
    $return['meta']['searchTime'] = searchtime($timein);
    echo json_pretty($return);
});

/**********/
// ## Group userfiles
$app->get('/user', function () use ($app) {
  $app->redirect('/user/');
});
$app->options('/user/', function (){});
$app->get('/user/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/user.html');
});

/**********/
// ## Group collectionfiles
$app->get('/collection', function () use ($app) {
  $app->redirect('/collection/');
});
$app->options('/collection/', function (){});
$app->get('/collection/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  getFile('api/collection.html');
});

$app->run();
