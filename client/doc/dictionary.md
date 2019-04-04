FORMAT: X-1A
HOST: https://signpuddle.com/server

# SignPuddle 3 Dictionary API
## Dictionary

SignPuddle 3 organizes user dictionary elements into dictionary collections.
Dictionary collections are available in three different forms: database, plain text files, and JSON objects

### Databases

Each collection is available as an SQLite database.
These databases are the primary source and all edits are directly applied to the database.

table entry  
+ id  
+ sign  
+ terms  
+ lower  
+ signtext  
+ text  
+ source  
+ detail  
+ user  
+ created_at  
+ updated_at  

### Plain Text Files

Each collection is available as a plain text field where each entry occupies its own line.
Each entry contains multiple fields that are divided by tab characters.
The plain text files are designed for easy import and export from the databases.

id /t sign /t terms /t lower /t signtext /t text /t source /t detail /t user /t updated_at

### JSON Data files

The dictionary JSON data file is an object.
Each key contains an object with three properties: message, description, icon, and updated_at.

{  
  "name": "xml-MY-dictionary-public",  
  "data": [  
    {  
      "id": "2",  
      "sign": "\ud836\udc03\ud836\udd44\ud836\udd19\ud8ef\udfa1\ud836\udcf4\ud836\udcf4\ud8dd\udc54\ud836\udcc8\ud836\udcfc\ud8dd\udc42\ud836\udd26\ud836\udcfa\ud8c8\uddd2\ud836\udd15\ud836\udcee\ud8c8\uddda\ud836\udce0\ud836\udcef",  
      "terms": [  
        "Malaysia"  
      ],  
      "lower": [  
        "malaysia"  
      ],  
      "signtext": "",  
      "text": "",  
      "source": "Conference Maastricht",  
      "detail": {},  
      "user": "admin",  
      "created_at": "2007-03-29T19:09:37Z",  
      "updated_at": "2007-03-29T19:09:37Z"  
    }  
  ]  
}  


## Group dictionary
Resources related to dictionary collections

+ Source: [ApiTxt format](../src/dictionary.txt) and [JSON objects](../src/dictionary.json)
+ Documents: [API Blueprint](../doc/dictionary.md) and [Stand Alone HTML](../doc/dictionary.htm)
+ Live Page: [API Dictionary](../api/dictionary.html) and [JavaScript](../api/dictionary.js)

### Dictionaries available [/dictionary{?name}]

+ Parameters

     + name: public (string) - partial dictionary name

#### Get available dictionaries [GET]

+ Response 200 (text/plain)

     + Body

            ["ase-US-dictionary-public"]

### Dictionary resource [/dictionary/{name}{?update}]
Access to available dictionaries

+ Parameters

     + name: `ase-US-dictionary-public` (required,string) - The name of an dictionary
     + update: 1 (optional,number) - Forces a rewrite of the dictionary for json and txt formats

#### retrieve dictionary [GET]

+ Request dictionary text

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z

     + Body

            null

+ Response 200 (text/plain)

     + Body

            1   𝠀񂱡񂇙񆿃𝠃𝤝𝤔񂇙𝣰𝣹񆿃𝤎𝤁񂱡𝣽𝤀   test zero   test zero   we are testing SignPuddle 1.6   Val ;-)   {"video":"<iframe width=\"425\" height=\"349\" src=\"http:\/\/www.youtube.com\/embed\/RTniYA1lTDM\" frameborder=\"0\" allowfullscreen><\/iframe>"}   Val   2011-07-20T17:39:02Z   2011-07-20T17:42:09Z

### List of dictionary signs [/dictionary/{name}/signs]
The signs in the dictionary

+ Parameters

     + name: `ase-US-dictionary-public` (string) - The name of an dictionary

#### retrieve dictionary signs [GET]

+ Request dictionary text

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z

     + Body

            null

