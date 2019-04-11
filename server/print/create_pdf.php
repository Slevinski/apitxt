<?php
ini_set('max_execution_time', 300);
putenv('TMPDIR=temp');
$format = @$_REQUEST['format'] ?: 'A4';
$orientation = @$_REQUEST['orientation'] ?: 'portrait';
$file = $_REQUEST['file'] ?: 'NA';
$files = glob('temp/' . $file .'*html');
if (!count($files)){
  echo "invalid file";
  die();
}
$url = "http";
if ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || $_SERVER['SERVER_PORT'] == 443){
  $url .= "s";
}
$url .= "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$header = file_get_contents('temp/' . $file . '_header');
$footer = file_get_contents('temp/' . $file . '_footer');

require_once 'vendor/pdf/autoload.inc.php';
use Dompdf\Dompdf;
use Dompdf\Options;
$options = new Options();
//$options->setIsRemoteEnabled(true);
echo "<p>Creating " . count($files) . " PDF file(s)<br>";
ob_flush();flush();
$pages = 0;
foreach ($files as $i=>$file){
  if(file_exists(str_replace('.html','.pdf',$file))){
    continue;
  }
  $dompdf = null;
  $dompdf = new Dompdf();
  $html = file_get_contents($file);
  $html = $header . $html . $footer;
  $dompdf->loadHtml(str_replace('counter-increment: page 0;','counter-increment: page ' . $pages . ';',$html));
  // (Optional) Setup the paper size and orientation
  $dompdf->setPaper($format, $orientation);

  // Render the HTML as PDF
  $dompdf->render();
  $pages += $dompdf->get_canvas()->get_page_count();
  $pdf = $dompdf->output();  
  file_put_contents(str_replace('.html','.pdf',$file),$pdf);
  echo ($i+1) . " ";
  ob_flush();flush();
}
//echo '<a href="' . str_replace('create_pdf.php','combine_pdf.php',$url) . '">Combine</a>';
echo '<script type="text/javascript">window.location = "' . str_replace('create_pdf.php','combine_pdf.php',$url) . '"</script>';
ob_flush();flush();
die();
?>
