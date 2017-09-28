# txt2mock.py is a python script to transform plain text into JSON data, API Blueprint, HTML documentation, and a mock PHP Slim v2 server
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
parser = argparse.ArgumentParser(description="Conversion of plain text to JSON data, API Blueprint, HTML Documentation, and a mock PHP Slim v2 server"
	,epilog="Part of the ApiTxt project available online\nhttps://github.com/slevinski/apitxt")
parser.add_argument("-d","--document", help="Name of the document to build, test, and mock")
parser.add_argument("-r","--root", help="add root header for document", action="store_true")
parser.add_argument("-s","--sections", help="List of sections to include")
parser.add_argument("-i","--input", help="Directory with txt files")
parser.add_argument("-o","--output", help="Directory for output")
parser.add_argument("-t","--template", help="HTML template")
parser.add_argument("-w","--website", help="Copy index.txt, .json, .md, and .html", action="store_true")
parser.add_argument("-p","--php", help="Create index.php", action="store_true")
parser.add_argument("-m","--mock", help="Start Snowboard mock server at end", action="store_true")
args = parser.parse_args()

if not args.input:
	args.input = "../source/"

if not args.output:
	args.output = "output/"

if not args.template:
	args.template = "template/beta.html"

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
			print '\tpython txt2mock.py -d ' + document
			try:
				index = documents[document].index('root')
				documents[document] = documents[document][:index] + documents[document][index+1:]
				print '\tpython txt2mock.py -d ' + document + ' -r -s "' + ' '.join(documents[document]) + '"'
			except:
				print '\tpython txt2mock.py -d ' + document + ' -s "' + ' '.join(documents[document]) + '"'
			print
	sys.exit()

if not args.sections:
	files = glob.glob(args.input + args.document + '-*txt')
	root = ""
	sections = []
	if not len(files):
		print ""
		print "FAILURE: no txt files for section " + args.document + " available in " + args.input + " for processing"
	else:
		if not args.root:
			for file in files:
				parts = file.replace(args.input,'').split("-")
				sub = parts[1].split(".")
				section = sub[0]
				sections.append(section)
else:
	sections = args.sections.split(" ")

try:
	index = sections.index('root')
	sections = sections[:index] + sections[index+1:]
	args.root = True
except:
	pass

files = []
if args.root:
	file = args.input + args.document + '-root.txt'
	files.append(file)
for section in sections:
	file = args.input + args.document + '-' + section + '.txt'
	files.append(file)

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
	if args.php:
		os.system('python json2php.py -i ' + args.output + args.document + '.json -o ../website/index.php')
	os.system('rm ' + args.output + args.document + '.md > /dev/null 2>&1')
	os.system('python json2md.py -i ' + args.output + args.document + '.json -o ' + args.output + args.document + '.md')
	print "Snowboard Lint"
	os.system('~/snowboard lint ' + args.output + args.document + '.md')
	print
	os.system('~/snowboard html ' + args.output + args.document + '.md -t ' + args.template + ' > ' + args.output + args.document + '.html')
	if args.website:
		os.system('cp ' + args.output + args.document + '.html ../website/index.html')
		os.system('cp ' + args.output + args.document + '.txt ../website/index.txt')
		os.system('cp ' + args.output + args.document + '.json ../website/index.json')
		os.system('cp ' + args.output + args.document + '.md ../website/index.md')
	if args.mock:
		os.system('~/snowboard mock ' + args.output + args.document + '.md')

