<template>
<v-card class="bg-white h-100">
          <v-card-actions fixed-header v-if="isDialog">
                    <v-spacer />
                    <v-btn fab icon="mdi-close" class="bg-danger text-white" @click="$emit('close')" />
          </v-card-actions>
          <v-card-title fixed-header>
                    {{ pageTitle }}
          </v-card-title>
          <v-card-text>
          <v-row
                    justify="center"
          >
                              <v-col cols="12" sm="12">
                                        <v-text-field 
                                        :readonly="isReadonly"
                                        v-model="name"
                                        prepend-inner-icon="mdi-account"
                                        persistent-hint hint="Full Name" />
                                        <v-text-field 
                                        :readonly="isReadonly"
                                        v-model="mail"
                                        prepend-inner-icon="mdi-web"
                                        persistent-hint hint="Email Address" />
                                        <v-select
                                                v-model="role_data"
                                                label="Role"
                                                item-value="id"
                                                item-title="title"
                                                :items="roles"
                                                />
                                        <v-list density="compact">
                                               <v-list-item v-for="err in errors">
                                                  {{ err }}
                                               </v-list-item>   
                                        </v-list>
                              </v-col>
                              <v-col cols="12" sm="12" v-if="isReadonly">
                                        <table class="table">
                                                  <tr>
                                                            <th class="text-end">
                                                                      Password :
                                                            </th>
                                                            <th class="fs-2 text-center">
                                                                      {{ password }}
                                                            </th>
                                                  </tr>
                                        </table>
                              </v-col>
                    </v-row>
                    
          </v-card-text>
          <v-card-actions >
                    <v-btn v-if="isReadonly" @click="$emit('close')" class="bg-danger text-white"><v-icon class="me-1">mdi-close</v-icon>Close</v-btn>
                    <v-spacer/>
                    <v-btn v-if="!isReadonly" @click="submit" class="bg-success"><v-icon class="me-1">mdi-account-plus</v-icon>Register User</v-btn>
          </v-card-actions>
</v-card>
</template>
<script>
import { isReadonly } from 'vue'

export default {
          emits : ['change', 'close'],
          props : {
                    isDialog : {
                              default: false,
                              type: Boolean
                    },
                    pageTitle : {
                              default : 'User Registration',
                              type: String
                    },
          },
          data() {
                    return {
                              name : '',
                              mail : '',
                              role_data: 0,
                              errors : [],
                              isReadonly :false,
                              roles : []
                    }
          },
          components: {
          },
          setup() {

          },
          created() {
                    this.password='';
                    this.get_Roles();
          },
          mounted() {},
          methods: {
                    get_Roles(){
                        this.$axios
                            .post( this.$serverURL + "api/" + "roles/get", { })
                            .then((res) => {
                                        if (res.data.code == 200) {
                                                this.roles = res.data.data;
                                                if( this.roles.length > 0 ){
                                                    this.role_data = this.roles[0].id
                                                }
                                                this.set_Paginate()
                                        } else {

                                        }
                            }).catch((err) => {
                        });
                     },
                    submit(){
                              this.errors = []
                              if ( this.mail == ''){
                                        this.errors.push('Email is required')
                              }
                              if ( this.name == ''){
                                        this.errors.push('Name is required')
                              }
                              if ( this.role_data == 0 ){
                                        this.errors.push('Role is required')
                              }
                              if( this.errors.length > 0){
                                        return;
                              }
                              this.$axios
                              .post( this.$serverURL + "api/" + "users/web-admin/" + "register", {
                                        tokenString :  localStorage.getItem("userToken"),
                                        role_data : this.role_data,
                                        data: {
                                                  email : this.mail,
                                                  name : this.name
                                        }
                              }).then((res) => {
                                        if (res.data.code == 200) {
                                                  this.password = res.data.user_data.password
                                                  this.isReadonly = true
                                        } else {
                                                  this.errors.push('Something went wrong please try again later.');
                                                  this.name = '';
                                                  this.mail = '';
                                                  this.errors = [];
                                                  this.isReadonly =false;
                                        }
                              }).catch((err) => {
                              });
                    }
          },
}
</script>