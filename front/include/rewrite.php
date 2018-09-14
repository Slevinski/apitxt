<?php
// start_front.sh for front
// include/rewrite.php

if ($_SERVER['REQUEST_URI']=="/doc" || $_SERVER['REQUEST_URI']=="/api" || $_SERVER['REQUEST_URI']=="/src"){
  header("Location:" .$_SERVER['REQUEST_URI'] . "/");
  die();
}

$ext = array("/doc/"=>".htm","/api/"=>".html","/src/"=>".txt");

if ($_SERVER['REQUEST_URI']=="/doc/" || $_SERVER['REQUEST_URI']=="/api/" || $_SERVER['REQUEST_URI']=="/src/"){
  header("Location:" . $_SERVER['REQUEST_URI'] . "index" . $ext[$_SERVER['REQUEST_URI']]);
  die();
}

$dir = substr($_SERVER['REQUEST_URI'].'/',0,5);
if ($dir == "/doc/" || $dir == "/api/" || $dir == "/src/"){
  $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
  if (!file_exists($file)){
    $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['REQUEST_URI'] . $ext[$dir];
  }
} else {
  $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
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
  header("Status:404");
  die();
}
