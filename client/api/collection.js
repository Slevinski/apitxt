var spVersion = "3";
var host = "";
try {
  host = config['state']['connection']['server'];
} catch (e){
 host = "https://signpuddle.com/server"
}
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "SignPuddle 3 Collection API", 
  "lines": [
    "## Collections", 
    "", 
    "SignPuddle 3 organizes related data into collections.", 
    "All collections are available in three different forms: database, plain text files, and JSON objects", 
    "", 
    "### Databases", 
    "", 
    "Each collection is available as an SQLite database.", 
    "These databases are the primary source and all edits are directly applied to the database.", 
    "", 
    "### Plain Text Files", 
    "", 
    "Each collection is available as a plain text field where each entry occupies its own line.", 
    "Each entry contains multiple fields that are divided by tab characters.", 
    "The plain text files are designed for easy import and export from the databases.", 
    "", 
    "### JSON Data files", 
    "", 
    "Each collection is available as a JSON data file.", 
    "These files are useful for the client section for default configuration.", 
    "", 
    "## Collection Types", 
    "", 
    "There are six types of collections: interface, dictionary, literature, alphabet, fingerspell, and keyboard.", 
    "", 
    "### Interface", 
    "", 
    "The interface collection deals with user interface elements.", 
    "", 
    "### Dictionary", 
    "", 
    "The dictionary collection deals with individual sign details.", 
    "", 
    "### Literature", 
    "", 
    "The literature collection deals with segments of sign text.", 
    "", 
    "### Alphabet", 
    "", 
    "The alphabet collection deals with subset of ISWA 2010.", 
    "", 
    "### Fingerspell", 
    "", 
    "The fingerspell collection deals with individual letters for fingerspelling.", 
    "", 
    "### Keyboard", 
    "", 
    "The keyboard collection deals with commands and keys for keyboarding.", 
    ""
  ], 
  "html": "<h2>Collections</h2>\n<p>SignPuddle 3 organizes related data into collections.\nAll collections are available in three different forms: database, plain text files, and JSON objects</p>\n<h3>Databases</h3>\n<p>Each collection is available as an SQLite database.\nThese databases are the primary source and all edits are directly applied to the database.</p>\n<h3>Plain Text Files</h3>\n<p>Each collection is available as a plain text field where each entry occupies its own line.\nEach entry contains multiple fields that are divided by tab characters.\nThe plain text files are designed for easy import and export from the databases.</p>\n<h3>JSON Data files</h3>\n<p>Each collection is available as a JSON data file.\nThese files are useful for the client section for default configuration.</p>\n<h2>Collection Types</h2>\n<p>There are six types of collections: interface, dictionary, literature, alphabet, fingerspell, and keyboard.</p>\n<h3>Interface</h3>\n<p>The interface collection deals with user interface elements.</p>\n<h3>Dictionary</h3>\n<p>The dictionary collection deals with individual sign details.</p>\n<h3>Literature</h3>\n<p>The literature collection deals with segments of sign text.</p>\n<h3>Alphabet</h3>\n<p>The alphabet collection deals with subset of ISWA 2010.</p>\n<h3>Fingerspell</h3>\n<p>The fingerspell collection deals with individual letters for fingerspelling.</p>\n<h3>Keyboard</h3>\n<p>The keyboard collection deals with commands and keys for keyboarding.</p>", 
  "host": "https://signpuddle.com/server", 
  "meta": "Generated from ApiTxt format (output/collection.txt) using txt2json.py", 
  "groups": [
    {
      "routes": [
        {
          "route": "/collection{?name}", 
          "name": "Collections available", 
          "parameters": [
            {
              "example": "sp3", 
              "type": "string", 
              "description": "partial collection name", 
              "name": "name"
            }
          ], 
          "methods": [
            {
              "code": [
                "$collections = collectionListing($name);", 
                "if (count($collections)){", 
                "  echo json_pretty($collections);", 
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
              "name": "Get available collections"
            }
          ]
        }, 
        {
          "methods": [
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "collectionDelete($name,$pass);", 
                "collectionSecurityDelete($name,$pass);", 
                "collectionManageDelete($name,$pass);", 
                "$app->response->setStatus(204);"
              ], 
              "method": "DELETE", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "the removal of a collection"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "delete collection"
            }
          ], 
          "route": "/collection/{name}", 
          "name": "Collection resource", 
          "parameters": [
            {
              "example": "`en-US-interface-sp3`", 
              "type": "string", 
              "description": "The name of a collection", 
              "name": "name"
            }
          ], 
          "description": "Specific collection"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
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
                "$output = json_pretty(collectionStats($name));", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z"
                    }, 
                    "name": "collections statistics"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[{\"name\": \"en-US-interface-sp3\",\"code\": \"ui1\",\"title\": \"English Interface for SignPuddle 3\",\"user\": \"slevinski\",\"created_at\": \"\",\"view_pass\": 0,\"add_pass\": 1,\"edit_pass\": 1,\"register_level\": 0,\"upload_level\": 4}]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get collection statistics"
            }
          ], 
          "route": "/collection/{name}/stats", 
          "name": "Collection statistics", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of a dictionary", 
              "name": "name"
            }
          ], 
          "description": "Statistics about the collection"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "$lastModified = lastModifiedCollection();", 
                "if ($lastModified <= $check){", 
                "  haltNotModified();", 
                "}", 
                "header('Last-Modified: ' . $lastModified);", 
                "echo json_pretty(collectionsSecurity());"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z"
                    }, 
                    "name": "collections security"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[{\"name\": \"en-US-interface-sp3\",\"code\": \"ui1\",\"title\": \"English Interface for SignPuddle 3\",\"user\": \"slevinski\",\"created_at\": \"\",\"view_pass\": 0,\"add_pass\": 1,\"edit_pass\": 1,\"register_level\": 0,\"upload_level\": 4}]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get collections security"
            }
          ], 
          "route": "/collection/security", 
          "name": "Collections security", 
          "description": "Security settings for all collections"
        }, 
        {
          "methods": [
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "echo json_pretty(collectionSecurity($name));"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "interface security"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{\"name\": \"en-US-interface-sp3\",\"code\": \"ui1\",\"title\": \"English Interface for SignPuddle 3\",\"user\": \"slevinski\",\"created_at\": \"\",\"view_pass\": 0,\"add_pass\": 1,\"edit_pass\": 1,\"register_level\": 0,\"upload_level\": 4}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve collection security"
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
                "collectionSecurityUpdate($name,$data,$pass);", 
                "$app->response->setStatus(204);", 
                "return;"
              ], 
              "method": "PUT", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{\"name\": \"en-US-interface-sp3\",\"code\": \"ui1\",\"title\": \"English Interface for SignPuddle 3\",\"user\": \"slevinski\",\"created_at\": \"\",\"view_pass\": 0,\"add_pass\": 1,\"edit_pass\": 1,\"register_level\": 0,\"upload_level\": 4}"
                    ], 
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "type": "text/plain", 
                    "name": "an update for an existing entry"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "Update collection security"
            }, 
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "collectionSecurityDelete($name,$pass);", 
                "$app->response->setStatus(204);"
              ], 
              "method": "DELETE", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "the deletion of collection security"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "Remove security for collection"
            }
          ], 
          "route": "/collection/{name}/security", 
          "name": "Collection security", 
          "parameters": [
            {
              "example": "`en-US-interface-sp3`", 
              "type": "required,string", 
              "description": "The name of the collection", 
              "name": "name"
            }
          ], 
          "description": "Details about the collection security"
        }, 
        {
          "route": "/collection/{name}/users", 
          "name": "Collection users", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "collection name", 
              "name": "name"
            }
          ], 
          "methods": [
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "echo json_pretty(collectionUsers($name));"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[{\"user\": \"test_user\",\"security\": 3}]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get collection users"
            }
          ]
        }, 
        {
          "route": "/collection/manage/unknown", 
          "name": "Management for unknown collections", 
          "methods": [
            {
              "code": [
                "echo json_pretty(collectionManageUnknown());"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[\"es-US-interface-sp3\"]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get list of unknown collections with user management"
            }
          ]
        }, 
        {
          "route": "/collection/{name}/manage", 
          "name": "Collection users management", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "collection name", 
              "name": "name"
            }
          ], 
          "methods": [
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "echo json_pretty(collectionUsersDetail($name,$pass));"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "collection management"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[{\"name\": \"test_user\",\"display\": \"Test Editor\",\"email\": \"testing@gmail.com\",\"security\": 3}]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get collection management"
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
                "collectionManageUpdate($name,$data,$pass);", 
                "$app->response->setStatus(204);", 
                "return;"
              ], 
              "method": "PUT", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{\"user\":\"slevinski\",\"security\":4}"
                    ], 
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "an update for collection management"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "Update collection management"
            }, 
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "collectionManageDelete($name,$pass);", 
                "$app->response->setStatus(204);"
              ], 
              "method": "DELETE", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "the removal of user management for a collection"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "Remove user management for collection"
            }
          ]
        }, 
        {
          "route": "/collection/{name}/manage/{user}", 
          "name": "Collection user", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "collection name", 
              "name": "name"
            }, 
            {
              "example": "`slevinski`", 
              "type": "string", 
              "description": "user name", 
              "name": "user"
            }
          ], 
          "methods": [
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "collectionManageRemove($name,$user,$pass);", 
                "$app->response->setStatus(204);"
              ], 
              "method": "DELETE", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "the removal of a user from collection management"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "Remove user from collection management"
            }
          ]
        }, 
        {
          "route": "/collection/{name}/request/{source}", 
          "name": "Collection Request Copy", 
          "parameters": [
            {
              "example": "`es-US-interface-sp3`", 
              "type": "required,string", 
              "description": "The name of the new collection", 
              "name": "name"
            }, 
            {
              "example": "`en-US-interface-sp3`", 
              "type": "required,string", 
              "description": "The name of the source collection", 
              "name": "source"
            }
          ], 
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "$user = userVerified($pass);", 
                "if (!$user) haltForbidden();", 
                "rightsCheck($source,$pass,SP_VIEW);", 
                "$err = invalidName($source);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$parts = explode(\"-\",$source);", 
                "$err = invalidName($name,$parts[2]);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$dir = 'data/db/';", 
                "$infile = $dir . $source . \".db\";", 
                "$outfile = $dir . $name . \".db\";", 
                "if (!file_exists($infile)) haltBadRequest('Source collection does not exist: ' . $source);", 
                "if (file_exists($outfile)) haltBadRequest('Collection already exists: ' . $name);", 
                "if (copy($infile,$outfile)){", 
                "  $data = array();", 
                "  $data[\"user\"] = $user;", 
                "  $data[\"security\"] = SP_EDIT;", 
                "  collectionManageUpdate($name,$data,$pass,true);", 
                "", 
                "  $data = $app->request->getbody();", 
                "  $data = json_decode($data,true);", 
                "  $title = isset($data['title'])?$data['title']:'New Collection';", 
                "  $data = array();", 
                "  $data[\"title\"] = $title;", 
                "  $data[\"user\"] = \"admin\";", 
                "  $data[\"view_pass\"] = 0;", 
                "  $data[\"add_pass\"] = 1;", 
                "  $data[\"edit_pass\"] = 1;", 
                "  $data[\"register_level\"] = 0;", 
                "  $data[\"upload_level\"] = 4;", 
                "  collectionSecurityUpdate($name,$data,$pass,true);", 
                "  $app->response->setStatus(204);", 
                "  return;", 
                "} else {", 
                "  haltForbidden();", 
                "}"
              ], 
              "method": "POST", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "5ffab638bde372b4fa63bb6f8484595d"
                    }, 
                    "name": "new collection from source"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "request the creation of a new collection"
            }
          ]
        }
      ], 
      "group": "collection", 
      "html": "<ul>\n<li>Source: <a href=\"../src/collection.txt\">ApiTxt format</a> and <a href=\"../src/collection.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/collection.md\">API Blueprint</a> and <a href=\"../doc/collection.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/collection.html\">API Interface</a> and <a href=\"../api/collection.js\">JavaScript</a></li>\n</ul>", 
      "lines": [
        "+ Source: [ApiTxt format](../src/collection.txt) and [JSON objects](../src/collection.json)", 
        "+ Documents: [API Blueprint](../doc/collection.md) and [Stand Alone HTML](../doc/collection.htm)", 
        "+ Live Page: [API Interface](../api/collection.html) and [JavaScript](../api/collection.js)"
      ], 
      "description": "Resources related to collections in general"
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
