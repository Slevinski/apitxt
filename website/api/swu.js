var data = {
  "title": "SignPuddle Swu API", 
  "lines": [
    "> v3.0.0", 
    "", 
    "+ [txt](../src/swu.txt) - ApiTxt format", 
    "+ [json](../src/swu.json) - array of JSON objects", 
    "+ [html](../api/swu.html) - HTML API Interface", 
    "+ [md](../docs/swu.md) - API Blueprint", 
    "+ [htm](../docs/swu.htm) - Stand Alone HTML"
  ], 
  "host": "https://signpuddle.net/v3", 
  "meta": "Generated from ApiTxt format (output/swu.txt) using txt2json.py", 
  "groups": [
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
    }
  ], 
  "root": "swu"
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
        " SignPuddle Swu API"
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
