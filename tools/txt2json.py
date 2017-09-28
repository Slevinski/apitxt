# txt2json.py is a python script to create JSON data from plain text
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
parser = argparse.ArgumentParser(description="Conversion of plain text lines to an array of JSON objects"
	,epilog="Part of the ApiTxt project available online\nhttps://github.com/slevinski/apitxt")
parser.add_argument("-i","--input", help="name of input file")
parser.add_argument("-o","--output", help="write to output file")
parser.add_argument("-e","--errors", help="check for errors and report", action="store_true")
args = parser.parse_args()

if args.input:
	lines = [line.strip() for line in open(args.input)]
else:
	args.input = "sys.stdin"
	lines = [line for line in sys.stdin]

def utf8(x):
	return x.encode('utf-8')

document = []

method = {}
request = {}
response = {}
errors = []

num = 0
for line in lines:
	num += 1

	raw = line.strip().split("	")
	parts = map(str.strip,raw)
	segment = parts[0].strip()
	
	if segment == 'root':
		if method.has_key("method"):
			document.append(method)
			method = {}
		
		try:
			root = {"root":parts[1]}
		except:
			root = {"root":""}

		root['meta'] = "Generated from ApiTxt format (" + args.input + ") using txt2json.py"
		
		try:
			root['title'] = parts[2]
		except:
			pass

		try:
			root['host'] = parts[3]
		except:
			pass

		document.append(root)
		
	elif segment == 'group':
		if method.has_key("method"):
			document.append(method)
			method = {}
		try:
			group = {"group":parts[1]}
		except:
			group = {"group":"Line " + str(num)}

		try:
			group["description"] = parts[2]
		except:
			pass
		
		document.append(group)

	elif segment == 'route':
		if method.has_key("method"):
			document.append(method)
			method = {}

		try:
			route = {"route":parts[1]}
		except:
			route = {"route":"/Line_" + str(num)}

		try:
			route["name"] = parts[2]
		except:
			route["name"] = "Line_" + str(num)

		try:
			route["description"] = parts[3]
		except:
			pass
		
		sub = route["route"].split('{')
		if len(sub) > 1:
			route["parameters"] = []

			list = ''
			last = ''
			for part in sub[1:]:
				text = part.split("}")[0]
				params = text.replace("?","").split(",")
				for param in params:
					list += param + ','
					last = param
			params = list.split(',')

			for param in params[:-1]:
					route["parameters"].append({"name":param})
			
		document.append(route)

	elif segment == 'parameter':
		if len(document) == 0:
			errors.append({"error":"Line " + str(num) + ": no route available for parameter","line":line})
		else:
			if "route" in document[-1]:
				if "parameters" in document[-1]:
					index = next((i for i, item in enumerate(document[-1]["parameters"]) if item['name'] == parts[1]),-1)
					if index>-1:
						try:
							document[-1]["parameters"][index]['example'] = parts[2]
						except:
							pass
						try:
							document[-1]["parameters"][index]['type'] = parts[3]
						except:
							pass
						try:
							document[-1]["parameters"][index]['description'] = parts[4]
						except:
							pass
					else:
						errors.append({"error":"Line " + str(num) + ": parameter not on route","line":line})
				else:
					errors.append({"error":"Line " + str(num) + ": no parameters on route","line":line})
			else:
				errors.append({"error":"Line " + str(num) + ": no route available for parameter","line":line})

	elif segment == 'method':
		if method.has_key("method"):
			document.append(method)

		try:
			method = {"method":parts[1]}
		except:
			method = {"method":"GET"}

		try:
			method["name"] = parts[2]
		except:
			pass

		try:
			method["description"] = parts[3]
		except:
			pass

	elif segment == 'request':
		if not method.has_key("method"):
			errors.append({"error":"Line " + str(num) + ": no method available","method":method,"line":line})
			continue

		request = {}
		try:
			request["name"] = parts[1]
		except:
			pass

		try:
			request['type'] = parts[2]
		except:
			pass

		exchange = {'request':request}
		if "dialog" in method:
			method["dialog"].append(exchange)
		else:
			method['dialog'] = [exchange]

	elif segment == 'response':
		if not method.has_key("method"):
			errors.append({"error":"Line " + str(num) + ": no method available for response","line":line})
			continue

		response = {}
		try:
			response['status'] = int(parts[1]);
		except:
			response['status'] = 0;

		try:
			response['type'] = parts[2];
		except:
			pass

		if "dialog" in method:
			if len(method["dialog"]):
				if "responses" in method["dialog"][-1]:
					method["dialog"][-1]["responses"].append(response)
				else:
					method["dialog"][-1]["responses"] = [response]
			else:
				method["dialog"].append({"responses":[response]})
		else:
			method['dialog'] = [{"responses":[response]}]

	elif segment == 'header':
		if not method.has_key("method"):
			errors.append({"error":"Line " + str(num) + ": no method available for response","line":line})
			continue
		try:
			hName = parts[1]
			hValue = parts[2]
		except:
			errors.append({"error":"Line " + str(num) + ": header problem","line":line})
		
		if "dialog" in method:
			if len(method["dialog"]):
				if "responses" in method["dialog"][-1]:
					if len(method["dialog"][-1]["responses"]):
						if "headers" in method["dialog"][-1]["responses"][-1]:
							method["dialog"][-1]["responses"][-1]["headers"][hName] = hValue
						else:
							method["dialog"][-1]["responses"][-1]["headers"] = {hName: hValue}
					else:
						errors.append({"error":"Line " + str(num) + ": dialog exchange responses is empty"})
				elif "request" in method["dialog"][-1]:
					if "headers" in method["dialog"][-1]["request"]:
						method["dialog"][-1]["request"]["headers"][hName] = hValue
					else:
						method["dialog"][-1]["request"]["headers"] = {hName: hValue}
				else:
					errors.append({"error":"Line " + str(num) + ": dialog exchange without a request or response"})
			else:
				errors.append({"error":"Line " + str(num) + ": dialog has no exchanges"})

	elif segment == 'line':
		try:
			start = line.index("line	")
			newline = line[start+5:].replace("<TAB>","	").replace("<tab>","<TAB>")
		except:
			newline = ""
		if "method" in method:
			if "dialog" in method:
				if len(method["dialog"]):
					if "responses" in method["dialog"][-1]:
						if len(method["dialog"][-1]["responses"]):
							if "lines" in method["dialog"][-1]["responses"][-1]:
								method["dialog"][-1]["responses"][-1]["lines"].append(newline)
							else:
								method["dialog"][-1]["responses"][-1]["lines"] = [newline]
						else:
							errors.append({"error":"Line " + str(num) + ": dialog exchange responses is empty"})
					elif "request" in method["dialog"][-1]:
						if "lines" in method["dialog"][-1]["request"]:
							method["dialog"][-1]["request"]["lines"].append(newline)
						else:
							method["dialog"][-1]["request"]["lines"] = [newline]
					else:
						errors.append({"error":"Line " + str(num) + ": dialog exchange without a request or response"})
				else:
					errors.append({"error":"Line " + str(num) + ": dialog has no exchanges"})
			else:
				if "lines" in method:
					method['lines'].append(newline)
				else:
					method['lines'] = [newline]
						
					
		else:
			if len(document):
				if "lines" in document[-1]:
					document[-1]["lines"].append(newline)
				else:
					document[-1]["lines"] = [newline]
			else:
				document.append({"lines": [newline]})
	elif segment == 'code':
		try:
			start = line.index("code	")
			newline = line[start+5:].replace("<TAB>","	").replace("<tab>","<TAB>")
		except:
			newline = ""
		if "method" in method:
			if "code" in method:
				method["code"].append(newline)
			else:
				method["code"] = [newline]
		else:
			errors.append({"error":"Line " + str(num) + ": code without method","line":line})
	else:
		if line:
			errors.append({"error":"Line " + str(num) + ": segment not found","line":line})

if method:
	document.append(method)

if errors:
	document.append({"errors":errors})
	if args.errors:
		print "ApiTxt Format"
		print "ERRORS"
		print json.dumps(errors,indent=2)
elif args.errors:
	print "ApiTxt Format"
	print "OK"

if args.output:
	sys.stdout = open(args.output,'w')

print json.dumps(document,indent=2)
