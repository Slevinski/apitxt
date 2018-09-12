var spVersion = "3";
var host = "https://signpuddle.com/back";
host = "http://192.168.254.6:8888";
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "SignPuddle 3 Collection API", 
  "lines": [
    "> v3.0.0", 
    "", 
    "+ [txt](../src/collection.txt) - ApiTxt format", 
    "+ [json](../src/collection.json) - array of JSON objects", 
    "+ [html](../api/collection.html) - HTML API Interface", 
    "+ [md](../doc/collection.md) - API Blueprint", 
    "+ [htm](../doc/collection.htm) - Stand Alone HTML"
  ], 
  "html": "<blockquote>\n<p>v3.0.0</p>\n</blockquote>\n<ul>\n<li><a href=\"../src/collection.txt\">txt</a> - ApiTxt format</li>\n<li><a href=\"../src/collection.json\">json</a> - array of JSON objects</li>\n<li><a href=\"../api/collection.html\">html</a> - HTML API Interface</li>\n<li><a href=\"../doc/collection.md\">md</a> - API Blueprint</li>\n<li><a href=\"../doc/collection.htm\">htm</a> - Stand Alone HTML</li>\n</ul>", 
  "host": "https://signpuddle.com/back", 
  "meta": "Generated from ApiTxt format (output/collection.txt) using txt2json.py", 
  "groups": [
    {
      "routes": [
        {
          "route": "/collection", 
          "name": "Available collections", 
          "methods": [
            {
              "code": [
                "  echo \"en\\nase\";"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "en", 
                        "ase"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get available languages"
            }
          ]
        }, 
        {
          "methods": [
            {
              "code": [
                "$check = $app->request->headers->get('If-None-Match');", 
                "$dir = 'data/txt/';", 
                "$ext = '.txt';", 
                "$file = $dir . $name . $ext;", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "if(file_exists($file)) {", 
                "  $md5 = md5_file($file);", 
                "  $app->response->headers->set('ETag', $md5);", 
                "  if ($md5 == $check){", 
                "    haltNotModified();", 
                "  }", 
                "  getFile($file);", 
                "} else {", 
                "  $out = [];", 
                "  foreach (glob($file) as $filename) {", 
                "    $out[] = str_replace($ext,'',str_replace($dir,'',$filename));", 
                "  }", 
                "  if (count($out)){", 
                "    haltMultipleChoices(implode($out,\"\\n\"));", 
                "  } else {", 
                "    haltNoContent();", 
                "  }", 
                "}"
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
                      "body": [
                        "print.buttons.main\tmessage\tdescription\ticon"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve collection or available collections"
            }
          ], 
          "route": "/collection/{name}", 
          "name": "Collection resource", 
          "parameters": [
            {
              "example": "en-US-interface-sp3", 
              "type": "string", 
              "description": "The name of a collection", 
              "name": "name"
            }
          ], 
          "description": "Access to available collections"
        }, 
        {
          "methods": [
            {
              "code": [
                "$dir = 'data/txt/';", 
                "$ext = '.txt';", 
                "$file = $dir . $name . $ext;", 
                "if (strpos($name,\"*\")!==false) {", 
                "  $err = invalidNameWild($name);", 
                "  if($err){", 
                "    haltBadRequest($err);", 
                "  }", 
                "  $out = [];", 
                "  foreach (glob($file) as $filename) {", 
                "    $out[] = str_replace($ext,'',str_replace($dir,'',$filename));", 
                "  }", 
                "  if (count($out)){", 
                "    if (count($out)==1) {", 
                "      $app->request->headers->set('Location','/location/' . $out[0] . '/md5');", 
                "      haltSeeOther($out[0]);", 
                "    } else {", 
                "      haltMultipleChoices(implode($out,\"\\n\"));", 
                "    }", 
                "  } else {", 
                "    haltBadRequest(\"No choices available\");", 
                "  }", 
                "} else {", 
                "  $err = invalidName($name);", 
                "  if ($err){", 
                "    haltBadRequest($err);", 
                "  }", 
                "  if(file_exists($file)) {", 
                "    $md5 = md5_file($file);", 
                "    echo $md5;", 
                "  } else {", 
                "    halting(202, md5($name));", 
                "  }", 
                "}"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-None-Match": "af779785a5c3ffd166bc95e6dd530889"
                    }, 
                    "name": "the md5 hash of a collection"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "9785a5c3ffd166bc95e6dd5308894691"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve collection md5 hash"
            }, 
            {
              "method": "POST", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-None-Match": "af779785a5c3ffd166bc95e6dd530889"
                    }, 
                    "name": "the md5 hash of a collection"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "9785a5c3ffd166bc95e6dd5308894691"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve collection md5 hash"
            }, 
            {
              "method": "PUT", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-None-Match": "af779785a5c3ffd166bc95e6dd530889"
                    }, 
                    "name": "the md5 hash of a collection"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "9785a5c3ffd166bc95e6dd5308894691"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve collection md5 hash"
            }, 
            {
              "method": "DELETE", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-None-Match": "af779785a5c3ffd166bc95e6dd530889"
                    }, 
                    "name": "the md5 hash of a collection"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "9785a5c3ffd166bc95e6dd5308894691"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve collection md5 hash"
            }
          ], 
          "route": "/collection/{name}/md5", 
          "name": "Collection resource md5 hash", 
          "parameters": [
            {
              "example": "en-US-interface-sp3", 
              "type": "string", 
              "description": "The name of a collection", 
              "name": "name"
            }
          ], 
          "description": "MD5 hash of collection"
        }
      ], 
      "group": "collection", 
      "description": "Resources related to making collections"
    }
  ], 
  "root": "collection"
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
      m("h1","SignPuddle 3 Collection API"),
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
            return [
              m("form",
                m("fieldset",[
                  m("h3",method["name"]),
                  m.trust(method["html"]),
                  m("input.large." + mclass[method["method"]], {"disabled": true, "value":route["route"]}),
                  (route["parameters"] || []).map(function(param,iP){
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
