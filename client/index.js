var spVersion = "3";
var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

function loadJS(url, callback){
  var scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.onload = callback;
  scriptTag.onreadystatechange = callback;
  document.body.appendChild(scriptTag);
}

function loadJSON(file, headers, success, failure) {
  var xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
  xhr.open('GET', file, true);
  Object.keys(headers).map(function(key){
    xhr.setRequestHeader(key,headers[key]);
  });
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == "200") {
        success(xhr);
      } else {
        failure?failure(xhr):(xhr.status==304?console.log("Not Modified"):console.log(xhr));
      }
    }
  };
  xhr.send(null);  
}

function downloadlink(href,download){
  var link = document.getElementById('downloadlink');
  link.href = href;
  link.download = download;
  link.click();
}

function scrollIntoView(id){
  var timer = setInterval(function(){
    var elem = document.getElementById(id);
    if (elem){
      elem.scrollIntoView();
      clearTimeout(timer);
    }
  }, 100);
}
var iconset = {};
function iconsused (){
  return Object.keys(iconset);
}

var state = {};

var statefn = {
  "initial": function (){
    state = Object.assign({},config.state);
    //state also has pass, username, profile, editing, and deleting attributes
  },
  "save": function(){
    delete state['dirty'];
    localStorage.setItem( 'sp3-state', JSON.stringify(state) );
    var timestamp = new Date().toJSON();
    localStorage.setItem( 'sp3-state-stamp', timestamp);
    state['status'] = timestamp;
  },
  "restore": function(){
    state = JSON.parse(localStorage.getItem('sp3-state'));
    if (state === null){
      statefn.initial();
    } else {
      state['status'] = localStorage.getItem('sp3-state-stamp');
    }
  },
  "forget": function(){
    localStorage.removeItem('sp3-state');
    localStorage.removeItem('sp3-state-stamp');
    statefn.initial();
  },
  "change": function (){
    console.log("<-s->");
    state['dirty'] = true;
    state['status'] = "state.status.unsaved";
  },
  "get": function(){
    try {
      var temp = state;
      for ( var i = 0; i < arguments.length; i++ ){
        temp = temp[arguments[i]];
      }
      if (Array.isArray(temp)) {
        return Array.apply(null, temp);
      } else if (typeof temp == "object") {
        return Object.assign({},temp);
      } else {
        return temp;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
  "add": function(){
    try {
      var item = arguments[arguments.length-1];
      var temp = state;
      for ( var i = 0; i < arguments.length-1; i++ ){
        temp = temp[arguments[i]];
      }
      if (Array.isArray(item)) {
        temp.push(Array.apply(null, item));
      } else if (typeof item == "object") {
        temp.push(Object.assign({},item));
      } else {
        temp.push(item);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    statefn.change();
    return true;
  },
  "silent": function(){
    try {
      var prop = arguments[arguments.length-2];
      var item = arguments[arguments.length-1];
      var temp = state;
      for ( var i = 0; i < arguments.length-2; i++ ){
        temp = temp[arguments[i]];
      }
      if (temp[prop] == item) {
        console.log("==== SAME ====");
        console.log(item);
      }
      if (Array.isArray(item)) {
        temp[prop] =  Array.apply(null, item);
      } else if (typeof item == "object") {
        temp[prop] =  Object.assign({},item);
      } else {
        temp[prop] = item;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  },
  "update": function(){
    var eval = statefn.silent.apply(null,arguments);
    statefn.change();
    return eval;
  },
  "updateMany": function (updates){
    for ( var i = 0; i < updates.length; i++ ){
      statefn.silent.apply(null,updates[i]);
    }
    statefn.change();
  },
  "remove": function(){
    try {
      var index = arguments[arguments.length-1];
      var prop = arguments[arguments.length-2];
      var temp = state;
      for ( var i = 0; i < arguments.length-2; i++ ){
        temp = temp[arguments[i]];
      }
      if (Array.isArray(temp[prop])) {
        temp[prop] = temp[prop].filter(function(item,i){if (i != index) return true;})
      } else if (typeof temp == "object") {
        if (prop){
          temp = temp[prop];
        }
        delete temp[index];
      } else {
        throw("invalid state indexing: " + Array.prototype.slice.call(arguments).join(" > "));
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    statefn.change();
    return true;
  },
  "getItem": function(name){
    var collection = collectionfn.parseName(name);
    if (!collection) return false;
    var section = collection['category'] + 's';
    var index;
    item = Object.assign({},state[section].filter(function (item,i){if (item['name'] == collection['name']) {index=i;return true;}})[0]);
    item['index'] = index;
    return item;
  }
}
s = statefn.get;
statefn.restore();

var InterfaceFront = {
  "init": function(){
    loadJSON ("config/interface-sp3.json?v=20190404",{},function(xhr){
      InterfaceFront.ui = JSON.parse(xhr.responseText);
      m.redraw();
    });
  },
  "ui": {"name":"","data":{}},
  "text": function(key){
    if (InterfaceFront.ui.name == "qqq") return key;
    var messages = InterfaceFront.ui.data;
    if (!messages){
      return "";
    }
    var msg="";
    try {
      msg = messages[key].message;
    } catch(err) {
      msg = key;
      if (arguments.length>1){
        for (var i = 1; i < arguments.length; i++) {
          msg += " $" + i;
        }
      }
    }
    if (arguments.length>1) {
      for (var i = 1; i <= arguments.length; i++) {
        msg = msg.replace("$" + (i),arguments[i]);
      }
    }
    return msg;
  },
  "icon": function(key){
    var messages = InterfaceFront.ui.data;
    if (!messages){
      return {};
    }
    try {
      return messages[key].icon;
    } catch(err){
      return "";
    }
  },
  "country": function(cc){
    var key = "world.country." + cc.toLowerCase();
    var name = t(key);
    if (key==name){
      return world.country[cc].name || cc;
    } else {
      return name;
    }
  },
  "language": function(lang){
    var key = "world.language." + lang;
    var name = t(key);
    if (key==name){
      return world.language[lang].name || lang;
    } else {
      return name;
    }
  },
  "collection": function(collection){
    return CollectionBack.security[collection]?CollectionBack.security[collection].title:collection;
  },
  "updated_last": function(){
    var data = InterfaceFront.ui.data;
    return Object.keys(data).map(function(key){return data[key].updated_at}).reduce(function(a,b){return a>b?a:b;});
  },
  "update": function(collection,force){
    if (collection == "qqq"){
      InterfaceFront.ui = {"name":"qqq",data:{}};
      m.redraw();
      return;
    } 
    var server = s("connection","server");
    var current = InterfaceFront.ui.name;
    collection = collection?collection:current;
    var route = server + "/interface/" + collection + '.json';
    if (force){
      route = route + "?update=1";
    }
    var headers = {};
    if (!force && collection == current){
      headers["If-Modified-Since"] = InterfaceFront.updated_last();
    }
    loadJSON (route, headers, function(xhr){
      InterfaceFront.ui = JSON.parse(xhr.responseText);
      statefn.update("profile","interface",collection);
      if (!force && serverfn.parseHeaders(xhr)['Last-Modified'] > InterfaceFront.updated_last()){
        InterfaceFront.update(collection,1);
      } else {
        m.redraw();
      }
    });
  }
};
InterfaceFront.init();
var t = InterfaceFront.text;

var InterfaceBack = {
  "name": "",
  "search": function(search) {
    var server = s("connection","server");
    var interface_name = InterfaceFront.ui.name;
    var route = server + "/interface?name=" + search;
    var method = "GET";
    if (!server) return;

    m.request({
      method: method,
      url: route,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status && response.status <= 204){
        var msg = Messaging.parse("success","system.response.success",method,route,response);
        Messaging.add("InterfaceBack",msg);
        var results = [];
        if (response.body){
          results = JSON.parse(response.body).filter(function(val){return val != interface_name});
        }
        InterfaceFront.search = results;
        m.redraw();
      } else {
        var err = Messaging.parse("danger","system.response.problem",method,route,response);
        Messaging.add("InterfaceBack",err);
        m.redraw();
      }
    });
  },
  "key": {
    "get": function(collection) {
      var server = s("connection","server");
      if (!server) return;
      var route = server + "/interface/" + collection + "/key";
      var method = "GET";
      var headers = {};
      if (collection == InterfaceBack.name){
        if (InterfaceBack.key.mod) {
          headers['If-Modified-Since'] = InterfaceBack.key.mod;
        }
      }
      m.request({
        background:true,
        method: method,
        url: route,
        headers: headers,
        extract: serverfn.parseXHR
      })
      .then(function(response) {
        if (response.status) {
          if (response.status == 200){
            if (response.body){
              InterfaceBack.name = collection;
              InterfaceBack.key.mod = response.headers['Last-Modified'];
              InterfaceBack.key.data = JSON.parse(response.body);
              InterfaceBack.key.parse();
              m.redraw();
            } else {
              InterfaceBack.key.mod = "";
              InterfaceBack.key.data = [];
            }
          } //304 not modified
        }
      });
    },
    "mod": "",
    "data":[],
    "parse": function(){
      var o = {};
      InterfaceBack.key.data.map(function(key){
        p = key.split('.');
        if (!(p[0] in o)) {
          o[p[0]] = {};
        }
        if (!(p[1] in o[p[0]])) {
          o[p[0]][p[1]] = [p[2]];
        } else {
          o[p[0]][p[1]].push(p[2]);
        }
      });
      InterfaceBack.key.index = o;
    },
    "index": {},
    "dump": function(){
      var out = {};
      Object.keys(InterfaceFront.ui.data).map(function(key){
        var levels = key.split('.');
        out[levels[0]] = out[levels[0]] || {};
        out[levels[0]][levels[1]] = out[levels[0]][levels[1]] || {};
        out[levels[0]][levels[1]][levels[2]] = InterfaceFront.ui.data[key].message;
      })
      console.log(JSON.stringify(out,null,2));
    }
  },
  "entry":{
    "search": {
      "text": "",
      "failed": "",
      "fn": function(){
        var server = s("connection","server");
        if (!server) return;
        var route = server + "/interface/" + InterfaceBack.name + "/search/" + InterfaceBack.entry.search.text;
        var method = "GET";
        m.request({
          method: method,
          url: route,
          extract: serverfn.parseXHR
        })
        .then(function(response) {
          if (response.status && response.status <= 200){
            InterfaceBack.entry.search.results = JSON.parse(response.body);
            if (InterfaceBack.entry.search.results.length){
              InterfaceBack.entry.search.failed = "";
            } else {
              InterfaceBack.entry.search.failed = InterfaceBack.entry.search.text;
            }
//            m.redraw();
          } else {
            InterfaceBack.entry.search.results = [];
            InterfaceBack.entry.search.failed = "";
            //            m.redraw();
          }
        });
      },
      "results":  []
    },
    "new": {
      "key": "",
      "message": "",
      "description": "",
      "icon": ""
    },
    "reset": function(){
      Messaging.clear("interface_new");
      InterfaceBack.entry.new = {
        "key": "",
        "message": "",
        "description": "",
        "icon": ""
      };
    },
    "get": function(collection,q1,q2) {
      var server = s("connection","server");
      if (!server) return;
      var subkey = q1 + '.' + q2;
      var route = server + "/interface/" + collection + "/entry/" + subkey + '.%25';
      var method = "GET";
      var headers = {'Cache-Control': 'no-cache'};
      if (collection == InterfaceBack.name){
        if (subkey in InterfaceBack.entry.data){
          headers = {'If-Modified-Since': InterfaceBack.entry.data[subkey].mod};
        }
      }
      m.request({
        background: true,
        method: method,
        url: route,
        headers: headers,
        extract: serverfn.parseXHR
      })
      .then(function(response) {
        if (response.status) {
          if (response.status <= 200){
            if (response.body){
              InterfaceBack.entry.data[subkey] = {};
              InterfaceBack.entry.data[subkey].mod = response.headers['Last-Modified'];
              var data = JSON.parse(response.body);
              InterfaceBack.entry.data[subkey].data = data.map(function(entry){entry.original = entry.key;return entry;})
              m.redraw();
            }
          }  //304 not modified
        }
      });
    },
    "data":{},
    "backup":{},
    "input": function(subkey,i,field,value){
      var key = InterfaceBack.entry.data[subkey].data[i].original;
      if (!InterfaceBack.entry.data[subkey].data[i].dirty){
        InterfaceBack.entry.backup[key] = Object.assign({},InterfaceBack.entry.data[subkey].data[i]);
        InterfaceBack.entry.data[subkey].data[i].dirty = true;
      }
      InterfaceBack.entry.data[subkey].data[i][field] = value;
    },
    "cancel": function(subkey,i){
      var key = InterfaceBack.entry.data[subkey].data[i].original;
      Messaging.clear("interface_" + key);
      InterfaceBack.entry.data[subkey].data[i] = Object.assign({},InterfaceBack.entry.backup[key]);
      delete InterfaceBack.entry.backup[key];
    },
    "update": function(subkey,i){
      var connection = s("connection");
      var server = connection.server;
      var pass = connection.pass;
      var route = server + "/interface/" + InterfaceBack.name + "/entry/" + InterfaceBack.entry.data[subkey].data[i].original;
      var method = "PUT";
      m.request({
        headers: {Pass: pass},
        method: method,
        url: route,
        type: 'application/json',
        data: InterfaceBack.entry.data[subkey].data[i],
        extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
      })
      .then (function(response) {
        if (response.status && response.status == 204) {
          var parts = InterfaceBack.entry.data[subkey].data[i].key.split('.');
          Messaging.clear(InterfaceBack.entry.data[subkey].data[i].original);
          delete InterfaceBack.entry.data[subkey];
          routesfn.set("/interface/" + InterfaceBack.name + "/" + parts[0] + "/" + parts[1])
          scrollIntoView("interface_" + parts.join('.'));
        } else {
          var err = Messaging.parse("warning", "system.response.problem",method,route,response);
          Messaging.add("interface_" + InterfaceBack.entry.data[subkey].data[i].original,err);
          m.redraw();
        }
      });
    },
    "delete": function(subkey,i){
      var connection = s("connection");
      var server = connection.server;
      var pass = connection.pass;
      var route = server + "/interface/" + InterfaceBack.name + "/entry/" + InterfaceBack.entry.data[subkey].data[i].original;
      var method = "DELETE";
      m.request({
        headers: {Pass: pass},
        method: method,
        url: route,
        extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
      })
      .then (function(response) {
        if (response.status && response.status == 204) {
          InterfaceBack.key.mod="";
          delete InterfaceBack.entry.data[subkey];
          InterfaceBack.key.get(InterfaceBack.name);
        } else {
          var err = Messaging.parse("warning", "system.response.problem",method,route,response);
          Messaging.add("interface_" + InterfaceBack.entry.data[subkey].data[i].original,err);
          m.redraw();
        }
      });
    },
    "add": function(){
      var connection = s("connection");
      var server = connection.server;
      var pass = connection.pass;
      var route = server + "/interface/" + InterfaceBack.name + "/entry";
      var method = "POST";
      m.request({
        headers: {Pass: pass},
        method: method,
        url: route,
        type: 'application/json',
        data: InterfaceBack.entry.new,
        extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
      })
      .then (function(response) {
        if (response.status && response.status == 201) {
          var parts = InterfaceBack.entry.new.key.split('.');
          InterfaceBack.entry.reset();
          Messaging.clear("interface_new");
          routesfn.set("/interface/" + InterfaceBack.name + "/" + parts[0] + "/" + parts[1]);
          scrollIntoView("interface_" + parts.join('.'));
        } else {
          var err = Messaging.parse("warning", "system.response.problem",method,route,response);
          Messaging.add("interface_new",err);
          m.redraw();
        }
      });
    }
  }
}

var InterfacePages = {
  "head": {
    oninit: function(vnode){
      serverfn.connect();
    },
    view: function(vnode) {
      buttons = [
        m(CommonPages["button"],{class: "primary", key:'system.buttons.search', onclick: function(e){e.preventDefault();InterfaceBack.entry.search.fn(); }}),
        m(CommonPages["button"],{class: "primary", key:vnode.attrs.name==InterfaceFront.ui.name?'system.buttons.update':'system.buttons.select', onclick: function(e){e.preventDefault();
          InterfaceFront.update(vnode.attrs.name);
          return false;
        }}),
        m(CommonPages["button"],{class: "primary", key:'system.buttons.manage', onclick: function(e){e.preventDefault();
          routesfn.set("/manage/" + vnode.attrs.name);
          return false;
        }})
      ];

      return [
        m("h1", vnode.attrs.name),
        m("input#search[type=text]",{"value":InterfaceBack.entry.search.text,oninput: function(e){
          e.preventDefault();
          InterfaceBack.entry.search.text=e.target.value;
        }}),
        m("label"),
        m("div.wide",
          buttons
        ),
        m("hr"),
        m("nav",[
          InterfaceBack.entry.search.results.map(function(entry){
              var parts = entry.key.split('.');
            return m(CommonPages["button"],{class: "info",text:entry.message, 
              onclick: function(e){
                e.redraw=false;
                routesfn.set("/interface/" + vnode.attrs['name'] + "/" + parts[0] + "/" + parts[1]);
                scrollIntoView("interface_" + parts.join('.'));
              }});
          }),
          InterfaceBack.entry.search.failed?m(CommonPages["button"],{class:"warning",text:InterfaceBack.entry.search.failed,icon:"ban",onclick:function(e){
            e.preventDefault();
            InterfaceBack.entry.search.text="";
            InterfaceBack.entry.search.failed="";
          }}):""
        ])
      ]
    }
  },
  "top": {
    oninit: function(vnode){
      InterfaceBack.key.get(vnode.attrs.name);
    },
    onupdate: function(vnode){
      InterfacePages["top"].oninit(vnode);
    },
    view: function(vnode) {
      var index = InterfaceBack.key.index;
      return m("nav",
        Object.keys(index).map(function(q1){
          return m(CommonPages["button"],{class: vnode.attrs['q1']==q1?'success':'outline',text:q1, 
            onclick: function(e){e.preventDefault();e.redraw=false;routesfn.set("/interface/" + vnode.attrs['name'] + "/" + q1)}});
        })
      );
    }
  },
  "mid": {
    oninit: function(vnode){
      var name = vnode.attrs['name'];
      var q1 = vnode.attrs['q1'];
      var q2 = vnode.attrs['q2'];
      if (q1 && q2){
        InterfaceBack.entry.get(name,q1,q2);
      }
      if (!InterfaceBack.entry.new.dirty){
        InterfaceBack.entry.new.key = q1 + '.' + q2 + '.new';
      }
    },
    onupdate: function(vnode){
      InterfacePages["mid"].oninit(vnode);
    },
    view: function(vnode) {
      var q1 = vnode.attrs['q1'];
      var q2 = vnode.attrs['q2'];
      var q2s = InterfaceBack.key.index[q1];
      if (!q2s) return "";
      return m("section.boxed",
        m("nav",Object.keys(q2s).map(function(q2){
          return m(CommonPages["button"],{class: vnode.attrs['q2']==q2?'primary':'outline',text:q2, 
            onclick: function(e){e.preventDefault();e.redraw=false;routesfn.set("/interface/" + vnode.attrs['name'] + "/" + q1 + "/" + q2)}});
        }))
      )
    }
  },
  "bottom": {
    view: function(vnode) {
      var q1 = vnode.attrs['q1'];
      var q2 = vnode.attrs['q2'];
      if (!InterfaceBack.key.index[q1]) return "";
      if (!InterfaceBack.key.index[q1][q2]) return "";
      return m("section.boxed",
        m("nav", InterfaceBack.key.index[q1][q2].map(function(q3){
          return m(CommonPages["button"],{class: 'outline',text:q3, 
            onclick: function(e){e.preventDefault();scrollIntoView("interface_" + q1 + "." + q2 + '.' + q3);}});
          })
        )
      )
    }
  },
  "main": {
    oninit: function(vnode){
      window.scrollTo(0,0);
    },
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m(InterfacePages['head'],{"name":vnode.attrs['name']})
        ),
        m("section.boxed",
          m(InterfacePages["top"],{"name":vnode.attrs['name']})
        ),
        m(InterfacePages["new"],{"name":vnode.attrs.name})
      ]
    }
  },
  "q1": {
    view: function(vnode) {
      var q1 = vnode.attrs['q1'];
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m(InterfacePages['head'],{"name":vnode.attrs['name']})
        ),
        m("section.boxed",
          m(InterfacePages["top"],{"name":vnode.attrs['name'],"q1":q1})
        ),
        m(InterfacePages["mid"],{"name":vnode.attrs['name'],"q1":q1}),
        m(InterfacePages["new"],{"name":vnode.attrs.name})
      ]
    }
  },
  "q2": {
    view: function(vnode) {
      var q1 = vnode.attrs['q1'];
      var q2 = vnode.attrs['q2'];
      var subkey = q1 + '.' + q2;
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m(InterfacePages['head'],{"name":vnode.attrs['name']})
        ),
        m("section.boxed",
          m(InterfacePages["top"],{"name":vnode.attrs['name'],"q1":q1})
        ),
        m(InterfacePages["mid"],{"name":vnode.attrs['name'],"q1":q1,"q2":q2}),
        m(InterfacePages["bottom"],{"name":vnode.attrs['name'],"q1":q1,"q2":q2}),
        (subkey in InterfaceBack.entry.data)?InterfaceBack.entry.data[subkey].data.map(function(q3,i){
          return m(InterfacePages["entry"],{"name":vnode.attrs.name,"subkey":subkey,"i":i});
        }):"",
        m(InterfacePages["new"],{"name":vnode.attrs.name})
      ]
    }
  },
  "q3": {
    view: function(vnode) {
      var name = vnode.attrs['name'];
      var q1 = vnode.attrs['q1'];
      var q2 = vnode.attrs['q2'];
      var q3 = vnode.attrs['q3'];
      var subkey = q1 + '.' + q2;
      var key = subkey + '.' + q3;
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m(InterfacePages['head'],{"name":vnode.attrs['name']})
        ),
        (subkey in InterfaceBack.entry.data)?InterfaceBack.entry.data[subkey].data.map(function(q3,i){
          return q3.original==key?m(InterfacePages["entry"],{"name":vnode.attrs.name,"subkey":subkey,"i":i}):"";
        }):"",
        m("section.boxed",
          m(InterfacePages["top"],{"name":vnode.attrs['name'],"q1":q1})
        ),
        m(InterfacePages["mid"],{"name":vnode.attrs['name'],"q1":q1,"q2":q2}),
        m(InterfacePages["bottom"],{"name":vnode.attrs['name'],"q1":q1,"q2":q2}),
        m(InterfacePages["new"],{"name":vnode.attrs.name})
      ]
    }
  },
  "new": {
    view: function(vnode){
      if (!CollectionBack.rightsCheck(vnode.attrs.name,SP_ADD)) return '';
      var key_valid = validKey(InterfaceBack.entry.new.key);
      var buttons = [];
      key_class = key_valid?"success":"danger";
      buttons = [
        m(CommonPages["button"],{class: key_valid?"success":"outline", disabled:!key_valid, key:'system.buttons.save', onclick: function(e){e.preventDefault();InterfaceBack.entry.add(); }}),
        m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();InterfaceBack.entry.reset(); }})
      ]
      var fields = ["key","message","description",'icon'];
      return m("section.boxed",[
        m("h2",t("sections.collection.new")),
        m("section.boxed", 
          m("form", [
            fields.map(function(field){
              return [
                m("label[for=" + field + "]",t("sections.collection." + field)),
                m("input#" + field + "[type=text]",{"class":field=="key"?key_class:'',"value":InterfaceBack.entry.new[field],oninput: function(e){
                  InterfaceBack.entry.new.dirty = true;
                  if (field=="key"){e.target.value = e.target.value.toLowerCase().replace(/[^a-z.]/gi, '');}
                  InterfaceBack.entry.new[field] = e.target.value;
                }}),
              ];
            }),
            m("label"),
            m("div.wide",buttons)
          ]),
          m(Messaging.section,{"section":"interface_new"})
        )
      ])
    }
  },
  "entry": {
    view: function(vnode) {
      var subkey = vnode.attrs.subkey;
      var i = vnode.attrs.i;
      if (subkey in InterfaceBack.entry.data){
        var q3 = InterfaceBack.entry.data[subkey].data[i];
        var editable = CollectionBack.rightsCheck(vnode.attrs.name,SP_EDIT,q3.user);
        var manager = CollectionBack.rightsCheck(vnode.attrs.name,SP_MANAGE);
        var key_valid = validKey(q3.key);
        var key_class = "success";
        var buttons = [];
        if (editable){
          if (q3.dirty){
            key_class = (q3.key==q3.original)?"primary":(key_valid?"warning":"danger");
            buttons = [
              m(CommonPages["button"],{class: key_valid?"success":"outline", disabled:!key_valid, key:'system.buttons.save', onclick: function(e){e.preventDefault();InterfaceBack.entry.update(subkey,i); }}),
              m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();InterfaceBack.entry.cancel(subkey,i); }})
            ]
          } else {
            if (q3.deleting){
              buttons = [
                m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();
                  delete InterfaceBack.entry.data[subkey].data[i].deleting;
                }}),
                m(CommonPages["button"],{class: "danger onRight", key:'system.buttons.delete', onclick: function(e){e.preventDefault();InterfaceBack.entry.delete(subkey,i); }})
              ]
            } else {
              buttons = [
                m(CommonPages["button"],{class: "warning", key:'system.buttons.delete', onclick: function(e){e.preventDefault();
                  InterfaceBack.entry.data[subkey].data[i].deleting=true;
                }})
              ]
            }
          }
        }
        var fields = ["key","message","description",'icon'];
        return m("section.boxed", 
          m("form" ,{id:"interface_" + q3.original}, [
            fields.map(function(field){
              return [
                m("label[for=" + field + i + "]",t("sections.collection." + field)),
                m("input#" + field + i + "[type=text]",{"disabled":(InterfaceBack.entry.data[subkey].data[i].deleting || !editable) || (field=="key" && !manager),"class":field=="key"?key_class:'',"value":q3[field],oninput: function(e){
                  if (field=="key"){e.target.value = e.target.value.toLowerCase().replace(/[^a-z.]/gi, '');}
                  InterfaceBack.entry.input(subkey,i,field,e.target.value);
                }}),
              ];
            }),
            m("label"),
            m("div.wide",buttons)
          ]),
          m(Messaging.section,{"section":"interface_" + q3.original})
        )
      }
    }
  }
}

