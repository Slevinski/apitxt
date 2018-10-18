<?php

$db_security = dirname(__FILE__) . '/../data/security.db';
if (file_exists($db_security)){
  $db0 = new PDO('sqlite:' . $db_security);
} else {
  $db0 = false;
}

$db_file = dirname(__FILE__) . '/../data/iswa2010.db';
if (file_exists($db_file)){
  $db = new PDO('sqlite:' . $db_file );
} else {
  $db = false;
}

function _sqliteRegex($string, $pattern, $ci) {
  if ($ci) $string = mb_strtolower($string,'UTF-8');
  $cnt = @preg_match($pattern, $string);
  if ($cnt===false){
    $pattern = preg_quote(substr($pattern,1,-1),'/');
    $cnt = @preg_match('/' . $pattern . '/', $string);
  }
  if ($cnt) {
    return true;
  } else if ($cnt===0) {
    return false;
  } else {
    haltValidation("invalid search pattern " . $pattern);
  }
}

$collection_dbs = array();
function collection_db($collection){
  global $db0,$collection_dbs;
  if (array_key_exists($collection,$collection_dbs)){
    return $collection_dbs[$collection];
  } else {

    $collection_file = dirname(__FILE__) . '/../data/db/' . $collection . '.db';
    if (file_exists($collection_file)){
      $collection_db = new PDO('sqlite:' . $collection_file );
      $collection_db->sqliteCreateFunction('regex', '_sqliteRegex', 3);
      $collection_dbs[$collection] = $collection_db;
      return $collection_db;
    } else {
      $sel = 'SELECT code from collection_alt where alt=:collection;';
      try {
        $stmt = $db0->prepare($sel);
        $stmt->bindParam(':collection', $collection, PDO::PARAM_STR);
        $stmt->execute();
        $code = $stmt->fetch();
        if ($code){
          return collection_db($code[0]);
        } else {
          haltValidation('invalid collection code');
        }
      } catch (PDOException $e) {
        haltValidation($e->getCode() . ' ' . $e->getMessage());
      }  
  //      haltNoDatabase();
    }
  }
}

function entry_orderby($sort,$default){
  $orderby = ' order by ' . $default;
  if ($sort){
    if ($sort[0]=='-') {
      $desc = 1; 
      $sort = substr($sort,1);
    } else {
      $desc = 0;
    }
    $orderby = ' order by entry.' . $sort;
    if ($desc) {
      $orderby .= ' desc'; 
    }
  }
  return $orderby;
}

function collection_list($lang='',$code=''){
  global $db0;

  $sql = 'SELECT code,alt from collection_alt;';
  $results=$db0->query($sql);
  $rows = $results->fetchAll(PDO::FETCH_ASSOC);
  $alt = '';
  $alts = array();
  foreach ($rows as $row){
    $alts[$row['code']][] = $row['alt'];
    if ($row['alt']==$code){
      $alt = $row['code'];
    }
  }
  
  $sql = 'SELECT code, language, namespace, subspace, qqq, name, icon, user, created_at from collection';
  if ($lang) {
    $sql .= ' where language=:lang';
  }
  if ($code) {
    $sql .= ' where code=:code';
  }
  $sql .= ';';

  try {
    $stmt = $db0->prepare($sql);
    if ($lang){
      $stmt->bindParam(':lang', $lang, PDO::PARAM_STR);
    }
    if ($code){
      $stmt->bindParam(':code', $code, PDO::PARAM_STR);
    }
    $stmt->execute();
    $entries = $stmt->fetchAll(PDO::FETCH_CLASS);
    
    if ($code && count($entries)==0){
      if ($alt){
        return collection_list('',$alt);
      }
      haltValidation('invalid collection code');
    }
    foreach ($entries as $i=>$entry){
      if(array_key_exists($entry->code,$alts)){
        $entries[$i]->alt=$alts[$entry->code];
      } else {
        $entries[$i]->alt=array();
      }
    }

    $return['total'] = count($entries);
    $return['data'] = $entries;
    return $return;
  } catch (PDOException $e) {
    haltValidation($e->getCode() . ' ' . $e->getMessage());
  }  
  
}

