<template>
<v-card flat>
          <v-card-actions>
                    <v-btn size="small" @click="get_Account_Info()" prepend-icon="mdi-refresh" variant="outlined" class="bg-primary">Refresh</v-btn>
          </v-card-actions>
          <v-card-text>
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
                              hint="Password"
                    />
          </v-card-text>
          <v-card-actions>
                    <v-btn @click="reset_password()" class="bg-success" prepend-icon="mdi-account-key">Reset Password</v-btn>
                    <v-btn v-if="false" class="bg-success" prepend-icon="mdi-cookie">Reset Token</v-btn>
                    <v-spacer />
                    <v-btn 
                              v-if="Account.name != Orig_Data.name"
                              class="bg-success"><v-icon class="me-1">mdi-content-save</v-icon>Update Account information</v-btn>
          </v-card-actions>
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
                              userToken : this.$route.params.userToken,
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
          mounted() {},
          methods: {
                    reset_password(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "users/web-admin" + "/reset-password", { 
                                        tokenString: localStorage.getItem("userToken"),
                                        userToken : this.userToken
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
                              .post( this.$serverURL + "api/" + "users/web-admin" + "/list", { 
                                        mode : 'exact-token',
                                        tokenString: localStorage.getItem("userToken"),
                                        data : {
                                                  userToken : this.userToken
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