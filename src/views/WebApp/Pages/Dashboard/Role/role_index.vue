<template>
<v-card>
          <v-card-title>
                    {{ $route.meta.contentTitle }}
          </v-card-title>
          <v-card-text>
                    <v-text-field 
                              v-model="Role_data.title"
                              prepend-inner-icon="mdi-format-title"
                              persistent-hint hint="Title" 

                              />
                    <v-textarea  
                              v-model="Role_data.description"
                              prepend-inner-icon="mdi-format-align-justify"
                              persistent-hint hint="Description"

                              />
          </v-card-text>
          <v-card-actions>
                    <v-spacer />
                    <v-btn 
                              v-if="Role_data.title != Orig_data.title || Role_data.description != Orig_data.description"
                              class="bg-success" @click="submit"><v-icon class="me-1">mdi-content-save</v-icon>Update Role Information</v-btn>
          </v-card-actions>
          <v-row>
                    <v-col cols="12" sm="12" md="6">
                              <v-card-item>
                                        <v-card-title>
                                                  Permissions
                                        </v-card-title>
                                        <v-card-text>
                                                  <v-row>
                                                            <v-col 
                                                                      cols="12" 
                                                                      md="6"
                                                                      v-for="(permi, index) in Role_Permissions"
                                                            >
                                                                      <v-card :elevation="6" class="p-2">
                                                                                <v-card-title>
                                                                                          {{ permi.title }}
                                                                                          <v-card-subtitle class="text-danger">{{ permi.key }}</v-card-subtitle>
                                                                                </v-card-title>
                                                                                <v-card-text>
                                                                                          {{ permi.description }}
                                                                                </v-card-text>
                                                                                <v-card-actions>
                                                                                          <v-spacer></v-spacer>
                                                                                          <v-btn 
                                                                                                    @click="action_Role_Permissions('remove', permi, index)" 
                                                                                                    class="bg-danger text-white" 
                                                                                                    prepend-icon="mdi-close"
                                                                                                    >Remove</v-btn>
                                                                                </v-card-actions>

                                                                      </v-card>
                                                            </v-col>
                                                  </v-row>
                                        </v-card-text>
                              </v-card-item>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                              <v-card-item>
                                        <v-card-title>
                                                  Available Permissions
                                        </v-card-title>
                                        <v-card-text>
                                                  <v-row>
                                                            <v-col 
                                                                      cols="12" 
                                                                      md="6"
                                                                      v-for="(permi, index) in this.filter()"
                                                            >
                                                                      <v-card :elevation="6" class="p-2">
                                                                                <v-card-title>
                                                                                          {{ permi.title }}
                                                                                          <v-card-subtitle class="text-danger">{{ permi.key }}</v-card-subtitle>
                                                                                </v-card-title>
                                                                                <v-card-text>
                                                                                          {{ permi.description }}
                                                                                </v-card-text>
                                                                                <v-card-actions>
                                                                                          <v-spacer></v-spacer>
                                                                                          <v-btn 
                                                                                                    @click="action_Role_Permissions('append', permi, index)" 
                                                                                                    class="bg-success text-white" 
                                                                                                    prepend-icon="mdi-plus"
                                                                                                    >Append</v-btn>
                                                                                </v-card-actions>
                                                                      </v-card>
                                                            </v-col>
                                                  </v-row>
                                        </v-card-text>
                              </v-card-item>
                    </v-col>
          </v-row>
</v-card>
</template>
<script>
export default {
          emits : ['change', 'close'],
          components: {
                    
          },
          setup() {

          },
          created() {
                    this.get_Role();
                    this.get_Permissions();
          },
          mounted() {
          },
          data () {
                    return {
                              Role_data           : [],
                              Orig_data           : [],
                              Role_Permissions    : [],
                              Permissions         : [],
                    }
          },
          methods: {
                    filter(){
                              let arr1 = this.Permissions;
                              let arr2 = this.Role_Permissions;
                              let keys = []
                              arr2.forEach(element => {
                                        keys.push(element.key)
                              });
                              return arr1.filter( (x) => {
                                        return !(keys.indexOf(x.key) != -1)
                              })
                    },
                    action_Role_Permissions(action, data, index = 0){
                              let mode = '';
                              switch (action) {
                                        case 'append': 
                                                  this.Role_Permissions.push(data)
                                                  mode = 'append-permission';
                                        break;
                                        case 'remove': 
                                                  this.Role_Permissions.splice(index,1)
                                                  mode = 'remove-permission';
                                        break;
                              }
                              this.$axios
                              .post( this.$serverURL + "api/" + "roles/web-admin/" + "action", {
                                        tokenString :  localStorage.getItem("userToken"),
                                        action : 'update',
                                        key : data.key,
                                        roleIndex :this.$route.params.roleIndex,
                                        action : mode
                              }).then((res) => {}).catch((err) => {});
                    },
                    get_Role_Permissions(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "roles/web-admin/get", { 
                                        mode : 'exact-index-permissions',
                                        roleIndex : this.$route.params.roleIndex,
                              }).then((res) => {
                                        if (res.data.code == 200) {
                                                  this.Role_Permissions = res.data.results;
                                        } else {

                                        }
                              }).catch((err) => { });
                    },
                    get_Role(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "roles/web-admin/get", { 
                                        mode : 'exact-index',
                                        roleIndex : this.$route.params.roleIndex,
                              }).then((res) => {
                                        if (res.data.code == 200) {
                                                  this.Role_data = res.data.results;
                                                  this.Orig_data = JSON.parse(JSON.stringify(this.Role_data))
                                                  this.get_Role_Permissions()
                                        } else {

                                        }
                              }).catch((err) => { });
                    },
                    submit(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "roles/web-admin/" + "action", {
                                        tokenString :  localStorage.getItem("userToken"),
                                        action : 'update',
                                        data: {
                                                  roleIndex : this.Role_data.id,
                                                  title : this.Role_data.title,
                                                  description : this.Role_data.description
                                        }
                              }).then((res) => {
                                        this.get_Role();
                              }).catch((err) => {
                              });
                    },
                    get_Permissions(){
                              this.show_Registration = false
                              this.$axios
                              .post( this.$serverURL + "api/" + "permissions/web-admin/" + "get", {})
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.Permissions = res.data.results;
                                                  this.set_Paginate();
                                        } else {

                                        }
                              }).catch( (err) => { } );
                    }
          },
          
}
</script>
