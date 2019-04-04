var spVersion = "3";
var host = "";
try {
  host = config['state']['connection']['server'];
} catch (e){
 host = "https://signpuddle.com/server"
}
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "SignPuddle 3 Dictionary API", 
  "lines": [
    "## Dictionary", 
    "", 
    "SignPuddle 3 organizes user dictionary elements into dictionary collections.", 
    "Dictionary collections are available in three different forms: database, plain text files, and JSON objects", 
    "", 
    "### Databases", 
    "", 
    "Each collection is available as an SQLite database.", 
    "These databases are the primary source and all edits are directly applied to the database.", 
    "", 
    "table entry  ", 
    "+ id  ", 
    "+ sign  ", 
    "+ terms  ", 
    "+ lower  ", 
    "+ signtext  ", 
    "+ text  ", 
    "+ source  ", 
    "+ detail  ", 
    "+ user  ", 
    "+ created_at  ", 
    "+ updated_at  ", 
    "", 
    "### Plain Text Files", 
    "", 
    "Each collection is available as a plain text field where each entry occupies its own line.", 
    "Each entry contains multiple fields that are divided by tab characters.", 
    "The plain text files are designed for easy import and export from the databases.", 
    "", 
    "id /t sign /t terms /t lower /t signtext /t text /t source /t detail /t user /t updated_at", 
    "", 
    "### JSON Data files", 
    "", 
    "The dictionary JSON data file is an object.", 
    "Each key contains an object with three properties: message, description, icon, and updated_at.", 
    "", 
    "{  ", 
    "  \"name\": \"xml-MY-dictionary-public\",  ", 
    "  \"data\": [  ", 
    "    {  ", 
    "      \"id\": \"2\",  ", 
    "      \"sign\": \"\\ud836\\udc03\\ud836\\udd44\\ud836\\udd19\\ud8ef\\udfa1\\ud836\\udcf4\\ud836\\udcf4\\ud8dd\\udc54\\ud836\\udcc8\\ud836\\udcfc\\ud8dd\\udc42\\ud836\\udd26\\ud836\\udcfa\\ud8c8\\uddd2\\ud836\\udd15\\ud836\\udcee\\ud8c8\\uddda\\ud836\\udce0\\ud836\\udcef\",  ", 
    "      \"terms\": [  ", 
    "        \"Malaysia\"  ", 
    "      ],  ", 
    "      \"lower\": [  ", 
    "        \"malaysia\"  ", 
    "      ],  ", 
    "      \"signtext\": \"\",  ", 
    "      \"text\": \"\",  ", 
    "      \"source\": \"Conference Maastricht\",  ", 
    "      \"detail\": {},  ", 
    "      \"user\": \"admin\",  ", 
    "      \"created_at\": \"2007-03-29T19:09:37Z\",  ", 
    "      \"updated_at\": \"2007-03-29T19:09:37Z\"  ", 
    "    }  ", 
    "  ]  ", 
    "}  ", 
    ""
  ], 
  "html": "<h2>Dictionary</h2>\n<p>SignPuddle 3 organizes user dictionary elements into dictionary collections.\nDictionary collections are available in three different forms: database, plain text files, and JSON objects</p>\n<h3>Databases</h3>\n<p>Each collection is available as an SQLite database.\nThese databases are the primary source and all edits are directly applied to the database.</p>\n<p>table entry<br />\n+ id<br />\n+ sign<br />\n+ terms<br />\n+ lower<br />\n+ signtext<br />\n+ text<br />\n+ source<br />\n+ detail<br />\n+ user<br />\n+ created_at<br />\n+ updated_at  </p>\n<h3>Plain Text Files</h3>\n<p>Each collection is available as a plain text field where each entry occupies its own line.\nEach entry contains multiple fields that are divided by tab characters.\nThe plain text files are designed for easy import and export from the databases.</p>\n<p>id /t sign /t terms /t lower /t signtext /t text /t source /t detail /t user /t updated_at</p>\n<h3>JSON Data files</h3>\n<p>The dictionary JSON data file is an object.\nEach key contains an object with three properties: message, description, icon, and updated_at.</p>\n<p>{<br />\n  \"name\": \"xml-MY-dictionary-public\",<br />\n  \"data\": [<br />\n    {<br />\n      \"id\": \"2\",<br />\n      \"sign\": \"\\ud836\\udc03\\ud836\\udd44\\ud836\\udd19\\ud8ef\\udfa1\\ud836\\udcf4\\ud836\\udcf4\\ud8dd\\udc54\\ud836\\udcc8\\ud836\\udcfc\\ud8dd\\udc42\\ud836\\udd26\\ud836\\udcfa\\ud8c8\\uddd2\\ud836\\udd15\\ud836\\udcee\\ud8c8\\uddda\\ud836\\udce0\\ud836\\udcef\",<br />\n      \"terms\": [<br />\n        \"Malaysia\"<br />\n      ],<br />\n      \"lower\": [<br />\n        \"malaysia\"<br />\n      ],<br />\n      \"signtext\": \"\",<br />\n      \"text\": \"\",<br />\n      \"source\": \"Conference Maastricht\",<br />\n      \"detail\": {},<br />\n      \"user\": \"admin\",<br />\n      \"created_at\": \"2007-03-29T19:09:37Z\",<br />\n      \"updated_at\": \"2007-03-29T19:09:37Z\"<br />\n    }<br />\n  ]<br />\n}  </p>", 
  "host": "https://signpuddle.com/server", 
  "meta": "Generated from ApiTxt format (output/dictionary.txt) using txt2json.py", 
  "groups": [
    {
      "routes": [
        {
          "route": "/dictionary{?name}", 
          "name": "Dictionaries available", 
          "parameters": [
            {
              "example": "public", 
              "type": "string", 
              "description": "partial dictionary name", 
              "name": "name"
            }
          ], 
          "methods": [
            {
              "code": [
                "$dir = 'data/db/';", 
                "$ext = '.db';", 
                "$out = [];", 
                "if ($name){", 
                "  if (strpos($name,\"dictionary\")!==false){", 
                "    $dictionaries = $dir . '*' . $name . '*' . $ext;", 
                "    $files = glob($dictionaries);", 
                "  } else {", 
                "    $dictionaries = $dir . '*dictionary*' . $name . '*' . $ext;", 
                "    $files = glob($dictionaries);", 
                "    if (count($files)==0) {", 
                "      $dictionaries = $dir . '*' . $name . '*dictionary*' . $ext;", 
                "      $files = glob($dictionaries);", 
                "    }", 
                "  }", 
                "} else {", 
                "  $dictionaries = $dir . '*dictionary*' . $ext;", 
                "  $files = glob($dictionaries);", 
                "}", 
                "foreach ($files as $filename) {", 
                "  $out[] = str_replace($ext,'',str_replace($dir,'',$filename));", 
                "}", 
                "if (count($out)){", 
                "  echo json_pretty($out);", 
                "} else {", 
                "  $app->response->setStatus(204);", 
                "}", 
                "return;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[\"ase-US-dictionary-public\"]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get available dictionaries"
            }
          ]
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "if (strpos($name,'.')){", 
                "  $parts = explode('.',$name);", 
                "  $name = $parts[0];", 
                "  $format = $parts[1];", 
                "  if (!in_array($format,['db','txt','json'])){", 
                "    haltNotFound();", 
                "  }", 
                "} else {", 
                "  $format = 'json';", 
                "}", 
                "$dir = 'data/' . $format . '/';", 
                "$ext = '.' . $format;", 
                "$file = $dir . $name . $ext;", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check  && !$update){", 
                "  haltNotModified();", 
                "}", 
                "if ($format=='json' && (!file_exists($file) || $update)) {", 
                "  $json = dictionary2json($name);", 
                "  file_put_contents($file,$json);", 
                "} else if ($format=='txt' && (!file_exists($file) || $update)) {", 
                "  $txt = dictionary2txt($name);", 
                "  file_put_contents($file,$txt);", 
                "}", 
                "if(file_exists($file)) {", 
                "  header('Last-Modified: ' . $lastModified);", 
                "  $searchTime = searchtime($timein);", 
                "  header(\"Search-Time: \" . $searchTime);", 
                "  getFile($file);", 
                "} else {", 
                "  haltNotFound();", 
                "}"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z"
                    }, 
                    "name": "dictionary text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "1\t\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00\ttest zero\ttest zero\twe are testing SignPuddle 1.6\tVal ;-)\t{\"video\":\"<iframe width=\\\"425\\\" height=\\\"349\\\" src=\\\"http:\\/\\/www.youtube.com\\/embed\\/RTniYA1lTDM\\\" frameborder=\\\"0\\\" allowfullscreen><\\/iframe>\"}\tVal\t2011-07-20T17:39:02Z\t2011-07-20T17:42:09Z"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary"
            }
          ], 
          "route": "/dictionary/{name}{?update}", 
          "name": "Dictionary resource", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "1", 
              "type": "optional,number", 
              "description": "Forces a rewrite of the dictionary for json and txt formats", 
              "name": "update"
            }
          ], 
          "description": "Access to available dictionaries"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check){", 
                "  haltNotModified();", 
                "}", 
                "header('Last-Modified: ' . $lastModified);", 
                "$output = dictionarySigns($name);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z"
                    }, 
                    "name": "dictionary text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary signs"
            }
          ], 
          "route": "/dictionary/{name}/signs", 
          "name": "List of dictionary signs", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }
          ], 
          "description": "The signs in the dictionary"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check){", 
                "  haltNotModified();", 
                "}", 
                "header('Last-Modified: ' . $lastModified);", 
                "$output = dictionarySigntexts($name);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z"
                    }, 
                    "name": "dictionary text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary signtexts"
            }
          ], 
          "route": "/dictionary/{name}/signtexts", 
          "name": "List of dictionary signtexts", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }
          ], 
          "description": "The signtexts in the dictionary"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$data = $app->request->getbody();", 
                "$data = json_decode($data,true);", 
                "echo dictionaryEntryNew($name,$data,$pass);", 
                "return;"
              ], 
              "method": "POST", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{", 
                      "  \"sign\": \"\\ud836\\udc03\\ud836\\udd44\\ud836\\udd19\\ud8ef\\udfa1\\ud836\\udcf4\\ud836\\udcf4\\ud8dd\\udc54\\ud836\\udcc8\\ud836\\udcfc\\ud8dd\\udc42\\ud836\\udd26\\ud836\\udcfa\\ud8c8\\uddd2\\ud836\\udd15\\ud836\\udcee\\ud8c8\\uddda\\ud836\\udce0\\ud836\\udcef\",", 
                      "  \"terms\": [", 
                      "    \"Malaysia\"", 
                      "  ],", 
                      "  \"signtext\": \"\",", 
                      "  \"text\": \"\",", 
                      "  \"source\": \"Conference Maastricht\",", 
                      "  \"detail\": {}", 
                      "}  "
                    ], 
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "type": "application/json", 
                    "name": "add new dictionary entry"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "777"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "add dictionary entry"
            }
          ], 
          "route": "/dictionary/{name}/entry", 
          "name": "Dictionary entry resource", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }
          ], 
          "description": "Entries for dictionary"
        }, 
        {
          "methods": [
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "$data = $app->request->getbody();", 
                "$data = json_decode($data,true);", 
                "dictionaryEntryUpdate($name,$id,$data,$pass);", 
                "$app->response->setStatus(204);", 
                "return;"
              ], 
              "method": "PUT", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{", 
                      "  \"sign\": \"\\ud836\\udc03\\ud836\\udd44\\ud836\\udd19\\ud8ef\\udfa1\\ud836\\udcf4\\ud836\\udcf4\\ud8dd\\udc54\\ud836\\udcc8\\ud836\\udcfc\\ud8dd\\udc42\\ud836\\udd26\\ud836\\udcfa\\ud8c8\\uddd2\\ud836\\udd15\\ud836\\udcee\\ud8c8\\uddda\\ud836\\udce0\\ud836\\udcef\",", 
                      "  \"terms\": [", 
                      "    \"Malaysia\"", 
                      "  ],", 
                      "  \"signtext\": \"\",", 
                      "  \"text\": \"\",", 
                      "  \"source\": \"Conference Maastricht\",", 
                      "  \"detail\": {}", 
                      "}  "
                    ], 
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "type": "application/json", 
                    "name": "an update for an existing dictionary entry"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "update dictionary entry"
            }, 
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "dictionaryEntryDelete($name,$id,$pass);", 
                "$app->response->setStatus(204);"
              ], 
              "method": "DELETE", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "the removal of an dictionary entry"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "remove dictionary entry"
            }
          ], 
          "route": "/dictionary/{name}/entry/{id}", 
          "name": "Dictionary entry resource for id", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "11244", 
              "type": "string", 
              "description": "An id numbers", 
              "name": "id"
            }
          ], 
          "description": "Specific entries for dictionary"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check){", 
                "  haltNotModified();", 
                "}", 
                "$output = json_pretty(dictionarySearch($name,$offset,$limit,$filter,$sort,$results));", 
                "header('Last-Modified: ' . $lastModified);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "dictionary query results"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{", 
                        "  \"total\": 1,", 
                        "  \"data\": [", 
                        "    [", 
                        "      \"1\",", 
                        "      \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\"", 
                        "    ]", 
                        "  ]", 
                        "}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary results of searching"
            }
          ], 
          "route": "/dictionary/{name}/search{?offset,limit,filter,sort,results}", 
          "name": "Search dictionary", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of a dictionary", 
              "name": "name"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, sign, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Searching dictionary signs"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check){", 
                "  haltNotModified();", 
                "}", 
                "$output = json_pretty(dictionarySearchId($name,$id,$offset,$limit,$filter,$sort,$results));", 
                "header('Last-Modified: ' . $lastModified);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "an dictionary entry"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[", 
                        "  {", 
                        "    \"id\": \"1\",", 
                        "    \"sign\": \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\",", 
                        "    \"terms\": [", 
                        "      \"test zero\"", 
                        "    ],", 
                        "    \"lower\": [", 
                        "      \"test zero\"", 
                        "    ],", 
                        "    \"signtext\": \"\",", 
                        "    \"text\": \"we are testing SignPuddle 1.6\",", 
                        "    \"source\": \"Val ;-)\",", 
                        "    \"detail\": {", 
                        "      \"video\": \"<iframe width=\\\"425\\\" height=\\\"349\\\" src=\\\"http:\\/\\/www.youtube.com\\/embed\\/RTniYA1lTDM\\\" frameborder=\\\"0\\\" allowfullscreen><\\/iframe>\"", 
                        "    },", 
                        "    \"user\": \"Val\",", 
                        "    \"created_at\": \"2011-07-20T17:39:02Z\",", 
                        "    \"updated_at\": \"2011-07-20T17:42:09Z\"", 
                        "  }", 
                        "]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary entry"
            }
          ], 
          "route": "/dictionary/{name}/search/id/{id}{?offset,limit,filter,sort,results}", 
          "name": "Search dictionary with ids", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "1-4,5", 
              "type": "string", 
              "description": "A list of one or more id numbers", 
              "name": "id"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, sign, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Specific entries for dictionary"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check){", 
                "  haltNotModified();", 
                "}", 
                "header('Last-Modified: ' . $lastModified);", 
                "$output = json_pretty(dictionarySearchSign($name,$query,$offset,$limit,$filter,$sort,$results));", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "dictionary query results"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{", 
                        "  \"total\": 1,", 
                        "  \"data\": [", 
                        "    [", 
                        "      \"1\",", 
                        "      \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\"", 
                        "    ]", 
                        "  ]", 
                        "}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary results of searching signs with query string"
            }
          ], 
          "route": "/dictionary/{name}/search/sign/{query}{?offset,limit,filter,sort,results}", 
          "name": "Search signs with query string", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of a dictionary", 
              "name": "name"
            }, 
            {
              "example": "Q", 
              "type": "required,string", 
              "description": "A query string", 
              "name": "query"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, sign, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Query string access to dictionary signs"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check){", 
                "  haltNotModified();", 
                "}", 
                "header('Last-Modified: ' . $lastModified);", 
                "$output = json_pretty(dictionarySearchSigntext($name,$query,$offset,$limit,$filter,$sort,$results));", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "dictionary query results"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{", 
                        "  \"total\": 1,", 
                        "  \"data\": [", 
                        "    [", 
                        "      \"1\",", 
                        "      \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\"", 
                        "    ]", 
                        "  ]", 
                        "}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary results of searching signtexts with query string"
            }
          ], 
          "route": "/dictionary/{name}/search/signtext/{query}{?offset,limit,filter,sort,results}", 
          "name": "Search signtexts with query string", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of a dictionary", 
              "name": "name"
            }, 
            {
              "example": "Q", 
              "type": "required,string", 
              "description": "A query string", 
              "name": "query"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, signtext, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Query string access to dictionary signtexts"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$output = json_pretty(dictionarySearchTerms($name,$text,$type,$case, $offset, $limit, $filter, $sort,$results));", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "matching dictionary entries"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{", 
                        "  \"total\": 1,", 
                        "  \"data\": [", 
                        "    [", 
                        "      \"1\",", 
                        "      \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\"", 
                        "    ]", 
                        "  ]", 
                        "}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve matching entries"
            }
          ], 
          "route": "/dictionary/{name}/search/terms/{text}{?type,case,offset,limit,filter,sort,results}", 
          "name": "Dictionary terms search", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "`SignPuddle`", 
              "type": "required,string", 
              "description": "The text for searching", 
              "name": "text"
            }, 
            {
              "example": "exact", 
              "type": "string", 
              "description": "Type of search of start, end, or exact", 
              "name": "type"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Case sensitive search", 
              "name": "case"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, sign, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Search dictionary terms for text"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "if ($name==\"iswa-2010\"){", 
                "  echo json_pretty(dictionaryISWA());", 
                "  return;", 
                "}", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check  && !$update){", 
                "  haltNotModified();", 
                "}", 
                "", 
                "$alphabet = str_replace('-dictionary-','-alphabet-',$name);", 
                "$file = 'data/json/' . $alphabet . '.json';", 
                "if (!$update){", 
                "  if (!file_exists($file)) {", 
                "    $update = 1;", 
                "  } else {", 
                "    $check = date (\"Y-m-d\\TH:i:s\", filemtime($file));", 
                "    $check =  new DateTime($check);", 
                "    $check->setTimezone(new DateTimeZone('UTC'));", 
                "    $check = $check->format('Y-m-d\\TH:i:s\\Z');", 
                "    if ($lastModified>$check){", 
                "      $update = 1;", 
                "    }", 
                "  }", 
                "}", 
                "if ($update) {", 
                "  $json = json_pretty(dictionaryAlphabet($name,$lastModified));", 
                "  file_put_contents($file,$json);", 
                "}", 
                "if(file_exists($file)) {", 
                "  header('Last-Modified: ' . $lastModified);", 
                "  $searchTime = searchtime($timein);", 
                "  header(\"Search-Time: \" . $searchTime);", 
                "  getFile($file);", 
                "} else {", 
                "  haltNotFound();", 
                "}"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "dictionary query results"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{\"name\": \"ase-US-alphabet-public\",\"data\": []}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "generate alphabet from dictionary contents"
            }
          ], 
          "route": "/dictionary/{name}/alphabet{?update}", 
          "name": "Dictionary symbol subset", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "1", 
              "type": "optional,number", 
              "description": "Forces a rewrite of the alphabet", 
              "name": "update"
            }
          ], 
          "description": "Create alphabet from dictionary signs"
        }
      ], 
      "group": "dictionary", 
      "html": "<ul>\n<li>Source: <a href=\"../src/dictionary.txt\">ApiTxt format</a> and <a href=\"../src/dictionary.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/dictionary.md\">API Blueprint</a> and <a href=\"../doc/dictionary.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/dictionary.html\">API Dictionary</a> and <a href=\"../api/dictionary.js\">JavaScript</a></li>\n</ul>", 
      "lines": [
        "+ Source: [ApiTxt format](../src/dictionary.txt) and [JSON objects](../src/dictionary.json)", 
        "+ Documents: [API Blueprint](../doc/dictionary.md) and [Stand Alone HTML](../doc/dictionary.htm)", 
        "+ Live Page: [API Dictionary](../api/dictionary.html) and [JavaScript](../api/dictionary.js)"
      ], 
      "description": "Resources related to dictionary collections"
    }
  ], 
  "root": "dictionary"
}
var mclass = {
  "GET": "success",
  "POST": "primary",
  "PUT": "info",
  "DELETE": "danger"
};