function collection_query($collection,$query,$offset,$limit,$sort){
  $collection_db = collection_db($collection);
  $regex = SignWriting\query2regex($query);
  if (!$regex){
    haltValidation('invalid query string');
  }
  // $collection_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  foreach ($regex as $i=>$re){
    $re = str_replace('/',"",$re);
    $re = "'/^" . $re . "$/'";
    $regex[$i] = $re;
  }
  try {
    $sel = 'SELECT entry.id, user, created_at, updated_at, sign, signtext, group_concat(term,"|") as terms, text, source, detail from entry LEFT JOIN term on entry.id=term.id where REGEX(sign,' . $regex[0] . ',0)';
    $cnt = count($regex);
    $end = '';
    $part = '';
    for ($i=1;$i<$cnt;$i++) {
      $part = ' and entry.id in (select id from entry where REGEX(sign,' . $regex[$i] . ',0)';
      $part .= 'END)';
      if ($end) {
        $end = str_replace('END)',$part . ')',$end);
      } else {
        $end = $part;
      }
    }
    $end = str_replace('END)',')',$end);
    $sel .= $end;
    
    $sel .= ' group by entry.id ';

    $sel .= entry_orderby($sort,'sign');
    $results=$collection_db->query($sel);
    $entries = $results->fetchAll(PDO::FETCH_ASSOC);
    $total = count($entries);
    if ($limit>0){
      $data = array_slice($entries,$offset,$limit);
    } else {
      $data = array_slice($entries,$offset);
    }
    $return = array();
    if($data){
      foreach ($data as $i=>$entry){
        $data[$i]['terms'] = array_filter(explode('|',$entry['terms']));
        $data[$i]['detail'] = json_decode($entry['detail']);
      }
    }
    $return['total'] = $total;
    $return['data'] = $data;
    return $return;
  } catch (PDOException $e) {
    haltValidation($e->getCode() . ' ' . $e->getMessage());
  }  
}

function collection_query_signtext($collection,$query,$offset,$limit,$sort){
  $collection_db = collection_db($collection);
  $regex = SignWriting\query2regex($query);
  if (!$regex){
    haltValidation('invalid query string');
  }
  
  $orderby = entry_orderby($sort,'sign');

  try {
    $sel = 'SELECT entry.id, user, created_at, updated_at, sign, signtext, group_concat(term,"|") as terms, text, source, detail from entry LEFT JOIN term on entry.id=term.id where REGEX(signtext,"' . $regex[0] . '",0) group by entry.id ' . $orderby . ';';
    $results=$collection_db->query($sel);
    $entries = $results->fetchAll(PDO::FETCH_ASSOC);
    $cnt = count($regex);
    if ($cnt>1 && count($entries)){
      $signtext = '';
      for ($i=0;$i<count($entries);$i++) {
        $signtext .= $entries[$i]['signtext'];
      }

      foreach ($regex as $pattern){
        $count = preg_match_all($pattern, $signtext, $matches);
        $signtext = implode(array_unique($matches[0]),' ');
      }
        
      if ($signtext){
        $words = array_unique(explode(' ',$signtext));
      } else {
        $words = array();
      }
      if (count($words)){
        foreach ($words as $i=>$word){
          $words[$i] = '(signtext LIKE "%' . $word . '%")';
        }
        $sel = 'SELECT entry.id, user, created_at, updated_at, sign, signtext, group_concat(term,"|") as terms, text, source, detail from entry LEFT JOIN term on entry.id=term.id where ' . implode($words,' or ') . ' group by entry.id ' . $orderby . ';';
        $results=$collection_db->query($sel);
        $entries = $results->fetchAll(PDO::FETCH_ASSOC);
      } else {
        $entries = array(); 
      }
    }

    $total = count($entries);
    if ($limit>0){
      $data = array_slice($entries,$offset,$limit);
    } else {
      $data = array_slice($entries,$offset);
    }
    $return = array();
    if($data){
      foreach ($data as $i=>$entry){
        $data[$i]['terms'] = array_filter(explode('|',$entry['terms']));
        $data[$i]['detail'] = json_decode($entry['detail']);
      }
    }
    $return['total'] = $total;
    $return['data'] = $data;
    return $return;
  } catch (PDOException $e) {
    haltValidation($e->getCode() . ' ' . $e->getMessage());
  }  
}

