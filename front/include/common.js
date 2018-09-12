

var SpecialPages = {
  "main" : {
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m(SpecialPages['nav'])
      ];
    }
  },
  "nav" : {
    view: function() {
      return m("nav", 
        state['specials'].map(function(page){
          return m("button", {class: 'outline',onclick: function(){routesfn.set("/special/" + page);}}, page)
        })
      );
    }
  },
  'style': {
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m(SpecialPages['nav']),
        m("section.boxed",
          m("h2","Form Example"),
          m("form", [
            m("label[for=name1]","This right here!"),
            m("input#name1", {"type":"text","placeholder":"Name 1"}),
            m("label[for=name2]","This right here!"),
            m("input#name2", {"type":"text","placeholder":"Name 2"}),
            m("label[for=name3]","This right here!"),
            m("input#name3", {"type":"text","placeholder":"Name 3"})
          ])
        )
      ];
    }
  },
  'icons': {
    view: function(vnode) {
      var keys = Object.keys(icons);
      var value = s('icon_search')||'';
      var start = false;
      var test = value;
      if(value[0]=="^"){
        start = true;
        test = value.substring(1);
      }
      return [
        m(CommonPages['header']),
        m(SpecialPages['nav']),
        m("section.boxed", [
          m("h2","Icons"),
          m("form", [
            m("label[for=addon]","Icon search"),
            m("input#icon", {"type":"text","value":value,oninput: function(e){
              state.icon_search = e.target.value
            }})
          ]),
          m("hr"),
          keys.filter(function(key,i){
            return start?(key.indexOf(test) === 0):(key.indexOf(test) !== -1);
          }).map(function(icon){
            return m(CommonPages["button"],{icon:icon,text:icon});
          })

        ])
      ];
    }
  },
  'buttons': {
    view: function(vnode) {
      var classes = ['','pseudo','outline','primary','success','info','warning','danger','link'];
      return [
        m(CommonPages['header']),
        m(SpecialPages['nav']),
        m("section.boxed", [
          m("h2","Buttons"),
          m("form", [
            m("label[for=addon]","Additional class names"),
            m("input#addon", {"type":"text",value: state.addon, oninput: function(e){state.addon = e.target.value}})
          ]),
          m("hr"),
          m("h3","Text"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon,text:classname,onclick:function(e){console.log(e)}});
          })),
          m("hr"),
          m("h3","Symbol Text"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon, text:ssw.fsw2swu("S10000")});
          })),
          m("hr"),
          m("h3","Sign SVG"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon, text:"𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭"});
          })),
          m("hr"),
          m("h3","Image"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon,img:"include/icon.svg"});
          })),
          m("hr"),
          m("h3","Image and Text"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon, img:"include/icon.svg", text:classname});
          })),
          m("hr"),
          m("h3","Image and Symbol Text"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon, img:"include/icon.svg", text:ssw.fsw2swu("S10000")});
          })),
          m("hr"),
          m("h3","Image and Sign SVG"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon, img:"include/icon.svg",text:"𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭"});
          })),
          m("hr"),
          m("h3","Icon"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon, icon:"clipboard"});
          })),
          m("hr"),
          m("h3","Icon and Text"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon, icon:"clipboard",text:"Clip it!"});
          })),
          m("hr"),
          m("h3","Icon and Symbol Text"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon, icon:"clipboard",text:ssw.fsw2swu("S10000")});
          })),
          m("hr"),
          m("h3","Icon and Sign SVG"),
          m("nav", classes.map(function(classname){
            return m(CommonPages["button"],{class: classname + " " + state.addon, icon:"clipboard",text:"𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭"});
          }))
        ])
      ];
    }
  },
  'test': {
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m(SpecialPages['nav']),
        
        m("section.boxed", [
          m("h2","Testing..."),
          m("pre",Object.keys(messages).map(function(msg){
            return (msg + "\t" + messages[msg]['message'] + "\t" + messages[msg]['description'] + "\t" + messages[msg]['icon']).replace("\tundefined","\t");
          }).join("\n"))
        ])
      ];
    }
  },
  'canvas':{
    view: function(vnode){
      return [
        m(CommonPages['header']),
        m(SpecialPages['nav']),
        m('canvas#cc',{"style":"border:1px solid grey","width":300,"height":300})
      ]
    }
  }
}

