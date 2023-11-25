<template>
         <div class="container-fluid" style="z-index: 100; margin-top: -4rem!important;">
                    <div class="mx-n12" style="background-image: url('/src/assets/We Create We Produce.png'); background-size: 100% auto; background-position: center; height: 300px; "></div>	
          </div>
          <div class="container text-black" >
                    <breadCrumbs />
                    <div class="row">
                              <Categories_Thumnail v-for="(item, index) in data" 
                                                  :data="{
                                                       src : item.thumbnail['filename'],
                                                       urlKey : item.urlKey,
                                                       title : item.name
                                                  }"
                              />
                    </div>
          </div>
</template>
<script>
import breadCrumbs from '@/components/WebApp//Global/breadCrumbs.vue';
import SearchBar from '@/components/WebApp/Global/SearchBar.vue';
import Categories_Thumnail from '@/components/WebApp/Categories/Categories_Thumnail.vue';
export default {
          props:{
                    
          },
          data() {
                    return {
                         data : []
                    };
          },
          components: { Categories_Thumnail, SearchBar, breadCrumbs },
          setup() {},
          created() {
               this.get_Categories()
          },
          mounted() {},
          methods: {
                    search(){

                    },
                    get_Categories(){
                         this.$axios
                         .post( this.$serverURL + "api/" + "categories/web-store", {
                              Token : localStorage.getItem('userToken')
                         })
                         .then((res) => {
                              if (res.data.code == 200) {
                                   this.data = res.data.data;
                              } else {

                              }
                         }).catch((err) => {
                         });
                    }
          },
};
</script>