var AlphabetFront = {
  "init": function(){
    loadJSON ("config/alphabet.json",{},function(xhr){
      AlphabetFront.ui = JSON.parse(xhr.responseText);
      AlphabetFront.setGrid();
      m.redraw();
    });
  },
  "ui": {"data":{}},
  "group": "",
  "base": "",
  "bottom": false,
  "top": function(){
    AlphabetFront.group = "";
    AlphabetFront.base = "";
    AlphabetFront.bottom = false;
    AlphabetFront.setGrid();
  },
  "previous": function(){
    AlphabetFront.bottom = false;
    if (AlphabetFront.base){
      AlphabetFront.base = "";
    } else {
      AlphabetFront.group = "";
      AlphabetFront.base = "";
    }
    AlphabetFront.setGrid();
  },
  "mirror": function(){
    AlphabetFront.bottom = !AlphabetFront.bottom;
    AlphabetFront.setGrid();
  },
  "lower": false,
  "grid": [[],[],[],[],[],[],[],[],[],[]],
  "setGrid": function(symbol){
    if (!AlphabetFront.group && symbol){
      AlphabetFront.group = symbol;
    } else if (!AlphabetFront.base && symbol){
      AlphabetFront.base = symbol;
    }
    var syms = [];
    AlphabetFront.lower = false;
    if (AlphabetFront.group && AlphabetFront.base){
      var key = ssw.swu2fsw(AlphabetFront.base);
      var base = key.slice(0,4);
      var key1 = base + "08";
      var key2 = base + "18";
      AlphabetFront.lower = (ssw.size(key1) || ssw.size(key2));
      var r1 = 0;
      var r2 = 8;
      if (AlphabetFront.bottom){
        r1 = 8;
        r2 = 16;
      }
      for (var f=0;f<6;f++){
        for (var r=r1;r<r2;r++){
          key=base + f + r.toString(16);
          syms.push(ssw.fsw2swu(key));
        }
        syms.push("");
        syms.push("");
      }
    } else if (AlphabetFront.group){
      syms = AlphabetFront.ui.data[AlphabetFront.group];
    } else {
      syms = Object.keys(AlphabetFront.ui.data);
    }
    AlphabetFront.grid = [[],[],[],[],[],[],[],[],[],[]];
    for (var i=0;i<syms.length;i++){
      AlphabetFront.grid[(i%10)].push(syms[i]);
    };
    for (var i=syms.length; i<60;i++){
      AlphabetFront.grid[(i%10)].push('');
    };
  },
  "drop": function() {
    var sb = document.getElementById("signbox");
    if (overlap(this.element,sb)){
      var offset1 = getOffset( this.element ),
        offset2 = getOffset( sb );
      var symbol = {symbol:this.element.symbol,x: parseInt(500-signmaker.vm.midWidth+1+offset1.left-offset2.left),y: parseInt(500-signmaker.vm.midHeight+offset1.top-offset2.top)};
      signmaker.vm.add(symbol);
    } else {
      var seq = document.getElementById("sequence");
      if (overlap(this.element,seq)){
        var position = parseInt((this.startPoint.y+this.dragPoint.y) / (window.innerHeight/20));
        var symbol = this.element.symbol;
        signmaker.vm.addSeq(symbol,position);
      }
    }
    this.element.style.top=0;
    this.element.style.left=0;
    },
  "click": function () {
    if (!AlphabetFront.base) {
      AlphabetFront.setGrid(this.element.symbol);
      m.redraw();
    }
  }
}
AlphabetFront.init();

