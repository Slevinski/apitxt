# SignPuddle 3 Project

Welcome to the SignPuddle 3 alpha release.  

> ONLINE: https://signpuddle.com  
> REPOSITORY: https://github.com/slevinski/apitxt  

> AUTHOR: https://SteveSlevinski.me  
> SUPPORT: https://www.patreon.com/signwriting

## Group Status
SignPuddle 3 is currently in alpha release.  It is under active development with rudimentary structures, basic outlines, and various functionality.  Some of the details will change.  This project is currently recommended for developers and power users.  

The SignPuddle 3 Development Project is divided into five sections.  The **tools** use the **source** to create the **client** and **server**.  The **system** is required if an Apache web server isn't available.


+ [tools](tools) - Development Tools
+ [source](source) - ApiTxt Format documents
+ [client](client) - HTML, CSS, and JavaScript
+ [server](server) - RESTful API written in PHP
+ [system](system) - Portable web server for Windows, Linux, and Mac

The [client](client) is available for preview, with some structure to demo.  The client includes [developer documentation](client/doc) and [basic tools](client/api) for accessing the server API.

The [server](server) is available for use, with [some functionality](client/doc).  Standard GET requests can be typed in any browser URL, such as [http://signpuddle.com/server/fsw/svg/S10000](http://signpuddle.com/server/fsw/svg/S10000).  The server can be accessed using JavaScript with the HTTP methods of GET, POST, PUT, and DELETE.  Additionally, the client [API pages](client/api) provide total access and full details of live server requests.


## Group Epilogue
This is a work in progress. Feedback, bug reports, and patches are welcomed.


## License
MIT

## To Do

* Utilities
** Searching for SignWriting in Unicode (SWU) with SQLite

* General
** update flags
** standardize error responses in JSON
** world.db

* Interface
** request blank
** pull updates
** server side only manager can update interface keys

* Initial UI
** override InterfaceFront.init for hash or state

* User
** register new user

## Version History
* v3.0.0-alpha.6 - Jan 5th, 2019: interface system
* v3.0.0-alpha.5 - Oct 18th, 2018: user login system framework
* v3.0.0-alpha.4 - Sept 20th, 2018: documents for system and tools
* v3.0.0-alpha - Sept 14th, 2018: first release on SignPuddle.com
* v1.0.0 - Sept 28th, 2017: initial release 
