/* empty css             *//* empty css                  */import{_ as a}from"./KiruSearchItem-3ce1c4c6.js";import{_ as t,F as e}from"./index-7ca2f26b.js";import{aL as i,o as n,c as r,e as s,aM as o,w as l,d as c,aJ as u,F as g,f as d,h as p,D as h}from"./vendor-358810ac.js";import"./index-07edc0f4.js";const m={name:"CategoryKiru",components:{ElPagination:i,KiruSearchItem:a},props:{categoryId:{type:Number,default:1},paginationCount:{type:Number,default:10}},emits:["is-loading","result-count"],data:()=>({kiruSearchResult:[],paginationVm:{currentPage:1,total:0},paginationStyle:{"--el-pagination-bg-color":"#ededeb","--el-pagination-button-disabled-bg-color":"#ededeb","--el-pagination-hover-color":"#FF7F24"},isLoading:!1}),watch:{categoryId:{handler(){this.searchKiruHandler(this.paginationVm.currentPage)}},"paginationVm.currentPage":{handler(a){this.searchKiruHandler(a)}},paginationCount:{handler(){this.searchKiruHandler(this.paginationVm.currentPage)}}},mounted(){this.searchKiruHandler(this.paginationVm.currentPage)},methods:{searchKiruHandler(a){this.$emit("is-loading",!0),this.isLoading=!0,e({articlecategoryId:this.categoryId,nowpage:a,showcount:this.paginationCount}).then((a=>{this.$emit("is-loading",!1),a.data.success?(this.paginationVm.total=a.data.total,this.kiruSearchResult=a.data.data,this.$emit("result-count",this.paginationVm.total)):this.$notify({group:"error",title:"(分類頁面)取得切切失敗"}),this.isLoading=!1})).catch((a=>{}))}}},y={key:0},f={key:1},b=[c("span",{class:"block text-center text-myBrown/20"},"目前分類無文章",-1)],v={class:"flex justify-center py-4"};var x=t(m,[["render",function(t,e,m,x,P,V){const k=a,K=i;return n(),r(g,null,[0!==P.kiruSearchResult.length?(n(),r("ul",y,[s(o,{mode:"out-in","enter-active-class":"transition duration-300 ease-out delay-300","enter-from-class":"transform opacity-0 translate-x-48","enter-to-class":"transform opacity-100 translate-x-0","leave-active-class":"transition duration-300 ease-in","leave-from-class":"transform opacity-100 translate-x-0","leave-to-class":"transform opacity-0 -translate-x-48"},{default:l((()=>[(n(!0),r(g,null,d(P.kiruSearchResult,(a=>(n(),p(k,h(a,{key:a.artId,"is-show-author":!0}),null,16)))),128))])),_:1})])):(n(),r("div",f,b)),c("div",v,[s(K,{currentPage:P.paginationVm.currentPage,"onUpdate:currentPage":e[0]||(e[0]=a=>P.paginationVm.currentPage=a),style:u([P.paginationStyle]),layout:"prev, pager, next","page-size":m.paginationCount,"pager-count":7,total:P.paginationVm.total,"hide-on-single-page":!1},null,8,["currentPage","style","page-size","total"])])],64)}]]);export{x as default};