+ Response 200 (text/plain)

     + Body

            𝠀񂱡񂇙񆿃𝠃𝤝𝤔񂇙𝣰𝣹񆿃𝤎𝤁񂱡𝣽𝤀

### List of dictionary signtexts [/dictionary/{name}/signtexts]
The signtexts in the dictionary

+ Parameters

     + name: `ase-US-dictionary-public` (string) - The name of an dictionary

#### retrieve dictionary signtexts [GET]

+ Request dictionary text

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z

     + Body

            null

+ Response 200 (text/plain)

     + Body

            𝠀񂱡񂇙񆿃𝠃𝤝𝤔񂇙𝣰𝣹񆿃𝤎𝤁񂱡𝣽𝤀

### Dictionary entry resource [/dictionary/{name}/entry]
Entries for dictionary

+ Parameters

     + name: `ase-US-dictionary-public` (string) - The name of an dictionary

#### add dictionary entry [POST]

+ Request add new dictionary entry (application/json)

     + Headers

            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            {
              "sign": "\ud836\udc03\ud836\udd44\ud836\udd19\ud8ef\udfa1\ud836\udcf4\ud836\udcf4\ud8dd\udc54\ud836\udcc8\ud836\udcfc\ud8dd\udc42\ud836\udd26\ud836\udcfa\ud8c8\uddd2\ud836\udd15\ud836\udcee\ud8c8\uddda\ud836\udce0\ud836\udcef",
              "terms": [
                "Malaysia"
              ],
              "signtext": "",
              "text": "",
              "source": "Conference Maastricht",
              "detail": {}
            }  

+ Response 200 (text/plain)

     + Body

            777

### Dictionary entry resource for id [/dictionary/{name}/entry/{id}]
Specific entries for dictionary

+ Parameters

     + name: `ase-US-dictionary-public` (string) - The name of an dictionary
     + id: 11244 (string) - An id numbers

#### update dictionary entry [PUT]

+ Request an update for an existing dictionary entry (application/json)

     + Headers

            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            {
              "sign": "\ud836\udc03\ud836\udd44\ud836\udd19\ud8ef\udfa1\ud836\udcf4\ud836\udcf4\ud8dd\udc54\ud836\udcc8\ud836\udcfc\ud8dd\udc42\ud836\udd26\ud836\udcfa\ud8c8\uddd2\ud836\udd15\ud836\udcee\ud8c8\uddda\ud836\udce0\ud836\udcef",
              "terms": [
                "Malaysia"
              ],
              "signtext": "",
              "text": "",
              "source": "Conference Maastricht",
              "detail": {}
            }  

+ Response 204

#### remove dictionary entry [DELETE]

+ Request the removal of an dictionary entry

     + Headers

            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 204

### Search dictionary [/dictionary/{name}/search{?offset,limit,filter,sort,results}]
Searching dictionary signs

+ Parameters

     + name: `ase-US-dictionary-public` (required,string) - The name of a dictionary
     + offset: 0 (number) - Start of search results
     + limit: 10 (number) - Number of search results
     + filter: user=Val (string) - restrict search results
     + sort: created_at (string) - Field for sorting results
     + results: sign (string) - Type of results: entries, sign, term, terms

#### retrieve dictionary results of searching [GET]

+ Request dictionary query results

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z
            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 200 (text/plain)

     + Body

            {
              "total": 1,
              "data": [
                [
                  "1",
                  "\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00"
                ]
              ]
            }

### Search dictionary with ids [/dictionary/{name}/search/id/{id}]
Specific entries for dictionary

+ Parameters

     + name: `ase-US-dictionary-public` (string) - The name of an dictionary
     + id: 1-4,5 (string) - A list of one or more id numbers

#### retrieve dictionary entry [GET]

