var data = {
  "title": "SignPuddle Tools API", 
  "lines": [
    "> v3.0.0", 
    "", 
    "+ [txt](../src/tools.txt) - ApiTxt format", 
    "+ [json](../src/tools.json) - array of JSON objects", 
    "+ [html](../api/tools.html) - HTML API Interface", 
    "+ [md](../docs/tools.md) - API Blueprint", 
    "+ [htm](../docs/tools.htm) - Stand Alone HTML"
  ], 
  "host": "https://signpuddle.net/v3", 
  "meta": "Generated from ApiTxt format (output/tools.txt) using txt2json.py", 
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
    }
  ], 
  "root": "tools"
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
        " SignPuddle Tools API"
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
