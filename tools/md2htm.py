# json2htm.py is a python script to create a stand-alone HTML file with an htm extension
#
# Copyright (c) 2017-2018 Stephen E Slevinski Jr <slevin@signpuddle.net>
#
# License: MIT
#

import sys
import argparse
import glob
import json
import markdown
from pprint import pprint


##################
# Argument Setup
##################
parser = argparse.ArgumentParser(description="Create an HTML file with or without JavaScript"
	,epilog="Part of the ApiTxt project available online\nhttps://github.com/slevinski/apitxt")
parser.add_argument("-i","--input", help="name of input file")
parser.add_argument("-o","--output", metavar="filename", help="write to output file")
args = parser.parse_args()

if args.input:
	with open(args.input, 'r') as myfile:
		data = myfile.read()
else:
	print "FAILURE: no input file"

if args.output:
  sys.stdout = open(args.output,'w')

print markdown.markdown(data)
