var spVersion = "3";
var host = "";
try {
  host = config['state']['connection']['server'];
} catch (e){
 host = "https://signpuddle.com/server"
}
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "SignPuddle 3 User API", 
  "lines": [
    "> v3.0.0"
  ], 
  "html": "<blockquote>\n<p>v3.0.0</p>\n</blockquote>", 
  "host": "https://signpuddle.com/server", 
  "meta": "Generated from ApiTxt format (output/user.txt) using txt2json.py", 
  "groups": [
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
                      "body": [
                        "BR", 
                        "US"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "method": "GET"
            }
          ], 
          "route": "/user/who", 
          "name": "Who uses SignWriting?", 
          "description": "List of countries with size and activity."
        }, 
        {
          "methods": [
            {
              "code": [
                "  echo json_pretty(userPass());"
              ], 
              "method": "POST", 
              "dialog": [
                {
                  "request": {
                    "name": "user pass"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{\"pass\": \"90c19ce2076db097c75b3406e966a6b6\",\"ip\": \"192.168.254.2\"}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "String for accounting and validation"
            }, 
            {
              "code": [
                "  $data = $app->request->getbody();", 
                "  $data = json_decode($data,true);", 
                "  verifyPass($data['username'],$data['pass']);", 
                "  $app->response->setStatus(204);", 
                "  return;"
              ], 
              "method": "PUT", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{\"username\":\"anonymous\",\"pass\":\"af77...\"}"
                    ], 
                    "html": "<ul>\n<li>Attributes<ul>\n<li>username: anonymous (string) - name of the user</li>\n<li>pass: af77... (string) - pass for session validation</li>\n</ul>\n</li>\n</ul>", 
                    "lines": [
                      "+ Attributes", 
                      "    + username: anonymous (string) - name of the user", 
                      "    + pass: af77... (string) - pass for session validation"
                    ], 
                    "name": "user pass verify"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "Check pass against user"
            }
          ], 
          "route": "/user/pass", 
          "name": "User pass", 
          "description": "A string for accounting and validation"
        }, 
        {
          "methods": [
            {
              "code": [
                "  $data = $app->request->getbody();", 
                "  $data = json_decode($data,true);", 
                "  $results = userVerify($data['username'],$data['pass'],$data['validated']);", 
                "  echo json_pretty($results);"
              ], 
              "method": "PUT", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{\"username\":\"anonymous\",\"pass\":\"af77...\",\"validated\":\"2793f...\"}"
                    ], 
                    "type": "application/json", 
                    "html": "<ul>\n<li>Attributes<ul>\n<li>username: anonymous (string) - name of the user</li>\n<li>pass: af77... (string) - pass for session validation</li>\n<li>validated: 2793f... (string) - validated pass mixed with password</li>\n</ul>\n</li>\n</ul>", 
                    "lines": [
                      "+ Attributes", 
                      "    + username: anonymous (string) - name of the user", 
                      "    + pass: af77... (string) - pass for session validation", 
                      "    + validated: 2793f... (string) - validated pass mixed with password"
                    ], 
                    "name": "verify user"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{\"user-profile\":\"\"}"
                      ], 
                      "html": "<p>response text here</p>", 
                      "lines": [
                        "response text here"
                      ], 
                      "type": "application/json"
                    }
                  ]
                }
              ], 
              "name": "Process log in to server"
            }
          ], 
          "route": "/user/login", 
          "name": "User login", 
          "description": "Validation of user with validated password"
        }, 
        {
          "methods": [
            {
              "name": "Update user profile", 
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "$user = userVerified($pass);", 
                "if ($user!=$name) haltForbidden($user . \" not \" . $name);", 
                "$data = $app->request->getbody();", 
                "$data = json_decode($data,true);", 
                "userProfileUpdate($name,$data);", 
                "$app->response->setStatus(204);", 
                "return;"
              ], 
              "description": "Updates the profile of the user", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "user-update"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "method": "PUT"
            }, 
            {
              "name": "Register new user", 
              "description": "Creates and returns a new user", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "user-add"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "profile created and returned"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "method": "POST"
            }
          ], 
          "route": "/user/{name}", 
          "name": "User profile", 
          "parameters": [
            {
              "example": "slevinski", 
              "type": "string", 
              "description": "The name of a user", 
              "name": "name"
            }
          ], 
          "description": "User details"
        }, 
        {
          "methods": [
            {
              "name": "Update user password", 
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "$user = userVerified($pass,true);", 
                "if (!$user) haltForbidden();", 
                "$data = $app->request->getbody();", 
                "$data = json_decode($data,true);", 
                "$old = isset($data['old'])?$data['old']:'';", 
                "$new = isset($data['new'])?$data['new']:'';", 
                "if ($old && $new){", 
                "  userPasswordUpdate($name,$old,$new);", 
                "  $app->response->setStatus(204);", 
                "  return;", 
                "} else {", 
                "  haltBadRequest();", 
                "}"
              ], 
              "description": "Updates the password of the user", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{\"old\":\"149603e6c03516362a8da23f624db945\",\"new\":\"22af645d1859cb5ca6da0c484f1f37ea\"}"
                    ], 
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "type": "plain/text", 
                    "name": "user-update-password"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "method": "POST"
            }, 
            {
              "name": "Reset user password", 
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "$user = userVerified($pass,true);", 
                "if (!$user) haltForbidden();", 
                "$data = $app->request->getbody();", 
                "$data = json_decode($data,true);", 
                "$user = isset($data['user'])?$data['user']:'';", 
                "if ($user){", 
                "  userPasswordReset($user);", 
                "  $app->response->setStatus(204);", 
                "  return;", 
                "} else {", 
                "  haltBadRequest();", 
                "}"
              ], 
              "description": "Creates a temporary password for the user", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "type": "plain/text", 
                    "name": "user-password-reset"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "method": "PUT"
            }
          ], 
          "route": "/user/{name}/password", 
          "name": "User password", 
          "parameters": [
            {
              "example": "slevinski", 
              "type": "string", 
              "description": "The name of a user", 
              "name": "name"
            }
          ], 
          "description": "User password resource"
        }, 
        {
          "methods": [
            {
              "name": "List of user email requests", 
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightscheck(\"\",$pass,SP_ADMIN);", 
                "$users = userEmailRequests();", 
                "echo json_pretty($users);", 
                "return;"
              ], 
              "description": "User email requests for username or passwords", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "user-email-request"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[{\"name\":\"slevinski\",\"email\":\"slevinski@signwriting.org\",\"temp\":\"username\"}]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "method": "GET"
            }
          ], 
          "route": "/user/email", 
          "name": "User email requests", 
          "description": "Requests for email of username or password reset"
        }, 
        {
          "methods": [
            {
              "name": "Lookup username", 
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "$user = userVerified($pass,true);", 
                "if (!$user) haltForbidden();", 
                "userNameLookup($email);", 
                "$app->response->setStatus(204);", 
                "return;"
              ], 
              "description": "Creates a request for email of username", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "user-name-lookup"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "method": "PUT"
            }
          ], 
          "route": "/user/email/{email}", 
          "name": "Username lookup", 
          "parameters": [
            {
              "example": "slevinski@signwriting.org", 
              "type": "string", 
              "description": "The email for a user", 
              "name": "email"
            }
          ], 
          "description": "Forgot username email lookup"
        }
      ], 
      "group": "user", 
      "html": "<ul>\n<li>Source: <a href=\"../src/user.txt\">ApiTxt format</a> and <a href=\"../src/user.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/user.md\">API Blueprint</a> and <a href=\"../doc/user.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/user.html\">API Interface</a> and <a href=\"../api/user.js\">JavaScript</a></li>\n</ul>", 
      "lines": [
        "+ Source: [ApiTxt format](../src/user.txt) and [JSON objects](../src/user.json)", 
        "+ Documents: [API Blueprint](../doc/user.md) and [Stand Alone HTML](../doc/user.htm)", 
        "+ Live Page: [API Interface](../api/user.html) and [JavaScript](../api/user.js)"
      ], 
      "description": "SignPuddle 3 collections are organized by country and language codes"
    }
  ], 
  "root": "user"
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
      m("h1","SignPuddle 3 User API"),
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
