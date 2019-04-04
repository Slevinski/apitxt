FORMAT: X-1A
HOST: https://signpuddle.com/server

# SignPuddle 3 Interface API
## Interface

SignPuddle 3 organizes user interface elements into interface collections.
Interface collections are available in three different forms: database, plain text files, and JSON objects

### Databases

Each collection is available as an SQLite database.
These databases are the primary source and all edits are directly applied to the database.

table entry
+ key
+ message
+ description
+ icon
+ user
+ created_at
+ updated_at

### Plain Text Files

Each collection is available as a plain text field where each entry occupies its own line.
Each entry contains multiple fields that are divided by tab characters.
The plain text files are designed for easy import and export from the databases.

key /t message /t description /t icon /t user /t created_at /t updated_at

### JSON Data files

The interface JSON data file is an object.
Each key contains an object with three properties: message, description, icon, and updated_at.

{
  "name": "en-US-interface-sp3",
  "data": {
    "key.example.one": {
      "message": "example message",
      "description": "example description",
      "icon": "example",
      "updated_at": "date-time"
    }
  }
}


## Group interface
Resources related to interface collections

+ Source: [ApiTxt format](../src/interface.txt) and [JSON objects](../src/interface.json)
+ Documents: [API Blueprint](../doc/interface.md) and [Stand Alone HTML](../doc/interface.htm)
+ Live Page: [API Interface](../api/interface.html) and [JavaScript](../api/interface.js)

### Interfaces available [/interface{?name}]

+ Parameters

     + name: sp3 (string) - partial interface name

#### Get available interfaces [GET]

+ Response 200 (text/plain)

     + Body

            ["en-US-interface-sp3"]

### Interface resource [/interface/{name}{?update}]
Access to available interfaces

+ Parameters

     + name: `en-US-interface-sp3` (required,string) - The name of an interface
     + update: 1 (optional,number) - Forces a rewrite of the interface for json and txt formats

#### retrieve interface [GET]

+ Request interface text

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z

     + Body

            null

+ Response 200 (text/plain)

     + Body

            print.buttons.main   message   description   icon

### Interface keys [/interface/{name}/key]
Access to interface keys

+ Parameters

     + name: `en-US-interface-sp3` (required,string) - The name of an interface

#### retrieve interface keys [GET]

+ Request interface keys

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z
            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 200 (text/plain)

     + Body

            ["print.buttons.main"]

### Interface entries search [/interface/{name}/search/{text}]
Search interface for text

+ Parameters

     + name: `en-US-interface-sp3` (required,string) - The name of an interface
     + text: `SignPuddle` (required,string) - The text for searching

#### retrieve matching entries [GET]

+ Request matching interface entries

     + Headers

            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 200 (text/plain)

     + Body

            [
              {
                "key": "print.buttons.main",
                "message": "Print it!"
              }
            ]

### Interface entry resource [/interface/{name}/entry]
Entries for interface

+ Parameters

     + name: `en-US-interface-sp3` (string) - The name of an interface

#### add interface entry [POST]

+ Request add new interface entry (application/json)

     + Headers

            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            {"key":"new.key.one", "message":"UI text","description":"about the text","icon":"search"}

+ Response 201 (text/plain)

     + Body

            ...

### Interface entry resource for key [/interface/{name}/entry/{key}]
Specific entries for interface

+ Parameters

     + name: `en-US-interface-sp3` (string) - The name of an interface
     + key: system.button.open (string) - The name of an interface key

#### retrieve interface entry [GET]

+ Request an interface entry

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z
            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 200 (text/plain)

     + Body

            ...

#### update interface entry [PUT]

+ Request an update for an existing entry

     + Headers

            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            {"key":"new.key.one", "message":"UI text","description":"about the text","icon":"search"}

+ Response 204

#### remove interface entry [DELETE]

+ Request the removal of an interface entry

     + Headers

            Pass: 724fd4b4438fba9d0c5ab89d0833e5c9

     + Body

            null

+ Response 204

