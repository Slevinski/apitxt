FORMAT: X-1A
HOST: https://signpuddle.com/server

# SignPuddle 3 API
> v3.0.0

+ Source: [ApiTxt format](../src/index.txt) and [JSON objects](../src/index.json)
+ Documents: [API Blueprint](../doc/index.md) and [Stand Alone HTML](../doc/index.htm)
+ Live Page: [API Interface](../api/index.html) and [JavaScript](../api/index.js)

## Group tools
Resources related to tools

+ Source: [ApiTxt format](../src/tools.txt) and [JSON objects](../src/tools.json)
+ Documents: [API Blueprint](../doc/tools.md) and [Stand Alone HTML](../doc/tools.htm)
+ Live Page: [API Interface](../api/tools.html) and [JavaScript](../api/tools.js)

### tools index [/tools/]

#### Get the tools index [GET]

+ Response 200 (text/plain)

     + Body

            Available routes:
            
            /tools/
            /tools/test{?text}
            /tools/define
            /tools/define/{section}
            /tools/define/{section}/{part}
            /tools/parse{?text,utf}
            /tools/encode{?text,slash}
            /tools/decode{?text}
            /tools/utf8{?text}


### Character definition tree [/tools/define]

The definition tree for character mapping

#### Get main define [GET]

+ Response 200 (text/plain)

     + Body

            {
              "utf-8": {},
              "utf-16": {},
              "utf-32": {},
              "fsw": {},
              "swu": {},
              "style": {}
            }


### Section definition [/tools/define/{section}]

A section of the definition tree

+ Parameters

     + section: fsw (string) - The name of section

#### Get section define [GET]

+ Response 200 (text/plain)

     + Body

            {
              "sign": [],
              "spatial": [],
              "symbol": [],
              "coord": [],
              "prefix": [],
              "box": [],
              "query": []
            }


### Part definition [/tools/define/{section}/{part}]

A part of the section definition

+ Parameters

     + section: swu (string) - The name of section
     + part: symbol (string) - The part of the definition

#### Get part define [GET]

+ Response 200 (text/plain)

     + Body

            [
              "individual symbol",
              "S10000",
              "[\\x{40000}-\\x{4F428}]"
            ]


### Parse text [/tools/parse{?text,utf}]

A function to analyze text and parse it into individual components

+ Parameters

     + text: S10000 (string) - The text to parse
     + utf: 32 (string) - The UTF number of 8, 16, 32 or 'x'

#### Get parse results [GET]

+ Response 200 (text/plain)

     + Body

            parse results of text


### Encode text [/tools/encode{?text,slash}]

A function to encode SignWriting in Unicode (SWU) as UTF-16

+ Parameters

     + text: \x{1D800} (string) - The text to encode
     + slash: 1 (number) - The number of slashes for escaping

#### Get encoded query string [GET]

+ Response 200 (text/plain)

     + Body

            \uD836\uDC00


### Decode text [/tools/decode{?text}]

A function to decode SignWriting in Unicode (SWU) from UTF-16

+ Parameters

     + text: \\uD836\\uDC00 (string) - The text to decode

#### Get decoded query string [GET]

+ Response 200 (text/plain)

     + Body

            \x{1D800}


### UTF-8 encode text [/tools/utf8{?text}]

+ Parameters

     + text: \x{1D800} (string) - The text to encode

#### Get utf-8 encoded query string [GET]

+ Response 200 (text/plain)

     + Body

            %F0%9D%A0%80


### Test with input [/tools/test{?text}]

A general purpose function for testing

+ Parameters

     + text: S10000 (string) - Input for testing

#### Get test results [GET]

+ Response 200 (text/plain)

     + Body

            test output


## Group FSW
Resources related to Formal SignWriting in ASCII (FSW)

+ Source: [ApiTxt format](../src/fsw.txt) and [JSON objects](../src/fsw.json)
+ Documents: [API Blueprint](../doc/fsw.md) and [Stand Alone HTML](../doc/fsw.htm)
+ Live Page: [API Interface](../api/fsw.html) and [JavaScript](../api/fsw.js)

### FSW Word [/fsw{?text,style}]

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign
     + style: true (boolean,optional) - Flag to include styling string

#### First FSW string [GET]

