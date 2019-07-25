<?php
namespace SignWriting;

$structure = ["kind"=>['S100','S37f','S387'],
  "category"=>['S100','S205','S2f7','S2ff','S36d','S37f','S387'],
  "group"=>['S100','S10e','S11e','S144','S14c','S186','S1a4','S1ba','S1cd','S1f5','S205','S216','S22a','S255','S265','S288','S2a6','S2b7','S2d5','S2e3','S2f7','S2ff','S30a','S32a','S33b','S359','S36d','S376','S37f','S387']
];

$define = (array) [
  "utf-8" => [
    "character" => [
      "a sign written as a word",
      "\\xF0\\x9D\\xA0\\x80",
      "(\\\\x[fF][01](\\\\x[0-9a-fA-F]{2}){3})+"
    ]
  ],
  "utf-16" => [
    "character" => [
      "a sign written as a word",
      "\\uD836\\uDC00",
      "(\\\\u[dD]8[0-9a-fA-F]{2}\\\\u[dD][c-fC-F][0-9a-fA-F]{2})+"
    ]
  ],
  "utf-32" => [
    "character" => [
      "a sign written as a word",
      "\\x{1D800}",
      "(\\\\x\{[14][0-9a-fA-F]{4}\})+"
    ]
  ],
  "fsw" => [
    "sign" => [
      "a sign written as a word",
      "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520",
      "({sort}({symbol})+)?{box}{coord}({spatial})*"
    ],
    "term" => [
      "a sign with a sorting previx",
      "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520",
      "{sort}({symbol})+{box}{coord}({spatial})*"
    ],
    "spatial" => [
      "symbol with coordinate",
      "S10000500x500",
      "{symbol}{coord}"
    ],
    "symbol" => [
      "individual symbol",
      "S10000",
      "S[123][0-9a-f]{2}[0-5][0-9a-f]"
    ],
    "coord" => [
      "coordinate",
      "500x500",
      "[0-9]{3}x[0-9]{3}"
    ],
    "sort" => [
      "sort prefix marker",
      "A",
      "A"
    ],
    "box" => [
      "sign box marker",
      "B",
      "[BLMR]"
    ]
  ],
  "query" => [
    "full" => [
      "query string for searching",
      "QS20310S26b02S33100",
      "Q((A({symbol}|{range})+)?T)?(({symbol}{coord})|({range}{coord}))*({var})?-?"
    ],
    "base" => [
      "symbol base definition",
      "100",
      "[123][0-9a-f]{2}",
      "([RSt])[123][0-9a-f]{2}"
    ],
    "symbol" => [
      "symbol search definition",
      "S100uu",
      "S{base}[0-5u][0-9a-fu]"
    ],
    "range" => [
      "symbol range",
      "RS100tS104",
      "R{base}t{base}"
    ],
    "coord" => [
      "coordinate",
      "500x500",
      "([0-9]{3}x[0-9]{3})?",
      "()[0-9]{3}x[0-9]{3}"
    ],
    "var" => [
      "variance",
      "V5",
      "V[0-9]+"
    ]
  ],
  "swu" => [
    "sign" => [
      "a sign written as a word",
      "𝠀񂱡񂇙񆿃𝠃𝤝𝤔񂇙𝣰𝣹񆿃𝤎𝤁񂱡𝣽𝤀",
      "({sort}({symbol})+)?{box}{coord}({spatial})*"
    ],
    "term" => [
      "a sign with a sorting prefix",
      "𝠀񂱡񂇙񆿃𝠃𝤝𝤔񂇙𝣰𝣹񆿃𝤎𝤁񂱡𝣽𝤀",
      "{sort}({symbol})+{box}{coord}({spatial})*"
    ],
    "spatial" => [
      "symbol with coordinate",
      "񂱡𝣽𝤀",
      "{symbol}{coord}"
    ],
    "symbol" => [
      "individual symbol",
      "񂱡",
      "[\x{40000}-\x{4F428}]"
    ],
    "coord" => [
      "coordinate",
      "𝣽𝤀",
      "[\x{1D80C}-\x{1D9FF}]{2}"
    ],
    "sort" => [
      "sort prefix marker",
      "𝠀",
      "\x{1D800}"
    ],
    "box" => [
      "sign box marker",
      "𝠃",
      "[\x{1D801}-\x{1D804}]"
    ]
  ],
  "queryu" => [
    "full" => [
      "query string for searching",
      "QA񂱡T",
      "Q((A({symbol}|{range})+)?T)?(({symbol}{coord})|({range}{coord}))*({var})?-?"
    ],
    "base" => [
      "symbol base definition",
      "񂱡",
      "[\x{40000}-\x{4F428}]"
    ],
    "symbol" => [
      "symbol search definition",
      "񂱡f",
      "{base}f?r?"
    ],
    "range" => [
      "symbol range",
      "R񂇙񂱡",
      "R{base}{2}"
    ],
    "coord" => [
      "coordinate",
      "𝣽𝤀",
      "([\x{1D80C}-\x{1D9FF}]{2})?",
      "()[\x{1D80C}-\x{1D9FF}]{2}"
    ],
    "var" => [
      "variance",
      "V5",
      "V[0-9]+"
    ]
  ],
  "style" => [
    "full" => [
      "a style string",
      "-C",
      "-{colorize}?({padding})?({background})?({detail})?({zoom})?(-({detailsym})*({zoomsym})*)?({classes}({id})?)?"
    ],
    "colorize" => [
      "a colorize string",
      "C",
      "C",
      "(-)C"
    ],
    "padding" => [
      "a padding string",
      "P10",
      "P[0-9]{2}",
      "(-{colorize}?){padding}"
    ],
    "background" => [
      "a background string",
      "G_red_",
      "G{color}",
      "(-{colorize}?({padding})?){background}"
    ],
    "detail" => [
      "a detail string",
      "D_ff00ff_",
      "D{colors}",
      "(-{colorize}?({padding})?({background})?){detail}"
    ],
    "zoom" => [
      "a zoom string",
      "-C",
      "Z([0-9]+(\.[0-9]+)?|x)",
      "(-{colorize}?({padding})?({background})?({detail})?){zoom}"
    ],
    "detailsym" => [
      "a symbol detail string",
      "D01_ff00ff_",
      "D[0-9]{2}{colors}",
      "(-{colorize}?({padding})?({background})?({detail})?)-({detailsym})+"
    ],
    "zoomsym" => [
      "a symbol zoom string",
      "Z01,2",
      "Z[0-9]{2},[0-9]+(\.[0-9]+)?(,[0-9]{3}x[0-9]{3})?",
      "(-{colorize}?({padding})?({background})?({detail})?-({detailsym})*)({zoomsym})+"
    ],
    "color" => [
      "a color for styling",
      "_green_",
      "_([0-9a-fA-F]{3}([0-9a-fA-F]{3})?|[a-zA-Z]+)_",
      "([CD]){color}"
    ],
    "colors" => [
      "a color for styling",
      "_green,red_",
      "_([0-9a-fA-F]{3}([0-9a-fA-F]{3})?|[a-zA-Z]+)(,([0-9a-fA-F]{3}([0-9a-fA-F]{3})?|[a-zA-Z]+))?_",
      "()_([0-9a-fA-F]{3}([0-9a-fA-F]{3})?|[a-zA-Z]+)(,([0-9a-fA-F]{3}([0-9a-fA-F]{3})?|[a-zA-Z]+))_"
    ],
    "classes" => [
      "a class name for html",
      "-blinking success!",
      "--?[_a-zA-Z][_a-zA-Z0-9-]{0,100}( -?[_a-zA-Z][_a-zA-Z0-9-]{0,100})*!",
      "((-[a-zA-Z0-9._,]+){2}){classes}"
    ],
    "id" => [
      "an id name for html",
      "result!",
      "[a-zA-Z][_a-zA-Z0-9-]{0,100}!",
      "((-[a-zA-Z0-9._,]+){2}{classes})({id})"
    ]
  ]
];

