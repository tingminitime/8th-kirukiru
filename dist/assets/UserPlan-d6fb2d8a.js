var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,l=(a,t,n)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n;import{_ as r,a6 as i,a7 as c,a8 as g,a9 as h,K as d,E as u}from"./index-fd0d56f6.js";import{_ as p}from"./AlertModal-d492cef8.js";import{_ as m}from"./DynamicTextarea-718df5dc.js";import{L as f,ao as P,m as b,r as y,o as x,c as C,d as w,a as v,s as I,u as B,t as H,q as E,e as L,l as O,D as j,w as k}from"./vendor-358810ac.js";import{a as M,e as D}from"./object-fe354ed4.js";const $={name:"UserPlan",components:{DynamicTextarea:m,Loading:f,AlertModal:p},data(){const{value:e,errorMessage:a}=P("plan-info",M().nullable().max(300)),{value:t,errorMessage:n}=P("plan-price",D().required().positive().integer());return{getDataComplete:!1,myPlan:null,openPlan:!1,showChangePrice:!1,planPrice:0,checkPrice:t,shadowPrice:0,planPriceError:n,showChangeInfo:!1,planInfo:e,planInfoError:a,alertInfo:null,subscribeCount:0,isLoading:!1}},computed:(T=((e,a)=>{for(var t in a||(a={}))s.call(a,t)&&l(e,t,a[t]);if(n)for(var t of n(a))o.call(a,t)&&l(e,t,a[t]);return e})({},b(["userInfo"])),A={monthRevenue(){return Math.floor(this.subscribeCount*this.planPrice)}},a(T,t(A))),created(){this.getMyPlanHandler(),this.getSubscribeCount()},methods:{getMyPlanHandler(){this.isLoading=!0,i().then((e=>{e.data.success?(this.myPlan=e.data.data,this.planPrice=this.myPlan.amount,this.openPlan=!0,this.getDataComplete=!0):this.openPlan=!1,this.isLoading=!1})).catch((e=>{}))},openPlanHandler(){this.isLoading=!0,c().then((e=>{e.data.success?(this.$notify({group:"success",title:"已開通訂閱方案"}),this.openPlan=!0,this.getMyPlanHandler()):(this.$notify({group:"error",title:"方案開通失敗",test:"請重新檢查您的網路連線"}),this.openPlan=!1),this.isLoading=!1})).catch((e=>{}))},togglePriceChange(){this.showChangePrice=!this.showChangePrice},planPriceInputHandler(e){this.planPrice=e.target.value,this.checkPrice=e.target.value},changePlanPriceHandler(){this.planPriceError||g(this.planPrice).then((e=>{e.data.success?(this.$notify({group:"success",title:"訂閱金額修改成功"}),this.getMyPlanHandler(),this.togglePriceChange()):this.$notify({group:"success",title:"訂閱金額修改失敗"})})).catch((e=>{}))},toggleInfoChange(){this.showChangeInfo=!this.showChangeInfo},onChangePlanInfo(){this.introError||(this.alertInfo={message:"是否確定更改敘述 ?",confirmMode:"nothing",messageClass:"text-lg font-bold text-myBrown md:text-xl"},this.$store.commit("SHOW_ALERT"))},changePlanInfoHandler(){h(this.planInfo).then((e=>{e.data.success?(this.$notify({group:"success",title:"敘述更新成功"}),this.getMyPlanHandler(),this.toggleInfoChange()):this.$notify({group:"error",title:e.data.message})})).catch((e=>{}))},getSubscribeCount(){d(this.userInfo.Username).then((e=>{e.data.success?this.subscribeCount=e.data.orderNumber:this.$notify({group:"error",title:"訂閱人數取得失敗"})})).catch((e=>{}))},formatThousand:e=>String(e).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")}};var T,A;const S={class:"relative w-full min-h-[726px]"},_=w("h2",{class:"mb-4 text-2xl font-bold text-myBrown"}," 我的方案 ",-1),U={key:0,class:"py-4 text-myBrown"},V=w("p",{class:"py-2 px-4 mb-4 font-medium text-myOrange bg-myOrange/20 rounded-lg"}," 請先點選開通方案，才能享受完整的切切功能哦 ",-1),q={class:"mb-4"},K={key:1},N=w("p",{class:"py-2 px-4 mb-8 font-medium text-myOrange bg-myOrange/20 rounded-lg"}," 您已開通方案 ! ",-1),R={class:"mb-8"},W=w("h3",{class:"mb-2 text-lg font-bold text-myBrown"}," 方案價格 ",-1),Y={class:"flex gap-8 items-center"},z={class:"font-bold text-myBrown"},F=w("span",{class:"px-0.5 text-sm align-sub"},"$",-1),G={class:"px-0.5 text-2xl align-sub"},J=w("span",{class:"px-0.5 text-sm align-sub"},"NTD",-1),Q={class:"relative"},X=["value"],Z={class:"absolute -bottom-6 left-0 text-sm text-red-500"},ee={class:"flex gap-3"},ae=["disabled"],te={class:"mb-12"},ne=w("h3",{class:"mb-2 text-lg font-bold text-myBrown"}," 方案敘述 ",-1),se={class:"text-myBrown whitespace-pre-wrap"},oe={class:"py-4"},le={class:"text-sm text-red-500"},re={class:"flex gap-3 text-right"},ie=["disabled"],ce={class:"flex justify-between"},ge={class:"flex flex-col gap-4 items-center"},he=w("span",{class:"font-semibold text-myBrown"},"訂閱我的人數",-1),de={class:"text-4xl font-semibold text-myBrown"};var ue=r($,[["render",function(e,a,t,n,s,o){const l=m,r=p,i=u,c=y("Loading");return x(),C("div",S,[_,s.openPlan||s.isLoading?v("",!0):(x(),C("div",U,[V,w("div",q,[w("button",{type:"submit",class:"userPageButton",onClick:a[0]||(a[0]=(...e)=>o.openPlanHandler&&o.openPlanHandler(...e))}," 開通方案 ")])])),s.getDataComplete&&!s.isLoading?(x(),C("div",K,[w("div",null,[N,w("div",R,[W,w("div",Y,[I(w("div",z,[F,w("span",G,H(o.formatThousand(s.myPlan.amount)),1),J],512),[[B,!s.showChangePrice]]),I(w("button",{type:"button",class:"userPageButton",onClick:a[1]||(a[1]=(...e)=>o.togglePriceChange&&o.togglePriceChange(...e))}," 修改價格 ",512),[[B,!s.showChangePrice]]),I(w("div",Q,[w("input",{value:s.planPrice,class:"w-24 rounded-lg border-none focus:ring-2 focus:ring-myYellow form-input",type:"text",name:"plan-price",onInput:a[2]||(a[2]=e=>o.planPriceInputHandler(e)),onKeyup:a[3]||(a[3]=E(((...e)=>o.changePlanPriceHandler&&o.changePlanPriceHandler(...e)),["enter"]))},null,40,X),w("span",Z,H(s.planPriceError),1)],512),[[B,s.showChangePrice]]),I(w("div",ee,[w("button",{type:"button",class:"userPageButton",disabled:s.planPriceError,onClick:a[4]||(a[4]=(...e)=>o.changePlanPriceHandler&&o.changePlanPriceHandler(...e))}," 確認修改 ",8,ae),w("button",{type:"button",class:"userPageCancelButton",onClick:a[5]||(a[5]=(...e)=>o.togglePriceChange&&o.togglePriceChange(...e))}," 取消 ")],512),[[B,s.showChangePrice]])])]),w("div",te,[ne,w("p",se,H(s.myPlan.info),1),w("div",oe,[I(L(l,{modelValue:s.planInfo,"onUpdate:modelValue":a[6]||(a[6]=e=>s.planInfo=e),placeholder:"請輸入敘述內容",class:"",name:"plan-info"},null,8,["modelValue"]),[[B,s.showChangeInfo]]),w("span",le,H(s.planInfoError),1),w("div",re,[s.showChangeInfo?(x(),C("button",{key:0,type:"button",class:"userPageButton",disabled:s.planInfoError,onClick:a[7]||(a[7]=(...e)=>o.onChangePlanInfo&&o.onChangePlanInfo(...e))}," 確認更改 ",8,ie)):v("",!0),w("button",{type:"button",class:O([s.showChangeInfo?"userPageCancelButton":"userPageButton"]),onClick:a[8]||(a[8]=(...e)=>o.toggleInfoChange&&o.toggleInfoChange(...e))},H(s.showChangeInfo?"取消":"更改敘述"),3)])])]),w("div",ce,[w("div",ge,[he,w("span",de,H(o.formatThousand(s.subscribeCount)),1)])])])])):v("",!0),L(r,j(s.alertInfo,{onAlertConfirm:o.changePlanInfoHandler}),null,16,["onAlertConfirm"]),L(c,{active:s.isLoading,"onUpdate:active":a[9]||(a[9]=e=>s.isLoading=e),"is-full-page":!1,"background-color":"#EDEDEB"},{default:k((()=>[L(i,{class:"la-2x",show:s.isLoading},null,8,["show"])])),_:1},8,["active"])])}]]);export{ue as default};