+ Request one Formal SignWriting in ASCII string

     + Body

            null

+ Response 200 (text/plain;charset=utf-8)

     + Body

            AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520


### FSW Text [/fsw/all{?text,style}]

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign
     + style: 1 (number) - Flag to include styling string

#### All FSW strings [GET]

+ Request many Formal SignWriting in ASCII string

     + Body

            null

+ Response 200 (text/plain;charset=utf-8)

     + Body

            AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520


### FSW to SWU [/fsw/swu{?text}]

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign

#### Text with FSW strings [GET]

+ Request SWU conversion of FSW string

     transformation from ASCII to Unicode characters.

     + Body

            null

+ Response 200 (text/plain;charset=utf-8)

     requires font SuttonSignWritingOneD

     + Body

            𝠀񆄱񈠣񍉡𝠃𝤛𝤵񍉡𝣴𝣵񆄱𝤌𝤆񈠣𝤉𝤚


### SVG image [/fsw/svg/{text}]

Create a stand-alone SVG image using Formal SignWriting in ASCII (FSW)

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign

#### Retrieve stand alone SVG image [GET]

+ Request collection text

     + Body

            null

+ Response 200 (image/svg+xml;charset=utf-8)

     + Body

            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="39" height="64" viewBox="482 483 39 64">
              <text style="font-size:0%;">AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520</text>
              <svg x='482' y='483'><g transform="translate(0.149874875465,34.7500790925) scale(0.00988906872676,-0.00988956850125)"><path class="sym-line" fill="black" d="M1528 3484 c-592 -92 -1088 -447 -1348 -963 -125 -249 -180 -485 -180 -771 0 -480 183 -911 529 -1242 350 -336 780 -508 1271 -508 451 0 864 150 1193 434 326 281 517 620 591 1051 21 121 21 409 0 530 -43 252 -114 444 -237 639 -282 453 -741 750 -1284 831 -127 19 -413 18 -535 -1z m607 -173 c583 -126 1038 -523 1224 -1069 59 -173 75 -277 75 -492 0 -165 -3 -211 -22 -300 -71 -327 -228 -611 -458 -829 -186 -177 -381 -295 -614 -374 -176 -60 -282 -78 -490 -84 -247 -7 -416 19 -628 97 -549 201 -944 674 -1043 1250 -17 97 -17 383 0 480 99 576 495 1050 1043 1250 105 38 177 58 303 81 143 26 467 21 610 -10z M1720 1800 l0 -600 80 0 80 0 0 600 0 600 -80 0 -80 0 0 -600z"/></g></svg>
              <svg x='506' y='500'><g transform="translate(0.0,15.0) scale(0.01,-0.01)"><path class="sym-fill" fill="white" d="M200 750 l0 -550 300 0 300 0 0 550 0 550 -300 0 -300 0 0 -550z"/><path class="sym-line" fill="black" d="M0 750 l0 -750 750 0 750 0 0 750 0 750 -750 0 -750 0 0 -750z m800 0 l0 -550 -300 0 -300 0 0 550 0 550 300 0 300 0 0 -550z"/></g></svg>
              <svg x='503' y='520'><g transform="translate(0.196840829729,26.6999810561) scale(0.00975214136907,-0.00983390502079)"><path class="sym-line" fill="black" d="M345 2350 l-350 -350 325 -325 325 -325 -325 -325 -325 -325 353 -353 352 -352 0 303 0 302 350 0 350 0 0 100 0 100 -350 0 -350 0 0 550 0 550 350 0 350 0 0 100 0 100 -350 0 -350 0 -2 300 -3 300 -350 -350z M1600 1350 l0 -1350 100 0 100 0 0 1350 0 1350 -100 0 -100 0 0 -1350z"/></g></svg>
            </svg>


### SVG with font [/fsw/svg/font/{text}]

Create an SVG with font using Formal SignWriting in ASCII (FSW)

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign

#### Retrieve SVG with font [GET]

+ Request collection text

     + Body

            null