var Main = {
  view: function(vnode) {
    return [
      m(Header),
      m(Top),
      data['groups'].map(function(group,iG){
        return m(Group,{"group":group,"iG":iG});
      })
    ];
  }
}
var Header = {
  view: function(vnode) {
    return m("header.main",[
      m("span"),
      m("button", {class: "large brand pseudo"}, [
        m.trust(spLogo),
        m("span","SignPuddle 3")
      ]),
      m("span")
    ])
  }
}
var Top = {
  view: function(vnode) {
    return m("section.boxed",[
      m("h1","SignPuddle 3 Dictionary API"),
      m.trust(data["html"]),
      m("p",[
        m("label.large[for=host]","Server Host"),
        m("input#host.medium[type=text][name=host]",{
          "value":host,
          onchange: function(e){host=e.target.value;}
        })
      ])
      ,m("header.group",[
        m("span]"),
        m("h1","Group " + data["groups"][0]["group"]),
        m("span")
      ]),
      m("p",data["groups"][0]["description"]),
      m.trust(data["groups"][0]["html"])
    ])
  }
}
var Group = {
  view: function(vnode) {
    var iG = vnode.attrs["iG"];
    return [
      vnode.attrs["group"]["routes"].map(function(route,iR){
        return m("section.boxed",[
          m("header.route",[
            m("span]"),
            m("h2", route["name"]),
            m("span")
          ]),
          m.trust(route["html"]),
          route["methods"].map(function (method, iM){
            var id = method["name"].replace(/\s/g, '') + "_";
            var headers = (((method["dialog"] || [])[0] || {})["request"] || {})["headers"] || [];
            return [
              m("form",
                m("fieldset",[
                  m("h3",method["name"]),
                  m.trust(method["html"]),
                  m("input.large." + mclass[method["method"]], {"disabled": true, "value":route["route"]}),
                  Object.keys(headers).map(function(key){
                    if (key == "Location" || key == "Description" || key == "Content-type") return;
                    return m("p",[
                      m("label[for=" + id + key + "]", "HEADER " + key),
                      m("input#" + id + key + "[type=text][name="+ key + "]",{
                        "value":headers[key],
                        onchange: function(e){data["groups"][iG]["routes"][iR]["methods"][iM]["dialog"][0]["request"]["headers"][key]=e.target.value;}
                      })
                    ]);
                  }),
                  (route["parameters"] || []).map(function(param,iP){
                    param["example"] = param["example"].replace(/`/g, "");
                    return m("p",[
                      m("label[for=" + id + param["name"] + "]",param["name"] + ": " + param["description"]+ " (" + param["type"] + ")"),
                      m("input#" + id + param["name"] + "[type=text][name="+ param["name"] + "]",{
                        "value":param["example"],
                        onchange: function(e){data["groups"][iG]["routes"][iR]["parameters"][iP]["example"]=e.target.value;}
                      })
                    ]);
                  }),
                  method["method"][0]=="P"?m("p",[
                    m("label[for=" + id + "body","body: The main contents of the request (string)"),
                    m("textarea#" + id + "body[name=body]",
                      {onchange: function(e){ data["groups"][iG]["routes"][iR]["methods"][iM]["dialog"][0]["request"]["body"] = e.target.value.split("\n");}},
                      (data["groups"][iG]["routes"][iR]["methods"][iM]["dialog"][0]["request"]["body"]||[]).join("\n"))
                  ]):"",
                  m("button." + mclass[method["method"]],{ onclick: function (e){
                    dataRequest(iG,iR,iM);
                    return false;
                  }},method["method"]),
                  m("hr"),
                  (method["dialog"].map(function(exchange){
                    return [
                      exchange["request"]?[
                        m("h4","request " + exchange["request"]["name"]),
                        m("div.indent",m.trust(exchange["request"]["html"])),
                        (exchange["request"]["headers"])?[
                          m("ul.tree",
                            m("li.collapse",{"onclick": function(e){e.target.classList.toggle("collapse");}},"headers",
                              m("ul",{"onclick":function(e){e.stopPropagation();}},Object.keys(exchange["request"]["headers"]).map(function (header){
                                return m("li.request",header + ": " + exchange["request"]["headers"][header]);
                              }))
                            )
                          )
                        ]:"",
                        (exchange["request"]["body"])?
                          m("ul.tree",
                            m("li",{"onclick": function(e){e.target.classList.toggle("collapse");}},
                              "body (" + exchange["request"]["type"] + ")",
                              m("pre",{"onclick":function(e){e.stopPropagation();}},exchange["request"]["body"].join("\n"))
                            )
                          )
                        :""
                      ]:"",
                      exchange["responses"]?exchange["responses"].map(function(response){
                        return [
                          m("h4","response " + response["status"]),
                          m("div.indent",m.trust(response["html"])),
                          m("ul.tree",
                            (response["headers"])?[
                              m("li.collapse",{"onclick": function(e){e.target.classList.toggle("collapse");}},
                                "headers",
                                m("ul",{"onclick":function(e){e.stopPropagation();}},Object.keys(response["headers"]).map(function (header){
                                  return m("li.response",header + ": " + response["headers"][header]);
                                }))
                              )
                            ]:"",
                            (response["body"])?
                              m("li",{"onclick": function(e){e.target.classList.toggle("collapse");}},
                                "body (" + response["type"] + ")",
                                m("pre",{"onclick":function(e){e.stopPropagation();}},response["body"].join("\n"))
                              )
                            :""
                          )
                        ]
                      }):""
                    ];
                  }))
                ])
              )
            ];
          }),
          m("br"),m("br"),
        ])
      })
    ]
  }
}

m.mount(document.body, Main);
