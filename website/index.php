<?php
/**
* API v1.0.0
* generated with tools/json2php.py from https://github.com/Slevinski/apitxt
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('X-Powered-By: API Structure');


$_ENV['SLIM_MODE'] = 'development'; //'development' or 'production'
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->configureMode('production', function () use ($app) {
    error_reporting(E_NONE);
    ini_set('display_errors', 0);
    $app->config(array(
        'log.enable' => true,
        'debug' => false,
        'entry_limit' => 100
    ));
});

$app->configureMode('development', function () use ($app) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    $app->config(array(
        'log.enable' => false,
        'debug' => true,
        'entry_limit' => 100
    ));
});

/********************/
/* common functions */

function searchtime($timein){
  return intval((microtime(true)-$timein)*1000*100)/100 . ' ms';
}
function getFile($file){
  global $app;
  $parts = explode('.',$file);
  $rel_api = $file;
  $abs_api = dirname(__FILE__) . '/' . $rel_api;
  if ($parts[1] != 'php' && $file != 'Slim' && file_exists($abs_api)){
    switch ($parts[1]){
      case 'db':
        $app->contentType('application/x-sqlite3');
        $app->response->headers->set('Content-Disposition','attachment; filename=' . pathinfo($app->request->getResourceUri(),PATHINFO_FILENAME) . '.db');
        break;
      case 'html':
        $app->contentType('text/html;charset=utf-8');
        break;
      case 'js':
        $app->contentType('application/json;charset=utf-8');
        break;
      default:
        $app->contentType('text/plain;charset=utf-8');
        break;
    }
    echo file_get_contents($rel_api);
  } else {
    $app->notFound();
  }
}