+ Response 200 (image/svg+xml;charset=utf-8)

     + Body

            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="49" height="69" viewBox="476 466 49 69">
              <text font-size="0">AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475</text>
              <g transform="translate(483,510)"><text class="sym-fill" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;">􋛩</text><text class="sym-line" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;">󻛩</text></g>
              <g transform="translate(501,466)"><text class="sym-fill" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;">􀀒</text><text class="sym-line" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;">󰀒</text></g>
              <g transform="translate(510,500)"><text class="sym-fill" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;">􋚥</text><text class="sym-line" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;">󻚥</text></g>
              <g transform="translate(476,475)"><text class="sym-fill" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;">􀀚</text><text class="sym-line" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;">󰀚</text></g>
            </svg>


## Group swu
Resources related to Formal SignWriting in ASCII (SWU)

+ Source: [ApiTxt format](../src/swu.txt) and [JSON objects](../src/swu.json)
+ Documents: [API Blueprint](../doc/swu.md) and [Stand Alone HTML](../doc/swu.htm)
+ Live Page: [API Interface](../api/swu.html) and [JavaScript](../api/swu.js)

### SWU Word [/swu{?text,style}]

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign
     + style: 1 (number) - Flag to include styling string

#### first SWU string [GET]

+ Request one Formal SignWriting in ASCII string

     + Body

            null

+ Response 200 (text/plain;charset=utf-8)

     + Body

            AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520


### SWU Text [/swu/all{?text,style}]

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign
     + style: 1 (number) - Flag to include styling string

#### all SWU strings [GET]

+ Request many Formal SignWriting in ASCII string

     + Body

            null

+ Response 200 (text/plain;charset=utf-8)

     + Body

            AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520


### SWU to FSW [/swu/fsw{?text}]

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign

#### text with SWU strings [GET]

+ Request original text with Formal SignWriting in ASCII inside

     + Body

            null

+ Response 200 (text/plain;charset=utf-8)

     + Body

            AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520


### SVG image [/swu/svg/{text}]

Create a stand-alone SVG image using Formal SignWriting in ASCII (SWU)

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign

#### retrieve stand-alone SVG image [GET]

+ Request collection text

     + Body

            null

+ Response 200 (image/svg+xml;charset=utf-8)

     + Body

            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="39" height="64" viewBox="482 483 39 64">
              <text style="font-size:0%;">AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520</text>
              <svg x='482' y='483'><g transform="translate(0.149874875465,34.7500790925) scale(0.00988906872676,-0.00988956850125)"><path class="sym-line" fill="black" d="M1528 3484 c-592 -92 -1088 -447 -1348 -963 -125 -249 -180 -485 -180 -771 0 -480 183 -911 529 -1242 350 -336 780 -508 1271 -508 451 0 864 150 1193 434 326 281 517 620 591 1051 21 121 21 409 0 530 -43 252 -114 444 -237 639 -282 453 -741 750 -1284 831 -127 19 -413 18 -535 -1z m607 -173 c583 -126 1038 -523 1224 -1069 59 -173 75 -277 75 -492 0 -165 -3 -211 -22 -300 -71 -327 -228 -611 -458 -829 -186 -177 -381 -295 -614 -374 -176 -60 -282 -78 -490 -84 -247 -7 -416 19 -628 97 -549 201 -944 674 -1043 1250 -17 97 -17 383 0 480 99 576 495 1050 1043 1250 105 38 177 58 303 81 143 26 467 21 610 -10z M1720 1800 l0 -600 80 0 80 0 0 600 0 600 -80 0 -80 0 0 -600z"/></g></svg>
              <svg x='506' y='500'><g transform="translate(0.0,15.0) scale(0.01,-0.01)"><path class="sym-fill" fill="white" d="M200 750 l0 -550 300 0 300 0 0 550 0 550 -300 0 -300 0 0 -550z"/><path class="sym-line" fill="black" d="M0 750 l0 -750 750 0 750 0 0 750 0 750 -750 0 -750 0 0 -750z m800 0 l0 -550 -300 0 -300 0 0 550 0 550 300 0 300 0 0 -550z"/></g></svg>
              <svg x='503' y='520'><g transform="translate(0.196840829729,26.6999810561) scale(0.00975214136907,-0.00983390502079)"><path class="sym-line" fill="black" d="M345 2350 l-350 -350 325 -325 325 -325 -325 -325 -325 -325 353 -353 352 -352 0 303 0 302 350 0 350 0 0 100 0 100 -350 0 -350 0 0 550 0 550 350 0 350 0 0 100 0 100 -350 0 -350 0 -2 300 -3 300 -350 -350z M1600 1350 l0 -1350 100 0 100 0 0 1350 0 1350 -100 0 -100 0 0 -1350z"/></g></svg>
            </svg>


