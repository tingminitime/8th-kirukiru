var e=Object.defineProperty,t=Object.defineProperties,i=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,l=(t,i,o)=>i in t?e(t,i,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[i]=o;import{_ as s}from"./AlertModal-529042c3.js";import{o as n,c as m,d,a as c,_ as u,e as f,t as h,ap as p,aq as g,ar as b,v as y,r as x,w as v,F as w,f as I,E as k,aw as C,l as V,h as A,D as L}from"./vendor-385d4c3c.js";import{_ as M,i as P,j as B,e as $,k as H,l as j}from"./index-fc54cddc.js";import{_ as O,a as _,b as E}from"./EditNavbar-93953a9a.js";import{_ as S}from"./CoverUpload-211ef0c3.js";import{_ as F}from"./FormInputSelect-553b4c5c.js";import"./tippy.esm-7d0a23a6.js";const U={name:"MissionItem",props:{uuid:{type:String,required:!0},auxiliary:{type:String,default:""},auxiliarymain:{type:String,default:""},editMode:{type:Boolean,default:!1}},emits:["remove-item","update:title","update:link"],data(){return{title:this.auxiliary,link:this.auxiliarymain}},methods:{removeItem(){this.$emit("remove-item",this.uuid)},titleHandler(e){this.title=e.target.value,this.$emit("update:title",e.target.value)},linkHandler(e){this.link=e.target.value,this.$emit("update:link",e.target.value)}}},T={class:"flex flex-col gap-4 items-center mb-8 md:flex-row md:justify-between"},D={class:"flex flex-col gap-1 w-full sm:w-72"},R=d("span",{class:"inline-block font-bold text-center text-myBrown align-middle md:text-left"},"任務標題",-1),K=["value"],Y={class:"flex flex-col flex-1 gap-1 w-full sm:w-72"},W=d("div",{class:"text-center translate-x-4 md:text-left md:translate-x-0"},[d("span",{class:"inline-block font-bold text-center text-myBrown align-middle md:text-left"},"任務連結"),d("span",{class:"inline-block ml-2 text-myBrown align-middle material-icons"},"link")],-1),N=["value"],G={class:"flex justify-center self-stretch py-4 w-full sm:w-auto md:self-center md:bg-transparent"},q=[d("span",{class:"text-myBrown material-icons"},"delete_sweep",-1),d("span",{class:"text-myBrown md:hidden"},"移除欄位",-1)];var z=M(U,[["render",function(e,t,i,o,r,a){return n(),m("div",T,[d("div",D,[R,d("input",{type:"text",placeholder:"請輸入任務標題",class:"w-full placeholder:text-gray-400 bg-transparent rounded-lg border-2 border-myBrown focus:border-myYellow focus:ring-1 focus:ring-myYellow form-input",value:r.title,onInput:t[0]||(t[0]=(...e)=>a.titleHandler&&a.titleHandler(...e))},null,40,K)]),d("div",Y,[W,d("input",{type:"text",placeholder:"請貼上任務連結",class:"w-full placeholder:text-gray-400 bg-transparent rounded-lg border-2 border-myBrown focus:border-myYellow focus:ring-1 focus:ring-myYellow form-input",value:r.link,onInput:t[1]||(t[1]=(...e)=>a.linkHandler&&a.linkHandler(...e))},null,40,N)]),c(" 移除欄位 "),d("div",G,[d("button",{type:"button",class:"flex gap-3 justify-center p-2 w-2/3 bg-gray-200 hover:bg-gray-300 rounded-lg md:gap-0 md:my-0 md:w-full",onClick:t[2]||(t[2]=(...e)=>a.removeItem&&a.removeItem(...e))},q)])])}]]);const J={name:"KiruItem",components:{CoverUpload:S,TipTap:O},props:{uuid:{type:String,required:!0},origImage:{type:String,default:""},editMode:{type:Boolean,default:!1},origMain:{type:String,default:""}},emits:["remove-item","kiru-img-upload","kiru-content"],data:()=>({image:null,content:"",kiruCount:0}),watch:{content(e){e&&this.$emit("kiru-content",e)},origMain:{handler(e){e&&(this.content=e)},immediate:!0}},methods:{removeItem(){this.$emit("remove-item",this.uuid)},imageChange(e){this.image=null==e?void 0:e.file},imageConfirm(){this.sendImage(this.image.name)},imageCancel(){this.image=null},sendImage(e){const t=new FormData;t.append("photo",this.image),P(t).then((t=>{t.data.success?this.$emit("kiru-img-upload",t.data.picname):(this.$notify({group:"error",title:"上傳圖片失敗 !"}),this.$emit("kiru-img-upload",e)),this.image=null})).catch((e=>{}))},kiruCountHandler:u.throttle((function(e){this.kiruCount=e}),500)}},Q={class:"flex flex-col gap-3 items-center mb-12 md:flex-row md:gap-0 md:justify-between"},X={class:"relative w-full md:w-1/2"},Z={class:"inline-block absolute right-0 bottom-0 py-0.5 px-1 text-xs text-myBrown rounded translate-y-full"},ee={class:"flex justify-center self-stretch py-4 w-full sm:w-auto md:self-center md:bg-transparent"},te=[d("span",{class:"text-myBrown material-icons"},"delete_sweep",-1),d("span",{class:"text-myBrown md:hidden"},"移除欄位",-1)];var ie=M(J,[["render",function(e,t,i,o,r,a){const l=S,s=O;return n(),m("div",Q,[c(" 上傳圖片 "),f(l,{name:"kiru",class:"w-full sm:w-[256px]","upload-bg":"bg-upload-image","upload-container":"w-full","orig-image":i.origImage,"aspect-width":1,"aspect-height":1,"upload-class":"aspect-w-1 aspect-h-1","edit-mode":i.editMode,onFileChange:a.imageChange,onFileConfirm:a.imageConfirm,onFileCancel:a.imageCancel},null,8,["orig-image","edit-mode","onFileChange","onFileConfirm","onFileCancel"]),c(" 切切內容 "),d("div",X,[f(s,{modelValue:r.content,"onUpdate:modelValue":t[0]||(t[0]=e=>r.content=e),placeholder:"簡述一下這篇切切的內容吧 _","custom-class":"min-h-[6rem]","word-limit":"100",onWordCount:a.kiruCountHandler},null,8,["modelValue","onWordCount"]),d("span",Z,"字數 : "+h(r.kiruCount),1)]),c(" 移除欄位 "),d("div",ee,[d("button",{type:"button",class:"flex gap-3 justify-center p-2 w-2/3 bg-gray-200 hover:bg-gray-300 rounded-lg md:gap-0 md:my-0 md:w-full",onClick:t[1]||(t[1]=(...e)=>a.removeItem&&a.removeItem(...e))},te)])])}]]);const oe={name:"PrepareTool",components:{CoverUpload:S},props:{uuid:{type:String,required:!0},mission:{type:String,default:""},secPhoto:{type:String,default:""},editMode:{type:Boolean,default:!1}},emits:["update:tool","remove-item","tool-img-upload"],data:()=>({image:null}),watch:{},methods:{removeItem(){this.$emit("remove-item",this.uuid)},imageChange(e){this.image=null==e?void 0:e.file},imageConfirm(){this.sendImage(this.image.name)},imageCancel(){this.image=null},sendImage(e){const t=new FormData;t.append("photo",this.image),P(t).then((t=>{t.data.success?this.$emit("tool-img-upload",t.data.picname):(this.$notify({group:"error",title:"上傳圖片失敗 !"}),this.$emit("tool-img-upload",e)),this.image=null})).catch((e=>{}))}}},re={class:"flex flex-col gap-3 items-center mb-8 md:flex-row md:gap-0 md:justify-between"},ae={class:"flex flex-col gap-1 w-full sm:w-72 md:-translate-y-3"},le=d("span",{class:"inline-block font-bold text-center text-myBrown align-middle md:text-left"},"工具",-1),se=["value"],ne={class:"flex justify-center self-stretch py-4 w-full sm:w-auto md:self-center md:bg-transparent"},me=[d("span",{class:"text-myBrown material-icons"},"delete_sweep",-1),d("span",{class:"text-myBrown md:hidden"},"移除欄位",-1)];var de=M(oe,[["render",function(e,t,i,o,r,a){const l=S;return n(),m("div",re,[c(" 上傳圖片 "),f(l,{name:"tool",class:"w-full sm:w-[256px]","upload-bg":"bg-upload-image","upload-container":"w-full","orig-image":"."===i.secPhoto?"":i.secPhoto,"edit-mode":i.editMode,onFileChange:a.imageChange,onFileConfirm:a.imageConfirm,onFileCancel:a.imageCancel},null,8,["orig-image","edit-mode","onFileChange","onFileConfirm","onFileCancel"]),c(" 工具內容 "),d("div",ae,[le,d("input",{value:i.mission,type:"text",placeholder:"請輸入工具內容",class:"p-2 w-full bg-transparent rounded-lg border-2 border-myBrown focus:border-myYellow focus:outline-none sm:py-1",onInput:t[0]||(t[0]=t=>e.$emit("update:tool",t.target.value))},null,40,se)]),c(" 移除欄位 "),d("div",ne,[d("button",{type:"button",class:"flex gap-3 justify-center p-2 w-2/3 bg-gray-200 hover:bg-gray-300 rounded-lg md:gap-0 md:my-0 md:w-full",onClick:t[1]||(t[1]=(...e)=>a.removeItem&&a.removeItem(...e))},me)])])}]]),ce="./assets/add-item-e0b0ffdc.svg";const ue={name:"EditKiru",components:{EditNavbar:_,CoverUpload:S,Switch:p,SwitchGroup:g,SwitchLabel:b,FormInputSelect:F,Input:E,TipTap:O,PrepareTool:de,KiruItem:ie,MissionItem:z,AlertModal:s},props:{articleId:{type:[String,Number],default:""}},data:()=>({category:[],articleVm:{title:"",isFree:!0,isPush:!0,articlecategoryId:null,introduction:"",firstPhoto:"",fArrayList:[],mArrayList:[{uuid:y(),thirdPhoto:"",main:""}],fMissionList:[],final:""},coverImage:null,categoryVm:null,artInfoCount:0,finalCount:0,errors:[],editMode:!1,alertInfo:null}),computed:{categoryHandler:{get(){return this.categoryVm},set(e){this.categoryVm=e,this.articleVm.articlecategoryId=e.Id}}},async mounted(){this.articleId?(this.editMode=!0,await B(this.articleId).then((e=>{if(e.data.success){let n=e.data.data,{ArtInitDate:m,artArtlog:d,fArrayList:c,fMissionList:u,mArrayList:f}=n,h=((e,t)=>{var i={};for(var l in e)r.call(e,l)&&t.indexOf(l)<0&&(i[l]=e[l]);if(null!=e&&o)for(var l of o(e))t.indexOf(l)<0&&a.call(e,l)&&(i[l]=e[l]);return i})(n,["ArtInitDate","artArtlog","fArrayList","fMissionList","mArrayList"]);const p=this.pushUuid(c),g=this.pushUuid(u),b=this.pushUuid(f),y=(s=((e,t)=>{for(var i in t||(t={}))r.call(t,i)&&l(e,i,t[i]);if(o)for(var i of o(t))a.call(t,i)&&l(e,i,t[i]);return e})({},h),t(s,i({fArrayList:p,fMissionList:g,mArrayList:b})));Object.assign(this.articleVm,y)}else this.$notify({group:"error",title:"文章資料取得失敗 !"});var s})).catch((e=>{}))):this.editMode=!1,await $().then((e=>{if(this.category=[...e.data],this.editMode){const e=this.articleVm.articlecategoryId,t=this.category.find((t=>t.Id===e));this.categoryHandler=t}}))},methods:{postArticle(){this.$store.commit("SHOW_OVERLAY_LOADING"),H(this.articleVm).then((e=>{if(e.data.success){const t={message:this.articleVm.isPush?"切切已發布 !":"切切已儲存",confirmText:this.articleVm.isPush?"去看內文":"回個人頁面",confirmMode:"replace",confirmTodo:{name:this.articleVm.isPush?"ArticleKiru":"UserDetail",params:this.articleVm.isPush?{articleId:e.data.artId}:{userId:this.$store.state.userInfo.Username}}};this.alertInfo=t,this.$store.commit("HIDE_OVERLAY_LOADING"),this.$store.commit("SHOW_ALERT")}else this.$store.commit("HIDE_OVERLAY_LOADING"),this.$notify({group:"error",title:"發布失敗",message:e.data.message})})).catch((e=>{this.$store.commit("HIDE_OVERLAY_LOADING")}))},editArticle(){this.$store.commit("SHOW_OVERLAY_LOADING"),j(this.articleVm).then((e=>{if(e.data.success){const e={message:"切切已儲存 !",confirmText:"回到個人主頁",confirmMode:"replace",confirmTodo:{name:"User",params:{userId:this.$store.state.userInfo.Username}}};this.alertInfo=e,this.$store.commit("SHOW_ALERT")}else this.$notify({group:"error",title:"發布失敗",message:e.data.message});this.$store.commit("HIDE_OVERLAY_LOADING")})).catch((e=>{}))},saveHandler(){this.alertInfo={},this.articleVm.isPush=!1;const e=this.checkHandler(this.articleVm);e.success?this.editMode?this.editArticle():this.postArticle():(this.alertInfo={message:`${e.errors[0].message}`,showConfirm:!1,showCancel:!0,cancelText:"返回",cancelMode:"anchor",cancelTodo:{name:this.$route.name,hash:`#${e.errors[0].anchor}`}},this.$store.commit("SHOW_ALERT"))},publishHandler(){this.alertInfo={},this.articleVm.isPush=!0;const e=this.checkHandler(this.articleVm);e.success?this.editMode?this.editArticle():this.postArticle():(this.alertInfo={message:`${e.errors[0].message}`,showConfirm:!1,showCancel:!0,cancelText:"返回",cancelMode:"anchor",cancelTodo:{name:this.$route.name,hash:`#${e.errors[0].anchor}`}},this.$store.commit("SHOW_ALERT"))},pushUuid:e=>(e.forEach((e=>e.uuid=y())),e),cancelKiru(){this.alertInfo={message:"確定取消這次的切切 ?",confirmMode:"push",confirmTodo:{path:this.$store.state.recordPath}},this.$store.commit("SHOW_ALERT")},coverChange(e){this.coverImage=e},coverConfirm(){this.sendCover(this.coverImage.name)},coverCancel(){this.coverImage=null,this.articleVm.firstPhoto=""},sendCover(e){const t=new FormData;t.append("photo",this.coverImage.file),P(t).then((t=>{t.data.success?this.articleVm.firstPhoto=t.data.picname:(this.$notify({group:"error",title:"上傳圖片失敗 !"}),this.articleVm.firstPhoto=e)})).catch((e=>{}))},titleHandler(e){this.articleVm.title=this.titleError(e)},titleError(e){const t=this.errors.findIndex((t=>t===e.name));return e.error?(-1===t&&this.errors.push(e.name),""):(-1!==t&&this.errors.splice(t,1),e.value)},artInfoCountHandler:u.throttle((function(e){this.artInfoCount=e}),500),finalCountHandler:u.throttle((function(e){this.finalCount=e}),500),addTool(){this.articleVm.fArrayList.push({uuid:y(),secPhoto:"",mission:""})},addKiru(){this.articleVm.mArrayList.push({uuid:y(),thirdPhoto:"",main:""})},addMission(){this.articleVm.fMissionList.push({uuid:y(),auxiliary:"",auxiliarymain:""})},removeTool(e){const t=this.articleVm.fArrayList.findIndex((t=>t.uuid===e));this.articleVm.fArrayList.splice(t,1)},removeKiru(e){const t=this.articleVm.mArrayList.findIndex((t=>t.uuid===e));this.articleVm.mArrayList.splice(t,1)},removeMission(e){const t=this.articleVm.fMissionList.findIndex((t=>t.uuid===e));this.articleVm.fMissionList.splice(t,1)},checkHandler(e){const t=[];e.firstPhoto||t.push({key:"firstPhoto",anchor:"editor-kiru-cover",message:"必須上傳封面圖片 !"}),e.title||t.push({key:"title",anchor:"editor-kiru-title",message:"切切標題為必填 !"}),e.articlecategoryId||t.push({key:"articlecategoryId",anchor:"editor-kiru-category",message:"全站分類為必填 !"});const i=e.mArrayList.find((e=>!e.main));(0===e.mArrayList.length||i)&&t.push({key:"mArrayList",anchor:"editor-kiru-kiru",message:"切切內容不能留空 !"});return e.fMissionList.some((e=>""===e.auxiliary||""===e.auxiliarymain))&&t.push({key:"fMissionList",anchor:"editor-kiru-mission",message:"任務欄位不可為空 !"}),t.length?{success:!1,errors:t,message:"必填欄位未填"}:{success:!0,message:"文章編輯檢查成功"}},initData(e){this.$data[e]=this.$options.data()[e]}}},fe={class:"py-11 px-4 mx-auto max-w-[816px] md:px-8"},he={class:"kiruPartEffect"},pe={id:"editor-kiru-cover",class:"mb-8"},ge={id:"editor-kiru-title",class:"mb-12"},be=d("div",{class:"mb-2"},[d("h2",{class:"inline-block pr-4 text-xl font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-2xl"}," 切切標題 ")],-1),ye=d("div",{class:"mb-4 md:mb-6"},[d("h2",{class:"inline-block pr-4 mb-1 text-lg font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-2xl"}," 編輯資訊 ")],-1),xe={class:"kiruPartEffect"},ve={id:"editor-kiru-pay",class:"mb-6 md:mb-8"},we={class:"flex gap-8 items-center"},Ie=d("span",{class:"font-bold text-myBrown"}," 是否要把這篇設為付費閱讀 ? ",-1),ke=d("span",{class:"text-myBrown material-icons"},"info",-1),Ce=d("span",{class:"sr-only"},"是否要把這篇設為付費閱讀",-1),Ve={id:"editor-kiru-category",class:"mb-8 w-full sm:w-1/3"},Ae=d("h3",{class:"font-bold text-myBrown"}," 全站分類 ",-1),Le={id:"editor-kiru-introduction",class:"py-4 mb-6"},Me={class:"flex gap-2 items-center mb-2"},Pe=d("h3",{class:"font-bold text-myBrown"}," 切切敘述 ",-1),Be={class:"py-0.5 px-2 text-sm text-white bg-myBrown rounded"},$e=d("div",{class:"mb-2"},[d("h2",{class:"inline-block pr-4 mb-1 text-lg font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-2xl"}," 預備工具 ")],-1),He={id:"editor-kiru-tools",class:"mb-8 md:mb-12 kiruPartEffect"},je=d("p",{class:"mb-6 text-sm font-bold text-myBrown md:text-base"}," 會用到的物品、工具、材料、環境...等 ",-1),Oe={class:"flex justify-center my-4"},_e=[d("img",{src:ce,alt:"add item"},null,-1)],Ee={id:"editor-kiru-kiru",class:"mb-12 md:mb-16 kiruPartEffect"},Se=d("div",{class:"flex gap-3 items-center mb-8"},[d("h2",{class:"inline-block pr-4 mb-1 text-lg font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-3xl"}," 開始切切 "),d("span",{class:"text-sm font-bold text-red-400"},"請至少填寫 1 個切切")],-1),Fe={class:"flex justify-center my-4"},Ue=[d("img",{src:ce,alt:"add item"},null,-1)],Te=d("div",{class:"mb-2"},[d("h2",{class:"inline-block pr-4 mb-1 text-lg font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-2xl"}," 附屬任務 ")],-1),De={id:"editor-kiru-mission",class:"mb-12 md:mb-12 kiruPartEffect"},Re=d("div",{class:"mb-8 md:mb-12"},[c(" 說明 "),d("p",{class:"mb-6 text-sm font-bold text-myBrown md:text-base"}," 完成這個切切的補充知識與延伸是什麼呢? Ex.閱讀的書、相關的知識、要備妥的文件、要安裝的檔案... ")],-1),Ke={class:"flex justify-center my-4"},Ye=[d("img",{src:ce,alt:"add item"},null,-1)],We={id:"editor-kiru-remark",class:"mb-12 md:mb-12 kiruPartEffect"},Ne=d("h2",{class:"mb-1 text-2xl font-bold text-center text-myBrown md:mb-2"}," 附註與補充 ",-1),Ge={class:"flex justify-center md:justify-start"};var qe=M(ue,[["render",function(e,t,i,o,r,a){const l=_,u=S,p=E,g=x("SwitchLabel"),b=x("Switch"),y=x("SwitchGroup"),M=F,P=O,B=de,$=ie,H=z,j=s;return n(),m(w,null,[c(" 編輯文章頂部 Navbar "),f(l,{onSaveArticle:a.saveHandler,onPublishArticle:a.publishHandler},null,8,["onSaveArticle","onPublishArticle"]),d("div",fe,[d("div",he,[c(" 上傳圖片 "),d("div",pe,[f(u,{name:"cover",class:"max-w-[768px]","fix-text":"點我修改封面圖片","upload-bg":"bg-upload-cover","upload-container":"mb-4 w-full sm:w-2/3","orig-image":r.articleVm.firstPhoto,"edit-mode":r.editMode,onFileChange:a.coverChange,onFileConfirm:a.coverConfirm,onFileCancel:a.coverCancel},null,8,["orig-image","edit-mode","onFileChange","onFileConfirm","onFileCancel"])]),c(" 切切標題 "),d("div",ge,[be,f(p,{class:"w-full sm:w-2/3","error-class":"md:-right-2 md:translate-x-full md:top-1/2 md:-translate-y-1/2 md:absolute",placeholder:"按這裡輸入標題",name:"title","error-text":"標題為必填","default-value":r.articleVm.title,onUpdate:a.titleHandler},null,8,["default-value","onUpdate"])])]),ye,d("div",xe,[c(" 付費閱讀設定 "),d("div",ve,[f(y,null,{default:v((()=>[d("div",we,[f(g,{class:"flex gap-2 items-center"},{default:v((()=>[Ie,ke])),_:1}),f(b,{modelValue:r.articleVm.isFree,"onUpdate:modelValue":t[0]||(t[0]=e=>r.articleVm.isFree=e),class:V([r.articleVm.isFree?"bg-white":"bg-myBrown","mySwitchBar"])},{default:v((()=>[Ce,d("span",{class:V([r.articleVm.isFree?"translate-x-0":"translate-x-8","ring-myBrown mySwitchButton"])},null,2)])),_:1},8,["modelValue","class"])])])),_:1})]),c(" 全站分類 "),d("div",Ve,[Ae,d("div",null,[f(M,{modelValue:a.categoryHandler,"onUpdate:modelValue":t[1]||(t[1]=e=>a.categoryHandler=e),options:r.category,"key-prop":"Name","label-prop":"Name","default-text":"打開選單","options-position":"absolute"},null,8,["modelValue","options"])])]),c(" 切切敘述 "),d("div",Le,[d("div",Me,[Pe,d("span",Be,"字數 : "+h(r.artInfoCount),1)]),f(P,{modelValue:r.articleVm.introduction,"onUpdate:modelValue":t[2]||(t[2]=e=>r.articleVm.introduction=e),placeholder:"簡述一下這篇切切的內容吧 _","custom-class":"min-h-[6rem]","word-limit":"100",onWordCount:a.artInfoCountHandler},null,8,["modelValue","onWordCount"])])]),c(" 預備工具 "),$e,d("div",He,[c(" 說明 "),je,c(" 預備工具欄位 "),(n(!0),m(w,null,I(r.articleVm.fArrayList,(e=>(n(),A(B,L({key:e.uuid},e,{"orig-image":e.secPhoto,"edit-mode":r.editMode,onRemoveItem:a.removeTool,"onUpdate:tool":t=>e.mission=t,onToolImgUpload:t=>e.secPhoto=t}),null,16,["orig-image","edit-mode","onRemoveItem","onUpdate:tool","onToolImgUpload"])))),128)),c(" 新增欄位 "),d("div",Oe,[d("button",{type:"button",class:"flex before:block relative before:absolute before:top-6 hover:before:top-1 before:left-[55%] hover:before:left-[65%] justify-center py-2 w-1/2 before:w-6 before:h-6 before:bg-myYellow before:rounded-full before:opacity-0 hover:before:opacity-50 before:transition-all before:-translate-x-1/2",onClick:t[3]||(t[3]=(...e)=>a.addTool&&a.addTool(...e))},_e)])]),c(" 開始切切 "),d("div",Ee,[Se,(n(!0),m(w,null,I(r.articleVm.mArrayList,(e=>(n(),A($,L({key:e.uuid},e,{"orig-image":e.thirdPhoto,"orig-main":e.main,"edit-mode":r.editMode,onRemoveItem:a.removeKiru,onKiruContent:t=>e.main=t,onKiruImgUpload:t=>e.thirdPhoto=t}),null,16,["orig-image","orig-main","edit-mode","onRemoveItem","onKiruContent","onKiruImgUpload"])))),128)),c(" 新增欄位 "),d("div",Fe,[d("button",{type:"button",class:"flex before:block relative before:absolute before:top-6 hover:before:top-1 before:left-[55%] hover:before:left-[65%] justify-center py-2 w-1/2 before:w-6 before:h-6 before:bg-myYellow before:rounded-full before:opacity-0 hover:before:opacity-50 before:transition-all before:-translate-x-1/2",onClick:t[4]||(t[4]=(...e)=>a.addKiru&&a.addKiru(...e))},Ue)])]),c(" 附屬任務 "),Te,d("div",De,[Re,(n(!0),m(w,null,I(r.articleVm.fMissionList,(e=>(n(),A(H,L({key:e.uuid},e,{"edit-mode":r.editMode,onRemoveItem:a.removeMission,"onUpdate:title":t=>e.auxiliary=t,"onUpdate:link":t=>e.auxiliarymain=t}),null,16,["edit-mode","onRemoveItem","onUpdate:title","onUpdate:link"])))),128)),c(" 新增附屬任務欄位 "),d("div",Ke,[d("button",{type:"button",class:"flex before:block relative before:absolute before:top-6 hover:before:top-1 before:left-[55%] hover:before:left-[65%] justify-center py-2 w-1/2 before:w-6 before:h-6 before:bg-myYellow before:rounded-full before:opacity-0 hover:before:opacity-50 before:transition-all before:-translate-x-1/2",onClick:t[5]||(t[5]=(...e)=>a.addMission&&a.addMission(...e))},Ye)])]),c(" 附註與補充 "),d("div",We,[c(" finaldata "),Ne,f(P,{modelValue:r.articleVm.final,"onUpdate:modelValue":t[6]||(t[6]=e=>r.articleVm.final=e),placeholder:"補充事項、提醒、小撇步等等 _","custom-class":"min-h-[6rem]","word-limit":"100",onWordCount:a.artInfoCountHandler},null,8,["modelValue","onWordCount"])]),c(" 操作 "),d("div",Ge,[d("button",{type:"button",class:"userPageCancelButton",onClick:t[7]||(t[7]=(...e)=>a.cancelKiru&&a.cancelKiru(...e))}," 取消編輯 ")])]),f(j,k(C(r.alertInfo)),null,16)],64)}]]);export{qe as default};
