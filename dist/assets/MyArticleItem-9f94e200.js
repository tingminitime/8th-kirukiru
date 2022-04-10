import{r as e,ai as t,o as a,c as l,d as i,e as s,w as n,x as r,t as o,s as d,u as c,a as m}from"./vendor-358810ac.js";import{_ as p}from"./index-80b90d62.js";const u={name:"MyArticleItem",props:{artId:{type:[String,Number],default:""},title:{type:String,default:""},artInitDate:{type:String,default:""},lovecount:{type:Number,default:0},messageCount:{type:Number,default:0},author:{type:String,default:""},authorPic:{type:String,default:""},username:{type:String,default:""},showAuthor:{type:Boolean,default:!1},showFeature:{type:Boolean,default:!1},showEdit:{type:Boolean,default:!1},showDelete:{type:Boolean,default:!1},editLink:{type:String,default:""}},emits:["delete-article"],methods:{deleteArticleHandler(){this.$emit("delete-article",{articleId:this.artId,articleTitle:this.title})}}},f={class:"group flex gap-2 items-center py-2 mb-2"},x={class:"flex gap-8 justify-between items-center p-4 w-[calc(100%-80px)] bg-white rounded-lg transition-all md:gap-12"},g={class:"flex flex-col gap-1 max-w-[320px]"},y={class:"text-sm text-black/60"},h={key:0,class:"flex flex-col gap-2 md:flex-row md:gap-3"},b={class:"flex items-center text-myBrown"},w=i("span",{class:"inline-block px-0.5 text-sm align-middle material-icons"},"favorite_border",-1),v={class:"inline-block px-0.5 text-sm align-middle"},k={class:"flex items-center text-myBrown"},B=i("span",{class:"inline-block px-0.5 text-sm align-middle material-icons-outlined"},"mode_comment",-1),I={class:"inline-block px-0.5 text-sm align-middle"},_={key:1},A={class:"overflow-hidden w-7 h-7 rounded-full md:w-7 md:h-7"},D={class:"object-cover w-full h-full bg-center scale-[103%] load",alt:""},S={class:"text-sm line-clamp-1"},j={key:0,class:"flex flex-col gap-1 justify-center self-stretch px-2 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"},Y=i("span",{class:"inline-block p-1 px-2 text-base text-myBrown align-middle hover:bg-black/10 rounded-md material-icons"},"edit",-1),C=[i("span",{class:"inline-block p-1 px-2 text-base text-myBrown align-middle hover:bg-black/10 rounded-md material-icons"},"delete",-1)];var H=p(u,[["render",function(p,u,H,M,N,P){const E=e("router-link"),F=t("timeformat"),L=t("my-src");return a(),l("li",f,[i("div",x,[i("div",g,[s(E,{class:"font-bold text-myBrown line-clamp-1",target:"_blank",title:H.title,to:{name:"ArticleKiru",params:{articleId:H.artId}}},{default:n((()=>[r(o(H.title),1)])),_:1},8,["title","to"]),d(i("span",y,null,512),[[F,{time:H.artInitDate,format:"YYYY/MM/DD"}]])]),H.showAuthor?(a(),l("div",_,[s(E,{class:"flex gap-2 items-center text-myBrown hover:text-myOrange",to:{name:"AuthorDetail",params:{authorId:H.username}}},{default:n((()=>[i("div",A,[d(i("img",D,null,512),[[L,{name:H.authorPic,folder:"Pic"}]])]),i("p",S,o(H.author),1)])),_:1},8,["to"])])):(a(),l("div",h,[i("div",b,[w,i("span",v,o(H.lovecount),1)]),i("div",k,[B,i("span",I,o(H.messageCount),1)])]))]),H.showFeature?(a(),l("div",j,[d(s(E,{type:"button",target:"_blank",to:{name:H.editLink,params:{article:H.artId}}},{default:n((()=>[Y])),_:1},8,["to"]),[[c,H.showEdit]]),d(i("button",{type:"button",onClick:u[0]||(u[0]=(...e)=>P.deleteArticleHandler&&P.deleteArticleHandler(...e))},C,512),[[c,H.showDelete]])])):m("",!0)])}]]);export{H as _};