foreach ($define as $s=>$section){
  foreach ($section as $p=>$part){
    $pattern = '/\{[a-z]+\}/';
    $result = @preg_match_all($pattern,$define[$s][$p][2],$matches);
    if ($result) {
      $matches = array_unique($matches[0]);
      $find = [];
      $replace = [];
        foreach ($matches as $match){
        $find[] = $match;
        $match = substr($match,1,-1);
        $replace[] = $section[$match][2];
      }
      $define[$s][$p][2] = str_replace($find,$replace,$define[$s][$p][2]);
    }
    $result = @preg_match_all($pattern,$define[$s][$p][2],$matches);
    if ($result) {
      $matches = array_unique($matches[0]);
      $find = [];
      $replace = [];
        foreach ($matches as $match){
        $find[] = $match;
        $match = substr($match,1,-1);
        $replace[] = $section[$match][2];
      }
      $define[$s][$p][2] = str_replace($find,$replace,$define[$s][$p][2]);
    }
    $result = @preg_match_all($pattern,$define[$s][$p][3],$matches);
    if ($result) {
      $matches = array_unique($matches[0]);
      $find = [];
      $replace = [];
        foreach ($matches as $match){
        $find[] = $match;
        $match = substr($match,1,-1);
        $replace[] = $section[$match][2];
      }
      $define[$s][$p][3] = str_replace($find,$replace,$define[$s][$p][3]);
    }
    $result = @preg_match_all($pattern,$define[$s][$p][3],$matches);
    if ($result) {
      $matches = array_unique($matches[0]);
      $find = [];
      $replace = [];
      foreach ($matches as $match){
        $find[] = $match;
        $match = substr($match,1,-1);
        $replace[] = $section[$match][2];
      }
      $define[$s][$p][3] = str_replace($find,$replace,$define[$s][$p][3]);
    }
  }
}

function define($section='',$part=''){
  global $define;
  if (array_key_exists($section,$define)){
    if (array_key_exists($part,$define[$section])){
      return $define[$section][$part];
    } else {
      return $define[$section];
    }
  } else {
    return $define;
  }
}

function parse($text){
  global $define;
  $text = str_replace ('\\\\', '\\', $text);
  $matched = array();
  foreach ($define as $s=>$section){
    foreach ($section as $p=>$part){
      if (isset($part[3])) {
        $pattern = '/' . $part[3] . '/';
      } else {
        $pattern = '/' . $part[2] . '/';
      }
      if (strpos($pattern,"\\x{")) {
        $pattern .= 'u';
      }
      $result = @preg_match_all($pattern,$text,$matches);
      if ($result) {
        foreach ($matches[0] as $i=>$match){
          if (isset($part[3])) {
            $matched[$s][$p][] = str_replace($matches[1][$i],'',$match);
          } else {
            $matched[$s][$p][] = $match;
          }
        }
      }
      $err = preg_last_error();
      if ($err){
        return $part;
      }
    }
  }
  return $matched;
}

function cast($text,$utf){
  if ($utf==16) return $text;
  global $define;
  $pattern = "/" . $define['utf-16']["character"][2] . "/";
  $result = preg_match_all($pattern,$text,$matches);
  if ($result){
    $matches = array_unique($matches[0]);
    foreach ($matches as $match){
      $chars = json_decode('"' . $match .'"');
      $replace = '';
      switch($utf){
        case "8":
          $replace = utf8($chars);
          break;
        case "32":
          $replace = utf32($chars);
          break;
        case "x":
          $replace = $chars;
          break;
        default:
          return $text;
      }
      $text = str_replace($match,$replace,$text);
    }
  }
  return $text;
}

function utf8($text){
  global $define;
  $pattern = "/[\x{1D800}-\x{1D9FF}\x{40000}-\x{4F428}]/u";
  $result = preg_match_all($pattern,$text,$matches);
  if ($result) {
    $matches = array_unique($matches[0]);
    $find = [];
    $replace = [];
    foreach ($matches as $match){
      $find[] = $match;
      $replace[] = urlencode($match);
    }
    $text = str_replace($find,$replace,$text);
  }
  return $text;
}

function char2utf32($char){
  return '\x{' . strtoupper(dechex(char2code($char))) . '}';
}

function utf32($text){
  global $define;
  $pattern = "/[\x{1D800}-\x{1D9FF}\x{40000}-\x{4F428}]/u";
  $result = preg_match_all($pattern,$text,$matches);
  if ($result) {
    $matches = array_unique($matches[0]);
    $find = [];
    $replace = [];
    foreach ($matches as $match){
      $find[] = $match;
      $replace[] = '\x{' . strtoupper(dechex(char2code($match))) . '}';
    }
    $text = str_replace($find,$replace,$text);
  }
  return $text;
}

function char2code($c,$plane=false){
  $code = (ord($c{0})-240)*262144 + (ord($c{1})-128)*4096 + (ord($c{2})-128)*64 + (ord($c{3})-128);
  if ($plane) {
    $code = $code - 262145;
  }
  return $code;
}

function dec2utf($code,$plane){
  $a = $code%64;
  $b = floor($code/64);
  $c = floor($b/64);
  $b -= $c*64;

  switch($plane){
  case 1:
    $utf8 = "f0";
    $utf8 .= dechex($c + 144);//90
    $utf8 .= dechex($b + 128);//80
    $utf8 .= dechex($a + 128);//80
    break;
    case 4:
    $utf8 = "f1";
    $utf8 .= dechex($c + 128);//B0
    $utf8 .= dechex($b + 128);//80
    $utf8 .= dechex($a + 128);//80
    break;
    case 15:
    $utf8 = "f3";
    $utf8 .= dechex($c + 176);//B0
    $utf8 .= dechex($b + 128);//80
    $utf8 .= dechex($a + 128);//80
    break;
  case 16:
    $utf8 = "f4";
    $utf8 .= dechex($c + 128);//80
    $utf8 .= dechex($b + 128);//80
    $utf8 .= dechex($a + 128);//80
    break;
  }

  return pack("N",hexdec($utf8));
}

function decode($text){
    $text = str_replace(array('"','\\\u') , array('\\"','\u'), $text);
    $text = json_decode('"' . $text . '"');
    return $text;
}
function encode($text,$slash){
    $slash = $slash ?: 2;
    //if ($charset=="ASCII")  return swu2fsw($text);
    $find = array('\\"');
    $replace = array('"');
    if ($slash==2){
      $find[] = '\\u';
      $replace[] = '\\\u';
    }
    $out = json_encode($text, JSON_UNESCAPED_SLASHES);
    $out = substr($out,1,-1);
    $out = str_replace($find,$replace,$out);
    $out = preg_replace_callback(
      '|\\\u[0-9a-f]{4}|',
      function ($matches) {
          $match = strtoupper($matches[0]);
          $match[1]="u";
          return $match;
      },
      $out
    );
    return $out;
}

function getKeys($text){
  global $define;
  $fsw_pattern = '/' . $define['fsw']['symbol'][2] . '/';
  $result = preg_match_all($fsw_pattern,$text,$matches);
  $syms = array();
  if ($result) {
    foreach ($matches[0] as $part){
      $syms[$part]=1;
    }
  }
  return array_keys($syms);
}

function key2code($key){
  $key = str_replace('S','',$key);
  $code =((hexdec(substr($key,0,3)) - 256) * 96) + ((hexdec(substr($key,3,1)))*16) + hexdec(substr($key,4,1))+1;
  return $code;
}
function key2char($key,$adj=0){
  $code = key2code($key) + $adj;
  return dec2utf($code,4);
}
function key2line($key){
  $code = key2code($key);
  return dec2utf($code,15);
}
function key2fill($key){
  $code = key2code($key);
  return dec2utf($code,16);
}

function chex($name){
  if(preg_match("/[0-9a-fA-F]{3}([0-9a-fA-F]{3})?/",$name)){
    $name = '#' . $name;
  }
  return $name;
}