function getOffset( el ) {
  var offset = el?el.getBoundingClientRect():{top:0,left:0};
  return { top : offset.top + (window.pageYOffset || window.document.documentElement.scrollTop), left : offset.left + (window.pageXOffset || window.document.documentElement.scrollLeft) }
}

function overlap(el1, el2){
  if (!el2) return false;
  var offset1 = getOffset( el1 ), width1 = el1.offsetWidth, height1 = el1.offsetHeight,
    offset2 = getOffset( el2 ), width2 = el2.offsetWidth, height2 = el2.offsetHeight;
  if (!(offset2.left > offset1.left + width1 - width1/2 || offset2.left + width2 < offset1.left + width1/2 || offset2.top > offset1.top + height1 - height1/2 || offset2.top + height2 < offset1.top + height1/2 )){
    return true;
  } else {
    return false;
  }
}

var AlphabetPages = {
  "palette" : {
    view: function(vnode) {
      return m("div#palette", [
        m("div.btn",{onclick: function(e){e.preventDefault();AlphabetFront.top(); }},t('palette.buttons.top')),
        m("div.btn",{onclick: function(e){e.preventDefault();AlphabetFront.previous(); }},t('palette.buttons.previous')),
        AlphabetFront.lower?m("div.btn",{onclick: function(e){e.preventDefault();AlphabetFront.mirror(); }},t('palette.buttons.mirror')):"",
        AlphabetFront.grid.map(function(row){
          return m("div.row",row.map(function(symbol){
            return m(AlphabetPages["symbol"],{symbol:symbol});
          }))
        })
      ]);
    }
  },
  "symbol": {
    oncreate: function(vnode){
      var draggie = new Draggabilly(vnode.dom);
      draggie.on( 'dragEnd', AlphabetFront.drop );
      draggie.on( 'staticClick', AlphabetFront.click );
      vnode.dom.symbol=vnode.attrs.symbol;
    },
    view: function(vnode){
      return m("div",{symbol:vnode.attrs.symbol},m.trust(ssw.svg(vnode.attrs.symbol)));
    }
  }
}

var DictionaryBack = {
  "name": "",
  "page": "",
  "search": {
    "section": "",
    "display": "",
    "sort": "",
    "results":{},
    "select": function(id){
      id =parseInt(id);
      var i = DictionaryBack.search.selection.indexOf(id);
      if (i==-1){
        DictionaryBack.search.selection.push(id);
      } else {
        DictionaryBack.search.selection.splice(i,1);
      }
      m.redraw();
    },
    "selected": function(id){
      id = parseInt(id);
      return DictionaryBack.search.selection.indexOf(id)>-1;
    },
    "selection": [],
    "limit": 50,
    "page": 1,
    "setSort": function(sort){
      DictionaryBack.search.sort = (DictionaryBack.search.sort==sort)?"-"+sort:sort;
    },
    "setDisplay": function(collection,display){
      switch(display){
        case "sign":
          DictionaryBack.search.setSort("sign");
          break;
        case "terms":
          DictionaryBack.search.setSort("lower");
          break;
        case "list":
          DictionaryBack.search.setSort("id");
          break;
      }
      DictionaryBack.search.display = display;
      DictionaryBack.search.results={};
      DictionaryBack.search.page = 1;
      DictionaryBack.search.fn(collection);
    },
    "fn": function(collection){
      DictionaryBack.search.results.data = [];
      var connection = s("connection");
      var server = connection.server;
      var pass = connection.pass;
      var method = "GET";
      var route = server + "/dictionary/" + collection + "/search";
      switch (DictionaryBack.page){
        case "searchAll":
          route += "?results=" + DictionaryBack.search.display;
          route += "&sort=" + DictionaryBack.search.sort;
          route += "&offset=" + (DictionaryBack.search.page-1) * DictionaryBack.search.limit;
          route += "&limit=" + DictionaryBack.search.limit;
          break;
        case "selection":
          var ids = DictionaryBack.search.selection.join(",");
          route += "/id/" + (ids?ids:0);
          route += "?results=" + DictionaryBack.search.display;
          route += "&sort=" + DictionaryBack.search.sort;
          route += "&offset=" + (DictionaryBack.search.page-1) * DictionaryBack.search.limit;
          route += "&limit=" + DictionaryBack.search.limit;
          break;
        default:
          return;
      }
      m.request({
        headers: {Pass: pass},
        background:true,
        method: method,
        url: route,
        extract: serverfn.parseXHR
      })
      .then(function(response) {
        if (response.status == 200){
          if (response.body){
            DictionaryBack.search.results = JSON.parse(response.body);
            m.redraw();
          }
        } else {
          DictionaryBack.search.results = {};
          var err = Messaging.parse("danger","system.response.problem",method,route,response);
          Messaging.add("DictionaryBack",err);
          m.redraw();
        }
      });
    }
  },
  "entry": {
    "display": "detail",
    "get": function(collection,id) {
      var connection = s("connection");
      var server = connection.server;
      var pass = connection.pass;
      var route = server + "/dictionary/" + collection + "/search/id/" + id;
      var method = "GET";
      m.request({
        headers: {Pass: pass,'Cache-Control': 'no-cache'},
        background: true,
        method: method,
        url: route,
        extract: serverfn.parseXHR
      })
      .then(function(response) {
        if (response.status && response.status == 200){
          try {
            DictionaryBack.entry.data = JSON.parse(response.body).data[0];
            m.redraw();
          } catch(e){
            console.log(e);
          }
        } else {
          DictionaryBack.entry.data = {};
        }
      });
    },
    "data":{},
    "update": function(subkey,i){
      var connection = s("connection");
      var server = connection.server;
      var pass = connection.pass;
      var route = server + "/interface/" + InterfaceBack.name + "/entry/" + InterfaceBack.entry.data[subkey].data[i].original;
      var method = "PUT";
      m.request({
        headers: {Pass: pass},
        method: method,
        url: route,
        type: 'application/json',
        data: InterfaceBack.entry.data[subkey].data[i],
        extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
      })
      .then (function(response) {
        if (response.status && response.status == 204) {
          var parts = InterfaceBack.entry.data[subkey].data[i].key.split('.');
          Messaging.clear(InterfaceBack.entry.data[subkey].data[i].original);
          delete InterfaceBack.entry.data[subkey];
          routesfn.set("/interface/" + InterfaceBack.name + "/" + parts[0] + "/" + parts[1])
          scrollIntoView("interface_" + parts.join('.'));
        } else {
          var err = Messaging.parse("warning", "system.response.problem",method,route,response);
          Messaging.add("interface_" + InterfaceBack.entry.data[subkey].data[i].original,err);
          m.redraw();
        }
      });
    },
    "delete": function(subkey,i){
      var connection = s("connection");
      var server = connection.server;
      var pass = connection.pass;
      var route = server + "/interface/" + InterfaceBack.name + "/entry/" + InterfaceBack.entry.data[subkey].data[i].original;
      var method = "DELETE";
      m.request({
        headers: {Pass: pass},
        method: method,
        url: route,
        extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
      })
      .then (function(response) {
        if (response.status && response.status == 204) {
          InterfaceBack.key.mod="";
          delete InterfaceBack.entry.data[subkey];
          InterfaceBack.key.get(InterfaceBack.name);
        } else {
          var err = Messaging.parse("warning", "system.response.problem",method,route,response);
          Messaging.add("interface_" + InterfaceBack.entry.data[subkey].data[i].original,err);
          m.redraw();
        }
      });
    },
    "add": function(){
      var connection = s("connection");
      var server = connection.server;
      var pass = connection.pass;
      var route = server + "/interface/" + InterfaceBack.name + "/entry";
      var method = "POST";
      m.request({
        headers: {Pass: pass},
        method: method,
        url: route,
        type: 'application/json',
        data: InterfaceBack.entry.new,
        extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
      })
      .then (function(response) {
        if (response.status && response.status == 201) {
          var parts = InterfaceBack.entry.new.key.split('.');
          InterfaceBack.entry.reset();
          Messaging.clear("interface_new");
          routesfn.set("/interface/" + InterfaceBack.name + "/" + parts[0] + "/" + parts[1]);
          scrollIntoView("interface_" + parts.join('.'));
        } else {
          var err = Messaging.parse("warning", "system.response.problem",method,route,response);
          Messaging.add("interface_new",err);
          m.redraw();
        }
      });
    }
  }
}

