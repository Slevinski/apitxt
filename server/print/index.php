<?php
include "../include/data.php";
include "../include/user.php";
$dictionary = $_REQUEST['dictionary'];
$ids = $_REQUEST['ids'];
$showing = @$_REQUEST['showing'];
$interface = @$_REQUEST['interface']?:"en-US-interface-sp3";
$translations = interfaceKeySearch($interface,"print.%","");
//$tset = str_replace("\u0022","\\\"",json_encode( $translations,JSON_HEX_QUOT));
$tset = array();
foreach ($translations as $tran){
  $tset[$tran->key] = $tran->message;
}
$results = dictionarySearchId($dictionary,$ids,"","","","","");
$entries = $results['data'];
preg_match_all('/[0-9]+/', $ids, $matches);
$ids = array_unique($matches[0]);
$valid = array();
$output = array();
foreach ($entries as $entry){
  $id = $entry['id'];
  if (in_array($id,$ids)) {
    $valid[] = $id;
    $output[$id] = ["sign"=>$entry["sign"],"term"=>$entry['terms'][0],"lower"=>$entry['lower'][0]];
  }  
}
$ids = implode($valid,',');
$json = str_replace("\u0022","\\\"",json_encode( $output,JSON_HEX_QUOT));
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SignPuddle Printing</title>
  <script src="inc/mithril.min.js"></script>
  <script src="inc/draggabilly.min.js"></script>
  <script src="inc/SuttonSignWriting.min.js"></script>
  <script>
    var interface = '<?php echo $interface;?>';
    var tset = <?php echo json_encode($tset);?>;
    var dictionary = '<?php echo $dictionary;?>';
    var ids = [<?php echo $ids;?>];
    var entries = <?php echo $json;?>;
    var showing = '<?php echo $showing;?>';
  </script>
  <link rel="stylesheet" href="inc/print.css?v=20190704" />
</head>
<body>
  <div id="printing"></div>
  <script src="inc/print.js?v=20190411"></script>
</body>
</html>