function echoFile($file){
  $handle = fopen($file, 'r');
  if ($handle) {
    while (($line = fgets($handle)) !== false) {
      echo $line;
    }
    fclose($handle);
  }
}
/**********/
// ## Group elements
// ApiTxt uses ten types of element to define an API.
$app->get('/root', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'Every document should start with a root element.' . "\n";
  echo '' . "\n";
  echo '**root line**' . "\n";
  echo '' . "\n";
  echo 'root	name	title	host' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - uniquely identifies a document' . "\n";
  echo '+ field 2 - title - name of the document' . "\n";
  echo '+ field 3 - host - website URL' . "\n";
  echo '' . "\n";
  echo '**example**' . "\n";
  echo '' . "\n";
  echo 'root	apitxt	ApiTxt	https://signpuddle.com/apitxt' . "\n";
  echo '' . "\n";
  echo '' . "\n";
  echo '**root line relationships**' . "\n";
  echo '```' . "\n";
  echo '    root' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - routes' . "\n";
  echo '     | - groups' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**root object**' . "\n";
  echo '```json' . "\n";
  echo '{"root":' . "\n";
  echo '  "root" : field[1],' . "\n";
  echo '  "title" : field[2],' . "\n";
  echo '  "host" : field[3],' . "\n";
  echo '  "lines" : []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->get('/group', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'The group organizes resources into sections' . "\n";
  echo '' . "\n";
  echo '**group line**' . "\n";
  echo '' . "\n";
  echo 'group	name	description' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - the short name used for sections' . "\n";
  echo '+ field 2 - description - information about the group' . "\n";
  echo '' . "\n";
  echo '**group example**' . "\n";
  echo '' . "\n";
  echo 'group	Section name	an example section' . "\n";
  echo '' . "\n";
  echo '**group line relationships**' . "\n";
  echo '```' . "\n";
  echo '    group' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - routes' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**group object**' . "\n";
  echo '```json' . "\n";
  echo '{"group":' . "\n";
  echo '  "group" : field[1],' . "\n";
  echo '  "description" : field[2],' . "\n";
  echo '  "lines": []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->get('/route', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'The route element allows access to a resource' . "\n";
  echo '' . "\n";
  echo '**route line**' . "\n";
  echo '' . "\n";
  echo 'route	URI template	name	description' . "\n";
  echo '' . "\n";
  echo '+ field 1 - URI template - a resource pattern with parameters' . "\n";
  echo '+ field 2 - name - the route name must be unique' . "\n";
  echo '+ field 3 - description - information about the resource' . "\n";
  echo '' . "\n";
  echo '**route example**' . "\n";
  echo '' . "\n";
  echo 'route	/example	an example route	a description of the route' . "\n";
  echo '' . "\n";
  echo '**route line relationships**' . "\n";
  echo '```' . "\n";
  echo '    route' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - parameters' . "\n";
  echo '     | - methods' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**route object**' . "\n";
  echo '```json' . "\n";
  echo '{"route":' . "\n";
  echo '  "route" : field[1],' . "\n";
  echo '  "name" : field[2],' . "\n";
  echo '  "description" : field[3],' . "\n";
  echo '  "lines": [],' . "\n";
  echo '  "parameters": []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->get('/parameter', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'The parameter element is applied to the previous route' . "\n";
  echo '' . "\n";
  echo '**parameter line**' . "\n";
  echo '' . "\n";
  echo 'parameter	name	example	type	description' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - the name of a parameter for a route' . "\n";
  echo '+ field 2 - example - an example value for the parameter' . "\n";
  echo '+ field 3 - type - the parameter type, such as "string", "number", "string, optional", "string, required"' . "\n";
  echo '+ field 4 - description - information about the parameter' . "\n";
  echo '' . "\n";
  echo '**parameter example**' . "\n";
  echo '' . "\n";
  echo 'parameter	country_code	US	string	the country code of interest' . "\n";
  echo '' . "\n";
  echo '**parameter line relationships**' . "\n";
  echo '' . "\n";
  echo 'parameter lines are added to a parameters array' . "\n";
  echo '' . "\n";
  echo '**parameters array**' . "\n";
  echo '```json' . "\n";
  echo '{"parameters":' . "\n";
  echo '  [' . "\n";
  echo '    {' . "\n";
  echo '      "name" : " field[1],' . "\n";
  echo '      "example" : field[2],' . "\n";
  echo '      "type" : field[3],' . "\n";
  echo '      "description" : field[4]' . "\n";
  echo '    }' . "\n";
  echo '  ]' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->get('/method', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'The method element represents an action that can be performed on a route' . "\n";
  echo '' . "\n";
  echo '**method line**' . "\n";
  echo '' . "\n";
  echo 'method	HTTP method	name	description' . "\n";
  echo '' . "\n";
  echo '+ field 1 - HTTP method - the type of action to perform: GET, POST, PUT, DELETE' . "\n";
  echo '+ field 2 - name - the name of the action' . "\n";
  echo '+ field 3 - description - information about the method' . "\n";
  echo '' . "\n";
  echo '**method example**' . "\n";
  echo '' . "\n";
  echo 'method	GET	Get an example	This method retrieves an example document' . "\n";
  echo '' . "\n";
  echo '**method line relationships**' . "\n";
  echo '```' . "\n";
  echo '    method' . "\n";
  echo '     | - lines' . "\n";
  echo '     | - codes' . "\n";
  echo '     | - requests' . "\n";
  echo '     | - responses' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '' . "\n";
  echo '**method object**' . "\n";
  echo '```json' . "\n";
  echo '{' . "\n";
  echo '  "method" : field[1],' . "\n";
  echo '  "name" : field[2],' . "\n";
  echo '  "description" : field[3],' . "\n";
  echo '  "lines" : [],' . "\n";
  echo '  "codes" : [],' . "\n";
  echo '  "dialog" : [' . "\n";
  echo '    {' . "\n";
  echo '      "request" : {},' . "\n";
  echo '      "responses" : []' . "\n";
  echo '    }' . "\n";
  echo '  ]' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
});