var DictionaryPages = {
  "side" :{
    view: function(vnode){
      return m("nav.dictionary",[
        m(CommonPages["button"],{class: "tall " + (DictionaryBack.page=="searchAll"?"primary":"outline"), key:'collection.search.all', onclick: function(e){e.preventDefault();routesfn.set('/dictionary/' + vnode.attrs.name + '/search'); }}),
        DictionaryBack.search.selection.length?m(CommonPages["button"],{class: "tall " + (DictionaryBack.page=="selection"?"primary":"outline"), key:'collection.search.selection', onclick: function(e){e.preventDefault();routesfn.set('/dictionary/' + vnode.attrs.name + '/selection'); }}):""
//        m(CommonPages["button"],{class: "tall outline", key:'collection.search.id', onclick: function(e){e.preventDefault();routesfn.set('/dictionary/' + vnode.attrs.name + '/search/id'); }}),
//        m(CommonPages["button"],{class: "tall outline", key:'collection.search.terms', onclick: function(e){e.preventDefault();routesfn.set('/dictionary/' + vnode.attrs.name + '/search/terms'); }}),
//        m(CommonPages["button"],{class: "tall outline", key:'collection.search.sign', onclick: function(e){e.preventDefault();routesfn.set('/dictionary/' + vnode.attrs.name + '/search/sign'); }}),
//        m(CommonPages["button"],{class: "tall outline", key:'collection.search.signtext', onclick: function(e){e.preventDefault();routesfn.set('/dictionary/' + vnode.attrs.name + '/search/signtext'); }})
      ])
    }
  },
  "display": {
    view: function(vnode) {
      return m("nav.search",[
        m(CommonPages["button"],{
          class:DictionaryBack.search.display=="sign"?"primary":"outline",
          onclick: function(e){
            e.preventDefault();
            DictionaryBack.search.setDisplay(vnode.attrs.name,"sign");
          },
          key:"collection.view.signed",
          icon:DictionaryBack.search.sort=="sign"?"sort-desc":(DictionaryBack.search.sort=="-sign"?"sort-asc":undefined)
        }),
        m(CommonPages["button"],{
          class:DictionaryBack.search.display=="terms"?"primary":"outline",
          onclick: function(e){
            e.preventDefault();
            DictionaryBack.search.setDisplay(vnode.attrs.name,"terms");
          },
          key:"collection.view.spoken",
          icon:DictionaryBack.search.sort=="lower"?"sort-desc":(DictionaryBack.search.sort=="-lower"?"sort-asc":undefined)
        }),
        m(CommonPages["button"],{
          class:DictionaryBack.search.display=="list"?"primary":"outline",
          onclick: function(e){
            e.preventDefault();
            DictionaryBack.search.setDisplay(vnode.attrs.name,"list");
          },
          key:"collection.view.list"
        })
      ])
    }
  },
  "results": {
    view: function(vnode){
      return [
        m(DictionaryPages['pages'],vnode.attrs),
        m("section.results",
          DictionaryBack.search.display=="list"?
            m("table.dictionary",[
              m("tr", 
                ["id","sign","lower","updated_at"].map(function(col){
                  return m("th",
                    m(CommonPages["button"],{
                      class: "pseudo",
                      onclick: function(e){
                        e.preventDefault();
                        DictionaryBack.search.setSort(col);
                        DictionaryBack.search.fn(vnode.attrs.name);                            
                      },
                      key:"collection.fields." + col.replace("_","").replace("lower","terms"),
                      icon:DictionaryBack.search.sort==col?"sort-desc":(DictionaryBack.search.sort=="-" + col?"sort-asc":undefined)
                    })
                  )
                })
              ),
              (DictionaryBack.search.results.data||[]).map(function(entry){
                var timer;
                return m("tr",{
                  class: DictionaryBack.search.selected(entry["id"])?"selected":"",
                  onclick: function(e){
                    e.preventDefault();
                    e.redraw=false;
                    if (timer) {
                      clearTimeout(timer);
                      timer = 0;
                    } else {
                      timer = setTimeout(DictionaryBack.search.select,250,entry["id"]);
                    }
                  },
                  ondblclick: function(e){
                    e.preventDefault();
                    e.redraw=false;
                    DictionaryBack.entry.get(vnode.attrs.name,entry['id']);
                  }
                },
                [
                  m("td",entry["id"]),
                  m("td",m("div.signed",m.trust(ssw.svg(entry["sign"])))),
                  m("td",entry["terms"].join(", ")),
                  m("td",entry["updated_at"].replace("T"," ").replace("Z",""))
                ]);
              })
            ])
          :(DictionaryBack.search.results.data||[]).map(function(entry){
            var timer;
            return m("div.signed",{
              class: DictionaryBack.search.selected(entry[0])?"selected":"",
              onclick: function(e){
                e.preventDefault();
                e.redraw=false;
                if (timer) {
                  clearTimeout(timer);
                  timer = 0;
                } else {
                  timer = setTimeout(DictionaryBack.search.select,250,entry[0]);
                }
              },
              ondblclick: function(e){
                e.preventDefault();
                e.redraw=false;
                DictionaryBack.entry.get(vnode.attrs.name,entry[0]);
              }
            },
            DictionaryBack.search.display=="sign"?m.trust(ssw.svg(entry[1])):entry[1]);
          })
        ),
        DictionaryBack.search.results.data.length?m(DictionaryPages['pages'],vnode.attrs):""
      ]
    }
  },
  "main": {
    oninit: function(vnode){
      window.scrollTo(0,0);
      CollectionBack.getStats(vnode.attrs.name);
      DictionaryBack.page="main";
    },
    view: function(vnode) {
      return [
        m("div.dictionary",[
          m(CommonPages['header']),
          m(DictionaryPages['side'],vnode.attrs),
          m("section.boxed", [
            m("h2",InterfaceFront.collection(vnode.attrs.name)),
            CollectionBack.stats[vnode.attrs.name]?m("ul",[
              m("li", t("collection.stats.entries") + " " + CollectionBack.stats[vnode.attrs.name].entries),
              m("li",t("collection.stats.users") + " "  + CollectionBack.stats[vnode.attrs.name].users),
              m("li",t("collection.stats.day") + " "  + CollectionBack.stats[vnode.attrs.name].day),
              m("li",t("collection.stats.week") + " "  + CollectionBack.stats[vnode.attrs.name].week),
              m("li",t("collection.stats.month") + " "  + CollectionBack.stats[vnode.attrs.name].month),
              m("li",t("collection.stats.year") + " "  + CollectionBack.stats[vnode.attrs.name].year)
            ]):''
          ])
        ]),
        m(AlphabetPages['palette'])
      ]
    }
  },
  "pages": {
    view: function(vnode){
      max = Math.ceil((DictionaryBack.search.results.total||0) / DictionaryBack.search.limit);
      return m("nav.search",[
        m(CommonPages["button"],{class: "outline", icon:'angle-double-left', onclick: function(e){
          e.preventDefault();
          if (DictionaryBack.search.page!=1){
            DictionaryBack.search.page=1;
            DictionaryBack.search.fn(vnode.attrs.name);
          }
        }}),
        m(CommonPages["button"],{class: "outline", icon:'angle-left', onclick: function(e){
          e.preventDefault();
          if (DictionaryBack.search.page>1){
            DictionaryBack.search.page--;
            DictionaryBack.search.fn(vnode.attrs.name);
          } else if (DictionaryBack.search.page!=1) {
            DictionaryBack.search.page=1;
            DictionaryBack.search.fn(vnode.attrs.name);
          }
        }}),
        m("input#page[type=text]",{value: DictionaryBack.search.page,oninput: function(e){
          e.preventDefault();
          var val = e.target.value.replace(/[^0-9]/g, '');
          if (val<1 && val!='') { val=1; }
          if (val>max) { val=max; }
          DictionaryBack.search.page=val;
          if (val){
            DictionaryBack.search.fn(vnode.attrs.name);
          } else {
            DictionaryBack.search.results.data = [];
          }
        }}),
        m("span", m.trust("&nbsp;/ " + max)),
        m(CommonPages["button"],{class: "outline", icon:'angle-right', onclick: function(e){
          e.preventDefault();
          if (DictionaryBack.search.page<(max-1)){
            DictionaryBack.search.page++;
            DictionaryBack.search.fn(vnode.attrs.name);
          } else if (DictionaryBack.search.page!=max) {
            DictionaryBack.search.page = max;
            DictionaryBack.search.fn(vnode.attrs.name);
          }
        }}),
        m(CommonPages["button"],{class: "outline", icon:'angle-double-right', onclick: function(e){
          e.preventDefault();
          if (DictionaryBack.search.page!=max) {
            DictionaryBack.search.page = max;
            DictionaryBack.search.fn(vnode.attrs.name);
          }
        }})
      ])
    }
  },
  "searchAll": {
    oninit: function(vnode){
      DictionaryBack.page = "searchAll";
      DictionaryBack.search.sort = "-sign";
      DictionaryBack.search.setDisplay(vnode.attrs.name,"sign");
    },
    view: function(vnode){
      return [
        m("div.dictionary",[
          m(CommonPages['header']),
          DictionaryBack.entry.data.id?m(DictionaryPages[DictionaryBack.entry.display],vnode.attrs)
          :[
            m(DictionaryPages['side'],vnode.attrs),
            m("section.boxed", [
              m("h2",InterfaceFront.collection(vnode.attrs.name)),
              m(DictionaryPages['display'],vnode.attrs),
              m(DictionaryPages['results'],vnode.attrs)
            ])
          ]
        ]),
        m(AlphabetPages['palette'])
      ];
    }
  },
  "selection": {
    oninit: function(vnode){
      DictionaryBack.page = "selection";
      DictionaryBack.search.sort = "-sign";
      DictionaryBack.search.setDisplay(vnode.attrs.name,"sign");
    },
    view: function(vnode){
      return [
        m("div.dictionary",[
          m(CommonPages['header']),
          DictionaryBack.entry.data.id?m(DictionaryPages[DictionaryBack.entry.display],vnode.attrs)
          :[
            m(DictionaryPages['side'],vnode.attrs),
            m("section.boxed", [
              m("h2",InterfaceFront.collection(vnode.attrs.name)),
              m(DictionaryPages['display'],vnode.attrs),
              m(DictionaryPages['results'],vnode.attrs)
            ])
          ]
        ]),
        m(AlphabetPages['palette'])
      ];
    }
  },
  "data": {
    view: function (vnode){
      return m("section.entry.boxed",[
        m("h2", vnode.attrs.name),
        m("pre","\n" + JSON.stringify(DictionaryBack.entry.data,null,2) + "\n"),
        m("div.wide", [
          m(CommonPages["button"],{class: "warning", key:'system.buttons.close', onclick: function(e){
            e.preventDefault();
            DictionaryBack.entry.data={};
          }}),
          m(CommonPages["button"],{class: "primary", key:'system.buttons.view', onclick: function(e){
            e.preventDefault();
            DictionaryBack.entry.display = "detail";
          }})
        ])
      ])
    }
  },
  "detail": {
    view: function (vnode){
      var editable = CollectionBack.rightsCheck(vnode.attrs.name,SP_EDIT,DictionaryBack.entry.data.user);
      var manager = CollectionBack.rightsCheck(vnode.attrs.name,SP_MANAGE);
      var sorting = DictionaryBack.entry.data['sign'].match(ssw.re.swu.sort + "(" + ssw.re.swu.symbol + ")+");
      sorting = sorting?sorting[0].slice(2):"";
      return m("section.entry.boxed",[
        m("h2", DictionaryBack.entry.data['terms'][0]),
        m("p", (DictionaryBack.entry.data['terms']).slice(1).join(", ")),
        m("div.signed",m.trust(ssw.svg(DictionaryBack.entry.data['sign']))),
        m("div.sequence",(sorting.match(/.{2}/g)||[]).map(function(sym){
          return m("div",sym);
        })),
        m("p",DictionaryBack.entry.data['text']),
        DictionaryBack.entry.data['signtext']?m("div.signtext",m.trust(ssw.paragraph(DictionaryBack.entry.data['signtext']))):'',
        m("ul",[
          DictionaryBack.entry.data['source']?m("li", t("collection.fields.source") + ": " + DictionaryBack.entry.data['source']):"",
          m("li", t("collection.fields.createdat") + ": " + DictionaryBack.entry.data['created_at'].replace("T"," ").replace("Z","")),
          m("li", t("collection.fields.updatedat") + ": " + DictionaryBack.entry.data['updated_at'].replace("T"," ").replace("Z",""))
        ]),
        m("div.wide", [
          m(CommonPages["button"],{class: "warning", key:'system.buttons.close', onclick: function(e){
            e.preventDefault();
            DictionaryBack.entry.data={};
          }}),
          m(CommonPages["button"],{class: "primary", key:'system.buttons.data', onclick: function(e){
            e.preventDefault();
            DictionaryBack.entry.display = "data";
          }})
        ])
      ]);
    },
  },
  "edit": {
    view: function (vnode){
      var editable = CollectionBack.rightsCheck(vnode.attrs.name,SP_EDIT,DictionaryBack.entry.data.user);
      var manager = CollectionBack.rightsCheck(vnode.attrs.name,SP_MANAGE);
      return m("section.entry.boxed",[
        m("h2", t("user.titles.login")),
        m("form", [
          m("label[for=username]",t('user.profile.username')),
          m("input#username[type=text]"),
          m("label[for=password]",t('user.profile.password')),
          m("input#password[type=password]"),
          m("label"),
          m("div.wide", 
            s('error')?
              [
                m(CommonPages["button"],{class: "danger", key:'system.buttons.error', onclick: function(e){e.preventDefault(); return false;}}),
                m(CommonPages["button"],{class: "warning", key:'sections.server.reset', onclick: function(e){e.preventDefault(); return false;}})
              ]
              :[
                m(CommonPages["button"],{class: "primary", onclick: function(e){e.preventDefault();serverfn.login();return false;}, key:'user.buttons.login'}),
                m(CommonPages["button"],{class: "warning", onclick: function(e){e.preventDefault();routesfn.set("/user/reset");return false;}, key:'user.buttons.reset'}),
                m(CommonPages["button"],{class: "outline", onclick: function(e){e.preventDefault();routesfn.set("/user/register");return false;}, key:'user.buttons.register'}),
              ]
          ),
        ])
      ]);
    },
  },
}

// m(CommonPages["button"],{class: "tight pseudo onLeft", disabled: routes.index<1,onclick: function(e){e.preventDefault();routesfn.index(routes.index-1);},icon:"arrow-left"}),
// m(CommonPages["button"],{class: "tight pseudo onLeft", disabled: routes.index>=routes.list.length-1,onclick: function(e){e.preventDefault();routesfn.index(routes.index+1);},icon:"arrow-right"})
var routes = {
  default: "/",
  items: {
    "h": ["connection","server"],//host
    "c": ["profile","country"],
    "s": ["profile","signed"],
    "v": ["profile","voiced"],
    "i": InterfaceFront.update,
    "d": ["profile","dictionary"],
    "l": ["profile","literature"],
    "a": ["profile","alphabet"],
    "f": ["profile","fingerspell"],
    "k": ["profile","keyboard"]
  },
  index: -1,
  list: [],
}
var routesfn = {
  "clear": function (route){
    routes.index = -1;
    routes.list = [];
  },
  "get": function(){
    var route = routes.list[routes.index];
    if (route.indexOf('?')!==-1){
      route = route.slice(0,route.indexOf('?'));
    }
    return route + routesfn.query();
  },
  "set": function(route){
    m.route.set(route);
    routesfn.change();
  },
  "add": function(route){
    route = route?route:routes.default;
    var list = routes.list.slice(0,routes.index+1);
    list.push(route);
    routes.list = list;
    routes.index = routes.list.length-1;
  },
  "index": function(index){
    routes.index=index;
    m.route.set(routes.list[routes.index]);
  },
  "change": function(){
    console.log("<-r->");
    var route = '';
    var query = '';
    if (window.location.href.indexOf('#')!==-1){
      route = window.location.href.slice(window.location.href.indexOf('#') +2);
      var query = '';
      var parsed;
      if (route.indexOf('?')!==-1){
        query = route.slice(route.indexOf('?') +1);
        if (query) {
          parsed = routesfn.queryParse(query);
          statefn.updateMany(parsed);
        }
      }
    }
    routesfn.add(route);
  },
  "log": function(){
    console.log("<-routes->");
  },
  "query": function(){
    var params = [];
    var val;
    for (var prop in routes.items){
      val = s(routes.items[prop]);
      if (val) {
        params.push(prop + "=" + val)
      }
    }
    return params.length?"?" + params.join("&"):"";
  },
  "queryParse": function(query) {
    // remove any preceding url and split
    var parsed = [], pair,initial,full,value,base;
    query = query.split('&');
    for (var i = query.length - 1; i >= 0; i--) {
      pair = query[i].split('=');
      initial = decodeURIComponent(pair[0]);
      value = decodeURIComponent(pair[1]) || '';
      full = routes.items[initial];
      if (Array.isArray(full)){
        base = Array.apply(null, full);
        base.push(value);
        parsed.push(base);
      } else if (typeof full === "function") {
        full(value);
      }
    }
    return parsed;
  }
}
routesfn.change();
window.onhashchange = routesfn.change;

var serverfn = {
  "connect": function(){
    var connection = s("connection");
    var server = connection.server;
    if (!server) return;
    if (connection.pass  || connection.requesting || connection.error) return;
    connection.requesting = true;
    statefn.update("connection",connection);
    var route = server + "/user/pass";
    var method = "POST";

    m.request({
      method: method,
      url: route,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status && response.status == 200){
        var connection = s("connection")
        var msg = Messaging.parse("success","system.response.success",method,route,response);
        Messaging.add("server",msg);
        delete connection['requesting'];
        var results = JSON.parse(response.body);
        connection.pass=results.pass;
        connection.ip = results.ip;
        statefn.update("connection",connection);
        m.redraw();
        CollectionBack.getAllSecurity();
      } else {
        var connection = s("connection")
        var err = Messaging.parse("danger","system.response.problem",method,route,response);
        Messaging.add("server",err);
        delete connection['requesting'];
        connection.error = err;
        statefn.update("connection",connection);
        m.redraw();
      }
    });
  },
  "parseXHR": function(xhr) {
    return {
      status: xhr.status || 0, 
      statusText: xhr.statusText || "No Response", 
      body: xhr.responseText || "", 
      headers: serverfn.parseHeaders(xhr)
    }
  },
  "parseHeaders": function (xhr) {
    return xhr.getAllResponseHeaders().split("\n").filter(function(line) {return line}).map(function(line){
      var head = (line.split(":"))[0];
      var header = {};
      var traincase = head.toLowerCase().replace(/^(.)|\-(.)/g, function(l){return l.toUpperCase()});
      header[traincase] = line.replace(head + ":","").trim();
      return header;
    }).reduce(function(a,b){return Object.assign(a,b);})
  },
  "reset": function(index){
    statefn.update("connection",{"server":s("connection","server")});
  },
  "login": function(){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/user/login";
    var method = "PUT";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    m.request({
      method: method,
      url: route,
      type: 'application/json',
      data: {username: username, pass: pass, validated: md5(md5(password)+pass)},
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 200) {
        var results = JSON.parse(response.body);
        var msg = Messaging.parse("success","system.response.success",method,route,response);
        Messaging.add("server",msg);
        statefn.update('profile', results);
        statefn.save();
        m.route.set("/user/profile",{},{replace:true});
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("server",err);
        m.redraw();
      }
    });
  },
  "logout": function(){
    statefn.update('profile',config.state.profile);
    serverfn.reset();
    routesfn.set('/user/login');
  },
  "register": function(){},
  "resetPassword": function(user){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/user/" + user + "/password";
    var method = "PUT";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      type: 'application/json',
      data: {"user":user},
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        var msg = Messaging.parse("success", "system.response.success",method,route,response);
        Messaging.add("server",msg);
        routesfn.set("/user/reset/message");
        m.redraw();
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("server",err);
        m.redraw();
      }
    });
  },
  "resetUsername": function(email){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/user/email/" + email;
    var method = "PUT";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        var msg = Messaging.parse("success", "system.response.success",method,route,response);
        Messaging.add("server",msg);
        routesfn.set("/user/reset/message");
        m.redraw();
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("server",err);
        m.redraw();
      }
    });
  },
  "updatePassword": function(username,oldPassword,newPassword){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/user/" + username + "/password";
    var method = "POST";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      type: 'application/json',
      data: {"old":oldPassword,"new":newPassword},
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        if (s("profile").name){
          routesfn.set("/user/profile");
        } else {
          routesfn.set("/user/login");
        }
        m.redraw();
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("server",err);
        m.redraw();
      }
    });
  },
  "updateProfile": function(){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var profile = s("profile");
    var route = server + "/user/" + profile.name;
    var method = "PUT";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      type: 'application/json',
      data: profile,
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        statefn.remove("profile","dirty");
        m.redraw();
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("server",err);
        m.redraw();
      }
    });
  }
}

