import{_ as e,E as a}from"./index-b89bf8b0.js";import{_ as t}from"./SearchArticleType-ac94ac25.js";import{L as s,r as n,o,c as r,d as i,e as c,t as p,s as d,aK as l,F as u,f as m,h as y,w as g}from"./vendor-358810ac.js";const h={name:"SearchPage",components:{Loading:s,SearchArticleType:t},props:{searchType:{type:String,default:""},keywords:{type:String,default:""}},data:()=>({isLoading:!1,paginationCount:10,resultCount:0}),computed:{},watch:{},methods:{articleTypeChange(e){this.$router.push({name:"SearchContent",params:{searchType:e},query:{keywords:this.keywords}})}}},x={class:"min-h-[calc(100vh-64px-56px)]"},v={class:"py-4 mx-auto max-w-[816px] md:py-12"},w={class:"flex justify-between items-center p-4 border-b border-black/10 md:items-end md:px-0 md:pt-8 md:pb-4"},b={class:"text-sm tracking-wide text-myBrown md:text-base"},f={class:"flex gap-3 items-center"},k=i("span",{class:"text-sm text-black/40"},"1 頁顯示",-1),C=["value"],T=i("span",{class:"text-sm text-black/40"},"筆",-1),L={class:"relative p-4 min-h-[720px] rounded-lg md:py-8 md:px-0"};var S=e(h,[["render",function(e,s,h,S,j,A){const E=t,_=n("router-view"),B=a,D=n("Loading");return o(),r("div",x,[i("div",v,[c(E,{"search-type":h.searchType,onArticleType:A.articleTypeChange},null,8,["search-type","onArticleType"]),i("div",w,[i("h2",b," 關鍵字搜尋結果，共 "+p(j.resultCount)+" 筆 ",1),i("div",f,[k,d(i("select",{"onUpdate:modelValue":s[0]||(s[0]=e=>j.paginationCount=e),name:"pagination-count",class:"py-1 pr-8 text-sm bg-myGray rounded-lg form-select"},[(o(),r(u,null,m(5,(e=>i("option",{key:e,value:10*e},p(10*e),9,C))),64))],512),[[l,j.paginationCount,void 0,{number:!0}]]),T])]),i("div",L,[(o(),y(_,{key:h.keywords,name:h.searchType,keywords:h.keywords,"pagination-count":j.paginationCount,onIsLoading:s[1]||(s[1]=e=>j.isLoading=e),onResultCount:s[2]||(s[2]=e=>j.resultCount=e)},null,8,["name","keywords","pagination-count"])),c(D,{active:j.isLoading,"onUpdate:active":s[3]||(s[3]=e=>j.isLoading=e),"is-full-page":!1,"background-color":"#EDEDEB"},{default:g((()=>[c(B,{class:"la-2x",show:j.isLoading},null,8,["show"])])),_:1},8,["active"])])])])}]]);export{S as default};
