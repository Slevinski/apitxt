var spVersion = "3";
var host = "";
try {
  host = config['state']['connection']['server'];
} catch (e){
 host = "https://signpuddle.com/server"
}
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "Formal SignWriting in ASCII (FSW)", 
  "lines": [
    "> v3.0.0"
  ], 
  "html": "<blockquote>\n<p>v3.0.0</p>\n</blockquote>", 
  "host": "https://signpuddle.com/server", 
  "meta": "Generated from ApiTxt format (output/fsw.txt) using txt2json.py", 
  "groups": [
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
                      "body": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "First FSW string"
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
                      "body": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "All FSW strings"
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
                    "html": "<p>transformation from ASCII to Unicode characters.</p>", 
                    "lines": [
                      "transformation from ASCII to Unicode characters."
                    ], 
                    "name": "SWU conversion of FSW string"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "\ud836\udc00\ud8d8\udd31\ud8e2\udc23\ud8f4\ude61\ud836\udc03\ud836\udd1b\ud836\udd35\ud8f4\ude61\ud836\udcf4\ud836\udcf5\ud8d8\udd31\ud836\udd0c\ud836\udd06\ud8e2\udc23\ud836\udd09\ud836\udd1a"
                      ], 
                      "html": "<p>requires font SuttonSignWritingOneD</p>", 
                      "lines": [
                        "requires font SuttonSignWritingOneD"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Text with FSW strings"
            }
          ]
        }, 
        {
          "name": "SVG image", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }
          ], 
          "route": "/fsw/svg/{text}", 
          "lines": [
            "Create a stand-alone SVG image using Formal SignWriting in ASCII (FSW)"
          ], 
          "html": "<p>Create a stand-alone SVG image using Formal SignWriting in ASCII (FSW)</p>", 
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
                      "body": [
                        "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"39\" height=\"64\" viewBox=\"482 483 39 64\">", 
                        "  <text style=\"font-size:0%;\">AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520</text>", 
                        "  <svg x='482' y='483'><g transform=\"translate(0.149874875465,34.7500790925) scale(0.00988906872676,-0.00988956850125)\"><path class=\"sym-line\" fill=\"black\" d=\"M1528 3484 c-592 -92 -1088 -447 -1348 -963 -125 -249 -180 -485 -180 -771 0 -480 183 -911 529 -1242 350 -336 780 -508 1271 -508 451 0 864 150 1193 434 326 281 517 620 591 1051 21 121 21 409 0 530 -43 252 -114 444 -237 639 -282 453 -741 750 -1284 831 -127 19 -413 18 -535 -1z m607 -173 c583 -126 1038 -523 1224 -1069 59 -173 75 -277 75 -492 0 -165 -3 -211 -22 -300 -71 -327 -228 -611 -458 -829 -186 -177 -381 -295 -614 -374 -176 -60 -282 -78 -490 -84 -247 -7 -416 19 -628 97 -549 201 -944 674 -1043 1250 -17 97 -17 383 0 480 99 576 495 1050 1043 1250 105 38 177 58 303 81 143 26 467 21 610 -10z M1720 1800 l0 -600 80 0 80 0 0 600 0 600 -80 0 -80 0 0 -600z\"/></g></svg>", 
                        "  <svg x='506' y='500'><g transform=\"translate(0.0,15.0) scale(0.01,-0.01)\"><path class=\"sym-fill\" fill=\"white\" d=\"M200 750 l0 -550 300 0 300 0 0 550 0 550 -300 0 -300 0 0 -550z\"/><path class=\"sym-line\" fill=\"black\" d=\"M0 750 l0 -750 750 0 750 0 0 750 0 750 -750 0 -750 0 0 -750z m800 0 l0 -550 -300 0 -300 0 0 550 0 550 300 0 300 0 0 -550z\"/></g></svg>", 
                        "  <svg x='503' y='520'><g transform=\"translate(0.196840829729,26.6999810561) scale(0.00975214136907,-0.00983390502079)\"><path class=\"sym-line\" fill=\"black\" d=\"M345 2350 l-350 -350 325 -325 325 -325 -325 -325 -325 -325 353 -353 352 -352 0 303 0 302 350 0 350 0 0 100 0 100 -350 0 -350 0 0 550 0 550 350 0 350 0 0 100 0 100 -350 0 -350 0 -2 300 -3 300 -350 -350z M1600 1350 l0 -1350 100 0 100 0 0 1350 0 1350 -100 0 -100 0 0 -1350z\"/></g></svg>", 
                        "</svg>"
                      ], 
                      "type": "image/svg+xml;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Retrieve stand alone SVG image"
            }
          ]
        }, 
        {
          "name": "SVG with font", 
          "parameters": [
            {
              "example": "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520", 
              "type": "string", 
              "description": "The name of sign", 
              "name": "text"
            }
          ], 
          "route": "/fsw/svg/font/{text}", 
          "lines": [
            "Create an SVG with font using Formal SignWriting in ASCII (FSW)"
          ], 
          "html": "<p>Create an SVG with font using Formal SignWriting in ASCII (FSW)</p>", 
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
                      "body": [
                        "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"49\" height=\"69\" viewBox=\"476 466 49 69\">", 
                        "  <text font-size=\"0\">AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475</text>", 
                        "  <g transform=\"translate(483,510)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbed\udee9</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udbad\udee9</text></g>", 
                        "  <g transform=\"translate(501,466)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbc0\udc12</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udb80\udc12</text></g>", 
                        "  <g transform=\"translate(510,500)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbed\udea5</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udbad\udea5</text></g>", 
                        "  <g transform=\"translate(476,475)\"><text class=\"sym-fill\" style=\"pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;\">\udbc0\udc1a</text><text class=\"sym-line\" style=\"pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;\">\udb80\udc1a</text></g>", 
                        "</svg>"
                      ], 
                      "type": "image/svg+xml;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "Retrieve SVG with font"
            }
          ]
        }
      ], 
      "group": "FSW", 
      "html": "<ul>\n<li>Source: <a href=\"../src/fsw.txt\">ApiTxt format</a> and <a href=\"../src/fsw.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/fsw.md\">API Blueprint</a> and <a href=\"../doc/fsw.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/fsw.html\">API Interface</a> and <a href=\"../api/fsw.js\">JavaScript</a></li>\n</ul>", 
      "lines": [
        "+ Source: [ApiTxt format](../src/fsw.txt) and [JSON objects](../src/fsw.json)", 
        "+ Documents: [API Blueprint](../doc/fsw.md) and [Stand Alone HTML](../doc/fsw.htm)", 
        "+ Live Page: [API Interface](../api/fsw.html) and [JavaScript](../api/fsw.js)"
      ], 
      "description": "Resources related to Formal SignWriting in ASCII (FSW)"
    }
  ], 
  "root": "fsw"
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
      m("h1","Formal SignWriting in ASCII (FSW)"),
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
