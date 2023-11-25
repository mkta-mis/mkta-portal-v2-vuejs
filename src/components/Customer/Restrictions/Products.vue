<template>
          <v-card>
                    
                    
                    <v-card-item>
                              <v-autocomplete
                                        :disabled="( products.filter(x => !restricted_Products.includes(x)) ).length <= 0"
                                        v-model="selected_Product"
                                        @update:modelValue="()=>{ 
                                                  User_Restriction('append', selected_Product)
                                        }"
                                        hint="Hide all products related to the products"          
                                        persistent-hint
                                        item-title="name"
                                        return-object
                                        label="Products"
                                        :items="( products.filter(x => !restricted_Products.includes(x)) )"
                              />
                              <v-sheet class="d-flex flex-wrap" v-if="restricted_Products.length > 0">
                                        <v-sheet v-for="(item, index) in restricted_Products" class=" ma-2 " >
                                                  <v-card 
                                                            flat
                                                            width="250" 
                                                            class="h-100 border">
                                                                      <v-img
                                                                                :src=" this.$serverURL +'resources/' + item.thumbnail['filename']"
                                                                                cover
                                                                                class="text-white"
                                                                                >
                                                                                <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
                                                                                          <template v-slot:append>
                                                                                                    <v-btn @click="()=>{ User_Restriction('remove',item); }" class="bg-danger" fab size="x-small" icon="mdi-close"></v-btn>
                                                                                          </template>
                                                                                </v-toolbar>
                                                                      </v-img>
                                                                      <v-card-item>
                                                                                <v-row>
                                                                                          <v-col cols="12" sm="12" md="3" class="" v-for="(variant, var_index) in item.variants">
                                                                                                    <v-img
                                                                                                    cover
                                                                                                    :src="this.$serverURL+'resources/' + variant.thumbnail['filename']"
                                                                                                    />
                                                                                          </v-col>
                                                                                </v-row>
                                                                      </v-card-item>
                                                                      <v-card-title class="text-center no-wrap">
                                                                                {{ item.name }}
                                                                      </v-card-title>
                                                                      <v-card-text>
                                                                                {{ item.description }}
                                                                      </v-card-text>
                                                  </v-card>
                                        </v-sheet>
                              </v-sheet>
                              <v-sheet class="text-center" v-else>
                                        No restricted Products
                              </v-sheet>
                    </v-card-item>
          </v-card>
</template>
<script>
export default {
          emits : [],
          components: {
          },
          props : {
                    
          },
          data() {
                    return {
                              customerToken : this.$route.params.customerToken,
                              restricted_Products : [],
                              products : [],
                              selected_Product : null
                    }
          },
          
          setup() {

          },
          created() {
                    this.get_Products();
                    this.get_Restriction();
          },
          mounted() {
                    
          },
          methods: {
                    get_Restriction(){
                              this.$axios
                              .post(this.$serverURL + "api/" + "customers/web-admin/restriction/" + "fetch" + "/" + "product-items", { 
                                        tokenString: localStorage.getItem("userToken"),
                                        customerToken : this.customerToken, 
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.restricted_Products = res.data.results;
                                        } else {

                                        }
                              }).catch((err) => {});
                    },
                    User_Restriction(mode, data){
                              this.$axios
                              .post(this.$serverURL + "api/" + "customers/web-admin/restriction/" + mode + "/" + "product-items", { 
                                        tokenString: localStorage.getItem("userToken"),
                                        customerToken : this.customerToken, 
                                        referenceValue : data.id
                              })
                              .then((res) => {
                                        this.get_Restriction()
                              }).catch((err) => {});
                    },
                    get_Products() {
                              this.$axios
                              .post(this.$serverURL + "api/" + "products/list", { mode: 'all', withs : ['thumbnail'] })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.products = res.data.data;
                                        } else {

                                        }
                              }).catch((err) => {});
                    }
          },
}
</script>