### SVG with font [/swu/svg/font/{text}]

Create an SVG with font using Formal SignWriting in ASCII (SWU)

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign

#### retrieve SVG with font [GET]

+ Request collection text

     + Body

            null

+ Response 200 (image/svg+xml;charset=utf-8)

     + Body

            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="49" height="69" viewBox="476 466 49 69">
              <text font-size="0">AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475</text>
              <g transform="translate(483,510)"><text class="sym-fill" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;">􋛩</text><text class="sym-line" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;">󻛩</text></g>
              <g transform="translate(501,466)"><text class="sym-fill" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;">􀀒</text><text class="sym-line" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;">󰀒</text></g>
              <g transform="translate(510,500)"><text class="sym-fill" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;">􋚥</text><text class="sym-line" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;">󻚥</text></g>
              <g transform="translate(476,475)"><text class="sym-fill" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;fill:white;">􀀚</text><text class="sym-line" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;fill:black;">󰀚</text></g>
            </svg>


## Group user
SignPuddle 3 collections are organized by country and language codes

+ Source: [ApiTxt format](../src/user.txt) and [JSON objects](../src/user.json)
+ Documents: [API Blueprint](../doc/user.md) and [Stand Alone HTML](../doc/user.htm)
+ Live Page: [API Interface](../api/user.html) and [JavaScript](../api/user.js)

### Country code
The country codes are from ISO-3166.
Each country is coded with two uppercase letters.

### Language code
The language codes are from ISO-639-1 for spoken languages and ISO-639-3 for sign languages.
Each spoken language is coded with two lowercase letters.
Each sign language is coded with three lowercase letters.

### Who uses SignWriting? [/user/who/]
List of countries with size and activity.

#### Retrieve country list [GET]
The available countries where signs are available.

+ Request user-who

     + Body

            null

+ Response 200 (text/plain)

     + Body

            BR
            US


### Salt is used for request validations [/user/salt]
A string for accounting and validation

#### String for accounting and validation [GET]

+ Request user salt

     + Body

            null

+ Response 200 (text/plain)

     + Body

            e3bedc9e9f83cb9dd7ae61250b9e6921


### User login [/user/login]
Validation of user with salted password

#### Process log in to server [POST]

+ Request verify user (application/json)

     + Even a list
     + name `Name` of the metaproperty, should be alphanumeric only. Uneditable.

     + Body

            {"username":"anonymous","salt":"af77...","salted":"2793f..."}

+ Response 200 (application/json)

     response text here

     + Body

            {"user-profile":""}


## Group collection
Resources related to making collections

+ Source: [ApiTxt format](../src/collection.txt) and [JSON objects](../src/collection.json)
+ Documents: [API Blueprint](../doc/collection.md) and [Stand Alone HTML](../doc/collection.htm)
+ Live Page: [API Interface](../api/collection.html) and [JavaScript](../api/collection.js)

### Available collections [/collection]

#### Get available languages [GET]

+ Response 200 (text/plain)

     + Body

            en
            ase


### Collection resource [/collection/{name}]
Access to available collections

+ Parameters

     + name: en-US-interface-sp3 (string) - The name of a collection

#### retrieve collection or available collections [GET]

+ Request collection text

     + Body

            null

+ Response 200 (text/plain)

     + Body

            print.buttons.main   message   description   icon


### Collection resource md5 hash [/collection/{name}/md5]
MD5 hash of collection

+ Parameters

     + name: en-US-interface-sp3 (string) - The name of a collection

#### retrieve collection md5 hash [GET]

+ Request the md5 hash of a collection

     + Headers

            If-None-Match: af779785a5c3ffd166bc95e6dd530889

     + Body

            null

+ Response 200 (text/plain)

     + Body

            9785a5c3ffd166bc95e6dd5308894691


#### retrieve collection md5 hash [POST]

+ Request the md5 hash of a collection

     + Headers

            If-None-Match: af779785a5c3ffd166bc95e6dd530889

     + Body

            null

