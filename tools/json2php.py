# json2php.py is a python script to create index.php for the Slim Framework v2 from JSON data
#
# Copyright (c) 2017 Stephen E Slevinski Jr <slevin@signpuddle.net>
#
# License: MIT
#

import sys
import argparse
import glob
import json
from pprint import pprint


##################
# Argument Setup
##################
parser = argparse.ArgumentParser(description="Conversion of JSON data file to index.php for Slim v2"
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

print "<?php"
print "/**"
print "* API v2.0.0"
print "* generated with tools/json2php.py from https://github.com/Slevinski/apitxt"
print "*/"
print ""
print "header('Access-Control-Allow-Origin: *');"
print "header('Access-Control-Allow-Headers: Content-Type, ETag, If-None-Match');"
print "header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');"
print "header('X-Powered-By: SignPuddle 3');"
print ""
files = glob.glob('../back/include/*php')
if len(files):
	for file in files:
		file = file.replace('../back/','')
		if file != 'include/rewrite.php':
			print 'require "' + file + '";'
print ""
print "$_ENV['SLIM_MODE'] = 'development'; //'development' or 'production'"
print "require 'Slim/Slim.php';"
print "\Slim\Slim::registerAutoloader();"
print "$app = new \Slim\Slim();"
print ""
print "$app->configureMode('production', function () use ($app) {"
print "    error_reporting(E_NONE);"
print "    ini_set('display_errors', 0);"
print "    $app->config(array("
print "        'log.enable' => true,"
print "        'debug' => false,"
print "        'entry_limit' => 100"
print "    ));"
print "});"
print ""
print "$app->configureMode('development', function () use ($app) {"
print "    error_reporting(E_ALL);"
print "    ini_set('display_errors', 1);"
print "    $app->config(array("
print "        'log.enable' => false,"
print "        'debug' => true,"
print "        'entry_limit' => 100"
print "    ));"
print "});"
print ""
print "/********************/"
print "/* halting functions */"
print "$app->notFound(function () use ($app) {"
print "  halting(404,'Not Found');"
print "});"
print ""
print "/********************/"
print "/* common functions */"
print "function getFile($file){"
print "  global $app;"
print "  $parts = explode('.',$file);"
print "  $rel_api = $file;"
print "  $abs_api = dirname(__FILE__) . '/' . $rel_api;"
print "  if ($parts[1] != 'php' && $file != 'Slim' && file_exists($abs_api)){"
print "    switch ($parts[1]){"
print "      case 'db':"
print "        $app->contentType('application/x-sqlite3');"
print "        $app->response->headers->set('Content-Disposition','attachment; filename=' . pathinfo($app->request->getResourceUri(),PATHINFO_FILENAME) . '.db');"
print "        break;"
print "      case 'css':"
print "        $app->contentType('text/css');"
print "        break;"
print "      case 'svg':"
print "        $app->contentType('image/svg+xml');"
print "        break;"
print "      case 'htm':"
print "      case 'html':"
print "        $app->contentType('text/html; charset=utf-8');"
print "        break;"
print "      case 'js':"
print "        $app->contentType('application/javascript');"
print "        break;"
print "      case 'json':"
print "        $app->contentType('application/json');"
print "        break;"
print "      default:"
print "        $app->contentType('text/plain; charset=utf-8');"
print "        break;"
print "    }"
print "    echo file_get_contents($rel_api);"
print "  } else {"
print "    $app->notFound();"
print "  }"
print "}"
print ""
print "function echoFile($file){"
print "  $handle = fopen($file, 'r');"
print "  if ($handle) {"
print "    while (($line = fgets($handle)) !== false) {"
print "      echo $line;"
print "    }"
print "    fclose($handle);"
print "  }"
print "}"

route = ''
parameters = {}
for segment in data:

	if 'root' in segment:
		pass

	elif 'group' in segment:
		print "/**********/"
		print "// ## Group " + segment['group']
		try:
			tlines = segment['description'].split("\n")
			for tline in tlines:
				print "// " + tline
		except:
			pass

	elif 'route' in segment:
		route = segment['route']
		if 'parameters' in segment:
			parameters = segment['parameters']
		else:
			parameters = {}
	
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

		if (routing[-1]=="/"):
			print "$app->get('" + routing[0:-1] + "', function (" + vars + ") use ($app) {"
			print "  $app->redirect('" + routing[1:] + "');"
			print "});"
		print "$app->options('" + routing + "', function (){});"
		print "$app->" + segment['method'].lower() + "('" + routing + "', function (" + vars + ") use ($app) {"
		for query in queries:
			print "  $" + query + " = $app->request()->get('" + query + "');"
		print "  $timein = microtime(true);"
		try:
			print "  $app->contentType('" + segment['dialog'][0]['responses'][0]['type'] + "');"
		except:
			pass
		if "code" in segment:
			for bline in segment['code']:
				print "  " + bline
		else:
			try:
				for bline in segment['dialog'][0]['responses'][0]['body']:
					print "  echo '" + bline.replace("'","\\'") + "' . \"\\n\";"
			except:
				pass
		print "});"
		print


print "$app->run();"
