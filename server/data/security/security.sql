.mode csv
.separator "\t"
.print
.print # SignPuddle 3 security database creation and import
.print

.print ## Importing collections
CREATE TABLE IF NOT EXISTS collection(name text primary key unique, code text unique,  title text, user text, created_at text, view_pass int, add_pass int, edit_pass int, register_level int, upload_level int);
.import collection.txt collection

.print ## Importing users
CREATE TABLE IF NOT EXISTS user(name text primary key unique, display text, signname text, email text, password text, temp text, security int, country text, spoken text, signed text, interface text, dictionary text, literature text, fingerspell text, alphabet text, keyboard text, detail text);
.import user.txt user 

.print ## Importing users collection security
CREATE TABLE IF NOT EXISTS usercollection(collection text, user text, security int);
.import user_collections.txt usercollection

.print ## Create verify table 
CREATE TABLE IF NOT EXISTS verify(pass text, created_at text, ip0 text, ip1 text, ip2 text, user text);

.print
.print ## Count output
select 'collection count ' || count(*) from collection;
select 'user count ' || count(*) from user;
select 'usercollection count ' || count(*) from usercollection;
select 'verify count ' || count(*) from verify;

.quit

.print ## Importing collections
CREATE TABLE IF NOT EXISTS collection(country text, language text, category text, name text, title text, detail text);
.print collection
.import collection.txt collection

.print ## Importing collections
CREATE TABLE IF NOT EXISTS collection(country text, language text, category text, name text, title text, detail text);
.print collection
.import collection.txt collection

.print ## Create systemkey table
CREAT TABLE IF NOT EXISTS systemkey(systemkey text, 


.print
.print ## Count output
select 'user count ' || count(*) from user;
select 'puddleuser count ' || count(*) from puddleuser;
select 'verify count ' || count(*) from verify;

.quit
-------------

> sqlite3 security.db < security.sql

