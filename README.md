# ApiTxt
> v1.0.0  
HOST: https://signpuddle.com/apitxt/

ApiTxt defines a highly structured plain text format used to define multiple facets of a website api.
Each line in an ApiTxt document is a self-contained element which starts with a name and is followed by &lt;TAB> separated fields.
Writing ApiTxt documents is easier when tabs and spaces appear different, so use a plain text editor and turn on the invisible characters option.

## ApiTxt Elements
ApiTxt uses ten types of line elements to define an API: 
root, group, route, parameter, method, request, response, header, line, and code.

Every document should start with a root element.
After the root, the other elements are used to create complex website APIs.
The order of the lines matters and will effect the structure of the JSON objects.

There are two groups of elements, the frame elements and the detail elements.
The frame elements structure a website api and the detail elements attach to a previous frame element.

### Frame elements
There are six frame elements: root, group, route, method, request, and response.
The lines are written in a specific order to create an array of JSON objects.

**route organization**

An ApiTxt document starts with a root, or an assumed root.
Any route that occur before a group element, will be associated with the root.
Groups are always associated with the root.
Group elements can contain routes.

```
    root
      | - routes
      | - groups
            | - routes
```

**route structure**

A route can be associated with a variety of HTTP methods.
Each method can have several requests and responses.
Any response before a request will assume a generic request.
Any response after a request will be associated with that request.
```
    route
      | - methods
        | - responses
        | - requests
              | - responses
```
## Detail elements
There are four detail elements: line, code, parameter, and header.  The detail lines attach to a previous frame element if correctly structured.

**single line elements**
```
    lines for all frame elements

    parameters for route

    codes for method

    headers for request and response
```

## Input and Output Formats
The various formats are used to define the structure and function of a website API.
The original source is written in ApiTxt format and transformed into an array of JSON objects.
The JSON objects are used to write other formats, including API Blueprint.

### ApiTxt Format (txt)
ApiTxt format uses plain text divided into multiple lines, where each line contains &lt;TAB> delimited fields.
Writing ApiTxt documents is easier when tabs and spaces appear different, so use a plain text editor and turn on the invisible characters option.

### Array of JSON Objects (json)
Each line of ApiTxt format is converted into a JSON object or added to an existing object.  The various objects are stored in an ordered array.

### API Blueprint (md)
[API Blueprint](https://apiblueprint.org/) is a high-level API description language for web APIs. API Blueprint is widely supported with various tooling available.

#### HTML Documentaion (html)
The HTML documentation is generated from the API Blueprint document using the project [bukalapak/snowboard](https://github.com/bukalapak/snowboard/), written in golang.

#### PHP Server (php)
The PHP server is written for the PHP project [Slim Framework v2](https://docs.slimframework.com/) to create the functional web API.
The website directory contains an .htaccess file for an Apache server with PHP support.
Alternatively, the server can be started with a shell script (start_server.sh) using PHP's built in web server and a custom rewrite.php file.

## Filesystem
```
    README.md
    docs
      | - Project Documentation as HTML, Markdown, JSON Objects, and ApiTxt format
    source
      | - Documents in sections of ApiTxt format
    tools
      | - Python scripts
      | - template
      | - output
            | - various files with extensions txt, json, md, and html
    website
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
GET	200	/root
GET	200	/group
GET	200	/route
GET	200	/parameter
GET	200	/method
GET	200	/request
GET	200	/response
GET	200	/header
GET	200	/line
GET	200	/code
```

With the **-w** option, the HTML, Markdown, JSON Objects, and ApiTxt format files are copied to the **website** directory.  

With the **-p** option, the PHP server is built and placed in the **website** directory.  

With the **-m** option, the Snowboard mock server is called last.  The server can be accessed using a URL such as "127.0.0.1.8087/root" or using one of the other listed routes.


### Website Directory
The website is built with a fully functional web API in PHP using the Slim Framework v2.  Make sure to unzip the **Slim.zip** file to use the PHP Server.

The PHP Server requires an Apache webserver that can use rewrite rules written in the **.htaccess** file.  

Alternatively, you can start the built-in PHP webserver using the **website/start_server.sh** shell script which uses the rewrite rules contained in the **website/include/rewrite.php** file.


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
