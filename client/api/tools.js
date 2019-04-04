var spVersion = "3";
var host = "";
try {
  host = config['state']['connection']['server'];
} catch (e){
 host = "https://signpuddle.com/server"
}
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "SignPuddle 3 Tools API", 
  "lines": [
    "> v3.0.0"
  ], 
  "html": "<blockquote>\n<p>v3.0.0</p>\n</blockquote>", 
  "host": "https://signpuddle.com/server", 
  "meta": "Generated from ApiTxt format (output/tools.txt) using txt2json.py", 
  "groups": [
    {
      "routes": [
        {
          "route": "/tools/", 
          "name": "tools index", 
          "methods": [
            {
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "Available routes:", 
                        "", 
                        "/tools/", 
                        "/tools/test{?text}", 
                        "/tools/define", 
                        "/tools/define/{section}", 
                        "/tools/define/{section}/{part}", 
                        "/tools/parse{?text,utf}", 
                        "/tools/encode{?text,slash}", 
                        "/tools/decode{?text}", 
                        "/tools/utf8{?text}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get the tools index"
            }
          ]
        }, 
        {
          "route": "/tools/define", 
          "html": "<p>The definition tree for character mapping</p>", 
          "lines": [
            "The definition tree for character mapping"
          ], 
          "name": "Character definition tree", 
          "methods": [
            {
              "code": [
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
                      "body": [
                        "{", 
                        "  \"utf-8\": {},", 
                        "  \"utf-16\": {},", 
                        "  \"utf-32\": {},", 
                        "  \"fsw\": {},", 
                        "  \"swu\": {},", 
                        "  \"style\": {}", 
                        "}"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Get main define"
            }
          ]
        }, 
        {
          "name": "Section definition", 
          "parameters": [
            {
              "example": "fsw", 
              "type": "string", 
              "description": "The name of section", 
              "name": "section"
            }
          ], 
          "route": "/tools/define/{section}", 
          "lines": [
            "A section of the definition tree"
          ], 
          "html": "<p>A section of the definition tree</p>", 
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
                      "body": [
                        "{", 
                        "  \"sign\": [],", 
                        "  \"spatial\": [],", 
                        "  \"symbol\": [],", 
                        "  \"coord\": [],", 
                        "  \"prefix\": [],", 
                        "  \"box\": [],", 
                        "  \"query\": []", 
                        "}"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Get section define"
            }
          ]
        }, 
        {
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
          "route": "/tools/define/{section}/{part}", 
          "lines": [
            "A part of the section definition"
          ], 
          "html": "<p>A part of the section definition</p>", 
          "methods": [
            {
              "code": [
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
                      "body": [
                        "[", 
                        "  \"individual symbol\",", 
                        "  \"S10000\",", 
                        "  \"[\\\\x{40000}-\\\\x{4F428}]\"", 
                        "]"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Get part define"
            }
          ]
        }, 
        {
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
          "route": "/tools/parse{?text,utf}", 
          "lines": [
            "A function to analyze text and parse it into individual components"
          ], 
          "html": "<p>A function to analyze text and parse it into individual components</p>", 
          "methods": [
            {
              "code": [
                "if (!in_array($utf,[8,16,32,'x'])){", 
                "  $utf = 16;", 
                "}", 
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
                      "body": [
                        "parse results of text"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Get parse results"
            }
          ]
        }, 
        {
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
          "route": "/tools/encode{?text,slash}", 
          "lines": [
            "A function to encode SignWriting in Unicode (SWU) as UTF-16"
          ], 
          "html": "<p>A function to encode SignWriting in Unicode (SWU) as UTF-16</p>", 
          "methods": [
            {
              "code": [
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
                      "body": [
                        "\\uD836\\uDC00"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Get encoded query string"
            }
          ]
        }, 
        {
          "name": "Decode text", 
          "parameters": [
            {
              "example": "\\\\uD836\\\\uDC00", 
              "type": "string", 
              "description": "The text to decode", 
              "name": "text"
            }
          ], 
          "route": "/tools/decode{?text}", 
          "lines": [
            "A function to decode SignWriting in Unicode (SWU) from UTF-16"
          ], 
          "html": "<p>A function to decode SignWriting in Unicode (SWU) from UTF-16</p>", 
          "methods": [
            {
              "code": [
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
                      "body": [
                        "\\x{1D800}"
                      ], 
                      "type": "text/plain;charset=utf-8"
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
                      "body": [
                        "%F0%9D%A0%80"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Get utf-8 encoded query string"
            }
          ]
        }, 
        {
          "name": "Test with input", 
          "parameters": [
            {
              "example": "S10000", 
              "type": "string", 
              "description": "Input for testing", 
              "name": "text"
            }, 
            {
              "example": "AS", 
              "type": "string", 
              "description": "Option one for testing", 
              "name": "opt1"
            }, 
            {
              "example": "AS", 
              "type": "string", 
              "description": "Option two for testing", 
              "name": "opt2"
            }
          ], 
          "route": "/tools/test{?text,opt1,opt2}", 
          "lines": [
            "A general purpose function for testing"
          ], 
          "html": "<p>A general purpose function for testing</p>", 
          "methods": [
            {
              "code": [
                "$test = SignWriting\\test($text,$opt1,$opt2);", 
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
                      "body": [
                        "test output"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Get test results"
            }
          ]
        }
      ], 
      "group": "tools", 
      "html": "<ul>\n<li>Source: <a href=\"../src/tools.txt\">ApiTxt format</a> and <a href=\"../src/tools.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/tools.md\">API Blueprint</a> and <a href=\"../doc/tools.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/tools.html\">API Interface</a> and <a href=\"../api/tools.js\">JavaScript</a></li>\n</ul>", 
      "lines": [
        "+ Source: [ApiTxt format](../src/tools.txt) and [JSON objects](../src/tools.json)", 
        "+ Documents: [API Blueprint](../doc/tools.md) and [Stand Alone HTML](../doc/tools.htm)", 
        "+ Live Page: [API Interface](../api/tools.html) and [JavaScript](../api/tools.js)"
      ], 
      "description": "Resources related to tools"
    }
  ], 
  "root": "tools"
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
      m("h1","SignPuddle 3 Tools API"),
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
