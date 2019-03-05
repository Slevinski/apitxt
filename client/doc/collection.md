FORMAT: X-1A
HOST: https://signpuddle.com/server

# SignPuddle 3 Collection API
## Collections

SignPuddle 3 organizes related data into collections.
All collections are available in three different forms: database, plain text files, and JSON objects

### Databases

Each collection is available as an SQLite database.
These databases are the primary source and all edits are directly applied to the database.

### Plain Text Files

Each collection is available as a plain text field where each entry occupies its own line.
Each entry contains multiple fields that are divided by tab characters.
The plain text files are designed for easy import and export from the databases.

### JSON Data files

Each collection is available as a JSON data file.
These files are useful for the client section for default configuration.

## Collection Types

There are six types of collections: interface, dictionary, literature, alphabet, fingerspell, and keyboard.

### Interface

The interface collection deals with user interface elements.

### Dictionary

The dictionary collection deals with individual sign details.

### Literature

The literature collection deals with segments of sign text.

### Alphabet

The alphabet collection deals with subset of ISWA 2010.

### Fingerspell

The fingerspell collection deals with individual letters for fingerspelling.

### Keyboard

The keyboard collection deals with commands and keys for keyboarding.


## Group collection
Resources related to collections in general

+ Source: [ApiTxt format](../src/collection.txt) and [JSON objects](../src/collection.json)
+ Documents: [API Blueprint](../doc/collection.md) and [Stand Alone HTML](../doc/collection.htm)
+ Live Page: [API Interface](../api/collection.html) and [JavaScript](../api/collection.js)

### Collections available [/collection{?name}]

+ Parameters

     + name: sp3 (string) - partial collection name

#### Get available collections [GET]

+ Response 200 (text/plain)

     + Body

            ["en-US-interface-sp3"]

### Collection resource [/collection/{name}]
Specific collection

+ Parameters

     + name: `en-US-interface-sp3` (string) - The name of a collection

#### delete collection [DELETE]

+ Request the removal of a collection

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 204

### Collections security [/collection/security]
Security settings for all collections

#### Get collections security [GET]

+ Request collections security

     + Headers

            If-Modified-Since: 2019-01-16T16:56:19.175Z

     + Body

            null

+ Response 200 (text/plain)

     + Body

            [{"name": "en-US-interface-sp3","code": "ui1","title": "English Interface for SignPuddle 3","user": "slevinski","created_at": "","view_pass": 0,"add_pass": 1,"edit_pass": 1,"register_level": 0,"upload_level": 4}]

### Collection security [/collection/{name}/security]
Details about the collection security

+ Parameters

     + name: `en-US-interface-sp3` (required,string) - The name of the collection

#### retrieve collection security [GET]

+ Request interface security

     + Body

            null

+ Response 200 (text/plain)

     + Body

            {"name": "en-US-interface-sp3","code": "ui1","title": "English Interface for SignPuddle 3","user": "slevinski","created_at": "","view_pass": 0,"add_pass": 1,"edit_pass": 1,"register_level": 0,"upload_level": 4}

#### Update collection security [PUT]

+ Request an update for an existing entry (text/plain)

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            {"name": "en-US-interface-sp3","code": "ui1","title": "English Interface for SignPuddle 3","user": "slevinski","created_at": "","view_pass": 0,"add_pass": 1,"edit_pass": 1,"register_level": 0,"upload_level": 4}

+ Response 204

#### Remove security for collection [DELETE]

+ Request the deletion of collection security

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 204

### Collection users [/collection/{name}/users]

+ Parameters

     + name: `ase-US-dictionary-public` (string) - collection name

#### Get collection users [GET]

+ Response 200 (text/plain)

     + Body

            [{"user": "test_user","security": 3}]

### Management for unknown collections [/collection/manage/unknown]

#### Get list of unknown collections with user management [GET]

+ Response 200 (text/plain)

     + Body

            ["es-US-interface-sp3"]

### Collection users management [/collection/{name}/manage]

+ Parameters

     + name: `ase-US-dictionary-public` (string) - collection name

#### Get collection management [GET]

+ Request collection management

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 200 (text/plain)

     + Body

            [{"name": "test_user","display": "Test Editor","email": "testing@gmail.com","security": 3}]

#### Update collection management [PUT]

+ Request an update for collection management

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            {"user":"slevinski","security":4}

+ Response 204

#### Remove user management for collection [DELETE]

+ Request the removal of user management for a collection

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 204

### Collection user [/collection/{name}/manage/{user}]

+ Parameters

     + name: `ase-US-dictionary-public` (string) - collection name
     + user: `slevinski` (string) - user name

#### Remove user from collection management [DELETE]

+ Request the removal of a user from collection management

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 204

### Collection Request Copy [/collection/{name}/request/{source}]

+ Parameters

     + name: `es-US-interface-sp3` (required,string) - The name of the new collection
     + source: `en-US-interface-sp3` (required,string) - The name of the source collection

#### request the creation of a new collection [POST]

+ Request new collection from source

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 204

