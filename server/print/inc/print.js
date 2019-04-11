
function t(qqq){
  if (interface=="qqq"){
    return qqq;
  }
  if (tset.hasOwnProperty(qqq)){
    return tset[qqq];
  }
  return qqq;
}

// model
var state = {
  title: t("print.main.title"),
  format: "US Letter",
  formats: ["A4","US Letter"],
  orientation: "Portrait",
  orientations: ["Landscape","Portrait"],
  ids: ids,
  entries: entries,
  dragging: null,
  dragattrs: {},
  showing: showing,
  show: 1,
  select: function(){
    Object.keys(state.entries).map(function(id){
      delete state.entries[id]['skip'];
    })
  },
  deselect: function(){
    Object.keys(state.entries).map(function(id){
      state.entries[id]['skip'] = 1;
    })
  },
  shuffle: function() {
    var array = state.ids;
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  },
  sort: function(prop) {
    var array = state.ids;
    array.sort(function(a, b){
      if (state.entries[a][prop] < state.entries[b][prop]) return -1; 
      if (state.entries[a][prop] > state.entries[b][prop]) return 1 ;
      return 0;
    })
  },
  colvalues: [
    {title: t("print.col.spoken"), value: "term"},
    {title: t("print.col.signwriting"), value: "sign"},
    {title: t("print.col.gesture"), value: "gesture"},
    {title: t("print.col.picture"), value: "picture"},
    {title: t("print.col.visual"), value: "visual"},
    {title: t("print.col.image"), value: "image"},
    {title: t("print.col.empty"), value: "empty"},
    {title: t("print.col.wide"), value: "wide"},
  ],
  columns: 0,
  coldefs: [],
  setcolumns: function(num){
    state.columns=num;
    if(num>state.coldefs.length){
      for(i=state.coldefs.length;i<=num;i++){
        state.coldefs.push({title: t("print.col.title") + " " + (i+1),value:""});
      }
    }
    if(num<state.coldefs.length){
      state.coldefs = state.coldefs.slice(0,num);
    }
  },
}
state.setcolumns(3);

function getOffset( el ) {
  var offset = el?el.getBoundingClientRect():{top:0,left:0};
  return { top : offset.top + (window.pageYOffset || window.document.documentElement.scrollTop), left : offset.left + (window.pageXOffset || window.document.documentElement.scrollLeft) }
}
function inside(px,py,x0,x1,y0,y1){
  if (!(px > x1 || px < x0 || py > y1 || py < y0 )) {
    return true;
  } else {
    return false;
  }
}
function overlap(el1, el2){
  var o1 = getOffset( el1 );
  o1.width = el1.offsetWidth;
  o1.height = el1.offsetHeight;
  var o2 = getOffset( el2 );
  o2.width = el2.offsetWidth;
  o2.height = el2.offsetHeight;
  if (inside(o2.left,o2.top,o1.left,o1.left+o1.width,o1.top,o1.top+o1.height)) return 1;
  if (inside(o2.left,o2.top+o2.height/2,o1.left,o1.left+o1.width,o1.top,o1.top+o1.height)) return 1;
  if (inside(o2.left,o2.top+o2.height,o1.left,o1.left+o1.width,o1.top,o1.top+o1.height)) return 1;
  if (inside(o2.left+o2.width,o2.top,o1.left,o1.left+o1.width,o1.top,o1.top+o1.height)) return -1;
  if (inside(o2.left+o2.width,o2.top+o2.height/2,o1.left,o1.left+o1.width,o1.top,o1.top+o1.height)) return -1;
  if (inside(o2.left+o2.width,o2.top+o2.height,o1.left,o1.left+o1.width,o1.top,o1.top+o1.height)) return -1;
  return 0;
}

function entryMouseIn(e){
  var el = document.getElementById("dragger");
  if (el.classList.contains("is-dragging")) return;
  state.dragging = e.target.tagName.toUpperCase()=="SVG"?e.target.parentNode:e.target;
  el.style.width = "0px";
  el.style.height = "0px";
  el.style.top = "0px";
  el.style.left = "0px";
  var d = getOffset(el);
  var o = getOffset(state.dragging);
  o.left = o.left-d.left;
  o.top = o.top-d.top;
  o.width = state.dragging.offsetWidth -4;
  o.height = state.dragging.offsetHeight -4;
  el.style.width=o.width +"px";
  el.style.height=o.height + "px";
  el.style.top = o.top + "px";
  el.style.left = o.left + "px";
}
function draggerMouseOut(){
  var el = document.getElementById("dragger");
  if (el.classList.contains("is-dragging")) return;
  state.dragging=null;
  el.style.width = "0px";
  el.style.height = "0px";
  el.style.top = "0px";
  el.style.left = "0px";
}

