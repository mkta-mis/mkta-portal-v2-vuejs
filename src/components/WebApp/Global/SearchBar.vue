<template>
          <!-- <div class="container text-black" > -->
                    <v-text-field 
                         clearable 
                         v-model="filter"
                         class="bg-white mt-n6 mb-6" 
                         label="Search"  
                         append-inner-icon="mdi-magnify"
                         style="z-index: 200!important;" @keyup.enter="search" />
          <!-- </div> -->
</template>
<script>
          export default {
                    data() {
                              return {
                                        filter : ''
                              };
                    },
                    emits : ['submit'],
                    components: {  },
                    setup() {},
                    created() {
                    },
                    mounted() {},
                    methods: {
                              search(){

                                        let crumbs = JSON.parse(localStorage.getItem('breadCrumbs'))
                                        crumbs = [];
                                        localStorage.setItem('breadCrumbs', JSON.stringify(crumbs))
                                        if( this.$route.name == 'Product List Query' ){
                                             this.$emit('submit',this.filter)
                                        }else{
                                             this.$router.push({name: "Product List Query", params : {
                                                       filter : encodeURI(this.filter)
                                             } } );
                                        }
                                        
                              }
                    },
          };
</script>