+ Response 200 (text/plain)

     + Body

            9785a5c3ffd166bc95e6dd5308894691


#### retrieve collection md5 hash [PUT]

+ Request the md5 hash of a collection

     + Headers

            If-None-Match: af779785a5c3ffd166bc95e6dd530889

     + Body

            null

+ Response 200 (text/plain)

     + Body

            9785a5c3ffd166bc95e6dd5308894691


#### retrieve collection md5 hash [DELETE]

+ Request the md5 hash of a collection

     + Headers

            If-None-Match: af779785a5c3ffd166bc95e6dd530889

     + Body

            null

+ Response 200 (text/plain)

     + Body

            9785a5c3ffd166bc95e6dd5308894691


## Group apitxt
ApiTxt uses eleven types of element to define an API.

root, group, route, parameter, method, request, response, header, line, code, and body.

+ Source: [ApiTxt format](../src/apitxt.txt) and [JSON objects](../src/apitxt.json)
+ Documents: [API Blueprint](../doc/apitxt.md) and [Stand Alone HTML](../doc/apitxt.htm)
+ Live Page: [API Interface](../api/apitxt.html) and [JavaScript](../api/apitxt.js)

### root [/apitxt/root]

Every document should start with a root element.
After the root, the other elements are used to quickly create complex website APIs.
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
There are five detail elements: line, parameter, code, header, and body.  The detail lines attach to a previous frame element if correctly structured.

**single line elements**

+ lines for all frame elements
+ parameters for route
+ code for method
+ body for request and response
+ headers for request and response


#### Get root definition [GET]
Every document should start with a root element.

**root line**

root &lt;TAB> name &lt;TAB> title &lt;TAB> host

+ field 1 - name - uniquely identifies a document
+ field 2 - title - name of the document
+ field 3 - host - website URL

**root example**

root &lt;TAB> apitxt &lt;TAB> ApiTxt &lt;TAB> https://signpuddle.com/apitxt


**root line relationships**

```
    root
     | - lines
     | - routes
     | - groups
```

**root object**

```json
{
  "root" : field[1],
  "title" : field[2],
  "host" : field[3],
  "lines" : []
}
```


+ Request the root definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            Every document should start with a root element.
            
            **root line**
            
            root   name   title   host
            
            + field 1 - name - uniquely identifies a document
            + field 2 - title - name of the document
            + field 3 - host - website URL
            
            **example**
            
            root   apitxt   ApiTxt   https://signpuddle.com/apitxt
            
            
            **root line relationships**
            
            ```
                root
                 | - lines
                 | - routes
                 | - groups
            ```
            
            **root object**
            
            ```json
            {
              "root" : field[1],
              "title" : field[2],
              "host" : field[3],
              "lines" : []
            }
            ```


### group [/apitxt/group]

#### Get group definition [GET]
The group organizes resources into sections

**group line**

group &lt;TAB> name &lt;TAB> description

+ field 1 - name - the short name used for sections
+ field 2 - description - information about the group

**group example**

group &lt;TAB> Section name &lt;TAB> an example section

**group line relationships**

```
    group
     | - lines
     | - routes
```

**group object**

```json
{
  "group" : field[1],
  "description" : field[2],
  "lines": []
}
```


+ Request the group definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The group organizes resources into sections
            
            **group line**
            
            group   name   description
            
            + field 1 - name - the short name used for sections
            + field 2 - description - information about the group
            
            **group example**
            
            group   Section name   an example section
            
            **group line relationships**
            
            ```
                group
                 | - lines
                 | - routes
            ```
            
            **group object**
            
            ```json
            {
              "group" : field[1],
              "description" : field[2],
              "lines": []
            }
            ```


### route [/apitxt/route]

#### Get route definition [GET]
The route element allows access to a resource

**route line**

route &lt;TAB> URI template &lt;TAB> name &lt;TAB> description

+ field 1 - URI template - a resource pattern with parameters
+ field 2 - name - the route name must be unique
+ field 3 - description - information about the resource

**route example**

route &lt;TAB> /example &lt;TAB> an example route &lt;TAB> a description of the route

**route line relationships**

```
    route
     | - lines
     | - parameters
     | - methods
```

