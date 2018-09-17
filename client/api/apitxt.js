var spVersion = "3";
host = host?host:"https://signpuddle.com/server";
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var data = {
  "title": "ApiTxt", 
  "lines": [
    "> v2.0.0", 
    "", 
    "ApiTxt is the build environment to create the SignPuddle 3 API for SignWriting Text.", 
    "ApiTxt format is a highly structured plain text format that defines multiple facets of a website api.", 
    "", 
    "A variety of python programs and shell scripts are used to transform the source ApiTxt format into a fully functional and documented website.", 
    "", 
    "## Input and Output Formats", 
    "The various formats are used to define the structure and function of a website API.", 
    "The original source is written in ApiTxt format and transformed into an array of JSON objects.", 
    "The JSON objects are used to write other formats, including API Blueprint.", 
    "API Blueprint has an extensive toolkit of additional transformations.", 
    "", 
    "### ApiTxt Format (txt)", 
    "ApiTxt defines a highly structured plain text format used to define multiple facets of a website api.", 
    "Each line in an ApiTxt document is a self-contained element which starts with a name and is followed by &lt;TAB> separated fields.", 
    "Writing ApiTxt documents is easier when tabs and spaces appear different, so use a plain text editor and turn on the invisible characters option.", 
    "", 
    "### Array of JSON Objects (json)", 
    "Each line of ApiTxt format is converted into a JSON object or added to an existing object.", 
    "The various objects are stored as an ordered array.", 
    "The JSON array of objects can be reduced to the root object by appropriately structuring the groups, routes, and methods.", 
    "", 
    "```", 
    "    root", 
    "      | - routes", 
    "            | - methods", 
    "      | - groups", 
    "            | - routes", 
    "                  | - methods", 
    "```", 
    "", 
    "", 
    "### API Blueprint (md)", 
    "[API Blueprint](https://apiblueprint.org/) is a high-level API description language for web APIs. API Blueprint is widely supported with various tooling available.", 
    "", 
    "### Stand-Alone HTM Documentation (htm)", 
    "Stand-alone HTM document created from the API Blueprint using a template and the snowboard tool.", 
    "", 
    "### Interactive HTML API (html)", 
    "Interactive HTML documentation is generated from the JSON elements.", 
    "", 
    "### PHP Server (php)", 
    "The PHP server is written for the PHP project [Slim Framework v2](https://docs.slimframework.com/) to create the functional web API.", 
    "The website directory contains an .htaccess file for an Apache server with PHP support.", 
    "Alternatively, the server can be started with a shell script (start_server.sh) using PHP's built in web server and a custom rewrite.php file.", 
    ""
  ], 
  "html": "<blockquote>\n<p>v2.0.0</p>\n</blockquote>\n<p>ApiTxt is the build environment to create the SignPuddle 3 API for SignWriting Text.\nApiTxt format is a highly structured plain text format that defines multiple facets of a website api.</p>\n<p>A variety of python programs and shell scripts are used to transform the source ApiTxt format into a fully functional and documented website.</p>\n<h2>Input and Output Formats</h2>\n<p>The various formats are used to define the structure and function of a website API.\nThe original source is written in ApiTxt format and transformed into an array of JSON objects.\nThe JSON objects are used to write other formats, including API Blueprint.\nAPI Blueprint has an extensive toolkit of additional transformations.</p>\n<h3>ApiTxt Format (txt)</h3>\n<p>ApiTxt defines a highly structured plain text format used to define multiple facets of a website api.\nEach line in an ApiTxt document is a self-contained element which starts with a name and is followed by &lt;TAB&gt; separated fields.\nWriting ApiTxt documents is easier when tabs and spaces appear different, so use a plain text editor and turn on the invisible characters option.</p>\n<h3>Array of JSON Objects (json)</h3>\n<p>Each line of ApiTxt format is converted into a JSON object or added to an existing object.\nThe various objects are stored as an ordered array.\nThe JSON array of objects can be reduced to the root object by appropriately structuring the groups, routes, and methods.</p>\n<p><pre><code>root\n      | - routes\n            | - methods\n      | - groups\n            | - routes\n                  | - methods</code></pre></p>\n<h3>API Blueprint (md)</h3>\n<p><a href=\"https://apiblueprint.org/\">API Blueprint</a> is a high-level API description language for web APIs. API Blueprint is widely supported with various tooling available.</p>\n<h3>Stand-Alone HTM Documentation (htm)</h3>\n<p>Stand-alone HTM document created from the API Blueprint using a template and the snowboard tool.</p>\n<h3>Interactive HTML API (html)</h3>\n<p>Interactive HTML documentation is generated from the JSON elements.</p>\n<h3>PHP Server (php)</h3>\n<p>The PHP server is written for the PHP project <a href=\"https://docs.slimframework.com/\">Slim Framework v2</a> to create the functional web API.\nThe website directory contains an .htaccess file for an Apache server with PHP support.\nAlternatively, the server can be started with a shell script (start_server.sh) using PHP's built in web server and a custom rewrite.php file.</p>", 
  "host": "https://signpuddle.com/server", 
  "meta": "Generated from ApiTxt format (output/apitxt.txt) using txt2json.py", 
  "groups": [
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
              "html": "<p>Every document should start with a root element.</p>\n<p><strong>root line</strong></p>\n<p>root &lt;TAB&gt; name &lt;TAB&gt; title &lt;TAB&gt; host</p>\n<ul>\n<li>field 1 - name - uniquely identifies a document</li>\n<li>field 2 - title - name of the document</li>\n<li>field 3 - host - website URL</li>\n</ul>\n<p><strong>root example</strong></p>\n<p>root &lt;TAB&gt; apitxt &lt;TAB&gt; ApiTxt &lt;TAB&gt; https://signpuddle.com/apitxt</p>\n<p><strong>root line relationships</strong></p>\n<p><pre><code>root\n     | - lines\n     | - routes\n     | - groups</code></pre></p>\n<p><strong>root object</strong></p>\n<p><pre><code>json\n{\"root\":\n  \"root\" : field[1],\n  \"title\" : field[2],\n  \"host\" : field[3],\n  \"lines\" : []\n}</code></pre></p>", 
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
                "{\"root\":", 
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
                        "{\"root\":", 
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
              "html": "<p>The group organizes resources into sections</p>\n<p><strong>group line</strong></p>\n<p>group &lt;TAB&gt; name &lt;TAB&gt; description</p>\n<ul>\n<li>field 1 - name - the short name used for sections</li>\n<li>field 2 - description - information about the group</li>\n</ul>\n<p><strong>group example</strong></p>\n<p>group &lt;TAB&gt; Section name &lt;TAB&gt; an example section</p>\n<p><strong>group line relationships</strong></p>\n<p><pre><code>group\n     | - lines\n     | - routes</code></pre></p>\n<p><strong>group object</strong></p>\n<p><pre><code>json\n{\"group\":\n  \"group\" : field[1],\n  \"description\" : field[2],\n  \"lines\": []\n}</code></pre></p>", 
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
                "{\"group\":", 
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
                        "{\"group\":", 
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
              "html": "<p>The route element allows access to a resource</p>\n<p><strong>route line</strong></p>\n<p>route &lt;TAB&gt; URI template &lt;TAB&gt; name &lt;TAB&gt; description</p>\n<ul>\n<li>field 1 - URI template - a resource pattern with parameters</li>\n<li>field 2 - name - the route name must be unique</li>\n<li>field 3 - description - information about the resource</li>\n</ul>\n<p><strong>route example</strong></p>\n<p>route &lt;TAB&gt; /example &lt;TAB&gt; an example route &lt;TAB&gt; a description of the route</p>\n<p><strong>route line relationships</strong></p>\n<p><pre><code>route\n     | - lines\n     | - parameters\n     | - methods</code></pre></p>\n<p><strong>route object</strong></p>\n<p><pre><code>json\n{\"route\":\n  \"route\" : field[1],\n  \"name\" : field[2],\n  \"description\" : field[3],\n  \"lines\": [],\n  \"parameters\": []\n}</code></pre></p>", 
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
                "{\"route\":", 
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
                        "{\"route\":", 
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
  "root": "apitxt"
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
      m("h1","ApiTxt"),
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
