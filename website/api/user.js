var data = {
  "title": "SignPuddle user API", 
  "lines": [
    "> v3.0.0", 
    "", 
    "+ [txt](user/index.txt) - ApiTxt format", 
    "+ [json](user/index.json) - array of JSON objects", 
    "+ [md](user/index.md) - API Blueprint", 
    "+ [html](user/index.html) - HTML documentation"
  ], 
  "host": "https://signpuddle.net/v3", 
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
  "root": "user"
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
        " SignPuddle user API"
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
