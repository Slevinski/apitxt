# SignPuddle Development

+ [README.md](README.md) - Markdown version
+ [index.html](index.html) - HTML version

Welcome to the top page of the ApiTxt Project: a custom build environment for the development of SignPuddle 3 and other RESTful APIs.  

> ApiTxt Project: v3.0.0-alpha  
>
> ONLINE: https://signpuddle.com  
> DOWNLOAD: https://github.com/Slevinski/apitxt/archive/master.zip  
> REPO: https://github.com/slevinski/apitxt
>
> AUTHOR: https://SteveSlevinski.me  
> SUPPORT: https://www.patreon.com/signwriting

## Group Background

A [general introduction](https://slevinski.github.io/SuttonSignWriting/guide.html) to the foundational technologies of SignWriting is available in the Sutton SignWriting Project: [online](https://slevinski.github.io/SuttonSignWriting), [download](https://github.com/Slevinski/SuttonSignWriting/archive/master.zip), and [repo](https://github.com/Slevinski/SuttonSignWriting/).

SignPuddle 3 is a two-part project: the front-end for the average user and the back-end for the developer and power user.

The ApiTxt Project uses automated scripts to build both the front-end and the back-end of SignPuddle 3.

The ApiTxt Format is a custom text markup used to define a RESTful API.


## Group Status
SignPuddle 3 is currently in alpha release.  It is under active development with rudimentary structures, basic outlines, and various functionality.  Some of the details will change.  This project is currently recommended for developers and power users.  

The [front-end](front) is available for preview, with some structure to demo.  The front-end includes [developer documentation](front/doc) and [basic tools](front/api) for accessing the back-end API.

The [back-end](back) is available for use, with [some functionality](front/doc).  Standard GET requests can be typed in any browser URL, such as [http://signpuddle.com/back/fsw/svg/S10000](http://signpuddle.com/back/fsw/svg/S10000).  The server can be accessed using JavaScript with the HTTP methods of GET, POST, PUT, and DELETE.  Additionally, the front-end [API pages](front/api) provide total access and full details of live server requests.

```
The ApiTxt Project is divided into four sections:

  front
    | - HTML, CSS, and JavaScript
  back
    | - PHP Server or Apache
  source
    | - ApiTxt Format
  tools
    | - Python scripts and shell scripts 

The tools use the source to create the front and back.
```


## Group Front

Most users will access SignPuddle 3 with the front section: a combination of HTML, CSS, and JavaScript.  The front section presents information graphically.

The front section can be used online or downloaded as part of the ApiTxt project.  The front section can be opened using the file system and any standard browser.

### Application
* [front](front)
* [https://SignPuddle.com/front](https://signpuddle.com/front)

### Resources
+ Source: [ApiTxt format](front/src/index.txt) and [JSON objects](front/src/index.json)
+ Documents: [API Blueprint](front/doc/index.md) and [Stand Alone HTML](front/doc/index.htm)
+ Live Page: [API Interface](front/api/index.html) and [JavaScript](front/api/index.js)


## Group Back
The back section is a functional RESTful API written in PHP using the Slim Framework v2.  To install, download the ApiTxt Project and unzip the **back/Slim.zip** file.

The back section requires an Apache webserver that can use rewrite rules.  The rules are written in the **back/.htaccess** file.  

Alternatively, the back section can use the built-in PHP webserver.  To start both the front and the back, use the **start_server.sh** file on Mac and Linux or use the **start_server.bat** file on Windows.  The rewrite rules are written in the **rewrite.php** file.

### Application
* [back](back)
* [https://SignPuddle.com/back](https://signpuddle.com/back)

## Group Source

Document segments are written in the [source](source) directory using [ApiTxt Format](front/doc/apitxt.htm): a highly structured plain text markup that fully defines a RESTful API. Each line in an ApiTxt document is a self-contained element which starts with a name and is followed by &lt;TAB> separated fields.

ApiTxt Format uses eleven types of element to define an RESTful API: root, group, route, parameter, method, request, response, header, line, code, and body.


## Group Tools
Python programs and shell scripts are used to read and write a variety of data formats including ApiTxt Format, JSON data, API Blueprint, HTML, JavaScript, and PHP scripts.

* txt2json.py - From ApiTxt Format to an array of JSON objects.
* json2txt.py - From an array of JSON objects back to ApiTxt Format.
* json2md.py - From an array of JSON objects to API Blueprint written in markdown.
* json2php.py - From an array of JSON objects to a functional PHP server using the Slim Framework v2.
* json2html.py - From an array of JSON objects to API Interface.
* json2js.py - From an array of JSON objects to JavaScript.


All of the tools use command line arguments.  Use -h for help.

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

### Make and Build
The **tools/make.sh** file is used to create the build script.

The **tools/build.sh** file is used to create the front and back sections.

### Snowboard ([bukalapak/snowboard](https://github.com/bukalapak/snowboard/))
Used in the build script, snowboard can parse API Blueprint documents.  Snowboard offers three different transformations: lint, html, and mock.
Snowboard lint will check the structure of the markdown text and report errors.
Snowboard html will create a stand-alone html document using a template.
Snowboard mock will analyze the responses of the markdown document and serve static responses over HTTP.


## Group About
> AUTHOR: https://SteveSlevinski.me  
> SUPPORT: https://www.patreon.com/signwriting


## Epilogue
This is a work in progress. Feedback, bug reports, and patches are welcomed.


## License
MIT

## To Do
* Searching for SignWriting in Unicode (SWU) with SQLite
* Editing the various languages for the user interface
* Convert PDF printing to the SignPuddle 3 databases
* Editing dictionaries and individual signs
* Writing and editing literature 

## Version History
* v3.0.0-alpha - Sept 14th, 2018: first release on SignPuddle.com
* v1.0.0 - Sept 28th, 2017: initial release 
