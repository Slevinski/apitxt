<?php
// include/rewrite.php
$dir = substr($_SERVER['REQUEST_URI'],0,4);
if ($dir!="/pri" && $dir!="/dat" && $dir!="/doc" && $dir!="/api" && $dir!="/src") {
  $_SERVER['SCRIPT_NAME'] = str_replace(__DIR__, '', __FILE__);
  $_SERVER['SCRIPT_FILENAME'] = __FILE__;
  // Replicate the .htaccess rewrite to index.php
  $url_parts = parse_url($_SERVER["REQUEST_URI"]);
  $_req = rtrim($_SERVER['DOCUMENT_ROOT'] . $url_parts['path'], '/' . DIRECTORY_SEPARATOR);
  include __DIR__ . '/../index.php';
} else {
  if ($_SERVER['REQUEST_URI']=="/docs" || $_SERVER['REQUEST_URI']=="/docs/"){
    readfile(__DIR__ . "/../docs/index.htm");
  } else if ($_SERVER['REQUEST_URI']=="/api"){
    header("Location:/api/");
    die();
  } else if ($dir == "/api"){
    $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
    if (!file_exists($file)){
      $file = $_SERVER['DOCUMENT_ROOT'] . '/api' . $_SERVER['PATH_INFO'] . '.html';
      if (!file_exists($file)){
        header("Location:/api/");
        die();
        die();
      } else {
        header("Location:/api" . $_SERVER['PATH_INFO'] . ".html");
        die();
      }
    } else {
      return false;
    }
    die();
    echo var_dump($_SERVER);
    $name = substr($_SERVER['REQUEST_URI'],5);
    header("Location:/api/" . $name . ".html");
    die();
  } else if ($_SERVER['REQUEST_URI']=="/api/"){
    readfile(__DIR__ . "/../api/index.html");
  } else if ($_SERVER['REQUEST_URI']=="/src" || $_SERVER['REQUEST_URI']=="/src/"){
    header('Content-Type:text/plain');
    readfile(__DIR__ . "/../src/index.txt");
  } else {
    $file = __DIR__ . "/.." . $_SERVER['REQUEST_URI'];
    if(substr($_SERVER['REQUEST_URI'],-3) == ".md" && file_exists($file)) {
      header('Content-Type:text/markdown');
      readfile($file);
    } else {
      return false;
    }
  }
}
