<template>
          <v-row>
                    <v-col xs="12" sm="12">
                              <router-link :to="{ name: 'Dashboard Product', params: {}}">
                                        <v-btn color="purple"><v-icon>mdi-chevron-left</v-icon>Back</v-btn>
                              </router-link>
                    </v-col>
                    <v-col xs="12" sm="12" v-if="product != null">
                              <v-card :loading="isLoading">
                                        <v-card-title>
                                                  {{ $route.meta.contentTitle }}
                                        </v-card-title>
                                        <v-card-text>
                                                  <v-tabs v-model="tab">
                                                            <v-tab value="Base Product Information">Product Information</v-tab>
                                                            <v-tab value="Variants">Variants ( {{ this.product.variants.length }} )</v-tab>
                                                  </v-tabs>
                                                  <v-window v-model="tab">
                                                            <v-window-item disabled  value="Base Product Information">
                                                                      <v-card>
                                                                                <v-card-text>
                                                                                          <v-row>
                                                                                                    <v-col cols="12" xs="12" sm="4" md="3" lg="3" >
                                                                                                              <Product_Data_Thumbnail :data="product" v-on:change="()=>{get_Product_Data(); }"  />
                                                                                                    </v-col>
                                                                                                    <v-col cols="12" xs="12" sm="8" md="6" lg="6">
                                                                                                              <v-card flat :elevation="0">
                                                                                                                        <v-card-text>
                                                                                                                                  <v-text-field hint="Name" class="my-1" persistent-hint v-model="product.name"></v-text-field>
                                                                                                                                  <v-text-field disabled hint="Code" class="my-1 text-black disabled" persistent-hint v-model="product.code"></v-text-field>
                                                                                                                                  <v-textarea  class="my-1" hint="Description" persistent-hint v-model="product.description"></v-textarea>
                                                                                                                        </v-card-text>
                                                                                                                        <v-card-actions>
                                                                                                                                  <v-spacer></v-spacer>
                                                                                                                                  <v-btn
                                                                                                                                            v-show="
                                                                                                                                                      ( product.name != originalData.name ) ||
                                                                                                                                                      ( product.code != originalData.code ) ||
                                                                                                                                                      ( product.description != originalData.description ) ||
                                                                                                                                                      ( JSON.stringify(product.category_trace) != JSON.stringify(originalData.category_trace) )
                                                                                                                                            "
                                                                                                                                            class="bg-success"
                                                                                                                                            @click="save_ProductInfo"
                                                                                                                                            ><v-icon class="me-2">mdi-content-save</v-icon>Save</v-btn>
                                                                                                                        </v-card-actions>
                                                                                                              </v-card> 
                                                                                                    </v-col>
                                                                                                    <v-col cols="12" xs="12" sm="12" md="3" lg="3" class="border border-1 border-dark rounded" style="overflow-x: auto;">
                                                                                                              <Categories_Index 
                                                                                                                        :main_tree="originalData.category_trace === undefined ? [] : originalData.category_trace" v-on:change="(data)=>{ 
                                                                                                                        this.product.category_trace = data;
                                                                                                              }" />
                                                                                                    </v-col>
                                                                                                    <v-col cols="12" xs="12" sm="12">
                                                                                                              <v-tabs v-model="SelectedTab">
                                                                                                                        <!-- <v-tab value="Category">Category</v-tab> -->
                                                                                                                        <v-tab value="Measurement">Measurements</v-tab>
                                                                                                                        <v-tab value="Attributes">Base Attributes</v-tab>
                                                                                                                        <v-tab value="Group">Group Products</v-tab>
                                                                                                                        <v-tab value="Recommended">Recommended Products</v-tab>
                                                                                                              </v-tabs>
                                                                                                              <v-window v-model="SelectedTab">
                                                                                                                        <v-window-item disabled value="Measurement" class="p-2">
                                                                                                                                  <Product_Data_Measurement :item="product" />
                                                                                                                        </v-window-item>
                                                                                                                        <v-window-item disabled value="Attributes">
                                                                                                                                  <small>Base Attributes are the properties of the product that is common to each variants</small>
                                                                                                                                  <v-row>
                                                                                                                                            <v-col cols="12">
                                                                                                                                                      <v-spacer />
                                                                                                                                                      <v-btn @click="get_Components()" prepend-icon="mdi-refresh">Refresh</v-btn>
                                                                                                                                            </v-col>
                                                                                                                                            <add_Product_Data_Components v-on:change="get_Components" :data="this.product" />
                                                                                                                                            <Product_Data_Components 
                                                                                                                                                      v-on:change="get_Components" 
                                                                                                                                                      v-on:remove="removed_Components" 
                                                                                                                                                      :key="index"
                                                                                                                                                      :index="index" 
                                                                                                                                                      :components="data" 
                                                                                                                                                      v-for="(data, index) in product.components"  />

                                                                                                                                            
                                                                                                                                  </v-row>
                                                                                                                        </v-window-item>
                                                                                                                        <v-window-item disabled value="Group">
                                                                                                                                  <!-- Coming Soon -->
                                                                                                                                  <relatedProductsIndex :product="this.product" :type="0" />
                                                                                                                        </v-window-item>
                                                                                                                        <v-window-item disabled value="Recommended">
                                                                                                                                  <!-- Coming Soon -->
                                                                                                                                  <relatedProductsIndex :product="this.product" :type="1" />
                                                                                                                        </v-window-item>
                                                                                                              </v-window>         
                                                                                                    </v-col>
                                                                                          </v-row>
                                                                                </v-card-text>
                                                                      </v-card>
                                                            </v-window-item>
                                                            <v-window-item disabled  value="Variants"> 
                                                                      <v-tabs  v-model="selectedVariants" color="">
                                                                                <v-tab  v-for="(vars, varIndex) in product.variants" :value="vars.id" :key="varIndex">{{ vars.code }}</v-tab>
                                                                                <v-spacer></v-spacer>
                                                                                <v-btn @click="isAdding=true" class="mt-2" :elevation="0" color="purple">Add Variant</v-btn>
                                                                      </v-tabs>
                                                                      <v-window v-model="selectedVariants">
                                                                                <v-window-item v-for="(vars, varIndex) in product.variants" :value="vars.id" :key="varIndex">
                                                                                          <Variant_Data :product_data="this.product" :variant_data="vars" />
                                                                                </v-window-item>
                                                                      </v-window>
                                                                      
                                                            </v-window-item>
                                                  </v-window>
                                        </v-card-text>
                              </v-card>
                    </v-col>
          </v-row>
          <v-dialog v-model="isAdding" fullscreen>
                    <Variant_Add 
                              :variants_data="product.variants"
                              :product_data="product"
                              v-on:change="()=>{ isAdding=false; this.get_Product_Data() }" 
                              v-on:close="isAdding=false"
                              />
          </v-dialog>
