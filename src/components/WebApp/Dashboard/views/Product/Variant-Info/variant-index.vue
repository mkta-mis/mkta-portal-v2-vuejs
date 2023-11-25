<template>
          <v-row class="mt-3">
                    <v-col cols="12" sm="12" md="2">
                              <Product_Data_Thumbnail
                                        v-on:change="this.get_Product_Data();"
                              :data="variant_data" />
                    </v-col>
                    <v-col cols="12" sm="12" md="10">
                              <v-card flat>
                                        <v-card-text>
                                                  <v-text-field v-model="variant_data.name" label="Name" />
                                                  <v-text-field v-model="variant_data.code" label="Code" disabled />
                                        </v-card-text>
                                        <v-card-actions>
                                                  <v-spacer/>
                                                  <v-btn class="bg-success" @click="save_ProductInfo"><v-icon class="me-2">mdi-content-save</v-icon>Save</v-btn>
                                        </v-card-actions>
                              </v-card>
                    </v-col>
                    <v-col cols="12">
                              <v-tabs v-model="selectedTab" >
                                                  <v-tab value="Image360">
                                                            Image 360
                                                  </v-tab>
                                                  <v-tab value="Attributes">
                                                            Variant Attributes
                                                  </v-tab>
                              </v-tabs>
                                        <v-window v-model="selectedTab">
                                                  <v-window-item value="Image360">
                                                            <v-card flat>
                                                                      <v-card-text>
                                                                                A 360° Image of the Variant
                                                                      </v-card-text>
                                                                      <v-card-actions>
                                                                                <v-btn @click="get_Image360" variant="outlined"><v-icon class="me-2">mdi-refresh</v-icon>Refresh</v-btn>
                                                                      </v-card-actions>
                                                                      <v-card-text>
                                                                                <v-row style="height: 580px; overflow-y: auto;">
                                                                                          <v-col cols="12" sm="4" md="2" v-for="(img, index) in image360" :key="index">
                                                                                                    <Variant_Image v-on:change="get_Image360" :maxCount="image360.length" :img_data="img" />
                                                                                          </v-col>
                                                                                          <v-col cols="12" sm="4" md="2" class="justify-center align-center" @click="isAdding=true">
                                                                                                    <v-btn  height="200px" class="w-100" size="x-large"><v-icon class="me-2" :icon="'mdi-image-multiple'" />Add Image</v-btn>
                                                                                          </v-col>
                                                                                </v-row>
                                                                      </v-card-text>
                                                            </v-card>
                                                  </v-window-item>
                                                  <v-window-item value="Attributes">
                                                            <v-card-text>
                                                                      Variant Attributes are the properties of the product that is onyl applicable to this variant
                                                            </v-card-text>
                                                            <v-row>
                                                                      <v-col cols="12">
                                                                                <v-spacer />
                                                                                <v-btn @click="get_Components()" prepend-icon="mdi-refresh">Refresh</v-btn>
                                                                      </v-col>
                                                                      <add_Product_Data_Components v-on:change="get_Components" :data="variant_data" />
                                                                      <Product_Data_Components 
                                                                                v-on:change="get_Components" 
                                                                                v-on:remove="removed_Components" 
                                                                                :index="index" 
                                                                                :key="index"
                                                                                :components="data" 
                                                                                v-for="(data, index) in variantComponents"  />

                                                                      
                                                            </v-row>
                                                  </v-window-item>
                                        </v-window>
                              
                    </v-col>
          </v-row>
          <v-dialog v-model="isAdding" fullscreen>
                    <File_Upload 
                              :isSelectMultiple="true"
                              :isMultiple="true"
                              v-on:change="(data)=>{ 
                                                  append2image360(data); 
                                                  isAdding=false;
                                        }"
                              v-on:close="isAdding=false" 
                              :pageTitle="'Select Image for 360 View'"
                              :isDialog="true" />
          </v-dialog>
</template>
<script>

import File_Upload from '@/components/Files/File_Upload.vue';

import Product_Data_Thumbnail  from "@/components/WebApp/Dashboard/views/Product/Product-Info/components/Product_Data_Thumbnail.vue";
import add_Product_Data_Components    from "@/components/WebApp/Dashboard/views/Product/Product-Info/components/add_Product_Data_Components.vue";
import Product_Data_Components from "@/components/WebApp/Dashboard/views/Product/Product-Info/templateComponents/Product_Data_Components.vue";


import Variant_Image  from "@/components/WebApp/Dashboard/views/Product/Variant-Info/variant-image360-thumnail.vue";

export default {
          props: [  'variant_data', 'product_data' ],
          emits : ['change'],
          components: { 
                    Product_Data_Thumbnail, 
                    add_Product_Data_Components, 
                    Product_Data_Components, 
                    Variant_Image ,
                    File_Upload
          },
          setup() {

          },
          data () {
                    return {
                              selectedTab : '',
                              variantComponents : [],
                              image360 : [],
                              isAdding : false,
                              
                    }
          },
          created() {
          },
          mounted() {
                    this.get_Components();
                    this.get_Image360();
          },
          methods: {
                    removed_Components(index){
                              this.product.components.splice( index , 1 );
                    },
                    get_Components(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/" +this.variant_data.code , {
                                        product_id : this.variant_data.id
                               })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.variantComponents = res.data.components;
                                        } else {

                                        }
                              }).catch((err) => { });
                    },
                    append2image360(data){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/image360/action" , {
                                        product_id : this.variant_data.id,
                                        file_data : data,
                                        action : 'append'
                               })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.get_Image360();
                                        } 
                              }).catch((err) => { });
                    },
                    get_Image360(){
                              this.isAdding = false;
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/image360-collections"  , {
                                        product_id : this.variant_data.id
                               })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.image360 = res.data.results;
                                        } else {

                                        }
                              }).catch((err) => { });
                    },
                    set_Image360( action, data ){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/image360/action" , {
                                        product_id : data.product_id,
                                        file_id : data.file_id,
                                        index : data.index,
                                        action : action
                               })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.variantComponents = res.data.components;
                                        } else {

                                        }
                              }).catch((err) => { });
                    },
                    save_ProductInfo(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/full-info/update", {
                                        product_id : this.variant_data.id,
                                        tokenString : localStorage.getItem('userToken'),
                                        data : {
                                                  name : this.variant_data.name,
                                        }
                               })
                              .then((res) => {
                                        this.$emit('change');
                              }).catch((err) => { });
                    }
          } 
}
</script>