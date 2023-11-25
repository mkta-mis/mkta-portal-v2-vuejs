<template>
          <v-card style="min-height: 80vh;">
                    <v-card-item>
                              <v-row>
                                        <v-col xs="12" sm="12">
                                                  <router-link :to="{ name: 'Dashboard User', params: {}}">
                                                            <v-btn color="purple"><v-icon>mdi-chevron-left</v-icon>Back</v-btn>
                                                  </router-link>
                                        </v-col>
                                        <v-col xs="12">
                                                  <v-tabs 
                                                            
                                                            v-model="selectedOptions">
                                                            <v-tab :value="item.key" v-for="(item, index) in Tabs">
                                                                      <v-icon class="me-2">{{ item.icon }}</v-icon>{{ item.title }}
                                                            </v-tab>
                                                  </v-tabs>
                                        </v-col>
                                        <v-col xs="12" sm="12">
                                                  
                                                  <v-window direction="vertical" v-model="selectedOptions">
                                                            <v-window-item value="customer-information">
                                                                      <v-card-item>
                                                                                <v-card-actions>
                                                                                          <v-spacer></v-spacer>
                                                                                          <v-btn @click="get_Account_Info()" prepend-icon="mdi-refresh" variant="outlined" class="bg-primary">Refresh</v-btn>
                                                                                          <v-btn @click="reset_password()" class="bg-success" prepend-icon="mdi-account-key">Reset Password</v-btn>
                                                                                </v-card-actions>
                                                                      </v-card-item>
                                                                      <v-text-field 
                                                                                class="my-1"
                                                                                hint="Name"
                                                                                persistent-hint
                                                                                v-model="Account.name"  
                                                                                />
                                                                      <v-text-field 
                                                                                class="my-1"
                                                                                hint="Email"
                                                                                persistent-hint
                                                                                v-model="Account.email" 
                                                                                :readonly="true" />
                                                                      <v-text-field
                                                                                v-if="reset.isVisible"
                                                                                :readonly="true"
                                                                                v-model="reset.password"
                                                                                persistent-hint
                                                                                hint="Password"/>
                                                            </v-window-item>
                                                            <v-window-item value="customer-restriction">
                                                                      <CustomerRestrictions />
                                                            </v-window-item>
                                                  </v-window>
                                        </v-col>

                              </v-row>
                    </v-card-item>
          </v-card>

</template>
<script>
import CustomerInformation from '@/components/Customer/CustomerInformation.vue';
import CustomerRestrictions from '@/components/Customer/CustomerRestrictions.vue';

export default {
          emits : [],
          components: {
                    CustomerInformation, CustomerRestrictions
          },
          props : {
                    
          },
          data() {
                    return {
                              
                              selectedOptions : 'customer-information',
                              Tabs : [
                                        {
                                                  key: 'customer-information',
                                                  title: 'Customer Information',
                                                  icon: 'mdi-clipboard-account'
                                        },
                                        {
                                                  key: 'customer-restriction',
                                                  title: 'Restrictions',
                                                  icon: 'mdi-shield-half-full'
                                        },
                              ],

                              customerToken : this.$route.params.customerToken,
                              reset: {
                                        password : '',
                                        isVisible : false
                              },
                              Account : {
                                        id: -1,
                                        name: '',
                                        email : '',
                                        isClient : 0,
                                        hasDashboard: 1,
                                        isActive: 1,
                              },
                              Orig_Data : {
                                        name: '',
                                        email : '',
                                        isClient : 0,
                                        hasDashboard: 1,
                                        isActive: 1,
                              },
                              
                    }
          },
          
          setup() {

          },
          created() {
                    this.get_Account_Info()

          },
          mounted() {

          },
          methods: {
                    reset_password(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "customers/web-admin" + "/reset-password", { 
                                        tokenString: localStorage.getItem("userToken"),
                                        userToken : this.customerToken
                              })
                              .then( (res) => {
                                        if (res.data.code == 200) {
                                                  this.reset.isVisible = true
                                                  this.reset.password = res.data.results
                                        }
                              } ).catch( (err) => { } );
                    },
                    get_Account_Info(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "customers/web-admin" + "/list", { 
                                        mode : 'exact-token',
                                        tokenString: localStorage.getItem("userToken"),
                                        data : {
                                                  userToken : this.customerToken
                                        }
                                        
                              }).then((res) => {
                                        if (res.data.code == 200) {
                                                  this.Account = res.data.results;
                                                  this.Orig_Data = JSON.parse(JSON.stringify(res.data.results))
                                        } else {

                                        }
                              }).catch((err) => {
                              });
                    }
          },
}
</script>