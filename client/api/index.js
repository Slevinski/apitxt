var spVersion = "3";
var host = "";
try {
  host = config['state']['connection']['server'];
} catch (e){
 host = "https://signpuddle.com/server"
}
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "SignPuddle 3 API", 
  "lines": [
    "> v3.0.0", 
    "", 
    "Welcome to the SignPuddle 3 API.", 
    "The API is defined with two types of source, two types of documentation, and a live page of HTML and JavaScript.", 
    "", 
    "+ Source: [ApiTxt format](../src/index.txt) and [JSON objects](../src/index.json)", 
    "+ Documents: [API Blueprint](../doc/index.md) and [Stand Alone HTML](../doc/index.htm)", 
    "+ Live Page: [API Interface](../api/index.html) and [JavaScript](../api/index.js)", 
    "", 
    "The API is divided into several sections.", 
    "This main document includes all of the sections.", 
    "Each section is available separately as well.", 
    "", 
    "## HTTP Request Methods", 
    "", 
    "The SignPuddle 3 server accepts HTTP request methods of GET, POST, PUT, and DELETE.", 
    "+ GET - retrieve information without altering the server", 
    "+ POST - add information to the server with each request", 
    "+ PUT - update information on the server", 
    "+ DELETE - remove information on the server.", 
    "## HTTP Response Statuses", 
    "", 
    "The SignPuddle 3 server responds with status codes.", 
    "", 
    "### Success Codes", 
    "", 
    "+ 200 OK", 
    "+ 201 Created", 
    "+ 202 Accepted", 
    "+ 204 No Content", 
    "", 
    "### Redirect Codes", 
    "", 
    "+ 300 Multiple Choices", 
    "+ 304 No Modified", 
    "+ 307 Temporary Redirect", 
    "+ 308 Permanent Redirect", 
    "", 
    "### Client Error Codes", 
    "", 
    "+ 400 Bad Request", 
    "+ 403 Forbidden", 
    "+ 404 Not Found", 
    "+ 409 Conflict", 
    "+ 429 Too Many Requests", 
    "", 
    "### Server Error Codes", 
    "", 
    "+ 500 Internal Server Error", 
    "+ 501 Not Implemented", 
    "+ 503 Service Unavailable", 
    "", 
    "## HTTP Headers", 
    "", 
    "Headers pass additional information about the request or response.", 
    "", 
    "### Headers", 
    "", 
    "+ Content-Type - the MIME type of the response", 
    "+ ETag - an entity tag used to validate cached values", 
    "+ Expires - date after which response is stale", 
    "+ Location - used for redirect or for newly created resource", 
    "+ If-None-Match - request header compared to ETag value, response status 304 if matching", 
    "+ If-Modified-Since - request header, causes response status 304 if unmodified", 
    "+ Last-Modified - response header, used with If-Modified-Since request header", 
    ""
  ], 
  "html": "<blockquote>\n<p>v3.0.0</p>\n</blockquote>\n<p>Welcome to the SignPuddle 3 API.\nThe API is defined with two types of source, two types of documentation, and a live page of HTML and JavaScript.</p>\n<ul>\n<li>Source: <a href=\"../src/index.txt\">ApiTxt format</a> and <a href=\"../src/index.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/index.md\">API Blueprint</a> and <a href=\"../doc/index.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/index.html\">API Interface</a> and <a href=\"../api/index.js\">JavaScript</a></li>\n</ul>\n<p>The API is divided into several sections.\nThis main document includes all of the sections.\nEach section is available separately as well.</p>\n<h2>HTTP Request Methods</h2>\n<p>The SignPuddle 3 server accepts HTTP request methods of GET, POST, PUT, and DELETE.\n+ GET - retrieve information without altering the server\n+ POST - add information to the server with each request\n+ PUT - update information on the server\n+ DELETE - remove information on the server.</p>\n<h2>HTTP Response Statuses</h2>\n<p>The SignPuddle 3 server responds with status codes.</p>\n<h3>Success Codes</h3>\n<ul>\n<li>200 OK</li>\n<li>201 Created</li>\n<li>202 Accepted</li>\n<li>204 No Content</li>\n</ul>\n<h3>Redirect Codes</h3>\n<ul>\n<li>300 Multiple Choices</li>\n<li>304 No Modified</li>\n<li>307 Temporary Redirect</li>\n<li>308 Permanent Redirect</li>\n</ul>\n<h3>Client Error Codes</h3>\n<ul>\n<li>400 Bad Request</li>\n<li>403 Forbidden</li>\n<li>404 Not Found</li>\n<li>409 Conflict</li>\n<li>429 Too Many Requests</li>\n</ul>\n<h3>Server Error Codes</h3>\n<ul>\n<li>500 Internal Server Error</li>\n<li>501 Not Implemented</li>\n<li>503 Service Unavailable</li>\n</ul>\n<h2>HTTP Headers</h2>\n<p>Headers pass additional information about the request or response.</p>\n<h3>Headers</h3>\n<ul>\n<li>Content-Type - the MIME type of the response</li>\n<li>ETag - an entity tag used to validate cached values</li>\n<li>Expires - date after which response is stale</li>\n<li>Location - used for redirect or for newly created resource</li>\n<li>If-None-Match - request header compared to ETag value, response status 304 if matching</li>\n<li>If-Modified-Since - request header, causes response status 304 if unmodified</li>\n<li>Last-Modified - response header, used with If-Modified-Since request header</li>\n</ul>", 
  "host": "https://signpuddle.com/server", 
  "meta": "Generated from ApiTxt format (output/index.txt) using txt2json.py", 
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
    }, 
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
    }, 
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
                "  haltBadRequest($err);", 
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
    }, 
    {
      "routes": [
        {
          "route": "/dictionary{?name}", 
          "name": "Dictionaries available", 
          "parameters": [
            {
              "example": "public", 
              "type": "string", 
              "description": "partial dictionary name", 
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
                "  if (strpos($name,\"dictionary\")!==false){", 
                "    $dictionaries = $dir . '*' . $name . '*' . $ext;", 
                "    $files = glob($dictionaries);", 
                "  } else {", 
                "    $dictionaries = $dir . '*dictionary*' . $name . '*' . $ext;", 
                "    $files = glob($dictionaries);", 
                "    if (count($files)==0) {", 
                "      $dictionaries = $dir . '*' . $name . '*dictionary*' . $ext;", 
                "      $files = glob($dictionaries);", 
                "    }", 
                "  }", 
                "} else {", 
                "  $dictionaries = $dir . '*dictionary*' . $ext;", 
                "  $files = glob($dictionaries);", 
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
                        "[\"ase-US-dictionary-public\"]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get available dictionaries"
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
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check  && !$update){", 
                "  haltNotModified();", 
                "}", 
                "if ($format=='json' && (!file_exists($file) || $update)) {", 
                "  $json = dictionary2json($name);", 
                "  file_put_contents($file,$json);", 
                "} else if ($format=='txt' && (!file_exists($file) || $update)) {", 
                "  $txt = dictionary2txt($name);", 
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
                    "name": "dictionary text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "1\t\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00\ttest zero\ttest zero\twe are testing SignPuddle 1.6\tVal ;-)\t{\"video\":\"<iframe width=\\\"425\\\" height=\\\"349\\\" src=\\\"http:\\/\\/www.youtube.com\\/embed\\/RTniYA1lTDM\\\" frameborder=\\\"0\\\" allowfullscreen><\\/iframe>\"}\tVal\t2011-07-20T17:39:02Z\t2011-07-20T17:42:09Z"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary"
            }
          ], 
          "route": "/dictionary/{name}{?update}", 
          "name": "Dictionary resource", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "1", 
              "type": "optional,number", 
              "description": "Forces a rewrite of the dictionary for json and txt formats", 
              "name": "update"
            }
          ], 
          "description": "Access to available dictionaries"
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
                "$output = dictionarySigns($name);", 
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
                    "name": "dictionary text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary signs"
            }
          ], 
          "route": "/dictionary/{name}/signs", 
          "name": "List of dictionary signs", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }
          ], 
          "description": "The signs in the dictionary"
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
                "$output = dictionarySigntexts($name);", 
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
                    "name": "dictionary text"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary signtexts"
            }
          ], 
          "route": "/dictionary/{name}/signtexts", 
          "name": "List of dictionary signtexts", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }
          ], 
          "description": "The signtexts in the dictionary"
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
                "$data = $app->request->getbody();", 
                "$data = json_decode($data,true);", 
                "echo dictionaryEntryNew($name,$data,$pass);", 
                "$app->response->setStatus(201);", 
                "return;"
              ], 
              "method": "POST", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{", 
                      "  \"sign\": \"\\ud836\\udc03\\ud836\\udd44\\ud836\\udd19\\ud8ef\\udfa1\\ud836\\udcf4\\ud836\\udcf4\\ud8dd\\udc54\\ud836\\udcc8\\ud836\\udcfc\\ud8dd\\udc42\\ud836\\udd26\\ud836\\udcfa\\ud8c8\\uddd2\\ud836\\udd15\\ud836\\udcee\\ud8c8\\uddda\\ud836\\udce0\\ud836\\udcef\",", 
                      "  \"terms\": [", 
                      "    \"Malaysia\"", 
                      "  ],", 
                      "  \"signtext\": \"\",", 
                      "  \"text\": \"\",", 
                      "  \"source\": \"Conference Maastricht\",", 
                      "  \"detail\": {}", 
                      "}  "
                    ], 
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "type": "application/json", 
                    "name": "add new dictionary entry"
                  }, 
                  "responses": [
                    {
                      "status": 201, 
                      "body": [
                        "777"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "add dictionary entry"
            }
          ], 
          "route": "/dictionary/{name}/entry", 
          "name": "Dictionary entry resource", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }
          ], 
          "description": "Entries for dictionary"
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
                "$data = $app->request->getbody();", 
                "$data = json_decode($data,true);", 
                "dictionaryEntryUpdate($name,$id,$data,$pass);", 
                "$app->response->setStatus(204);", 
                "return;"
              ], 
              "method": "PUT", 
              "dialog": [
                {
                  "request": {
                    "body": [
                      "{", 
                      "  \"sign\": \"\\ud836\\udc03\\ud836\\udd44\\ud836\\udd19\\ud8ef\\udfa1\\ud836\\udcf4\\ud836\\udcf4\\ud8dd\\udc54\\ud836\\udcc8\\ud836\\udcfc\\ud8dd\\udc42\\ud836\\udd26\\ud836\\udcfa\\ud8c8\\uddd2\\ud836\\udd15\\ud836\\udcee\\ud8c8\\uddda\\ud836\\udce0\\ud836\\udcef\",", 
                      "  \"terms\": [", 
                      "    \"Malaysia\"", 
                      "  ],", 
                      "  \"signtext\": \"\",", 
                      "  \"text\": \"\",", 
                      "  \"source\": \"Conference Maastricht\",", 
                      "  \"detail\": {}", 
                      "}  "
                    ], 
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "type": "application/json", 
                    "name": "an update for an existing dictionary entry"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "update dictionary entry"
            }, 
            {
              "code": [
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "dictionaryEntryDelete($name,$id,$pass);", 
                "$app->response->setStatus(204);"
              ], 
              "method": "DELETE", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "the removal of an dictionary entry"
                  }, 
                  "responses": [
                    {
                      "status": 204
                    }
                  ]
                }
              ], 
              "name": "remove dictionary entry"
            }
          ], 
          "route": "/dictionary/{name}/entry/{id}", 
          "name": "Dictionary entry resource for id", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "11244", 
              "type": "string", 
              "description": "An id numbers", 
              "name": "id"
            }
          ], 
          "description": "Specific entries for dictionary"
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
                "$output = json_pretty(dictionarySearch($name,$offset,$limit,$filter,$sort,$results));", 
                "header('Last-Modified: ' . $lastModified);", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "dictionary query results"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{", 
                        "  \"total\": 1,", 
                        "  \"data\": [", 
                        "    [", 
                        "      \"1\",", 
                        "      \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\"", 
                        "    ]", 
                        "  ]", 
                        "}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary results of searching"
            }
          ], 
          "route": "/dictionary/{name}/search{?offset,limit,filter,sort,results}", 
          "name": "Search dictionary", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of a dictionary", 
              "name": "name"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, sign, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Searching dictionary signs"
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
                "$output = json_pretty(dictionarySearchId($name,$id,$offset,$limit,$filter,$sort,$results));", 
                "header('Last-Modified: ' . $lastModified);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "an dictionary entry"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "[", 
                        "  {", 
                        "    \"id\": \"1\",", 
                        "    \"sign\": \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\",", 
                        "    \"terms\": [", 
                        "      \"test zero\"", 
                        "    ],", 
                        "    \"lower\": [", 
                        "      \"test zero\"", 
                        "    ],", 
                        "    \"signtext\": \"\",", 
                        "    \"text\": \"we are testing SignPuddle 1.6\",", 
                        "    \"source\": \"Val ;-)\",", 
                        "    \"detail\": {", 
                        "      \"video\": \"<iframe width=\\\"425\\\" height=\\\"349\\\" src=\\\"http:\\/\\/www.youtube.com\\/embed\\/RTniYA1lTDM\\\" frameborder=\\\"0\\\" allowfullscreen><\\/iframe>\"", 
                        "    },", 
                        "    \"user\": \"Val\",", 
                        "    \"created_at\": \"2011-07-20T17:39:02Z\",", 
                        "    \"updated_at\": \"2011-07-20T17:42:09Z\"", 
                        "  }", 
                        "]"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary entry"
            }
          ], 
          "route": "/dictionary/{name}/search/id/{id}{?offset,limit,filter,sort,results}", 
          "name": "Search dictionary with ids", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "1-4,5", 
              "type": "string", 
              "description": "A list of one or more id numbers", 
              "name": "id"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, sign, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Specific entries for dictionary"
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
                "$output = json_pretty(dictionarySearchSign($name,$query,$offset,$limit,$filter,$sort,$results));", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "dictionary query results"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{", 
                        "  \"total\": 1,", 
                        "  \"data\": [", 
                        "    [", 
                        "      \"1\",", 
                        "      \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\"", 
                        "    ]", 
                        "  ]", 
                        "}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary results of searching signs with query string"
            }
          ], 
          "route": "/dictionary/{name}/search/sign/{query}{?offset,limit,filter,sort,results}", 
          "name": "Search signs with query string", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of a dictionary", 
              "name": "name"
            }, 
            {
              "example": "Q", 
              "type": "required,string", 
              "description": "A query string", 
              "name": "query"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, sign, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Query string access to dictionary signs"
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
                "$output = json_pretty(dictionarySearchSigntext($name,$query,$offset,$limit,$filter,$sort,$results));", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "dictionary query results"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{", 
                        "  \"total\": 1,", 
                        "  \"data\": [", 
                        "    [", 
                        "      \"1\",", 
                        "      \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\"", 
                        "    ]", 
                        "  ]", 
                        "}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve dictionary results of searching signtexts with query string"
            }
          ], 
          "route": "/dictionary/{name}/search/signtext/{query}{?offset,limit,filter,sort,results}", 
          "name": "Search signtexts with query string", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of a dictionary", 
              "name": "name"
            }, 
            {
              "example": "Q", 
              "type": "required,string", 
              "description": "A query string", 
              "name": "query"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, signtext, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Query string access to dictionary signtexts"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$output = json_pretty(dictionarySearchTerms($name,$text,$type,$case, $offset, $limit, $filter, $sort,$results));", 
                "$searchTime = searchtime($timein);", 
                "header(\"Search-Time: \" . $searchTime);", 
                "echo $output;"
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "headers": {
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "matching dictionary entries"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{", 
                        "  \"total\": 1,", 
                        "  \"data\": [", 
                        "    [", 
                        "      \"1\",", 
                        "      \"\\ud836\\udc00\\ud8cb\\udc61\\ud8c8\\uddd9\\ud8db\\udfc3\\ud836\\udc03\\ud836\\udd1d\\ud836\\udd14\\ud8c8\\uddd9\\ud836\\udcf0\\ud836\\udcf9\\ud8db\\udfc3\\ud836\\udd0e\\ud836\\udd01\\ud8cb\\udc61\\ud836\\udcfd\\ud836\\udd00\"", 
                        "    ]", 
                        "  ]", 
                        "}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "retrieve matching entries"
            }
          ], 
          "route": "/dictionary/{name}/search/terms/{text}{?type,case,offset,limit,filter,sort,results}", 
          "name": "Dictionary terms search", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "`SignPuddle`", 
              "type": "required,string", 
              "description": "The text for searching", 
              "name": "text"
            }, 
            {
              "example": "exact", 
              "type": "string", 
              "description": "Type of search of start, end, or exact", 
              "name": "type"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Case sensitive search", 
              "name": "case"
            }, 
            {
              "example": "0", 
              "type": "number", 
              "description": "Start of search results", 
              "name": "offset"
            }, 
            {
              "example": "10", 
              "type": "number", 
              "description": "Number of search results", 
              "name": "limit"
            }, 
            {
              "example": "user=Val", 
              "type": "string", 
              "description": "restrict search results", 
              "name": "filter"
            }, 
            {
              "example": "created_at", 
              "type": "string", 
              "description": "Field for sorting results", 
              "name": "sort"
            }, 
            {
              "example": "sign", 
              "type": "string", 
              "description": "Type of results: entries, sign, term, terms", 
              "name": "results"
            }
          ], 
          "description": "Search dictionary terms for text"
        }, 
        {
          "methods": [
            {
              "code": [
                "$headers = getHeaders();", 
                "$pass = isset($headers['Pass'])?$headers['Pass']:'';", 
                "rightsCheck($name,$pass,SP_VIEW);", 
                "$check = isset($headers['If-Modified-Since'])?$headers['If-Modified-Since']:'';", 
                "if ($name==\"iswa-2010\"){", 
                "  echo json_pretty(dictionaryISWA());", 
                "  return;", 
                "}", 
                "$err = invalidName($name);", 
                "if ($err){", 
                "  haltBadRequest($err);", 
                "}", 
                "$lastModified = lastModified($name);", 
                "if ($lastModified <= $check  && !$update){", 
                "  haltNotModified();", 
                "}", 
                "", 
                "$alphabet = str_replace('-dictionary-','-alphabet-',$name);", 
                "$file = 'data/json/' . $alphabet . '.json';", 
                "if (!$update){", 
                "  if (!file_exists($file)) {", 
                "    $update = 1;", 
                "  } else {", 
                "    $check = date (\"Y-m-d\\TH:i:s\", filemtime($file));", 
                "    $check =  new DateTime($check);", 
                "    $check->setTimezone(new DateTimeZone('UTC'));", 
                "    $check = $check->format('Y-m-d\\TH:i:s\\Z');", 
                "    if ($lastModified>$check){", 
                "      $update = 1;", 
                "    }", 
                "  }", 
                "}", 
                "if ($update) {", 
                "  $json = json_pretty(dictionaryAlphabet($name,$lastModified));", 
                "  file_put_contents($file,$json);", 
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
                      "If-Modified-Since": "2019-01-16T16:56:19.175Z", 
                      "Pass": "724fd4b4438fba9d0c5ab89d0833e5c9"
                    }, 
                    "name": "dictionary query results"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "{\"name\": \"ase-US-alphabet-public\",\"data\": []}"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "generate alphabet from dictionary contents"
            }
          ], 
          "route": "/dictionary/{name}/alphabet{?update}", 
          "name": "Dictionary symbol subset", 
          "parameters": [
            {
              "example": "`ase-US-dictionary-public`", 
              "type": "required,string", 
              "description": "The name of an dictionary", 
              "name": "name"
            }, 
            {
              "example": "1", 
              "type": "optional,number", 
              "description": "Forces a rewrite of the alphabet", 
              "name": "update"
            }
          ], 
          "description": "Create alphabet from dictionary signs"
        }
      ], 
      "group": "dictionary", 
      "html": "<ul>\n<li>Source: <a href=\"../src/dictionary.txt\">ApiTxt format</a> and <a href=\"../src/dictionary.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/dictionary.md\">API Blueprint</a> and <a href=\"../doc/dictionary.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/dictionary.html\">API Dictionary</a> and <a href=\"../api/dictionary.js\">JavaScript</a></li>\n</ul>", 
      "lines": [
        "+ Source: [ApiTxt format](../src/dictionary.txt) and [JSON objects](../src/dictionary.json)", 
        "+ Documents: [API Blueprint](../doc/dictionary.md) and [Stand Alone HTML](../doc/dictionary.htm)", 
        "+ Live Page: [API Dictionary](../api/dictionary.html) and [JavaScript](../api/dictionary.js)"
      ], 
      "description": "Resources related to dictionary collections"
    }, 
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
    }, 
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
                "$swu = SignWriting\\fsw2swu($text);", 
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
                "$req = $app->request();", 
                "if ($req->get('throwStatus')=='500') {haltNoDatabase();}", 
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
                "$req = $app->request();", 
                "if ($req->get('throwStatus')=='500') {haltNoDatabase();}", 
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
    }, 
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
                      "body": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ], 
                      "type": "text/plain;charset=utf-8"
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
                      "body": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ], 
                      "type": "text/plain;charset=utf-8"
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
                      "body": [
                        "AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520"
                      ], 
                      "type": "text/plain;charset=utf-8"
                    }
                  ]
                }
              ], 
              "name": "text with SWU strings"
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
          "route": "/swu/svg/{text}", 
          "lines": [
            "Create a stand-alone SVG image using Formal SignWriting in ASCII (SWU)"
          ], 
          "html": "<p>Create a stand-alone SVG image using Formal SignWriting in ASCII (SWU)</p>", 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$req = $app->request();", 
                "if ($req->get('throwStatus')=='500') {haltNoDatabase();}", 
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
              "name": "retrieve stand-alone SVG image"
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
          "route": "/swu/svg/font/{text}", 
          "lines": [
            "Create an SVG with font using Formal SignWriting in ASCII (SWU)"
          ], 
          "html": "<p>Create an SVG with font using Formal SignWriting in ASCII (SWU)</p>", 
          "methods": [
            {
              "code": [
                "$timein = microtime(true);", 
                "$req = $app->request();", 
                "if ($req->get('throwStatus')=='500') {haltNoDatabase();}", 
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
              "name": "retrieve SVG with font"
            }
          ]
        }
      ], 
      "group": "swu", 
      "html": "<ul>\n<li>Source: <a href=\"../src/swu.txt\">ApiTxt format</a> and <a href=\"../src/swu.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/swu.md\">API Blueprint</a> and <a href=\"../doc/swu.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/swu.html\">API Interface</a> and <a href=\"../api/swu.js\">JavaScript</a></li>\n</ul>", 
      "lines": [
        "+ Source: [ApiTxt format](../src/swu.txt) and [JSON objects](../src/swu.json)", 
        "+ Documents: [API Blueprint](../doc/swu.md) and [Stand Alone HTML](../doc/swu.htm)", 
        "+ Live Page: [API Interface](../api/swu.html) and [JavaScript](../api/swu.js)"
      ], 
      "description": "Resources related to Formal SignWriting in ASCII (SWU)"
    }, 
    {
      "routes": [
        {
          "route": "/apitxt/root", 
          "html": "<p>Every document should start with a root element.\nAfter the root, the other elements are used to quickly create complex website APIs.\nThe order of the lines matters and will effect the structure of the JSON objects.</p>\n<p>There are two groups of elements, the frame elements and the detail elements.\nThe frame elements structure a website api and the detail elements attach to a previous frame element.</p>\n<h3>Frame elements</h3>\n<p>There are six frame elements: root, group, route, method, request, and response.\nThe lines are written in a specific order to create an array of JSON objects.</p>\n<p><strong>route organization</strong></p>\n<p>An ApiTxt document starts with a root, or an assumed root.\nAny route that occur before a group element, will be associated with the root.\nGroups are always associated with the root.\nGroup elements can contain routes.</p>\n<p><pre><code>root\n      | - routes\n      | - groups\n            | - routes</code></pre></p>\n<p><strong>route structure</strong></p>\n<p>A route can be associated with a variety of HTTP methods.\nEach method can have several requests and responses.\nAny response before a request will assume a generic request.\nAny response after a request will be associated with that request.</p>\n<p><pre><code>route\n      | - methods\n        | - responses\n        | - requests\n              | - responses</code></pre></p>\n<h2>Detail elements</h2>\n<p>There are five detail elements: line, parameter, code, header, and body.  The detail lines attach to a previous frame element if correctly structured.</p>\n<p><strong>single line elements</strong></p>\n<ul>\n<li>lines for all frame elements</li>\n<li>parameters for route</li>\n<li>code for method</li>\n<li>body for request and response</li>\n<li>headers for request and response</li>\n</ul>", 
          "lines": [
            "Every document should start with a root element.", 
            "After the root, the other elements are used to quickly create complex website APIs.", 
            "The order of the lines matters and will effect the structure of the JSON objects.", 
            "", 
            "There are two groups of elements, the frame elements and the detail elements.", 
            "The frame elements structure a website api and the detail elements attach to a previous frame element.", 
            "", 
            "### Frame elements", 
            "There are six frame elements: root, group, route, method, request, and response.", 
            "The lines are written in a specific order to create an array of JSON objects.", 
            "", 
            "**route organization**", 
            "", 
            "An ApiTxt document starts with a root, or an assumed root.", 
            "Any route that occur before a group element, will be associated with the root.", 
            "Groups are always associated with the root.", 
            "Group elements can contain routes.", 
            "", 
            "```", 
            "    root", 
            "      | - routes", 
            "      | - groups", 
            "            | - routes", 
            "```", 
            "", 
            "**route structure**", 
            "", 
            "A route can be associated with a variety of HTTP methods.", 
            "Each method can have several requests and responses.", 
            "Any response before a request will assume a generic request.", 
            "Any response after a request will be associated with that request.", 
            "", 
            "```", 
            "    route", 
            "      | - methods", 
            "        | - responses", 
            "        | - requests", 
            "              | - responses", 
            "```", 
            "", 
            "## Detail elements", 
            "There are five detail elements: line, parameter, code, header, and body.  The detail lines attach to a previous frame element if correctly structured.", 
            "", 
            "**single line elements**", 
            "", 
            "+ lines for all frame elements", 
            "+ parameters for route", 
            "+ code for method", 
            "+ body for request and response", 
            "+ headers for request and response", 
            ""
          ], 
          "name": "root", 
          "methods": [
            {
              "html": "<p>Every document should start with a root element.</p>\n<p><strong>root line</strong></p>\n<p>root &lt;TAB&gt; name &lt;TAB&gt; title &lt;TAB&gt; host</p>\n<ul>\n<li>field 1 - name - uniquely identifies a document</li>\n<li>field 2 - title - name of the document</li>\n<li>field 3 - host - website URL</li>\n</ul>\n<p><strong>root example</strong></p>\n<p>root &lt;TAB&gt; apitxt &lt;TAB&gt; ApiTxt &lt;TAB&gt; https://signpuddle.com/apitxt</p>\n<p><strong>root line relationships</strong></p>\n<p><pre><code>root\n     | - lines\n     | - routes\n     | - groups</code></pre></p>\n<p><strong>root object</strong></p>\n<p><pre><code>json\n{\n  \"root\" : field[1],\n  \"title\" : field[2],\n  \"host\" : field[3],\n  \"lines\" : []\n}</code></pre></p>", 
              "lines": [
                "Every document should start with a root element.", 
                "", 
                "**root line**", 
                "", 
                "root &lt;TAB> name &lt;TAB> title &lt;TAB> host", 
                "", 
                "+ field 1 - name - uniquely identifies a document", 
                "+ field 2 - title - name of the document", 
                "+ field 3 - host - website URL", 
                "", 
                "**root example**", 
                "", 
                "root &lt;TAB> apitxt &lt;TAB> ApiTxt &lt;TAB> https://signpuddle.com/apitxt", 
                "", 
                "", 
                "**root line relationships**", 
                "", 
                "```", 
                "    root", 
                "     | - lines", 
                "     | - routes", 
                "     | - groups", 
                "```", 
                "", 
                "**root object**", 
                "", 
                "```json", 
                "{", 
                "  \"root\" : field[1],", 
                "  \"title\" : field[2],", 
                "  \"host\" : field[3],", 
                "  \"lines\" : []", 
                "}", 
                "```", 
                ""
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the root definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "Every document should start with a root element.", 
                        "", 
                        "**root line**", 
                        "", 
                        "root\tname\ttitle\thost", 
                        "", 
                        "+ field 1 - name - uniquely identifies a document", 
                        "+ field 2 - title - name of the document", 
                        "+ field 3 - host - website URL", 
                        "", 
                        "**example**", 
                        "", 
                        "root\tapitxt\tApiTxt\thttps://signpuddle.com/apitxt", 
                        "", 
                        "", 
                        "**root line relationships**", 
                        "", 
                        "```", 
                        "    root", 
                        "     | - lines", 
                        "     | - routes", 
                        "     | - groups", 
                        "```", 
                        "", 
                        "**root object**", 
                        "", 
                        "```json", 
                        "{", 
                        "  \"root\" : field[1],", 
                        "  \"title\" : field[2],", 
                        "  \"host\" : field[3],", 
                        "  \"lines\" : []", 
                        "}", 
                        "```"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get root definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/group", 
          "name": "group", 
          "methods": [
            {
              "html": "<p>The group organizes resources into sections</p>\n<p><strong>group line</strong></p>\n<p>group &lt;TAB&gt; name &lt;TAB&gt; description</p>\n<ul>\n<li>field 1 - name - the short name used for sections</li>\n<li>field 2 - description - information about the group</li>\n</ul>\n<p><strong>group example</strong></p>\n<p>group &lt;TAB&gt; Section name &lt;TAB&gt; an example section</p>\n<p><strong>group line relationships</strong></p>\n<p><pre><code>group\n     | - lines\n     | - routes</code></pre></p>\n<p><strong>group object</strong></p>\n<p><pre><code>json\n{\n  \"group\" : field[1],\n  \"description\" : field[2],\n  \"lines\": []\n}</code></pre></p>", 
              "lines": [
                "The group organizes resources into sections", 
                "", 
                "**group line**", 
                "", 
                "group &lt;TAB> name &lt;TAB> description", 
                "", 
                "+ field 1 - name - the short name used for sections", 
                "+ field 2 - description - information about the group", 
                "", 
                "**group example**", 
                "", 
                "group &lt;TAB> Section name &lt;TAB> an example section", 
                "", 
                "**group line relationships**", 
                "", 
                "```", 
                "    group", 
                "     | - lines", 
                "     | - routes", 
                "```", 
                "", 
                "**group object**", 
                "", 
                "```json", 
                "{", 
                "  \"group\" : field[1],", 
                "  \"description\" : field[2],", 
                "  \"lines\": []", 
                "}", 
                "```", 
                ""
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the group definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The group organizes resources into sections", 
                        "", 
                        "**group line**", 
                        "", 
                        "group\tname\tdescription", 
                        "", 
                        "+ field 1 - name - the short name used for sections", 
                        "+ field 2 - description - information about the group", 
                        "", 
                        "**group example**", 
                        "", 
                        "group\tSection name\tan example section", 
                        "", 
                        "**group line relationships**", 
                        "", 
                        "```", 
                        "    group", 
                        "     | - lines", 
                        "     | - routes", 
                        "```", 
                        "", 
                        "**group object**", 
                        "", 
                        "```json", 
                        "{", 
                        "  \"group\" : field[1],", 
                        "  \"description\" : field[2],", 
                        "  \"lines\": []", 
                        "}", 
                        "```"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get group definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/route", 
          "name": "route", 
          "methods": [
            {
              "html": "<p>The route element allows access to a resource</p>\n<p><strong>route line</strong></p>\n<p>route &lt;TAB&gt; URI template &lt;TAB&gt; name &lt;TAB&gt; description</p>\n<ul>\n<li>field 1 - URI template - a resource pattern with parameters</li>\n<li>field 2 - name - the route name must be unique</li>\n<li>field 3 - description - information about the resource</li>\n</ul>\n<p><strong>route example</strong></p>\n<p>route &lt;TAB&gt; /example &lt;TAB&gt; an example route &lt;TAB&gt; a description of the route</p>\n<p><strong>route line relationships</strong></p>\n<p><pre><code>route\n     | - lines\n     | - parameters\n     | - methods</code></pre></p>\n<p><strong>route object</strong></p>\n<p><pre><code>json\n{\n  \"route\" : field[1],\n  \"name\" : field[2],\n  \"description\" : field[3],\n  \"lines\": [],\n  \"parameters\": []\n}</code></pre></p>", 
              "lines": [
                "The route element allows access to a resource", 
                "", 
                "**route line**", 
                "", 
                "route &lt;TAB> URI template &lt;TAB> name &lt;TAB> description", 
                "", 
                "+ field 1 - URI template - a resource pattern with parameters", 
                "+ field 2 - name - the route name must be unique", 
                "+ field 3 - description - information about the resource", 
                "", 
                "**route example**", 
                "", 
                "route &lt;TAB> /example &lt;TAB> an example route &lt;TAB> a description of the route", 
                "", 
                "**route line relationships**", 
                "", 
                "```", 
                "    route", 
                "     | - lines", 
                "     | - parameters", 
                "     | - methods", 
                "```", 
                "", 
                "**route object**", 
                "", 
                "```json", 
                "{", 
                "  \"route\" : field[1],", 
                "  \"name\" : field[2],", 
                "  \"description\" : field[3],", 
                "  \"lines\": [],", 
                "  \"parameters\": []", 
                "}", 
                "```", 
                ""
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the route definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The route element allows access to a resource", 
                        "", 
                        "**route line**", 
                        "", 
                        "route\tURI template\tname\tdescription", 
                        "", 
                        "+ field 1 - URI template - a resource pattern with parameters", 
                        "+ field 2 - name - the route name must be unique", 
                        "+ field 3 - description - information about the resource", 
                        "", 
                        "**route example**", 
                        "", 
                        "route\t/example\tan example route\ta description of the route", 
                        "", 
                        "**route line relationships**", 
                        "", 
                        "```", 
                        "    route", 
                        "     | - lines", 
                        "     | - parameters", 
                        "     | - methods", 
                        "```", 
                        "", 
                        "**route object**", 
                        "", 
                        "```json", 
                        "{", 
                        "  \"route\" : field[1],", 
                        "  \"name\" : field[2],", 
                        "  \"description\" : field[3],", 
                        "  \"lines\": [],", 
                        "  \"parameters\": []", 
                        "}", 
                        "```"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get route definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/parameter", 
          "name": "parameter", 
          "methods": [
            {
              "html": "<p>The parameter element is applied to the previous route</p>\n<p><strong>parameter line</strong></p>\n<p>parameter &lt;TAB&gt; name &lt;TAB&gt; example &lt;TAB&gt; type &lt;TAB&gt; description</p>\n<ul>\n<li>field 1 - name - the name of a parameter for a route</li>\n<li>field 2 - example - an example value for the parameter</li>\n<li>field 3 - type - the parameter type, such as \"string\", \"number\", \"boolean\", \"string, optional\", \"string, required\"</li>\n<li>field 4 - description - information about the parameter</li>\n</ul>\n<p><strong>parameter example</strong></p>\n<p>parameter &lt;TAB&gt; country_code &lt;TAB&gt; US &lt;TAB&gt; string &lt;TAB&gt; the country code of interest</p>\n<p><strong>parameter line relationships</strong></p>\n<p>parameter lines are added to a parameters array</p>\n<p><strong>parameters array</strong></p>\n<p><pre><code>json\n{\"parameters\":\n  [\n    {\n      \"name\" : \" field[1],\n      \"example\" : field[2],\n      \"type\" : field[3],\n      \"description\" : field[4]\n    }\n  ]\n}</code></pre></p>", 
              "lines": [
                "The parameter element is applied to the previous route", 
                "", 
                "**parameter line**", 
                "", 
                "parameter &lt;TAB> name &lt;TAB> example &lt;TAB> type &lt;TAB> description", 
                "", 
                "+ field 1 - name - the name of a parameter for a route", 
                "+ field 2 - example - an example value for the parameter", 
                "+ field 3 - type - the parameter type, such as \"string\", \"number\", \"boolean\", \"string, optional\", \"string, required\"", 
                "+ field 4 - description - information about the parameter", 
                "", 
                "**parameter example**", 
                "", 
                "parameter &lt;TAB> country_code &lt;TAB> US &lt;TAB> string &lt;TAB> the country code of interest", 
                "", 
                "**parameter line relationships**", 
                "", 
                "parameter lines are added to a parameters array", 
                "", 
                "**parameters array**", 
                "", 
                "```json", 
                "{\"parameters\":", 
                "  [", 
                "    {", 
                "      \"name\" : \" field[1],", 
                "      \"example\" : field[2],", 
                "      \"type\" : field[3],", 
                "      \"description\" : field[4]", 
                "    }", 
                "  ]", 
                "}", 
                "```", 
                ""
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the parameter definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The parameter element is applied to the previous route", 
                        "", 
                        "**parameter line**", 
                        "", 
                        "parameter\tname\texample\ttype\tdescription", 
                        "", 
                        "+ field 1 - name - the name of a parameter for a route", 
                        "+ field 2 - example - an example value for the parameter", 
                        "+ field 3 - type - the parameter type, such as \"string\", \"number\", \"boolean\", \"string, optional\", \"string, required\"", 
                        "+ field 4 - description - information about the parameter", 
                        "", 
                        "**parameter example**", 
                        "", 
                        "parameter\tcountry_code\tUS\tstring\tthe country code of interest", 
                        "", 
                        "**parameter line relationships**", 
                        "", 
                        "parameter lines are added to a parameters array", 
                        "", 
                        "**parameters array**", 
                        "", 
                        "```json", 
                        "{\"parameters\":", 
                        "  [", 
                        "    {", 
                        "      \"name\" : \" field[1],", 
                        "      \"example\" : field[2],", 
                        "      \"type\" : field[3],", 
                        "      \"description\" : field[4]", 
                        "    }", 
                        "  ]", 
                        "}", 
                        "```"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get parameter definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/method", 
          "name": "method", 
          "methods": [
            {
              "html": "<p>The method element represents an action that can be performed on a route</p>\n<p><strong>method line</strong></p>\n<p>method &lt;TAB&gt; HTTP method &lt;TAB&gt; name &lt;TAB&gt; description</p>\n<ul>\n<li>field 1 - HTTP method - the type of action to perform: GET, POST, PUT, DELETE</li>\n<li>field 2 - name - the name of the action</li>\n<li>field 3 - description - information about the method</li>\n</ul>\n<p><strong>method example</strong></p>\n<p>method &lt;TAB&gt; GET &lt;TAB&gt; Get an example &lt;TAB&gt; This method retrieves an example document</p>\n<p><strong>method line relationships</strong></p>\n<p><pre><code>method\n     | - lines\n     | - code\n     | - requests\n     | - responses</code></pre></p>\n<p><strong>method object</strong></p>\n<p><pre><code>json\n{\n  \"method\" : field[1],\n  \"name\" : field[2],\n  \"description\" : field[3],\n  \"lines\" : [],\n  \"code\" : [],\n  \"dialog\" : [\n    {\n      \"request\" : {},\n      \"responses\" : []\n    }\n  ]\n}</code></pre></p>", 
              "lines": [
                "The method element represents an action that can be performed on a route", 
                "", 
                "**method line**", 
                "", 
                "method &lt;TAB> HTTP method &lt;TAB> name &lt;TAB> description", 
                "", 
                "+ field 1 - HTTP method - the type of action to perform: GET, POST, PUT, DELETE", 
                "+ field 2 - name - the name of the action", 
                "+ field 3 - description - information about the method", 
                "", 
                "**method example**", 
                "", 
                "method &lt;TAB> GET &lt;TAB> Get an example &lt;TAB> This method retrieves an example document", 
                "", 
                "**method line relationships**", 
                "", 
                "```", 
                "    method", 
                "     | - lines", 
                "     | - code", 
                "     | - requests", 
                "     | - responses", 
                "```", 
                "", 
                "**method object**", 
                "", 
                "```json", 
                "{", 
                "  \"method\" : field[1],", 
                "  \"name\" : field[2],", 
                "  \"description\" : field[3],", 
                "  \"lines\" : [],", 
                "  \"code\" : [],", 
                "  \"dialog\" : [", 
                "    {", 
                "      \"request\" : {},", 
                "      \"responses\" : []", 
                "    }", 
                "  ]", 
                "}", 
                "```", 
                ""
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the method definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The method element represents an action that can be performed on a route", 
                        "", 
                        "**method line**", 
                        "", 
                        "method\tHTTP method\tname\tdescription", 
                        "", 
                        "+ field 1 - HTTP method - the type of action to perform: GET, POST, PUT, DELETE", 
                        "+ field 2 - name - the name of the action", 
                        "+ field 3 - description - information about the method", 
                        "", 
                        "**method example**", 
                        "", 
                        "method\tGET\tGet an example\tThis method retrieves an example document", 
                        "", 
                        "**method line relationships**", 
                        "", 
                        "```", 
                        "    method", 
                        "     | - lines", 
                        "     | - code", 
                        "     | - requests", 
                        "     | - responses", 
                        "```", 
                        "", 
                        "**method object**", 
                        "", 
                        "```json", 
                        "{", 
                        "  \"method\" : field[1],", 
                        "  \"name\" : field[2],", 
                        "  \"description\" : field[3],", 
                        "  \"lines\" : [],", 
                        "  \"code\" : [],", 
                        "  \"dialog\" : [", 
                        "    {", 
                        "      \"request\" : {},", 
                        "      \"responses\" : []", 
                        "    }", 
                        "  ]", 
                        "}", 
                        "```"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get method definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/request", 
          "name": "request", 
          "methods": [
            {
              "html": "<p>The request element is associated with a specific method and can be paired with multiple responses.</p>\n<p><strong>request line</strong></p>\n<p>request &lt;TAB&gt; name &lt;TAB&gt; type</p>\n<ul>\n<li>field 1 - name - uniquely identifies a request</li>\n<li>field 2 - type - the content type of the request body</li>\n</ul>\n<p><strong>request example</strong></p>\n<p>request &lt;TAB&gt; matching text within request body &lt;TAB&gt; plain/text</p>\n<p><strong>request line relationships</strong></p>\n<p><pre><code>request\n     | - lines\n     | - headers\n     | - body</code></pre></p>\n<p><strong>request object</strong></p>\n<p><pre><code>json\n{\n  \"name\" : field[1],\n  \"type\" : field[2],\n  \"lines\" : [],\n  \"headers\" : {},\n  \"body\" : []\n}</code></pre></p>", 
              "lines": [
                "The request element is associated with a specific method and can be paired with multiple responses.", 
                "", 
                "**request line**", 
                "", 
                "request &lt;TAB> name &lt;TAB> type", 
                "", 
                "+ field 1 - name - uniquely identifies a request", 
                "+ field 2 - type - the content type of the request body", 
                "", 
                "**request example**", 
                "", 
                "request &lt;TAB> matching text within request body &lt;TAB> plain/text", 
                "", 
                "**request line relationships**", 
                "", 
                "```", 
                "    request", 
                "     | - lines", 
                "     | - headers", 
                "     | - body", 
                "```", 
                "", 
                "**request object**", 
                "", 
                "```json", 
                "{", 
                "  \"name\" : field[1],", 
                "  \"type\" : field[2],", 
                "  \"lines\" : [],", 
                "  \"headers\" : {},", 
                "  \"body\" : []", 
                "}", 
                "```", 
                ""
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the request definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The request element is associated with a specific method and can be paired with multiple responses.", 
                        "", 
                        "**request line**", 
                        "", 
                        "request\tname\ttype", 
                        "", 
                        "+ field 1 - name - uniquely identifies a request", 
                        "+ field 2 - type - the content type of the request body", 
                        "", 
                        "**request example**", 
                        "", 
                        "request\tmatching text within request body\tplain/text", 
                        "", 
                        "**request line relationships**", 
                        "", 
                        "```", 
                        "    request", 
                        "     | - lines", 
                        "     | - headers", 
                        "     | - body", 
                        "```", 
                        "", 
                        "**request object**", 
                        "", 
                        "```json", 
                        "{", 
                        "  \"name\" : field[1],", 
                        "  \"type\" : field[2],", 
                        "  \"lines\" : [],", 
                        "  \"headers\" : {},", 
                        "  \"body\" : []", 
                        "}", 
                        "```"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get request definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/response", 
          "name": "response", 
          "methods": [
            {
              "html": "<p>The response element is associated with a specific request, or associated with a specific method with an assumed generic request.</p>\n<p><strong>response line</strong></p>\n<p>response &lt;TAB&gt; status &lt;TAB&gt; type</p>\n<ul>\n<li>field 1 - status - an HTTP response code indicating the status of the request</li>\n<li>field 2 - type - the content type of the response body</li>\n</ul>\n<p><strong>response example</strong></p>\n<p>response &lt;TAB&gt; 200 &lt;TAB&gt; plain/text</p>\n<p><strong>response line relationships</strong></p>\n<p><pre><code>response\n     | - lines\n     | - headers\n     | - body</code></pre></p>\n<p><strong>response object</strong></p>\n<p><pre><code>json\n{\n  \"status\" : field[1],\n  \"type\" : field[2],\n  \"lines\" : [],\n  \"headers\" : {},\n  \"body\" : []\n}</code></pre></p>", 
              "lines": [
                "The response element is associated with a specific request, or associated with a specific method with an assumed generic request.", 
                "", 
                "**response line**", 
                "", 
                "response &lt;TAB> status &lt;TAB> type", 
                "", 
                "+ field 1 - status - an HTTP response code indicating the status of the request", 
                "+ field 2 - type - the content type of the response body", 
                "", 
                "**response example**", 
                "", 
                "response &lt;TAB> 200 &lt;TAB> plain/text", 
                "", 
                "**response line relationships**", 
                "", 
                "```", 
                "    response", 
                "     | - lines", 
                "     | - headers", 
                "     | - body", 
                "```", 
                "", 
                "**response object**", 
                "", 
                "```json", 
                "{", 
                "  \"status\" : field[1],", 
                "  \"type\" : field[2],", 
                "  \"lines\" : [],", 
                "  \"headers\" : {},", 
                "  \"body\" : []", 
                "}", 
                "```", 
                ""
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the response definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The response element is associated with a specific request, or associated with a specific method with an assumed generic request.", 
                        "", 
                        "**response line**", 
                        "", 
                        "response\tstatus\ttype", 
                        "", 
                        "+ field 1 - status - an HTTP response code indicating the status of the request", 
                        "+ field 2 - type - the content type of the response body", 
                        "", 
                        "**response example**", 
                        "", 
                        "response\t200\tplain/text", 
                        "", 
                        "**response line relationships**", 
                        "", 
                        "```", 
                        "    response", 
                        "     | - lines", 
                        "     | - headers", 
                        "     | - body", 
                        "```", 
                        "", 
                        "**response object**", 
                        "", 
                        "```json", 
                        "{", 
                        "  \"status\" : field[1],", 
                        "  \"type\" : field[2],", 
                        "  \"lines\" : [],", 
                        "  \"headers\" : {},", 
                        "  \"body\" : []", 
                        "}", 
                        "```"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get response definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/header", 
          "name": "header", 
          "methods": [
            {
              "html": "<p>The header element is applied to a preceding route</p>\n<p><strong>header line</strong></p>\n<p>header &lt;TAB&gt; name &lt;TAB&gt; value</p>\n<ul>\n<li>field 1 - name - the header variable name</li>\n<li>field 2 - value - the header variable value</li>\n</ul>\n<p><strong>header example</strong></p>\n<p>header &lt;TAB&gt; X-Powered-By &lt;TAB&gt; ApiTxt</p>\n<p><strong>header object</strong></p>\n<p><pre><code>json\n{ field[1] : field[2] }</code></pre></p>", 
              "lines": [
                "The header element is applied to a preceding route", 
                "", 
                "**header line**", 
                "", 
                "header &lt;TAB> name &lt;TAB> value", 
                "", 
                "+ field 1 - name - the header variable name", 
                "+ field 2 - value - the header variable value", 
                "", 
                "**header example**", 
                "", 
                "header &lt;TAB> X-Powered-By &lt;TAB> ApiTxt", 
                "", 
                "**header object**", 
                "", 
                "```json", 
                "{ field[1] : field[2] }", 
                "```", 
                ""
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the header definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The header element is applied to a preceding request or response", 
                        "", 
                        "**header line**", 
                        "", 
                        "header\tname\tvalue", 
                        "", 
                        "+ field 1 - name - the header variable name", 
                        "+ field 2 - value - the header variable value", 
                        "", 
                        "**header example**", 
                        "", 
                        "header\tX-Powered-By\tApiTxt", 
                        "", 
                        "**header object**", 
                        "", 
                        "```json", 
                        "{ field[1] : field[2] }", 
                        "```"
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get header definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/body", 
          "name": "body", 
          "methods": [
            {
              "html": "<p>The body element adds contents to a preceding request or response.</p>\n<p>The text of the body is everything after the string \"body &lt;TAB&gt;\".</p>", 
              "lines": [
                "The body element adds contents to a preceding request or response.", 
                "", 
                "The text of the body is everything after the string \"body &lt;TAB>\"."
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the body definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The body element adds contents to a preceding request or response.", 
                        "", 
                        "The text of the body is everything after the string \"body <TAB>\""
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get body definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/line", 
          "name": "line", 
          "methods": [
            {
              "html": "<p>The line element adds additional text to frame elements.</p>\n<p>For the root, group, route, method, request, and response, the lines add details to an element.</p>\n<p>The text of the line is everything after the string \"line &lt;TAB&gt;\".</p>", 
              "lines": [
                "The line element adds additional text to frame elements.", 
                "", 
                "For the root, group, route, method, request, and response, the lines add details to an element.", 
                "", 
                "The text of the line is everything after the string \"line &lt;TAB>\"."
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the line definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The line element adds additional text to frame elements.", 
                        "", 
                        "For the root, group, route, method, request, and response, the lines add details to an element.", 
                        "", 
                        "The text of the line is everything after the string \"line <TAB>\"."
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get line definition"
            }
          ]
        }, 
        {
          "route": "/apitxt/code", 
          "name": "code", 
          "methods": [
            {
              "html": "<p>The code element adds functionality to the method element.</p>\n<p>The code element contains programming text.  ApiTxt comes integrated with the PHP project the Slim Framework v2.  The conversion to working PHP adds boilerplate details for routes and method, with named parameters and query parameters available as functional variables.</p>\n<p>The text of the code is everything after the string \"code &lt;TAB&gt;\".</p>", 
              "lines": [
                "The code element adds functionality to the method element.", 
                "", 
                "The code element contains programming text.  ApiTxt comes integrated with the PHP project the Slim Framework v2.  The conversion to working PHP adds boilerplate details for routes and method, with named parameters and query parameters available as functional variables.", 
                "", 
                "The text of the code is everything after the string \"code &lt;TAB>\"."
              ], 
              "method": "GET", 
              "dialog": [
                {
                  "request": {
                    "name": "the code definition"
                  }, 
                  "responses": [
                    {
                      "status": 200, 
                      "body": [
                        "The code element adds functionality to the method element.", 
                        "", 
                        "The code element contains programming text.  ApiTxt comes integrated with the PHP project the Slim Framework v2.  The conversion to working PHP adds boilerplate details for routes and method, with named parameters and query parameters available as functional variables.", 
                        "", 
                        "The text of the code is everything after the string \"code <TAB>\"."
                      ], 
                      "type": "text/plain"
                    }
                  ]
                }
              ], 
              "name": "Get code definition"
            }
          ]
        }
      ], 
      "group": "apitxt", 
      "html": "<p>root, group, route, parameter, method, request, response, header, line, code, and body.</p>\n<ul>\n<li>Source: <a href=\"../src/apitxt.txt\">ApiTxt format</a> and <a href=\"../src/apitxt.json\">JSON objects</a></li>\n<li>Documents: <a href=\"../doc/apitxt.md\">API Blueprint</a> and <a href=\"../doc/apitxt.htm\">Stand Alone HTML</a></li>\n<li>Live Page: <a href=\"../api/apitxt.html\">API Interface</a> and <a href=\"../api/apitxt.js\">JavaScript</a></li>\n</ul>", 
      "lines": [
        "root, group, route, parameter, method, request, response, header, line, code, and body.", 
        "", 
        "+ Source: [ApiTxt format](../src/apitxt.txt) and [JSON objects](../src/apitxt.json)", 
        "+ Documents: [API Blueprint](../doc/apitxt.md) and [Stand Alone HTML](../doc/apitxt.htm)", 
        "+ Live Page: [API Interface](../api/apitxt.html) and [JavaScript](../api/apitxt.js)"
      ], 
      "description": "ApiTxt uses eleven types of element to define an API."
    }
  ], 
  "root": "index"
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
      m("h1","SignPuddle 3 API"),
      m.trust(data["html"]),
      m("p",[
        m("label.large[for=host]","Server Host"),
        m("input#host.medium[type=text][name=host]",{
          "value":host,
          onchange: function(e){host=e.target.value;}
        })
      ])
    ])
  }
}
var Group = {
  view: function(vnode) {
    var iG = vnode.attrs["iG"];
    return m("section.boxed",[
      m("header.group",[
        m("span]"),
        m("h1","Group " + vnode.attrs["group"]["group"]),
        m("span")
      ]),
      m("p",vnode.attrs["group"]["description"]),
      m.trust(vnode.attrs["group"]["html"]),
      vnode.attrs["group"]["routes"].map(function(route,iR){
        return [
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
        ]
      })
    ])
  }
}

m.mount(document.body, Main);
