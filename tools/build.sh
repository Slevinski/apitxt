python txt2compile.py -d index -s "root tools fsw swu user collection" -j -l
python publish.py -d index
python txt2compile.py -d tools -s "root main" -j -l
python publish.py -d tools
python txt2compile.py -d fsw -s "root main" -j -l
python publish.py -d fsw
python txt2compile.py -d swu -s "root main" -j -l
python publish.py -d swu
python txt2compile.py -d user -s "root main" -j -l
python publish.py -d user
python txt2compile.py -d collection -s "root main" -j -l
python publish.py -d collection
python txt2compile.py -d index -s "files tools tools-files fsw fsw-files swu swu-files user user-files collection collection-files" -p
python txt2compile.py -d index -s "tools fsw swu user collection" -m

