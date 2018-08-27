# json2js.py is a python script to create JavaScript application
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
parser = argparse.ArgumentParser(description="Create a JavaScript application"
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

print "var data = " + json.dumps(root,indent=2)

print "var Main = {"
print "  view: function(vnode) {"
print "    return ["
print "      m(Header),"
print "      data['groups'].map(function(group){"
print "        return m(Group,{\"group\":group});"
print "      })"
print "    ];"
print "  }"
print "}"
print "var Header = {"
print "  view: function(vnode) {"
print "    return m(\"header.three\",["
print "      m(\"div\"),"
print "      m(\"h1.brand\",["
print "        m(\"i.icon\",m.trust('<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 382.39499 393.798\"><g transform=\"translate(-153.728 -166.677)\"><path fill=\"#000\" d=\"M348.22 266.68v259.504h-7V266.68\"></path></g><g transform=\"translate(-153.728 -166.677)\"><path fill=\"#000\" d=\"M348.22 166.677v32.32h-7v-32.32\"></path></g><g transform=\"translate(-153.728 -166.677)\"><linearGradient id=\"c\" gradientUnits=\"userSpaceOnUse\" x1=\"138.098\" y1=\"180.746\" x2=\"536.098\" y2=\"375.746\"><stop offset=\"0\" stop-color=\"#ff0700\"></stop><stop offset=\"1\" stop-color=\"#b40000\"></stop></linearGradient><path d=\"M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z\" fill=\"url(#c)\"></path></g></svg>')),"
print "        \" " + root["title"] + "\""
print "      ]),"
print "      m(\"div\")"
print "    ])"
print "  }"
print "}"
print "var Group = {"
print "  view: function(vnode) {"
print "    return m(\"section.boxed\",["
print "      m(\"h1\",vnode.attrs[\"group\"][\"group\"]),"
print "      m(\"p\",vnode.attrs[\"group\"][\"description\"]),"
print "      m(\"hr\"),"
print "      vnode.attrs[\"group\"][\"routes\"].map(function(route){"
print "        return ["
print "          m(\"h2\", route['name'])"
print "        ]"
print "      })"
print "    ])"
print "  }"
print "}"

#    <section class="boxed">
#        <h1>Settings</h1>
#        <hr>
#        <h2>settings.state.title</h2>
#        <form><label for="state">settings.state.status</label><input disabled="" id="state" type="text" class="warning"><label></label>
#            <div class="wide"><button class="primary sswOneD">Initial</button><button class="success sswOneD">Save</button><button class="outline sswOneD">Restore</button><button class="outline sswOneD">Forget</button></div>
#        </form>
#        <hr>

#print "    <section class=\"boxed\">"
#print "        <h1>" + root['title'] + "</h1>"
#print "        <hr>"
#print "        <h2>" + root['root'] + "</h2>"
#if "lines" in root:
#	lines = "\n".join(root['lines'])
#	print markdown.markdown(lines)
#else:
#	print "nothing more"
#print "</section>"

print ""
print "m.mount(document.body, Main);"
