var e=Object.defineProperty,t=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,s=(t,l,r)=>l in t?e(t,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[l]=r,a=(e,a)=>{for(var o in a||(a={}))l.call(a,o)&&s(e,o,a[o]);if(t)for(var o of t(a))r.call(a,o)&&s(e,o,a[o]);return e};import{m as o,C as n,r as c,o as m,c as d,d as i,h as x,w as b,aj as f,x as u}from"./vendor-358810ac.js";import{_ as p}from"./index-fe723f3a.js";const w={name:"IntroAbout",computed:a(a({},o(["userInfo"])),n(["userSignInStatus"]))},y={class:"flex flex-col items-center"},g=f('<div class="flex flex-col gap-8 items-center mb-16"><h2 class="font-bold tracking-wider text-center text-myYellow"> 生活是你的原料，想法是一把刀。<br> 準備你切好的材料，現在就將好菜端上桌! </h2><p class="max-w-md text-sm text-center text-myBrown"><span class="font-bold">切切 KiruKiru</span> 是幫你專注在切分步驟的文章分享網站，從換燈泡到寫程式，都可以透過網站的寫作引導下完成。 </p><div class="max-w-[232px]"><img src="/8th-kirukiru/assets/Logo-Full-outline-a5bc4f53.svg" alt="關於切切說明頁logo"></div><p class="max-w-md text-sm text-center text-myBrown"> 現代人生活緊湊，時間切分非常細，但也很容易在無形之中讓時間流走。 透過步驟寫作，記錄下你完成一件事的過程，<br class="hidden md:inline-block">也可以看看網友們是如何切分同一件事的步驟，<br class="hidden md:inline-block">讓你的生活 / 工作 / 娛樂，都充滿對時間的知覺。 </p></div><ul class="flex flex-col gap-16 items-center mb-12 md:gap-24"><li class="flex flex-col items-center"><h2 class="py-0.5 mb-6 w-full max-w-xs font-bold text-center text-myBrown rounded-lg border border-myBrown"> 書寫生活的片段 </h2><p class="text-sm leading-6 text-center text-myBrown"> 分享你的生活步驟也是種成就與教學哦！<br> 不一定是技能的專家也可以使用 ! 也可以當成是紀錄生活的工具：<br> 如何 WFH 度過一天？<br> 如何閱讀與吸收一本書？<br> 如何一個人去開刀？<br> 如何在廟裡拜拜？<br> 如何走完喪禮的流程？ </p></li><li class="flex flex-col items-center"><h2 class="py-0.5 mb-6 w-full max-w-xs font-bold text-center text-myBrown rounded-lg border border-myBrown"> 切切裡面黑白切 </h2><p class="text-sm leading-6 text-center text-myBrown"> 切切是以「步驟型文章」為主題的分享平台， 你可以在上面撰寫：<br> 如何微波冷凍食物、如何安排工作甘特圖、<br> 如何安裝水龍頭、如何用水果刀清除魚腸、<br> 如何使用外送點餐、如何在 Mac 環境安裝 nvm、<br> 精靈與螢火意志如何通關第9章劇情、 如何裝水...<br> -<br> 舉凡家庭五金、工作事項、科技使用、旅遊安排， 都可以在切切找到各自的步驟專家！ </p></li><li class="flex flex-col items-center"><h2 class="py-0.5 mb-6 w-full max-w-xs font-bold text-center text-myBrown rounded-lg border border-myBrown"> 切切特色報你知 </h2><div class="flex flex-col gap-6"><div class="text-center text-myBrown"><h3 class="mb-2 font-bold"> 步驟型的統一寫作格式 – </h3><p class="max-w-md text-sm leading-6"> 撰寫者只需跟著引導放上步驟資訊、圖片，閱讀者就能透過統一的文章格式閱讀！ 雙編輯模式也能讓你自由選擇，想自製或制式都能達成。 </p></div><div class="text-center text-myBrown"><h3 class="mb-2 font-bold"> 編輯精選的切切主題 – </h3><p class="max-w-md text-sm leading-6"> 職場步驟、生活步驟、閱讀步驟、運動步驟、廢到笑步驟... 跟隨著主題切分、撰寫與發覺你所喜歡的切切 ! </p></div></div></li></ul>',2),v={class:"flex flex-col items-center w-full"},h=i("div",null,[i("img",{src:"/8th-kirukiru/assets/about-ok-7b7d3a2b.svg",alt:"about ok"})],-1),k=u(" 加入切切 "),B=u(" 我的主頁 ");var j=p(w,[["render",function(e,t,l,r,s,a){const o=c("router-link");return m(),d("div",y,[g,i("div",v,[h,e.userSignInStatus?(m(),x(o,{key:1,to:{name:"UserDetail",params:{userId:e.userInfo.Username}},class:"block py-2 min-w-[192px] font-bold text-center text-myBrown bg-myYellow rounded-lg transition-all md:hover:-translate-x-0.5 md:hover:-translate-y-0.5"},{default:b((()=>[B])),_:1},8,["to"])):(m(),x(o,{key:0,to:{name:"SignUp"},class:"block py-2 min-w-[192px] font-bold text-center text-myBrown bg-myYellow rounded-lg transition-all md:hover:-translate-x-0.5 md:hover:-translate-y-0.5"},{default:b((()=>[k])),_:1}))])])}]]);export{j as default};