var swFonts = {
  swLine: {
    "file": "SuttonSignWritingLine.ttf",
    "local": "fonts/SuttonSignWritingLine.ttf",
    "cdn": "https://cdn.rawgit.com/Slevinski/SuttonSignWriting/master/assets/SuttonSignWritingLine.ttf",
    "name": "Sutton SignWriting Line (font)",
    "desc": "The Sutton SignWriting Line Font contains glyphs for the positive space of the symbol images with characters on Unicode plane 15."
  },
  swFill: {
    "file": "SuttonSignWritingFill.ttf",
    "local": "fonts/SuttonSignWritingFill.ttf",
    "cdn": "https://cdn.rawgit.com/Slevinski/SuttonSignWriting/master/assets/SuttonSignWritingFill.ttf",
    "name": "Sutton SignWriting Fill (font)",
    "desc": "The Sutton SignWriting Fill Font contains glyphs for the negative space of the symbol images with characters on Unicode plane 16."
  },
  swOneD: {
    "file": "SuttonSignWritingOneD.ttf",
    "local": "fonts/SuttonSignWritingOneD.ttf",
    "cdn": "https://cdn.rawgit.com/Slevinski/SuttonSignWriting/master/assets/SuttonSignWriting1dOpt.ttf",
    "name": "Sutton SignWriting One D (font)",
    "desc": "The Sutton SignWriting One D Font contains glyphs for symbols, markers, and numbers for use in traditional one dimensional text using SWU as an experimental Unicode design."
  },
  swNull: {
    "file": "SuttonSignWritingNull.ttf",
    "local": "fonts/SuttonSignWritingNull.ttf",
    "cdn": "https://cdn.rawgit.com/Slevinski/SuttonSignWriting/master/assets/SuttonSignWritingLine.ttf",
    "name": "Sutton SignWriting Null (font)",
    "desc": "The Sutton SignWriting Null Font contains empty glyphs for invalid symbol codes on Plane 4 and Plane 15. This font is useful to normalize how browsers and software process invalid characters."
  }
}

var swProfiles = {
  swSymbol: {
    "file": "SuttonSignWritingSymbol.mobileconfig",
    "local": "fonts/SuttonSignWritingSymbol.mobileconfig",
    "cdn": "https://cdn.rawgit.com/Slevinski/SuttonSignWriting/master/assets/SuttonSignWritingSymbol.mobileconfig",
    "name": "Sutton SignWriting Symbol (profile)",
    "desc": "The Sutton SignWriting Symbol configuration profile contains two fonts for use in SVG, the HTML Canvas, and other Cartesian coordinate based systems.",
    "fonts": [swFonts.swLine, swFonts.swFill]
  },
  swOne: {
    "file": "SuttonSignWritingOne.mobileconfig",
    "local": "fonts/SuttonSignWritingOne.mobileconfig",
    "cdn": "https://cdn.rawgit.com/Slevinski/SuttonSignWriting/master/assets/SuttonSignWritingOne.mobileconfig",
    "name": "Sutton SignWriting One  (profile)",
    "desc": "The Sutton SignWriting One configuration profile contains two fonts for use in text input and for rendering normalization.",
    "fonts": [swFonts.swOneD, swFonts.swNull]
  }
}
var osInfo = {
  icons: {
    "windows":{'icon':'windows','title':'Windows'},
    "osx":{icon:'apple',title:'OS X'},
    "ios":{icon:'apple',title:'iOS'},
    "linux":{icon:'linux',title:'Linux'},
    "android":{icon:'android',title:'Android'}
  },
  match: {
    'windows': ['Windows'],
    'linux': ['Ubuntu','Slack','Unix'],
    'osx': ['OS X'],
    'ios': ['iOS'],
    'android': ['Android']
  }
}

var NavOs = {
  view: function() {
    return m("nav#nav-os", [
      Object.keys(osInfo.icons).map(function(os){
        return m(CommonPages["button"],{class:state.os==os?'primary':"outline",onclick: function(){setOs(os);},icon:osInfo.icons[os].icon,text:osInfo.icons[os].title})
      })
    ])
  }
}

