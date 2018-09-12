<?php
// include/rewrite.php
$dir = substr($_SERVER['REQUEST_URI'].'/',0,5);
$ext = array("/doc/"=>".htm","/api/"=>".html","/src/"=>".txt");

  if ($_SERVER['REQUEST_URI']=="/doc" || $_SERVER['REQUEST_URI']=="/api" || $_SERVER['REQUEST_URI']=="/src"){
    header("Location:" .$dir . "index" . $ext[$dir]);
    die();
  } else if ($_SERVER['REQUEST_URI']=="/doc/" || $_SERVER['REQUEST_URI']=="/api/" || $_SERVER['REQUEST_URI']=="/src/"){
    header("Location:" . $dir . "index" . $ext[$dir]);
    die();
  } else if ($dir == "/doc/" || $dir == "/api/" || $dir == "/src/"){
    $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
    if (file_exists($file)){
      if(substr($_SERVER['REQUEST_URI'],-3) == ".md" && file_exists($file)) {
        header('Content-Type:text/plain');
        readfile($file);
        die();
      } else {
        return false;
      }
    } else {
      $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['REQUEST_URI'] . $ext[$dir];
      if (!file_exists($file)){
        header("Location:" .$dir . "index" . $ext[$dir]);
      } else {
        header("Location:" . $_SERVER['REQUEST_URI'] . $ext[$dir]);
      }
      die();
    }
  } else if ($_SERVER['REQUEST_URI']=="/api"){
    header("Location:/api/");
    die();
  } else if ($_SERVER['REQUEST_URI']=="/api/"){
    readfile(__DIR__ . "/../api/index.html");
  } else if ($dir == "/api/"){
    $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
    if (!file_exists($file)){
      $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['REQUEST_URI'] . '.html';
      if (!file_exists($file)){
        header("Location:/api/");
      } else {
        header("Location:" . $_SERVER['REQUEST_URI'] . ".html");
      }
      die();
    } else {
      return false;
    }
  } else if ($_SERVER['REQUEST_URI']=="/src"){
    header("Location:/src/");
    die();
  } else if ($_SERVER['REQUEST_URI']=="/src/"){
    header('Content-Type:text/plain');
    readfile(__DIR__ . "/../src/index.txt");
  } else if ($dir == "/src/"){
    $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
    if (!file_exists($file)){
      $file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['REQUEST_URI'] . '.txt';
      if (!file_exists($file)){
        header("Location:/src/");
      } else {
        header("Location:" . $_SERVER['REQUEST_URI'] . ".txt");
      }
      die();
    } else {
      return false;
    }
  } else {
    $file = __DIR__ . "/.." . $_SERVER['REQUEST_URI'];
    if(substr($_SERVER['REQUEST_URI'],-3) == ".md" && file_exists($file)) {
      header('Content-Type:text/markdown');
      readfile($file);
    } else {
      return false;
    }
  }