</template>
<script>
import add_Product_Data_Components    from "@/components/WebApp/Dashboard/views/Product/Product-Info/components/add_Product_Data_Components.vue";
import Product_Data_Thumbnail  from "@/components/WebApp/Dashboard/views/Product/Product-Info/components/Product_Data_Thumbnail.vue";
import Product_Data_Measurement    from "@/components/WebApp/Dashboard/views/Product/Product-Info/components/Product_Data_Measurement.vue";
import Product_Data_Components from "@/components/WebApp/Dashboard/views/Product/Product-Info/templateComponents/Product_Data_Components.vue";

import Variant_Data  from "@/components/WebApp/Dashboard/views/Product/Variant-Info/variant-index.vue";
import Variant_Add  from "@/components/WebApp/Dashboard/views/Product/Variant-Info/variant-add.vue";


import Categories_Index from "@/components/WebApp/Products/Product_Card/components/Category/Cat_Selector_index.vue";

import relatedProductsIndex from "@/components/WebApp/Dashboard/views/Product/Related-Products/related-products-index.vue";

export default {
          props: [ 'code' ],
          components: { 
                    add_Product_Data_Components,
                    Product_Data_Thumbnail,
                    Product_Data_Components,
                    Product_Data_Measurement,
                    Variant_Add,
                    Variant_Data,
                    Categories_Index,
                    relatedProductsIndex
          },
          setup() {

          },
          data () {
                    return {
                             product : null,
                             tab : '',
                             isAdding : false,
                             selectedVariants : '',
                             originalData : [],
                             SelectedTab: 'Measurement',

                             isLoading : false
                    }
          },
          created() {
                    this.get_Product_Data();
          },
          mounted() {
                    
          },
          methods: {
                    removed_Components(index){
                              this.product.components.splice(index,1);
                    },
                    get_Product_Data(){
                              this.isLoading = true
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/full-info/" +this.code , { })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.product = res.data.data;
                                                  this.originalData = JSON.parse(JSON.stringify(this.product))
                                                  this.get_Components();
                                        } else {

                                        }
                              }).catch((err) => { });
                    },
                    get_Components (){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/" +this.code , {
                                        product_id : this.product.id
                               })
                              .then((res) => {
                                        if (res.data.code == 200) {

                                                  this.isLoading = false
                                                  this.product.components = res.data.components;
                                        } else {

                                        }
                              }).catch((err) => { });
                    },
                    save_ProductInfo(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/full-info/update", {
                                        product_id : this.product.id,
                                        tokenString : localStorage.getItem('userToken'),
                                        category_data : this.product.category_trace,
                                        data : {
                                                  name : this.product.name,
                                                  description : this.product.description
                                        }
                               })
                              .then((res) => {
                                        this.get_Product_Data();
                                        
                              }).catch((err) => { });
                    }
          },
          
}
</script>
