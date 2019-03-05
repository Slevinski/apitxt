FORMAT: X-1A
HOST: https://signpuddle.com/server

# SignPuddle 3 SWU API
> v3.0.0

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