function collection_search($collection,$search,$type,$ci,$offset,$limit,$sort){
  //  (^|\|)
  if ($ci) {
    $search = mb_strtolower($search,'UTF-8');
    $col = 'lower'; 
  } else {
    $col = 'term'; 
  }
  
  if ($type == 'start' || $type == 'exact'){
    $search = "^" . $search; 
  }
  if ($type == 'end' || $type == 'exact'){
    $search = $search . "$" ; 
  }
  $search = "/" . $search . "/";
  $collection_db = collection_db($collection);
  if (!$search){
    haltValidation('missing search string');
  }
  $orderby = entry_orderby($sort,'sign');
  $sel = 'select entry.id, user, created_at, updated_at, sign, signtext, group_concat(term,"|") as terms, text, source, detail from entry LEFT JOIN term on entry.id=term.id where entry.id in (select id from term where REGEX(' . $col . ',:search,0)) group by entry.id ' . $orderby . ';';
  $collection_db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,
  PDO::FETCH_ASSOC);
  $collection_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  try {
    $stmt = $collection_db->prepare($sel);
    $stmt->bindParam(':search', $search, PDO::PARAM_STR);
    $stmt->execute();
    $entries = $stmt->fetchAll();

    $total = count($entries);
    if ($limit>0){
      $data = array_slice($entries,$offset,$limit);
    } else {
      $data = array_slice($entries,$offset);
    }
    $return = array();
    if($data){
      foreach ($data as $i=>$entry){
        $data[$i]['terms'] = explode('|',$entry['terms']);
        $data[$i]['detail'] = json_decode($entry['detail']);
      }
    }
    $return['total'] = $total;
    $return['data'] = $data;
    return $return;
  } catch (PDOException $e) {
    haltValidation($e->getCode() . ' ' . $e->getMessage());
  }  
}

function collection_date($collection,$date,$before,$after,$offset,$limit,$sort){
  $collection_db = collection_db($collection);
  $col = $date . '_at';
  $orderby = entry_orderby($sort,$col);
  $sel = 'select entry.id, user, created_at, updated_at, sign, signtext, group_concat(term,"|") as terms, text, source, detail from entry LEFT JOIN term on entry.id=term.id ';
  $where = array();
  if ($before){
    $where[] = $col . ' < :before';
  }
  if ($after){
    $where[] = $col . ' > :after';
  }

  if (count($where)){
    $where = implode(' and ',$where);
    $sel .= 'where ' . $where . ' ';
  }
  $sel .= ' group by entry.id ' . $orderby . ';';
  $collection_db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,
  PDO::FETCH_ASSOC);
  $collection_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  try {
    $stmt = $collection_db->prepare($sel);
    if ($before){
      $stmt->bindParam(':before', $before, PDO::PARAM_STR);
    }
    if ($after){
      $stmt->bindParam(':after', $after, PDO::PARAM_STR);
    }
    $stmt->execute();
    $entries = $stmt->fetchAll();

    $total = count($entries);
    if ($limit>0){
      $data = array_slice($entries,$offset,$limit);
    } else {
      $data = array_slice($entries,$offset);
    }
    $return = array();
    if($data){
      foreach ($data as $i=>$entry){
        $data[$i]['terms'] = explode('|',$entry['terms']);
        $data[$i]['detail'] = json_decode($entry['detail']);
      }
    }
    $return['total'] = $total;
    $return['data'] = $data;
    return $return;
  } catch (PDOException $e) {
    haltValidation($e->getCode() . ' ' . $e->getMessage());
  }  
}

