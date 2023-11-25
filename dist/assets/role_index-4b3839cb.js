import{_ as S,r as n,o as c,e as f,w as t,b as e,f as i,t as d,g as L,c as y,d as I,F as C}from"./index-93b9d787.js";const N={emits:["change","close"],components:{},setup(){},created(){this.get_Role(),this.get_Permissions()},mounted(){},data(){return{Role_data:[],Orig_data:[],Role_Permissions:[],Permissions:[]}},methods:{filter(){let s=this.Permissions,a=this.Role_Permissions,_=[];return a.forEach(r=>{_.push(r.key)}),s.filter(r=>_.indexOf(r.key)==-1)},action_Role_Permissions(s,a,_=0){let r="";switch(s){case"append":this.Role_Permissions.push(a),r="append-permission";break;case"remove":this.Role_Permissions.splice(_,1),r="remove-permission";break}this.$axios.post(this.$serverURL+"api/roles/web-admin/action",{tokenString:localStorage.getItem("userToken"),action:"update",key:a.key,roleIndex:this.$route.params.roleIndex,action:r}).then(l=>{}).catch(l=>{})},get_Role_Permissions(){this.$axios.post(this.$serverURL+"api/roles/web-admin/get",{mode:"exact-index-permissions",roleIndex:this.$route.params.roleIndex}).then(s=>{s.data.code==200&&(this.Role_Permissions=s.data.results)}).catch(s=>{})},get_Role(){this.$axios.post(this.$serverURL+"api/roles/web-admin/get",{mode:"exact-index",roleIndex:this.$route.params.roleIndex}).then(s=>{s.data.code==200&&(this.Role_data=s.data.results,this.Orig_data=JSON.parse(JSON.stringify(this.Role_data)),this.get_Role_Permissions())}).catch(s=>{})},submit(){this.$axios.post(this.$serverURL+"api/roles/web-admin/action",{tokenString:localStorage.getItem("userToken"),action:"update",data:{roleIndex:this.Role_data.id,title:this.Role_data.title,description:this.Role_data.description}}).then(s=>{this.get_Role()}).catch(s=>{})},get_Permissions(){this.show_Registration=!1,this.$axios.post(this.$serverURL+"api/permissions/web-admin/get",{}).then(s=>{s.data.code==200&&(this.Permissions=s.data.results,this.set_Paginate())}).catch(s=>{})}}};function T(s,a,_,r,l,h){const u=n("v-card-title"),V=n("v-text-field"),U=n("v-textarea"),m=n("v-card-text"),v=n("v-spacer"),$=n("v-icon"),g=n("v-btn"),R=n("v-card-actions"),b=n("v-card-subtitle"),x=n("v-card"),p=n("v-col"),k=n("v-row"),w=n("v-card-item");return c(),f(x,null,{default:t(()=>[e(u,null,{default:t(()=>[i(d(s.$route.meta.contentTitle),1)]),_:1}),e(m,null,{default:t(()=>[e(V,{modelValue:l.Role_data.title,"onUpdate:modelValue":a[0]||(a[0]=o=>l.Role_data.title=o),"prepend-inner-icon":"mdi-format-title","persistent-hint":"",hint:"Title"},null,8,["modelValue"]),e(U,{modelValue:l.Role_data.description,"onUpdate:modelValue":a[1]||(a[1]=o=>l.Role_data.description=o),"prepend-inner-icon":"mdi-format-align-justify","persistent-hint":"",hint:"Description"},null,8,["modelValue"])]),_:1}),e(R,null,{default:t(()=>[e(v),l.Role_data.title!=l.Orig_data.title||l.Role_data.description!=l.Orig_data.description?(c(),f(g,{key:0,class:"bg-success",onClick:h.submit},{default:t(()=>[e($,{class:"me-1"},{default:t(()=>[i("mdi-content-save")]),_:1}),i("Update Role Information")]),_:1},8,["onClick"])):L("",!0)]),_:1}),e(k,null,{default:t(()=>[e(p,{cols:"12",sm:"12",md:"6"},{default:t(()=>[e(w,null,{default:t(()=>[e(u,null,{default:t(()=>[i(" Permissions ")]),_:1}),e(m,null,{default:t(()=>[e(k,null,{default:t(()=>[(c(!0),y(C,null,I(l.Role_Permissions,(o,P)=>(c(),f(p,{cols:"12",md:"6"},{default:t(()=>[e(x,{elevation:6,class:"p-2"},{default:t(()=>[e(u,null,{default:t(()=>[i(d(o.title)+" ",1),e(b,{class:"text-danger"},{default:t(()=>[i(d(o.key),1)]),_:2},1024)]),_:2},1024),e(m,null,{default:t(()=>[i(d(o.description),1)]),_:2},1024),e(R,null,{default:t(()=>[e(v),e(g,{onClick:O=>h.action_Role_Permissions("remove",o,P),class:"bg-danger text-white","prepend-icon":"mdi-close"},{default:t(()=>[i("Remove")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),256))]),_:1})]),_:1})]),_:1})]),_:1}),e(p,{cols:"12",sm:"12",md:"6"},{default:t(()=>[e(w,null,{default:t(()=>[e(u,null,{default:t(()=>[i(" Available Permissions ")]),_:1}),e(m,null,{default:t(()=>[e(k,null,{default:t(()=>[(c(!0),y(C,null,I(this.filter(),(o,P)=>(c(),f(p,{cols:"12",md:"6"},{default:t(()=>[e(x,{elevation:6,class:"p-2"},{default:t(()=>[e(u,null,{default:t(()=>[i(d(o.title)+" ",1),e(b,{class:"text-danger"},{default:t(()=>[i(d(o.key),1)]),_:2},1024)]),_:2},1024),e(m,null,{default:t(()=>[i(d(o.description),1)]),_:2},1024),e(R,null,{default:t(()=>[e(v),e(g,{onClick:O=>h.action_Role_Permissions("append",o,P),class:"bg-success text-white","prepend-icon":"mdi-plus"},{default:t(()=>[i("Append")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),256))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const A=S(N,[["render",T]]);export{A as default};
