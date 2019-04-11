<?php
// start_server.sh for client and server
// rewrite.php
$_SERVER['PHP_SELF'] = rtrim($_SERVER['PHP_SELF'],'/');
$_SERVER['DOCUMENT_ROOT'] = str_replace("\\","/",$_SERVER['DOCUMENT_ROOT']);
$_SERVER['SCRIPT_FILENAME'] = str_replace("\\","/",$_SERVER['SCRIPT_FILENAME']);

chdir ("..");

if (substr($_SERVER['SCRIPT_NAME'],0,21) == "/server/data/security") {
  http_response_code(404);
  echo "Not Found";
  die();
}

if (substr($_SERVER['SCRIPT_NAME'],0,7) == "/server"){

  if (substr($_SERVER['SCRIPT_NAME'],0,12) == "/server/data"){
    $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];

    if (is_dir($file)){
      header('Content-Type:text/plain');
      $files = scandir($file);
      foreach ($files as $file) {
        if ($file!='.' && $file!='..' && $file[0]!='.' && substr($file,0,8) !='security') print $file . "\n";
      }
      die();
    }
    if (file_exists($file)){
      $parts = pathinfo($file);
      switch ($parts['extension']){
        case 'css':
        header('Content-Type:text/css');
        break;
        case 'svg':
        header('Content-Type:image/svg+xml');
        break;
      case 'png':
        header('Content-Type:image/png');
        break;
      case 'gif':
        header('Content-Type:image/gif');
        break;
      case 'htm':
      case 'html':
        header('Content-Type:text/html; charset=utf-8');
        break;
      case 'js':
        header('Content-Type:application/javascript');
        break;
      case 'json':
        header('Content-Type:application/json');
        break;
      default:
        header('Content-Type:text/plain; charset=utf-8');
      }
      readfile($file);
      die();
    }
  } else if (substr($_SERVER['SCRIPT_NAME'],0,13) == "/server/print"){
    if (substr($_SERVER['REQUEST_URI'],0,14)=="/server/print?") {
      header("Location:/server/print/?" . $_SERVER['QUERY_STRING']);
      die();
    } else {
      return false;
    }
  } else {
    //fix for dot in url
    $_SERVER['SCRIPT_NAME'] = '/index.php';
    $_SERVER['PATH_INFO'] = $_SERVER['REQUEST_URI'];
    $_SERVER['PHP_SELF'] = $_SERVER['SCRIPT_NAME'] . ($_SERVER['REQUEST_URI'] === '/' ? '' : $_SERVER['REQUEST_URI']);
    //fix
    chdir("server");
    $_SERVER['DOCUMENT_ROOT'] .= "/server";
    $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'],7);
    $_SERVER['SCRIPT_NAME'] = substr($_SERVER['SCRIPT_NAME'],7);
    $_SERVER['PHP_SELF'] = substr($_SERVER['PHP_SELF'],7);

    $url_parts = parse_url($_SERVER["REQUEST_URI"]);
    $_req = rtrim($_SERVER['DOCUMENT_ROOT'] . $url_parts['path'], '/' . DIRECTORY_SEPARATOR);
    include $_SERVER['DOCUMENT_ROOT'] . '/index.php';
    die();
  }
}

if ($_SERVER['REQUEST_URI'] =='/source') {
  header("Location:/source/");
  die();
}
if ($_SERVER['REQUEST_URI'] =='/tools') {
  header("Location:/tools/");
  die();
}
if ($_SERVER['REQUEST_URI'] =='/system') {
  header("Location:/system/");
  die();
}
if ($_SERVER['REQUEST_URI'] =='/client') {
  header("Location:/client/");
  die();
}
if ($_SERVER['REQUEST_URI']=="/client/doc" || $_SERVER['REQUEST_URI']=="/client/api" || $_SERVER['REQUEST_URI']=="/client/src"){
  header("Location:" .$_SERVER['REQUEST_URI'] . "/");
  die();
}
$ext = array("/client/doc/"=>".htm","/client/api/"=>".html","/client/src/"=>".txt");
if ($_SERVER['REQUEST_URI']=="/client/doc/" || $_SERVER['REQUEST_URI']=="/client/api/" || $_SERVER['REQUEST_URI']=="/client/src/"){
  header("Location:" .$_SERVER['REQUEST_URI'] . "index" . $ext[$_SERVER['REQUEST_URI']]);
  die();
}

$dir = substr($_SERVER['REQUEST_URI'],0,12);
if ($dir == "/client/doc/" || $dir == "/client/api/" || $dir == "/client/src/"){
  $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
  if (!file_exists($file)){
    $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['REQUEST_URI'] . $ext[$dir];
  }
} else {
  $file = $_SERVER['SCRIPT_FILENAME'];
}
if (is_dir($file)){
  header('Content-Type:text/plain');
  $files = scandir($file);
  foreach ($files as $file) {
    if ($file!='.' && $file!='..') print $file . "\n";
  }
  die();
}
if (file_exists($file)){
  $parts = pathinfo($file);
  switch ($parts['extension']){
    case 'css':
    header('Content-Type:text/css');
    break;
    case 'svg':
    header('Content-Type:image/svg+xml');
    break;
  case 'png':
    header('Content-Type:image/png');
    break;
  case 'gif':
    header('Content-Type:image/gif');
    break;
  case 'htm':
  case 'html':
    header('Content-Type:text/html; charset=utf-8');
    break;
  case 'js':
    header('Content-Type:application/javascript');
    break;
  case 'json':
    header('Content-Type:application/json');
    break;
  default:
    header('Content-Type:text/plain; charset=utf-8');
  }
  readfile($file);
  die();
} else {
  while ($file){
    $file = substr($file, 0, strrpos($file, "/"));
    if (is_dir($file)){
      $file = str_replace($_SERVER['DOCUMENT_ROOT'],"",$file);
      $file = $file?:'/';
      header("Location:" . $file);
      die();
    }
  }
  http_response_code(404);
  echo "Not Found";
  die();
}
