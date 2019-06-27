var spVersion = "3";
var host = "";
try {
  host = config['state']['connection']['server'];
} catch (e){
 host = "https://signpuddle.com/server"
}
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "SignPuddle 3 Interface API", 
  "lines": [
    "## Interface", 
    "", 
    "SignPuddle 3 organizes user interface elements into interface collections.", 
    "Interface collections are available in three different forms: database, plain text files, and JSON objects", 
    "", 
    "### Databases", 
    "", 
    "Each collection is available as an SQLite database.", 
    "These databases are the primary source and all edits are directly applied to the database.", 
    "", 
    "table entry", 
    "+ key", 
    "+ message", 
    "+ description", 
    "+ icon", 
    "+ user", 
    "+ created_at", 
    "+ updated_at", 
    "", 
    "### Plain Text Files", 
    "", 
    "Each collection is available as a plain text field where each entry occupies its own line.", 
    "Each entry contains multiple fields that are divided by tab characters.", 
    "The plain text files are designed for easy import and export from the databases.", 
    "", 
    "key /t message /t description /t icon /t user /t created_at /t updated_at", 
    "", 
    "### JSON Data files", 
    "", 
    "The interface JSON data file is an object.", 
    "Each key contains an object with three properties: message, description, icon, and updated_at.", 
    "", 
    "{", 
    "  \"name\": \"en-US-interface-sp3\",", 
    "  \"data\": {", 
    "    \"key.example.one\": {", 
    "      \"message\": \"example message\",", 
    "      \"description\": \"example description\",", 
    "      \"icon\": \"example\",", 
    "      \"updated_at\": \"date-time\"", 
    "    }", 
    "  }", 
    "}", 
    ""
  ], 
  "html": "<h2>Interface</h2>\n<p>SignPuddle 3 organizes user interface elements into interface collections.\nInterface collections are available in three different forms: database, plain text files, and JSON objects</p>\n<h3>Databases</h3>\n<p>Each collection is available as an SQLite database.\nThese databases are the primary source and all edits are directly applied to the database.</p>\n<p>table entry\n+ key\n+ message\n+ description\n+ icon\n+ user\n+ created_at\n+ updated_at</p>\n<h3>Plain Text Files</h3>\n<p>Each collection is available as a plain text field where each entry occupies its own line.\nEach entry contains multiple fields that are divided by tab characters.\nThe plain text files are designed for easy import and export from the databases.</p>\n<p>key /t message /t description /t icon /t user /t created_at /t updated_at</p>\n<h3>JSON Data files</h3>\n<p>The interface JSON data file is an object.\nEach key contains an object with three properties: message, description, icon, and updated_at.</p>\n<p>{\n  \"name\": \"en-US-interface-sp3\",\n  \"data\": {\n    \"key.example.one\": {\n      \"message\": \"example message\",\n      \"description\": \"example description\",\n      \"icon\": \"example\",\n      \"updated_at\": \"date-time\"\n    }\n  }\n}</p>", 
  "host": "https://signpuddle.com/server", 
  "meta": "Generated from ApiTxt format (output/interface.txt) using txt2json.py", 
  "groups": [
    {
      "routes": [
        {
          "route": "/interface{?name}", 
          "name": "Interfaces available", 
          "parameters": [
            {
              "example": "sp3", 
              "type": "string", 
              "description": "partial interface name", 
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
                "  if (strpos($name,\"interface\")!==false){", 
                "    $interfaces = $dir . '*' . $name . '*' . $ext;", 
                "    $files = glob($interfaces);", 
                "  } else {", 
                "    $interfaces = $dir . '*interface*' . $name . '*' . $ext;", 
                "    $files = glob($interfaces);", 
                "    if (count($files)==0) {", 
                "      $interfaces = $dir . '*' . $name . '*interface*' . $ext;", 
                "      $files = glob($interfaces);", 
                "    }", 
                "  }", 
                "} else {", 
                "  $interfaces = $dir . '*interface*' . $ext;", 
                "  $files = glob($interfaces);", 
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
                        "[\"en-US-interface-sp3\"]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get available interfaces"
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
                "  $files = glob('data/db/' . $name . '*interface-sp3.db');", 
                "  if (count($files)==0){", 
                "    haltBadRequest($err);", 
                "  } else {", 
                "\t$name = str_replace(\".db\",'',str_replace('data/db/','',$files[0]));", 
                "  }", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check  && !$update){", 
                "  haltNotModified();", 
                "}", 
                "if ($format=='json' && (!file_exists($file) || $update)) {", 
                "  $json = interface2json($name);", 
                "  file_put_contents($file,$json);", 
                "} else if ($format=='txt' && (!file_exists($file) || $update)) {", 
                "  $txt = interface2txt($name);", 
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
                    "name": "interface text"
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
              "name": "retrieve interface"
            }
          ], 
          "route": "/interface/{name}{?update}", 
          "name": "Interface resource", 
          "parameters": [
            {
              "example": "`en-US-interface-sp3`", 
              "type": "required,string", 
              "description": "The name of an interface", 
              "name": "name"
            }, 
            {
              "example": "1", 
              "type": "optional,number", 
              "description": "Forces a rewrite of the interface for json and txt formats", 
              "name": "update"
            }
          ], 
          "description": "Access to available interfaces"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
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
                "echo json_pretty(interfaceKeys($name,$pass));"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "interface keys"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[\"print.buttons.main\"]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve interface keys"
            }
          ], 
          "route": "/interface/{name}/key", 
          "name": "Interface keys", 
          "parameters": [
            {
              "example": "`en-US-interface-sp3`", 
              "type": "required,string", 
              "description": "The name of an interface", 
              "name": "name"
            }
          ], 
          "description": "Access to interface keys"
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
                "echo json_pretty(interfaceSearch($name,$text,$pass));"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "matching interface entries"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[", 
                        "  {", 
                        "    \"key\": \"print.buttons.main\",", 
                        "    \"message\": \"Print it!\"", 
                        "  }", 
                        "]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve matching entries"
            }
          ], 
          "route": "/interface/{name}/search/{text}", 
          "name": "Interface entries search", 
          "parameters": [
            {
              "example": "`en-US-interface-sp3`", 
              "type": "required,string", 
              "description": "The name of an interface", 
              "name": "name"
            }, 
            {
              "example": "`SignPuddle`", 
              "type": "required,string", 
              "description": "The text for searching", 
              "name": "text"
            }
          ], 
          "description": "Search interface for text"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "if (!$pass){", 
                "  haltForbidden();", 
                "}", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$data = $app->request->getbody();", 
                "$data = json_decode($data,true);", 
                "interfaceEntryNew($name,$data,$pass);", 
                "$app->response->setStatus(201);", 
                "return;"
              ], 
              "method": "POST", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{\"key\":\"new.key.one\", \"message\":\"UI text\",\"description\":\"about the text\",\"icon\":\"search\"}"
                    ], 
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "type": "application/json", 
                    "name": "add new interface entry"
                  }, 
                  "responses": [
                    {
                      "status": 201, 
                      "body": [
                        "..."
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "add interface entry"
            }
          ], 
          "route": "/interface/{name}/entry", 
          "name": "Interface entry resource", 
          "parameters": [
            {
              "example": "`en-US-interface-sp3`", 
              "type": "string", 
              "description": "The name of an interface", 
              "name": "name"
            }
          ], 
          "description": "Entries for interface"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$entries = interfaceKeySearch($name,$key,$pass);", 
                "if (!$entries){", 
                "  haltNoContent();", 
                "}", 
                "$lastModified = max(array_map(function($o) {return $o->updated_at;},$entries));", 
                "if ($lastModified <= $check){", 
                "  haltNotModified();", 
                "}", 
                "header('Last-Modified: ' . $lastModified);", 
                "echo json_pretty($entries);"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "an interface entry"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "..."
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve interface entry"
            }, 
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
                "interfaceEntryUpdate($name,$key,$data,$pass);", 
                "$app->response->setStatus(204);", 
                "return;"
              ], 
              "method": "PUT", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{\"key\":\"new.key.one\", \"message\":\"UI text\",\"description\":\"about the text\",\"icon\":\"search\"}"
                    ], 
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "an update for an existing entry"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "update interface entry"
            }, 
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "interfaceEntryDelete($name,$key,$pass);", 
                "$app->response->setStatus(204);"
              ], 
              "method": "DELETE", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "the removal of an interface entry"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "remove interface entry"
            }
          ], 
          "route": "/interface/{name}/entry/{key}", 
          "name": "Interface entry resource for key", 
          "parameters": [
            {
              "example": "`en-US-interface-sp3`", 
              "type": "string", 
              "description": "The name of an interface", 
              "name": "name"
            }, 
            {
              "example": "system.button.open", 
              "type": "string", 
              "description": "The name of an interface key", 
              "name": "key"
            }
          ], 
          "description": "Specific entries for interface"
        }
      ], 
      "group": "interface", 
      "html": "<ul>\n<li>Source: <a href=\"../src/interface.txt\">ApiTxt format</a> and <a href=\"../src/interface.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/interface.md\">API Blueprint</a> and <a href=\"../doc/interface.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/interface.html\">API Interface</a> and <a href=\"../api/interface.js\">JavaScript</a></li>\n</ul>", 
      "lines": [
        "+ Source: [ApiTxt format](../src/interface.txt) and [JSON objects](../src/interface.json)", 
        "+ Documents: [API Blueprint](../doc/interface.md) and [Stand Alone HTML](../doc/interface.htm)", 
        "+ Live Page: [API Interface](../api/interface.html) and [JavaScript](../api/interface.js)"
      ], 
      "description": "Resources related to interface collections"
    }
  ], 
  "root": "interface"
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
      m("h1","SignPuddle 3 Interface API"),
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
