<template>
<div :class="initClass + ' mb-4'" >
          <div class="card text-grey rounded-0 border-0">
                    <img class="card-img-top"  :src="this.$serverURL+'resources/' + data.imgSrc" />
                    <div class="card-body" v-if="data.variants.length > 0">
                              <div class="row">
                                        <div class="col-3 p-1" :key="var_index" 
                                                  v-for="(variant, var_index) in data.variants" >
                                                  <img 
                                                            class="w-100 border" 
                                                            :src="this.$serverURL+'resources/' + variant.imgSrc">
                                        </div>
                                        
                              </div>
                    </div>
                    <div class="card-body">
                              <p class="card-title text-center h5">{{ data.code }}</p>
                              <p class="card-text h3 text-center">{{ data.description }}</p>
                    </div>
          </div>
</div>
</template>
<script>
export default {
          props:{
                    data : [],
                    initClass : {
                              type :  String,
                              default : "col-12 col-md-4"
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
                    
          },
};
</script>