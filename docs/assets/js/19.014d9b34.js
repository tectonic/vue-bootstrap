(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{499:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"multicheckbox"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#multicheckbox"}},[t._v("#")]),t._v(" Multicheckbox")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#demo"}},[t._v("Demo")])]),s("li",[s("a",{attrs:{href:"#props"}},[t._v("Props")])]),s("li",[s("a",{attrs:{href:"#events"}},[t._v("Events")])])])]),s("p"),t._v(" "),s("h2",{attrs:{id:"demo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[t._v("#")]),t._v(" Demo")]),t._v(" "),s("multicheckbox-demo"),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("multicheckbox")]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v("name")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("stats"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v(":options")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("players"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v(":selected-options")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("[1, 2]"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v(":subsets")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("[\n    { id: "),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("steals"),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", name: "),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("Steals"),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(" },\n    { id: "),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("rebounds"),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", name: "),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("Rebounds"),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(" },\n    { id: "),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("points"),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", name: "),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("Points"),s("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(" }\n  ]"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{attrs:{class:"token attr-name"}},[t._v(":selected-subset-options")]),s("span",{attrs:{class:"token attr-value"}},[s("span",{attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{\n    steals: [],\n    rebounds: [1],\n    points: [1, 2]\n  }"),s("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),s("h2",{attrs:{id:"props"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[t._v("#")]),t._v(" Props")]),t._v(" "),s("prop",{attrs:{name:"name",type:"String","default-value":"multicheckbox"}}),t._v(" "),s("prop",{attrs:{name:"filter",type:"Boolean","default-value":"true"}},[t._v("\n  Show the keyword filter?\n")]),t._v(" "),s("prop",{attrs:{name:"placeholder",type:"String","default-value":"Filter list"}}),t._v(" "),s("prop",{attrs:{name:"select-all-label",type:"String","default-value":"Select all"}}),t._v(" "),s("prop",{attrs:{name:"options",type:"Array","default-value":"[]"}},[t._v("\n  Example: "),s("code",[t._v("[{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }]")])]),t._v(" "),s("prop",{attrs:{name:"selected-options",type:"Array","default-value":"[]"}},[t._v("\n  Example: "),s("code",[t._v("[1, 2]")])]),t._v(" "),s("prop",{attrs:{name:"subset-name",type:"String","default-value":"subset"}}),t._v(" "),s("prop",{attrs:{name:"subsets",type:"Array","default-value":"[]"}},[t._v("\n  Example:"),s("br"),t._v(" "),s("code",[t._v("[{ id: 'steals', name: 'Steals' }, { id: 'rebounds', name: 'Rebounds' }, { id: 'points', name: 'Points' }]")])]),t._v(" "),s("prop",{attrs:{name:"selected-subset-options",type:"Array","default-value":"[]"}},[t._v("\n  Example:"),s("br"),t._v(" "),s("code",[t._v("[{ id: 'steals', name: 'Steals' }, { id: 'rebounds', name: 'Rebounds' }, { id: 'points', name: 'Points' }]")])]),t._v(" "),s("prop",{attrs:{name:"disabled",type:"Boolean","default-value":"false"}}),t._v(" "),s("h2",{attrs:{id:"events"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("#")]),t._v(" Events")]),t._v(" "),s("event",{attrs:{name:"selected",parameters:"Ids (Array), Selected subset ids (Array)"}},[t._v("\n  Emitted when a selection is made.\n")])],1)}),[],!1,null,null,null);a.default=e.exports}}]);