function collection_entry($collection,$id,$sort){
  $collection_db = collection_db($collection);
  $orderby = entry_orderby($sort,'sign');
  preg_match_all('/[0-9]+/', $id, $matches);
  $ids = implode(array_unique($matches[0]),',');
  if (!$ids) {
    haltValidation('invalid entry id');
  }
  $sel = 'select entry.id, user, created_at, updated_at, sign, signtext, group_concat(term,"|") as terms, text, source, detail from entry LEFT JOIN term on entry.id=term.id where entry.id in (' . $ids . ')';
  $sel .= ' group by entry.id ' . $orderby . ';';
  $results=$collection_db->query($sel);
  $data = $results->fetchAll(PDO::FETCH_ASSOC);
  $total = count($data);
  $return = array();
  if($data){
    foreach ($data as $i=>$entry){
      $data[$i]['terms'] = array_filter(explode('|',$entry['terms']));
      $data[$i]['detail'] = json_decode($entry['detail']);
    }
  }
  $return['total'] = $total;
  $return['data'] = $data;
  return $return;
}

function collection_sign($collection,$term,$text,$query,$source,$offset,$limit,$sort){
  $collection_db = collection_db($collection);
  $sql = 'SELECT id, sign from entry ';
  $where = array();
  
  $where[] = 'sign <> ""';

  if ($term){
    $where[] = 'id in (select id from term where REGEX(lower,"/' . mb_strtolower($term) . '/",0))';
  }
  
  if ($text){
    $where[] = 'id in (select id from entry where REGEX(text,"/' . mb_strtolower($text) . '/",1))';
  }

  if ($source){
    $where[] = 'id in (select id from entry where REGEX(source,"/' . mb_strtolower($source) . '/",1))';
  }

  
  
  $regex = SignWriting\query2regex($query);
  if ($regex){
    foreach ($regex as $i=>$re){
      $re = str_replace('/',"",$re);
      $re = "'/^" . $re . "$/'";
      $regex[$i] = $re;
    }
    $sel = 'id in (select id from entry where REGEX(sign,' . $regex[0] . ',0)';
    $cnt = count($regex);
    $end = '';
    $part = '';
    for ($i=1;$i<$cnt;$i++) {
      $part = ' and id in (select id from entry where REGEX(sign,' . $regex[$i] . ',0)';
      $part .= 'END)';
      if ($end) {
        $end = str_replace('END)',$part . ')',$end);
      } else {
        $end = $part;
      }
    }
    $end = str_replace('END)',')',$end);
    $sel .= $end . ')';
    $where[] = $sel;
  }

  if (count($where)){
    $sql .= 'where ' . implode($where, ' and '); 
  }

  $sql .= entry_orderby($sort,'sign');
  $results=$collection_db->query($sql);
  $entries = $results->fetchAll(PDO::FETCH_ASSOC);
  $total = count($entries);
  if ($limit>0){
    $data = array_slice($entries,$offset,$limit);
  } else {
    $data = array_slice($entries,$offset);
  }
  $return = array();
  $return['total'] = $total;
  $return['data'] = $data;
  return $return;
}

function collection_term($collection,$term,$text,$query,$source,$offset,$limit,$sort){
  $collection_db = collection_db($collection);
  $sql = 'SELECT group_concat(id,",") id, term from term ';
  $where = array();

  if ($term){
    $where[] = 'REGEX(lower,:term,0)';
  }

  if ($text){
    $where[] = 'id in (select id from entry where REGEX(text,"/' . mb_strtolower($text) . '/",1))';
  }

  if ($source){
    $where[] = 'id in (select id from entry where REGEX(source,"/' . mb_strtolower($source) . '/",1))';
  }


  $regex = SignWriting\query2regex($query);
  if ($regex){
    foreach ($regex as $i=>$re){
      $re = str_replace('/',"",$re);
      $re = "'/^" . $re . "$/'";
      $regex[$i] = $re;
    }
    $sel = 'id in (select id from entry where REGEX(sign,' . $regex[0] . ',0)';
    $cnt = count($regex);
    $end = '';
    $part = '';
    for ($i=1;$i<$cnt;$i++) {
      $part = ' and id in (select id from entry where REGEX(sign,' . $regex[$i] . ',0)';
      $part .= 'END)';
      if ($end) {
        $end = str_replace('END)',$part . ')',$end);
      } else {
        $end = $part;
      }
    }
    $end = str_replace('END)',')',$end);
    $sel .= $end . ')';
    $where[] = $sel;
  }

  if (count($where)){
    $sql .= 'where ' . implode($where, ' and '); 
  }
  $sql .= ' group by term ';
  $sql .= entry_orderby($sort,'lower');

  $stmt = $collection_db->prepare($sql);
  if ($term){
    $term = mb_strtolower($term);
    $term = '/' . $term . '/';
    $stmt->bindParam(':term', $term, PDO::PARAM_STR);
  }
  $stmt->execute();
  $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $total = count($entries);
  if ($limit>0){
    $data = array_slice($entries,$offset,$limit);
  } else {
    $data = array_slice($entries,$offset);
  }
  $return = array();
  $return['total'] = $total;
  $return['data'] = $data;
  return $return;
}

