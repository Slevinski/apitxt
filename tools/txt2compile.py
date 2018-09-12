# txt2compile.py is a python script that complies ApiTxt format into JSON data and API Blueprint
#
# Copyright (c) 2017 Stephen E Slevinski Jr <slevin@signpuddle.net>
#
# License: MIT
#

import sys
import os
import glob
import argparse
import json
from pprint import pprint

##################
# Argument Setup
##################
parser = argparse.ArgumentParser(description="Conversion of plain text to JSON data and API Blueprint"
	,epilog="Part of the ApiTxt project available online\nhttps://github.com/slevinski/apitxt")
parser.add_argument("-d","--document", help="Name of the document to build, test, and mock")
parser.add_argument("-s","--sections", help="List of sections to include")
parser.add_argument("-i","--input", help="Directory with txt files")
parser.add_argument("-o","--output", help="Directory for output")
parser.add_argument("-p","--php", help="Create index.php", action="store_true")
parser.add_argument("-l","--htm", help="Create stand-alone index.htm", action="store_true")
parser.add_argument("-t","--template", help="HTML template")
parser.add_argument("-j","--js", help="Create index.js and index.html", action="store_true")
parser.add_argument("-m","--mock", help="Start Snowboard mock server at end", action="store_true")
args = parser.parse_args()

if not args.input:
	args.input = "../source/"

if not args.output:
	args.output = "output/"

if not args.template:
        #args.template = "template/beta.html"
        args.template = "template/alpha.html"

if not args.document:
	files = glob.glob(args.input + "*txt")
	if not len(files):
		print ""
		print "FAILURE: no txt files available in " + args.input + " for processing"
	else:
		print
		print "Please specify a document from " + args.input
		documents = {}
		for file in files:
			parts = file.replace(args.input,'').split("-")
			document = parts[0]
			if (len(parts)) > 1:
				sub = parts[1].split(".")
				section = sub[0]
				
				if documents.has_key(document):
					documents[document].append(section)
				else:
					documents[document] = [section,]			
			
		for document in documents.keys():
			print '\tpython txt2compile.py -d ' + document + ' -s "' + ' '.join(documents[document]) + '"'
			print
	sys.exit()

if not args.sections:
	files = glob.glob(args.input + args.document + "*txt")
	if not len(files):
		print ""
		print "FAILURE: no txt files available in " + args.input + " for processing"
		print
	else:
		print
		print "Please specify the sections from " + args.input
		sections = []
		for file in files:
			parts = file.replace(args.input,'').split("-")
			if (len(parts)) > 1:
				sub = parts[1].split(".")
				section = sub[0]
				sections.append(section)
			
		print '\tpython txt2compile.py -d ' + args.document + ' -s "' + ' '.join(sections) + '"'
		print
	sys.exit()

sections = args.sections.split(" ")

files = []
for section in sections:
	if "-" in section:
		file = args.input + section + '.txt'
	else:
		file = args.input + args.document + '-' + section + '.txt'
	try:
		if os.stat(args.input + file).st_size == 0:
			file = args.input + section + '-main.txt'
		files.append(file)
	except:
		pass

if not len(files):
	print ""
	print "FAILURE: no txt files available in " + args.input + " for processing"
	sys.exit()
else:
	os.system('cat ' + ' '.join(files) + ' > ' + args.output + args.document + '.txt')
	os.system('rm ' + args.output + args.document + '.json > /dev/null 2>&1')
	os.system('python txt2json.py -e -i ' + args.output + args.document + '.txt  -o  ' + args.output + args.document + '.json')
	print
	os.system('python json2txt.py -i ' + args.output + args.document + '.json  -o  ' + args.output + args.document + '-pretty.txt')
	os.system("diff " + args.output + args.document + '.txt ' + args.output + args.document + '-pretty.txt > ' + args.output + args.document + '.diff')
	size = os.path.getsize(args.output + args.document + '.diff')
	if size:
		size1 = os.path.getsize(args.output + args.document + '.txt')
		size2 = os.path.getsize(args.output + args.document + '-pretty.txt')
		print "Files"
		print "	" + args.output + args.document + ".txt (" + str(size1) + " bytes)"
		print "	" + args.output + args.document + "-pretty.txt (" + str(size2) + " bytes)"
		print "Diff"
		print "	" + args.output + args.document + ".diff (" + str(size) + " bytes)"
		print
	else:
		print "Nicely formatted!"
		print
	os.system('rm ' + args.output + args.document + '.md > /dev/null 2>&1')
	os.system('python json2md.py -i ' + args.output + args.document + '.json -o ' + args.output + args.document + '.md')

	if args.php:
		os.system('python json2php.py -i ' + args.output + args.document + '.json -o ../website/index.php')

	if args.htm:
		#os.system('python json2htm.py -i ' + args.output + args.document + '.json -o ' + args.output + args.document + '.htm')
		#os.system('python md2htm.py -i ' + args.output + args.document + '.md -o ' + args.output + args.document + '.htm')
		os.system('~/snowboard html ' + args.output + args.document + '.md -t ' + args.template + ' > ' + args.output + args.document + '.htm')
	if args.js:
		os.system('python json2js.py -i ' + args.output + args.document + '.json -o ' + args.output + args.document + '.js')
		os.system('python json2html.py -i ' + args.output + args.document + '.json -o ' + args.output + args.document + '.html')

	if args.mock:
		print "Snowboard Lint"
		os.system('~/snowboard lint ' + args.output + args.document + '.md')
		print
		os.system('~/snowboard mock ' + args.output + args.document + '.md')

