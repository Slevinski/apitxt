# SignPuddle 3 Development Tools

+ [README.md](README.md) - Markdown version
+ [index.html](index.html) - HTML version

These tools are required for SignPuddle 3 development.  Shell scripts and python scripts automate the building of the client and server applications.  


> ONLINE: https://signpuddle.com  
> DOWNLOAD: https://github.com/Slevinski/apitxt/archive/master.zip  
> REPO: https://github.com/slevinski/apitxt
>
> AUTHOR: https://SteveSlevinski.me  
> SUPPORT: https://www.patreon.com/signwriting

## Background

A [general introduction](https://slevinski.github.io/SuttonSignWriting/guide.html) to the foundational technologies of SignWriting is available in the Sutton SignWriting Project: [online](https://slevinski.github.io/SuttonSignWriting), [download](https://github.com/Slevinski/SuttonSignWriting/archive/master.zip), and [repo](https://github.com/Slevinski/SuttonSignWriting/).

SignPuddle 3 is a two-part project: the client for the average user and the server for the developer and power user.

Automated scripts build both the client and the server of SignPuddle 3.

The ApiTxt Format is a custom text markup used to define a RESTful API.


## Status
SignPuddle 3 is currently in alpha release.  It is under active development with rudimentary structures, basic outlines, and various functionality.  Some of the details will change.  This project is currently recommended for developers and power users.  

The SignPuddle 3 Development Project is divided into five sections.  The **tools** use the **source** to create the **client** and **server**.  The **system** is required if the Apache web server isn't available.

```
  tools
    | - Python scripts and shell scripts 
  source
    | - ApiTxt Format
  client
    | - HTML, CSS, and JavaScript
  server
    | - PHP PHP Server or Apache
  system
    | - Portable web server for Windows, Linux, and Mac 
```

The [client](../client) is available for preview, with some structure to demo.  The client includes [developer documentation](../client/doc) and [basic tools](../client/api) for accessing the server API.

The [server](../server) is available for use, with [some functionality](../client/doc).  Standard GET requests can be typed in any browser URL, such as [http://signpuddle.com/server/fsw/svg/S10000](http://signpuddle.com/server/fsw/svg/S10000).  The server can be accessed using JavaScript with the HTTP methods of GET, POST, PUT, and DELETE.  Additionally, the client [API pages](../client/api) provide total access and full details of live server requests.


## Group Install
SignPuddle 3 can be installed on a computer or USB drive.  The source code is available using [git](https://git-scm.com/).

```` shell
# INSTALL
cd Desktop  

# Either install in a new SignPuddle3 directory
git clone https://github.com/slevinski/apitxt SignPuddle3

# Or install in current directory
git clone https://github.com/slevinski/apitxt .
````

Software updates are also available through git.

```` shell
# UPDATE
cd SignPuddle3  
git pull
````

The server requires some configuration before it can be used.

```` shell
# CONFIGURE
cd SignPuddle3/server  
unzip Slim.zip
````

If an [Apache web server](https://apache.org/) is not available, you can start the system using the [PHP builtin server](https://secure.php.net/manual/en/features.commandline.webserver.php).  While the client code can function without a webserver, the server code requires a web server to function.

```` shell
# START
cd SignPuddle3/system  
  
# Windows  
start_system.bat  

# Mac or Linux  
./start_system.sh  
````

Once started, SignPuddle 3 will be available on the same computer with two default URLs.

+ http://localhost:8888/
+ http://0.0.0.0:8888/

To access SignPuddle 3 on a different computer or device, use the computer's individual IP Address available from the output of the **start_system** script.

```` shell
./start_system.sh
        inet 192.168.254.6 netmask 0xffffff00 broadcast 192.168.254.255
PHP 7.1.16 Development Server started at Wed Sep 19 11:15:04 2018
Listening on http://0.0.0.0:8888
Document root is /Users/slevinski/Desktop/SignPuddle3
Press Ctrl-C to quit.
````

In this example, SignPuddle 3 will be available with this URL.

+ http://192.168.254.6:8888


## Group Client

Most users will access SignPuddle 3 with the client section: a combination of HTML, CSS, and JavaScript.  The client section presents information graphically.

The client section can be used online or downloaded as part of the ApiTxt project.  The client section can be opened using the file system and any standard browser.

### Application
* [client](../client)
* [https://SignPuddle.com/client](https://signpuddle.com/client)

### Resources
+ Source: [ApiTxt format](../client/src/index.txt) and [JSON objects](../client/src/index.json)
+ Documents: [API Blueprint](../client/doc/index.md) and [Stand Alone HTML](../client/doc/index.htm)
+ Live Page: [API Interface](../client/api/index.html) and [JavaScript](../client/api/index.js)


## Group Server
The server section is a functional RESTful API written in PHP using the Slim Framework v2.

The server section requires an Apache webserver that can use rewrite rules.  The rules are written in the **server/.htaccess** file.  

Alternatively, the server section can use the built-in PHP webserver.  See the [system](../system) directory for more information.

### Application
* [server](../server)
* [https://SignPuddle.com/server](https://signpuddle.com/server)

## Group Source

Document segments are written in the [source](../source) directory using [ApiTxt Format](../client/doc/apitxt.htm): a highly structured plain text markup that fully defines a RESTful API. Each line in an ApiTxt document is a self-contained element which starts with a name and is followed by &lt;TAB> separated fields.

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

```` shell
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
````

### Make and Build
The **tools/make.sh** file is used to create the build script.

The **tools/build.sh** file is used to create the client and server sections.

```` shell
cd SignPuddle3/tools
./make.sh
./build.sh
````

### Snowboard ([bukalapak/snowboard](https://github.com/bukalapak/snowboard/))
Used in the build script, snowboard can parse API Blueprint documents.  Snowboard offers three different transformations: lint, html, and mock.
Snowboard lint will check the structure of the markdown text and report errors.
Snowboard html will create a stand-alone html document using a template.
Snowboard mock will analyze the responses of the markdown document and serve static responses over HTTP.


## Group System

The [system directory](../system) contains a portable web server for Windows, Linux, and Mac.  The system directory is useful for individual computers or private networks.

For public servers, do not use the system directory, instead use the [Apache web server](http://apache.org) with rewrite rules.