function getCountries(){
  global $db;

  $countries = array();
  $sql = 'SELECT code, qqq, name, svg, x1, y1, x2, y2 from country;';
  $results=$db->query($sql);
  $countries = $results->fetchAll(PDO::FETCH_CLASS);
  if($countries){
    return $countries;
  } else {
    return array();
  }
}

function getCountryLanguageOther($cc){
  global $db;
  $cc = preg_replace("/[^A-Za-z0-9\-,]/", '', $cc);
  $collections = array();
  $sql = 'select language.code, language.qqq, language.name, collection.code collection from language LEFT JOIN collection on language.code=collection.language where signed=1 and collection.code is null and language.code in (select language from language_country where country="' . $cc . '") order by language.code;';
  $results=$db->query($sql);
  $return = $results->fetchAll(PDO::FETCH_NAMED);
  return $return;
}

function getCountryLanguagePuddles($cc){
  global $db;
  $cc = preg_replace("/[^A-Za-z0-9\-,]/", '', $cc);
  $collections = array();
  $sql = 'select language.code, language.qqq, language.name, collection.code, collection.namespace, collection.qqq, collection.name, collection.icon from language INNER JOIN collection on language.code=collection.language where language.code in (select language from language_country where country="' . $cc . '") order by language.code, collection.position, collection.name;';
  $results=$db->query($sql);
  $collections = $results->fetchAll(PDO::FETCH_NAMED);
  $languages = array();
  if($collections){
    foreach ($collections as $i=>$row){
      $language=array();
      $language['code'] = $row['code'][0];
      $language['qqq'] = $row['qqq'][0];
      $language['name'] = $row['name'][0];
      $language['collections'] = array();
      $languages[$row['code'][0]] = $language;
    }
    foreach ($collections as $i=>$row){
      $collection=array();
      $collection['code'] = $row['code'][1];
      $collection['qqq'] = $row['qqq'][1];
      $collection['name'] = $row['name'][1];
      $collection['icon'] = $row['icon'];
      $collection['namespace'] = $row['namespace'];
      $languages[$row['code'][0]]['collections'][] = $collection;
    }
    $return = array();
    foreach ($languages as $language){
      $return[] = $language; 
    }
    return $return;
  } else {
    return array();
  }
}

function getCountriesLanguagesPuddles(){
  global $db;
  $collections = array();
  $sql = 'select country,group_concat(distinct language_country.language) languages,group_concat(collection.code) collections from language_country inner join language on language_country.language = language.code left join collection on language_country.language = collection.language where signed=1 group by country;';
  //  $sql = 'select country,language_country.language,group_concat(collection.code) collections from language_country inner join language on language_country.language = language.code left join collection on language_country.language = collection.language where signed=1 group by country,language_country.language;';
  $results=$db->query($sql);
  $return = $results->fetchAll(PDO::FETCH_NAMED);
  
  return $return;
}