function entryDragMove(draggie,e,p){
  state.dragging.style.left = draggie.dragPoint.x + 'px';
  state.dragging.style.top = draggie.dragPoint.y + 'px';
  state.dragging.style.zIndex = "10";
}
function entryDragEnd(draggie,e,p){
  state.dragging.style.zIndex = "0";
  var list = [].slice.call(document.getElementsByClassName("entry"));
  var offsets = list.map(function(item){
    return item.offsetLeft + ',' + item.offsetTop;
  });
  var offset = state.dragging.offsetLeft + ',' + state.dragging.offsetTop;
  var origin = offsets.indexOf(offset);
  var id = state.ids[origin];
  var x0 = draggie.dragPoint.x;
  var y0 = draggie.dragPoint.y;
  if (Math.abs(x0+y0)<2){
    //if (!state.show) return;
    if (state.entries[id].hasOwnProperty('skip')){
      delete state.entries[id]['skip'];
    } else {
      state.entries[id]['skip'] = 1;
    }

    m.redraw();
  } else {
    dest = -1;
    var over;
    for (i=0;i<list.length;i++){
      if (i!=origin){
        over =  overlap(list[i],state.dragging);
        if (over==1) {
          dest = i;
          if (dest<origin) dest++;
          break;
        }
        if (over==-1) {
          dest = i -1;
          if (dest<origin) dest++;
          break;
        }
      }
    }
    draggie.element.style.left = (parseInt(draggie.element.style.left) - draggie.dragPoint.x) + 'px';
    draggie.element.style.top = (parseInt(draggie.element.style.top) - draggie.dragPoint.y) + 'px';
    state.dragging.style.left = (parseInt(state.dragging.style.left) - draggie.dragPoint.x) + 'px';
    state.dragging.style.top = (parseInt(state.dragging.style.top) - draggie.dragPoint.y) + 'px';
    if (dest > -1){
      state.ids.splice(dest, 0, state.ids.splice(origin, 1)[0]);
      m.redraw();
    }
  } 
}

// view Entry
var Entry = {
  view: function(vnode) {
    return m('.entry',{class: vnode.attrs.class,onmouseover: vnode.attrs.onmouseover},vnode.attrs.text);
    //return m('.entry', vnode.attrs, vnode.attrs.text);
  }
}

// view Dragger
var Dragger = {
  oncreate: function(vnode) {
    var draggie = new Draggabilly(vnode.dom);
    draggie.on( 'dragMove', entryDragMove);
    draggie.on( 'dragEnd', entryDragEnd);
  },
  view: function(vnode) {
    if (state.dragging){
      return m('#dragger.active', {onmouseleave: draggerMouseOut});
    } else {
      return m('#dragger');
    }
  }
}

