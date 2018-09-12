# publish.py is a python script to copy files to the website
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
from shutil import copyfile

##################
# Argument Setup
##################
parser = argparse.ArgumentParser(description="API Blueprint to HTML documentation conversion and other files to website"
	,epilog="Part of the ApiTxt project available online\nhttps://github.com/slevinski/apitxt")
parser.add_argument("-d","--document", help="Name of the document to build, test, and mock")
parser.add_argument("-i","--input", help="Directory with source files")
parser.add_argument("-o","--output", help="Directory for output")
args = parser.parse_args()

if not args.input:
	args.input = "output/"

if not args.output:
	args.output = "output/"

if not args.document:
	files = glob.glob(args.input + "*.md")
	if not len(files):
		print ""
		print "FAILURE: no API Blueprint files available in " + args.input + " for processing"
	else:
		print
		print "Please specify a document from " + args.input
		documents = []
		for file in files:
			parts = file.replace(args.input,'').split(".md")
			documents.append(parts[0])
			
		for document in documents:
			print 'website root:'
			print '\tpython publish.py -d ' + document
			print 'subdirectory:'
			print '\tpython publish.py -d ' + document + ' -s'
			print
	sys.exit()

os.system('cp ' + args.output + args.document + '.html ../website/api/.')
os.system('cp ' + args.output + args.document + '.js ../website/api/.')
os.system('cp ' + args.output + args.document + '.txt ../website/src/.')
os.system('cp ' + args.output + args.document + '.json ../website/src/.')
os.system('cp ' + args.output + args.document + '.md ../website/doc/.')
os.system('cp ' + args.output + args.document + '.htm ../website/doc/.')