function getTranslations($lang){
  global $db;
  $trans = array();
  $sql = 'SELECT qqq, name from translate where lang="' . $lang . '";';
  $results=$db->query($sql);
  $trans = $results->fetchAll(PDO::FETCH_CLASS);
  if($trans){
    return $trans;
  } else {
    return array();
  }
}

function getFlags($cc=''){
  global $db;
  $cc = preg_replace("/[^A-Za-z0-9\-,]/", '', $cc);
  if ($cc){
    $countries = explode(",",$cc);
    $sql = 'SELECT code,qqq,name,flag from country where code in ("' . implode('","',$countries) . '") order by code;';
  } else {
    $sql = 'SELECT code,qqq,name,flag from country where code in (select country from language_country where language in (select code from language where signed=1)) order by code;';
  }

  $results=$db->query($sql);
  $countries = $results->fetchAll(PDO::FETCH_ASSOC);
  $lines = array();
  foreach ($countries as $country){
    $line = $country['code'] . "\t" . $country['flag'];
    $lines[] = $line;
  }
  
  if(count($lines)){
    return implode($lines,"\n");
  } else {
    return '';
  }
}

function getSymbols($keys) {
  global $db;
  if (!$db) { haltNoDatabase();}

  if (is_array($keys)){
    $list = '("' . implode('","',$keys) . '")';
  } else {
    $list = '("' . $keys . '")';
  }
  $syms = array();
  $sql = 'SELECT symkey as key,width as w,height as h,svg as g from symbol where symkey in ';
  $sql .= $list . ';';
  $results=$db->query($sql);
  $syms=array();
  $syms = $results->fetchAll(PDO::FETCH_CLASS);
  if($syms){
    return $syms;
  } else {
    return array();
  }
}

function json_check() {
  switch (json_last_error()) {
    case JSON_ERROR_NONE:
      //'No errors';
      break;
    case JSON_ERROR_DEPTH:
      haltValidation('Maximum stack depth exceeded');
      break;
    case JSON_ERROR_STATE_MISMATCH:
      haltValidation('Underflow or the modes mismatch');
      break;
    case JSON_ERROR_CTRL_CHAR:
      haltValidation('Unexpected control character found');
      break;
    case JSON_ERROR_SYNTAX:
      haltValidation('Syntax error, malformed JSON');
      break;
    case JSON_ERROR_UTF8:
      haltValidation('Malformed UTF-8 characters, possibly incorrectly encoded');
      break;
    default:
      haltValidation('Unknown error');
      break;
  }
}

function json_pretty($object) {
    $json = json_encode($object);
    $tab = "  ";
    $new_json = "";
    $indent_level = 0;
    $in_string = false;

    $json_obj = json_decode($json);

    if($json_obj === false)
        return false;

    if (defined("JSON_UNESCAPED_SLASHES")){
      $json = json_encode($json_obj,JSON_UNESCAPED_SLASHES);
    } else {
      $json = str_replace('\\/', '/',json_encode($json_obj));
    }
    $len = strlen($json);

    for($c = 0; $c < $len; $c++)
    {
        $char = $json[$c];
        switch($char)
        {
            case '{':
            case '[':
                if(!$in_string)
                {
                    $new_json .= $char . "\n" . str_repeat($tab, $indent_level+1);
                    $indent_level++;
                }
                else
                {
                    $new_json .= $char;
                }
                break;
            case '}':
            case ']':
                if(!$in_string)
                {
                    $indent_level--;
                    $new_json .= "\n" . str_repeat($tab, $indent_level) . $char;
                }
                else
                {
                    $new_json .= $char;
                }
                break;
            case ',':
                if(!$in_string)
                {
                    $new_json .= ",\n" . str_repeat($tab, $indent_level);
                }
                else
                {
                    $new_json .= $char;
                }
                break;
            case ':':
                if(!$in_string)
                {
                    $new_json .= ": ";
                }
                else
                {
                    $new_json .= $char;
                }
                break;
            case '"':
                if($c > 0 && $json[$c-1] != '\\')
                {
                    $in_string = !$in_string;
                }
            default:
                $new_json .= $char;
                break;
        }
    }

    return $new_json;
}
