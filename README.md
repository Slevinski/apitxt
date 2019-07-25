# SignPuddle 3 Project

Welcome to the SignPuddle 3 beta release.  

> ONLINE: https://signpuddle.com  
> REPOSITORY: https://github.com/slevinski/apitxt  

> AUTHOR: https://SteveSlevinski.me  
> SUPPORT: https://www.patreon.com/signwriting

## Group Status
SignPuddle 3 is currently in beta release.  We are actively testing the dictionary and interface sections.  Join us on the [SignWriting Email List](http://www.signwriting.org/forums/swlist/) or the public [Sutton SignWriting Facebook Group](https://www.facebook.com/groups/SuttonSignWriting/) for general discussion.  Visit the [SignPuddle 3 GitHub repository](https://github.com/slevinski/apitxt) for source code and technical issues.

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

* searching filter

* Other SP2 features

* SignText
** signmaker
** searching
** fingerspelling


* Interface
** request blank
** server side only manager can update interface keys

* Dictionary
** request public, practice, and others

* User
** register new user

* security db
** update default files

* Images
** unused checking
** remove images on entry delete

## Version History
* v3.0.0-beta.6 - Jul 25, 2019: SWU documents, tools, and server
* v3.0.0-beta.5 - Jul 12, 2019: caching and other fixes
* v3.0.0-beta.1 - Jun 27, 2019: first beta release
* v3.0.0-alpha.22 - Jun 6th, 2019: image uploads
* v3.0.0-alpha.18 - May 23rd, 2019: signmaker complete
* v3.0.0-alpha.17 - May 2nd, 2019: dictionary entry editing and signmaker
* v3.0.0-alpha.15 - Apr 19th, 2019: detail view and images
* v3.0.0-alpha.13 - Apr 19th, 2019: term and sign searching
* v3.0.0-alpha.11 - Apr 11th, 2019: server side PDF printing
* v3.0.0-alpha.7 - Apr 4th, 2019: dictionary section preview
* v3.0.0-alpha.6 - Jan 5th, 2019: interface system
* v3.0.0-alpha.5 - Oct 18th, 2018: user login system framework
* v3.0.0-alpha.4 - Sept 20th, 2018: documents for system and tools
* v3.0.0-alpha - Sept 14th, 2018: first release on SignPuddle.com
* v1.0.0 - Sept 28th, 2017: initial release 
