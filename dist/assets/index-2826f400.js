import{_ as T,r as n,o as i,e as m,w as o,b as t,g as p,f as d,t as g,c as h,d as P,F as x,a}from"./index-93b9d787.js";const D={emits:["change","close"],props:{isDialog:{default:!1,type:Boolean},pageTitle:{default:"Customer Registration",type:String}},data(){return{name:"",mail:"",errors:[],isReadonly:!1,roles:[]}},components:{},setup(){},created(){this.password=""},mounted(){},methods:{submit(){this.errors=[],this.mail==""&&this.errors.push("Email is required"),this.name==""&&this.errors.push("Name is required"),!(this.errors.length>0)&&this.$axios.post(this.$serverURL+"api/customers/web-admin/register",{tokenString:localStorage.getItem("userToken"),data:{email:this.mail,name:this.name}}).then(l=>{l.data.code==200?(this.password=l.data.user_data.password,this.isReadonly=!0):l.data.code==202?this.errors.push("Email is already taken"):(this.errors.push("Something went wrong please try again later."),this.name="",this.mail="",this.errors=[],this.isReadonly=!1)}).catch(l=>{})}}},B={class:"table"},E=a("th",{class:"text-end"}," Password : ",-1),z={class:"fs-2 text-center"};function F(l,e,R,N,s,_){const f=n("v-spacer"),c=n("v-btn"),v=n("v-card-actions"),C=n("v-card-title"),k=n("v-text-field"),V=n("v-list-item"),y=n("v-list"),b=n("v-col"),S=n("v-row"),U=n("v-card-text"),w=n("v-icon"),r=n("v-card");return i(),m(r,{class:"bg-white h-100"},{default:o(()=>[R.isDialog?(i(),m(v,{key:0,"fixed-header":""},{default:o(()=>[t(f),t(c,{fab:"",icon:"mdi-close",class:"bg-danger text-white",onClick:e[0]||(e[0]=u=>l.$emit("close"))})]),_:1})):p("",!0),t(C,{"fixed-header":""},{default:o(()=>[d(g(R.pageTitle),1)]),_:1}),t(U,null,{default:o(()=>[t(S,{justify:"center"},{default:o(()=>[t(b,{cols:"12",sm:"12"},{default:o(()=>[t(k,{readonly:s.isReadonly,modelValue:s.name,"onUpdate:modelValue":e[1]||(e[1]=u=>s.name=u),"prepend-inner-icon":"mdi-account","persistent-hint":"",hint:"Full Name"},null,8,["readonly","modelValue"]),t(k,{readonly:s.isReadonly,modelValue:s.mail,"onUpdate:modelValue":e[2]||(e[2]=u=>s.mail=u),"prepend-inner-icon":"mdi-web","persistent-hint":"",hint:"Email Address"},null,8,["readonly","modelValue"]),t(y,{density:"compact"},{default:o(()=>[(i(!0),h(x,null,P(s.errors,u=>(i(),m(V,null,{default:o(()=>[d(g(u),1)]),_:2},1024))),256))]),_:1})]),_:1}),s.isReadonly?(i(),m(b,{key:0,cols:"12",sm:"12"},{default:o(()=>[a("table",B,[a("tr",null,[E,a("th",z,g(l.password),1)])])]),_:1})):p("",!0)]),_:1})]),_:1}),t(v,null,{default:o(()=>[s.isReadonly?(i(),m(c,{key:0,onClick:e[3]||(e[3]=u=>l.$emit("close")),class:"bg-danger text-white"},{default:o(()=>[t(w,{class:"me-1"},{default:o(()=>[d("mdi-close")]),_:1}),d("Close")]),_:1})):p("",!0),t(f),s.isReadonly?p("",!0):(i(),m(c,{key:1,onClick:_.submit,class:"bg-success"},{default:o(()=>[t(w,{class:"me-1"},{default:o(()=>[d("mdi-account-plus")]),_:1}),d("Register Customer")]),_:1},8,["onClick"]))]),_:1})]),_:1})}const I=T(D,[["render",F]]),L={emits:["change","close"],components:{CustomerRegistration:I},props:{userToken:{type:String,default:localStorage.getItem("userToken")}},data(){return{show_Registration:!1,data:[],paginate:[],curPage:1,chunkSize:10,search:"",users:[]}},setup(){},created(){this.get_Users()},mounted(){},methods:{set_Paginate(l){this.paginate=[];for(let e=0;e<l.length;e+=this.chunkSize)this.paginate.push(l.slice(e,e+this.chunkSize));this.curPage=1},get_Users(){this.$axios.post(this.$serverURL+"api/customers/web-admin/list",{tokenString:localStorage.getItem("userToken")}).then(l=>{l.data.code==200&&(this.data=l.data.results,this.set_Paginate(this.data))}).catch(l=>{})}}},q=a("thead",null,[a("tr",null,[a("th",{class:"text-left"}," Name "),a("th",{class:"text-left"}," Email "),a("th",{class:"text-left",style:{"max-width":"150px"}})])],-1),j={key:0};function A(l,e,R,N,s,_){const f=n("v-card-title"),c=n("v-btn"),v=n("v-card-actions"),C=n("v-text-field"),k=n("router-link"),V=n("v-table"),y=n("v-card-text"),b=n("v-pagination"),S=n("v-card"),U=n("CustomerRegistration"),w=n("v-dialog");return i(),h(x,null,[t(S,null,{default:o(()=>[t(f,null,{default:o(()=>[d(" Customers ")]),_:1}),t(v,null,{default:o(()=>[t(c,{"prepend-icon":"mdi-refresh",onClick:e[0]||(e[0]=()=>{_.get_Users()}),class:"bg-info border"},{default:o(()=>[d(" Refresh ")]),_:1}),t(c,{"prepend-icon":"mdi-plus",onClick:e[1]||(e[1]=()=>{s.show_Registration=!0}),class:"bg-info border"},{default:o(()=>[d(" Register Customers ")]),_:1})]),_:1}),t(y,null,{default:o(()=>[t(C,{modelValue:s.search,"onUpdate:modelValue":e[2]||(e[2]=r=>s.search=r)},null,8,["modelValue"]),t(V,{search:s.search},{default:o(()=>[q,a("tbody",null,[(i(!0),h(x,null,P(s.paginate[s.curPage-1],r=>(i(),h(x,{key:r.email},[r.userToken!=this.userToken?(i(),h("tr",j,[a("td",null,g(r.name),1),a("td",null,g(r.email),1),a("td",null,[t(k,{to:{name:"Dashboard Customers Data",params:{customerToken:r.userToken}}},{default:o(()=>[t(c,{fab:"",color:"primary",class:"my-1",icon:"mdi-eye"})]),_:2},1032,["to"])])])):p("",!0)],64))),128))])]),_:1},8,["search"])]),_:1}),t(y,null,{default:o(()=>[t(b,{modelValue:s.curPage,"onUpdate:modelValue":e[3]||(e[3]=r=>s.curPage=r),length:s.paginate.length,"total-visible":7},null,8,["modelValue","length"])]),_:1})]),_:1}),t(w,{modelValue:s.show_Registration,"onUpdate:modelValue":e[6]||(e[6]=r=>s.show_Registration=r),width:"800",persistent:""},{default:o(()=>[t(U,{isDialog:!0,onClose:e[4]||(e[4]=()=>{_.get_Users(),s.show_Registration=!1}),onChange:e[5]||(e[5]=()=>{_.get_Users(),s.show_Registration=!1})})]),_:1},8,["modelValue"])],64)}const H=T(L,[["render",A]]);export{H as default};
