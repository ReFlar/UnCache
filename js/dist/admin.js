module.exports=function(e){var a={};function t(n){if(a[n])return a[n].exports;var r=a[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var r in e)t.d(n,r,function(a){return e[a]}.bind(null,r));return n},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=11)}([function(e,a){e.exports=flarum.core.compat.app},function(e,a){e.exports=flarum.core.compat["components/Alert"]},function(e,a){e.exports=flarum.core.compat["components/Button"]},function(e,a){e.exports=flarum.core.compat.extend},function(e,a){e.exports=flarum.core.compat["components/AdminNav"]},function(e,a){e.exports=flarum.core.compat["components/AdminLinkButton"]},function(e,a){e.exports=flarum.core.compat["components/Page"]},function(e,a){e.exports=flarum.core.compat["utils/saveSettings"]},function(e,a){e.exports=flarum.core.compat["components/Switch"]},,,function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(3),s=t(4),c=t.n(s),l=t(5),i=t.n(l);var u=t(1),p=t.n(u),d=t(2),f=t.n(d),h=t(6),g=t.n(h),v=t(7),b=t.n(v),x=t(8),y=t.n(x),_=function(e){function a(){return e.apply(this,arguments)||this}!function(e,a){e.prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a}(a,e);var t=a.prototype;return t.init=function(){var e=this;this.fields=["cloudflare_email","cloudflare_apikey","cloudflare_zoneid"],this.switches=["cloudflare_enabled"],this.values={},this.settingsPrefix="reflar.uncache";var a=app.data.settings;this.fields.forEach(function(t){return e.values[t]=m.prop(a[e.addPrefix(t)])}),this.switches.forEach(function(t){return e.values[t]=m.prop("1"===a[e.addPrefix(t)])})},t.view=function(){var e=this;return m("div",{className:"SettingsPage--uncache"},m("div",{className:"container"},m("legend",null,app.translator.trans("reflar-uncache.admin.page.title")),m("div",{className:"helpText"},app.translator.trans("reflar-uncache.admin.page.helptext")),f.a.component({type:"button",className:"Button Button-primary uncache-button",children:app.translator.trans("reflar-uncache.admin.page.button"),onclick:function(){app.alerts.dismiss(e.successAlert),app.request({url:app.forum.attribute("apiUrl")+"/uncache/invalidate",errorHandler:e.onerror.bind(e),method:"POST"}).then(function(){app.alerts.show(e.successAlert=new p.a({type:"success",children:app.translator.trans("reflar-uncache.admin.page.success")}))})}}),m("form",{onsubmit:this.onsubmit.bind(this)},m("fieldset",null,m("div",{className:"uncache-settings"},m("div",null,m("legend",{className:"uncache-legend"},app.translator.trans("reflar-uncache.admin.page.cloudflare.title")),y.a.component({state:this.values.cloudflare_enabled()||!1,children:app.translator.trans("reflar-uncache.admin.page.cloudflare.enable"),onchange:this.values.cloudflare_enabled,className:"uncache-switch"}),m("label",null,app.translator.trans("reflar-uncache.admin.page.cloudflare.zoneid")),m("div",{className:"helpText"},app.translator.trans("reflar-uncache.admin.page.cloudflare.zoneid_help")),m("input",{className:"FormControl uncache-settings-input",value:this.values.cloudflare_zoneid()||"",placeholder:"1234567890abcdefghij1234567890ab",oninput:m.withAttr("value",this.values.cloudflare_zoneid)}),m("label",null,app.translator.trans("reflar-uncache.admin.page.cloudflare.apikey")),m("div",{className:"helpText"},app.translator.trans("reflar-uncache.admin.page.cloudflare.apikeyhelp")),m("input",{className:"FormControl uncache-settings-input",value:this.values.cloudflare_apikey()||"",placeholder:"1234567890abcdefghij1234567890abcdefg",oninput:m.withAttr("value",this.values.cloudflare_apikey)}),m("label",null,app.translator.trans("reflar-uncache.admin.page.cloudflare.email")),m("div",{className:"helpText"},app.translator.trans("reflar-uncache.admin.page.cloudflare.emailhelp")),m("input",{className:"FormControl uncache-settings-input",value:this.values.cloudflare_email()||"",placeholder:"example@gmail.com",type:"email",oninput:m.withAttr("value",this.values.cloudflare_email)})),f.a.component({type:"submit",className:"Button Button--primary",children:app.translator.trans("core.admin.settings.submit_button"),loading:this.loading,disabled:!this.changed()}))))))},t.onerror=function(e){if(e.responseText.includes("Unable to purge"))app.alerts.show(this.successAlert=new p.a({type:"warning",children:app.translator.trans("reflar-uncache.admin.page.warning")}));else{if(!e.responseText.includes("failed to open stream: No such file or directory"))throw e;app.alerts.show(this.successAlert=new p.a({type:"error",children:app.translator.trans("reflar-uncache.admin.page.error")}))}},t.changed=function(){var e=this,a=this.switches.some(function(a){return e.values[a]()!==("1"==app.data.settings[e.addPrefix(a)])});return this.fields.some(function(a){return e.values[a]()!==app.data.settings[e.addPrefix(a)]})||a},t.onsubmit=function(e){var a=this;if(e.preventDefault(),!this.loading){this.loading=!0,app.alerts.dismiss(this.successAlert);var t={};this.fields.forEach(function(e){return t[a.addPrefix(e)]=a.values[e]()}),this.switches.forEach(function(e){return t[a.addPrefix(e)]=a.values[e]()}),b()(t).then(function(){app.alerts.show(a.successAlert=new p.a({type:"success",children:app.translator.trans("core.admin.basics.saved_message")}))}).then(function(){a.loading=!1,m.redraw()})}},t.addPrefix=function(e){return this.settingsPrefix+"."+e},a}(g.a);r.a.initializers.add("reflar/uncache",function(){r.a.routes["reflar-uncache"]={path:"/reflar/uncache",component:_.component()},r.a.extensionSettings["reflar-uncache"]=function(){return m.route(r.a.route("reflar-uncache"))},Object(o.extend)(c.a.prototype,"items",function(e){e.add("reflar-uncache",i.a.component({href:r.a.route("reflar-uncache"),icon:"fas fa-archive",children:"UnCache",description:r.a.translator.trans("reflar-uncache.admin.nav.desc")}))})})}]);
//# sourceMappingURL=admin.js.map