var PageOs = {
  "windows":{
    view: function() {
      return m('section.boxed', [
        m("h2",osInfo.icons[state.os].title),
        m("p", "Please install the following fonts:"),
        m("nav", [swFonts.swLine, swFonts.swFill, swFonts.swOneD, swFonts.swNull].map(function(font){
          return m(CommonPages["button"],{class: "outline",text:font.name,onclick:function(e){e.redraw=false;downloadlink(font.local,font.file)}})
        })),
        m("hr"),
        [swFonts.swLine, swFonts.swFill, swFonts.swOneD, swFonts.swNull].map(function(font){
          return [
            m("h3",font.name),
            m("p",font.desc),
            m("a", {href:font.local},font.name),
            m("hr")
          ]
        }),
      ])
    }
  },
  "osx":{
    view: function() {
      return m('section.boxed', [
        m("h2",osInfo.icons[state.os].title),
        m("p", "Congratulations, you have an excellent operating system for SignWriting.  You can use SignWriting for file names, folder names, and as system wide text"),
        m("p", "Please install the following configuration profiles:"),
        m("nav", [swProfiles.swSymbol, swProfiles.swOne].map(function(profile){
          return m(CommonPages["button"],{class: "outline",text:profile.name,onclick:function(e){e.redraw=false;downloadlink(profile.local,profile.file)}})
        })),
        m("hr"),
        [swProfiles.swSymbol, swProfiles.swOne].map(function(profile){
          return [
            m("h3",profile.name),
            m("p",profile.desc),
            profile.fonts.map(function(font){
              return m("p",font.desc);
            }),
            m("a", {href:profile.local},profile.name),
            m("hr")
          ]
        })
      ])
    }
  },
  "ios":{
    view: function() {
      return m('section.boxed', [
        m("h2",osInfo.icons[state.os].title),
        m("p", "Congratulations, you have an excellent operating system for SignWriting."),
        m("p", "Please install the following configuration profiles:"),
        m("nav", [swProfiles.swSymbol, swProfiles.swOne].map(function(profile){
          return m(CommonPages["button"],{class: "outline",text:profile.name,onclick:function(e){e.redraw=false;downloadlink(profile.local,profile.file)}})
        })),
        m("hr"),
        [swProfiles.swSymbol, swProfiles.swOne].map(function(profile){
          return [
            m("h3",profile.name),
            m("p",profile.desc),
            profile.fonts.map(function(font){
              return m("p",font.desc);
            }),
            m("a", {href:profile.local},profile.name),
            m("hr")
          ]
        })
      ])
    }
  },
  "linux":{
    view: function() {
      return m('section.boxed', [
        m("h2",osInfo.icons[state.os].title),
        m("p", "Congratulations, you have an excellent operating system for SignWriting.  You can use SignWriting for file names, folder names, and as system wide text."),
        m("p", "Please install the following fonts:"),
        m("nav", [swFonts.swLine, swFonts.swFill, swFonts.swOneD, swFonts.swNull].map(function(font){
          return m(CommonPages["button"],{class: "outline",text:font.name,onclick:function(e){e.redraw=false;downloadlink(font.local,font.file)}})
        })),
        m("hr"),
        [swFonts.swLine, swFonts.swFill, swFonts.swOneD, swFonts.swNull].map(function(font){
          return [
            m("h3",font.name),
            m("p",font.desc),
            m("a", {href:font.local},font.name),
            m("hr")
          ]
        }),
      ])
    }
  },
  "android":{
    view: function() {
      return m('section.boxed', [
        m("h2",osInfo.icons[state.os].title)
      ])
    }
  },
  "other":{
    view: function() {
      return m('section.boxed', [
        m("h2","Other")
      ])
    }
  }
}

var browserInfo = {
  match:{
    'chrome': 'Chrome',
    'firefox': 'Firefox',
    'edge': 'Edge',
    'opera': 'Opera',
    'safari': 'Safari'
  },
  support: {
    'chrome': ['windows','linux','osx','ios','android','other'],
    'firefox': ['windows','linux','osx','ios','android','other'],
    'edge': ['windows','other'],
    'opera': ['windows','linux','osx','ios','android','other'],
    'safari': ['osx','ios']
  }
}

var NavBrowser = {
  view: function() {
    return m("nav#nav-browser", [
      Object.keys(browserInfo.match).map(function(browser){
        if (browserInfo['support'][browser].indexOf(state.os) > -1) {
          return m(CommonPages["button"],{class:state.browser==browser?'success':"outline",onclick: function(){setBrowser(browser);},icon:browser,text:browserInfo.match[browser]});
        }
      })
    ])
  }
}

var PageBrowser = {
  "firefox":{
    view: function() {
      return m('section.boxed', [
        m("h2",browserInfo.match[state.browser]),
        m("p", [
          "To install extension in FireFox, manually type the URL: ",
          m("em","about:debugging")
        ])
      ])
    }
  },
  "edge":{
    view: function() {
      return m('section.boxed', [
        m("h2",browserInfo.match[state.browser])
      ])
    }
  },
  "chrome":{
    view: function() {
      return m('section.boxed', [
        m("h2",browserInfo.match[state.browser]),
        m("p", [
          "To install extension in Chrome, manually type the URL: ",
          m("em","chrome://extensions")
        ])
      ])
    }
  },
  "opera":{
    view: function() {
      return m('section.boxed', [
        m("h2",browserInfo.match[state.browser])
      ])
    }
  },
  "safari":{
    view: function() {
      return m('section.boxed', [
        m("h2",browserInfo.match[state.browser])
      ])
    }
  },
  "other":{
    view: function() {
      return m('section.boxed', [
        m("h2","Other")
      ])
    }
  }
}