// view Printing
var Printing = {
  view: function(vnode) {
    var view_ids = state.ids.filter(function(id){ return !state.entries[id].hasOwnProperty('skip'); }).join(',');
    var view_cols = state.coldefs.map(function(item){return item.value;});
    var view_cols_bool = view_cols.filter(function(val){return !val;}).length==0;
    //var ids = state.show?state.ids:state.ids.filter(function(id){return !state.entries[id]['skip'];});
    return [
      m("header.header", m("h1", t("print.main.title"))),
      m(".words", [
        t("print.main.view") + " ", 
        m("button",{class:!state.showing?"active":"",onclick:function(){state.showing="";}},t("print.col.spoken")),
        m("button",{class:state.showing?"active":"", onclick:function(){state.showing='sign';}},t("print.col.signwriting")),
        m("br"),
        m("br"),
        t("print.show.label") + " ", 
        m("button",{class:state.show?"active":"",onclick:function(){draggerMouseOut();state.show=1;}},t("print.show.all")),
        m("button",{class:!state.show?"active":"",onclick:function(){draggerMouseOut();state.show=0;}},t("print.show.selected")),
        m("br"),
        m("br"),
        t("print.select.label") + " ", 
        m("button",{onclick:function(){draggerMouseOut();state.select();}},t("print.select.all")),
        m("button",{onclick:function(){draggerMouseOut();state.deselect();}},t("print.select.none")),
        m("h2", state.showing=='sign'?t("print.list.signwriting"):t("print.list.spoken")),
        m("ul", [
          m("li",t("print.click.remove")),
          m("li",t("print.drag.reorder")),
        ]),
        m("button",{onclick:state.shuffle},t("print.sort.random")),
        m("button",{onclick:function(){state.sort("lower")}},t("print.sort.spoken")),
        m("button",{onclick:function(){state.sort("sign")}},t("print.sort.signwriting")),
        m("br"),
        m("br"),
        state.ids.map(function(id){
          var entry = state.entries[id];
          return state.show || !entry['skip']?m(Entry,{key: id, class: entry.hasOwnProperty('skip')?'skip':"",text:state.showing=='sign'?m.trust(ssw.svg(entry.sign)):entry.term,onmouseover:entryMouseIn}):m(Entry,{key: id, class:"hidden"});
        }),
      ]),
      m("br"),
      m("hr"),
      m("h2",t("print.layout.title")),
      m("p",[
        t("print.label.title") + " ",
        m("input[type='text']",{name:"title",value:state.title,oninput: m.withAttr('value',function(value){state.title=value;})})
      ]),
      m("p",[
        t("print.num.col") + " ",
        [1,2,3,4,5].map(function(num){
          return m("button.col",{class:num==state.columns?"selected":"",onclick:function(){state.setcolumns(num)}},num);
        }),
        m("br"),
        state.coldefs.map(function(col){
          var i = state.coldefs.indexOf(col);
          return m("form",[
            m("input[type='text']",{name:"col"+i,value:col.title,oninput: m.withAttr('value',function(value){state.coldefs[i].title=value;})}),
            m("br"),
            state.colvalues.map(function(item){
              return [
                m("input[type='radio']",{name:"radio"+i,value:item.value,checked:item.value==col.value,onchange: function(){state.coldefs[i].value=item.value;state.coldefs[i].title=item.title;}}),
                item.title,
                m("br")
              ]; 
            }),
          ]);
        }),

      ]),
      m("hr"),
      m("h2",t("print.settings.title")),
      m("p",[
        t("print.format.label") + " ",
        m("select", {onchange: m.withAttr('value',function(value){state.format=value})}, state.formats.map(function(item){
          return m("option", {value:item,selected:item==state.format},t('print.format.' + item.toLowerCase().replace(' ',''))); 
        }))
      ]), 
      m("p",[
        t("print.orient.label") + " ",
        m("select", {onchange: m.withAttr('value',function(value){state.orientation=value})}, state.orientations.map(function(item){
          return m("option", {value:item,selected:item==state.orientation},t('print.orient.' + item.toLowerCase())); 
        }))
      ]),
      m("hr"),
      (view_ids && view_cols_bool)?
        m("div", [
          m("h2",t("print.to.title")),
          m("a",{target:"printframe",href:"compile.php?" + m.buildQueryString({
            dictionary:dictionary,
            ids: view_ids,
            output:'pdf',
            title: state.title,
            titles: state.coldefs.map(function(item){return item.title;}),
            cols: view_cols,
            format: state.format,
            orientation: state.orientation
          })}, m("button[type='button']",t("print.to.pdf"))),
          m('span',' '),
          m("a",{target:"printframe",href:"compile.php?" + m.buildQueryString({
            dictionary:dictionary,
            ids: view_ids,
            output:'html',
            title: state.title,
            titles: state.coldefs.map(function(item){return item.title;}),
            cols: view_cols,
            format: state.format,
            orientation: state.orientation
          })}, m("button[type='button']",t("print.to.html")))
        ]):
        m("div", [
          m("h2",t("print.not.ready")),
          m("ul", [
            view_ids?"":m("li",state.showing=='sign'?t("print.not.signwriting"):t("print.not.spoken")),
            view_cols_bool?"":m("li",t("print.not.allcol"))
          ])
        ]),
      m("br"),
      m("iframe",{name:"printframe"}),
      m("hr"),
      m("p.thanks",m.trust(t("print.thanks.message"))),
      m("br"),
      m(Dragger),
    ]
  }
}

m.mount(document.getElementById("printing"), Printing);

