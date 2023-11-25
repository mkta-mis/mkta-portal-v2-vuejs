<template>
          <v-card>
                    <v-card-title fixed-header>
                              Variant Registration
                              <v-btn icon="mdi-close" @click="$emit('close')" class="text-white bg-danger float-end"  fab/>
                    </v-card-title>
                    <v-card-text>
                              <v-row>
                                        <v-col cols="12" md="4">
                                                  <v-img 
                                                  :src="this.$serverURL+'resources/' + 'Logo.svg'"
                                                  />
                                        </v-col>
                                        <v-col cols="12" md="8">
                                                 
                                                  <v-card elevation="0">
                                                            <v-card-title>
                                                                      Basic Information
                                                            </v-card-title>
                                                            <v-card-text>
                                                                      <v-text-field v-model="newProduct.name" persistent-hint hint="Name" class="mb-3" />
                                                                      <v-text-field v-model="newProduct.code" persistent-hint hint="Code" class="mb-3" />
                                                                      <v-textarea   v-model="newProduct.description" label="Description"/>
                                                            </v-card-text>
                                                            <v-card-actions>
                                                                      <v-spacer></v-spacer>
                                                                      <v-btn @click="saveVariant()" variant="outlined" class="bg-success"><v-icon class="me-2">mdi-content-save</v-icon>Save Product</v-btn>
                                                            </v-card-actions>
                                                            <v-card-text>
                                                                      <v-list>
                                                                                <v-list-item v-for="(er, index) in err">
                                                                                          {{ index+1 }}. {{ er }}
                                                                                </v-list-item>
                                                                      </v-list>
                                                            </v-card-text>
                                                  </v-card>
                                        </v-col>
                              </v-row>
                    </v-card-text>
          </v-card>
</template>
<script>
export default {
          props: [ ],
          emits : [ 'close', 'change' ],
          components: {  },
          setup() {

          },
          data () {
                    return {
                              newProduct : {
                                        code : '',
                                        name : '',
                                        description : ''
                              },
                              err : []
                    }
          },
          created() {
          },
          mounted() {
          },
          methods: {
                    saveVariant(){
                              this.err = []
                              if( this.newProduct.code.trim().length == 0 ){
                                        this.err.push('Code is required');
                              }
                              if( this.newProduct.name.trim().length == 0 ){
                                        this.err.push('Name is required');
                              }
                              if( this.newProduct.description.trim().length == 0 ){
                                        this.err.push('Description is required');
                              }
                              if( this.err.length > 0 ){ return; }
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/web-admin/product-info", {
                                        action : 'new-product',
                                        tokenString : localStorage.getItem('userToken'),
                                        data: {
                                                  code : this.newProduct.code,
                                                  name : this.newProduct.name,
                                                  description : this.newProduct.description
                                        }
                               })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.$emit('change')
                                        } 
                                        if (res.data.code == 202) {
                                                  this.err.push('Product Code is already in use other Product Item');
                                        } 
                              }).catch((err) => { });
                    }
                    
          } 
}
</script>