**route object**

```json
{
  "route" : field[1],
  "name" : field[2],
  "description" : field[3],
  "lines": [],
  "parameters": []
}
```


+ Request the route definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The route element allows access to a resource
            
            **route line**
            
            route   URI template   name   description
            
            + field 1 - URI template - a resource pattern with parameters
            + field 2 - name - the route name must be unique
            + field 3 - description - information about the resource
            
            **route example**
            
            route   /example   an example route   a description of the route
            
            **route line relationships**
            
            ```
                route
                 | - lines
                 | - parameters
                 | - methods
            ```
            
            **route object**
            
            ```json
            {
              "route" : field[1],
              "name" : field[2],
              "description" : field[3],
              "lines": [],
              "parameters": []
            }
            ```


### parameter [/apitxt/parameter]

#### Get parameter definition [GET]
The parameter element is applied to the previous route

**parameter line**

parameter &lt;TAB> name &lt;TAB> example &lt;TAB> type &lt;TAB> description

+ field 1 - name - the name of a parameter for a route
+ field 2 - example - an example value for the parameter
+ field 3 - type - the parameter type, such as "string", "number", "boolean", "string, optional", "string, required"
+ field 4 - description - information about the parameter

**parameter example**

parameter &lt;TAB> country_code &lt;TAB> US &lt;TAB> string &lt;TAB> the country code of interest

**parameter line relationships**

parameter lines are added to a parameters array

**parameters array**

```json
{"parameters":
  [
    {
      "name" : " field[1],
      "example" : field[2],
      "type" : field[3],
      "description" : field[4]
    }
  ]
}
```


+ Request the parameter definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The parameter element is applied to the previous route
            
            **parameter line**
            
            parameter   name   example   type   description
            
            + field 1 - name - the name of a parameter for a route
            + field 2 - example - an example value for the parameter
            + field 3 - type - the parameter type, such as "string", "number", "boolean", "string, optional", "string, required"
            + field 4 - description - information about the parameter
            
            **parameter example**
            
            parameter   country_code   US   string   the country code of interest
            
            **parameter line relationships**
            
            parameter lines are added to a parameters array
            
            **parameters array**
            
            ```json
            {"parameters":
              [
                {
                  "name" : " field[1],
                  "example" : field[2],
                  "type" : field[3],
                  "description" : field[4]
                }
              ]
            }
            ```


### method [/apitxt/method]

#### Get method definition [GET]
The method element represents an action that can be performed on a route

**method line**

method &lt;TAB> HTTP method &lt;TAB> name &lt;TAB> description

+ field 1 - HTTP method - the type of action to perform: GET, POST, PUT, DELETE
+ field 2 - name - the name of the action
+ field 3 - description - information about the method

**method example**

method &lt;TAB> GET &lt;TAB> Get an example &lt;TAB> This method retrieves an example document

**method line relationships**

```
    method
     | - lines
     | - code
     | - requests
     | - responses
```

**method object**

```json
{
  "method" : field[1],
  "name" : field[2],
  "description" : field[3],
  "lines" : [],
  "code" : [],
  "dialog" : [
    {
      "request" : {},
      "responses" : []
    }
  ]
}
```


+ Request the method definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The method element represents an action that can be performed on a route
            
            **method line**
            
            method   HTTP method   name   description
            
            + field 1 - HTTP method - the type of action to perform: GET, POST, PUT, DELETE
            + field 2 - name - the name of the action
            + field 3 - description - information about the method
            
            **method example**
            
            method   GET   Get an example   This method retrieves an example document
            
            **method line relationships**
            
            ```
                method
                 | - lines
                 | - code
                 | - requests
                 | - responses
            ```
            
            **method object**
            
            ```json
            {
              "method" : field[1],
              "name" : field[2],
              "description" : field[3],
              "lines" : [],
              "code" : [],
              "dialog" : [
                {
                  "request" : {},
                  "responses" : []
                }
              ]
            }
            ```


### request [/apitxt/request]

#### Get request definition [GET]
The request element is associated with a specific method and can be paired with multiple responses.

**request line**

request &lt;TAB> name &lt;TAB> type

+ field 1 - name - uniquely identifies a request
+ field 2 - type - the content type of the request body

