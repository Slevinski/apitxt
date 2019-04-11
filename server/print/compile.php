<?php
// reference the Dompdf namespace
ini_set('max_execution_time', 300);
putenv('TMPDIR=temp');
if (!extension_loaded('imagick')) {
  die ('Imagick required');
}
 
$dictionary = $_REQUEST['dictionary'];
$ids = $_REQUEST['ids'];
$output = $_REQUEST['output'] ?: 'pdf';
$title = htmlspecialchars($_REQUEST['title'], ENT_QUOTES, 'UTF-8');
$titles = $_REQUEST['titles'];
$cols = $_REQUEST['cols'];
$format = $_REQUEST['format'];
$orientation = $_REQUEST['orientation'];
$limit = @$_REQUEST['limit'] ?: 0;
$chunk = @$_REQUEST['chunk'] ?: 100;
$imgmax = @$_REQUEST['imgmax'] ?: 150;
error_reporting(E_ALL);
include "../include/data.php";
include "../include/user.php";
include "../include/signwriting.php";
$url = "http";
if ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || $_SERVER['SERVER_PORT'] == 443){
  $url .= "s";
}
$url .= "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$prefix = 'print_' . uniqid();
$colnum = 0;
foreach ($cols as $col){
  $colnum++;
  if ($col=="wide") $colnum++;
}
$colclass = "cols" . $colnum;
$th = '';
foreach($titles as $i=>$col){
  $col = htmlspecialchars($col, ENT_QUOTES, 'UTF-8');
  $th .= '<th class="titles"';
  if ($cols[$i]=="wide"){ 
    $th .= ' colspan="2"';
  }
  $th .= '>' . $col . '</th>';
}
$header = <<<EOT
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
  @page {
    margin: 50px 50px;
  }
  @media print {    
    .footer, .footer * {
      display: none !important;
    }
  }
  table tr td, table tr th {
    page-break-inside: avoid;
  }
  .footer {
    position: fixed;
    bottom: -50px;
    left: 0px;
    right: 0px;
    height: 50px;
    overflow: hidden;
    text-align: center;
  }
  .pagenum:after {
    content: counter(page);
  }
  table {
    width: 100%;
  }
  th.title {
    font-size: 200%;
  }
  th.titles {
    border: 1px solid;
  }
  td {
    border: 1px solid;
    padding: 5px;
    vertical-align: middle;
    text-align: center;
    font-size: 150%;
  }
  td.cols1 { width: 100%; }
  td.cols2 { width: 50%; }
  td.cols3 { width: 33%; }
  td.cols4 { width: 25%; }
  td.cols5 { width: 20%; }
  td.cols6 { width: 16%; }
  td.cols2wide { width: 100%; }
  td.cols3wide { width: 66%; }
  td.cols4wide { width: 50%; }
  td.cols5wide { width: 40%; }
  td.cols6wide { width: 32%; }
</style>
</head>
<body>
  <div style="counter-increment: page 0;"></div> 
  <div class="footer">
    <span class="pagenum"></span>
  </div>
  <table>
    <thead>
     <tr>
       <th class="title" colspan="$colnum">$title</th>
     </tr>
     <tr>
       $th
     </tr>
    </thead>
    <tbody>

EOT;
$file = $prefix . '_header';
$fp = fopen('temp/' . $file, 'w');
fwrite($fp, $header);
fclose($fp);

$footer = <<<EOT
    </tbody>
  </table>
</body>
</html>
EOT;
$file = $prefix . '_footer';
$fp = fopen('temp/' . $file, 'w');
fwrite($fp, $footer);
fclose($fp);

$results = dictionarySearchId($dictionary,$ids,"","","","","");
$entries = array();

foreach ($results['data'] as $entry){
  $id = $entry['id'];
  $terms = $entry['terms']?:[$entry['id']];
  $entries[$id] = ["sign"=>$entry["sign"],"term"=>$terms[0],"detail"=>$entry['detail']];
}

