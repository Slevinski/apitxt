# SignPuddle 3 Data

> AUTHOR: https://SteveSlevinski.me  
> SUPPORT: https://www.patreon.com/signwriting

## Group Collection

SignPuddle 3 organizes six types of collections for SignWriting.
Each collection is available as an SQLite database and as a plain text file.

```
D
  dictionary
    | - for writing and spellcheck
L
  literature
    | - for writing extended texts
I
  interface
    | - for client display language
A
  alphabet
    | - for language specific symbols
F
  fingerspell
    | - for letter spelling
K
  keyboard
    | - for physical and virtual typing
```

Collections have a standardized naming scheme.
> pattern: {language}-{country}-{collection type}-{name}  
> example:  ase-US-interface-sp3

## Group Filesystem


+ SignPuddle 3 Server  
    + data  
        + iswa2010.db  
        + db/
            + ase-US-dictionary-public.db  
        + txt/
            + ase-US-dictionary-public.txt
        + img/
            + md5 hash for image filename
        + archive/
            + 2018-06-ase-US-dictionary-public.db  
            + 2018-06-ase-US-dictionary-public.txt  
            + 2018-06-01-ase-US-dictionary-public.diff  
            + 2018-06-ase-US-dictionary-public-images.zip
        + cron/  
            + daily.sh
            + daily.py
            + monthly.sh
            + monthly.py
        + security/  
            + create_security.sh
            + security.sql
            + user.txt
            + user_collections.txt
            + security.db  

## Group  


