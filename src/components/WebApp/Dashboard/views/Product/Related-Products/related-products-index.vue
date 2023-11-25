<template>
          <v-card flat class="pt-3">
                    <v-card-actions>
                             <v-btn flat prepend-icon="mdi-refresh" @click="get_Related_Data()">Refresh</v-btn> 
                    </v-card-actions>
                    <v-row >
                              <v-col cols="12" md="4" lg="2" class="d-flex justify-center align-center" style="min-height: 200px;">
                                        <v-btn @click="isAdding = true" stacked prepend-icon="mdi-plus" class="bg-success">Add {{ type == 0 ? 'Group' : 'Recommended' }} Products</v-btn>
                              </v-col>
                              <v-col cols="12" md="4" lg="2" style="min-height: 200px;" v-for="(data, dataIndex) in related" :key="dataIndex">
                                        <v-card flat>
                                                  <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn prepend-icon="mdi-close" class="bg-danger text-white" variant="outlined" @click="remove_Related_Product(data.id)">Remove</v-btn>
                                                            <v-spacer></v-spacer>
                                                  </v-card-actions>
                                                  <relatedProductsThumbnailVue :isThumbnail="false" :data="data" />
                                        </v-card>                                        
                              </v-col>
                    </v-row>
          </v-card>
          <v-dialog v-model="isAdding" fullscreen persistent>
                    <relatedProductsAdd v-on:close="isAdding = false" v-on:change="()=>{ isAdding = false; get_Related_Data() }" :type="type" :main="this.product.id" />
          </v-dialog>
</template>
<script>
import relatedProductsAdd from "@/components/WebApp/Dashboard/views/Product/Related-Products/related-products-add.vue";
import relatedProductsThumbnailVue from "@/components/WebApp/Dashboard/views/Product/Related-Products/related-products-thumbnail.vue";

export default {
          props : [ 'product', 'type'],
          emits: ['close', 'change'],
          components: { relatedProductsAdd, relatedProductsThumbnailVue },
          setup() {

          },
          data() {
                    return {
                              isAdding : false,
                              related : []
                    }
          },
          created() {
                    this.get_Related_Data();
          },
          mounted() {
          },
          methods: {
                    remove_Related_Product(product_id) {
                              this.$axios
                                        .post(this.$serverURL + "api/" + "products/data/related/action", {
                                                  mode: 'remove',
                                                  product_id: this.product.id,
                                                  target_id: product_id,
                                                  relation_type: this.type
                                        })
                                        .then((res) => {
                                                  this.get_Related_Data();
                                        }).catch((err) => {
                                        });
                    },
                    get_Related_Data() {
                              this.$axios
                                        .post(this.$serverURL + "api/products/data/related/" + this.product.code + "/" +  (this.type == 0 ? 'group' : 'related'), {
                                        })
                                        .then((res) => {
                                                  if (res.data.code == 200) {
                                                            this.related = res.data.results;
                                                  } else {

                                                  }
                                        }).catch((err) => {

                                        });
                    },

          }
}
</script>