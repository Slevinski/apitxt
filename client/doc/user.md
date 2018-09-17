FORMAT: X-1A
HOST: https://signpuddle.com/server

# SignPuddle 3 User API
> v3.0.0

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


