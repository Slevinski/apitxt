FORMAT: X-1A
HOST: https://signpuddle.net/v3

# SignPuddle 3 Collection API
> v3.0.0

+ [txt](../src/collection.txt) - ApiTxt format
+ [json](../src/collection.json) - array of JSON objects
+ [html](../api/collection.html) - HTML API Interface
+ [md](../doc/collection.md) - API Blueprint
+ [htm](../doc/collection.htm) - Stand Alone HTML

## Group collection
Resources related to making collections

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