function stylingArray($styling){
  $styling = styling($styling);
  $options = array('size'=>1,'colorize'=>0,'pad'=>0,'line'=>'black','fill'=>'white','back'=>'','E'=>array(),'F'=>array());
  if ($styling){
    $parts = explode("-",$styling . '-');

    if ($parts[1]){ /* general sign */
      if(preg_match("/^C/",$parts[1],$matches) == true){
        $options['colorize'] = true;
      }

      if(preg_match("/P[0-9]{2}/",$parts[1],$matches) == true){
        $options['pad'] = intval(substr($matches[0],1));
      }

      if(preg_match("/G_([0-9a-fA-F]{3}([0-9a-fA-F]{3})?|[a-zA-Z]+)_/",$parts[1],$matches) == true){
        $matched = substr($matches[0],2,-1);
        if(preg_match("/[0-9a-fA-F]{3}([0-9a-fA-F]{3})/",$matches[0],$matches) == true){
          $options['back'] = '#' . $matched;
        } else {
          $options['back'] = $matched;
        }
      }

      if(preg_match("/D_([0-9a-f]{3}([0-9a-f]{3})?|[a-zA-Z]+)(,([0-9a-f]{3}([0-9a-f]{3})?|[a-zA-Z]+))?_/",$parts[1],$matches) == true){
        $matched = substr($matches[0],2,-1);
        $colors = explode(",",$matched . ',');
        $options['line'] = chex($colors[0]);
        if ($colors[1]){
          $options['fill'] = chex($colors[1]);
        }
      }

      if(preg_match("/Z([0-9]+(\.[0-9]+)?|x)/",$parts[1],$matches) == true){
        if ($matches[0]=='Zx'){
          $matched = 'x';
        } else {
          $matched = floatval(substr($matches[0],1));
        }
        $options['size'] = $matched;
      }
    }


   if ($parts[2]) { /* specific symbols */
      if(preg_match_all("/D[0-9]{2}_([0-9a-f]{3}([0-9a-f]{3})?|[a-wyzA-Z]+)(,([0-9a-f]{3}([0-9a-f]{3})?|[a-wyzA-Z]+))?_/",$parts[2],$matches) == true){
        foreach ($matches[0] as $colored){
          $specific = intval(substr($colored,1,2));
          $colors = substr($colored,4,-1);
          $colors = explode(",", $colors . ',');

          if ($colors[0]) $colors[0] = chex($colors[0]);
          if ($colors[1]) $colors[1] = chex($colors[1]);
          $options['E'][$specific] = $colors;
        }
      }
      if(preg_match_all("/Z[0-9]{2},[0-9]+(\.[0-9]+)?(,[0-9]{3}x[0-9]{3})?/",$parts[2],$matches) == true){
        foreach ($matches[0] as $sized){
          $specific = intval(substr($sized,1,2));
          $size = explode(',',substr($sized,4));
          $size[0] = floatval($size[0]);
          $options['F'][$specific] = $size;
        }
      }
    }

  }

  return $options;
}

function bbox ($text){
  if(preg_match_all("/[0-9]{3}x[0-9]{3}/",$text,$matches) == true){
    foreach ($matches[0] as $i=>$coord){
      $x = intval(substr($coord,0,3));
      $y = intval(substr($coord,4,3));
      if ($i==0){
        $x1 = $x2 = $x;
        $y1 = $y2 = $y;
      } else {
        $x1 = min($x1,$x);
        $x2 = max($x2,$x);
        $y1 = min($y1,$y);
        $y2 = max($y2,$y);
      }
    }
    return '' . $x1 . ' ' . $x2 . ' ' . $y1 . ' ' . $y2;
  } else {
    return '';
  }
}

function svg ($text,$font=false){
  $swu = swu($text);
  if ($swu){
    $text = swu2fsw($text);
  }
  $options = stylingArray($text);
  $fsw = fsw($text);
  if (!$fsw){
    $text = key($text);
    if(strlen($text)==6) {
      $text .= "500x500";
    }
  } else {
    $text = $fsw;
  }
  if ($text){
    $bbox = explode(' ',bbox($text));
    $x1 = $bbox[0];
    $x2 = $bbox[1];
    $y1 = $bbox[2];
    $y2 = $bbox[3];
    $force = false;
    if (substr($text,0,1)=='S'){
      if ($x1==500 && $y1==500){
        $force = true;
      } else {
        $x2 = 1000-$x1;
        $y2 = 1000-$y1;
      }
    }

    if (!$font || $force || count($options['F'])){
      $syms = getKeys($text);
      $glyphs = array();
      foreach ($syms as $sym){
        $glyphs[$sym]='';
      }
      $symbols = getSymbols($syms);
      if ($symbols) {
        foreach ($symbols as $symbol){
          $glyphs[$symbol->key] = $symbol;
        }
      }
    }

    if ($force){
      $key = substr($text,0,6);
      $x2 = 500 + intval($glyphs[$key]->w);
      $y2 = 500 + intval($glyphs[$key]->h);
    }

    $spatial_re = '/S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3}/';

    $result = preg_match_all($spatial_re,$text,$matches);
    $svgs = array();
    foreach ($matches[0] as $i=>$spatial) {
      $key = substr($spatial,0,6);
      $x = substr($spatial,6,3);
      $y = substr($spatial,10,3);

      $fontsize = 30;
      if(array_key_exists($i+1,$options['F'])){
        $fontsize = $fontsize * $options['F'][$i+1][0];
        if (array_key_exists(1,$options['F'][$i+1])){
          $x = intval($x) + intval(substr($options['F'][$i+1][1],0,3))-500;
          $y = intval($y) + intval(substr($options['F'][$i+1][1],4,3))-500;
          $x1 = min($x1,$x);
          $y1 = min($y1,$y);
        }
        if (array_key_exists($key,$glyphs)){
          $x2 = max($x2,intval($x) + ($options['F'][$i+1][0] * intval($glyphs[$key]->w)));
          $y2 = max($y2,intval($y) + ($options['F'][$i+1][0] * intval($glyphs[$key]->h)));
        }
      }
      if ($options['colorize']) {
        $line = '#' . colorize($key);
      } else {
        $line = $options['line'];
      }
      $fill = $options['fill'];
      if (array_key_exists($i+1,$options['E'])) {
        $line = $options['E'][$i+1][0];
        if ($options['E'][$i+1][1]) {
          $fill = $options['E'][$i+1][1];
        }
      }
      if ($font) {
        $g = '  <g transform="translate(' . $x . ',' . $y . ')">' . "\n";
        $g .= '    <text class="sym-fill" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:' . $fontsize . 'px;fill:' . $fill . ';">' . key2fill($key) . '</text>' . "\n";
        $g .= '    <text class="sym-line" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:' . $fontsize . 'px;fill:' . $line . ';">' . key2line($key) . '</text>' . "\n";
        $g .= '  </g>' . "\n";
        $svgs[] = $g;
      } else {
        $glyph = $glyphs[$key]->g;
        $glyph = str_replace("#ffffff", $fill, $glyph);
        $glyph = str_replace('class="sym-line"','class="sym-line" fill="' . $line . '"',$glyph);
        if(array_key_exists($i+1,$options['F'])){
          $glyph = "<g transform='scale(" . $options['F'][$i+1][0] . ")'>" . $glyph . "</g>";
        }
        $svgs[] = "  <svg x=\"" . $x . "\" y=\"" . $y . "\">" . $glyph . "</svg>" . "\n";
        //$svgs[] = '  <g transform="translate(' . $x . ',' . $y . ')">' . $glyph . "</g>" . "\n";
      }
    }


    $x1 = $x1 - $options['pad'];
    $x2 = $x2 + $options['pad'];
    $y1 = $y1 - $options['pad'];
    $y2 = $y2 + $options['pad'];

    $w = ($x2 - $x1);
    $h = ($y2 - $y1);

    $svg = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"";
    if ($options['size']!="x"){
      $svg .= " width=\"" . ($w * $options['size']) . "\" height=\"" . ($h * $options['size']) . "\"";
    }
    $svg .= " viewBox=\"" . $x1 . " " . $y1 . " " . $w . " " . $h . "\">" . "\n";
    $svg .= "  <text font-size=\"0\">" . ($swu?:$text) . "</text>" . "\n";
    if ($options['back']) {
      $svg .= '  <rect x="' . $x1 . '" y="' . $y1 . '" width="' . $w . '" height="' . $h . '" style="fill:' . $options['back'] . ';" />' . "\n";
    }

    $svg .= implode($svgs);
    $svg .= "</svg>";

  //    header("Pragma: public");
  //    $expires = 60*60*24*365;
  //    header("Cache-Control: maxage=".$expires);
  //    header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');
  //    $lastmod = 'Thu, 12 Jan 2012 16:20:01 GMT';
  //    header('Last-Modified: ' . $lastmod);
  //    $etag = md5($_SERVER["REQUEST_URI"]);
  //    header("Etag: $etag");
    return $svg;
  }
}