var collectionfn = {
  "parseName": function(name){
    try {
      var parts = name.split('-');
      if (parts.length == 2) parts.unshift("","");
      if (parts.length!=4) throw("invalid collection name format: " + name);
      return {
        "name": name,
        "language": parts[0],
        "country": parts[1],
        "category": parts[2],
        "subname": parts[3],
      }
    } catch(err){
      console.log(err);
      return false;
    }
  }
}

var CollectionBack = {
  "name": "",
  "error": "",
  "collections": [],
  "getCollections": function(cc){
    var method = "GET";  
    var route = s("connection","server") + "/collection?name=-" + cc + "-";
    m.request({
      background:true,
      method: method,
      url: route,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status == 200){
        if (response.body){
          CollectionBack.collections = JSON.parse(response.body);
          m.redraw();
        }
      } else {
        CollectionBack.collections = [];
        var err = Messaging.parse("danger","system.response.problem",method,route,response);
        Messaging.add("CollectionBack",err);
        m.redraw();
      }
    });
  },
  "getAllCollections": function(){
    var method = "GET";  
    var route = s("connection","server") + "/collection";
    m.request({
      background:true,
      method: method,
      url: route,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status == 200){
        if (response.body){
          CollectionBack.collections = JSON.parse(response.body);
          m.redraw();
        }
      } else {
        CollectionBack.collections = [];
        var err = Messaging.parse("danger","system.response.problem",method,route,response);
        Messaging.add("CollectionBack",err);
        m.redraw();
      }
    });
  },
  "stats": {},
  "getStats": function(collection){
    if (CollectionBack.stats[collection]) return;
    var method = "GET";
    var route = s("connection","server") + "/collection/" + collection + "/stats";
    m.request({
      background:true,
      method: method,
      url: route,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status == 200){
        if (response.body){
          CollectionBack.stats[collection] = JSON.parse(response.body);
          m.redraw();
        }
      }
    });
  },
  "security": {},
  "securityMod": function(){
    try {
      return Object.keys(CollectionBack.security).map(function(key){return CollectionBack.security[key].updated_at}).reduce(function(a,b){return a>b?a:b;});
    } catch(e){
      return '';
    }
  },
  "getAllSecurity": function(){
    var method = "GET";
    var route = s("connection","server") + "/collection/security";
    var headers = {};
    var mod = CollectionBack.securityMod();
    if (mod){
      var headers = {'If-Modified-Since': mod};
    }
    m.request({
      background:true,
      method: method,
      url: route,
      headers: headers,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status == 200){
        if (response.body){
          CollectionBack.security = {};
          JSON.parse(response.body).map(function(collection){
            CollectionBack.security[collection.name] = collection;
          });
          m.redraw();
        }
      } else if (response.status != 304) {
        CollectionBack.security = {};
        var err = Messaging.parse("danger","system.response.problem",method,route,response);
        Messaging.add("CollectionBack",err);
        m.redraw();
      }
    });
  },
  "getSecurity": function(collection){
    var method = "GET";
    var route = s("connection","server") + "/collection/" + collection + "/security";
    m.request({
      background:true,
      method: method,
      url: route,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status == 200){
        if (response.body){
          CollectionBack.security[collection] = JSON.parse(response.body);
          m.redraw();
        }
      } else {
        CollectionBack.security = "";
        var err = Messaging.parse("danger","system.response.problem",method,route,response);
        Messaging.add("CollectionBack",err);
        m.redraw();
      }
    });
  },
  "updateSecurity": function(collection){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/collection/" + collection + "/security";
    var method = "PUT";
    delete CollectionBack.security[collection].dirty;
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      type: 'application/json',
      data: CollectionBack.security[collection],
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
      } else {
        CollectionBack.security[collection].dirty = true;
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("collection_" + collection,err);
        m.redraw();
      }
    });
  },
  "deleteSecurity": function(collection){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/collection/" + collection + "/security";
    var method = "DELETE";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        delete CollectionBack.security[collection];
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("CollectionBack",err);
        m.redraw();
      }
    });

  },
  "management": "",
  "getManagement": function(collection){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var method = "GET";
    var route = server + "/collection/" + collection + "/manage";
    m.request({
      headers: {Pass: pass},
      background:true,
      method: method,
      url: route,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status == 200){
        if (response.body){
          CollectionBack.error="";
          CollectionBack.name = collection;
          CollectionBack.management = JSON.parse(response.body);
          m.redraw();
        }
      } else {
        CollectionBack.error=collection;
        CollectionBack.name = "";
        CollectionBack.management = "";
        var err = Messaging.parse("danger","system.response.problem",method,route,response);
        Messaging.add("CollectionBack",err);
        m.redraw();
      }
    });
  },
  "updateManagement": function(collection,user){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/collection/" + collection + "/manage";
    var method = "PUT";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      type: 'application/json',
      data: {user:user.name, security:user.newsecurity},
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        user.security = user.newsecurity;
        delete user.newsecurity;
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("management",err);
        m.redraw();
      }
    });
  },
  "removeManagement": function(collection,user){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/collection/" + collection + "/manage/" + user.name;
    var method = "DELETE";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        delete user.removing;
        user.security = null;
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("management",err);
        m.redraw();
      }
    });
  },
  "deleteManagement": function(collection){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/collection/" + collection + "/manage";
    var method = "DELETE";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        CollectionBack.unknown = CollectionBack.unknown.filter(function(item){if (item!=collection) return true;});
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("management",err);
        m.redraw();
      }
    });
  },
  "unknown": [],
  "getUnknown": function(){
    var method = "GET";  
    var route = s("connection","server") + "/collection/manage/unknown";
    m.request({
      background:true,
      method: method,
      url: route,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status == 200){
        if (response.body){
          CollectionBack.unknown = JSON.parse(response.body);
          m.redraw();
        }
      } else {
        CollectionBack.unknown = [];
        var err = Messaging.parse("danger","system.response.problem",method,route,response);
        Messaging.add("CollectionBack",err);
        m.redraw();
      }
    });
  },
  "request": function(collection,source,title){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/collection/" + collection + "/request/" + source;
    var method = "POST";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      type: 'application/json',
      data: {"title": title},
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        CollectionBack.getAllCollections();
        CollectionBack.getAllSecurity();
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("CollectionBack",err);
        m.redraw();
      }
    });
  },
  "trash": function(collection){
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var route = server + "/collection/" + collection;
    var method = "DELETE";
    m.request({
      headers: {Pass: pass},
      method: method,
      url: route,
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      if (response.status && response.status == 204) {
        CollectionBack.collections = CollectionBack.collections.filter(function(item){if (item!=collection) return true;})
        delete CollectionBack.security[collection]
        CollectionBack.deleting="";
      } else {
        var err = Messaging.parse("warning", "system.response.problem",method,route,response);
        Messaging.add("CollectionBack",err);
        m.redraw();
      }
    });
  },
  "rightsCheck": function(collection, right, user){
    var profile = s("profile");
    if (right == SP_EDIT && (profile.name || s("connection").ip) == user) {
      return true;
    }
    if (right == SP_MANAGE && profile.name && profile.name == user) {
      return true;
    }
    var adjusted = right;
    if ((collection in CollectionBack.security)) {
      try {
        if (adjusted==SP_EDIT && !(CollectionBack.security[collection].edit_pass)) adjusted--;
        if (adjusted==SP_ADD && !(CollectionBack.security[collection].add_pass)) adjusted--;
        if (adjusted==SP_VIEW && !(CollectionBack.security[collection].view_pass)) adjusted--;
      }  catch (err){
        console.log(err);
        return false;
      }
    }
    var userrights = 0;
    try {
      userrights = Math.max(profile.security,profile.collections[collection]||0);
    }  catch (err){
      userrights = profile.security;
    }
    if (userrights >= adjusted) return true;

    return false;
  },
  "deleting": ""
}
CollectionBack.getAllSecurity();

var CollectionPages = {
  "manage": {
    oninit: function(vnode){
      serverfn.connect();
      CollectionBack.getSecurity(vnode.attrs.name);
      CollectionBack.getManagement(vnode.attrs.name);
    },
    onupdate: function(vnode){
      if(CollectionBack.error != vnode.attrs.name && vnode.attrs.name != CollectionBack.name) CollectionPages.manage.oninit(vnode); 
    },
    view: function(vnode) {
      var okay = CollectionBack.rightsCheck(vnode.attrs.name,SP_MANAGE);
      return (!(vnode.attrs.name in CollectionBack.security))?m(CommonPages['header']):
      [
        m(CommonPages['header']),
        m("section.boxed",
          m("h1", vnode.attrs.name),
          m("section.boxed",
            m("h2",t('sections.collection.title')),
            m("input#title[type=text]",{disabled: !okay, value: CollectionBack.security[vnode.attrs.name].title,oninput: function(e){
              CollectionBack.security[vnode.attrs.name].dirty=true;
              CollectionBack.security[vnode.attrs.name].title=e.target.value
            }})
          ),
          m("section.boxed",
            m("h2",t("security.titles.required")),
            ["view","add","edit"].map(function(right){
              return m("label.control.control--checkbox",
                t("security.rights." + right),
                m("input[type=checkbox]", {
                  disabled: !okay, 
                  id: "check_" + right,
                  checked: CollectionBack.security[vnode.attrs.name][right + '_pass'],
                  onclick: function(e){CollectionBack.security[vnode.attrs.name].dirty=true;CollectionBack.security[vnode.attrs.name][right + '_pass'] = !CollectionBack.security[vnode.attrs.name][right + '_pass']}
                }),
                m("div.control__indicator")
              )
            })
          ),
          m("section.boxed",
            m("h2",t("security.titles.register")),
            ["none","view","add","edit","manage"].map(function(right,i){
              return m("label.control.control--radio",
                t("security.rights." + right),
                m("input[type=radio]", {
                  disabled: !okay, 
                  id: "radio_" + right,
                  checked: CollectionBack.security[vnode.attrs.name].register_level == i,
                  onclick: function(e){CollectionBack.security[vnode.attrs.name].dirty=true;CollectionBack.security[vnode.attrs.name].register_level = i}
                }),
                m("div.control__indicator")
              )
            })
          ),
          m("section.boxed",
            m("h2",t("security.titles.upload")),
            ["add","edit","manage"].map(function(right,i){
              return m("label.control.control--radio",
                t("security.rights." + right),
                m("input[type=radio]", {
                  disabled: !okay, 
                  id: "radio_" + right,
                  checked: CollectionBack.security[vnode.attrs.name].upload_level == i+2,
                  onclick: function(e){CollectionBack.security[vnode.attrs.name].dirty=true;CollectionBack.security[vnode.attrs.name].upload_level = i+2}
                }),
                m("div.control__indicator")
              )
            })
          ),
          !okay || !CollectionBack.security[vnode.attrs.name].dirty?"":
          m("section.boxed",
            m("div.wide",
              m(CommonPages["button"],{class: "success", key:'system.buttons.save', onclick: function(e){
                e.preventDefault();
                CollectionBack.updateSecurity(vnode.attrs.name); 
              }}),
              m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){
                e.preventDefault();
                delete CollectionBack.security[vnode.attrs.name];
                CollectionBack.getSecurity(vnode.attrs.name);
              }})
            )
          )
        ),
        !okay?"":m("section.boxed",[
          m("h2",t("security.titles.adduser")),
          m("table.filteruser",
            m("tr", [
              m("th",t("user.profile.username")),
              m("th",t("user.profile.display")),
              m("th",t("user.profile.email"))
            ]),
            m("tr",[
              m("td",m("input#searchName[type=text]",{oninput: m.redraw})),
              m("td",m("input#searchDisplay[type=text]",{oninput: m.redraw})),
              m("td",m("input#searchEmail[type=text]",{oninput: m.redraw}))
            ])
          ),
          m("table.users",
            (CollectionBack.management||[]).filter(function(user){
              if (user.security) return false;
              try {
                var searchName = document.getElementById("searchName").value;
                var searchDisplay = document.getElementById("searchDisplay").value;
                var searchEmail = document.getElementById("searchEmail").value;
                if (!searchName && !searchDisplay && !searchEmail) return false;
                return (searchName?user.name.indexOf(searchName)>-1:true) && (searchDisplay?user.display.indexOf(searchDisplay)>-1:true) && (searchEmail?user.email.indexOf(searchEmail)>-1:true);
              } catch(e) {
                return false;
              }
            }).map(function(user){
              var buttons = [];
              if (user.newsecurity){
                buttons = [
                  m(CommonPages["button"],{class: "success", key:'system.buttons.save', onclick: function(e){
                    e.preventDefault();
                    CollectionBack.updateManagement(vnode.attrs.name,user);
                  }})
                ]
              }
              return [
                m("tr", [
                  m("th",user.name),
                  m("td", {rowspan:2},[
                    m("p",user.display),
                    m("p",user.email),
                    m("select", {onchange: function(e){
                        user.newsecurity = e.target.options[e.target.selectedIndex].value; 
                      }},
                      m("option"),
                      ["view","add","edit","manage"].map(function(right,i){
                        return m("option",{value:i+1,selected: user.newsecurity?user.newsecurity==(i+1):user.security==(i+1)},t("security.rights." + right));
                      })
                    )
                  ])
                ]),
                m("tr", m("th",
                  m("div.wide", buttons)
                ))
              ]
            })
          )
        ]),
        !okay?"":m("section.boxed",[
          m("h2",t("security.titles.users")),
          m("table.users",
            (CollectionBack.management||[]).filter(function(user){return user.security;}).map(function(user){
              var buttons = [];
              if (user.newsecurity){
                buttons = [
                  m(CommonPages["button"],{class: "success", key:'system.buttons.save', onclick: function(e){
                    e.preventDefault();
                    CollectionBack.updateManagement(vnode.attrs.name,user);
                  }}),
                  m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){
                    e.preventDefault();
                    delete user.newsecurity;
                  }})
                ]
              } else if (user.removing){
                buttons = [
                  m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){
                    e.preventDefault();
                    delete user.removing;
                  }}),
                  m(CommonPages["button"],{class: "danger", key:'system.buttons.remove', onclick: function(e){
                    e.preventDefault();
                    CollectionBack.removeManagement(vnode.attrs.name,user);
                  }})
                ]
              } else {
                buttons = [
                  m(CommonPages["button"],{class: "warning", key:'system.buttons.remove', onclick: function(e){
                    e.preventDefault();
                    user.removing=true;
                  }})
                ]
              }
              return [
                m("tr", [
                  m("th",user.name),
                  m("td", {rowspan:2},[
                    m("p",user.display),
                    m("p",user.email),
                    m("select", {onchange: function(e){
                        user.newsecurity = e.target.options[e.target.selectedIndex].value; 
                      }},
                      ["view","add","edit","manage"].map(function(right,i){
                        return m("option",{value:i+1,selected: user.newsecurity?user.newsecurity==(i+1):user.security==(i+1)},t("security.rights." + right));
                      })
                    )
                  ])
                ]),
                m("tr", m("th",
                  m("div.wide", buttons)
                ))
              ]
            })
          )
        ])
      ]
    }
  },