**request example**

request &lt;TAB> matching text within request body &lt;TAB> plain/text

**request line relationships**

```
    request
     | - lines
     | - headers
     | - body
```

**request object**

```json
{
  "name" : field[1],
  "type" : field[2],
  "lines" : [],
  "headers" : {},
  "body" : []
}
```


+ Request the request definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The request element is associated with a specific method and can be paired with multiple responses.
            
            **request line**
            
            request   name   type
            
            + field 1 - name - uniquely identifies a request
            + field 2 - type - the content type of the request body
            
            **request example**
            
            request   matching text within request body   plain/text
            
            **request line relationships**
            
            ```
                request
                 | - lines
                 | - headers
                 | - body
            ```
            
            **request object**
            
            ```json
            {
              "name" : field[1],
              "type" : field[2],
              "lines" : [],
              "headers" : {},
              "body" : []
            }
            ```


### response [/apitxt/response]

#### Get response definition [GET]
The response element is associated with a specific request, or associated with a specific method with an assumed generic request.

**response line**

response &lt;TAB> status &lt;TAB> type

+ field 1 - status - an HTTP response code indicating the status of the request
+ field 2 - type - the content type of the response body

**response example**

response &lt;TAB> 200 &lt;TAB> plain/text

**response line relationships**

```
    response
     | - lines
     | - headers
     | - body
```

**response object**

```json
{
  "status" : field[1],
  "type" : field[2],
  "lines" : [],
  "headers" : {},
  "body" : []
}
```


+ Request the response definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The response element is associated with a specific request, or associated with a specific method with an assumed generic request.
            
            **response line**
            
            response   status   type
            
            + field 1 - status - an HTTP response code indicating the status of the request
            + field 2 - type - the content type of the response body
            
            **response example**
            
            response   200   plain/text
            
            **response line relationships**
            
            ```
                response
                 | - lines
                 | - headers
                 | - body
            ```
            
            **response object**
            
            ```json
            {
              "status" : field[1],
              "type" : field[2],
              "lines" : [],
              "headers" : {},
              "body" : []
            }
            ```


### header [/apitxt/header]

#### Get header definition [GET]
The header element is applied to a preceding route

**header line**

header &lt;TAB> name &lt;TAB> value

+ field 1 - name - the header variable name
+ field 2 - value - the header variable value

**header example**

header &lt;TAB> X-Powered-By &lt;TAB> ApiTxt

**header object**

```json
{ field[1] : field[2] }
```


+ Request the header definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The header element is applied to a preceding request or response
            
            **header line**
            
            header   name   value
            
            + field 1 - name - the header variable name
            + field 2 - value - the header variable value
            
            **header example**
            
            header   X-Powered-By   ApiTxt
            
            **header object**
            
            ```json
            { field[1] : field[2] }
            ```


### body [/apitxt/body]

#### Get body definition [GET]
The body element adds contents to a preceding request or response.

The text of the body is everything after the string "body &lt;TAB>".

+ Request the body definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The body element adds contents to a preceding request or response.
            
            The text of the body is everything after the string "body <TAB>"


### line [/apitxt/line]

#### Get line definition [GET]
The line element adds additional text to frame elements.

For the root, group, route, method, request, and response, the lines add details to an element.

The text of the line is everything after the string "line &lt;TAB>".

+ Request the line definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The line element adds additional text to frame elements.
            
            For the root, group, route, method, request, and response, the lines add details to an element.
            
            The text of the line is everything after the string "line <TAB>".


### code [/apitxt/code]

#### Get code definition [GET]
The code element adds functionality to the method element.

The code element contains programming text.  ApiTxt comes integrated with the PHP project the Slim Framework v2.  The conversion to working PHP adds boilerplate details for routes and method, with named parameters and query parameters available as functional variables.

The text of the code is everything after the string "code &lt;TAB>".

+ Request the code definition

     + Body

            null

+ Response 200 (text/plain)

     + Body

            The code element adds functionality to the method element.
            
            The code element contains programming text.  ApiTxt comes integrated with the PHP project the Slim Framework v2.  The conversion to working PHP adds boilerplate details for routes and method, with named parameters and query parameters available as functional variables.
            
            The text of the code is everything after the string "code <TAB>".