function key($text,$styling=0){
  $fsw_sym = 'S[123][0-9a-f]{2}[0-5][0-9a-f]';
  $fsw_coord = '[0-9]{3}x[0-9]{3}';
  $fsw_pattern = '/' . $fsw_sym . '(' . $fsw_coord . ')?/';

  $result = preg_match($fsw_pattern,$text,$matches);
  if ($result) {
    $match = $matches[0];
    if ($styling){
      $match .= styling($text);
    }
    return $match;
  }
  return '';
}

function colorize($key) {
  $color = '000000';
  if (isHand($key)) {$color = '0000CC';}
  if (isMove($key)) {$color = 'CC0000';}
  if (isDyn($key)) {$color = 'FF0099';}
  if (isHead($key)) {$color = '006600';}
  if (isTrunk($key)) {$color = '000000';}
  if (isLimb($key)) {$color = '000000';}
  if (isLoc($key)) {$color = '884411';}
  if (isPunc($key)) {$color = 'FF9900';}
  return $color;
}

function inHexRange($start, $end, $char){
  $char = substr(str_replace('S','',$char),0,3);
  if (hexdec($char)>=hexdec($start) and hexdec($char)<=hexdec($end)){
    return true;
  } else {
    return false;
  }
}

function isWrit($key){
  $char = substr($key,1,3);
  return inHexRange("100","37e",$char);
}

function isHand($key){
  $char = substr($key,1,3);
  return inHexRange("100","204",$char);
}

function isMove($key){
  $char = substr($key,1,3);
  return inHexRange("205","2f6",$char);
}

function isDyn($key){
  $char = substr($key,1,3);
  return inHexRange("2f7","2fe",$char);
}

function isHead($key){
  $char = substr($key,1,3);
  return inHexRange("2ff","36c",$char);
}

function isTrunk($key){
  $char = substr($key,1,3);
  return inHexRange("36d","375",$char);
}

function isLimb($key){
  $char = substr($key,1,3);
  return inHexRange("376","37e",$char);
}

function isLoc($key){
  $char = substr($key,1,3);
  return inHexRange("37f","386",$char);
}

function isPunc($key){
  $char = substr($key,1,3);
  return inHexRange("387","38b",$char);
}

function styling($text) {
  global $define;
  $fsw_styling = $define['style']['full'][2];
  $fsw_pattern = '/' . $fsw_styling . '/';
  $result = preg_match($fsw_pattern,$text,$matches);
  if ($result) {
    return $matches[0];
  }
  return '';
}

function fsw($text,$styling=0){
  global $define;
  if ($styling){
    $pattern = "/(" . $define['fsw']['sign'][2] . ")?" . $define['fsw']['spatial'][2] . "(" . $define['style']['full'][2] . ")?/";
  } else {
    $pattern = "/(" . $define['fsw']['sign'][2] . "|" . $define['fsw']['spatial'][2] . ")/";
  }
  $result = preg_match($pattern,$text,$matches);
  if ($result) {
    $match = $matches[0];
    return $match;
  }
}

function swu($text,$styling=0){
  global $define;
  if ($styling){
    $pattern = "/(" . $define['swu']['sign'][2] . ")?" . $define['swu']['spatial'][2] . "(" . $define['style']['full'][2] . ")?/u";
  } else {
    $pattern = "/(" . $define['swu']['sign'][2] . "|" . $define['swu']['spatial'][2] . ")/u";
  }
  $result = preg_match($pattern,$text,$matches);
  if ($result) {
    $match = $matches[0];
    return $match;
  }
}

function fswAll($text,$styling=0){
  global $define;
  if ($styling){
    $pattern = "/(" . $define['fsw']['sign'][2] . ")?" . $define['fsw']['spatial'][2] . "(" . $define['style']['full'][2] . ")?/";
  } else {
    $pattern = "/(" . $define['fsw']['sign'][2] . "|" . $define['fsw']['spatial'][2] . ")/";
  }
  $result = preg_match_all($pattern,$text,$matches);
  if ($result) {
    return implode(" ",$matches[0]);
  } else {
    return '';
  }
}

function swuAll($text,$styling=0){
  global $define;
  if ($styling){
    $pattern = "/(" . $define['swu']['sign'][2] . ")?" . $define['swu']['spatial'][2] . "(" . $define['style']['full'][2] . ")?/u";
  } else {
    $pattern = "/(" . $define['swu']['sign'][2] . "|" . $define['swu']['spatial'][2] . ")/u";
  }
  $result = preg_match_all($pattern,$text,$matches);
  if ($result) {
    return implode(" ",$matches[0]);
  } else {
    return '';
  }
}

function fswQuery($text){
  $fsw_range = 'R[123][0-9a-f]{2}t[123][0-9a-f]{2}';
  $fsw_sym = 'S[123][0-9a-f]{2}[0-5u][0-9a-fu]';
  $fsw_coord = '([0-9]{3}x[0-9]{3})?';
  $fsw_var = '(V[0-9]+)';
  $fsw_query = 'Q((A(' . $fsw_sym . '|' . $fsw_range . ')+)?T)?(' . $fsw_sym . $fsw_coord . '|' . $fsw_range . $fsw_coord . ')*' . $fsw_var  . '?';
  $fsw_pattern = '/^' . $fsw_query . '$/';
  $result = preg_match($fsw_pattern,$text,$matches);
  if ($result) {
    if ($text == $matches[0]) {
      return true;
    }
  }
  return false;
}

function swuQuery($text){
  global $define;
  $swu_pattern = '/^' . $define['queryu']['full'][2] . '$/u';
  $result = preg_match($swu_pattern,$text,$matches);
  if ($result) {
    if ($text == $matches[0]) {
      return true;
    }
  }
  return false;
}

function convertFlags($flags){
  $rflags = '';
  if (strpos($flags,'A') !== false){
    $rflags .= 'A';
  } else if (strpos($flags,'a') !== false){
    $rflags .= 'a';
  }
  if (strpos($flags,'S') !== false){
    $rflags .= 'S';
  } else if (strpos($flags,'s') !== false){
    $rflags .= 's';
  }
  if (strpos($flags,'L') !== false){
    $rflags .= 'L';
  }
  return $rflags;
}