//  <h1>Radio buttons</h1>
//  <label class="control control--radio">First radio
//    <input type="radio" name="radio" checked="checked"/>
//    <div class="control__indicator"></div>
//  </label>
//  <label class="control control--radio">Second radio
//    <input type="radio" name="radio"/>
//    <div class="control__indicator"></div>
//  </label>
//  <label class="control control--radio">Disabled
//    <input type="radio" name="radio2" disabled="disabled"/>
//    <div class="control__indicator"></div>
//  </label>
//  <label class="control control--radio">Disabled & checked
//    <input type="radio" name="radio2" disabled="disabled" checked="checked"/>
//    <div class="control__indicator"></div>
//  </label>  



  "txt": {
    view: function(vnode) {
      var col = collectionfn.parseName(vnode.attrs['collection']);
      var output = false;
      switch(col['category']){
        case "interface":
          try {
            output = interfaces[col["language"] + '-' + col["country"]][col["subname"]]
          } catch(err){
            output = InterfaceFront.ui.data;
          }
          return m("pre",Object.keys(output).map(function(val,i){
            return val + "\t" + (output[val]["message"]?output[val]["message"]:"") + "\t" + (output[val]["description"]?output[val]["description"]:"") + "\t" + (output[val]["icon"]?output[val]["icon"]:"") + "\t" + (output[val]["image"]?output[val]["image"]:"") + "\t" + (output[val]["gesture"]?output[val]["gesture"]:"") + "\n";
          }))
          break;
        default:
          return m("pre","nope");
      }
    }
  }
}

var Messaging = {
  "statusText": function(code){
    switch(code){
      case 200: 
        return "OK";
      case 201: 
        return "Created";
      case 202: 
        return "Accepted";
      case 204: 
        return "No Content";
      case 300: 
        return "Multiple Choices";
      case 304: 
        return "No Modified";
      case 307: 
        return "Temporary Redirect";
      case 308: 
        return "Permanent Redirect";
      case 400: 
        return "Bad Request";
      case 403: 
        return "Forbidden";
      case 404: 
        return "Not Found";
      case 409: 
        return "Conflict";
      case 429: 
        return "Too Many Requests";
      case 500: 
        return "Internal Server Error";
      case 501: 
        return "Not Implemented";
      case 503: 
        return "Service Unavailable";
      default:
        return "";
    }
  },
  "sections": {},
  "parse": function(type,t,method,route,response){
    response.statusText = response.statusText || Messaging.statusText(response.status);
    var msg = {"type": type, "t": t, "method":method, "route": route, "status": response.status, "text": response.statusText, "response": response.body};
    if (response.headers){
      msg['headers'] = response.headers;
    }
    return msg;
  },
  "add": function(section,msg){
    Messaging.sections[section] = Messaging.sections[section] || [];
    Messaging.sections[section].unshift(msg);
    if (Messaging.sections[section].length>10){
      Messaging.sections[section].pop();
    }
  },
  "clear": function(section) {
     delete Messaging.sections[section];
  },
  "section": {
    view: function(vnode){
      var section = vnode.attrs['section'];
      if (!(section in Messaging.sections)){return "";}
      var title = vnode.attrs['title'];
      return title?m("section.boxed",m("h2",t(title)),m(Messaging.list,{"section":section})):m(Messaging.list,{"section":section});
    }
  },
  "list": {
    view: function(vnode) {
      var section = vnode.attrs['section'];
      return (Messaging.sections[section]||[]).map(function(message,i){
        return m(Messaging.item,{"section":section,"index":i});
      });
    }
  },
  "item": {
    view: function(vnode) {
      var section = vnode.attrs['section'];
      var index = vnode.attrs['index'];
      var msg = Messaging.sections[section][index]
      var type = msg['type'];
      if (msg['open']){
        return m("section.boxed", [
          m("div.wide", [
            m(Messaging.title, vnode.attrs),
            m(Messaging.close, vnode.attrs)
          ]),
          m("h2",t(msg['t'])),
          m("p",msg['method'] + ' ' + msg['route']),
          ("headers" in msg)?m(Messaging.headers, vnode.attrs):"",
          msg['response']?m("pre",msg['response']):""
        ])
      } else {
        return m("section.boxed",m("div.wide",[m(Messaging.title, vnode.attrs), m(Messaging.close, vnode.attrs)]));
      }
    }
  },
  "title": {
    view: function(vnode) {
      var section = vnode.attrs['section'];
      var index = vnode.attrs['index'];
      var msg = Messaging.sections[section][index];
      var type = msg['type'];
      var text =  t("system.response.status") + " " + msg['status'] + (msg["text"]?" (" + msg['text'] + ")":"");
      return m(CommonPages["button"],{class: "message " + type, "icon": msg['open']?"compress":"expand","text":text, onclick: function(e){
        e.preventDefault();
        msg['open'] = !msg['open'];
      }});
    }
  },
  "headers": {
    view: function(vnode) {
      var section = vnode.attrs['section'];
      var index = vnode.attrs['index'];
      var msg = Messaging.sections[section][index];
      if (msg['heading']){
        return [
          m("h3",{onclick: function(e){
            e.preventDefault();
            msg['heading'] = !msg['heading'];
          }}, "- Headers"),
          m("form",Object.keys(msg['headers']||{}).map(function (key){
            return[ m("label[for=header" + key + "]",key),
             m("input#header" + key + "[type=text]", {"class":"info", readonly:1,"value": msg['headers'][key]})];
          }))
        ];
      } else {
        return m("h3",{onclick: function(e){
          e.preventDefault();
          msg['heading'] = !msg['heading'];
        }}, "+ Headers");
      }

    }
  },
  "close": {
    view: function(vnode) {
      var section = vnode.attrs['section'];
      var index = vnode.attrs['index'];
      return m(CommonPages["button"],{class: "danger onRight", icon: 'close', onclick: function(e){
        e.preventDefault(); 
        Messaging.sections[section] = Messaging.sections[section].filter(function(msg,i){return i!=index});
        if (Messaging.sections[section].length == 0){
          delete Messaging.sections[section];
        }
      }});
    }
  }
}

var CommonPages = {
  "button": {
    view: function(vnode) {
      var attrs = Object.assign({},vnode.attrs);
      delete attrs['icon'];
      delete attrs['img'];
      delete attrs['text'];
      delete attrs['key'];
      if ("key" in vnode.attrs){
        vnode.attrs.text = vnode.attrs.text?vnode.attrs.text:t(vnode.attrs.key);
        vnode.attrs.icon = vnode.attrs.icon?vnode.attrs.icon:InterfaceFront.icon(vnode.attrs.key);
      }
//      attrs['class'] = attrs['class'] + ' sswOneD';
      return m("button", attrs,[
        vnode.attrs.icon?m("i.icon",m.trust(
          '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">' + icons[vnode.attrs.icon] + '</svg>'
        )):'',
        vnode.attrs.img?m("img.icon[src=" + vnode.attrs.img + "]"):'',
        vnode.attrs.text?(ssw.parse(vnode.attrs.text,"swu")?m.trust(ssw.svg(vnode.attrs.text,{"size":"x"})):m("span",vnode.attrs.text)):''
      ])
    }
  },
  "header": {
    view: function() {
      var settings = routes.list[routes.index].indexOf("/settings")==0;
      var userpage = routes.list[routes.index].indexOf("/user/")==0;
      var adminpage = routes.list[routes.index].indexOf("/admin")==0;
      var profile = s("profile");
      var title =  t("system.signpuddle.title",spVersion);
      var titleShort =  t("system.signpuddle.short",spVersion);
      return [
        m("header.main",[
          m("button", {class: "pseudo", onclick: function(e){e.preventDefault();
                routesfn.set("/country/" + state.profile.country);
              }
            },
            state.profile.country?m("img",{border:"1",src:"include/flags/" + state.profile.country.toLowerCase() + ".png"}):
              m("i.icon",m.trust(
                '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">' + icons['globe'] + '</svg>'
              ))
            ),
          m("button", {class: "large brand long pseudo",onclick: function(e){e.preventDefault();routesfn.set("/");return false;}}, [
            m("i.icon",m.trust(spLogo)),
            ssw.parse(title,"swu")?m.trust(ssw.svg(title)):m('span',title)
          ]),
          m("button", {class: "brand short pseudo",onclick: function(e){e.preventDefault();routesfn.set("/");return false;}}, [
            m("i.icon",m.trust(spLogo)),
            ssw.parse(titleShort,"swu")?m.trust(ssw.svg(titleShort)):m('span',titleShort)
          ]),
          m("span", [
            !CollectionBack.rightsCheck("",SP_ADMIN)?"":[
              m(CommonPages["button"],{class: "long " + (adminpage?"primary":"outline") , key:"system.buttons.admin", onclick: function(e){e.preventDefault();routesfn.set("/admin");return false;}}),
              m(CommonPages["button"],{class: "short " + (adminpage?"primary":"outline") , icon:InterfaceFront.icon("system.buttons.admin")||"bolt", onclick: function(e){e.preventDefault();routesfn.set("/admin");return false;}}),
            ],
            m(CommonPages["button"],{class: "long " + (settings?"primary":"outline") , key:"sections.settings.title", onclick: function(e){e.preventDefault();routesfn.set("/settings");return false;}}),
            m(CommonPages["button"],{class: "short " + (settings?"primary":"outline") , icon:InterfaceFront.icon("sections.settings.title")||"cog", onclick: function(e){e.preventDefault();routesfn.set("/settings");return false;}}),
            profile.name?
              [
                m(CommonPages["button"],{class: "long " + (userpage?"primary":"outline"), icon:InterfaceFront.icon("user.buttons.login")||"user",text:profile.name, onclick: function(e){e.preventDefault();routesfn.set("/user/profile");return false;}}),
                m(CommonPages["button"],{class: "short " + (userpage?"primary":"outline"), icon:InterfaceFront.icon("user.buttons.login")||"user",onclick: function(e){e.preventDefault();routesfn.set("/user/profile");return false;}})]
              :[
                m(CommonPages["button"],{class: "long " + (userpage?"primary":"outline"), icon:InterfaceFront.icon("user.buttons.login")||"user", key:"user.buttons.login", onclick: function(e){e.preventDefault();routesfn.set("/user/login");return false;}}),
                m(CommonPages["button"],{class: "short " + (userpage?"primary":"outline"), icon:InterfaceFront.icon("user.buttons.login")||"user", onclick: function(e){e.preventDefault();routesfn.set("/user/login");return false;}})
              ]
            ])
        ]),
        m("a#downloadlink", {style:"display: none", type:"button", charset:"utf-8"},"Download")
      ];
    }
  },
  "flags": {
    view: function(vnode){
      return Object.keys(world.country).map(function(val,i){
        return m(CommonPages["button"],{class: "card", text:val, img:"include/flags/" + val.toLowerCase() + ".png",onclick: function(e){e.preventDefault();
          statefn.update("country",val);
          routesfn.set("/country/" + val);
        }})
      })
    }
  },
  "main" : {
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m("section.boxed.cards",
          m(CommonPages['flags'])
        )
      ];
    }
  }
}

//var SettingsSections = ['servers','interfaces','dictionarys','literatures','alphabets','fingerspells','keyboards'];
var SettingsPages = {
  "main": {
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m("section.boxed", [
          m("h2",t('sections.server.title')),
          m(SettingsPages['server'])
        ]),
        m("section.boxed", [
          m("h2",t('sections.state.title')),
          m(SettingsPages['state']),
        ]),
        m(Messaging.section,{title:"settings.system.messages","section":"server"})
      ];
    }
  },
  "state": {
    view: function(vnode) {
      var status = s('status');
      var state_class = "outline";
      var initial_class = "primary";
      var save_class = "success";
      var restore_class = localStorage.getItem("sp3-state-stamp")?"warning":"outline";
      var forget_class = localStorage.getItem("sp3-state-stamp")?"danger":"outline";


      if (status == 'state.status.initial'){
        state_class = "primary";
        initial_class = "outline";
      } else if (status == 'state.status.unsaved') {
        state_class = "warning";
      } else {
        save_class = localStorage.getItem("sp3-state-stamp")==s("status")?"outline":"success";
        restore_class = localStorage.getItem("sp3-state-stamp")==s("status")?"outline":"warning";
      }
      var buttons = [
        m(CommonPages["button"],{class: initial_class, key:'sections.state.reset', onclick: function(e){e.preventDefault();statefn.initial();return false;}}),
        m(CommonPages["button"],{class: save_class, key:'system.buttons.save', onclick: function(e){e.preventDefault();statefn.save();return false;}}),
        m(CommonPages["button"],{class: restore_class, key:'sections.state.restore', onclick: function(e){e.preventDefault();statefn.restore();m.redraw();return false;}}),
        m(CommonPages["button"],{class: forget_class, key:'sections.state.forget', onclick: function(e){e.preventDefault();statefn.forget();return false;}})
      ];
      
      return [ 
        m("form", [
          m("label[for=state]",t('sections.state.status')),
          m("input#state[type=text]",{"class":state_class,"value":s('status'),"disabled":true}),
          m("label"),
          m("div.wide",buttons)
        ])
      ]
    }
  },
  "server": {
    view: function(vnode) {
      var connection = s("connection");
      var server = connection.server;
      var server_temp = connection.server_temp;
      var buttons = [];
      var server_class;
      var temp=server_temp || server;
      if (server!=temp){
        server_class="primary";
        buttons = [
          m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();statefn.remove("connection","server_temp");return false;}}),
          m(CommonPages["button"],{class: "success", key:'system.buttons.save', onclick: function(e){e.preventDefault();serverfn.reset();statefn.update("connection","server",temp);return false;}})
        ];
      } else if (connection.error){
        server_class="danger";
        buttons = [
          m(CommonPages["button"],{class: "warning", key:'sections.server.reset', onclick: function(e){e.preventDefault();serverfn.reset();serverfn.connect();return false;}})
        ]
      } else if (connection.pass){
        server_class="success";
        buttons = [
          m(CommonPages["button"],{class: "outline disabled", key:'sections.server.connect', onclick: function(e){e.preventDefault();serverfn.connect();return false;}}),
          m(CommonPages["button"],{class: "warning", key:'sections.server.disconnect', onclick: function(e){e.preventDefault();serverfn.reset();return false;}})
        ]
      } else if (connection.requesting){
        server_class="warning";
        buttons = [
          m(CommonPages["button"],{class: "outline disabled", key:'sections.server.requesting'})
        ];
      } else {
        server_class="info";
        buttons.push(
          m(CommonPages["button"],{class: "primary", key:'sections.server.connect', onclick: function(e){e.preventDefault();serverfn.connect();return false;}}),
          m(CommonPages["button"],{class: "outline disabled", key:'sections.server.disconnect', onclick: function(e){e.preventDefault();serverfn.reset();return false;}})
        );
      }
      return [ 
        m("form", [
          m("label[for=server]",t('sections.server.url')),
          m("input#server[type=text]",{"class":server_class,"value":temp,oninput: function(e){statefn.update("connection","server_temp",e.target.value)}}),
          m("label"),
          m("div.wide",buttons)
        ])
      ]
    }
  }
}  //<-END SettingsPages object


