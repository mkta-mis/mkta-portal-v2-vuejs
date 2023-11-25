<template>
          <div class="container text-black" style="margin-top: -1.5rem!important;">
          <BreadCrumbs />
          <div class="row"  v-if="data != null">
                    <div class="col-12 mb-3">
                              <div class="row">
                                        <div class="col-12 col-md-6 d-flex">
                                                  <Image360 :code="selectedVariant.code"/>                             
                                        </div>
                                        <div class="col-12 col-md-6">
                                                  <ul class="list-group-item">
                                                            <li class="list-group-item bg-transparent border-0 mb-2 border-bottom">
                                                                      <label class="w-100 h2 text-black">
                                                                                {{ selectedVariant.name != '' ? selectedVariant.name : data.name }}
                                                                      </label>
                                                                      <span class="w-100 text-black h5">
                                                                                {{ selectedVariant.code }}
                                                                      </span>
                                                            </li>
                                                            <li class="list-group-item bg-transparent border-0 pb-2 border-bottom pt-2">
                                                                      <label class="text-muted">
                                                                                Variants
                                                                      </label>
                                                                      <div class="d-flex flex-wrap">
                                                                                <img  v-for="(variant, var_index) in data.variants" 
                                                                                          :key="var_index"
                                                                                          @click="()=>{ 
                                                                                                                        selectedVariant.code = variant.code;  
                                                                                                                        selectedVariant.name = variant.name;
                                                                                                                        variantComponents = variant.components;
                                                                                                    }"
                                                                                          data-bs-toggle="tooltip"
                                                                                          :title=" variant.code + ' - ' + variant.name"
                                                                                          :class="
                                                                                                              'border my-1 mx-2' +
                                                                                                              (variant.code == selectedVariant.code
                                                                                                                        ? ' border-info border-3 '
                                                                                                                        : '')
                                                                                                    "
                                                                                          style="  width: 80px; "
                                                                                          :src="this.$serverURL+'thumbnail/' + variant.code">
                                                                                
                                                                      </div>
                                                            </li>
                                                            <li class="list-group-item bg-transparent border-0 mt-4 mb-5 border-bottom" v-if="data.description !== undefined">
                                                                      <label class="text-muted w-100">Description</label>
                                                                      <p class="text-black">{{ data.description }}</p>
                                                            </li>
                                                            <Product_Measurements :data="data" />
                                                            
                                                  </ul>
                                        </div>
                              </div>
                    </div>
                    <div class="col-12 py-2" v-if="(baseComponents.length + variantComponents.length) > 0">
                              <v-row>
                                        <v-col cols="12" sm="12">
                                                  <h4>Properties</h4>
                                        </v-col>
                                        <template v-for="(component, index) in baseComponents" :key="index">
                                                  <template v-if="component.isVisible == 1">
                                                            <metaIndex :initClass="'col-12 col-md-6 col-lg-4 p-1'" :data="component"  />
                                                  </template>
                                                  
                                        </template>
                                        <template  v-for="(component, index) in variantComponents" :key="index">
                                                  <metaIndex :initClass="'col-12 col-md-6 col-lg-4 p-1'" :data="component"  />
                                        </template>
                              </v-row>
                    </div>
                    <Product_Related_GroupVue :code="this.data.code" />
                    <Product_Related_RecommendedVue :code="this.data.code" />
          </div>
          <div v-else class="row">
                    
          </div>
</div>
</template>
<script>
import BreadCrumbs from '@/components/WebApp/Global/breadCrumbs.vue';
import Image360 from '@/components/WebApp/Products/Product_Card/image360.vue';
import Products_Thumbnail from '@/components/WebApp/Products/Products_Thumbnail.vue';
import metaIndex from '@/components/WebApp/Products/metaObjects/meta-Index.vue';
import Product_Measurements from '@/components/WebApp/Products/Product_Card/components/Product_Measurements.vue';
import Product_Related_GroupVue from '@/components/WebApp/Products/Product_Card/components/Product_Related_Group.vue';
import Product_Related_RecommendedVue from '@/components/WebApp/Products/Product_Card/components/Product_Related_Recommended.vue';

export default {
          props:{
                    initClass : {
                              type :  String,
                              default : "col-12 col-md-4"
                    }
          },
          data() {
                    return {
                              data : null,
                              
                              baseComponents : [],
                              variantComponents : [],
                              selectedVariant : {
                                                  code : '',
                                                  name : '',
                                                  imgSrc : ''
                                        }
                              ,
                    };
          },
          components: { BreadCrumbs, Image360, metaIndex, Products_Thumbnail, Product_Measurements, Product_Related_GroupVue, Product_Related_RecommendedVue },
          setup() {},
          watch:{
          },
          created() {
                    this.selectedVariant.code = this.$route.params.code
                    this.get_Product_Data();
          },
          mounted() {},
          methods: {
                    get_Product_Data(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/full-info/" + this.$route.params.code , {
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.data = res.data.data;
                                                  this.baseComponents = this.data.components;
                                                  this.data.variants.forEach(element => {
                                                            if( this.$route.params.code == element.code ){
                                                                      this.selectedVariant.name = element.name;
                                                                      this.selectedVariant.code = element.code;
                                                                      this.variantComponents = element.components;
                                                            }
                                                  });
                                        } else {

                                        }
                              }).catch((err) => {

                              });  
                    },
          },
};
</script>