function fswConvert($fsw,$flags){
  $flags = convertFlags($flags);
  if (!$flags) {
    return '';
  }
  $fsw = fsw($fsw);
  if (!$fsw) return;

  $fsw_sym = 'S[123][0-9a-f]{2}[0-5][0-9a-f]';
  $fsw_coord = '[0-9]{3}x[0-9]{3}';
  $re_sequence = '/A(' . $fsw_sym . ')+/';
  $re_spatial = '/' . $fsw_sym . $fsw_coord . '/';

  $A = (strpos($flags,'A') !== false);
  $a = (strpos($flags,'a') !== false);
  $S = (strpos($flags,'S') !== false);
  $s = (strpos($flags,'s') !== false);
  $L = (strpos($flags,'L') !== false);

  $query = '';
  if ($a || $A) {
    if(preg_match($re_sequence,$fsw,$matches) == true){
      $syms = str_split(substr($matches[0],1),6);
      foreach ($syms as $key){
        if ($a) {
          $key = substr($key,0,4) . 'uu';
        }
        $query .= $key;
      }
    }
    if ($query){
      $query = 'A' . $query . 'T';
    }
  }

  if ($s || $S) {
    if(preg_match_all($re_spatial,$fsw,$matches) == true){
      foreach ($matches[0] as $spatial){
        if ($S) {
          $key = substr($spatial,0,6);
        } else {
          $key = substr($spatial,0,4) . 'uu';
        }
        if ($L){
          $key .= substr($spatial,6,7);
        }
        $query .= $key;
      }
    }
  }

  if ($query){
    return 'Q' . $query;
  } else {
    return '';
  }
}

function swuConvert($swu,$flags){
  global $define;
  $flags = convertFlags($flags);
  if (!$flags) {
    return '';
  }
  $swu = swu($swu);
  if (!$swu) return;
  $swu_sym = $define['swu']['symbol'][2];
  $swu_coord = $define['swu']['coord'][2];
  $re_sequence = '/' . $define['swu']['sort'][2] . '(' . $swu_sym . ')+/u';
  $re_spatial = '/' . $swu_sym . $swu_coord . '/u';

  $A = (strpos($flags,'A') !== false);
  $a = (strpos($flags,'a') !== false);
  $S = (strpos($flags,'S') !== false);
  $s = (strpos($flags,'s') !== false);
  $L = (strpos($flags,'L') !== false);

  $query = '';
  if ($a || $A) {
    if(preg_match($re_sequence,$swu,$matches) == true){
      $syms = str_split(substr($matches[0],4),4);
      foreach ($syms as $sym){
        if ($a) {
          $sym = $sym . 'fr';
        }
        $query .= $sym;
      }
    }
    if ($query){
      $query = 'A' . $query . 'T';
    }
  }

  if ($s || $S) {
    if(preg_match_all($re_spatial,$swu,$matches) == true){
      foreach ($matches[0] as $spatial){
        $sym = substr($spatial,0,4);
        if ($s) {
          $sym .= 'fr';
        }
        if ($L){
          $sym .= substr($spatial,-8);
        }
        $query .= $sym;
      }
    }
  }

  if ($query){
    return 'Q' . $query;
  } else {
    return '';
  }
}

