# SignPuddle 3 Portable System

The system directory contains a portable web server for Windows, Linux, and Mac.  The system directory is useful for individual computers or private networks.

For public servers, do not use the system directory, instead use Apache with rewrite rules.  

> AUTHOR: https://SteveSlevinski.me  
> SUPPORT: https://www.patreon.com/signwriting


## Group System Files

+ [rewrite.php](rewrite.php) - Custom rewrite rules for builtin PHP web server
+ [start_system.sh](start_system.sh) - Shell script for Mac and Linux
+ [start_system.bat](start_system.bat) - Batch file for Windows


## Group Project Install

The best way to install SignPuddle 3 is with the command line, either the Windows Command Line (cmd) or a Terminal window for Mac or Linux.

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
# a basic update for an unmodified SignPuddle 3
cd SignPuddle3  
git pull

# an update that keeps local changed
cd SignPuddle3
git stash
git pull
git stash pop
````

## Group Server Configure

The server requires some configuration.

```` shell
# CONFIGURE
cd SignPuddle3/server  
unzip Slim.zip
cd print
unzip vendor.zip
````

For server side printing to PDF, Imagemagick is required with librsvg support

For Mac OS, installing Imagemagick is cumbersome.
1) Install Homebrew. https://brew.sh/ 
2) brew install librsvg
3) brew install ghostscript
4) brew install https://github.com/Homebrew/homebrew-core/raw/46a2ef7c9f0380b8e19f8dfe37270caa27581353/Formula/imagemagick.rb --with-librsvg
5) Install pecl
6) Disable Mac SIP
7) pecl install imagic


## Group Start the System

Use the command line to start the system.

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


## Group Client Configure

The client can be configured by editing the [config](../client/config) directory.

* [setting.js](../client/config/settings.js) - main configuration settings with initial state
* [world.js](../client/config/world.js) - information about countries and languages
* [interface-sp3.json](../client/config/interface-sp3.json) - default user interface language
* [alphabet.json](../client/config/alphabet.json) - default symbol set of the ISWA 2010
