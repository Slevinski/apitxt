<?php
ini_set('max_execution_time', 300);
$format = @$_REQUEST['format'] ?: 'A4';
$orient = @$_REQUEST['orient'] ?: 'portrait';
$file = $_REQUEST['file'] ?: 'NA';
$files = glob('temp/' . $file .'*pdf');
//$files = array_slice($files,0,3);
if (!count($files)){
  echo "invalid file";
  die();
}
include 'vendor/fpdf/fpdf.php';
include 'vendor/fpdi/fpdi.php';
class ConcatPdf extends FPDI
{
    public $files = array();

    public function setFiles($files)
    {
        $this->files = $files;
    }

    public function concat()
    {
        foreach($this->files AS $file) {
            $pageCount = $this->setSourceFile($file);
            for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
                $tplIdx = $this->ImportPage($pageNo);
                $s = $this->getTemplatesize($tplIdx);
                $this->AddPage($s['w'] > $s['h'] ? 'L' : 'P', array($s['w'], $s['h']));
                $this->useTemplate($tplIdx);
            }
        }
    }
}
$pdf = new ConcatPdf();
$pdf->setFiles($files);
$pdf->concat();
$pdf->Output('example.pdf', 'D');
?>