$app->get('/request', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'The request element is associated with a specific method and can be paired with multiple responses.' . "\n";
  echo '' . "\n";
  echo '**request line**' . "\n";
  echo '' . "\n";
  echo 'request	name	type' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - uniquely identifies a request' . "\n";
  echo '+ field 2 - type - the content type of the request body' . "\n";
  echo '' . "\n";
  echo '**request example**' . "\n";
  echo '' . "\n";
  echo 'request	matching text within request body	plain/text' . "\n";
  echo '' . "\n";
  echo '**request line relationships**' . "\n";
  echo '```' . "\n";
  echo '    request' . "\n";
  echo '     | - headers' . "\n";
  echo '     | - lines' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**request object**' . "\n";
  echo '```json' . "\n";
  echo '{' . "\n";
  echo '  "name" : field[1],' . "\n";
  echo '  "type" : field[2],' . "\n";
  echo '  "headers" : {},' . "\n";
  echo '  "lines" : []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
});

$app->get('/response', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'The response element is associated with a specific request, or associated with a specific method with an assumed generic request.' . "\n";
  echo '' . "\n";
  echo '**response line**' . "\n";
  echo '' . "\n";
  echo 'response	status	type' . "\n";
  echo '' . "\n";
  echo '+ field 1 - status - an HTTP response code indicating the status of the request' . "\n";
  echo '+ field 2 - type - the content type of the response body' . "\n";
  echo '' . "\n";
  echo '**response example**' . "\n";
  echo '' . "\n";
  echo 'response	200	plain/text' . "\n";
  echo '' . "\n";
  echo '**response line relationships**' . "\n";
  echo '```' . "\n";
  echo '    response' . "\n";
  echo '     | - headers' . "\n";
  echo '     | - lines' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
  echo '**response object**' . "\n";
  echo '```json' . "\n";
  echo '{' . "\n";
  echo '  "status" : field[1],' . "\n";
  echo '  "type" : field[2],' . "\n";
  echo '  "headers" : {},' . "\n";
  echo '  "lines" : []' . "\n";
  echo '}' . "\n";
  echo '```' . "\n";
  echo '' . "\n";
});

$app->get('/header', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'The header element is applied to a preceding route' . "\n";
  echo '' . "\n";
  echo '**header line**' . "\n";
  echo '' . "\n";
  echo 'header	name	value' . "\n";
  echo '' . "\n";
  echo '+ field 1 - name - the header variable name' . "\n";
  echo '+ field 2 - value - the header variable value' . "\n";
  echo '' . "\n";
  echo '**header example**' . "\n";
  echo '' . "\n";
  echo 'header	X-Powered-By	ApiTxt' . "\n";
  echo '' . "\n";
  echo '**header object**' . "\n";
  echo '```json' . "\n";
  echo '{ field[1] : field[2] }' . "\n";
  echo '```' . "\n";
});

$app->get('/line', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'The line element adds additional text to frame elements.' . "\n";
  echo '' . "\n";
  echo 'For the root, group, route, and method, the lines add details to an element.  For the request and response elements, the line represents the body of the request or response.' . "\n";
  echo '' . "\n";
  echo 'The text of the line is everything after the string "line <TAB>".' . "\n";
});

$app->get('/code', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'The code element adds functionality to the method element.' . "\n";
  echo '' . "\n";
  echo 'The code element contains programming text.  ApiTxt comes integrated with the PHP project the Slim Framework v2.  The conversion to working PHP adds boilerplate details for routes and method, with named parameters and query parameters available as functional variables.' . "\n";
  echo '' . "\n";
  echo 'The text of the code is everything after the string "code <TAB>".' . "\n";
});

