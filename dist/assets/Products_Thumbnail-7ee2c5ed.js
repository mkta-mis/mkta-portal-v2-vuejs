import{_ as n,o as r,c,a as t,F as m,d as u,g as h,t as o,n as _}from"./index-6f9e8229.js";const g={props:{data:Object,initClass:{type:String,default:"col-12 col-s-12 col-md-6 col-lg-4"}},data(){return{}},components:{},setup(){},created(){},mounted(){},methods:{redirect(){let e=JSON.parse(localStorage.getItem("breadCrumbs"));e.length>1&&e.splice(1,e.length),e.push({urlTitle:"Product Card",title:this.data.code,urlKey:this.data.code,data:{code:this.data.code}}),localStorage.setItem("breadCrumbs",JSON.stringify(e)),this.$router.push({name:"Product Card",params:{code:this.data.code}})}}},b={class:"card text-grey rounded-0 border-0 h-100"},p=["src"],f={key:0,class:"card-body"},y={class:"row"},v=["title","src"],C={class:"card-body"},x={class:"card-title text-center h5"},S={class:"card-text h3 text-center"};function k(e,d,s,N,P,i){return r(),c("div",{class:_(s.initClass+" cursor-hand mb-4"),onClick:d[0]||(d[0]=a=>i.redirect())},[t("div",b,[t("img",{class:"card-img-top",style:{"min-height":"200px"},src:this.$serverURL+"resources/"+s.data.thumbnail.filename},null,8,p),s.data.variants.length>0?(r(),c("div",f,[t("div",y,[(r(!0),c(m,null,u(s.data.variants,(a,l)=>(r(),c("div",{class:"col-3 p-1",key:l},[t("img",{"data-bs-toggle":"tooltip",title:a.code+" - "+a.name,class:"w-100 border",src:this.$serverURL+"resources/"+a.thumbnail.filename},null,8,v)]))),128))])])):h("",!0),t("div",C,[t("p",x,o(s.data.code),1),t("p",S,o(s.data.name),1)])])],2)}const L=n(g,[["render",k]]);export{L as P};