$image = new Imagick();
$pad = 10;

$chunks = array_chunk(explode(',',$ids),$chunk);
echo "<p>Creating " . count($chunks) . " HTML file(s)<br>";
ob_flush();flush();
foreach ($chunks as $i=>$part){
  $file = $prefix . '_' . str_pad($i,3,"0",STR_PAD_LEFT) . '.html';
  $fp = fopen('temp/' . $file, 'w');
  foreach ($part as $id){
    $row = '<tr>';
    foreach($cols as $col){
      switch ($col) {
        case 'term':
          $row .= '<td class="' . $colclass . '">' . $entries[$id]['term'] . '</td>';
          break;
        case 'sign':
          $fsw = SignWriting\swu2fsw($entries[$id]['sign']);
          if ($fsw){
            $svg = SignWriting\svg($fsw . '-P' . $pad);
            $bbox = explode(' ',SignWriting\bbox($fsw));
            $x1 = $bbox[0];
            $x2 = $bbox[1];
            $y1 = $bbox[2];
            $y2 = $bbox[3];
            $width = 2*$pad + $x2 - $x1; 
            $height = 2*$pad + $y2 - $y1; 
            $svg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'.$svg;
            $start = strpos($svg,"<text");
            $end = strpos($svg,"/text>");
            $start = substr($svg,0,$start);
            $end = substr($svg,$end+6);
            $svg = $start . $end;
            $image->readImageBlob($svg);
            $image->setImageFormat("jpeg");
            $row .= '<td class="' . $colclass . '"><img alt="' . $fsw . '" width="' . $width . '" height="' . $height . '" src="data:image/jpeg;base64,' . base64_encode($image->getImageBlob()) . '"></td>';
          } else {
            $row .= '<td class="' . $colclass . '"> </td>';
          }
          break;
        case 'gesture':
        case 'visual':
        case 'picture':
        case 'image':
          $data = '';
          if (array_key_exists('images',$entries[$id]['detail']) && array_key_exists($col,$entries[$id]['detail']->images)){
            $file = "../data/img/" . $dictionary . "/" . $entries[$id]['detail']->images->$col;
            $data = @file_get_contents($file);
          }
          if ($data){
            $size = getimagesizefromstring($data);
            if ($size[0]>$imgmax){
              $size[1] = $size[1]*$imgmax/$size[0];
              $size[0] = $imgmax;
            }
            if ($size[1]>$imgmax){
              $size[0] = $size[0]*$imgmax/$size[1];
              $size[1] = $imgmax;
            }
            $row .= '<td class="' . $colclass . '"><img width="' . $size[0] . '" height="' . $size[1] . '" src="data:' . $size['mime'] . ';base64,' . base64_encode($data) . '"></td>';
          } else {
            $row .= '<td class="' . $colclass . '"> </td>';
          }
          break;
        case 'empty':
          $row .= '<td class="' . $colclass . '"> </td>';
          break;
        case 'wide':
          $row .= '<td class="' . $colclass . 'wide" colspan="2"> </td>';
          break;
      }
    }
    $row .= '</tr>' . "\n";

    fwrite($fp, $row);
  }
  fclose($fp);
  echo ($i+1) . " ";
  ob_flush();flush();
}
if (strpos($url, '?')) {
  $url .= '&file=' . $prefix;
} else {
  $url .= '?file=' . $prefix;
}
if ($output=='pdf'){
  $url = str_replace('compile.php','create_pdf.php',$url);
  echo '<a href="' . $url . '">Create PDFs</a>';
  echo '<script type="text/javascript">window.location = "' . $url . '"</script>';
  ob_flush();flush();
  die();
} else {
  $url = str_replace('compile.php','combine_html.php',$url);
  //echo '<a href="' . $url . '">Combine HTMLs</a>';
  echo '<script type="text/javascript">window.location = "' . $url . '"</script>';
  ob_flush();flush();
  die();
}
?>
