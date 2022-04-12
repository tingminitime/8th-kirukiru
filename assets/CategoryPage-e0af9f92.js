import{e,_ as t,E as a}from"./index-d8506044.js";import{_ as s}from"./FormInputSelect-88a6fac2.js";import{_ as o,o as i,c as l,a as r,d as n,e as c,F as d,f as p,l as g,t as u,L as y,r as m,s as h,aK as C,w as b}from"./vendor-385d4c3c.js";import{_ as f}from"./SearchArticleType-5389e9d9.js";const x={name:"SearchCategory",components:{FormInputSelect:s},props:{defaultSelectId:{type:Number,default:1}},emits:["select"],data:()=>({articleCategories:[],selectCategoryId:1,selectCategory:null,isMobile:!1}),computed:{filterCategory:{get(){return this.selectCategory},set(e){this.selectCategory=e,this.selectCategoryId=e.Id,this.selectHandler(e.Id)}}},created(){this.onResize(),window.addEventListener("resize",this.onResize),this.getArticleCategories()},mounted(){this.selectCategoryId=this.defaultSelectId,this.$emit("select",this.selectCategoryId)},beforeUnmount(){window.removeEventListener("resize",this.onResize)},methods:{getArticleCategories(){e().then((e=>{this.articleCategories=e.data,this.selectCategory=this.articleCategories.find((e=>e.Id===this.defaultSelectId))})).catch((e=>{}))},selectHandler(e){this.selectCategoryId=e,this.$emit("select",this.selectCategoryId)},onResize:o.throttle((function(){window.innerWidth>768?this.isMobile=!1:this.isMobile=!0}),300)}},v={key:0,class:"px-8 my-4"},I={class:"pt-8"},w={class:"grid grid-cols-6 grid-flow-row gap-x-6 gap-y-4"},T=["onClick"];var k=t(x,[["render",function(e,t,a,o,y,m){const h=s;return i(),l(d,null,[r(" 選擇類別 "),n("div",null,[r(" 手機板 "),y.isMobile?(i(),l("div",v,[c(h,{modelValue:m.filterCategory,"onUpdate:modelValue":t[0]||(t[0]=e=>m.filterCategory=e),options:y.articleCategories,"key-prop":"Name","label-prop":"Name","default-text":"請選擇文章類別","options-position":"absolute"},null,8,["modelValue","options"])])):(i(),l(d,{key:1},[r(" 桌面板 "),n("div",I,[n("ul",w,[(i(!0),l(d,null,p(y.articleCategories,(e=>(i(),l("li",{key:e.Id},[n("button",{type:"button",class:g(["py-0.5 min-w-[114px] text-sm font-semibold hover:bg-myYellow/10 rounded-b-xl border border-myYellow",[y.selectCategoryId===(null==e?void 0:e.Id)?"bg-myYellow text-myBrown":"bg-myGray text-myYellow"]]),onClick:t=>m.selectHandler(e.Id)},u(e.Name),11,T)])))),128))])])],2112))])],2112)}]]);const L={name:"CategoryPage",components:{Loading:y,SearchArticleType:f,SearchCategory:k},props:{searchType:{type:String,default:""}},data:()=>({articleType:"kiru",selectCategoryId:1,isLoading:!1,paginationCount:10,resultCount:0}),methods:{articleTypeChange(e){this.articleType=e,this.$router.push({name:"CategoryContent",params:{searchType:this.articleType},query:{categoryId:this.selectCategoryId||1}})},selectCategoryHandler(e){this.selectCategoryId=e,this.$router.push({name:"CategoryContent",params:{searchType:this.articleType},query:{categoryId:this.selectCategoryId}})}}},S={class:"min-h-[calc(100vh-64px-56px)]"},z={class:"py-4 mx-auto max-w-[816px] md:py-12"},A={class:"flex justify-between items-center p-4 border-b border-black/10 md:items-end md:px-0 md:pt-8 md:pb-4"},E={class:"text-sm tracking-wide text-myBrown md:text-base"},j={class:"flex gap-3 items-center"},H=n("span",{class:"text-sm text-black/40"},"1 頁顯示",-1),R=["value"],M=n("span",{class:"text-sm text-black/40"},"筆",-1),N={class:"relative p-4 min-h-[720px] rounded-lg md:py-8 md:px-0"};var U=t(L,[["render",function(e,t,s,o,g,y){const x=f,v=k,I=m("router-view"),w=a,T=m("Loading");return i(),l("div",S,[n("div",z,[r(" 選擇切切 / 一般 "),c(x,{"search-type":s.searchType,onArticleType:y.articleTypeChange},null,8,["search-type","onArticleType"]),r(" 選擇類別 "),c(v,{onSelect:y.selectCategoryHandler},null,8,["onSelect"]),n("div",A,[n("h2",E," 分類搜尋結果，共 "+u(g.resultCount)+" 筆 ",1),n("div",j,[H,h(n("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>g.paginationCount=e),name:"pagination-count",class:"py-1 pr-8 text-sm bg-myGray rounded-lg form-select"},[(i(),l(d,null,p(5,(e=>n("option",{key:e,value:10*e},u(10*e),9,R))),64))],512),[[C,g.paginationCount,void 0,{number:!0}]]),M])]),r(" 列表 "),n("div",N,[c(I,{name:g.articleType,"pagination-count":g.paginationCount,onIsLoading:t[1]||(t[1]=e=>g.isLoading=e),onResultCount:t[2]||(t[2]=e=>g.resultCount=e)},null,8,["name","pagination-count"]),r(" 局部 Loading "),c(T,{active:g.isLoading,"onUpdate:active":t[3]||(t[3]=e=>g.isLoading=e),"is-full-page":!1,"background-color":"#EDEDEB"},{default:b((()=>[c(w,{class:"la-2x",show:g.isLoading},null,8,["show"])])),_:1},8,["active"])])])])}]]);export{U as default};