+ Request an dictionary entry

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z
            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 200 (text/plain)

     + Body

            [
              {
                "id": "1",
                "sign": "\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00",
                "terms": [
                  "test zero"
                ],
                "lower": [
                  "test zero"
                ],
                "signtext": "",
                "text": "we are testing SignPuddle 1.6",
                "source": "Val ;-)",
                "detail": {
                  "video": "<iframe width=\"425\" height=\"349\" src=\"http:\/\/www.youtube.com\/embed\/RTniYA1lTDM\" frameborder=\"0\" allowfullscreen><\/iframe>"
                },
                "user": "Val",
                "created_at": "2011-07-20T17:39:02Z",
                "updated_at": "2011-07-20T17:42:09Z"
              }
            ]

### Search signs with query string [/dictionary/{name}/search/sign/{query}{?offset,limit,filter,sort,results}]
Query string access to dictionary signs

+ Parameters

     + name: `ase-US-dictionary-public` (required,string) - The name of a dictionary
     + query: Q (required,string) - A query string
     + offset: 0 (number) - Start of search results
     + limit: 10 (number) - Number of search results
     + filter: user=Val (string) - restrict search results
     + sort: created_at (string) - Field for sorting results
     + results: sign (string) - Type of results: entries, sign, term, terms

#### retrieve dictionary results of searching signs with query string [GET]

+ Request dictionary query results

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z
            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 200 (text/plain)

     + Body

            {
              "total": 1,
              "data": [
                [
                  "1",
                  "\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00"
                ]
              ]
            }

### Search signtexts with query string [/dictionary/{name}/search/signtext/{query}{?offset,limit,filter,sort,results}]
Query string access to dictionary signtexts

+ Parameters

     + name: `ase-US-dictionary-public` (required,string) - The name of a dictionary
     + query: Q (required,string) - A query string
     + offset: 0 (number) - Start of search results
     + limit: 10 (number) - Number of search results
     + filter: user=Val (string) - restrict search results
     + sort: created_at (string) - Field for sorting results
     + results: sign (string) - Type of results: entries, signtext, term, terms

#### retrieve dictionary results of searching signtexts with query string [GET]

+ Request dictionary query results

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z
            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 200 (text/plain)

     + Body

            {
              "total": 1,
              "data": [
                [
                  "1",
                  "\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00"
                ]
              ]
            }

### Dictionary terms search [/dictionary/{name}/search/terms/{text}{?type,case,offset,limit,filter,sort,results}]
Search dictionary terms for text

+ Parameters

     + name: `ase-US-dictionary-public` (required,string) - The name of an dictionary
     + text: `SignPuddle` (required,string) - The text for searching
     + type: exact (string) - Type of search of start, end, or exact
     + case: 0 (number) - Case sensitive search
     + offset: 0 (number) - Start of search results
     + limit: 10 (number) - Number of search results
     + filter: user=Val (string) - restrict search results
     + sort: created_at (string) - Field for sorting results
     + results: sign (string) - Type of results: entries, sign, term, terms

#### retrieve matching entries [GET]

+ Request matching dictionary entries

     + Headers

            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 200 (text/plain)

     + Body

            {
              "total": 1,
              "data": [
                [
                  "1",
                  "\ud836\udc00\ud8cb\udc61\ud8c8\uddd9\ud8db\udfc3\ud836\udc03\ud836\udd1d\ud836\udd14\ud8c8\uddd9\ud836\udcf0\ud836\udcf9\ud8db\udfc3\ud836\udd0e\ud836\udd01\ud8cb\udc61\ud836\udcfd\ud836\udd00"
                ]
              ]
            }

### Dictionary symbol subset [/dictionary/{name}/alphabet{?update}]
Create alphabet from dictionary signs

+ Parameters

     + name: `ase-US-dictionary-public` (required,string) - The name of an dictionary
     + update: 1 (optional,number) - Forces a rewrite of the alphabet

#### generate alphabet from dictionary contents [GET]

+ Request dictionary query results

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z
            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 200 (text/plain)

     + Body

            {"name": "ase-US-alphabet-public","data": []}

