cd ..
mkdir standalone
cd standalone
mkdir include
mkdir data
mkdir data/js
mkdir data/flags
cp ../website/start_alone.sh .

cp ../website/index.html .
cp ../website/index.js .
cp ../website/favicon.ico .

cp ../website/include/common.css include/.
cp ../website/include/world.js include/.
cp ../website/include/common.js include/.
cp ../website/include/min.js include/.
cp ../website/include/icons.js include/.
cp ../website/include/icon.svg include/.
cp ../website/include/noscript.css include/.
cp ../website/data/js/interface-sp3.js data/js/.
cp ../website/data/js/interface-print.js data/js/.
cp ../website/data/js/interface-world.js data/js/.
cp ../website/data/flags/*png data/flags/.

