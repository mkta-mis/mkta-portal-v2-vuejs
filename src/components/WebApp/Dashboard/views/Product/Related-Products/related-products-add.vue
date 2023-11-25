<template>
          <v-card flat>
                    <v-card-title fixed-header>
                              {{ this.type == 0 ? 'Group' : 'Related' }} Products
                              <v-btn icon="mdi-close" @click="$emit('close')" class="text-white bg-danger float-end"  fab/>
                    </v-card-title>
                    <v-card-actions>
                              <v-text-field 
                                        clearable 
                                        v-model="search" 
                                        label="Search" 
                                        @keydown.enter="get_Products(search)"
                                        />

                    </v-card-actions>
                    <v-card-text>
                              <v-row height="80vh">
                                        <v-col cols="12" md="4" lg="3" v-for="(data, index) in this.products" :key="index">
                                                  
                                                  <v-card flat>
                                                            <relatedProductsThumbnailVue :isThumbnail="false" :data="data" />
                                                            <v-card-actions>
                                                                      <v-spacer></v-spacer>
                                                                      <v-btn prepend-icon="mdi-plus" variant="outlined" @click="add_Related_Product(data.id)">Append</v-btn>
                                                                      <v-spacer></v-spacer>
                                                            </v-card-actions>
                                                  </v-card>
                                        </v-col>
                              </v-row>
                    </v-card-text>
                    
          </v-card>          
</template>
<script>
import relatedProductsThumbnailVue from "@/components/WebApp/Dashboard/views/Product/Related-Products/related-products-thumbnail.vue";
export default {
          props: ['type', 'main'],
          emits : [ 'close', 'change' ],
          data() {
                    return {
                              search : '',
                              products: [],
                    };
          },
          components: { relatedProductsThumbnailVue },
          setup() { },
          created() { 
                    this.get_Products('')
          },
          mounted() { },
          methods: {
                    add_Related_Product(product_id){
                              this.$axios
                                        .post(this.$serverURL + "api/" + "products/data/related/action", {
                                                  mode: 'append',
                                                  product_id: this.main,
                                                  target_id: product_id,
                                                  relation_type: this.type
                                        })
                                        .then((res) => {
                                                  this.$emit('change')
                                        }).catch((err) => {
                                        });
                    },
                    get_Products(query) {
                              this.$axios
                                        .post(this.$serverURL + "api/" + "products/list", {
                                                  mode: query == '' ? 'all' : 'search',
                                                  text: query
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