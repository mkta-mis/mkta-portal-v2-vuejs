<template>
<div :class="initClass + ' cursor-hand mb-4'"  @click="redirect()">
          <div class="card text-grey rounded-0 border-0 h-100 ">
                    <img class="card-img-top" style="min-height: 200px;"  :src="this.$serverURL+'resources/' + data.thumbnail.filename" />
                    <div class="card-body" v-if="data.variants.length > 0">
                              <div class="row">
                                        <div class="col-3 p-1" :key="var_index" 
                                                  v-for="(variant, var_index) in data.variants" >
                                                  <img 
                                                            data-bs-toggle="tooltip"
                                                            :title=" variant.code + ' - ' + variant.name"
                                                            class="w-100 border" 
                                                            :src="this.$serverURL+'resources/' + variant.thumbnail['filename']">
                                        </div>
                                        
                              </div>
                    </div>
                    <div class="card-body">
                              <p class="card-title text-center h5">{{ data.code }}</p>
                              <p class="card-text h3 text-center">{{ data.name }}</p>
                    </div>
          </div>
</div>
</template>
<script>
export default {
          props:{
                    data : Object,
                    initClass : {
                              type :  String,
                              default : "col-12 col-s-12 col-md-6 col-lg-4"
                    }
          },
          data() {
                    return {};
          },
          components: {  },
          setup() {},
          created() {},
          mounted() {},
          methods: {
                    redirect(){
                              let crumbs = JSON.parse(localStorage.getItem('breadCrumbs'))
                              if( crumbs.length > 1){
                                        crumbs.splice(1, crumbs.length);
                              }
                              crumbs.push({
                                        urlTitle : 'Product Card',
                                        title: this.data.code,
                                        urlKey: this.data.code,
                                        data : { code :  this.data.code }
                              });
                              localStorage.setItem('breadCrumbs',JSON.stringify(crumbs))
                              this.$router.push({ name:'Product Card', params: { code : this.data.code } });
                    }
          },
};
</script>