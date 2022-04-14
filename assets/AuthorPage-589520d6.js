var t=Object.defineProperty,e=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,r=(e,o,s)=>o in e?t(e,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[o]=s;import{_ as a,q as l,J as n,K as c,L as d,M as u}from"./index-b89bf8b0.js";import{m,r as i,ai as h,o as b,c as p,d as x,t as f,s as y,e as w,w as v,a as g,h as k,x as I}from"./vendor-358810ac.js";const A={name:"AuthorPage",beforeRouteUpdate(t,e){t.params.authorId!==e.params.authorId&&this.$store.commit("SHOW_OVERLAY_LOADING"),this.checkAccountResult=this.checkAccount(t.params.authorId),this.checkSubResult=this.checkSub(t.params.authorId),this.getAuthorInfo(t.params.authorId)},props:{authorId:{type:[String,Number],default:""}},data:()=>({authorInfo:{},publishArticleCount:0,subscribeCount:0,hasSubscribedCount:0,checkSubResult:null,checkAccountResult:null,authorPlan:{},isAuthorOpenPlan:!1}),computed:((t,a)=>{for(var l in a||(a={}))o.call(a,l)&&r(t,l,a[l]);if(e)for(var l of e(a))s.call(a,l)&&r(t,l,a[l]);return t})({},m(["userSubscribeList"])),watch:{userSubscribeList:{handler(){this.checkAccountResult=this.checkAccount(this.authorId),this.checkSubResult=this.checkSub(this.authorId)},deep:!0,immediate:!0}},mounted(){this.getAuthorInfo(this.authorId),this.getAuthorPlan()},methods:{checkAccount(t){return this.$store.state.userInfo.Username===t},checkSub(t){return this.userSubscribeList.some((e=>e.username===t))},getAuthorInfo(t){Promise.all([l(t),n(t),c(t),d(t)]).then((t=>{var e,o,s;this.$store.commit("HIDE_OVERLAY_LOADING");const r=t.map((t=>t.data));this.authorInfo=r[0].data,this.publishArticleCount=null!=(e=r[1].artcount)?e:"-",this.subscribeCount=null!=(o=r[2].orderNumber)?o:"-",this.hasSubscribedCount=null!=(s=r[3].beOrderNumber)?s:"-"})).catch((t=>{}))},getAuthorPlan(){u(this.authorId).then((t=>{t.data.success?(this.isAuthorOpenPlan=!0,this.authorPlan=t.data.data):this.isAuthorOpenPlan=!1})).catch((t=>{}))},formatThousand:t=>String(t).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")}},B={class:"px-4 pt-8 pb-11 mx-auto max-w-[816px] min-h-[calc(100vh-56px-64px)] md:px-0 md:pt-16"},S={class:"relative mb-8 rounded-2xl border-t-8 border-t-myYellow shadow-md md:pb-12 md:mb-20 md:rounded-t-none md:rounded-b-2xl md:border md:border-myBrown md:shadow-sm"},O=x("div",{class:"hidden h-8 bg-myYellow md:block"},null,-1),P={class:"hidden px-8 pt-4 pb-2 text-4xl font-bold text-myBrown md:block"},R={class:"line-clamp-1"},C={class:"flex flex-col gap-8 px-8 pt-8 pb-10 md:grid md:grid-cols-3 md:grid-rows-1 md:pt-4"},T={class:"flex gap-8 w-full md:block"},L={class:"overflow-hidden shrink-0 w-24 h-24 rounded-full md:w-auto md:h-auto md:rounded-none md:aspect-w-16 md:aspect-h-9"},j={class:"object-cover object-center w-full h-full rounded-lg load",alt:""},N={class:"flex flex-col gap-2 md:hidden"},Y={class:"mb-4 text-xl font-bold text-left text-myBrown"},_={class:"line-clamp-2"},D={class:"text-myBrown"},E=x("span",{class:"inline-block mr-2 w-20 text-sm align-super"},"發布文章",-1),H={class:"text-2xl font-bold align-bottom"},$={class:"text-myBrown"},G=x("span",{class:"inline-block mr-2 w-20 text-sm align-super"},"關注人數",-1),M={class:"text-2xl font-bold align-bottom"},U={class:"text-myBrown"},V=x("span",{class:"inline-block mr-2 w-20 text-sm align-super"},"已關注",-1),q={class:"text-2xl font-bold align-bottom"},J={class:"col-span-2"},K=["innerHTML"],W={key:1,class:"text-myBrown/40"},z={class:"hidden absolute bottom-0 left-24 grid-cols-3 w-11/12 bg-myGray rounded-b-2xl border-t-8 border-myYellow/40 translate-y-1/2 md:grid md:drop-shadow-md"},F={class:"flex flex-col py-2 px-6"},Q=x("span",{class:"mb-1 text-myBrown border-b border-myBrown"},"發布文章",-1),X={class:"text-3xl font-bold text-myBrown"},Z={class:"flex flex-col py-2 px-6"},tt=x("span",{class:"mb-1 text-myBrown border-b border-myBrown"},"關注人數",-1),et={class:"text-3xl font-bold text-myBrown"},ot={class:"flex flex-col py-2 px-6"},st=x("span",{class:"mb-1 text-myBrown border-b border-myBrown"},"已關注",-1),rt={class:"text-3xl font-bold text-myBrown"},at={key:0,class:"mb-6 rounded-2xl border-t-8 border-t-myYellow shadow-md md:rounded-t-none md:rounded-b-2xl md:border md:border-myBrown md:shadow-sm"},lt=x("h1",{class:"hidden py-2 text-2xl font-bold text-center text-myBrown bg-myYellow border-b border-myBrown md:block"}," 訂閱方案 ",-1),nt={class:"flex flex-col items-center"},ct=x("p",{class:"py-6 px-4 text-center text-myBrown md:py-8"}," 這是訂閱方案，訂閱後即可解鎖觀看付費文章 ",-1),dt={class:"flex flex-col justify-center items-center mb-6 font-semibold text-myBrown"},ut={class:"text-xl"},mt=I(" 點我訂閱 "),it={key:1},ht=[x("div",{class:"flex flex-col items-center"},[x("div",{class:"mb-4"},[x("span",{class:"text-2xl font-semibold text-myBrown"},"您已訂閱此作者 !")]),x("button",{type:"button",class:"block mb-10 font-semibold text-gray-400 hover:text-myBrown ring-2 ring-gray-300 hover:ring-myYellow transition-all button-sm"}," 取消訂閱 ")],-1)],bt={key:2,class:"mb-8"},pt=[x("p",{class:"text-center text-black/20"}," 此作者未開放訂閱方案 ",-1)];var xt=a(A,[["render",function(t,e,o,s,r,a){var l,n;const c=i("router-link"),d=i("router-view"),u=h("my-src");return b(),p("div",B,[x("div",S,[O,x("h1",P,[x("span",R,f(r.authorInfo.Name),1)]),x("div",C,[x("div",T,[x("div",L,[y(x("img",j,null,512),[[u,{name:null==(l=r.authorInfo)?void 0:l.Userpic,folder:"Pic"}]])]),x("div",N,[x("h1",Y,[x("span",_,f(null==(n=r.authorInfo)?void 0:n.Name),1)]),x("div",D,[E,x("span",H,f(a.formatThousand(r.publishArticleCount)),1)]),x("div",$,[G,x("span",M,f(a.formatThousand(r.subscribeCount)),1)]),x("div",U,[V,x("span",q,f(a.formatThousand(r.hasSubscribedCount)),1)])])]),x("div",J,[r.authorInfo.Introduction?(b(),p("p",{key:0,class:"text-sm text-myBrown whitespace-pre-wrap md:text-base",innerHTML:r.authorInfo.Introduction},null,8,K)):(b(),p("p",W," 此作者尚未填寫簡介 "))])]),x("div",z,[x("div",F,[Q,x("span",X,f(a.formatThousand(r.publishArticleCount)),1)]),x("div",Z,[tt,x("span",et,f(a.formatThousand(r.subscribeCount)),1)]),x("div",ot,[st,x("span",rt,f(a.formatThousand(r.hasSubscribedCount)),1)])])]),!r.checkSubResult&&!1===r.checkAccountResult&&r.isAuthorOpenPlan?(b(),p("div",at,[lt,x("div",nt,[ct,x("div",dt,[x("span",null,f(r.authorInfo.Name),1),x("span",ut,"$ "+f(a.formatThousand(r.authorPlan.amount))+" NTD / 月",1)]),w(c,{to:{name:"Subscribe",params:{authorId:o.authorId}},class:"block mb-10 font-bold text-myBrown hover:text-myOrange ring-2 ring-myYellow transition-all button-sm"},{default:v((()=>[mt])),_:1},8,["to"])])])):g("",!0),r.checkSubResult&&!1===r.checkAccountResult&&r.isAuthorOpenPlan?(b(),p("div",it,ht)):g("",!0),r.isAuthorOpenPlan?g("",!0):(b(),p("div",bt,pt)),(b(),k(d,{key:o.authorId,"author-id":o.authorId,"check-account":r.checkAccountResult},null,8,["author-id","check-account"]))])}]]);export{xt as default};
