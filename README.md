# SignPuddle Development System
> SignPuddle API for SignWriting Text  
ApiTxt v2.0.0  
HOME: https://signpuddle.com  
AUTHOR: https://SteveSlevinski.me  
SUPPORT: https://www.patreon.com/signwriting


## Group Filesystem
ApiTxt uses several directories for structure

root, group, route, parameter, method, request, response, header, line, code, and body.

## Filesystem
```
    README.md
    source
      | - Documents in sections of ApiTxt format
    tools
      | - Python scripts
      | - template
      | - output
            | - various files with extensions txt, json, md, and html
    front
      | - HTML, CSS, and JavaScript pages
    back
      | - Slim Framework v2
      | - PHP Server generated from ApiTxt Format
```

### Source Directory
Documents are written in the **source/** directory.  Every document file is written using a name without spaces or dashes (-).  The document section that contains the root element is written as **document-root.txt**.  Additional sections use an additional name that describes the contents of the section, such as **document-elements.txt** or **document-test.txt**.

## Tools Directory
Python programs and shell scripts are used to read and write a variety of data formats including plain text, JSON data, API Blueprint, HTML and PHP scripts.

* txt2json.py - From ApiTxt format to an array of JSON objects.
* json2txt.py - From an array of JSON objects back to ApiTxt format.
* json2md.py - From an array of JSON objects to API Blueprint written in markdown.
* json2php.py - From an array of JSON ojects to a functional PHP server using the Slim Framework v2.

All of the tools use command line arguements.  Use -h for help.

```
python txt2json.py -h
usage: txt2json.py [-h] [-i INPUT] [-o OUTPUT] [-e]

Conversion of plain text lines to an array of JSON objects

optional arguments:
  -h, --help            show this help message and exit
  -i INPUT, --input INPUT
                        name of input file
  -o OUTPUT, --output OUTPUT
                        write to output file
  -e, --errors          check for errors and report
```

### Full Mocking
The full mocking script uses the previous tools, shell commands, and multiple calls to [bukalapak/snowboard](https://github.com/bukalapak/snowboard/). 
* txt2mock.py - From ApiTxt format to two mock servers.

Running the full mocking script without any command line arguements will analyze the **source/** directory and return options.

```
>> python txt2mock.py 

Please specify a document from ../source/
    python txt2mock.py -d apitxt
    python txt2mock.py -d apitxt -r -s "elements test"
```

Running the full mocking script with the appropriate arguements will test and build the web api.
```
>> python txt2mock.py -d apitxt -r -s "elements files" -w -p -m
ApiTxt Format
OK

Nicely formatted!

Snowboard Lint
OK

Mock server is ready. Use 127.0.0.1:8087
Available Routes:
GET&#9;200&#9;/root
GET&#9;200&#9;/group
GET&#9;200&#9;/route
GET&#9;200&#9;/parameter
GET&#9;200&#9;/method
GET&#9;200&#9;/request
GET&#9;200&#9;/response
GET&#9;200&#9;/header
GET&#9;200&#9;/line
GET&#9;200&#9;/code
```

With the **-w** option, the HTML, Markdown, JSON Objects, and ApiTxt format files are copied to the **website** directory.  

With the **-p** option, the PHP server is built and placed in the **website** directory.  

With the **-m** option, the Snowboard mock server is called last.  The server can be accessed using a URL such as "127.0.0.1.8087/root" or using one of the other listed routes.


### Website Directory
The website is built with a fully functional web API in PHP using the Slim Framework v2.  Make sure to unzip the **Slim.zip** file to use the PHP Server.

The PHP Server requires an Apache webserver that can use rewrite rules written in the **.htaccess** file.  

Alternatively, you can start the built-in PHP webserver using the **website/start_server.sh** shell script which uses the rewrite rules contained in the **website/include/rewrite.php** file.

## Group Resources

+ [txt](website/src/apitxt.txt) - ApiTxt format
+ [json](website/src/apitxt.json) - array of JSON objects
+ [html](website/api/apitxt.html) - HTML API Interface
+ [md](website/doc/apitxt.md) - API Blueprint
+ [htm](website/doc/apitxt.htm) - Stand Alone HTML

ApiTxt is the build environment to create the SignPuddle 3 API for SignWriting Text.
ApiTxt format is a highly structured plain text format that defines multiple facets of a website api.

A variety of python programs and shell scripts are used to transform the source ApiTxt format into a fully functional and documented website.

## Input and Output Formats
The various formats are used to define the structure and function of a website API.
The original source is written in ApiTxt format and transformed into an array of JSON objects.
The JSON objects are used to write other formats, including API Blueprint.
API Blueprint has an extensive toolkit of additional transformations.

### ApiTxt Format (txt)
ApiTxt defines a highly structured plain text format used to define multiple facets of a website api.
Each line in an ApiTxt document is a self-contained element which starts with a name and is followed by &lt;TAB> separated fields.
Writing ApiTxt documents is easier when tabs and spaces appear different, so use a plain text editor and turn on the invisible characters option.

### Array of JSON Objects (json)
Each line of ApiTxt format is converted into a JSON object or added to an existing object.
The various objects are stored as an ordered array.
The JSON array of objects can be reduced to the root object by appropriately structuring the groups, routes, and methods.

```
    root
      | - routes
            | - methods
      | - groups
            | - routes
                  | - methods
```


### API Blueprint (md)
[API Blueprint](https://apiblueprint.org/) is a high-level API description language for web APIs. API Blueprint is widely supported with various tooling available.

### Stand-Alone HTM Documentation (htm)
Stand-alone HTM document created from the API Blueprint using a template and the snowboard tool.

### Interactive HTML API (html)
Interactive HTML documentation is generated from the JSON elements.

### PHP Server (php)
The PHP server is written for the PHP project [Slim Framework v2](https://docs.slimframework.com/) to create the functional web API.
The website directory contains an .htaccess file for an Apache server with PHP support.
Alternatively, the server can be started with a shell script (start_server.sh) using PHP's built in web server and a custom rewrite.php file.

## Transformations
Python programs and shell scripts are used to read and write a variety of data formats including plain text, JSON data, API Blueprint, HTML and PHP scripts.

### Plain Text to JSON Objects (txt2json)
The primary transformation is from the plain text format to an array of JSON objects.

### JSON Objects back to Plain Text (json2txt)
The transformation can be reversed, resulting in a document that is properly structured with standardized indenting.

### JSON Objects to API Blueprint (json2md)
The API Blueprint document is created from an array of JSON objects.
Each object is written as a section of the API Blueprint document using a markdown syntax.

### JSON Objects to PHP Server (json2php)
A functional PHP server is built from the JSON objects for the Slim Framework v2.
The server responses can be based on prewritten responses or functional PHP code using URL parameters and query parameters.

### JSON Objects to Interactive HTML Page (json2html)
A functional reference guide with live calls to the server.
Detailed reports for requests and responses.

### JSON Objects to Javascript (json2js)
The interactive Javascript for the user interface and the server calls.
Detailed reports for requests and responses.

### Snowboard Transformations ([bukalapak/snowboard](https://github.com/bukalapak/snowboard/))
Part of the API Blueprint toolkit, snowboard offers three different transformations: lint, html, and mock.
Snowboard lint will check the structure of the markdown text and report errors.
Snowboard html will create a stand-alone html document using a template.
Snowboard mock will analyze the responses of the markdown document and serve static responses over HTTP.



## Group About


## Author

Stephen E Slevinski Jr  
slevin@signpuddle.net  
http://slevinski.github.io  
http://www.slideshare.net/StephenSlevinski/presentations  


## Epilogue
This is a work in progress. Feedback, bug reports, and patches are welcomed.


## License
MIT

## To Do
* additional transformations
* * json2curl.py - from an array of JSON objects to a shell script using curl to make requests and curl-trace-parser to reformat the curl output

## Version History
* 1.0.0 - Sept 28th, 2017: v1.0 initial release 


