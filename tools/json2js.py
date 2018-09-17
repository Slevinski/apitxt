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

def lines2html(lines):
	return markdown.markdown("\n".join(lines)).replace("<code>","<pre><code>").replace("</code>","</code></pre>")

root = {}
route = ''
parameters = {}
for segment in data:
	if 'lines' in segment:
		segment['html'] = lines2html(segment['lines'])

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
		if 'dialog' in segment:
			for exchange in segment['dialog']:
				if "request" in exchange:
					if "lines" in exchange['request']:
						exchange['request']['html'] = lines2html(exchange['request']['lines'])
				for response in exchange['responses']:
					if "lines" in response:
						response['html'] = lines2html(response['lines'])

print "var spVersion = \"3\";"
print "host = host?host:\"" + root['host'] + "\";"
print "var spLogo = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 382.39499 393.798\"><g transform=\"translate(-153.728 -166.677)\">  <path fill=\"#000\" d=\"M348.22 266.68v259.504h-7V266.68\"/></g><g transform=\"translate(-153.728 -166.677)\">  <path fill=\"#000\" d=\"M348.22 166.677v32.32h-7v-32.32\"/></g><g transform=\"translate(-153.728 -166.677)\">  <linearGradient id=\"c\" gradientUnits=\"userSpaceOnUse\" x1=\"138.098\" y1=\"180.746\" x2=\"536.098\" y2=\"375.746\">  <stop offset=\"0\" stop-color=\"#ff0700\"/>  <stop offset=\"1\" stop-color=\"#b40000\"/>  </linearGradient>  <path d=\"M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z\" fill=\"url(#c)\"/></g></svg>';"
print ""
print "var data = " + json.dumps(root,indent=2)
print "var mclass = {"
print "  \"GET\": \"success\","
print "  \"POST\": \"primary\","
print "  \"PUT\": \"info\","
print "  \"DELETE\": \"danger\""
print "};"
print ""
print "var Main = {"
print "  view: function(vnode) {"
print "    return ["
print "      m(Header),"
print "      m(Top),"
print "      data['groups'].map(function(group,iG){"
print "        return m(Group,{\"group\":group,\"iG\":iG});"
print "      })"
print "    ];"
print "  }"
print "}"
print "var Header = {"
print "  view: function(vnode) {"
print "    return m(\"header.main\",["
print "      m(\"span\"),"
print "      m(\"button\", {class: \"large brand pseudo\"}, ["
print "        m.trust(spLogo),"
print "        m(\"span\",\"SignPuddle 3\")"
print "      ]),"
print "      m(\"span\")"
print "    ])"
print "  }"
print "}"
print "var Top = {"
print "  view: function(vnode) {"
print "    return m(\"section.boxed\",["
print "      m(\"h1\",\"" + root['title'] + "\"),"
print "      m.trust(data[\"html\"]),"
print "      m(\"p\",["
print "        m(\"label.large[for=host]\",\"Server Host\"),"
print "        m(\"input#host.medium[type=text][name=host]\",{"
print "          \"value\":host,"
print "          onchange: function(e){host=e.target.value;}"
print "        })"
print "      ])"
if len(root['groups'])==1:
	print "      ,m(\"header.group\",["
	print "        m(\"span]\"),"
	print "        m(\"h1\",\"Group \" + data[\"groups\"][0][\"group\"]),"
	print "        m(\"span\")"
	print "      ]),"
	print "      m(\"p\",data[\"groups\"][0][\"description\"]),"
	print "      m.trust(data[\"groups\"][0][\"html\"])"
print "    ])"
print "  }"
print "}"
print "var Group = {"
print "  view: function(vnode) {"
print "    var iG = vnode.attrs[\"iG\"];"
if len(root['groups'])>1:
	print "    return m(\"section.boxed\",["
	print "      m(\"header.group\",["
	print "        m(\"span]\"),"
	print "        m(\"h1\",\"Group \" + vnode.attrs[\"group\"][\"group\"]),"
	print "        m(\"span\")"
	print "      ]),"
	print "      m(\"p\",vnode.attrs[\"group\"][\"description\"]),"
	print "      m.trust(vnode.attrs[\"group\"][\"html\"]),"
else:
	print "    return ["
print "      vnode.attrs[\"group\"][\"routes\"].map(function(route,iR){"
if len(root['groups'])>1:
	print "        return ["
else:
	print "        return m(\"section.boxed\",["
