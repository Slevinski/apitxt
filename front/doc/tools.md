FORMAT: X-1A
HOST: https://signpuddle.com/back

# SignPuddle 3 Tools API
> v3.0.0

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


