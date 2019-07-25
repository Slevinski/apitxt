# json2md.py is a python script to create API Blueprint md files from JSON data
#
# Copyright (c) 2017 Stephen E Slevinski Jr <slevin@signpuddle.net>
#
# License: MIT
#

import sys
import argparse
import json
from pprint import pprint


##################
# Argument Setup
##################
parser = argparse.ArgumentParser(description="Conversion of JSON data file to API Blueprint md files"
	,epilog="Part of the ApiTxt project available online\nhttps://github.com/slevinski/apitxt")
parser.add_argument("-i","--input", help="name of input file")
parser.add_argument("-o","--output", metavar="filename", help="write to output file")
args = parser.parse_args()

if args.input:
	with open(args.input) as data_file:    
		data = json.load(data_file)
else:
	with sys.stdin as data_file:    
		data = json.load(data_file)

if args.output:
  sys.stdout = open(args.output,'w')

def utf8(x):
	return x.encode('utf-8')

indent1 = " " * 5
indent2 = " " * 8
indent3 = " " * 12
groups = 0

for segment in data:

	if 'root' in segment:
		print "FORMAT: X-1A"
		try:
			print "HOST: " + segment['host']
		except:
			print "HOST: localhost:8087"
		print

		try:
			print "# " + segment['title']
		except:
			print "# API Documentation"

		if "lines" in segment:
			for line in segment['lines']:
				print line.replace("\t","&#9;")
		print

	elif 'group' in segment:
		groups = 1;
		print "## Group " + segment['group']
		if 'description' in segment:
			print segment['description'].replace("\t","&#9;")
		if 'lines' in segment:
			print
			for line in segment['lines']:
				print line.replace("\t","&#9;")
		print

	elif 'route' in segment:
		if 'name' in segment:
			print ("#" * groups) + "## " + segment['name'] + ' [' + segment['route'] + ']'
		else:
			print ("#" * groups) + "## " + segment['route']
		if 'description' in segment:
			print segment['description'].replace("\t","&#9;")
		print
		if 'lines' in segment:
			for line in segment['lines']:
				print line.replace("\t","&#9;")
			print
		if 'parameters' in segment:
			print "+ Parameters"
			print
			for param in segment['parameters']:
				line = indent1 + "+ " + param["name"]
				if "example" in param:
					line += ": " + param['example']
				if "type" in param:
					line += " (" + param['type'] + ")"
				if "description" in param:
					line += " - " + param['description']
				print line.encode('utf-8')
			print
	
	elif 'method' in segment:
		if 'name' in segment:
			print ("#" * groups) + "### " + segment['name'] + ' [' + segment['method'] + ']'
		else:
			print ("#" * groups) + "### " + segment['method']
		if 'description' in segment:
			print segment['description'].replace("\t","&#9;")
		if 'lines' in segment:
			for line in segment['lines']:
				print line.replace("\t","&#9;")
		print
		if 'dialog' in segment:
			for qa in segment['dialog']:
				if 'request' in qa:
					line = "+ Request"
					if "name" in qa['request']:
						line += ' ' + qa['request']['name']
					if 'type' in qa['request']:
						if qa['request']['type']:
							line += ' (' + qa['request']['type'] + ')'
					print line
					if 'lines' in qa['request']:
						print
						for line in qa['request']['lines']:
							print indent1 + utf8(line)
					if 'headers' in qa['request']:
						print
						print indent1 + "+ Headers"
						print
						for attr in qa['request']['headers']:
							print indent3 + attr + ": " + qa['request']['headers'][attr]
					print
					print indent1 + "+ Body"
					print
					try:
						for body in qa['request']['body']:
							print indent3 + utf8(body.replace("\t","   "))
					except:
						print indent3 + "null"
					print
				if 'responses' in qa:
					for response in qa["responses"]:
						if 'status' in response:
							line = "+ Response " + str(response['status'])
						else:
							line = "+ Response"
						if 'type' in response:
							line += ' (' + response['type'] + ')'
						print line
						if 'lines' in response:
							print
							for line in response['lines']:
								print indent1 + utf8(line)
						if 'headers' in response:
							print
							print indent1 + "+ Headers"
							print
							for attr in response['headers']:
								print indent3 + attr + ": " + response['headers'][attr]
						print
						if 'body' in response:
							print indent1 + "+ Body"
							print
							for body in response['body']:
								print indent3 + utf8(body.replace("\t","   "))
							print

	elif 'lines' in segment:
		for line in segment['lines']:
			print line.replace("\t","&#9;")
