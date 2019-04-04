python txt2compile.py -d index -s "root user collection interface dictionary tools fsw swu apitxt" -j -l
python publish.py -d index
python txt2compile.py -d user -s "root main" -j -l
python publish.py -d user
python txt2compile.py -d collection -s "root main" -j -l
python publish.py -d collection
python txt2compile.py -d interface -s "root main" -j -l
python publish.py -d interface
python txt2compile.py -d dictionary -s "root main" -j -l
python publish.py -d dictionary
python txt2compile.py -d tools -s "root main" -j -l
python publish.py -d tools
python txt2compile.py -d fsw -s "root main" -j -l
python publish.py -d fsw
python txt2compile.py -d swu -s "root main" -j -l
python publish.py -d swu
python txt2compile.py -d apitxt -s "root main" -j -l
python publish.py -d apitxt
python txt2compile.py -d index -s "main  user user-files collection collection-files interface interface-files dictionary dictionary-files tools tools-files fsw fsw-files swu swu-files apitxt apitxt-files" -p
python txt2compile.py -d index -s "user collection interface dictionary tools fsw swu apitxt" -m

