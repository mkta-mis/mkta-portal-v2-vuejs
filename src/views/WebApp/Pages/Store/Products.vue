<template>
          <NavBar />
          <br/>
          <div class="container text-black" >
               <breadCrumbs v-on:submit="get_Products" />
               <div class="row mb-4">
                    <div class="col-12">{{ products.length }} Results for: <span class="bg-grey p-2 rounded">{{ this.query }}</span> </div>
               </div>
               <div class="row" v-if="products.length >  0">
                    <Products_Thumbnail :data="item" v-for="(item, index) in products"  />
               </div>
          </div>
</template>
<script>
import Products_Thumbnail from '@/components/WebApp/Products/Products_Thumbnail.vue';
import breadCrumbs from "@/components/WebApp/Global/breadCrumbs.vue";
import NavBar from "@/components/WebApp/Global/NavBar.vue";
     export default {
          data() {
                    return {
                              query : '',
                              products : []
                    };
          },
          components: { NavBar, breadCrumbs, Products_Thumbnail },
          setup() {},
          
          beforeUpdate(){
          },
          created() {
               this.get_Products(decodeURI(this.$route.params.filter));
          },
          mounted() {
          },
          methods: {
               get_Products(query){
                    this.query = query;
                         this.$axios
                         .post( this.$serverURL + "api/" + "products/list", { 
                                   mode : query == '' ? 'all' : 'search',
                                   text : query,
                                   Token : localStorage.getItem('userToken')

                         })
                         .then((res) => {
                                   if (res.data.code == 200) {
                                             this.products = res.data.data;
                                   } else {

                                   }
                         }).catch((err) => {
                    });
               }
          },
     };
</script>
