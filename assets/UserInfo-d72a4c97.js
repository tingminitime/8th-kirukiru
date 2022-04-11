var e=Object.defineProperty,s=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,o=(s,a,t)=>a in s?e(s,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[a]=t;import{_ as r}from"./AlertModal-95746d3f.js";import{_ as n}from"./FormInputText-fb158cda.js";import{c as l,a as i,b as m}from"./object-fe354ed4.js";import{_ as u,T as c,U as d}from"./index-67b2667b.js";import{m as p,r as f,o as w,c as b,d as g,t as h,e as v,w as y,s as S,u as x,E as I,aw as E}from"./vendor-358810ac.js";const B={name:"UserInfo",components:{FormInputText:n,AlertModal:r},emits:["get-info"],data:()=>({passwordSchema:l().shape({"user-current-password":i().min(6).required(),"user-new-password":i().min(6).required(),"user-confirm-new-password":i().required().oneOf([m("user-new-password"),null],"密碼需一致 !")}),emailSchema:l().shape({"user-new-email":i().email().required()}),alertInfo:null,isShowEmailInput:!1}),computed:((e,r)=>{for(var n in r||(r={}))a.call(r,n)&&o(e,n,r[n]);if(s)for(var n of s(r))t.call(r,n)&&o(e,n,r[n]);return e})({},p(["userInfo"])),methods:{onPasswordSubmit(e){const s={Username:this.userInfo.Username,O_Password:e["user-current-password"],N_Password:e["user-new-password"]};c(s).then((e=>{e.data.success?(this.alertInfo={message:"密碼修改成功，請重新登入!",confirmMode:"replace",confirmTodo:{name:"SignIn"},messageClass:"text-lg font-bold text-myBrown md:text-xl",showCancel:!1},this.signOut(),this.$store.commit("SHOW_ALERT")):this.$notify({group:"error",title:e.data.message})})).catch((e=>{}))},onPasswordInvalidSubmit(e){},toggleChangeEmail(){this.isShowEmailInput=!this.isShowEmailInput},onEmailSubmit(e){d(e["user-new-email"]).then((e=>{e.data.success?(this.$notify({group:"success",title:"Email 更新成功"}),this.$emit("get-info"),this.toggleChangeEmail()):this.$notify({group:"error",title:e.data.message})})).catch((e=>{}))},onEmailInvalidSubmit(e){},signOut(){localStorage.removeItem("kirukiruToken"),this.$store.commit("SIGN_OUT")},getNewUserInfo(){getUserInfo().then((e=>{e.data.success?this.$store.commit("SET_USER_INFO",e.data.data):(localStorage.removeItem("kirukiruToken"),this.$router.push({name:"SignIn"}))})).catch((e=>{this.$notify({group:"error",title:"Error",text:`${e}`},2500),this.$router.push({name:"HomePage"})}))}}},O={class:"w-full"},P=g("h2",{class:"mb-8 text-2xl font-bold text-myBrown"}," 個人資料 ",-1),$={class:"flex items-center py-4 text-myBrown border-b border-myBrown"},_=g("div",{class:"w-1/4 font-bold"}," 帳號 ",-1),j={class:"py-12 border-b border-myBrown"},T=g("div",{class:"mb-5 w-1/4 font-bold text-myBrown"}," 變更密碼 ",-1),U={class:"flex flex-col gap-6"},k={class:"flex text-myBrown"},C=g("span",{class:"w-1/4"},"目前密碼",-1),q={class:"flex text-myBrown"},N=g("span",{class:"w-1/4"},"輸入新密碼",-1),Y={class:"flex text-myBrown"},A=g("span",{class:"w-1/4"},"再次輸入",-1),F=g("div",{class:"text-center"},[g("button",{type:"submit",class:"userPageButton"}," 確認變更 ")],-1),M={class:"py-12"},H={class:"flex flex-col gap-6"},R={class:"flex items-center text-myBrown"},G=g("div",{class:"w-1/4 font-bold"}," E-mail ",-1),L={class:"flex gap-3 text-myBrown"},W=g("div",{class:"text-center"},[g("button",{type:"submit",class:"userPageButton"}," 確認更改 ")],-1),z={class:"text-center"};var D=u(B,[["render",function(e,s,a,t,o,l){const i=n,m=f("v-form"),u=r;return w(),b("div",O,[P,g("div",$,[_,g("div",null,[g("span",null,h(e.userInfo.Username),1)])]),g("div",j,[T,g("div",U,[v(m,{"validation-schema":o.passwordSchema,onSubmit:l.onPasswordSubmit,onInvalidSubmit:l.onPasswordInvalidSubmit},{default:y((()=>[g("div",k,[C,v(i,{name:"user-current-password",type:"password",label:"目前密碼",placeholder:"目前密碼",class:"mb-10","success-message":"","input-border":"focus:ring-2 focus:ring-myYellow"})]),g("div",q,[N,v(i,{name:"user-new-password",type:"password",label:"新密碼",placeholder:"新密碼",class:"mb-10","success-message":"","input-border":"focus:ring-2 focus:ring-myYellow"})]),g("div",Y,[A,v(i,{name:"user-confirm-new-password",type:"password",label:"再次輸入密碼",placeholder:"再次輸入密碼",class:"mb-10","success-message":"","input-border":"focus:ring-2 focus:ring-myYellow"})]),F])),_:1},8,["validation-schema","onSubmit","onInvalidSubmit"])])]),g("div",M,[g("div",H,[g("div",R,[G,g("div",null,[g("span",null,h(e.userInfo.Email),1)])]),S(v(m,{"validation-schema":o.emailSchema,onSubmit:l.onEmailSubmit,onInvalidSubmit:l.onEmailInvalidSubmit},{default:y((()=>[g("div",L,[v(i,{name:"user-new-email",type:"email",label:"Email",placeholder:"Email",class:"w-full","success-message":"","input-border":"focus:ring-2 focus:ring-myYellow"}),W])])),_:1},8,["validation-schema","onSubmit","onInvalidSubmit"]),[[x,o.isShowEmailInput]]),g("div",z,[g("button",{type:"submit",class:"userPageButton",onClick:s[0]||(s[0]=(...e)=>l.toggleChangeEmail&&l.toggleChangeEmail(...e))}," 更改 E-mail ")])])]),v(u,I(E(o.alertInfo)),null,16)])}]]);export{D as default};
