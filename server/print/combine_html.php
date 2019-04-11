<?php
ini_set('max_execution_time', 300);
$prefix = $_REQUEST['file'] ?: 'NA';
$files = glob('temp/' . $prefix .'*html');
if (!count($files)){
  echo "invalid file";
  die();
}
header('Content-Disposition: attachment; filename="printout.html"');
$header = file_get_contents('temp/' . $prefix . '_header');
echo $header;

foreach ($files as $i=>$file){
  $html = file_get_contents($file);
  echo $html;
}

$footer = file_get_contents('temp/' . $prefix . '_footer');
echo $footer;
?>
