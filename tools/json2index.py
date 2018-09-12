# json2index.py is a python script to create a route index
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
parser = argparse.ArgumentParser(description="Create a JavaScript application"
	,epilog="Part of the ApiTxt project available online\nhttps://github.com/slevinski/apitxt")
parser.add_argument("-i","--input", help="name of input file")
parser.add_argument("-s","--section", help="Name of the section")
parser.add_argument("-o","--output", metavar="filename", help="write to output file")
args = parser.parse_args()

if args.input:
	with open(args.input) as data_file:    
		data = json.load(data_file)
else:
	with sys.stdin as data_file:    
		data = json.load(data_file)

def utf8(x):
	return x.encode('utf-8')

root = {}
route = ''
parameters = {}
for segment in data:

	if 'root' in segment:
		root = segment
	elif 'group' in segment:
		if "groups" in root:
			root["groups"].append(segment)
		else:
			root["groups"] = [segment]
	elif 'route' in segment:
		if "routes" in root["groups"][-1]:
			root["groups"][-1]["routes"].append(segment)
		else:
			root["groups"][-1]["routes"] = [segment]
		pass
	elif 'method' in segment:
		if "methods" in root["groups"][-1]["routes"][-1]:
			root["groups"][-1]["routes"][-1]["methods"].append(segment)
		else:
			root["groups"][-1]["routes"][-1]["methods"] = [segment]


sections = []
for groups in root['groups']:
	for route in groups['routes']:
		parts = route["route"].split("/")
		if parts[1] and "{" not in parts[1] and parts[1] not in sections:
			sections.append(parts[1])

rt = "\troute\t"
mt = "\t\tmethod\tGET\t"
st = "\t\t\tresponse\t"
bt = "\t\t\t\tbody\t"

if args.output:
	sys.stdout = open(args.output + '/index-routes.txt','w')

if not args.section:
	print rt + "/\tRoute index"
	print mt + "Get the root index"
	print st + "200\ttext/plain"
	print bt + "Available routes:"
	print bt

	for section in sections:
		print bt + "/" + section

for section in sections:
	if args.output:
		sys.stdout = open(args.output + '/' + section + '-routes.txt','w')
	print rt + "/" + section + "/\t" + section + " index"
	print mt + "Get the " + section + " index"
	print st + "200\ttext/plain"
	print bt + "Available routes:"
	print bt
	for groups in root['groups']:
		for route in groups['routes']:
			if route["route"].startswith("/" + section):
				print bt + route["route"]
