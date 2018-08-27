var data = {
  "title": "SignPuddle Collection API", 
  "lines": [
    "> v3.0.0", 
    "", 
    "+ [txt](../src/collection.txt) - ApiTxt format", 
    "+ [json](../src/collection.json) - array of JSON objects", 
    "+ [html](../api/collection.html) - HTML API Interface", 
    "+ [md](../docs/collection.md) - API Blueprint", 
    "+ [htm](../docs/collection.htm) - Stand Alone HTML"
  ], 
  "host": "https://signpuddle.net/v3", 
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
                      "type": "text/plain", 
                      "lines": [
                        "en", 
                        "ase"
                      ]
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
                      "type": "text/plain", 
                      "lines": [
                        "print.buttons.main\tmessage\tdescription\ticon"
                      ]
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
                      "type": "text/plain", 
                      "lines": [
                        "9785a5c3ffd166bc95e6dd5308894691"
                      ]
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
        " SignPuddle Collection API"
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