function range2regex($min,$max,$hex='',$test=''){
  $min = str_pad($min,3,'0',STR_PAD_LEFT);
  $max = '' . $max;
  $pattern='';
  //  if ($val=='uuu') return '[0-9]{3}';
  //assume numbers are 3 digits long

  if ($min===$max) return $min;

  if ($test) echo "<h3>Original values $min</h3>";

  //ending pattern will be series of connected OR ranges
  $re = array();

  //first pattern.  10's don't match and the min 1's are not zero
  //odd number to 9
  if (!($min[0]==$max[0] && $min[1]==$max[1])) {
    if ($min[2]!='0'){
      $pattern = $min[0] . $min[1];
      if ($hex) {
        //switch for dex
        switch ($min[2]){
        case "f":
          $pattern .= 'f';
          break;
        case "e":
          $pattern .= '[ef]';
          break;
        case "d";
        case "c";
        case "b";
        case "a";
          $pattern .= '[' . $min[2] . '-f]';
          break;
        default:
          switch ($min[2]){
            case "9":
           $pattern .= '[9a-f]';
            break;
          case "8":
            $pattern .= '[89a-f]';
            break;
          default:
           $pattern .= '[' . $min[2] . '-9a-f]';
            break;
          }
          break;
        }
        $diff = 15-hexdec($min[2]) +1;
        $min = '' . dechex((hexdec($min)+$diff));
        $re[] =$pattern;
      } else {
        //switch for dex
        switch ($min[2]){
        case "9":
          $pattern .= '9';
          break;
        case "8":
          $pattern .= '[89]';
          break;
        default:
         $pattern .= '[' . $min[2] . '-9]';
          break;
        }
        $diff = 9-$min[2] +1;
        $min = '' . ($min+$diff);
        $re[] =$pattern;
      }
    }
  }
  if ($test) {
    echo "<h3>Bring up the non zero digits</li></h3>";
    if ($pattern) {
      echo "<p>Step One: $pattern for new values $min";
    } else {
      echo "<p>Step One: NA";
    }
  }
  $pattern = '';

  //if hundreds are different, get odd to 99 or ff
  if ($min[0]!=$max[0]){
    if ($min[1]!='0'){
      if ($hex){
        //scrape to ff
        $pattern = $min[0];
        switch ($min[1]){
        case "f":
          $pattern .= 'f';
          break;
        case "e":
          $pattern .= '[ef]';
          break;
        case "d":
        case "c":
        case "b":
        case "a":
         $pattern .= '[' . $min[1] . '-f]';
          break;
        case "9":
         $pattern .= '[9a-f]';
          break;
        case "8":
         $pattern .= '[89a-f]';
          break;
        default:
         $pattern .= '[' . $min[1] . '-9a-f]';
          break;
        }
        $pattern .= '[0-9a-f]';
        $diff = 15-hexdec($min[1]) +1;
        $min = '' . dechex(hexdec($min)+$diff*16);
        $re[] =$pattern;
      } else {
        //scrape to 99
        $pattern = $min[0];
        $diff = 9-$min[1] +1;
        switch ($min[1]){
        case "9":
          $pattern .= '9';
          break;
        case "8":
          $pattern .= '[89]';
          break;
        default:
         $pattern .= '[' . $min[1] . '-9]';
          break;
        }
        $pattern .= '[0-9]';
        $diff = 9-$min[1] +1;
        $min = '' . ($min+$diff*10);
        $re[] =$pattern;
      }
    }
  }
  if ($test) {
    echo "<h3>Bring up the 10's if hundreds are different</h3>";
    if ($pattern) {
      echo "<p>Step Two: $pattern for new values $min";
    } else {
      echo "<p>Step Two: NA";
    }
  }
  $pattern = '';

  //if hundreds are different, get to same
  if ($min[0]!=$max[0]){
    if ($hex){
      $diff = hexdec($max[0]) - hexdec($min[0]);
      $tmax = dechex(hexdec($min[0]) + $diff-1);

      switch ($diff){
      case 1:
        $pattern = $min[0];
        break;
      case 2:
        $pattern = '[' . $min[0] . $tmax . ']';
        break;
      default:
        if (hexdec($min[0])>9){
          $minV = 'h';
        } else {
          $minV = 'd';
        }
        if (hexdec($tmax)>9){
          $maxV = 'h';
        } else {
          $maxV = 'd';
        }
        switch ($minV . $maxV){
        case "dd":
          $pattern .= '[' . $min[0] . '-' . $tmax . ']';
          break;
        case "dh":
          $diff = 9 - $min[0];
          //firs get up to 9
          switch ($diff){
          case 0:
            $pattern .= '[9';
            break;
          case 1:
            $pattern .= '[89';
            break;
          default:
            $pattern .= '[' . $min[0] . '-9';
            break;
          }
          switch ($tmax[0]){
          case 'a':
            $pattern .= 'a]';
            break;
          case 'b':
            $pattern .= 'ab]';
            break;
          default:
            $pattern .= 'a-' . $tmax . ']';
            break;
          }
          break;
        case "hh":
          $pattern .= '[' . $min[0] . '-' . $tmax . ']';
          break;
        }
      }

      $pattern .= '[0-9a-f][0-9a-f]';
      $diff = hexdec($max[0]) - hexdec($min[0]);
      $min = '' . dechex(hexdec($min)+$diff*256);
      $re[] =$pattern;
    } else {
      $diff = $max[0] - $min[0];
      $tmax = $min[0] + $diff-1;

      switch ($diff){
      case 1:
        $pattern = $min[0];
        break;
      case 2:
        $pattern = '[' . $min[0] . $tmax . ']';
        break;
      default:
       $pattern = '[' . $min[0] . '-' . $tmax . ']';
        break;
      }
      $pattern .= '[0-9][0-9]';
      $min = '' . ($min+$diff*100);
      $re[] =$pattern;
    }
  }
  if ($test) {
    echo "<h3>Bring up the 100's if different</h3>";
    if ($pattern) {
      echo "<p>Step Three: $pattern for new values $min";
    } else {
      echo "<p>Step Three: NA";
    }
  }
  $pattern = '';

  //if tens are different, get to same
  if ($min[1]!=$max[1]){
    if ($hex){
      $diff = hexdec($max[1]) - hexdec($min[1]);
      $tmax = dechex(hexdec($min[1]) + $diff-1);
      $pattern = $min[0];
      switch ($diff){
      case 1:
        $pattern .= $min[1];
        break;
      case 2:
        $pattern .= '[' . $min[1] . $tmax . ']';
        break;
      default:

        if (hexdec($min[1])>9){
          $minV = 'h';
        } else {
          $minV = 'd';
        }
        if (hexdec($tmax)>9){
          $maxV = 'h';
        } else {
          $maxV = 'd';
        }
        switch ($minV . $maxV){
        case "dd":
          $pattern .= '[' . $min[1];
          if ($diff>1) $pattern .= '-';
          $pattern .= $tmax . ']';
          break;
        case "dh":
          $diff = 9 - $min[1];
          //firs get up to 9
          switch ($diff){
          case 0:
            $pattern .= '[9';
            break;
          case 1:
            $pattern .= '[89';
            break;
          default:
            $pattern .= '[' . $min[1] . '-9';
            break;
          }
          switch ($max[1]){
          case 'a':
            $pattern .= ']';
            break;
          case 'b':
            $pattern .= 'a]';
            break;
          default:
            $pattern .= 'a-' . dechex(hexdec($max[1])-1) . ']';
            break;
          }
          break;
        case "hh":
          $pattern .= '[' . $min[1];
          if ($diff>1) $pattern .= '-';
          $pattern .= dechex(hexdec($max[1])-1) . ']';
          break;
        }
        break;
      }
      $pattern .= '[0-9a-f]';
      $diff = hexdec($max[1]) - hexdec($min[1]);
      $min = '' . dechex(hexdec($min)+$diff*16);
      $re[] =$pattern;
    } else {
      $diff = $max[1] - $min[1];
      $tmax = $min[1] + $diff-1;
      $pattern = $min[0];
      switch ($diff){
      case 1:
        $pattern .= $min[1];
        break;
      case 2:
        $pattern .= '[' . $min[1] . $tmax . ']';
        break;
      default:
       $pattern .= '[' . $min[1] . '-' . $tmax . ']';
        break;
      }
      $pattern .= '[0-9]';
      $min = '' . ($min+$diff*10);
      $re[] =$pattern;
    }

  }
  if ($test) {
    echo "<h3>Bring up the 10's</h3>";
    if ($pattern) {
      echo "<p>Step Four: $pattern for new values $min";
    } else {
      echo "<p>Step Four: NA";
    }
  }
  $pattern = '';

  //if digits are different, get to same
  if ($min[2]!=$max[2]){
    if ($hex){
      $pattern = $min[0] . $min[1];
      $diff = hexdec($max[2]) - hexdec($min[2]);
      if (hexdec($min[2])>9){
        $minV = 'h';
      } else {
        $minV = 'd';
      }
      if (hexdec($max[2])>9){
        $maxV = 'h';
      } else {
        $maxV = 'd';
      }
      switch ($minV . $maxV){
      case "dd":
        $pattern .= '[' . $min[2];
        if ($diff>1) $pattern .= '-';
        $pattern .= $max[2] . ']';
        break;
      case "dh":
        $diff = 9 - $min[2];
        //firs get up to 9
        switch ($diff){
        case 0:
          $pattern .= '[9';
          break;
        case 1:
          $pattern .= '[89';
          break;
        default:
          $pattern .= '[' . $min[2] . '-9';
          break;
        }
        switch ($max[2]){
        case 'a':
          $pattern .= 'a]';
          break;
        case 'b':
          $pattern .= 'ab]';
          break;
        default:
          $pattern .= 'a-' . $max[2] . ']';
          break;
        }

        break;
      case "hh":
        $pattern .= '[' . $min[2];
        if ($diff>1) $pattern .= '-';
        $pattern .= $max[2] . ']';
        break;
      }
      $diff = hexdec($max[2]) - hexdec($min[2]);
      $min = '' . dechex(hexdec($min) + $diff);
      $re[] =$pattern;
    } else {
      $diff = $max[2] - $min[2];
      $pattern = $min[0] . $min[1];
      switch ($diff){
      case 0:
        $pattern .= $min[2];
        break;
      case 1:
        $pattern .= '[' . $min[2] . $max[2] . ']';
        break;
      default:
       $pattern .= '[' . $min[2] . '-' . $max[2] . ']';
        break;
      }
      $min = '' . ($min+$diff);
      $re[] =$pattern;
    }
  }
  if ($test) {
    echo "<h3>Bring up the 1's</h3>";
    if ($pattern) {
      echo "<p>Step Five: $pattern for new values $min";
    } else {
      echo "<p>Step Five: NA";
    }
  }
  $pattern = '';



  //last place is whole hundred
  if ($min[2]=='0' && $max[2]=='0') {
    $pattern = $max;
    $re[] =$pattern;
  }
  if ($test) {
    echo "<h3>Match Zero endings</h3>";
    if ($pattern) {
      echo "<p>Step Six: $pattern for new values $min";
    } else {
      echo "<p>Step Six: NA";
    }
  }
  $pattern = '';

  $cnt = count($re);
  if ($cnt==1){
    $pattern = $re[0];
  } else {
    $pattern = implode($re,')|(');
    $pattern = '((' . $pattern . '))';
  }
  return $pattern;
}