/**********/
// ## Group nofiles
$app->get('/', function () use ($app) {
  $timein = microtime(true);
  $app->contentType('text/plain');
  $searchTime = searchtime($timein);
  header('Search-Time: ' . $searchTime);
  echo 'Routes available' . "\n";
  echo '' . "\n";
  echo '/root' . "\n";
  echo '/group' . "\n";
  echo '/route' . "\n";
  echo '/parameter' . "\n";
  echo '/method' . "\n";
  echo '/request' . "\n";
  echo '/response' . "\n";
  echo '/header' . "\n";
  echo '/line' . "\n";
  echo '/code' . "\n";
  echo '' . "\n";
  echo '# ApiTxt' . "\n";
  echo '> v1.0.0' . "\n";
  echo '' . "\n";
  echo '+ [txt](index.txt) - ApiTxt format' . "\n";
  echo '+ [json](index.json) - array of JSON objects' . "\n";
  echo '+ [md](index.md) - API Blueprint' . "\n";
  echo '+ [html](index.html) - HTML documentation' . "\n";
  echo '' . "\n";
  echo '' . "\n";
  echo 'ApiTxt defines a highly structured plain text format used to define multiple facets of a website api.' . "\n";
  echo 'Each line in an ApiTxt document is a self-contained element which starts with a name and is followed by &lt;TAB> separated fields.' . "\n";
  echo 'Writing ApiTxt documents is easier when tabs and spaces appear different, so use a plain text editor and turn on the invisible characters option.' . "\n";
  echo '' . "\n";
  echo '## Input and Output Formats' . "\n";
  echo 'The various formats are used to define the structure and function of a website API.' . "\n";
  echo 'The original source is written in ApiTxt format and transformed into an array of JSON objects.' . "\n";
  echo 'The JSON objects are used to write other formats, including API Blueprint.' . "\n";
  echo '' . "\n";
  echo '### ApiTxt Format (txt)' . "\n";
  echo 'ApiTxt format uses plain text divided into multiple lines, where each line contains &lt;TAB> delimited fields.' . "\n";
  echo 'Writing ApiTxt documents is easier when tabs and spaces appear different, so use a plain text editor and turn on the invisible characters option.' . "\n";
  echo '' . "\n";
  echo '### Array of JSON Objects (json)' . "\n";
  echo 'Each line of ApiTxt format is converted into a JSON object or added to an existing object.  The various objects are stored in an ordered array.' . "\n";
  echo '' . "\n";
  echo '### API Blueprint (md)' . "\n";
  echo '[API Blueprint](https://apiblueprint.org/) is a high-level API description language for web APIs. API Blueprint is widely supported with various tooling available.' . "\n";
  echo '' . "\n";
  echo '#### HTML Documentaion (html)' . "\n";
  echo 'The HTML documentation is generated from the API Blueprint document using the project [bukalapak/snowboard](https://github.com/bukalapak/snowboard/), written in golang.' . "\n";
  echo '' . "\n";
  echo '#### PHP Server (php)' . "\n";
  echo 'The PHP server is written for the PHP project [Slim Framework v2](https://docs.slimframework.com/) to create the functional web API.' . "\n";
  echo 'The website directory contains an .htaccess file for an Apache server with PHP support.' . "\n";
  echo 'Alternatively, the server can be started with a shell script (start_server.sh) using PHP\'s built in web server and a custom rewrite.php file.' . "\n";
  echo '' . "\n";
  echo '## Transformations' . "\n";
  echo 'Python programs and shell scripts are used to read and write a variety of data formats including plain text, JSON data, API Blueprint, HTML and PHP scripts.' . "\n";
  echo '' . "\n";
  echo '### Plain Text to JSON Objects (txt2json)' . "\n";
  echo 'The primary transformation is from the plain text format to an array of JSON objects.' . "\n";
  echo '' . "\n";
  echo '### JSON Objects back to Plain Text (json2txt)' . "\n";
  echo 'The transformation can be reversed, resulting in a document that is properly structured with standardized indenting.' . "\n";
  echo '' . "\n";
  echo '### JSON Objects to API Blueprint (json2md)' . "\n";
  echo 'The API Blueprint document is created from an array of JSON objects.' . "\n";
  echo 'Each object is written as a section of the API Blueprint document using a markdown syntax.' . "\n";
  echo '' . "\n";
  echo '### JSON Objects to PHP Server (json2php)' . "\n";
  echo 'A functional PHP server is built from the JSON objects for the Slim Framework v2.' . "\n";
  echo 'The server responses can be based on prewritten responses or functional PHP code using URL parameters and query parameters.' . "\n";
  echo '' . "\n";
  echo '### Plain Text to Tested Mock Servers (txt2mock)' . "\n";
  echo 'This script calls the previous scripts to create, check, and build the various website API documents.' . "\n";
  echo 'Multiple calls to [bukalapak/snowboard](https://github.com/bukalapak/snowboard/) are used to check the validity of the API Blueprint, to create the HTML documentation, and to create a mock server.' . "\n";
});

$app->run();