var UserSections = {};
var UserPages = {
  "login": {
    oninit: function(vnode){
      serverfn.connect();
    },
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("user.titles.login")),
          m("form", [
            m("label[for=username]",t('user.profile.username')),
            m("input#username[type=text]"),
            m("label[for=password]",t('user.profile.password')),
            m("input#password[type=password]"),
            m("label"),
            m("div.wide", 
              s('error')?
                [
                  m(CommonPages["button"],{class: "danger", key:'system.buttons.error', onclick: function(e){e.preventDefault(); return false;}}),
                  m(CommonPages["button"],{class: "warning", key:'sections.server.reset', onclick: function(e){e.preventDefault(); return false;}})
                ]
                :[
                  m(CommonPages["button"],{class: "primary", onclick: function(e){e.preventDefault();serverfn.login();return false;}, key:'user.buttons.login'}),
                  m(CommonPages["button"],{class: "warning", onclick: function(e){e.preventDefault();routesfn.set("/user/reset");return false;}, key:'user.buttons.reset'}),
                  m(CommonPages["button"],{class: "outline", onclick: function(e){e.preventDefault();routesfn.set("/user/register");return false;}, key:'user.buttons.register'}),
                ]
            ),
          ])
        ),
        m(Messaging.section,{title:"settings.system.messages","section":"server"})
      ];
    }
  },
  "register": {
    oninit: function(vnode){
      serverfn.connect();
    },
    view: function(vnode) {
      serverfn.connect();
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("user.titles.register")),
          m("form", [
            m("label[for=username]",t('user.profile.username')),
            m("input#username[type=text]"),
            m("label[for=display]",t('user.profile.display')),
            m("input#display[type=text]"),
            m("label[for=email]",t('user.profile.email')),
            m("input#email[type=text]"),
            m("label[for=password]",t('user.profile.password')),
            m("input#password[type=password]"),
            m("label"),
            m(CommonPages["button"],{class: "primary", onclick: function(e){e.preventDefault();serverfn.register();}, key:'user.buttons.register'})
          ])
        )
      ];
    }
  },
  "reset": {
    oninit: function(vnode){
      serverfn.connect();
    },
    view: function(vnode) {
      var username = (document.getElementById("username")||{}).value;
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("user.titles.reset")),
          m("form", [
            m("label[for=username]",t('user.profile.username')),
            m("input#username[type=text]",{oninput: function(e){m.redraw();}}),
            m("label"),
            m("div.wide", [
              m(CommonPages["button"],{class: !username?"outline":"primary", disabled: !username, onclick: function(e){e.preventDefault();
                serverfn.resetPassword(username);
              }, key:'user.buttons.resetpassword'}),
              m(CommonPages["button"],{class: "primary", onclick: function(e){e.preventDefault();
                routesfn.set("/user/reset/username");
              }, key:'user.buttons.forgotusername'}),
              m(CommonPages["button"],{class: "primary", onclick: function(e){e.preventDefault();
                routesfn.set("/user/reset/password");
              }, key:'user.buttons.havetemp'})
            ])
          ])
        ),
        m(Messaging.section,{title:"settings.system.messages","section":"server"})
      ];
    }
  },
  "resetUsername": {
    oninit: function(vnode){
      serverfn.connect();
    },
    view: function(vnode) {
      var email = (document.getElementById("email")||{}).value;
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("user.titles.reset")),
          m("form", [
            m("label[for=email]",t('user.profile.email')),
            m("input#email[type=text]",{oninput: function(e){m.redraw();}}),
            m("label"),
            m(CommonPages["button"],{class: !email?"outline":"primary", disabled: !email, onclick: function(e){e.preventDefault();
              serverfn.resetUsername(email);
            }, key:'user.buttons.forgotusername'})
          ])
        ),
        m(Messaging.section,{title:"settings.system.messages","section":"server"})
      ];
    }
  },
  "resetPassword": {
    oninit: function(vnode){
      serverfn.connect();
    },
    view: function(vnode) {
      var username = (document.getElementById("username")||{}).value;
      var tempPass = (document.getElementById("tempPass")||{}).value;
      var newPassword = (document.getElementById("newPassword")||{}).value;
      var confirmPassword = (document.getElementById("confirmPassword")||{}).value;
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("user.titles.password")),
          m("form", [
            m("label[for=username]",t('user.profile.username')),
            m("input#username[type=text]",{oninput: function(e){m.redraw();}}),
            m("label[for=tempPass]",t('user.profile.temp')),
            m("input#tempPass[type=text]",{oninput: function(e){m.redraw();}}),
            m("label[for=newPassword]",t('user.profile.new')),
            m("input#newPassword[type=password]",{oninput: function(e){m.redraw();}}),
            m("label[for=confirmPassword]",t('user.profile.confirm')),
            m("input#confirmPassword[type=password]",{oninput: function(e){m.redraw();}}),
            m("label"),
            m(CommonPages["button"],{disabled: !(username && tempPass && newPassword && newPassword==confirmPassword), class: "primary", onclick: function(e){e.preventDefault();
              serverfn.updatePassword(username,tempPass,md5(newPassword));
            }, key:'user.buttons.password'})
          ])
        ),
        m(Messaging.section,{title:"settings.system.messages","section":"server"})
      ];
    }
  },
  "resetMessage": {
    oninit: function(vnode){
      serverfn.connect();
    },
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("user.titles.reset")),
          m("p", t("user.titles.resetmessage"))
        ),
        m(Messaging.section,{title:"settings.system.messages","section":"server"})
      ];
    }
  },
  "password": {
    oninit: function(vnode){
      serverfn.connect();
    },
    view: function(vnode) {
      var profile = s('profile');
      if (!profile.name){
        routesfn.set("/user/login");
      } else {
        var oldPassword = (document.getElementById("oldPassword")||{}).value;
        var newPassword = (document.getElementById("newPassword")||{}).value;
        var confirmPassword = (document.getElementById("confirmPassword")||{}).value;
        return [
          m(CommonPages['header']),
          m("section.boxed",
            m("h2", t("user.titles.password")),
            m("form", [
              m("label[for=oldPassword]",t('user.profile.old')),
              m("input#oldPassword[type=password]",{oninput: function(e){m.redraw();}}),
              m("label[for=newPassword]",t('user.profile.new')),
              m("input#newPassword[type=password]",{oninput: function(e){m.redraw();}}),
              m("label[for=confirmPassword]",t('user.profile.confirm')),
              m("input#confirmPassword[type=password]",{oninput: function(e){m.redraw();}}),
              m("label"),
              m(CommonPages["button"],{disabled: !(oldPassword && newPassword && newPassword==confirmPassword), class: "primary", onclick: function(e){e.preventDefault();
                serverfn.updatePassword(profile.name,md5(oldPassword),md5(newPassword));
              }, key:'user.buttons.password'})
            ])
          ),
          m(Messaging.section,{title:"settings.system.messages","section":"server"})
        ];
      }
    }
  },
  "profile": {
    view: function(vnode) {
      var profile = s('profile');
      if (!profile.name){
        routesfn.set("/user/login");
      } else {
        return [
          m(CommonPages['header']),
          m("section.boxed",
            m("h2", t("user.profile.title")),
            m("form", [
              m("label[for=username]",t('user.profile.username')),
              m("input#username[type=text]", {value: profile.name,disabled:true}),
              m("label[for=display]",t('user.profile.display')),
              m("input#display[type=text]", {value: profile.display,oninput:function(e){statefn.updateMany([["profile","display",e.target.value],["profile","dirty",true]])}}),
              m("label[for=email]",t('user.profile.email')),
              m("input#email[type=text]", {value: profile.email,oninput:function(e){statefn.updateMany([["profile","email",e.target.value],["profile","dirty",true]])}}),
              m("label"),
              m("hr"),
              m(UserPages['country']),
              m("hr"),
              m("div.wide",
              m(CommonPages["button"],{class: profile.dirty?"primary":"outline disabled", onclick: function(e){e.preventDefault();
                serverfn.updateProfile();
                return false;
              }, key:'user.buttons.profile'}),
              m(CommonPages["button"],{class: "primary", onclick: function(e){e.preventDefault();routesfn.set("/user/password");return false;}, key:'user.buttons.password'}),
              m(CommonPages["button"],{class: "warning", onclick: function(e){e.preventDefault();serverfn.logout();return false;}, key:'user.buttons.logout'})
              )
            ])
          )
        ];
      }
    }
  },
  "country": {
    view: function(vnode) {
      var profile = s("profile");
      var country = profile.country;
      var country_temp = profile.country_temp;
      var buttons = [];
      var country_class;
      var flag_list = [];
      if (country_temp === undefined  || country==country_temp){
        if (country){
          country_class="success";
        } else {
          country_class="primary";
        }
        if (country != ""){
          buttons.push(
            m(CommonPages["button"],{class: "warning", key:'system.buttons.clear', onclick: function(e){e.preventDefault();
              var profile = s("profile");
              profile.country = "";
              profile.dirty = true;
              statefn.update("profile",profile);
              return false;
            }})
          )
        }
        buttons.push(
          m(CommonPages["button"],{class: "primary", key:'system.buttons.viewall', onclick: function(e){e.preventDefault();
            state.profile.country_temp = '';
            return false;
          }})
        );
        if (country==country_temp) {
          flag_list = Object.keys(world.country);
        }
      } else {
        var valid = world.country[country_temp] || (country_temp=="");
        if (world.country[country_temp]){
          flag_list = [country_temp];
        } else {
          var len = country_temp.length;
          if (len==1){
            flag_list = Object.keys(world.country).filter(function(val,i){
              return val[0] == country_temp;
            })
          } else {
            flag_list = Object.keys(world.country);
          }
        }
        buttons = [
          m(CommonPages["button"],{type:"submit",disabled:!valid, class: "primary", key:'system.buttons.okay', onclick: function(e){e.preventDefault();
            if (valid){
              var profile = s("profile");
              delete profile.country_temp;
              profile.country = country_temp;
              profile.dirty = true;
              statefn.update("profile",profile);
              InterfaceBack.search(country_temp);
            }
            return false;
          }}),
          m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();
            statefn.remove("profile","country_temp");
            return false;
          }})
        ];
        if (valid){
          country_class="primary";
        } else {
          country_class="warning";
        }
      }
      return [ 
        m("form", [
          m("h2",country?InterfaceFront.country(country):t('sections.country.title')),
          state.profile.country?m("img",{border:1,src:"include/flags/" + country.toLowerCase() + ".png"}):
            m("button.pseudo",{onclick: function(e){e.preventDefault();
              state.profile.country_temp = '';
              return false;
            }},m("i.icon",m.trust(
              '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">' + icons['globe'] + '</svg>'
            )))
          ,
          m("input#country_temp[type=text]",{"class":country_class,"value":(country_temp===undefined)?country:country_temp,autocomplete:"off",oninput: function(e){
            var val = e.target.value;
            var match = val.match(/[a-zA-Z]{1,2}/);
            val = match?match[0].toUpperCase():'';
            if (val){
              state.profile.country_temp = val;
            } else {
              state.profile.country_temp = '';
            }
          }}),
          m("label"),
          m("div.wide",buttons)
        ]),
        m("div.cards",flag_list.map(function(val,i){
          return m(CommonPages["button"],{class: "card", text:val, img:"include/flags/" + val.toLowerCase() + ".png",onclick: function(e){e.preventDefault();
            var profile = s("profile");
            delete profile.country_temp;
            profile.country = val;
            profile.dirty = true;
            statefn.update("profile",profile);
            InterfaceBack.search(val);
            return false;
          }})
        }))
      ]
    }
  },
  "interface": {
    view: function(vnode) {
      var interface = InterfaceFront.ui.name;
      var interface_temp = InterfaceFront.temp;
      var interface_search = InterfaceFront.search || [];
      var buttons = [];
      var interface_class;
      var temp=interface_temp || interface;
      if (interface!=temp){
        interface_class="primary";
        buttons = [
          m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();delete InterfaceFront.temp;delete InterfaceFront.search;return false;}}),
          m(CommonPages["button"],{class: "primary", key:'system.buttons.search', onclick: function(e){e.preventDefault();InterfaceBack.search(interface_temp);return false;}})
        ];
      } else {
        interface_class="info";
        buttons.push(
          m(CommonPages["button"],{class: "primary", key:'system.buttons.viewall', onclick: function(e){e.preventDefault();
            InterfaceBack.search("interface-sp3");
            return false;
          }}),
          m(CommonPages["button"],{class: "primary", key:'system.buttons.update', onclick: function(e){e.preventDefault();
            InterfaceFront.update();
            return false;
          }}),
          m(CommonPages["button"],{class: "primary", key:'system.buttons.edit', onclick: function(e){e.preventDefault();
            routesfn.set("/interface/" + interface);
            return false;
          }})
        );
      }
      return [ 
        m("form", [
          m("label[for=interface]",t('sections.interface.title')),
          m("input#interface[type=text]",{"class":interface_class,"value":temp,oninput: function(e){InterfaceFront.temp = e.target.value}}),
          m("label"),
          m("div.wide",buttons)
        ]),
        m("div",interface_search.map(function(val,i){
          return m(CommonPages["button"],{class: "card outline", text:val,onclick: function(e){e.preventDefault();
            delete InterfaceFront.temp;
            delete InterfaceFront.search;
            InterfaceFront.update(val);
            return false;
          }})
        }))
      ]
    }
  }
}