function query2regex ($query,$fuzz='',$boundry='/'){
  if ($fuzz=='') $fuzz = 20;
  $re_sym = 'S[123][0-9a-f]{2}[0-5][0-9a-f]';
  $re_coord = '[0-9]{3}x[0-9]{3}';
  $re_word = '[BLMR](' . $re_coord . ')(' . $re_sym . $re_coord . ')*';
  $re_term = '(A(' . $re_sym. ')+)';
  $fsw_range = 'R[123][0-9a-f]{2}t[123][0-9a-f]{2}';
  $fsw_sym = 'S[123][0-9a-f]{2}[0-5u][0-9a-fu]';
  $fsw_coord = '([0-9]{3}x[0-9]{3})?';
  $fsw_var = '(V[0-9]+)';
  $fsw_query = 'Q((A(' . $fsw_sym . '|' . $fsw_range . ')+)?T)?(' . $fsw_sym . $fsw_coord . '|' . $fsw_range . $fsw_coord . ')*' . $fsw_var  . '?';
  if (!fswQuery($query)) return;
  if (!$query || $query=='Q'){
    return array($boundry . $re_term . '?'. $re_word . $boundry);
  }
  if (!$query || $query=='QT'){
    return array($boundry . $re_term . $re_word . $boundry);
  }
  $segments = array();
  $term = strpos($query,'T');
  if ($term){
    $q_term = '(A';
    $query_t = substr($query,0,$term);
    $query = substr($query,$term+1);
    //this gets all symbols and ranges
    $fsw_pattern = '/(' . $fsw_sym . '|' . $fsw_range . ')/';
    $result = preg_match_all($fsw_pattern,$query_t,$matches);
    if ($result) {
      foreach ($matches[0] as $part){
        //if symbol...
        $fsw_pattern = '/^' . $fsw_sym . '$/';
        $result = preg_match($fsw_pattern,$part,$matched);
        if ($result) {
          $base = substr($part,1,3);
          $segment = 'S' . $base;
          $fill = substr($part,4,1);
          if ($fill=='u') {
            $segment .= '[0-5]';
          } else {
            $segment .= $fill;
          }

          $rotate = substr($part,5,1);
          if ($rotate=='u') {
            $segment .= '[0-9a-f]';
          } else {
            $segment .= $rotate;
          }
          $q_term .= $segment;
        } else {
          $from = substr($part,1,3);
          $to = substr($part,5,3);
          $re_range = range2regex($from,$to,"hex");
          $segment = 'S' . $re_range . '[0-5][0-9a-f]';
          $q_term .= $segment;
        }
      }
      $q_term .= '(' . $re_sym. ')*)';
    } else {
      $q_term .= '(' . $re_sym. ')+)';
    }
  }

  //get the variance
  $fsw_pattern = '/' . $fsw_var . '/';
  $result = preg_match($fsw_pattern,$query,$matches);
  if ($result) $fuzz = substr($matches[0],1);
  //this gets all symbols with or without location
  $fsw_pattern = '/' . $fsw_sym . $fsw_coord . '/';
  $result = preg_match_all($fsw_pattern,$query,$matches);
  if ($result) {
    foreach ($matches[0] as $part){
      $base = substr($part,1,3);
      $segment = 'S' . $base;
      $fill = substr($part,4,1);
      if ($fill=='u') {
        $segment .= '[0-5]';
      } else {
        $segment .= $fill;
      }

      $rotate = substr($part,5,1);
      if ($rotate=='u') {
        $segment .= '[0-9a-f]';
      } else {
        $segment .= $rotate;
      }
      if (strlen($part)>6){
        $x = substr($part,6,3);
        $y = substr($part,10,3);
        //now get the x segment range...
        $segment .= range2regex(($x-$fuzz),($x+$fuzz));
        $segment .= 'x';
        $segment .= range2regex(($y-$fuzz),($y+$fuzz));
      } else {
        $segment .= $re_coord;
      }
      //now I have the specific search symbol
      // add to general ksw word
      $segment = $re_word . $segment . '(' . $re_sym . $re_coord . ')*';
      if ($term) {
        $segment = $q_term . $segment;
      } else {
        $segment = $re_term . '?' . $segment;
      }
      $segment= '/' . $segment . '/';
      $segments[]= $segment;
    }
  }
  //this gets all ranges
  $fsw_pattern = '/' . $fsw_range . $fsw_coord . '/';
  $result = preg_match_all($fsw_pattern,$query,$matches);
  if ($result) {
    foreach ($matches[0] as $part){
      $from = substr($part,1,3);
      $to = substr($part,5,3);
      $re_range = range2regex($from,$to,"hex");
      $segment = 'S' . $re_range . '[0-5][0-9a-f]';
      if (strlen($part)>8){
        $x = substr($part,8,3);
        $y = substr($part,12,3);
        //now get the x segment range...
        $segment .= range2regex(($x-$fuzz),($x+$fuzz));
        $segment .= 'x';
        $segment .= range2regex(($y-$fuzz),($y+$fuzz));
      } else {
        $segment .= $re_coord;
      }
      // add to general ksw word
      $segment = $re_word . $segment . '(' . $re_sym . $re_coord . ')*';
      if ($term) {
        $segment = $q_term . $segment;
      } else {
        $segment = $re_term . '?' . $segment;
      }
      $segment= $boundry . $segment . $boundry;
      $segments[]= $segment;
    }
  }
  if (count($segments)==0){
    if ($term){
      $segments[] = $boundry . $q_term . $re_word . $boundry;
    } else {
      $segments[] = $boundry . $re_term . '?' . $re_word . $boundry;
    }
  }
  return $segments;
}

function symfr2regex($symfr){
  $sym = substr($symfr,0,4);
  $f = strpos($symfr,'f');
  $r = strpos($symfr,'r');
  if ($f && $r){
    $base = substr(swu2fsw($sym),0,4);
    $min = fsw2swu($base . '00');
    $max = fsw2swu($base . '5f');
    return '[' . utf32($min) . '-' . utf32($max) . ']';
  } else if ($r) {
    $base = substr(swu2fsw($sym),0,5);
    $min = fsw2swu($base . '0');
    $max = fsw2swu($base . 'f');
    return '[' . utf32($min) . '-' . utf32($max) . ']';
  } else if ($f) {
    $key = swu2fsw($sym);
    $base = substr(swu2fsw($sym),0,4);
    $tail = substr(swu2fsw($sym),5,1);
    $list = array();
    for ($i=0;$i<6;$i++){
      $list[] = utf32(fsw2swu($base . $i . $tail));
    }
    return "(" . implode("|",$list) . ")";
  } else {
    return utf32($sym);
  }
}

function rangeu2regex($range){
  $from = swu2fsw(substr($range,1,4));
  $to = swu2fsw(substr($range,5,4));
  $min = fsw2swu(substr($from,0,4) . '00');
  $max = fsw2swu(substr($to,0,4) . '5f');
  return '[' . utf32($min) . '-' . utf32($max) . ']';
}

function coordu2regex($coord,$fuzz){
  if ($fuzz){
    $x = swu2num(substr($coord,0,4));
    $minX = num2swu($x - $fuzz);
    $maxX = num2swu($x + $fuzz);
    $y = swu2num(substr($coord,4,4));
    $minY = num2swu($y - $fuzz);
    $maxY = num2swu($y + $fuzz);
    return '[' . utf32($minX) . '-' . utf32($maxX) . '][' . utf32($minY) . '-' . utf32($maxY) . ']';
  } else {
    return utf32($coord);
  }
}

function queryu2regex ($query,$fuzz='',$boundry='/'){
  global $define;
  if ($fuzz=='') $fuzz = 20;
  if (!swuQuery($query)) {
    if (fswQuery($query)){
      $query = query2queryu($query);
    } else {
      return;
    }
  }
  if (!$query || $query=='Q'){
    return array($boundry . $define['swu']['sign'][2] . $boundry);
  }
  if (!$query || $query=='QT'){
    return array($boundry . $define['swu']['term'][2] . $boundry);
  }
  $segments = array();
  $term = strpos($query,'T');
  if ($term){
    $q_term = $define['swu']['sort'][2];
    $query_t = substr($query,0,$term);
    $query = substr($query,$term+1);
    //this gets all symbols and ranges
    $swu_pattern = '/(' . $define['queryu']['symbol'][2] . '|' . $define['queryu']['range'][2] . ')/u';
    $result = preg_match_all($swu_pattern,$query_t,$matches);
    if ($result) {
      foreach ($matches[0] as $part){
        //if symbol...
        $swu_pattern = '/^' . $define['queryu']['symbol'][2] . '$/u';
        $result = preg_match($swu_pattern,$part,$matched);
        if ($result) {
          $q_term .= symfr2regex($part);
        } else {
          $q_term .= rangeu2regex($part);
        }
      }
      $q_term .= $define['swu']['symbol'][2]. '*';
    } else {
      $q_term .= '(' . $define['swu']['symbol'][2]. ')+';
    }
  }

  //get the variance
  $swu_pattern = '/V[0-9]+/';
  $result = preg_match($swu_pattern,$query,$matches);
  if ($result) $fuzz = substr($matches[0],1);
  //this gets all symbols with or without location
  $swu_pattern = '/(' . $define['queryu']['symbol'][2] . $define['queryu']['coord'][2] . '|' . $define['queryu']['range'][2] . $define['queryu']['coord'][2] . ')/u';
  $result = preg_match_all($swu_pattern,$query,$matches);
  if ($result) {
    foreach ($matches[0] as $part){
      if ($part[0] != 'R'){
        $segment = symfr2regex($part);
        if (strlen($part)>6){
          $coord = substr($part,-8);
          $segment .= coordu2regex($coord,$fuzz);
        } else {
          $segment .= $define['swu']['coord'][2];
        }
        //now I have the specific search symbol
        // add to general swu word
        $segment = $define['swu']['box'][2] . $define['swu']['coord'][2] . '(' . $define['swu']['spatial'][2] . ')*' . $segment . '(' . $define['swu']['spatial'][2] . ')*';
        if ($term) {
          $segment = $q_term . $segment;
        } else {
          $segment = '(' . $define['swu']['sort'][2] . $define['swu']['symbol'][2] . '+)?' . $segment;
        }
        $segment= '/' . $segment . '/';
        $segments[]= $segment;
      } else {
        $segment = rangeu2regex($part);
        if (strlen($part)>9){
          $coord = substr($part,-8);
          $segment .= coordu2regex($coord,$fuzz);
        } else {
          $segment .= $define['swu']['coord'][2];
        }
        // add to general swu word
        $segment = $define['swu']['box'][2] . $define['swu']['coord'][2] . '(' . $define['swu']['spatial'][2] . ')*' . $segment . '(' . $define['swu']['spatial'][2] . ')*';
        if ($term) {
          $segment = $q_term . $segment;
        } else {
          $segment = '(' . $define['swu']['sort'][2] . $define['swu']['symbol'][2] . '+)?' . $segment;
        }
        $segment= $boundry . $segment . $boundry;
        $segments[]= $segment;
      }
    }
  }
  if (count($segments)==0){
    if ($term){
      $segment = $q_term;
      $segment .= $define['swu']['box'][2] . $define['swu']['coord'][2] . '(' . $define['swu']['spatial'][2] . ')*';
      $segments[] = $boundry . $segment . $boundry;
    } else {
      $segments[] = $boundry . $define['swu']['sign'][2] . $boundry;
    }
  }
  return $segments;
}

