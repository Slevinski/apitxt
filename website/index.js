function downloadlink(href,download){
  var link = document.getElementById('downloadlink');
  link.href = href;
  link.download = download;
  link.click();
}

var spVersion = "3"

var spLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.39499 393.798"><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 266.68v259.504h-7V266.68"/></g><g transform="translate(-153.728 -166.677)">  <path fill="#000" d="M348.22 166.677v32.32h-7v-32.32"/></g><g transform="translate(-153.728 -166.677)">  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="138.098" y1="180.746" x2="536.098" y2="375.746">  <stop offset="0" stop-color="#ff0700"/>  <stop offset="1" stop-color="#b40000"/>  </linearGradient>  <path d="M198.26 300.806c18.388 0 35.327 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.887-16.532s35.326 6.168 48.888 16.532c13.562-10.364 30.5-16.532 48.888-16.532 18.387 0 35.326 6.168 48.89 16.532 13.56-10.364 30.5-16.532 48.888-16.532 16.467 0 31.773 4.948 44.533 13.423-27.962-78.602-103-134.882-191.197-134.882-88.196 0-163.236 56.28-191.198 134.88 12.76-8.475 28.066-13.422 44.533-13.422z" fill="url(#c)"/></g></svg>';

var iconset = {};
function iconsused (){
  return Object.keys(iconset);
}

var state = {};