print "          m(\"header.route\",["
print "            m(\"span]\"),"
print "            m(\"h2\", route[\"name\"]),"
print "            m(\"span\")"
print "          ]),"
print "          m.trust(route[\"html\"]),"
print "          route[\"methods\"].map(function (method, iM){"
print "            var id = method[\"name\"].replace(/\s/g, '') + \"_\";"
print "            return ["
print "              m(\"form\","
print "                m(\"fieldset\",["
print "                  m(\"h3\",method[\"name\"]),"
print "                  m.trust(method[\"html\"]),"
print "                  m(\"input.large.\" + mclass[method[\"method\"]], {\"disabled\": true, \"value\":route[\"route\"]}),"
print "                  (route[\"parameters\"] || []).map(function(param,iP){"
print "                    return m(\"p\",["
print "                      m(\"label[for=\" + id + param[\"name\"] + \"]\",param[\"name\"] + \": \" + param[\"description\"]+ \" (\" + param[\"type\"] + \")\"),"
print "                      m(\"input#\" + id + param[\"name\"] + \"[type=text][name=\"+ param[\"name\"] + \"]\",{"
print "                        \"value\":param[\"example\"],"
print "                        onchange: function(e){data[\"groups\"][iG][\"routes\"][iR][\"parameters\"][iP][\"example\"]=e.target.value;}"
print "                      })"
print "                    ]);"
print "                  }),"
print "                  method[\"method\"][0]==\"P\"?m(\"p\",["
print "                    m(\"label[for=\" + id + \"body\",\"body: The main contents of the request (string)\"),"
print "                    m(\"textarea#\" + id + \"body[name=body]\","
print "                      {onchange: function(e){ data[\"groups\"][iG][\"routes\"][iR][\"methods\"][iM][\"dialog\"][0][\"request\"][\"body\"] = e.target.value.split(\"\\n\");}},"
print "                      (data[\"groups\"][iG][\"routes\"][iR][\"methods\"][iM][\"dialog\"][0][\"request\"][\"body\"]||[]).join(\"\\n\"))"
print "                  ]):\"\","
print "                  m(\"button.\" + mclass[method[\"method\"]],{ onclick: function (e){"
print "                    dataRequest(iG,iR,iM);"
print "                    return false;"
print "                  }},method[\"method\"]),"
print "                  m(\"hr\"),"
print "                  (method[\"dialog\"].map(function(exchange){"
print "                    return ["
print "                      exchange[\"request\"]?["
print "                        m(\"h4\",\"request \" + exchange[\"request\"][\"name\"]),"
print "                        m(\"div.indent\",m.trust(exchange[\"request\"][\"html\"])),"
print "                        (exchange[\"request\"][\"headers\"])?["
print "                          m(\"ul.tree\","
print "                            m(\"li.collapse\",{\"onclick\": function(e){e.target.classList.toggle(\"collapse\");}},\"headers\","
print "                              m(\"ul\",{\"onclick\":function(e){e.stopPropagation();}},Object.keys(exchange[\"request\"][\"headers\"]).map(function (header){"
print "                                return m(\"li.request\",header + \": \" + exchange[\"request\"][\"headers\"][header]);"
print "                              }))"
print "                            )"
print "                          )"
print "                        ]:\"\","
print "                        (exchange[\"request\"][\"body\"])?"
print "                          m(\"ul.tree\","
print "                            m(\"li\",{\"onclick\": function(e){e.target.classList.toggle(\"collapse\");}},"
print "                              \"body (\" + exchange[\"request\"][\"type\"] + \")\","
print "                              m(\"pre\",{\"onclick\":function(e){e.stopPropagation();}},exchange[\"request\"][\"body\"].join(\"\\n\"))"
print "                            )"
print "                          )"
print "                        :\"\""
print "                      ]:\"\","
print "                      exchange[\"responses\"]?exchange[\"responses\"].map(function(response){"
print "                        return ["
print "                          m(\"h4\",\"response \" + response[\"status\"]),"
print "                          m(\"div.indent\",m.trust(response[\"html\"])),"
print "                          m(\"ul.tree\","
print "                            (response[\"headers\"])?["
print "                              m(\"li.collapse\",{\"onclick\": function(e){e.target.classList.toggle(\"collapse\");}},"
print "                                \"headers\","
print "                                m(\"ul\",{\"onclick\":function(e){e.stopPropagation();}},Object.keys(response[\"headers\"]).map(function (header){"
print "                                  return m(\"li.response\",header + \": \" + response[\"headers\"][header]);"
print "                                }))"
print "                              )"
print "                            ]:\"\","
print "                            (response[\"body\"])?"
print "                              m(\"li\",{\"onclick\": function(e){e.target.classList.toggle(\"collapse\");}},"
print "                                \"body (\" + response[\"type\"] + \")\","
print "                                m(\"pre\",{\"onclick\":function(e){e.stopPropagation();}},response[\"body\"].join(\"\\n\"))"
print "                              )"
print "                            :\"\""
print "                          )"
print "                        ]"
print "                      }):\"\""
print "                    ];"
print "                  }))"
print "                ])"
print "              )"
print "            ];"
print "          }),"
print "          m(\"br\"),m(\"br\"),"
if len(root['groups'])>1:
	print "        ]"
else:
	print "        ])"
print "      })"
if len(root['groups'])>1:
	print "    ])"
else:
	print "    ]"
print "  }"
print "}"
print ""
print "m.mount(document.body, Main);"