var CountryPages = {
  "head": {
    oninit: function(vnode){
      CollectionBack.getCollections(vnode.attrs.cc);
    },
    onupdate: function(vnode){
//      CountryPages.head.oninit(vnode);
    },
    view: function(vnode) {
      var cc = vnode.attrs.cc;
      var home = s("profile","country");
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m(CommonPages["button"],{class: "pseudo", text:cc, img:"include/flags/" + cc.toLowerCase() + ".png"}),
          m("h1",InterfaceFront.country(cc)),
          m(CommonPages["button"],{disabled: cc==home, class: cc==home?"outline":"primary", key:cc==home?"system.buttons.selected":"system.buttons.select",
            onclick: function(e){e.preventDefault();
            statefn.update("profile","country",cc);
          }})
        )
      ];
    }
  },
  "country": {
    view: function(vnode) {
      var cc = vnode.attrs.cc;
      var user = s("profile","name");
      return [
        m(CountryPages['head'],{cc:vnode.attrs.cc}),
        m("section.boxed",
          m("h2",t('sections.dictionary.available')),
          CollectionBack.collections.filter(function(collection){return collection.indexOf("-dictionary-")>-1}).map(function(collection){
            var buttons = [
              m(CommonPages["button"],{class: "primary", key:'system.buttons.open', onclick: function(e){e.preventDefault();
                routesfn.set("/dictionary/" + collection);
                return false;
              }}),
              m(CommonPages["button"],{class: "primary", key:'system.buttons.manage', onclick: function(e){e.preventDefault();
                routesfn.set("/manage/" + collection);
                return false;
              }})
            ];
            return m("form", [
                m("label[for=interface]",collection),
                m("input#dictionary[type=text]",{"disabled": true, "class":"primary","value":InterfaceFront.collection(collection)}),
                m("label"),
                m("div.wide",buttons)
            ])
          })
        ),
        m("section.boxed",
          m("h2",t('sections.interface.available')),
          CollectionBack.collections.filter(function(collection){return collection.indexOf("-interface-")>-1}).map(function(collection){
            var selected = (collection==InterfaceFront.ui.name);
            var interface_class = selected?"success":"primary";
            var buttons = [
              m(CommonPages["button"],{class: "primary", key:selected?'system.buttons.update':'system.buttons.select', onclick: function(e){e.preventDefault();
                InterfaceFront.update(collection);
                return false;
              }}),
              m(CommonPages["button"],{class: "primary", key:'system.buttons.edit', onclick: function(e){e.preventDefault();
                routesfn.set("/interface/" + collection);
                return false;
              }}),
              m(CommonPages["button"],{class: "primary", key:'system.buttons.manage', onclick: function(e){e.preventDefault();
                routesfn.set("/manage/" + collection);
                return false;
              }})
            ];
            return m("form", [
                m("label[for=interface]",collection),
                m("input#interface[type=text]",{"disabled": true, "class":interface_class,"value":InterfaceFront.collection(collection)}),
                m("label"),
                m("div.wide",buttons)
            ])
          })
        ),
        !user?"":m("section.boxed",
          m("h2",t('sections.interface.potential')),
          world.country[vnode.attrs.cc].language.map(function(lang){
            var buttons = [
              m(CommonPages["button"],{class: "primary", key:'system.buttons.request', onclick: function(e){e.preventDefault();
                CollectionBack.request(collection,"en-US-interface-sp3",document.getElementById("interface_" + collection).value);
                return false;
              }})
            ];
            var collection = lang + '-' + cc + '-interface-sp3';
            if (CollectionBack.collections.indexOf(collection)>-1)  return;
            return m("form", [
              m("label[for=interface]",collection),
              m("input#interface_" + collection + "[type=text]",{"class":"primary","value":InterfaceFront.language(lang) + " Interface"}),
              m("label"),
              m("div.wide",buttons)
            ]);
          })
        )
      ];
    }
  }
}

// ADMIN page
// collection classifications
//    unmanaged
//    all
//    missing
//    
// db without security
// security without db
// latest additions to security
// move to trash
// remove from trash

// collection name filter on top

var AdminPages = {
  "filter": function(arr){
    return (arr).filter(function(collection){
      var parts = collection.split("-");
      try {
        var searchLang = document.getElementById("searchLang").value;
        var searchCc = document.getElementById("searchCc").value;
        var searchType = document.getElementById("searchType").value;
        var searchSub = document.getElementById("searchSub").value;
        if (!searchLang && !searchCc && !searchType && !searchSub) return true;
        return (searchLang?parts[0].indexOf(searchLang)>-1:true) && 
               (searchCc?parts[1].indexOf(searchCc)>-1:true) &&
               (searchType?parts[2].indexOf(searchType)>-1:true) &&
               (searchSub?parts[3].indexOf(searchSub)>-1:true);
      } catch(e) {
        return false;
      }
    }).sort();
  },
  "radio": "unmanaged",
  "head": {
    oninit: function(vnode){
      CollectionBack.getAllCollections();
      CollectionBack.getAllSecurity();
      CollectionBack.getUnknown();
    },
    onupdate: function(vnode){
//      AdminPages.head.oninit(vnode);
    },
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m("section.boxed", [
          m("h1",t("sections.admin.title")),
          ["unmanaged","proper","missing","unknown","email"].map(function(radio,i){
            return m("label.control.control--radio",
              t("sections.admin." + radio),
              m("input[type=radio]", {
                id: "radio_" + radio,
                checked: AdminPages.radio == radio,
                onclick: function(e){e.preventDefault();AdminPages.radio = radio;}
              }),
              m("div.control__indicator")
            )
          }),
          m("hr"),
          m("h2",t("sections.collection.filter")),
          m("table.filtercollection",
            m("tr", [
              m("th",t("sections.collection.language")),
              m("th",t("sections.collection.country")),
              m("th",t("sections.collection.type")),
              m("th",t("sections.collection.subname"))
            ]),
            m("tr",[
              m("td",m("input#searchLang[type=text]",{oninput: m.redraw})),
              m("td",m("input#searchCc[type=text]",{oninput: m.redraw})),
              m("td",m("input#searchType[type=text]",{oninput: m.redraw})),
              m("td",m("input#searchSub[type=text]",{oninput: m.redraw}))
            ])
          )
        ])
      ]
    }
  },
  "main": {
    view: function(vnode) {
      return [
        m(AdminPages['head']),
        m(AdminPages["unmanaged"]),
        m(AdminPages["proper"]),
        m(AdminPages["missing"]),
        m(AdminPages["unknown"]),
        m(AdminPages["email"])
      ];
    }
  },
  "unmanaged": {
    view: function(vnode){
      return AdminPages.radio!="unmanaged"?"":m("section.boxed",[
        m("h2",t('sections.admin.unmanaged')),
        AdminPages.filter(CollectionBack.collections).filter(function(collection){return !(collection in CollectionBack.security)}).map(function(collection){
          var manager = CollectionBack.rightsCheck(collection,SP_MANAGE);
          var buttons;
          if (CollectionBack.deleting==collection){
            buttons = [
              m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();
                CollectionBack.deleting = "";
              }}),
              m(CommonPages["button"],{class: "danger onRight", key:'system.buttons.delete', onclick: function(e){e.preventDefault();
                CollectionBack.trash(collection);
              }})
            ]
          } else {
            buttons = [
              m(CommonPages["button"],{class: "primary", key:'system.buttons.manage', onclick: function(e){e.preventDefault();
                routesfn.set("/manage/" + collection);
                return false;
              }}),
              !manager?"":m(CommonPages["button"],{class: "warning", key:'system.buttons.delete', onclick: function(e){e.preventDefault();
                CollectionBack.deleting = collection;
                return false;
              }})
            ]
          }
          return m("form", [
              m("label[for=interface]",collection),
              m("input#interface[type=text]",{"disabled": true, "class":"warning","value":t("sections.collection.noname")}),
              m("label"),
              m("div.wide",buttons)
          ])
        })
      ])
    }
  },
  "proper": {
    view: function(vnode){
      return AdminPages.radio!="proper"?"":m("section.boxed",[
        m("h2",t('sections.admin.proper')),
        AdminPages.filter(Object.keys(CollectionBack.security)).filter(function(collection){return CollectionBack.collections.indexOf(collection)>-1}).map(function(collection){
          var manager = CollectionBack.rightsCheck(collection,SP_MANAGE,CollectionBack.security[collection].user);
          var buttons;
          if (CollectionBack.deleting==collection){
            buttons = [
              m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();
                CollectionBack.deleting = "";
              }}),
              m(CommonPages["button"],{class: "danger onRight", key:'system.buttons.delete', onclick: function(e){e.preventDefault();
                CollectionBack.trash(collection);
              }})
            ]
          } else {
            buttons = [
              m(CommonPages["button"],{class: "primary", key:'system.buttons.manage', onclick: function(e){e.preventDefault();
                routesfn.set("/manage/" + collection);
                return false;
              }}),
              !manager?"":m(CommonPages["button"],{class: "warning", key:'system.buttons.delete', onclick: function(e){e.preventDefault();
                CollectionBack.deleting = collection;
                return false;
              }})
            ]
          }
          return m("form", [
              m("label[for=interface]",collection),
              m("input#interface[type=text]",{"disabled": true, "class":"warning","value":InterfaceFront.collection(collection)}),
              m("label"),
              m("div.wide",buttons)
          ])
        })
      ])
    }
  },
  "missing": {
    view: function(vnode){
      return AdminPages.radio!="missing"?"":m("section.boxed",[
        m("h2",t('sections.admin.missing')),
        AdminPages.filter(Object.keys(CollectionBack.security)).filter(function(collection){return CollectionBack.collections.indexOf(collection)==-1}).map(function(collection){
          var manager = CollectionBack.rightsCheck(collection,SP_MANAGE,CollectionBack.security[collection].user);
          var buttons;
          if (CollectionBack.deleting==collection){
            buttons = [
              m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();
                CollectionBack.deleting = "";
              }}),
              m(CommonPages["button"],{class: "danger onRight", key:'system.buttons.delete', onclick: function(e){e.preventDefault();
                CollectionBack.deleteSecurity(collection);
              }})
            ]
          } else {
            buttons = [
              m(CommonPages["button"],{class: "primary", key:'system.buttons.manage', onclick: function(e){e.preventDefault();
                routesfn.set("/manage/" + collection);
                return false;
              }}),
              !manager?"":m(CommonPages["button"],{class: "warning", key:'system.buttons.delete', onclick: function(e){e.preventDefault();
                CollectionBack.deleting = collection;
                return false;
              }})
            ]
          }
          return m("form", [
              m("label[for=interface]",collection),
              m("input#interface[type=text]",{"disabled": true, "class":"warning","value":InterfaceFront.collection(collection)}),
              m("label"),
              m("div.wide",buttons)
          ])
        })
      ])
    }
  },
  "unknown": {
    view: function(vnode){
      return AdminPages.radio!="unknown"?"":m("section.boxed",[
        m("h2",t('sections.admin.unknown')),
        AdminPages.filter(CollectionBack.unknown).filter(function(collection){return CollectionBack.collections.indexOf(collection)==-1}).map(function(collection){
          var manager = CollectionBack.rightsCheck(collection,SP_MANAGE);
          var buttons;
          if (CollectionBack.deleting==collection){
            buttons = [
              m(CommonPages["button"],{class: "warning", key:'system.buttons.cancel', onclick: function(e){e.preventDefault();
                CollectionBack.deleting = "";
              }}),
              m(CommonPages["button"],{class: "danger onRight", key:'system.buttons.delete', onclick: function(e){e.preventDefault();
                CollectionBack.deleteManagement(collection);
              }})
            ]
          } else {
            buttons = [
              !manager?"":m(CommonPages["button"],{class: "warning", key:'system.buttons.delete', onclick: function(e){e.preventDefault();
                CollectionBack.deleting = collection;
                return false;
              }})
            ]
          }
          return m("form", [
              m("label[for=interface]",collection),
              m("input#interface[type=text]",{"disabled": true, "class":"warning","value":t("sections.collection.noname")}),
              m("label"),
              m("div.wide",buttons)
          ])
        })
      ])
    }
  },
  "emailGet" : function() {
    var connection = s("connection");
    var server = connection.server;
    var pass = connection.pass;
    var method = "GET";
    var route = server + "/user/email";
    m.request({
      headers: {Pass: pass},
      background:true,
      method: method,
      url: route,
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      if (response.status == 200 && response.body){
        AdminPages.emailRequests = JSON.parse(response.body);
        m.redraw();
      } else {
        AdminPages.emailRequests = [];
      }
    });
  },
  "emailRequests": [],
  "email": {
    "oninit": function(vnode){
      AdminPages.emailGet();
    },
    "view": function(vnode){
      var locate = window.location;
      var newline = "%0D%0A";
      var link = locate.origin + locate.pathname + "#!/user/reset/password";
      return AdminPages.radio!="email"?"":m("section.boxed",[
        m("h2",t('sections.admin.email')),
        m("table.users",
          (AdminPages.emailRequests).map(function(user){
            var msg = "username is " + user.name;
            if (user.temp!="username") {
              msg += newline + "temporary pass is " + user.temp + newline + newline + link;
            }
            return [
              m("tr", [
                m("th",user.name),
                m("td", {rowspan:2},[
                  m("p",user.display),
                  m("p",user.email)
                ])
              ]),
              m("tr", m("th",
                m("a", {href:"mailto:" + user.email + "?subject=SignPuddle 3 Account Services&body="+ msg}, "Send Email")
              ))
            ]
          })
        )
      ])
    }
  }
}


//    <label for="name">Name</label>
//    <input type="text" id="name" placeholder="Name">
//    <label for="email">Email</label>
//    <input type="email" id="email" placeholder="Email Address">
//    <label for="gender">Gender</label>
//    <select id="gender">
//      <option value="male">Male</option>
//      <option value="female">Female</option>
//    </select>
//    <label for="message">Messaging</label>
//    <textarea id="message" cols="30" rows="10" placeholder="Messaging"></textarea>
//    <input type="submit" value="Submit">
//  </form>
//</div>

m.route(document.body, routes.default, {
  "/": CommonPages['main'],
  "/settings": SettingsPages['main'],
  "/manage/:name": CollectionPages['manage'],
  "/collection/txt/:collection": CollectionPages['txt'],
  "/interface/:name": InterfacePages['main'],
  "/interface/:name/:q1": InterfacePages['q1'],
  "/interface/:name/:q1/:q2": InterfacePages['q2'],
  "/interface/:name/:q1/:q2/:q3": InterfacePages['q3'],
  "/dictionary/:name": DictionaryPages['main'],
  "/dictionary/:name/search": DictionaryPages['searchAll'],
  "/dictionary/:name/search/id": DictionaryPages['searchId'],
  "/dictionary/:name/search/terms": DictionaryPages['searchTerms'],
  "/dictionary/:name/search/sign": DictionaryPages['searchSign'],
  "/dictionary/:name/search/signtext": DictionaryPages['searchSigntext'],
  "/dictionary/:name/selection": DictionaryPages['selection'],
  "/user/login": UserPages['login'],
  "/user/profile": UserPages['profile'],
  "/user/register": UserPages['register'],
  "/user/reset": UserPages['reset'],
  "/user/reset/username": UserPages['resetUsername'],
  "/user/reset/password": UserPages['resetPassword'],
  "/user/reset/message": UserPages['resetMessage'],
  "/user/password": UserPages['password'],
  "/country/:cc": CountryPages['country'],
  "/admin": AdminPages['main'],
  "/special": SpecialPages['main'],
  "/special/icons": SpecialPages['icons'],
  "/special/style": SpecialPages['style'],
  "/special/test": SpecialPages['test'],
  "/special/buttons": SpecialPages['buttons'],
  "/special/canvas": SpecialPages['canvas']
})