var statefn = {
  "initial": function (){
    //state also has salt, username, profile, editing, and deleting attributes
    state = {
      "messages": [],
//      "server": "https://signpuddle.net/v3",
      "status": "state.status.initial",
      "server": "http://192.168.254.5:8888",
      "connection": {},
      "country": "",
      "language": "",
      "interface": "",
      "dictionary": "",
      "literature": "",
      "alphabet": "",
      "fingerspell": "",
      "keyboard": "",
      "specials": ['icons','buttons','style','test'],
    }
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
  "update": function(){
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
    statefn.change();
    return true;
  },
  "updateMany": function (params){
    for (param in params){
      if (state.hasOwnProperty(param)){
        if (state[param] == params[param]) {
          console.log("<==== SAME ====>");
          console.log(param,params[param])
        } else {
          state[param] = params[param];
          statefn.change();
        }
      }
    }
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
  "message": function(msg){
    var list = s('messages');
    list.unshift(msg);
    if (list.length>10){
      list.pop();
    }
    statefn.update("messages",list);
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


var messages = {};
var interface = {};
var interfacefn = {
  "default": function(){
    var keys = Object.keys(interfaces['default']);
    var loaded = keys.map(function(key){
      messages[key] = interfaces['default'][key];
      return key;
    })
    return loaded.join(' ');

  },
  "text": function(subname,key){
    var msg="";
    try {
      msg = messages[subname][key].message;
    } catch(err) {
      msg = key;
      if (arguments.length>2){
        for (var i = 1; i <= arguments.length; i++) {
          msg += " $" + i;
        }
      }
    }
    if (arguments.length>2) {
      for (var i = 1; i <= arguments.length; i++) {
        msg = msg.replace("$" + (i),arguments[i+1]);
      }
    }
    return msg;
  },
  "q1s": {},
  "q1set": function() {
    var q1s = interfacefn['q1s'];
    for (key in interfaces){
      var parts = key.split('.');
      q1s[parts[0]] = q1s[parts[0]] || {};
      q1s[parts[0]][parts[1]] = q1s[parts[0]][parts[1]] || []; 
      q1s[parts[0]][parts[1]].push(parts[2]);
    }
  },
  "load": function(collection) {
    var lines = localStorage.getItem(collection);
  }
};
var InterfacePages = {
  "nav": {
    view: function(vnode) {
      var q1 = vnode.attrs['q1'] || "";
      var q2 = vnode.attrs['q2'] || "";
      var post = q1?("/"+q1 + (q2?"/"+q2:'')):'';
      return m("nav",
        s("interfaces").concat([{"name":"defaults"}]).map(function(section,i){
          if(localStorage.getItem(section.name + "-md5")){
            return m(CommonPages["button"],{class: vnode.attrs['name']==section.name?'primary':'outline',text:section.name, onclick: function(){
              routesfn.set("/settings/interface/" + section.name + post)}
            });
          }
        })
      );
    }
  },
  "tab": {
    view: function(vnode) {
      var q1s = interfacefn['q1s'];
      return m("nav",
        Object.keys(q1s).map(function(q1){
          return m(CommonPages["button"],{class: vnode.attrs['q1']==q1?'primary':'outline',text:q1, 
            onclick: function(){routesfn.set("/settings/interface/" + vnode.attrs['name'] + "/" + q1)}});
        })
      );
    }
  },
  "sub": {
    view: function(vnode) {
      var q1 = vnode.attrs['q1'];
      var q2s = interfacefn['q1s'][q1];
      if (!q2s) return "";
      return m("nav",
        Object.keys(q2s).map(function(q2){
          return m(CommonPages["button"],{class: vnode.attrs['q2']==q2?'primary':'outline',text:q2, 
            onclick: function(){routesfn.set("/settings/interface/" + vnode.attrs['name'] + "/" + q1 + "/" + q2)}});
        })
      );
    }
  },
  "index": {
    view: function() {
      return [
        m(CommonPages['header']),
        m(SettingsTabs,{"section":"interfaces"}),
        m("hr"),
        m(InterfacePages['nav']),
        m("section.boxed",
          m(InterfacePages['list'])
        )
      ]
    }
  },
  "list": {
    view: function() {
      return [
        statefn.array("interfaces").map(function(item,i){
          item = s("interfaces",i);
          var collection = collectionfn.parseName(item['name']);
          if (!collection) return;
          if (collection['category'] != "interface") return;
          var interfacenum = "interface" + i;
          var timestamp = localStorage.getItem(item['name'] + "-timestamp");
          if (item['deleting']){
            buttons = [
              m(CommonPages["button"],{class: "warning", text:t("sp3",'system.buttons.cancel'), onclick: function(){ item['deleting'] = false; statefn.update("interfaces",i,item);}}),
              m(CommonPages["button"],{class: "danger onRight", text:t("sp3",'system.buttons.remove'), onclick: function(e){ statefn.removeItem("interfaces",i);}})
            ];
          } else if (item['clearing']){
            buttons = [
              m(CommonPages["button"],{class: "warning", text:t("sp3",'system.buttons.cancel'), onclick: function(){ item['clearing'] = false; statefn.update("interfaces",i,item);}}),
              m(CommonPages["button"],{class: "danger onRight", text:t("sp3",'system.buttons.clear'), onclick: function(e){ collectionfn["clear"](item['name']);delete item['clearing'];delete item['messages']; statefn.update("interfaces",i,item); }})
            ];
          } else if (item['download']){
            buttons = [
              m(CommonPages["button"],{class: "warning onRight", text:t("sp3",'system.buttons.clear'), onclick: function(){ delete item['download']; delete item['messages']; statefn.update("interfaces",i,item);}})
            ];
          } else if (item['editing']){
            buttons = [
              m(CommonPages["button"],{class: "warning onRight", text:t("sp3",'system.buttons.remove'), onclick: function(){ item['deleting'] = true; statefn.update("interfaces",i,item);}}),
              m(CommonPages["button"],{class: "warning onRight", text:t("sp3",'system.buttons.clear'), onclick: function(){ item['clearing'] = true; statefn.update("interfaces",i,item);}})
            ];
            if (localStorage.getItem(item['name']+'-md5')){
              buttons.push(
                m(CommonPages["button"],{class: "primary", text:t("sp3",'system.buttons.open'), onclick: function(){ routesfn.set('/settings/interface/' + item['name']);}})
              );
            }
          } else {
            buttons = [
              m(CommonPages["button"],{class: (!item['md5'])?'outline':(item['md5']==localStorage.getItem(item['name'] + "-md5"))?"success":(localStorage.getItem(item['name'] + "-md5")?"warning":"primary"), text:t("sp3",'system.buttons.check'), onclick:function(){statefn.clear("interfaces",i);collectionfn.getMD5(item['name']);}}),
              (item['md5'] && localStorage.getItem(item['name'] + "-md5") && item['md5']!=localStorage.getItem(item['name'] + "-md5"))?m(CommonPages["button"],{class: "primary", text:t("sp3",'system.buttons.download'), onclick:function(){statefn.clear("interfaces",i);collectionfn.download(item['name']);}}):"",
            ];
            if (localStorage.getItem(item['name']+'-md5')){
              buttons.push(
                m(CommonPages["button"],{class: "primary", text:t("sp3",'system.buttons.open'), onclick: function(){ routesfn.set('/settings/interface/' + item['name']);}})
              );
            }
          }
          return [ 
            m("hr"),
            m("form", [
              m("label[for=interface]",item['name']),
              m("input#interface" + i + "[type=text]", {"class":"info","readonly":1,"value": timestamp?Date(timestamp):''}),
              m("div.label",localStorage.getItem(item['name']+"-md5")?
                m(CommonPages["button"],{class:(i!=s('interface'))?"outline":"primary",text: t("sp3","system.buttons.select" + ((i==s('interface'))?"ed":'')), onclick:function(e){interfacefn.set(i)}}):
                ''
              ),
              m("div.wide",buttons)
            ]),
            m(MessageParts['list'],{'section':'interfaces','index':i})
          ]
        }),
        [{"name":"qqq"},{"name":"defaults"}].map(function(item,i){
            i = i -2;
            return [ 
              m("hr"),
              m("form", [
                m("label",item['name']),
                m("div.wide",m("p", t("sp3","interface." + item['name'] + ".description"))),
                m("div.label",m(CommonPages["button"],{class:(i!=s('interface'))?"outline":"primary",text: t("sp3","system.buttons.select" + ((i==s('interface'))?"ed":'')), onclick:function(e){interfacefn.set(i)}}))
              ])
            ]
        }).reverse()
      ]
    }
  },
  "main": {
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m(SettingsTabs,{"section":"interfaces"}),
        m("hr"),
        m(InterfacePages['nav'],{"name":vnode.attrs['name']}),
        m("hr"),
        m("section.boxed",
          m(InterfacePages['tab'],{"name":vnode.attrs['name']})
        )
      ]
    }
  },
  "q1": {
    view: function(vnode) {
      var q1 = vnode.attrs['q1'];
      return [
        m(CommonPages['header']),
        m(SettingsTabs,{"section":"interfaces"}),
        m("hr"),
        m(InterfacePages['nav'],{"name":vnode.attrs['name'],"q1":q1}),
        m("hr"),
        m("section.boxed",
          m(InterfacePages['tab'],{"name":vnode.attrs['name'],"q1":q1})
        ),
        m("section.boxed",
          m(InterfacePages['sub'],{"name":vnode.attrs['name'],"q1":q1})
        )
      ]
    }
  },
  "q2": {
    view: function(vnode) {
      var q1 = vnode.attrs['q1'];
      var q2 = vnode.attrs['q2'];
      return [
        m(CommonPages['header']),
        m(SettingsTabs,{"section":"interfaces"}),
        m("hr"),
        m(InterfacePages['nav'],{"name":vnode.attrs['name'],"q1":q1,"q2":q2}),
        m("hr"),
        m("section.boxed",
          m(InterfacePages['tab'],{"name":vnode.attrs['name'],"q1":q1})
        ),
        m("section.boxed",
          m(InterfacePages['sub'],{"name":vnode.attrs['name'],"q1":q1,"q2":q2}),
          (interfacefn.q1s[q1] && interfacefn.q1s[q1][q2])?interfacefn.q1s[q1][q2].map(function(q3,i){
            return [ 
              m("hr"),
              m("form", [
                m("label[for=interfaceitem" + i + "]",q1 + '.' + q2 + '.' + q3),
                m("input#interfaceitem" + i + "[type=text]",{"value":q3}),
                m("label"),
                m("div.wide",[
                  m(CommonPages["button"],{class: "success", text:t("sp3",'system.buttons.save'), onclick: function(){ server['name'] = document.getElementById(servernum + "name").value;var url = document.getElementById(servernum + "url").value;if (url!=server['url']) serverfn.reset(i);server['url'] = url; server['editing'] = false; statefn.update("servers",i,server);}}),
                  m(CommonPages["button"],{class: "warning", text:t("sp3",'system.buttons.cancel'), onclick: function(){ server['editing'] = false; statefn.update("servers",i,server);}})
                ])
              ])
            ]
          }):""
        )
      ]
    }
  }
}

t = interfacefn.text;
interfacefn.default();

// m(CommonPages["button"],{class: "thin pseudo onLeft", disabled: routes.index<1,onclick: function(){routesfn.index(routes.index-1);},icon:"arrow-left"}),
// m(CommonPages["button"],{class: "thin pseudo onLeft", disabled: routes.index>=routes.list.length-1,onclick: function(){routesfn.index(routes.index+1);},icon:"arrow-right"})
var routes = {
  default: "/",
  items: {
    "s": "server",
    "c": "country",
    "i": "interface",
    "d": "dictionary",
    "l": "literature",
    "a": "alphabet",
    "f": "fingerspell",
    "k": "keyboard",
    "u": "user"
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
    var index = routes.index;
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
      var hash;
      var query = '';
      var params;
      if (route.indexOf('?')!==-1){
        query = route.slice(route.indexOf('?') +1);
        hash = route.slice(0,route.indexOf('?'));
        if (query) {
          params = routesfn.queryParse(query);
          statefn.updateMany(params);
        }
      }
    }
    routesfn.add(route);
  },
  "log": function(){
    console.log("<-routes->");
    console.log(routes.list);
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
    var params = {}, pair;
    query = query.split('&');
    for (var i = query.length - 1; i >= 0; i--) {
      pair = query[i].split('=');
      var initial = decodeURIComponent(pair[0]);
      var key = routes.items[initial];
      var val = decodeURIComponent(pair[1]) || '';
      if (params.hasOwnProperty(key)) {
        if (Array.isArray(params[key])) {
            params[key].unshift(val);
        } else {
            params[key] = [params[key]];
            params[key].unshift(val);
        }
      } else {
        params[key] = val;
      }
    }
    return params;
  }
}
routesfn.change();
window.onhashchange = routesfn.change;

var serverfn = {
  "connect": function(){
    var server = s("server");
    var connection = s("connection")
    var route = server + "/user/salt";
    var method = "GET";
    if (connection.salt  || connection.salting || connection.error) return;
    if (!server) return;
    connection.salting = true;
    statefn.update("connection",connection);

    m.request({
      method: method,
      url: route,
      deserialize: function(value) {return value},
      extract: serverfn.parseXHR
    })
    .then(function(response) {
      var connection = s("connection")
      var msg = serverfn.parseMessage("success","system.server.success",method,route,response);
      statefn.message(msg);
      delete connection['salting'];
      connection.salt=response.body;
      statefn.update("connection",connection);
      m.redraw();
    })
    .catch(function(error) {
      var server = s("server");
      var connection = s("connection")
      response = error;
      var err = serverfn.parseMessage("danger","system.server.problem",method,route,response);
      statefn.message(err);
      delete connection['salting'];
      connection.error = err;
      statefn.update("connection",connection);
      m.redraw();
    });
  },
  "parseXHR": function(xhr) {
    return {
      status: xhr.status || 0, 
      statusText: xhr.statusText || "No Response", 
      body: xhr.responseText || "", 
      headers: xhr.getAllResponseHeaders().split("\n").filter(function(line) {return line}).map(function(line){
        var head = (line.split(":"))[0];
        var header = {};
        header[head] = line.replace(head + ":","").trim();
        return header;
      })
    }
  },
  "parseMessage": function(type,t,method,route,response){
    var msg = {"type": type, "t": t, "method":method, "route": route, "status": response.status, "text": response.statusText, "response": response.body};
    if (response.headers){
      msg['headers'] = response.headers;
    }
    return msg;
  },
  "reset": function(index){
    statefn.update("connection",{});
  },
  "register": function(){},
  "resetPassword": function(){},
  "login": function(){
    var index = s('server');
    var server = s("servers",index);
    var route = server['url'] + "/user/login";
    var method = "POST";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    m.request({
      method: method,
      url: route,
      type: 'application/json',
      data: {username: username, salt: s('user'), salted: md5(md5(password)+s('user'))},
      extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    })
    .then (function(response) {
      var results = response.body;
      var msg = serverfn.parseMessage("success","system.server.success",method,route,response);
      statefn.addItem2("servers",s('server'),"messages",msg);
      index = statefn.reindex("servers",index,server,"url");
      server['profile'] = response;
      s('user') = username;
      statefn.update("servers",index,server);
      m.route.set("/user/profile");
    })
    .catch (function(response) {
      var results = response.body;
      var err = serverfn.parseMessage("warning", "system.server.problem",method,route,response);
      statefn.addItem2("servers",s('server'),"messages",err);
      m.redraw();
//      server['error'] = err;
//      statefn.update("servers",index,server);
    });
  }
}

var countryfn = {
  "set": function(cc){

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
  },
  "clear": function(name){
    localStorage.setItem(name,"");
    localStorage.setItem(name + "-md5","");
    localStorage.setItem(name + "-timestamp","");
  },
  "md5": function(name){
    return localStorage.getItem(name + "-md5");
  },
  "source": function(name){
    return localStorage.getItem(name);
  },
  "getMD5": function(name){
    var collection = collectionfn.parseName(name);
    if (!collection) return false;
    var section = collection['category'] + 's';
    var item = statefn.getItem(name);

    var index = s('server');
    var server = s("servers",index);

    var route = server['url'] + "/collection/" + name + "/md5";
    var method = "GET";
    statefn.update("servers",index,server);


    m.request({
      method: method,
      url: route,
      deserialize: function(value) {return value},
      extract: serverfn.parseXHR
    })
    .then (function(response) {
      index = statefn.reindex("servers",index,server,"url");
      var msg = serverfn.parseMessage("success","system.server.success",method,route,response);
      localStorage.setItem(name + "-md5",response.body);
      statefn.addItem2("servers",index,"messages",msg);
      item['md5'] = response.body;
      item['messages'] = item['messages'] || [];
      item['messages'].push(msg);
      statefn.update(section,item['index'],item);
      m.redraw();
    })
    .catch(function(err) {
      var response = err;
      index = statefn.reindex("servers",index,server,"url");
      var err;
      err = serverfn.parseMessage("warning","system.server.problem",method,route,response);
      delete item['md5'];
      item['messages'] = item['messages'] || [];
      item['messages'].push(err);
      statefn.update(section,item['index'],item);
      delete item['download'];
      statefn.addItem2("servers",index,"messages",err);
      m.redraw();
    });
  },
  "download": function (name){
    var collection = collectionfn.parseName(name);
    if (!collection) return false;
    var section = collection['category'] + 's';
    var item = statefn.getItem(name);
    if (item['download']) return true;
    item['download'] = true;
    statefn.update(section,item['index'],item);
    var index = s('server');
    var server = s("servers",index);
    var route = server['url'] + "/collection/" + name;
    var method = "GET";
    statefn.update("servers",index,server);
    m.request({
      method: method,
      url: route,
      headers: {
        "If-None-Match":localStorage.getItem(name + "-md5")
      },
      extract: serverfn.parseXHR,
      deserialize: function(value) {return value}
    })
    .then (function(response) {
      var msg = serverfn.parseMessage("success","system.server.success",method,route,response);
      item = statefn.getItem(name);
      var hash;
      if (response.status!=304){
        hash = md5(response.body);
        localStorage.setItem(name,response.body);
        localStorage.setItem(name + "-timestamp",new Date().toISOString());
        localStorage.setItem(name + "-md5",hash);
      } else {
        hash = localStorage.getItem(name + "-md5");
      }
      delete item['download'];
      item['md5'] = hash;
      item['messages'] = item['messages'] || [];
      item['messages'].push(msg);
      statefn.update(section,item['index'],item);
      index = statefn.reindex("servers",index,server,"url");
      statefn.addItem2("servers",index,"messages",msg);
      m.redraw();
    }).catch(function(err) {
      var response = err;
      var err = serverfn.parseMessage("danger","system.server.problem",method,route,response);
      item = statefn.getItem(name);
      delete item['download'];
      item['messages'] = item['messages'] || [];
      item['messages'].push(err);
      statefn.update(section,item['index'],item);
      index = statefn.reindex("servers",index,server,"url");
      statefn.addItem2("servers",index,"messages",err);
      m.redraw();
    });
  },
  
}

var CollectionPages = {
  "txt": {
    view: function(vnode) {
      var col = collectionfn.parseName(vnode.attrs['collection']);
      var output = false;
      switch(col['category']){
        case "interface":
          try {
            output = interfaces[col["language"] + '-' + col["country"]][col["subname"]]
          } catch(err){
            output = interfaces["default"][col["subname"]]
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

var MessageParts = {
  "list": {
    view: function(vnode) {
      return s.apply(null,vnode.attrs['location']).map(function(message,i){
        var location = Array.apply(null, vnode.attrs['location']);
        location.push(i);
        return m(MessageParts['item'],{"location":location});
      });
    }
  },
  "item": {
    view: function(vnode) {
      var msg = s.apply(null,vnode.attrs['location']);
      var type = msg['type'];
      if (msg['open']){
        return m("section.boxed", [
          m(MessageParts['close'], vnode.attrs),
          m(MessageParts['button'], vnode.attrs),
          m("h2",t(msg['t'])),
          m("p",msg['method'] + ' ' + msg['route']),
          m("form",(msg['headers']||[]).map(function (header,i){
            var key = Object.keys(header)[0];
            return[ m("label[for=header" + i + "]",key),
            m("input#header" + i + "[type=text]", {"class":"info", readonly:1,"value": header[key]})];
          })),
          msg['response']?m("pre",msg['response']):""
        ])
      } else {
        return m("section.boxed",[m(MessageParts['close'], vnode.attrs), m(MessageParts['button'], vnode.attrs)]);
      }
    }
  },
  "button": {
    view: function(vnode) {
      var msg = s.apply(null,(vnode.attrs['location']));
      var type = msg['type'];
      var text =  t("sp3","system.response.status") + " " + msg['status'] + (msg["text"]?" (" + msg['text'] + ")":"");
      return m(CommonPages["button"],{class: "message " + type, "icon": msg['open']?"compress":"expand","text":text, onclick: function(e){
        msg['open'] = !msg['open'];
        vnode.attrs['location'].push(msg);
        statefn.update.apply(null,vnode.attrs['location']);
      }});
    }
  },
  "close": {
    view: function(vnode) {
      return m(CommonPages["button"],{class: "danger onRight", icon: 'close', onclick: function(e){ 
        statefn.remove.apply(null,vnode.attrs['location']);
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
      attrs['class'] = attrs['class'] + ' sswOneD';
      return m("button", attrs,[
        vnode.attrs.icon?m("i.icon",m.trust(
          '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">' + icons[vnode.attrs.icon] + '</svg>'
        )):'',
        vnode.attrs.img?m("img.icon[src=" + vnode.attrs.img + "]"):'',
        vnode.attrs.text?(ssw.parse(vnode.attrs.text,"swu")?m.trust(ssw.svg(vnode.attrs.text)):vnode.attrs.text):''
      ])
    }
  },
  "header": {
    view: function() {
      var settings = routes.list[routes.index].indexOf("/settings")>-1;
      var server = s("server");
      var username = s("username");
      var title =  t("sp3","system.signpuddle3.title",spVersion);
      var titleShort =  t("sp3","system.signpuddle3.short",spVersion);
      return [
        m("header.four",[
          m("button", {class: "pseudo", onclick: function(){routesfn.set("/")}},
            s('country')?m("img",{border:"1",src:"data/flags/" + s('country').toLowerCase() + ".png"}):
              m("i.icon",m.trust(
                '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">' + icons['globe'] + '</svg>'
              ))
            ),
          m("button", {class: "large brand long pseudo",onclick: function(){routesfn.set("/")}}, [
            m("i.icon",m.trust(spLogo)),
            ssw.parse(title,"swu")?m.trust(ssw.svg(title)):title
          ]),
          m("button", {class: "brand short pseudo",onclick: function(){routesfn.set("/")}}, [
            m("i.icon",m.trust(spLogo)),
            ssw.parse(titleShort,"swu")?m.trust(ssw.svg(titleShort)):titleShort
          ]),
          m(CommonPages["button"],{class: "long " + (settings?"primary":"outline") , icon:"cog",text: t("sp3","settings.main.title"), onclick: function(){routesfn.set("/settings")}}),
          m(CommonPages["button"],{class: "short " + (settings?"primary":"outline") , icon:"cog", onclick: function(){routesfn.set("/settings")}}),
          username?
            [m(CommonPages["button"],{class: "long " + (!settings?"primary":"outline"), icon:"user",text:username, onclick: function(){routesfn.set("/user/profile")}}),
            m(CommonPages["button"],{class: "short " + (!settings?"primary":"outline"), icon:"user",onclick: function(){routesfn.set("/user/profile")}})]
            :[m(CommonPages["button"],{class: "long " + (!settings?"primary":"outline"), icon:"user",text:t("sp3","user.login.button"), onclick: function(){routesfn.set("/user/login")}}),
            m(CommonPages["button"],{class: "short " + (!settings?"primary":"outline"), icon:"user", onclick: function(){routesfn.set("/user/login")}})]
        ]),
        m("a#downloadlink", {style:"display: none", type:"button", charset:"utf-8"},"Download")
      ];
    }
  },
  "main" : {
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m(SpecialPages['nav'])
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
          m("h1",t("sp3",'settings.main.title')),
          m("hr"),
          m("h2",t("sp3",'settings.state.title')),
          m(SettingsPages['state']),
          m("hr"),
          m("h2",t("sp3",'settings.server.title')),
          m(SettingsPages['server']),
          m("hr"),
          m("h2",t("sp3",'settings.country.title')),
          m(SettingsPages['country']),
          m("hr"),
          m("h2",t("sp3",'settings.language.title')),
          m(SettingsPages['language'])
        ]),
        s('messages').length?m("section.boxed",m("h2",t("sp3",'settings.system.messages')),m(MessageParts['list'],{"location":["messages"]})):''
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
        m(CommonPages["button"],{class: initial_class, text:t("sp3",'system.buttons.initial'), onclick: function(){statefn.initial();}}),
        m(CommonPages["button"],{class: save_class, text:t("sp3",'system.buttons.save'), onclick: function(){statefn.save();}}),
        m(CommonPages["button"],{class: restore_class, text:t("sp3",'system.buttons.restore'), onclick: function(){statefn.restore();m.redraw();}}),
        m(CommonPages["button"],{class: forget_class, text:t("sp3",'system.buttons.forget'), onclick: function(){statefn.forget();}})
      ];
      
      return [ 
        m("form", [
          m("label[for=state]",t("sp3",'settings.state.status')),
          m("input#state[type=text]",{"class":state_class,"value":s('status'),"disabled":true}),
          m("label"),
          m("div.wide",buttons)
        ])
      ]
    }
  },
  "server": {
    view: function(vnode) {
      var server = s('server');
      var server_temp = s('server_temp');
      var connection = s('connection');
      var buttons = [];
      var server_class;
      var temp=server_temp || server;
      if (server!=temp){
        server_class="primary";
        buttons = [
          m(CommonPages["button"],{class: "warning", text:t("sp3",'system.buttons.cancel'), onclick: function(){statefn.remove("server_temp");}}),
          m(CommonPages["button"],{class: "success", text:t("sp3",'system.buttons.save'), onclick: function(){serverfn.reset();statefn.update("server",temp);}})
        ];
      } else if (connection.error){
        server_class="danger";
        buttons = [
          m(CommonPages["button"],{class: "warning", text:t("sp3",'settings.server.reset'), onclick: function(){serverfn.reset();serverfn.connect();}})
        ]
      } else if (connection.salt){
        server_class="success";
        buttons = [
          m(CommonPages["button"],{class: "outline disabled", text:t("sp3",'settings.server.connect'), onclick: function(){serverfn.connect();}}),
          m(CommonPages["button"],{class: "warning", text:t("sp3",'settings.server.disconnect'), onclick: function(){serverfn.reset();}})
        ]
      } else if (connection.salting){
        server_class="warning";
        buttons = [];
      } else {
        server_class="info";
        buttons.push(
          m(CommonPages["button"],{class: "primary", text:t("sp3",'settings.server.connect'), onclick: function(){serverfn.connect();}}),
          m(CommonPages["button"],{class: "outline disabled", text:t("sp3",'settings.server.disconnect'), onclick: function(){serverfn.reset();}})
        );
      }
      return [ 
        m("form", [
          m("label[for=server]",t("sp3",'settings.server.url')),
          m("input#server[type=text]",{"class":server_class,"value":temp,oninput: function(e){statefn.update("server_temp",e.target.value)}}),
          m("label"),
          m("div.wide",buttons)
        ])
      ]
    }
  },
  "country": {
    view: function(vnode) {
      var country = s('country');
      var country_temp = s('country_temp');
      var connection = s('connection');
      var buttons = [];
      var country_class;
      var flag_list = [];
      if (country_temp === undefined  || country==country_temp){
        if (country){
          country_class="success";
        } else {
          country_class="primary";
        }
        buttons = [
          m(CommonPages["button"],{class: "primary", text:t("sp3",'system.buttons.viewall'), onclick: function(){
              state.country_temp = '';
          }})
        ];
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
          m(CommonPages["button"],{type:"submit",disabled:!valid, class: "success", text:t("sp3",'system.buttons.save'), onclick: function(){
            if (valid){
              statefn.remove("country_temp");
              statefn.update("country",country_temp);}}
            }
          ),
          m(CommonPages["button"],{class: "warning", text:t("sp3",'system.buttons.cancel'), onclick: function(){
            statefn.remove("country_temp");
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
          s('country')?m("img",{border:1,src:"data/flags/" + s('country').toLowerCase() + ".png"}):
            m("i.icon",m.trust(
              '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">' + icons['globe'] + '</svg>'
            ))
          ,
          m("input#country_temp[type=text]",{"class":country_class,"value":(country_temp===undefined)?country:country_temp,autocomplete:"off",oninput: function(e){
            var val = e.target.value;
            var match = val.match(/[a-zA-Z]{1,2}/);
            val = match?match[0].toUpperCase():'';
            if (val){
              state.country_temp = val;
            } else {
              state.country_temp = '';
            }
          }}),
          m("label"),
          m("div.wide",buttons)
        ]),
        flag_list.map(function(val,i){
          return m(CommonPages["button"],{class: "outline", text:val, img:"data/flags/" + val.toLowerCase() + ".png",onclick: function(){
            statefn.remove("country_temp");
            statefn.update("country",val);
          }})
        })
      ]
    }
  },
  "language": {
    view: function(vnode) {
      var language = s('language');
      var language_temp = s('language_temp');
      var buttons = [];
      var language_class;
      var language_list = [];
      if (language_temp === undefined  || language==language_temp){
        if (language){
          language_class="success";
        } else {
          language_class="primary";
        }
        buttons = [
          m(CommonPages["button"],{class: "primary", text:t("sp3",'system.buttons.viewall'), onclick: function(){
              state.language_temp = '';
          }})
        ];
        if (language==language_temp) {
          language_list = Object.keys(world.language);
        }
      } else {
        var valid = world.language[language_temp] || (language_temp=="");
        if (world.language[language_temp]){
          language_list = [language_temp];
        } else {
          var len = language_temp.length;
          if (len==1){
            language_list = Object.keys(world.language).filter(function(val,i){
              return val[0] == language_temp;
            })
          } else {
            language_list = Object.keys(world.language);
          }
        }
        buttons = [
          m(CommonPages["button"],{type:"submit",disabled:!valid, class: "success", text:t("sp3",'system.buttons.save'), onclick: function(){
            if (valid){
              statefn.remove("language_temp");
              statefn.update("language",language_temp);}}
            }
          ),
          m(CommonPages["button"],{class: "warning", text:t("sp3",'system.buttons.cancel'), onclick: function(){
            statefn.remove("language_temp");
          }})
        ];
        if (valid){
          language_class="primary";
        } else {
          language_class="warning";
        }
      }
      return [ 
        m("form", [
          s('country')?world.country[s('country')].language.map( function (key,i){
            if (world.language[key].sign){
              return [
                m("label[for=language]",key),
                m(CommonPages["button"],{class: s('language')==key?"primary":"outline", text:world.language[key].name,onclick: function(){
                  statefn.update("language",key);
                }})
              ]
            }

          }):'',
          s('country')?world.country[s('country')].language.map( function (key,i){

          }):'',
          s('language')?m("p",world.language[language].name):"",
          m("input#language_temp[type=text]",{"class":language_class,"value":(language_temp===undefined)?language:language_temp,autocomplete:"off",oninput: function(e){
            var val = e.target.value;
//            var match = val.match(/[a-zA-Z]{1,2}/);
//            val = match?match[0].toUpperCase():'';
            if (val){
              state.language_temp = val;
            } else {
              state.language_temp = '';
            }
          }}),
          m("label"),
          m("div.wide",buttons)
        ]),
        language_list.map(function(val,i){
          return m(CommonPages["button"],{class: "outline", text:val, text:world.language[val].name,onclick: function(){
            statefn.remove("language_temp");
            statefn.update("language",val);
          }})
        })
      ]
    }
  },
  "interface": {
    view: function(vnode) {
      var interface = s('interface');
      var interface_temp = s('interface_temp');
      var buttons = [];
      var interface_class;
      var temp=interface_temp || interface;
      if (interface!=temp){
        interface_class="primary";
        buttons = [
          m(CommonPages["button"],{class: "warning", text:t("sp3",'system.buttons.cancel'), onclick: function(){statefn.remove("interface_temp");}}),
          m(CommonPages["button"],{class: "success", text:t("sp3",'system.buttons.save'), onclick: function(){interfacefn.reset();statefn.update("interface",temp);}})
        ];
      } else {
        interface_class="info";
        buttons.push(
          m(CommonPages["button"],{class: "primary", text:t("sp3",'settings.interface.connect'), onclick: function(){interfacefn.connect();}}),
        );
      }
      return [ 
        m("form", [
          m("label[for=interface]",t("sp3",'settings.interface.title')),
          m("input#interface[type=text]",{"class":interface_class,"value":temp,oninput: function(e){statefn.update("interface_temp",e.target.value)}}),
          m("label"),
          m("div.wide",buttons)
        ])
      ]
    }
  }
}  //<-END SettingsPages object

/*
      return m("nav", messages.map(function(message){var parts = message.split('.');  return parts[0];}))

/*
        m(InterfaceTabs,{"q1s":q1s}),
        m("nav", Object.keys(q1s).map(function(part){return parts;}))

/*
      var q1s = {};
      for (key in messages){
        var parts = key.split('.');
        if (q1s[parts[0]]){
          q1s[parts[0]].push(parts[1]);
        } else {
          q1s[parts[0]] = [parts[1]];
        }
      }
*/


var UserSections = {};
var UserPages = {
  "login": {
    view: function(vnode) {
      serverfn.connect();
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("sp3","user.login.title")),
          m("form", [
            m("label[for=username]",t("sp3",'user.profile.username')),
            m("input#username[type=text]", {value: s('user')}),
            m("label[for=password]",t("sp3",'user.profile.password')),
            m("input#password[type=password]"),
            m("label"),
            m("div.wide", 
              s('error')?
                [
                  m(CommonPages["button"],{class: "danger", text:t("sp3",'system.buttons.error'), onclick: function(){ statefn.addItem2("servers",s('server'),"messages",server['error']);}}),
                  m(CommonPages["button"],{class: "warning", text:t("sp3",'settings.server.reset'), onclick: function(){ serverfn.reset(s('server'));}})
                ]
                :[
                  m(CommonPages["button"],{class: "primary", disabled: !s('user'), onclick: serverfn.login, text:t("sp3",'user.login.button')}),
                  m(CommonPages["button"],{class: "warning", disabled: !s('user'), onclick: function(){routesfn.set("/user/reset");}, text:t("sp3",'user.reset.button')}),
                  m(CommonPages["button"],{class: "outline", disabled: !s('user'), onclick: function(){routesfn.set("/user/register");}, text:t("sp3",'user.register.button')}),
                ]
            ),
          ])
        )
      ];
    }
  },
  "register": {
    view: function(vnode) {
      var server = s("servers",s('server'));
      serverfn.salt(s('server'));
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("sp3","user.register.title")),
          m("form", [
            m("label[for=server]",server['name']),
            m("input#server" + i + "[type=text]", {"class":i!=s('server')?'info':(s('user')?'primary':(s('user')?"success":"warning")), "readonly":1,"value": server['url']}),
            m("label[for=username]",t("sp3",'user.profile.username')),
            m("input#username[type=text]", {value: s('user')}),
            m("label[for=email]",t("sp3",'user.profile.email')),
            m("input#email[type=text]", {value: server['email']}),
            m("label[for=password]",t("sp3",'user.profile.password')),
            m("input#password[type=password]"),
            m("label"),
            m(CommonPages["button"],{class: "primary", disabled: !s('user'), onclick: registerServer, text:t("sp3",'user.register.button')})
          ])
        )
      ];
    }
  },
  "reset": {
    view: function(vnode) {
      var server = s("servers",s('server'));
      serverfn.salt(s('server'));
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("sp3","user.reset.title")),
          m("form", [
            m("label[for=username]",t("sp3",'user.profile.username')),
            m("input#username[type=text]", { value: s('user')}),
            m("label[for=email]",t("sp3",'user.profile.email')),
            m("input#email[type=text]"),
            m("label"),
            m(CommonPages["button"],{class: "primary", disabled: !s('user'), onclick: resetPasswordServer, text:t("sp3",'user.reset.button')})
          ])
        )
      ];
    }
  },
  "profile": {
    view: function(vnode) {
      return [
        m(CommonPages['header']),
        m("section.boxed",
          m("h2", t("sp3","user.profile.title")),
          m("form", [
            m("label[for=username]",t("sp3",'user.profile.username')),
            m("input#username[type=text]", {value: s('user')}),
            m("label"),
            m(CommonPages["button"],{class: "primary", onclick: function(){}, text:t("sp3",'user.profile.button')}),
          ])
        )
      ];
    }
  }
}

var CountryPages = {
  "country": {
    view: function(vnode) {
      return [
        m(CommonPages['header'])
      ];
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
//    <label for="message">MessageParts</label>
//    <textarea id="message" cols="30" rows="10" placeholder="MessageParts"></textarea>
//    <input type="submit" value="Submit">
//  </form>
//</div>


m.route(document.body, routes.default, {
  "/": CommonPages['main'],
  "/settings": SettingsPages['main'],
  "/collection/txt/:collection": CollectionPages['txt'],
  "/interface/:name": InterfacePages['main'],
  "/interface/:name/:q1": InterfacePages['q1'],
  "/interface/:name/:q1/:q2": InterfacePages['q2'],
  "/user/login": UserPages['login'],
  "/user/profile": UserPages['profile'],
  "/user/register": UserPages['register'],
  "/user/reset": UserPages['reset'],
  "/country/:cc": CountryPages['country'],
  "/special": SpecialPages['main'],
  "/special/icons": SpecialPages['icons'],
  "/special/style": SpecialPages['style'],
  "/special/test": SpecialPages['test'],
  "/special/buttons": SpecialPages['buttons'],
})
