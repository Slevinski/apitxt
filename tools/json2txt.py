# json2txt.py is a python script to recreate the ApiTxt Format document from JSON data
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
parser = argparse.ArgumentParser(description="Conversion of JSON data file to ApiTxt format"
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

for segment in data:

	if 'root' in segment:
		fields = ['root']
		for field in ["root", "title", "host"]:
			try:
				fields.append(segment[field])
			except:
				fields.append("")
		while not fields[-1]:
			fields.pop()
		print "	".join(fields)

		if "lines" in segment:
			for line in segment['lines']:
				print "	line	" + utf8(line.replace("<TAB>","<tab>").replace("\t","<TAB>"))

	elif 'group' in segment:
		fields = ['group']
		for field in ["group", "description"]:
			try:
				fields.append(segment[field])
			except:
				fields.append("")
		while not fields[-1]:
			fields.pop()
		print "	".join(fields)

		if "lines" in segment:
			for line in segment['lines']:
				print "	line	" + utf8(line.replace("<TAB>","<tab>").replace("\t","<TAB>"))
				
	elif 'route' in segment:
		fields = ["	route"]
		for field in ["route", "name", "description"]:
			try:
				fields.append(segment[field])
			except:
				fields.append("")
		while not fields[-1]:
			fields.pop()
		print "	".join(fields)

		if "lines" in segment:
			for line in segment['lines']:
				print "		line	" + utf8(line.replace("<TAB>","<tab>").replace("\t","<TAB>"))

		if "parameters" in segment:
			for param in segment['parameters']:
				fields = ["		parameter"]
				for field in ["name", "example", "type", "description"]:
					try:
						fields.append(param[field])
					except:
						fields.append("")
				while not fields[-1]:
					fields.pop()
				print "	".join(fields)

	
	elif 'method' in segment:
		fields = ["		method"]
		for field in ["method", "name", "description"]:
			try:
				fields.append(segment[field])
			except:
				fields.append("")
		while not fields[-1]:
			fields.pop()
		print "	".join(fields)

		if "lines" in segment:
			for line in segment['lines']:
				print "			line	" + utf8(line.replace("<TAB>","<tab>").replace("\t","<TAB>"))

		if "code" in segment:
			for line in segment['code']:
				print "			code	" + line

		if 'dialog' in segment:
			for qa in segment['dialog']:
				request = 0
				if 'request' in qa:
					request = 1
					fields = ["			request"]
					for field in ["name", "type"]:
						try:
							fields.append(qa['request'][field])
						except:
							fields.append("")
					while not fields[-1]:
						fields.pop()
					print "	".join(fields)

					if 'headers' in qa['request']:
						for header in qa['request']['headers']:
							print "				header	" + header + "	" + qa['request']['headers'][header]
					if "lines" in qa['request']:
						for line in qa['request']['lines']:
							print "				line	" + utf8(line.replace("<TAB>","<tab>").replace("\t","<TAB>"))
					if "body" in qa['request']:
						for body in qa['request']['body']:
							print "				body	" + utf8(body.replace("<TAB>","<tab>").replace("\t","<TAB>"))

				if 'responses' in qa:
					for response in qa["responses"]:
						fields = ["			" + "	"*request + "response"]
						try:
							fields.append(str(response["status"]))
						except:
							fields.append("")
						try:
							fields.append(str(response["type"]))
						except:
							fields.append("")
						while not fields[-1]:
							fields.pop()
						print "	".join(fields)
	
						if 'headers' in response:
							for header in response['headers']:
								print "				" + "	"*request + "header	" + header + "	" + response['headers'][header]
						if "lines" in response:
							for line in response['lines']:
								print "				" + "	"*request + "line	" + utf8(line.replace("<TAB>","<tab>").replace("\t","<TAB>"))
						if "body" in response:
							for body in response['body']:
								print "				" + "	"*request + "body	" + utf8(body.replace("<TAB>","<tab>").replace("\t","<TAB>"))
