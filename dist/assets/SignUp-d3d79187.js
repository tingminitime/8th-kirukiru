var e=Object.defineProperty,s=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,r=(s,a,t)=>a in s?e(s,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[a]=t;import{_ as l}from"./LoadingSpin-ea28a259.js";import{_ as n}from"./FormInputSelect-3e25b936.js";import{_ as i}from"./FormInputText-87dcfd08.js";import{ap as o,aq as d,ar as m,r as c,ai as p,s as u,o as g,c as f,d as b,e as h,w as x,D as v,t as y,l as w,a as S,am as I,x as U,T as _,h as j,an as V}from"./vendor-358810ac.js";import{c as B,a as P,b as k,d as M}from"./object-fe354ed4.js";import{s as T}from"./setLocale-f7bd91f3.js";import{_ as E,e as O,f as q}from"./index-80b90d62.js";T({mixed:{default:"無效的輸入",required:"必填欄位"},string:{min:"長度不可小於 ${min}",email:"須符合 Email 格式 !"}});const L={name:"SignUpModal",components:{FormInputText:i,FormInputSelect:n,LoadingSpin:l,Switch:o,SwitchGroup:d,SwitchLabel:m},props:{isOpen:{type:Boolean,default:!1}},data:()=>({schema:B().shape({"register-email":P().email().required(),"register-name":P().required(),"register-username":P().required(),"register-password":P().min(6).required(),"register-confirm_password":P().required().oneOf([k("register-password"),null],"密碼需一致 !"),"register-articlecategoryId":B().shape().nullable().required("請至少選擇一項興趣 !"),"register-agree":M().oneOf([!0],"必填 !")}),interest:null,interestList:[],params:{userName:"",passWord:"",name:"",email:"",articlecategoryId:null},agreeTerms:!1,receiveMail:!1,isFormValid:!1,isInvalidAniProcess:null,signUpProcess:!1,signUpErrorMsg:""}),mounted(){O().then((e=>{this.interestList=e.data})).catch((e=>{}))},methods:{onSubmit(e){if(this.signUpProcess)return;this.isFormValid=!0,this.signUpProcess=!0;const l={};for(const s in e){const a=s.includes("-")?s.split("-"):s;l[a[a.length-1]]=e[s]}const n=l,{confirm_password:i,articlecategoryId:o}=n,d=((e,r)=>{var l={};for(var n in e)a.call(e,n)&&r.indexOf(n)<0&&(l[n]=e[n]);if(null!=e&&s)for(var n of s(e))r.indexOf(n)<0&&t.call(e,n)&&(l[n]=e[n]);return l})(n,["confirm_password","articlecategoryId"]);let m=((e,l)=>{for(var n in l||(l={}))a.call(l,n)&&r(e,n,l[n]);if(s)for(var n of s(l))t.call(l,n)&&r(e,n,l[n]);return e})({articlecategoryId:o.Id},d);q(m).then((e=>{e.data.success?(this.$notify({group:"success",title:"註冊成功 !",text:`${e.data.message}`},2500),this.$router.push({name:"SignUpComplete"})):(this.signUpErrorMsg=e.data.message,this.$notify({group:"error",title:"註冊失敗 !",text:`${e.data.message}`},2500)),this.signUpProcess=!1})).catch((e=>{this.signUpProcess=!1}))},onInvalidSubmit(e){this.isFormValid=!1,this.isInvalidAniProcess=!0},animationEndHandler(){this.isInvalidAniProcess=!1}}},F=b("div",{class:"py-6 border-b-myBrown md:py-4 md:bg-myYellow md:border-b-2"},[b("h1",{class:"text-2xl font-bold text-center text-myBrown select-none"}," 切切會員註冊 ")],-1),$={class:"overflow-x-hidden h-[80vh] bg-myGray md:h-[60vh]"},A={class:"px-10 pb-6 md:pt-10 md:pb-8"},Y={class:"relative mb-8"},H={class:"absolute -bottom-6 left-0 m-0 text-sm text-red-500"},z={class:"relative my-4"},G={class:"flex items-center"},N=b("span",{class:"font-bold text-myBrown"},[U(" 您是否同意 "),b("a",{href:"javascript:;",class:"text-xl hover:text-myYellow underline underline-offset-4"}," 切切規範 "),U(" ? ")],-1),C=b("span",{class:"sr-only"},"您是否同意切切規範",-1),D={class:"absolute top-1/2 -right-4 m-0 text-sm text-red-500 -translate-x-full -translate-y-1/2"},W={class:"my-4"},J={class:"flex items-center"},K=b("span",{class:"font-bold text-myBrown"},"您是否願意收到電子信 ?",-1),Q=b("span",{class:"sr-only"},"您是否願意收到電子信",-1),R={class:"flex justify-center py-2"},X={key:0,class:"text-red-500"},Z={class:"flex flex-col justify-center items-center mt-2"},ee=["disabled"],se={class:"block mt-8 font-bold text-center text-myBrown md:hidden"},ae=U(" 已經有帳號了 ? "),te=b("span",{class:"inline-block underline underline-offset-4"},"點我登入",-1),re=b("span",{class:"align-sub material-icons"},"arrow_forward",-1);const le={name:"SignUp",components:{SignUpModal:E(L,[["render",function(e,s,a,t,r,o){const d=i,m=n,U=c("v-field"),_=c("SwitchLabel"),j=c("Switch"),V=c("SwitchGroup"),B=l,P=c("router-link"),k=c("v-form"),M=p("invalid");return u((g(),f("div",{class:"overflow-hidden h-screen ring-myBrown md:w-96 md:h-auto md:rounded-xl md:ring-2 md:shadow-xl md:drop-shadow-2xl",onAnimationend:s[4]||(s[4]=I(((...e)=>o.animationEndHandler&&o.animationEndHandler(...e)),["stop"]))},[F,b("div",$,[b("div",A,[h(k,{"validation-schema":r.schema,onSubmit:o.onSubmit,onInvalidSubmit:o.onInvalidSubmit},{default:x((()=>[h(d,{focus:!0,name:"register-email",type:"email",label:"Email",placeholder:"Email",class:"mb-10","success-message":""}),h(d,{name:"register-name",type:"text",label:"暱稱",placeholder:"暱稱",class:"mb-10","success-message":""}),h(d,{name:"register-username",type:"text",label:"帳號",placeholder:"帳號",class:"mb-10","success-message":""}),h(d,{name:"register-password",type:"password",label:"密碼",placeholder:"密碼",class:"mb-10","success-message":""}),h(d,{name:"register-confirm_password",type:"password",label:"再次輸入密碼",placeholder:"再次輸入密碼",class:"mb-10","success-message":""}),b("div",Y,[h(U,{modelValue:r.interest,"onUpdate:modelValue":s[0]||(s[0]=e=>r.interest=e),name:"register-articlecategoryId"},{default:x((({field:e,errorMessage:s})=>[h(m,v({options:r.interestList},e,{"key-prop":"Name","label-prop":"Name","default-text":"請選擇一項興趣主題"}),null,16,["options"]),b("span",H,y(s),1)])),_:1},8,["modelValue"])]),b("div",z,[h(U,{modelValue:r.agreeTerms,"onUpdate:modelValue":s[2]||(s[2]=e=>r.agreeTerms=e),name:"register-agree"},{default:x((({errorMessage:e})=>[h(V,null,{default:x((()=>[b("div",G,[h(_,{class:"w-48 select-none"},{default:x((()=>[N])),_:1}),h(j,{modelValue:r.agreeTerms,"onUpdate:modelValue":s[1]||(s[1]=e=>r.agreeTerms=e),class:w([r.agreeTerms?"bg-myYellow":"bg-white","mySwitchBar"])},{default:x((()=>[C,b("span",{class:w([r.agreeTerms?"translate-x-8":"translate-x-0","mySwitchButton"])},null,2)])),_:1},8,["modelValue","class"])])])),_:1}),b("span",D,y(e),1)])),_:1},8,["modelValue"])]),b("div",W,[h(V,null,{default:x((()=>[b("div",J,[h(_,{class:"w-48 select-none"},{default:x((()=>[K])),_:1}),h(j,{modelValue:r.receiveMail,"onUpdate:modelValue":s[3]||(s[3]=e=>r.receiveMail=e),class:w([r.receiveMail?"bg-myYellow":"bg-white","mySwitchBar"])},{default:x((()=>[Q,b("span",{class:w([r.receiveMail?"translate-x-8":"translate-x-0","mySwitchButton"])},null,2)])),_:1},8,["modelValue","class"])])])),_:1})]),b("div",R,[r.signUpErrorMsg?(g(),f("span",X,y(r.signUpErrorMsg),1)):S("",!0)]),b("div",Z,[b("button",{type:"submit",class:w(["relative button-lg",[r.agreeTerms&&!r.signUpProcess?"myButtonValid myButtonValidHover":"myButtonInvalid"]]),disabled:!r.agreeTerms&&!r.signUpProcess},[h(B,{class:"absolute top-3 left-5 w-5 h-5 text-white align-middle",show:r.signUpProcess},null,8,["show"]),b("span",null,y(r.signUpProcess?"請稍後...":"註冊"),1)],10,ee)]),b("p",se,[ae,h(P,{class:"text-xl hover:text-black",to:{name:"SignIn"}},{default:x((()=>[te,re])),_:1})])])),_:1},8,["validation-schema","onSubmit","onInvalidSubmit"])])])],32)),[[M,r.isInvalidAniProcess]])}]])}},ne={class:"overflow-hidden relative h-[calc(100vh-56px-64px)] md:grid md:grid-cols-2 md:gap-11"},ie={class:"z-20 my-auto ml-auto"},oe=b("div",{class:"relative z-10 py-4 my-auto"},[b("div",{class:"hidden overflow-hidden min-w-[600px] max-w-[500px] rounded-xl border-2 border-myBrown -translate-x-1/2 md:flex md:justify-center md:items-center md:max-w-[768px] md:max-h-[75vh]"},[b("img",{class:"block object-cover w-full h-full scale-105",src:"/8th-kirukiru/assets/signup-bg-20f4ac1f.svg",alt:"signin background image"})])],-1),de={class:"hidden absolute right-0 bottom-0 z-10 p-2 px-12 w-full font-bold text-right text-myBrown bg-myYellow md:block"},me=U(" 已經有帳號了 ? "),ce=b("span",{class:"inline-block underline underline-offset-4"},"點我登入",-1),pe=b("span",{class:"align-sub material-icons"},"arrow_forward",-1);var ue=E(le,[["render",function(e,s,a,t,r,l){const n=c("router-link");return g(),f("div",ne,[b("div",ie,[h(_,{appear:"",mode:"out-in","enter-active-class":"transition duration-300 ease-out","enter-from-class":"transform opacity-0 translate-x-48","enter-to-class":"transform opacity-100 translate-x-0","leave-active-class":"transition duration-300 ease-in","leave-from-class":"transform opacity-100 translate-x-0","leave-to-class":"transform opacity-0 -translate-x-48"},{default:x((()=>[(g(),j(V("SignUpModal")))])),_:1})]),oe,b("p",de,[me,h(n,{class:"text-xl hover:text-black",to:{name:"SignIn"}},{default:x((()=>[ce,pe])),_:1})])])}]]);export{ue as default};
