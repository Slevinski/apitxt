FORMAT: X-1A
HOST: https://signpuddle.net/v3

# SignPuddle 3
> v3.0.0

+ [txt](../src/index.txt) - ApiTxt format
+ [json](../src/index.json) - array of JSON objects
+ [html](../api/index.html) - HTML API Interface
+ [md](../docs/index.md) - API Blueprint
+ [htm](../docs/index.htm) - Stand Alone HTML

## Group tools
Resources related to tools

### Test with input [/tools/test{?text}]

A general purpose function for testing

+ Parameters

     + text: S10000 (string) - Input for testing

#### Get test results [GET]

+ Response 200 (text/plain)


     + Body

            test output

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

## Group fsw
Resources related to Formal SignWriting in ASCII (FSW)

### FSW Word [/fsw{?text,style}]

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign
     + style: true (boolean,optional) - Flag to include styling string

#### first FSW string [GET]

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

#### all FSW strings [GET]

+ Request many Formal SignWriting in ASCII string

     + Body

            null

+ Response 200 (text/plain;charset=utf-8)


     + Body

            AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520

### FSW to SWU [/fsw/swu{?text}]

+ Parameters

     + text: AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520 (string) - The name of sign

#### text with FSW strings [GET]

+ Request original text with Formal SignWriting in ASCII inside

     + Body

            null

+ Response 200 (text/plain;charset=utf-8)


     + Body

            AS20310S26b02S33100M521x547S33100482x483S20310506x500S26b02503x520

### SVG image [/fsw/svg/{text}]

Create a stand-alone SVG image using Formal SignWriting in ASCII (FSW)

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

### SVG with font [/fsw/svg/font/{text}]

Create an SVG with font using Formal SignWriting in ASCII (FSW)

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

## Group swu
Resources related to Formal SignWriting in ASCII (SWU)

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

+ Request verify user

     + Body

            {"user":"anonymous","salt":"af77...","salted":"2793f..."}

+ Response 200 (text/plain)


     + Body

            {"user-profile":""}

