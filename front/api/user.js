var spVersion = "3";
var host = "https://signpuddle.com/back";
host = "http://signpuddle.com/back";
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "SignPuddle 3 User API", 
  "lines": [
    "> v3.0.0"
  ], 
  "html": "<blockquote>\n<p>v3.0.0</p>\n</blockquote>", 
  "host": "https://signpuddle.com/back", 
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
                      "body": [
                        "e3bedc9e9f83cb9dd7ae61250b9e6921"
                      ], 
                      "type": "text/plain"
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
                    "body": [
                      "{\"username\":\"anonymous\",\"salt\":\"af77...\",\"salted\":\"2793f...\"}"
                    ], 
                    "type": "application/json", 
                    "html": "<ul>\n<li>Even a list</li>\n<li>name <pre><code>Name</code></pre> of the metaproperty, should be alphanumeric only. Uneditable.</li>\n</ul>", 
                    "lines": [
                      "+ Even a list", 
                      "+ name `Name` of the metaproperty, should be alphanumeric only. Uneditable."
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
          "description": "Validation of user with salted password"
        }
      ], 
      "group": "user", 
      "html": "<ul>\n<li>Source: <a href=\"../src/user.txt\">ApiTxt format</a> and <a href=\"../src/user.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/user.md\">API Blueprint</a> and <a href=\"../doc/user.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/user.html\">API Interface</a> and <a href=\"../api/user.js\">JavaScript</a></li>\n</ul>\n<h3>Country code</h3>\n<p>The country codes are from ISO-3166.\nEach country is coded with two uppercase letters.</p>\n<h3>Language code</h3>\n<p>The language codes are from ISO-639-1 for spoken languages and ISO-639-3 for sign languages.\nEach spoken language is coded with two lowercase letters.\nEach sign language is coded with three lowercase letters.</p>", 
      "lines": [
        "+ Source: [ApiTxt format](../src/user.txt) and [JSON objects](../src/user.json)", 
        "+ Documents: [API Blueprint](../doc/user.md) and [Stand Alone HTML](../doc/user.htm)", 
        "+ Live Page: [API Interface](../api/user.html) and [JavaScript](../api/user.js)", 
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
