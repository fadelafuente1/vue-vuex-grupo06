webpackJsonp([1],{"1/oy":function(e,t){},"4+hh":function(e,t){},"9M+g":function(e,t){},ApXf:function(e,t){},GfHa:function(e,t){},Id91:function(e,t){},Jmt5:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("7+uW"),s={render:function(){var e=this.$createElement;return(this._self._c||e)("router-view")},staticRenderFns:[]};var i=a("VU/8")({name:"App"},s,!1,function(e){a("lJSF")},null,null).exports,n=a("/ocq"),c=a("M4fF"),o=a.n(c),l={name:"Table",data:()=>({baseCurrencySelected:null,shiftCurrencySelected:null,showNavigation:!1,subrowShow:null}),async mounted(){await this.getSelectedCurrencies(),await this.getCurrency()},methods:{swipRightHandler(){this.onClickIncrease()},swipeLeftHandler(){this.onClickDecrease()},onClickRow(e){this.subrowShow=this.subrowShow?this.subrowShow=null:this.$store.state.numbersToTable[e].subrowNumbers},async onClickExhange(){await this.$store.dispatch("exchangeCurrenciesAndLoadNumberToTable"),this.baseCurrencySelected=this.$store.state.baseCurrency,this.shiftCurrencySelected=this.$store.state.shiftCurrency,this.showNavigation=!1},async onClickIncrease(){await this.$store.dispatch("increasePowerOf10AndLoadNumberToTable"),this.showNavigation=!1},async onClickDecrease(){this.$store.dispatch("decreasePowerOf10AndLoadNumberToTable"),this.showNavigation=!1},async onChangeBaseCurrency(e){await this.$store.commit("updateBaseCurrency",e),await this.getCurrency()},async onChangeShiftComponent(e){await this.$store.dispatch("updateShiftCurrencyAndLoadNumberToTable",e)},getSelectedCurrencies(){this.baseCurrencySelected=this.$store.state.baseCurrency,this.shiftCurrencySelected=this.$store.state.shiftCurrency},getCurrency(){if(!this.$store.state.calculatedCurrencies[this.$store.state.baseCurrency])return this.$store.dispatch("getCurrencyFromApiAndUpdateEverything")}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"page-container md-layout-column",attrs:{id:"currency-table"}},[a("v-touch",{on:{swipeleft:e.swipeLeftHandler,swiperight:e.swipRightHandler}},[a("md-table",{attrs:{"md-card":""}},[a("md-drawer",{attrs:{"md-active":e.showNavigation},on:{"update:mdActive":function(t){e.showNavigation=t}}},[a("md-toolbar",{staticClass:"md-transparent",attrs:{"md-elevation":"0"}},[a("span",{staticClass:"md-title"},[e._v("Vue Grupo 06")])]),e._v(" "),a("md-list",[a("md-list-item",[a("PlusIcon"),e._v(" "),a("span",{staticClass:"md-list-item-text",on:{click:function(t){e.onClickIncrease()}}},[e._v("Aumentar x10")])],1),e._v(" "),a("md-list-item",[a("MinusIcon"),e._v(" "),a("span",{staticClass:"md-list-item-text",on:{click:function(t){e.onClickDecrease()}}},[e._v("Disminuir x10")])],1),e._v(" "),a("md-list-item",[a("SwapIcon"),e._v(" "),a("span",{staticClass:"md-list-item-text",on:{click:function(t){e.onClickExhange()}}},[e._v("Intercambiar monedas")])],1)],1)],1),e._v(" "),a("md-table-row",{attrs:{id:"table-header"}},[a("md-table-cell",{staticClass:"text-center"},[a("span",{staticClass:"menu-button",on:{click:function(t){e.showNavigation=!e.showNavigation}}},[a("MenuIcon")],1),e._v(" "),a("b-form-select",{staticClass:"mb-3",attrs:{id:"base-select",options:e.$store.state.BaseCurrencyList},on:{change:function(t){e.onChangeBaseCurrency(t)}},model:{value:e.baseCurrencySelected,callback:function(t){e.baseCurrencySelected=t},expression:"baseCurrencySelected"}})],1),e._v(" "),a("md-table-cell",{staticClass:"text-center"},[a("b-form-select",{staticClass:"mb-3",attrs:{id:"shift-select",options:e.$store.state.BaseCurrencyList},on:{change:function(t){e.onChangeShiftComponent(t)}},model:{value:e.shiftCurrencySelected,callback:function(t){e.shiftCurrencySelected=t},expression:"shiftCurrencySelected"}})],1)],1),e._v(" "),e._l(e.$store.state.numbersToTable,function(t,r){return e.subrowShow?e._e():[a("md-table-row",{key:t.baseNumber,staticClass:"currency-row table-row",on:{click:function(t){e.onClickRow(r)}}},[a("md-table-cell",{staticClass:"base-number"},[e._v(e._s(t.baseNumber))]),e._v(" "),a("md-table-cell",{staticClass:"shift-number"},[e._v(e._s(t.shiftNumber))])],1)]}),e._v(" "),e._l(e.subrowShow,function(t,r){return e.subrowShow!==[]?[a("md-table-row",{key:t.baseNumber,on:{click:function(t){e.onClickRow(0)}}},[a("md-table-cell",{staticClass:"currency-subrow base-number",class:{baseItem:0===r||10==r}},[e._v(e._s(t.baseNumber))]),e._v(" "),a("md-table-cell",{staticClass:"currency-subrow shift-number"},[e._v(e._s(t.shiftNumber))])],1)]:e._e()})],2)],1)],1)])},staticRenderFns:[]};var d=a("VU/8")(l,u,!1,function(e){a("ApXf"),a("S4LO")},"data-v-29cc774d",null).exports;r.default.use(n.a);var m=new n.a({mode:"history",routes:[{path:"/",name:"Table",component:d}]}),h=a("e6fC"),b=(a("Jmt5"),a("9M+g"),a("NYxO")),C=a("mtWM"),f=a.n(C),p={getCurrency:e=>(()=>f.a.create({baseURL:"https://api.exchangeratesapi.io/",withCredentials:!1,headers:{Accept:"application/json","Content-Type":"application/json"}}))().get(`/latest?base=${e}`)};r.default.use(b.a);var y=new b.a.Store({state:{baseCurrency:"USD",shiftCurrency:"EUR",currentShiftCurrencyAmount:null,selectedNumber:null,firstTableNumber:1,powerOf10Number:1,calculatedCurrencies:{},BaseCurrencyList:[],numbersToTable:[]},actions:{getCurrencyFromApiAndUpdateEverything:async e=>p.getCurrency(e.state.baseCurrency).then(async t=>{console.log("success");const a=t.data.rates;await e.commit("LoadBaseCurrencyList",a),await e.commit("addCurrencyToCurrencyList",e.state.baseCurrency),await e.commit("addCalculatedCurrency",a),await e.commit("loadCurrentShiftCurrencyAmount"),await e.commit("loadNumbersToTable"),await e.commit("addSubrowToNumbersToTable")},e=>{console.log(e)}),async increasePowerOf10AndLoadNumberToTable(e){await e.commit("increasePowerOf10"),await e.commit("loadNumbersToTable"),await e.commit("addSubrowToNumbersToTable")},async decreasePowerOf10AndLoadNumberToTable(e){await e.commit("decreasePowerOf10"),await e.commit("loadNumbersToTable"),await e.commit("addSubrowToNumbersToTable")},async exchangeCurrenciesAndLoadNumberToTable(e){if(await e.commit("exchangeCurrencies"),!e.state.calculatedCurrencies[e.state.baseCurrency])return e.dispatch("getCurrencyFromApiAndUpdateEverything");await e.commit("loadCurrentShiftCurrencyAmount"),await e.commit("loadNumbersToTable"),await e.commit("addSubrowToNumbersToTable")},async updateShiftCurrencyAndLoadNumberToTable(e,t){await e.commit("updateshiftCurrency",t),await e.commit("loadCurrentShiftCurrencyAmount"),await e.commit("loadNumbersToTable"),await e.commit("addSubrowToNumbersToTable")}},mutations:{updateBaseCurrency(e,t){e.baseCurrency=t},updateshiftCurrency(e,t){e.shiftCurrency=t},exchangeCurrencies(e){const t=e.baseCurrency,a=e.shiftCurrency;e.baseCurrency=a,e.shiftCurrency=t},LoadBaseCurrencyList(e,t){if(!e.currentShiftCurrencyAmount){const a=Object.keys(t);e.BaseCurrencyList=a}},addCurrencyToCurrencyList(e,t){e.BaseCurrencyList.includes(e.baseCurrency)||e.BaseCurrencyList.push(t)},addCalculatedCurrency(e,t){e.calculatedCurrencies&&e.calculatedCurrencies[e.baseCurrency]||(e.calculatedCurrencies[e.baseCurrency]=t)},increasePowerOf10(e){e.powerOf10Number+=1},decreasePowerOf10(e){e.powerOf10Number-=1},loadCurrentShiftCurrencyAmount(e){e.currentShiftCurrencyAmount=e.calculatedCurrencies[e.baseCurrency][e.shiftCurrency]},loadNumbersToTable(e){e.numbersToTable=[];for(let t of o.a.range(10)){const a={},r=(t+1)*e.firstTableNumber*Math.pow(10,e.powerOf10Number),s=r*e.currentShiftCurrencyAmount;a.baseNumber=r,a.shiftNumber=s.toFixed(2),e.numbersToTable.push(a)}},addSubrowToNumbersToTable(e){e.numbersToTable.forEach(t=>{const a=[];a.push({baseNumber:t.baseNumber,shiftNumber:t.shiftNumber});for(let r of o.a.range(10)){const s={},i=r+1,n=e.powerOf10Number-1,c=t.baseNumber+i*Math.pow(10,n),o=c*e.currentShiftCurrencyAmount;s.baseNumber=c,s.shiftNumber=o.toFixed(2),a.push(s)}t.clickead=!1,t.subrowNumbers=a})}}}),w=a("EqLo"),v=(a("4+hh"),a("siN1"),{name:"menu-icon",props:{title:{type:String,default:"Menu icon"},decorative:{type:Boolean,default:!1},fillColor:{type:String}}}),g={render:function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"material-design-icon menu-icon",attrs:{"aria-hidden":this.decorative,role:"img","aria-label":this.title}},[t("svg",{staticClass:"material-design-icon__svg",attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:this.fillColor}},[t("title",[this._v(this._s(this.title))]),this._v(" "),t("path",{attrs:{d:"M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"}})])])},staticRenderFns:[]},T=a("VU/8")(v,g,!1,null,null,null).exports,_={name:"swap-horizontal-variant-icon",props:{title:{type:String,default:"Swap horizontal variant icon"},decorative:{type:Boolean,default:!1},fillColor:{type:String}}},N={render:function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"material-design-icon swap-horizontal-variant-icon",attrs:{"aria-hidden":this.decorative,role:"img","aria-label":this.title}},[t("svg",{staticClass:"material-design-icon__svg",attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:this.fillColor}},[t("title",[this._v(this._s(this.title))]),this._v(" "),t("path",{attrs:{d:"M4,6L8,10V7H16C17.1,7 18,7.9 18,9C18,10.1 17.1,11 16,11H8C5.79,11 4,12.79 4,15C4,17.21 5.79,19 8,19H16V22L20,18L16,14V17H8C6.9,17 6,16.1 6,15C6,13.9 6.9,13 8,13H16C18.21,13 20,11.21 20,9C20,6.79 18.21,5 16,5H8V2L4,6Z"}})])])},staticRenderFns:[]},S=a("VU/8")(_,N,!1,null,null,null).exports,A={name:"plus-circle-icon",props:{title:{type:String,default:"Plus circle icon"},decorative:{type:Boolean,default:!1},fillColor:{type:String}}},L={render:function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"material-design-icon plus-circle-icon",attrs:{"aria-hidden":this.decorative,role:"img","aria-label":this.title}},[t("svg",{staticClass:"material-design-icon__svg",attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:this.fillColor}},[t("title",[this._v(this._s(this.title))]),this._v(" "),t("path",{attrs:{d:"M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z"}})])])},staticRenderFns:[]},M=a("VU/8")(A,L,!1,null,null,null).exports,x={name:"minus-circle-icon",props:{title:{type:String,default:"Minus circle icon"},decorative:{type:Boolean,default:!1},fillColor:{type:String}}},H={render:function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"material-design-icon minus-circle-icon",attrs:{"aria-hidden":this.decorative,role:"img","aria-label":this.title}},[t("svg",{staticClass:"material-design-icon__svg",attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:this.fillColor}},[t("title",[this._v(this._s(this.title))]),this._v(" "),t("path",{attrs:{d:"M17,13H7V11H17M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z"}})])])},staticRenderFns:[]},k=a("VU/8")(x,H,!1,null,null,null).exports,V=a("I0MY"),$=a.n(V);r.default.use(w.MdTable),r.default.use(w.MdContent),r.default.use(w.MdCard),r.default.use(w.MdButton),r.default.use(w.MdIcon),r.default.use(w.MdDrawer),r.default.use(w.MdToolbar),r.default.use(w.MdList),r.default.use($.a,{name:"v-touch"}),r.default.config.productionTip=!1,r.default.use(h.a),r.default.component("MenuIcon",T),r.default.component("SwapIcon",S),r.default.component("PlusIcon",M),r.default.component("MinusIcon",k),new r.default({el:"#app",router:m,store:y,components:{App:i},template:"<App/>"})},S4LO:function(e,t){},lJSF:function(e,t){},siN1:function(e,t){},zj2Q:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.e0ad57b2cc3fa7f26e0f.js.map