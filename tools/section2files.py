# section2files.py is a python script to initialize the files for a section
#
# Copyright (c) 2017-2018 Steve Slevinski <slevin@signpuddle.net>
#
# License: MIT

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
parser = argparse.ArgumentParser(description="Create APITXT files for a section"
	,epilog="Part of the ApiTxt project available online\nhttps://github.com/slevinski/apitxt")
parser.add_argument("-o","--output", help="Directory for output")
parser.add_argument("-s","--section", help="Name of the section")
parser.add_argument("-f","--force", help="Overwrite files", action="store_true")
args = parser.parse_args()

if not args.output:
	args.output = "../source/"

if not args.section:
	print ""
	print "FAILURE: section name is required, use -h for help"
	print
	sys.exit()

os.system('touch ' + args.output + 'index-' + args.section + '.txt')

# {section}-root.txt
fname = args.output + args.section + '-root.txt'
if os.path.isfile(fname)  and not args.force:
	print "WARNING: file exists - " + fname
else:
	sys.stdout = open(fname,'w')
	print "root	" + args.section + "	SignPuddle " + args.section.title() + " API	https://signpuddle.net/v3"
	print "	line	> v3.0.0"
	print "	line	"
	print "	line	+ [txt](../src/" + args.section + ".txt) - ApiTxt format"
	print "	line	+ [json](../src/" + args.section + ".json) - array of JSON objects"
	print "	line	+ [html](../api/" + args.section + ".html) - HTML API Interface"
	print "	line	+ [md](../doc/" + args.section + ".md) - API Blueprint"
	print "	line	+ [htm](../doc/" + args.section + ".htm) - Stand Alone HTML"

# {section}-files.txt
fname = args.output + args.section + '-files.txt'
if os.path.isfile(fname)  and not args.force:
	print "WARNING: file exists - " + fname
else:
	sys.stdout = open(fname,'w')
	print "group	" + args.section + "files"
	print "	route	/" + args.section + "/	Root as " + args.section + ".html"
	print "		method	GET	Get the " + args.section + " as HTML"
	print "			code	getFile('api/" + args.section + ".html');"
	print "			response	200	text/plain"
	print "				line	" + args.section + ".html file contents here"

# {section}-main.txt
fname = args.output + args.section + '-main.txt'
if os.path.isfile(fname)  and not args.force:
	print "WARNING: file exists - " + fname
else:
	sys.stdout = open(fname,'w')
	print "group	" + args.section + "	Resources related to " + args.section
	print "	route	/" + args.section + "	Root " + args.section
	print "		method	GET	Get main " + args.section
	print "			code	  echo 'hello';"
	print "			response	200	text/plain"
	print "				line	world"
