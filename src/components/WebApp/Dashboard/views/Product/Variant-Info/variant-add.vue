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
                                                                      <v-text-field v-model="newVariant.name" persistent-hint hint="Name" class="mb-3" />
                                                                      
                                                                      <v-text-field v-model="newVariant.code" persistent-hint hint="Code" class="mb-3" />
                                                                      Cannot change code
                                                            </v-card-text>
                                                            <v-card-actions>
                                                                      <v-spacer></v-spacer>
                                                                      <v-btn @click="saveVariant()" variant="outlined" class="bg-success"><v-icon class="me-2">mdi-content-save</v-icon>Add Variant</v-btn>
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
          props: [ 'variants_data', 'product_data' ],
          emits : [ 'close', 'change' ],
          components: {  },
          setup() {

          },
          data () {
                    return {
                              newVariant : {
                                        code : '',
                                        name : ''
                              },
                              err : []
                    }
          },
          created() {
                    this.newVariant.name = this.product_data.name
                    this.newVariant.code = this.product_data.code + '-'
          },
          mounted() {
          },
          methods: {
                    saveVariant(){
                              this.err = []
                              if( this.newVariant.code.trim().length == 0 ){
                                        this.err.push('Code is required');
                              }else{
                                        this.variants_data.forEach(element => {
                                                  if( element.code == this.newVariant.code ){
                                                            this.err.push('Code is not Available');
                                                  }
                                        });
                              }
                              if( this.newVariant.name.trim().length == 0 ){
                                        this.err.push('Name is required');
                              }
                              if( this.err.length > 0 ){ return; }
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/web-admin/product-info", {
                                        action : 'append-variant',
                                        mainProduct : this.product_data.id,
                                        tokenString : localStorage.getItem('userToken'),
                                        data: {
                                                  code : this.newVariant.code,
                                                  name : this.newVariant.name,
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