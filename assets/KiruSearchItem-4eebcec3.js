import{_ as t,h as e}from"./index-0c162573.js";import{_ as a}from"./index-d05ddeac.js";import{r as s,ai as l,o as r,c as o,e as i,w as n,d,s as c,h as m,a as u,t as f,l as p}from"./vendor-358810ac.js";const x={name:"KiruSearchItem",components:{PayArticleTag:t},props:{artId:{type:[String,Number],default:null},username:{type:String,default:""},author:{type:String,default:""},authorPic:{type:String,default:""},title:{type:String,default:""},introduction:{type:String,default:""},firstPhoto:{type:String,default:""},isFree:{type:Boolean,default:!1},lovecount:{type:[String,Number],default:0},artInitDate:{type:String,default:""},isShowAuthor:{type:Boolean,default:!0}},data:()=>({}),methods:{convertText:t=>e.convert(t)}},h={class:"mb-8"},g={class:"shrink-0 w-32 md:w-48"},y={class:"aspect-w-4 aspect-h-3 md:aspect-w-16 md:aspect-h-9"},w={class:"object-cover object-center w-full h-full rounded-lg load",alt:""},b={class:"flex justify-between items-center mb-3"},v={class:"font-bold text-myBrown line-clamp-1"},S={class:"ml-1"},j={class:"text-xs tracking-wide text-myBrown md:text-sm"},k={class:"mb-1"},_={class:"text-sm text-myBrown line-clamp-2"},A={class:"overflow-hidden w-6 h-6 rounded-full md:w-8 md:h-8"},I={class:"object-cover w-full h-full bg-center scale-[103%] load",alt:""},P={class:"text-xs font-semibold text-black/80 group-hover:text-myOrange md:text-sm"},B={class:"flex gap-2 items-center md:hidden"},D=d("span",{class:"text-lg text-myOrange align-middle material-icons"},"favorite_border",-1),O={class:"text-myOrange"},Y={class:"hidden flex-col items-center md:flex"},T=d("span",{class:"text-lg text-myOrange align-middle material-icons"},"favorite_border",-1),F={class:"text-myOrange"};var K=a(x,[["render",function(e,a,x,K,M,N){const q=t,z=s("router-link"),C=l("my-src"),E=l("timeformat");return r(),o("li",h,[i(z,{to:{name:"ArticleKiru",params:{articleId:x.artId}},target:"_blank",class:"flex grow gap-3"},{default:n((()=>[d("div",g,[d("div",y,[c(d("img",w,null,512),[[C,{name:x.firstPhoto,folder:"Pic"}]])])]),d("div",{class:p(["flex flex-col w-full md:px-3 md:border-r md:border-r-black/10",[x.isShowAuthor?"justify-between":"justify-start"]])},[d("div",b,[d("h3",v,[x.isFree?u("",!0):(r(),m(q,{key:0,class:"text-white bg-black/40"})),d("span",S,f(x.title),1)]),c(d("span",j,null,512),[[E,{time:x.artInitDate,format:"YYYY.MM.DD"}]])]),d("div",k,[d("p",_,f(N.convertText(x.introduction)),1)]),d("div",{class:p(["flex",[x.isShowAuthor?"justify-between":"justify-end"]])},[x.isShowAuthor?(r(),m(z,{key:0,class:"group flex gap-2 items-center",to:{name:"AuthorDetail",params:{authorId:x.username}}},{default:n((()=>[d("div",A,[c(d("img",I,null,512),[[C,{name:x.authorPic,folder:"Pic"}]])]),d("p",P,f(x.author),1)])),_:1},8,["to"])):u("",!0),d("div",B,[D,d("span",O,f(x.lovecount),1)])],2)],2),d("div",Y,[T,d("span",F,f(x.lovecount),1)])])),_:1},8,["to"])])}]]);export{K as _};