function fsw2swu($text){
  global $define;
  $pattern = "/(" . $define['fsw']['sign'][2] . "|" . $define['fsw']['spatial'][2] . "|" . $define['fsw']['symbol'][2] . ")/";
  $result = preg_match_all($pattern,$text,$matches);
  if ($result) {
    $matches = array_unique($matches[0]);
    foreach ($matches as $match){
      $text = str_replace($match,fsw1swu($match),$text);
    }
  }
  return $text;
}

function fsw1swu($fsw){
  $pattern = '/[0-9]{3}x[0-9]{3}/';
  preg_match_all($pattern,$fsw, $matches);
  foreach($matches[0] as $str){
    $fsw = str_replace($str,num2swu(substr($str,0,3)) . num2swu(substr($str,4)) ,$fsw);
  }
  $pattern = '/S[123][0-9a-f]{2}[0-5][0-9a-f]/i';
  preg_match_all($pattern,$fsw, $matches);
  foreach($matches[0] as $key){
    $fsw = str_replace($key,key2char($key),$fsw);
  }
  $fsw = str_replace('A',dec2utf(hexdec("D800"),1),$fsw);
  $fsw = str_replace('B',dec2utf(hexdec("D801"),1),$fsw);
  $fsw = str_replace('L',dec2utf(hexdec("D802"),1),$fsw);
  $fsw = str_replace('M',dec2utf(hexdec("D803"),1),$fsw);
  $fsw = str_replace('R',dec2utf(hexdec("D804"),1),$fsw);

  return $fsw;
}

function num2swu($num) {
  return dec2utf(intVal($num) + hexdec('D80C') -250,1);
}

function swu2fsw($text){
  $text = str_replace('𝠀','A',$text);
  $text = str_replace('𝠁','B',$text);
  $text = str_replace('𝠂','L',$text);
  $text = str_replace('𝠃','M',$text);
  $text = str_replace('𝠄','R',$text);
  $pattern = "/[\x{1D80C}-\x{1D9FF}]{2}/u";
  $result = preg_match_all($pattern,$text,$matches);
  if ($result) {
    $matches = array_unique($matches[0]);
    foreach ($matches as $match){
      $text = str_replace($match,swu2coord($match),$text);
    }
  }

  $pattern = "/[\x{40000}-\x{4F428}]/u";
  $result = preg_match_all($pattern,$text,$matches);
  if ($result) {
    $matches = array_unique($matches[0]);
    foreach ($matches as $match){
      $text = str_replace($match,swu2key($match),$text);
    }
  }
  return $text;
}

function swu2coord($coord) {
  return swu2num(substr($coord,0,4)) . "x" . swu2num(substr($coord,4));
}

function swu2num($c) {
  $dec = (ord($c{0})-240)*262144 + (ord($c{1})-128)*4096 + (ord($c{2})-128)*64 + (ord($c{3})-128);
  $dec = $dec - 120594;
  return $dec;
}

function swu2key($c){
  $code = (ord($c{0})-240)*262144 + (ord($c{1})-128)*4096 + (ord($c{2})-128)*64 + (ord($c{3})-128);
  $code = $code - 262145;
  $fr = $code % 96;
  $r = $code % 16;
  $f = ($fr - $r)/16;
  $base = dechex(($code - $fr)/96 + 256);
  return "S" . $base . $f . dechex($r);
}

function query2queryu($query){
  global $define;
  $pattern = '/' . $define['fsw']['coord'][2] . '/u';
  preg_match_all($pattern,$query, $matches);
  foreach($matches[0] as $match){
    $query = str_replace($match,num2swu(substr($match,0,3)) . num2swu(substr($match,4)) ,$query);
  }
  $pattern = '/' . $define['query']['symbol'][2] . '/u';
  preg_match_all($pattern,$query, $matches);
  foreach($matches[0] as $match){
    $sym = substr($match,0,4);
    $f = substr($match,4,1);
    $r = substr($match,5,1);
    if ($f == "u"){
      $sym .= "0";
      $f = "f";
    } else {
      $sym .= $f;
      $f = "";
    }
    if ($r == "u"){
      $sym .= "0";
      $r = "r";
    } else {
      $sym .= $r;
      $r = "";
    }
    $query = str_replace($match,key2char($sym) . $f . $r,$query);
  }
  $pattern = '/' . $define['query']['range'][2] . '/u';
  preg_match_all($pattern,$query, $matches);
  foreach($matches[0] as $match){
    $from = "S" . substr($match,1,3) . "00";
    $to = "S" . substr($match,5,3) . "00";
    $query = str_replace($match,"R" . key2char($from) . key2char($to),$query);
  }
  return $query;
}

function queryu2query($queryu){
  global $define;
  $pattern = '/' . $define['swu']['coord'][2] . '/u';
  preg_match_all($pattern,$queryu, $matches);
  foreach($matches[0] as $match){
    $queryu = str_replace($match,swu2num(substr($match,0,4)) . 'x' . swu2num(substr($match,4)) ,$queryu);
  }
  $pattern = '/' . $define['queryu']['range'][2] . '/u';
  preg_match_all($pattern,$queryu, $matches);
  foreach($matches[0] as $match){
    $from = swu2key(substr($match,1,4));
    $to = swu2key(substr($match,5,4));
    $queryu = str_replace($match,"R" . substr($from,1,3) . 't' . substr($to,1,3) ,$queryu);
  }
  $pattern = '/' . $define['queryu']['symbol'][2] . '/u';
  preg_match_all($pattern,$queryu, $matches);
  foreach($matches[0] as $match){
    $sym = swu2key(substr($match,0,4));
    $f = strpos($match,"f")?'u':substr($sym,4,1);
    $r = strpos($match,"r")?'u':substr($sym,5,1);
    $sym = substr($sym,0,4) . $f . $r;
    $queryu= str_replace($match,$sym,$queryu);
  }
  return $queryu;
}


function test($text,$opt1,$opt2){
  $queryu = query2queryu($text);
  $query = queryu2query($queryu);
  $queryu2 = query2queryu($query);
  return json_pretty([$text==$query,$text,$query,$queryu==$queryu2,$queryu,$queryu2]);
}