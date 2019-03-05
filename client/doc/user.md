FORMAT: X-1A
HOST: https://signpuddle.com/server

# SignPuddle 3 User API
> v3.0.0

## Group user
SignPuddle 3 collections are organized by country and language codes

+ Source: [ApiTxt format](../src/user.txt) and [JSON objects](../src/user.json)
+ Documents: [API Blueprint](../doc/user.md) and [Stand Alone HTML](../doc/user.htm)
+ Live Page: [API Interface](../api/user.html) and [JavaScript](../api/user.js)

### Who uses SignWriting? [/user/who]
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

### User pass [/user/pass]
A string for accounting and validation

#### String for accounting and validation [POST]

+ Request user pass

     + Body

            null

+ Response 200 (text/plain)

     + Body

            {"pass": "90c19ce2076db097c75b3406e966a6b6","ip": "192.168.254.2"}

### User login [/user/login]
Validation of user with validated password

#### Process log in to server [PUT]

+ Request verify user (application/json)

     + Attributes
         + username: anonymous (string) - name of the user
         + pass: af77... (string) - pass for session validation
         + validated: 2793f... (string) - validated pass mixed with password

     + Body

            {"username":"anonymous","pass":"af77...","validated":"2793f..."}

+ Response 200 (application/json)

     response text here

     + Body

            {"user-profile":""}

### User profile [/user/{name}]
User details

+ Parameters

     + name: slevinski (string) - The name of a user

#### Update user profile [PUT]
Updates the profile of the user

+ Request user-update

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 204

#### Register new user [POST]
Creates and returns a new user

+ Request user-add

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 200 (text/plain)

     + Body

            profile created and returned

### User password [/user/{name}/password]
User password resource

+ Parameters

     + name: slevinski (string) - The name of a user

#### Update user password [POST]
Updates the password of the user

+ Request user-update-password (plain/text)

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            {"old":"149603e6c03516362a8da23f624db945","new":"22af645d1859cb5ca6da0c484f1f37ea"}

+ Response 204

#### Reset user password [PUT]
Creates a temporary password for the user

+ Request user-password-reset (plain/text)

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 204

### User email requests [/user/email]
Requests for email of username or password reset

#### List of user email requests [GET]
User email requests for username or passwords

+ Request user-email-request

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 200 (text/plain)

     + Body

            [{"name":"slevinski","email":"slevinski@signwriting.org","temp":"username"}]

### Username lookup [/user/email/{email}]
Forgot username email lookup

+ Parameters

     + email: slevinski@signwriting.org (string) - The email for a user

#### Lookup username [PUT]
Creates a request for email of username

+ Request user-name-lookup

     + Headers

            Pass: 5ffab638bde372b4fa63bb6f8484595d

     + Body

            null

+ Response 204

