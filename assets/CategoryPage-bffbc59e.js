import{e,_ as t,E as a}from"./index-7ca2f26b.js";import{_ as s}from"./FormInputSelect-2ef4d493.js";import{_ as o,o as i,c as r,e as l,d as n,F as c,f as d,l as p,t as m,L as y,r as u,s as g,aK as h,w as C}from"./vendor-358810ac.js";import{_ as b}from"./SearchArticleType-fa40465a.js";const f={name:"SearchCategory",components:{FormInputSelect:s},props:{defaultSelect:{type:Number,default:1}},emits:["select"],data:()=>({articleCategories:[],selectCategoryId:1,selectCategory:null,isMobile:!1}),computed:{filterCategoryId:{get(){return this.selectCategory},set(e){this.selectCategory=e,this.selectCategoryId=e.Id,this.selectHandler(e.Id)}}},created(){this.onResize(),window.addEventListener("resize",this.onResize),this.getArticleCategories()},mounted(){this.selectCategoryId=this.defaultSelect,this.$emit("select",this.selectCategoryId)},beforeUnmount(){window.removeEventListener("resize",this.onResize)},methods:{getArticleCategories(){e().then((e=>{this.articleCategories=e.data})).catch((e=>{}))},selectHandler(e){this.selectCategoryId=e,this.$emit("select",this.selectCategoryId)},onResize:o.throttle((function(){window.innerWidth>768?this.isMobile=!1:this.isMobile=!0}),300)}},x={key:0,class:"px-8 my-4"},v={key:1,class:"pt-8"},I={class:"grid grid-cols-6 grid-flow-row gap-x-6 gap-y-4"},w=["onClick"];var T=t(f,[["render",function(e,t,a,o,y,u){const g=s;return i(),r("div",null,[y.isMobile?(i(),r("div",x,[l(g,{modelValue:u.filterCategoryId,"onUpdate:modelValue":t[0]||(t[0]=e=>u.filterCategoryId=e),options:y.articleCategories,"key-prop":"Name","label-prop":"Name","default-text":"請選擇文章類別","options-position":"absolute"},null,8,["modelValue","options"])])):(i(),r("div",v,[n("ul",I,[(i(!0),r(c,null,d(y.articleCategories,(e=>(i(),r("li",{key:e.Id},[n("button",{type:"button",class:p(["py-0.5 min-w-[114px] text-sm font-semibold hover:bg-myYellow/10 rounded-b-xl border border-myYellow",[y.selectCategoryId===(null==e?void 0:e.Id)?"bg-myYellow text-myBrown":"bg-myGray text-myYellow"]]),onClick:t=>u.selectHandler(e.Id)},m(e.Name),11,w)])))),128))])]))])}]]);const k={name:"CategoryPage",components:{Loading:y,SearchArticleType:b,SearchCategory:T},props:{searchType:{type:String,default:""}},data:()=>({articleType:"kiru",selectCategoryId:1,isLoading:!1,paginationCount:10,resultCount:0}),methods:{articleTypeChange(e){this.articleType=e,this.$router.push({name:"CategoryContent",params:{searchType:this.articleType},query:{categoryId:this.selectCategoryId||1}})},selectCategoryHandler(e){this.selectCategoryId=e,this.$router.push({name:"CategoryContent",params:{searchType:this.articleType},query:{categoryId:this.selectCategoryId}})}}},L={class:"min-h-[calc(100vh-64px-56px)]"},S={class:"py-4 mx-auto max-w-[816px] md:py-12"},z={class:"flex justify-between items-center p-4 border-b border-black/10 md:items-end md:px-0 md:pt-8 md:pb-4"},A={class:"text-sm tracking-wide text-myBrown md:text-base"},E={class:"flex gap-3 items-center"},j=n("span",{class:"text-sm text-black/40"},"1 頁顯示",-1),H=["value"],R=n("span",{class:"text-sm text-black/40"},"筆",-1),M={class:"relative p-4 min-h-[720px] rounded-lg md:py-8 md:px-0"};var N=t(k,[["render",function(e,t,s,o,p,y){const f=b,x=T,v=u("router-view"),I=a,w=u("Loading");return i(),r("div",L,[n("div",S,[l(f,{"search-type":s.searchType,onArticleType:y.articleTypeChange},null,8,["search-type","onArticleType"]),l(x,{onSelect:y.selectCategoryHandler},null,8,["onSelect"]),n("div",z,[n("h2",A," 分類搜尋結果，共 "+m(p.resultCount)+" 筆 ",1),n("div",E,[j,g(n("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>p.paginationCount=e),name:"pagination-count",class:"py-1 pr-8 text-sm bg-myGray rounded-lg form-select"},[(i(),r(c,null,d(5,(e=>n("option",{key:e,value:10*e},m(10*e),9,H))),64))],512),[[h,p.paginationCount,void 0,{number:!0}]]),R])]),n("div",M,[l(v,{name:p.articleType,"pagination-count":p.paginationCount,onIsLoading:t[1]||(t[1]=e=>p.isLoading=e),onResultCount:t[2]||(t[2]=e=>p.resultCount=e)},null,8,["name","pagination-count"]),l(w,{active:p.isLoading,"onUpdate:active":t[3]||(t[3]=e=>p.isLoading=e),"is-full-page":!1,"background-color":"#EDEDEB"},{default:C((()=>[l(I,{class:"la-2x",show:p.isLoading},null,8,["show"])])),_:1},8,["active"])])])])}]]);export{N as default};
