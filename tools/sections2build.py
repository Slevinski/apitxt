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
parser.add_argument("-o","--output", help="Output name")
parser.add_argument("-s","--sections", help="Name of the sections to include")
parser.add_argument("-f","--force", help="Overwrite files", action="store_true")
args = parser.parse_args()

if not args.output:
	args.output = "build.sh"

if os.path.isfile(args.output)  and not args.force:
	print ""
	print "FAILURE: " + args.output + " already exists, use -f to force"
	print
	sys.exit()

if not args.sections:
	print ""
	print "FAILURE: section names are required, use -h for help"
	print
	sys.exit()

sys.stdout = open(args.output,'w')
print "python txt2compile.py -d index -s \"root " + args.sections + "\" -j -l"
print "python publish.py -d index"


sections = args.sections.split()
subnames = "main "
for section in sections:
	print "python txt2compile.py -d " + section + " -s \"root main\" -j -l"
	print "python publish.py -d " + section
	subnames += " " + section + " " + section + "-files"


print "python txt2compile.py -d index -s \"" + subnames + "\" -p"
print "python txt2compile.py -d index -s \"" + args.sections + "\" -m"
print
