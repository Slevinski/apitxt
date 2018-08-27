var data = {
  "title": "SignPuddle 3", 
  "lines": [
    "> v3.0.0", 
    "", 
    "+ [txt](../src/index.txt) - ApiTxt format", 
    "+ [json](../src/index.json) - array of JSON objects", 
    "+ [html](../api/index.html) - HTML API Interface", 
    "+ [md](../docs/index.md) - API Blueprint", 
    "+ [htm](../docs/index.htm) - Stand Alone HTML"
  ], 
  "host": "https://signpuddle.net/v3", 
  "meta": "Generated from ApiTxt format (output/index.txt) using txt2json.py", 
  "groups": [
    {
      "routes": [
        {
          "route": "/tools/test{?text}", 
          "lines": [
            "A general purpose function for testing"
          ], 
          "name": "Test with input", 
          "parameters": [
            {
              "example": "S10000", 
              "type": "string", 
              "description": "Input for testing", 
              "name": "text"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "$test = SignWriting\\test($text);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $test;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "test output"
                      ]
                    }
                  ]
                }
              ], 
              "name": "Get test results"
            }
          ]
        }, 
        {
          "route": "/tools/define", 
          "lines": [
            "The definition tree for character mapping"
          ], 
          "name": "Character definition tree", 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "$define = SignWriting\\define();", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo json_pretty($define);"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "{", 
                        "  \"utf-8\": {},", 
                        "  \"utf-16\": {},", 
                        "  \"utf-32\": {},", 
                        "  \"fsw\": {},", 
                        "  \"swu\": {},", 
                        "  \"style\": {}", 
                        "}"
                      ]
                    }
                  ]
                }
              ], 
              "name": "Get main define"
            }
          ]
        }, 
        {
          "route": "/tools/define/{section}", 
          "lines": [
            "A section of the definition tree"
          ], 
          "name": "Section definition", 
          "parameters": [
            {
              "example": "fsw", 
              "type": "string", 
              "description": "The name of section", 
              "name": "section"
            }
          ], 
          "methods": [
            {
              "code": [
                "global $regex_define;", 
                "if ($section == \"regex\"){", 
                "  return $regex_define();", 
                "}", 
                "global $sample_define;", 
                "if ($section == \"sample\"){", 
                "  return $sample_define();", 
                "}", 
                "$timein = microtime(true);", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "$define = SignWriting\\define($section);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo json_pretty($define);"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "{", 
                        "  \"sign\": [],", 
                        "  \"spatial\": [],", 
                        "  \"symbol\": [],", 
                        "  \"coord\": [],", 
                        "  \"prefix\": [],", 
                        "  \"box\": [],", 
                        "  \"query\": []", 
                        "}"
                      ]
                    }
                  ]
                }
              ], 
              "name": "Get section define"
            }
          ]
        }, 
        {
          "route": "/tools/define/{section}/{part}", 
          "lines": [
            "A part of the section definition"
          ], 
          "name": "Part definition", 
          "parameters": [
            {
              "example": "swu", 
              "type": "string", 
              "description": "The name of section", 
              "name": "section"
            }, 
            {
              "example": "symbol", 
              "type": "string", 
              "description": "The part of the definition", 
              "name": "part"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "$define = SignWriting\\define($section,$part);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo json_pretty($define);"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "[", 
                        "  \"individual symbol\",", 
                        "  \"S10000\",", 
                        "  \"[\\\\x{40000}-\\\\x{4F428}]\"", 
                        "]"
                      ]
                    }
                  ]
                }
              ], 
              "name": "Get part define"
            }
          ]
        }, 
        {
          "route": "/tools/parse{?text,utf}", 
          "lines": [
            "A function to analyze text and parse it into individual components"
          ], 
          "name": "Parse text", 
          "parameters": [
            {
              "example": "S10000", 
              "type": "string", 
              "description": "The text to parse", 
              "name": "text"
            }, 
            {
              "example": "32", 
              "type": "string", 
              "description": "The UTF number of 8, 16, 32 or 'x'", 
              "name": "utf"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "if (!in_array($utf,[8,16,32,'x'])){", 
                "  $utf = 16;", 
                "}", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "$parse = SignWriting\\parse($text);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "$json = json_pretty($parse);", 
                "echo SignWriting\\cast($json,$utf);"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "parse results of text"
                      ]
                    }
                  ]
                }
              ], 
              "name": "Get parse results"
            }
          ]
        }, 
        {
          "route": "/tools/encode{?text,slash}", 
          "lines": [
            "A function to encode SignWriting in Unicode (SWU) as UTF-16"
          ], 
          "name": "Encode text", 
          "parameters": [
            {
              "example": "\\x{1D800}", 
              "type": "string", 
              "description": "The text to encode", 
              "name": "text"
            }, 
            {
              "example": "1", 
              "type": "number", 
              "description": "The number of slashes for escaping", 
              "name": "slash"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "$encode = SignWriting\\encode($text,$slash);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $encode;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "\\uD836\\uDC00"
                      ]
                    }
                  ]
                }
              ], 
              "name": "Get encoded query string"
            }
          ]
        }, 
        {
          "route": "/tools/decode{?text}", 
          "lines": [
            "A function to decode SignWriting in Unicode (SWU) from UTF-16"
          ], 
          "name": "Decode text", 
          "parameters": [
            {
              "example": "\\\\uD836\\\\uDC00", 
              "type": "string", 
              "description": "The text to decode", 
              "name": "text"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "$decode = SignWriting\\decode($text);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $decode;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "\\x{1D800}"
                      ]
                    }
                  ]
                }
              ], 
              "name": "Get decoded query string"
            }
          ]
        }, 
        {
          "route": "/tools/utf8{?text}", 
          "name": "UTF-8 encode text", 
          "parameters": [
            {
              "example": "\\x{1D800}", 
              "type": "string", 
              "description": "The text to encode", 
              "name": "text"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "", 
                "$encode = SignWriting\\utf8($text);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $encode;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "%F0%9D%A0%80"
                      ]
                    }
                  ]
                }
              ], 
              "name": "Get utf-8 encoded query string"
            }
          ]
        }
      ], 
      "group": "tools", 
      "description": "Resources related to tools"
    }, 
    {
      "routes": [
        {
          "route": "/fsw{?text,style}", 
          "name": "FSW Word", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }, 
            {
              "example": "true", 
              "type": "boolean,optional", 
              "description": "Flag to include styling string", 
              "name": "style"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$fsw = SignWriting\\fsw($text,$style);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $fsw;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "one Formal SignWriting in ASCII string"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain;charset=utf-8", 
                      "lines": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ]
                    }
                  ]
                }
              ], 
              "name": "first FSW string"
            }
          ]
        }, 
        {
          "route": "/fsw/all{?text,style}", 
          "name": "FSW Text", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }, 
            {
              "example": "1", 
              "type": "number", 
              "description": "Flag to include styling string", 
              "name": "style"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$fsw = SignWriting\\fswAll($text,$style);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $fsw;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "many Formal SignWriting in ASCII string"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain;charset=utf-8", 
                      "lines": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ]
                    }
                  ]
                }
              ], 
              "name": "all FSW strings"
            }
          ]
        }, 
        {
          "route": "/fsw/swu{?text}", 
          "name": "FSW to SWU", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$swu = SignWriting\\fsw2swu($text);", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $swu;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "original text with Formal SignWriting in ASCII inside"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain;charset=utf-8", 
                      "lines": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ]
                    }
                  ]
                }
              ], 
              "name": "text with FSW strings"
            }
          ]
        }, 
        {
          "route": "/fsw/svg/{text}", 
          "lines": [
            "Create a stand-alone SVG image using Formal SignWriting in ASCII (FSW)"
          ], 
          "name": "SVG image", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$req = $app->request();", 
                "if ($req->get('throwStatus')=='500') {haltNoDatabase();}", 
                "$app->contentType('image/svg+xml;charset=utf-8');", 
                "$svg = SignWriting\\svg($text);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $svg;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "collection text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "image/svg+xml;charset=utf-8", 
                      "lines": [
                        "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"39\" height=\"64\" viewBox=\"482 483 39 64\">", 
                        "  <text style=\"font-size:0%;\">AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520</text>", 
                        "  <svg x='482' y='483'><g transform=\"translate(0.149874875465,34.7500790925) scale(0.00988906872676,-0.00988956850125)\"><path class=\"sym-line\" fill=\"black\" d=\"M1528 3484 c-592 -92 -1088 -447 -1348 -963 -125 -249 -180 -485 -180 -771 0 -480 183 -911 529 -1242 350 -336 780 -508 1271 -508 451 0 864 150 1193 434 326 281 517 620 591 1051 21 121 21 409 0 530 -43 252 -114 444 -237 639 -282 453 -741 750 -1284 831 -127 19 -413 18 -535 -1z m607 -173 c583 -126 1038 -523 1224 -1069 59 -173 75 -277 75 -492 0 -165 -3 -211 -22 -300 -71 -327 -228 -611 -458 -829 -186 -177 -381 -295 -614 -374 -176 -60 -282 -78 -490 -84 -247 -7 -416 19 -628 97 -549 201 -944 674 -1043 1250 -17 97 -17 383 0 480 99 576 495 1050 1043 1250 105 38 177 58 303 81 143 26 467 21 610 -10z M1720 1800 l0 -600 80 0 80 0 0 600 0 600 -80 0 -80 0 0 -600z\"/></g></svg>", 
                        "  <svg x='506' y='500'><g transform=\"translate(0.0,15.0) scale(0.01,-0.01)\"><path class=\"sym-fill\" fill=\"white\" d=\"M200 750 l0 -550 300 0 300 0 0 550 0 550 -300 0 -300 0 0 -550z\"/><path class=\"sym-line\" fill=\"black\" d=\"M0 750 l0 -750 750 0 750 0 0 750 0 750 -750 0 -750 0 0 -750z m800 0 l0 -550 -300 0 -300 0 0 550 0 550 300 0 300 0 0 -550z\"/></g></svg>", 
                        "  <svg x='503' y='520'><g transform=\"translate(0.196840829729,26.6999810561) scale(0.00975214136907,-0.00983390502079)\"><path class=\"sym-line\" fill=\"black\" d=\"M345 2350 l-350 -350 325 -325 325 -325 -325 -325 -325 -325 353 -353 352 -352 0 303 0 302 350 0 350 0 0 100 0 100 -350 0 -350 0 0 550 0 550 350 0 350 0 0 100 0 100 -350 0 -350 0 -2 300 -3 300 -350 -350z M1600 1350 l0 -1350 100 0 100 0 0 1350 0 1350 -100 0 -100 0 0 -1350z\"/></g></svg>", 
                        "</svg>"
                      ]
                    }
                  ]
                }
              ], 
              "name": "retrieve stand-alone SVG image"
            }
          ]
        }, 
        {
          "route": "/fsw/svg/font/{text}", 
          "lines": [
            "Create an SVG with font using Formal SignWriting in ASCII (FSW)"
          ], 
          "name": "SVG with font", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$req = $app->request();", 
                "if ($req->get('throwStatus')=='500') {haltNoDatabase();}", 
                "$app->contentType('image/svg+xml;charset=utf-8');", 
                "$svg = SignWriting\\svg($text,true);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $svg;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "collection text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "image/svg+xml;charset=utf-8", 
                      "lines": [
                        "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"49\" height=\"69\" viewBox=\"476 466 49 69\">", 
                        "  <text font-size=\"0\">AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475</text>", 
                        "  <g transform=\"translate(483,510)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbed\udee9</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udbad\udee9</text></g>", 
                        "  <g transform=\"translate(501,466)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbc0\udc12</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udb80\udc12</text></g>", 
                        "  <g transform=\"translate(510,500)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbed\udea5</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udbad\udea5</text></g>", 
                        "  <g transform=\"translate(476,475)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbc0\udc1a</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udb80\udc1a</text></g>", 
                        "</svg>"
                      ]
                    }
                  ]
                }
              ], 
              "name": "retrieve SVG with font"
            }
          ]
        }
      ], 
      "group": "fsw", 
      "description": "Resources related to Formal SignWriting in ASCII (FSW)"
    }, 
    {
      "routes": [
        {
          "route": "/swu{?text,style}", 
          "name": "SWU Word", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }, 
            {
              "example": "1", 
              "type": "number", 
              "description": "Flag to include styling string", 
              "name": "style"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$swu = SignWriting\\swu($text,$style);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $swu;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "one Formal SignWriting in ASCII string"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain;charset=utf-8", 
                      "lines": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ]
                    }
                  ]
                }
              ], 
              "name": "first SWU string"
            }
          ]
        }, 
        {
          "route": "/swu/all{?text,style}", 
          "name": "SWU Text", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }, 
            {
              "example": "1", 
              "type": "number", 
              "description": "Flag to include styling string", 
              "name": "style"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$swu = SignWriting\\swuAll($text,$style);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $swu;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "many Formal SignWriting in ASCII string"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain;charset=utf-8", 
                      "lines": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ]
                    }
                  ]
                }
              ], 
              "name": "all SWU strings"
            }
          ]
        }, 
        {
          "route": "/swu/fsw{?text}", 
          "name": "SWU to FSW", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$fsw = SignWriting\\swu2fsw($text);", 
                "$app->contentType('text/plain;charset=utf-8');", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $fsw;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "original text with Formal SignWriting in ASCII inside"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain;charset=utf-8", 
                      "lines": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ]
                    }
                  ]
                }
              ], 
              "name": "text with SWU strings"
            }
          ]
        }, 
        {
          "route": "/swu/svg/{text}", 
          "lines": [
            "Create a stand-alone SVG image using Formal SignWriting in ASCII (SWU)"
          ], 
          "name": "SVG image", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$req = $app->request();", 
                "if ($req->get('throwStatus')=='500') {haltNoDatabase();}", 
                "$app->contentType('image/svg+xml;charset=utf-8');", 
                "$svg = SignWriting\\svg($text);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $svg;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "collection text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "image/svg+xml;charset=utf-8", 
                      "lines": [
                        "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"39\" height=\"64\" viewBox=\"482 483 39 64\">", 
                        "  <text style=\"font-size:0%;\">AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520</text>", 
                        "  <svg x='482' y='483'><g transform=\"translate(0.149874875465,34.7500790925) scale(0.00988906872676,-0.00988956850125)\"><path class=\"sym-line\" fill=\"black\" d=\"M1528 3484 c-592 -92 -1088 -447 -1348 -963 -125 -249 -180 -485 -180 -771 0 -480 183 -911 529 -1242 350 -336 780 -508 1271 -508 451 0 864 150 1193 434 326 281 517 620 591 1051 21 121 21 409 0 530 -43 252 -114 444 -237 639 -282 453 -741 750 -1284 831 -127 19 -413 18 -535 -1z m607 -173 c583 -126 1038 -523 1224 -1069 59 -173 75 -277 75 -492 0 -165 -3 -211 -22 -300 -71 -327 -228 -611 -458 -829 -186 -177 -381 -295 -614 -374 -176 -60 -282 -78 -490 -84 -247 -7 -416 19 -628 97 -549 201 -944 674 -1043 1250 -17 97 -17 383 0 480 99 576 495 1050 1043 1250 105 38 177 58 303 81 143 26 467 21 610 -10z M1720 1800 l0 -600 80 0 80 0 0 600 0 600 -80 0 -80 0 0 -600z\"/></g></svg>", 
                        "  <svg x='506' y='500'><g transform=\"translate(0.0,15.0) scale(0.01,-0.01)\"><path class=\"sym-fill\" fill=\"white\" d=\"M200 750 l0 -550 300 0 300 0 0 550 0 550 -300 0 -300 0 0 -550z\"/><path class=\"sym-line\" fill=\"black\" d=\"M0 750 l0 -750 750 0 750 0 0 750 0 750 -750 0 -750 0 0 -750z m800 0 l0 -550 -300 0 -300 0 0 550 0 550 300 0 300 0 0 -550z\"/></g></svg>", 
                        "  <svg x='503' y='520'><g transform=\"translate(0.196840829729,26.6999810561) scale(0.00975214136907,-0.00983390502079)\"><path class=\"sym-line\" fill=\"black\" d=\"M345 2350 l-350 -350 325 -325 325 -325 -325 -325 -325 -325 353 -353 352 -352 0 303 0 302 350 0 350 0 0 100 0 100 -350 0 -350 0 0 550 0 550 350 0 350 0 0 100 0 100 -350 0 -350 0 -2 300 -3 300 -350 -350z M1600 1350 l0 -1350 100 0 100 0 0 1350 0 1350 -100 0 -100 0 0 -1350z\"/></g></svg>", 
                        "</svg>"
                      ]
                    }
                  ]
                }
              ], 
              "name": "retrieve stand-alone SVG image"
            }
          ]
        }, 
        {
          "route": "/swu/svg/font/{text}", 
          "lines": [
            "Create an SVG with font using Formal SignWriting in ASCII (SWU)"
          ], 
          "name": "SVG with font", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }
          ], 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$req = $app->request();", 
                "if ($req->get('throwStatus')=='500') {haltNoDatabase();}", 
                "$app->contentType('image/svg+xml;charset=utf-8');", 
                "$svg = SignWriting\\svg($text,true);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $svg;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "collection text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "image/svg+xml;charset=utf-8", 
                      "lines": [
                        "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"49\" height=\"69\" viewBox=\"476 466 49 69\">", 
                        "  <text font-size=\"0\">AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475</text>", 
                        "  <g transform=\"translate(483,510)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbed\udee9</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udbad\udee9</text></g>", 
                        "  <g transform=\"translate(501,466)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbc0\udc12</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udb80\udc12</text></g>", 
                        "  <g transform=\"translate(510,500)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbed\udea5</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udbad\udea5</text></g>", 
                        "  <g transform=\"translate(476,475)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbc0\udc1a</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udb80\udc1a</text></g>", 
                        "</svg>"
                      ]
                    }
                  ]
                }
              ], 
              "name": "retrieve SVG with font"
            }
          ]
        }
      ], 
      "group": "swu", 
      "description": "Resources related to Formal SignWriting in ASCII (SWU)"
    }, 
    {
      "routes": [
        {
          "methods": [
            {
              "name": "Retrieve country list", 
              "description": "The available countries where signs are available.", 
              "dialog": [
                {
                  "request": {
                    "name": "user-who"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "BR", 
                        "US"
                      ]
                    }
                  ]
                }
              ], 
              "method": "GET"
            }
          ], 
          "route": "/user/who/", 
          "name": "Who uses SignWriting?", 
          "description": "List of countries with size and activity."
        }, 
        {
          "methods": [
            {
              "code": [
                "  echo userSalt();"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "user salt"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "e3bedc9e9f83cb9dd7ae61250b9e6921"
                      ]
                    }
                  ]
                }
              ], 
              "name": "String for accounting and validation"
            }
          ], 
          "route": "/user/salt", 
          "name": "Salt is used for request validations", 
          "description": "A string for accounting and validation"
        }, 
        {
          "methods": [
            {
              "code": [
                "  $data = $app->request->getbody();", 
                "  $data = json_decode($data,true);", 
                "  $results = userVerify($data['username'],$data['salt'],$data['salted']);", 
                "  $return = array();", 
                "  $return['meta']=array();", 
                "  $return['results']=$results;", 
                "  $return['meta']['method']='POST';", 
                "  $return['meta']['location']='/user/login';", 
                "  $return['meta']['searchTime'] = searchtime($timein);", 
                "  echo json_pretty($return);"
              ], 
              "method": "POST", 
              "dialog": [
                {
                  "request": {
                    "lines": [
                      "{\"user\":\"anonymous\",\"salt\":\"af77...\",\"salted\":\"2793f...\"}"
                    ], 
                    "name": "verify user"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "type": "text/plain", 
                      "lines": [
                        "{\"user-profile\":\"\"}"
                      ]
                    }
                  ]
                }
              ], 
              "name": "Process log in to server"
            }
          ], 
          "route": "/user/login", 
          "name": "User login", 
          "description": "Validation of user with salted password"
        }
      ], 
      "group": "user", 
      "lines": [
        "", 
        "### Country code", 
        "The country codes are from ISO-3166.", 
        "Each country is coded with two uppercase letters.", 
        "", 
        "### Language code", 
        "The language codes are from ISO-639-1 for spoken languages and ISO-639-3 for sign languages.", 
        "Each spoken language is coded with two lowercase letters.", 
        "Each sign language is coded with three lowercase letters."
      ], 
      "description": "SignPuddle 3 collections are organized by country and language codes"
    }
  ], 
  "root": "index"
}
var Main = {
  view: function(vnode) {
    return [
      m(Header),
      data['groups'].map(function(group){
        return m(Group,{"group":group});
      })
    ];
  }
}
var Header = {
  view: function(vnode) {
    return m("header.three",[
      m("div"),
      m("h1.brand",[
        m("i.icon",m.trust('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)"><path fill="#000" d="M348.22 266.68v259.504h-7V266.68"></path></g><g transform="translate(-153.728 -166.677)"><path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"></path></g><g transform="translate(-153.728 -166.677)"><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746"><stop offset="0" stop-color="#ff0700"></stop><stop offset="1" stop-color="#b40000"></stop></linearGradient><path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"></path></g></svg>')),
        " SignPuddle 3"
      ]),
      m("div")
    ])
  }
}
var Group = {
  view: function(vnode) {
    return m("section.boxed",[
      m("h1",vnode.attrs["group"]["group"]),
      m("p",vnode.attrs["group"]["description"]),
      m("hr"),
      vnode.attrs["group"]["routes"].map(function(route){
        return [
          m("h2", route['name'])
        ]
      })
    ])
  }
}

m.mount(document.body, Main);
