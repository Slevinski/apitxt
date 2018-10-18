# json2html.py is a python script to create an HTML file with or without JavaScript
#
# Copyright (c) 2017 Stephen E Slevinski Jr <slevin@signpuddle.net>
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
	with open(args.input) as data_file:    
		data = json.load(data_file)
else:
	with sys.stdin as data_file:    
		data = json.load(data_file)

if args.output:
  sys.stdout = open(args.output,'w')

def utf8(x):
	return x.encode('utf-8')


root = {}
route = ''
parameters = {}
for segment in data:

	if 'root' in segment:
		root = segment

	elif 'group' in segment:
##		print "// ## Group " + segment['group']
		try:
			pass
#			tlines = segment['description'].split("\n")
#			for tline in tlines:
#				print "// " + tline
		except:
			pass

	elif 'route' in segment:
		pass
#		route = segment['route']
#		if 'parameters' in segment:
#			parameters = segment['parameters']
#		else:
#			parameters = {}
	
	elif 'method' in segment:
		params = []
		queries = []
		routing = route
		try:
			while True:
				start = routing.index("{")
				end = routing.index("}")
				param = routing[start:end+1]
				if param[1]=="?":
					routing = routing.replace(param,'')
					queries = param[1:-1].replace("?","").split(",")
				else:
					routing = routing.replace(param,":" + param[1:-1])
					params.append(param[1:-1])
		except:
			pass

		try:
			vars = ",".join(["$" + p for p in params])
		except:
			vars = ''

#		print "$app->get('" + routing + "', function (" + vars + ") use ($app) {"
#		for query in queries:
#			print "  $" + query + " = $app->request()->get('" + query + "');"
#		print "  $timein = microtime(true);"
#		try:
#			print "  $app->contentType('" + segment['dialog'][0]['responses'][0]['type'] + "');"
#		except:
#			pass
#		print "  $searchTime = searchtime($timein);"
#		print "  header('Search-Time: ' . $searchTime);"
		if "code" in segment:
			for bline in segment['code']:
				pass
#				print "  " + bline
		else:
			try:
				for bline in segment['dialog'][0]['responses'][0]['lines']:
					pass
#					print "  echo '" + bline.replace("'","\\'") + "' . \"\\n\";"
			except:
				pass
#		print "});"

print "<!doctype html>"
print "<html>"
print "<head>"
print "  <meta charset=\"utf-8\"> "
print "  <meta id=\"idviewport\" name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1\">"
print "  <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">"
print "  <title>" + root['title'] + "</title>"
print "  <link rel=\"stylesheet\" type=\"text/css\" href=\"../include/common.css\" />"
print "  <script src=\"../include/min.js\"></script>"
print "  <script src=\"../include/majax.js\"></script>"
print "  <script src=\"../include/icons.js\"></script>"
print "  <noscript><link rel=\"stylesheet\" type=\"text/css\" href=\"../include/noscript.css\" /></noscript>"
print "</head>"
print "<body>"
print "  <noscript>"
print "    <img src=\"../include/icon.svg\" /><h1>" + root['title'] + "</h1>"
print "    <br clear=\"all\">"
print "    <hr><p>Please enable JavaScript and reload the page.</p><hr>"
print "  </noscript>"
print "  <script src=\"../config/config.js\"></script>"
print "  <script src=\"" + root['root'] + ".js\"></script>"
print "</body>"
print "</html>"
