import{P as h}from"./Products_Thumbnail-40c13edd.js";import{N as b,b as f}from"./breadCrumbs-16d1040f.js";import{_ as g,r as a,o,c,b as n,a as t,f as v,t as d,F as u,d as x,g as N,e as P}from"./index-a03fb613.js";const k={data(){return{query:"",products:[]}},components:{NavBar:b,breadCrumbs:f,Products_Thumbnail:h},setup(){},beforeUpdate(){},created(){this.get_Products(decodeURI(this.$route.params.filter))},mounted(){},methods:{get_Products(e){this.query=e,this.$axios.post(this.$serverURL+"api/products/list",{mode:e==""?"all":"search",text:e,Token:localStorage.getItem("userToken")}).then(s=>{s.data.code==200&&(this.products=s.data.data)}).catch(s=>{})}}},B=t("br",null,null,-1),T={class:"container text-black"},C={class:"row mb-4"},y={class:"col-12"},S={class:"bg-grey p-2 rounded"},V={key:0,class:"row"};function R(e,s,U,$,r,l){const i=a("NavBar"),_=a("breadCrumbs"),m=a("Products_Thumbnail");return o(),c(u,null,[n(i),B,t("div",T,[n(_,{onSubmit:l.get_Products},null,8,["onSubmit"]),t("div",C,[t("div",y,[v(d(r.products.length)+" Results for: ",1),t("span",S,d(this.query),1)])]),r.products.length>0?(o(),c("div",V,[(o(!0),c(u,null,x(r.products,(p,w)=>(o(),P(m,{data:p},null,8,["data"]))),256))])):N("",!0)])],64)}const q=g(k,[["render",R]]);export{q as default};