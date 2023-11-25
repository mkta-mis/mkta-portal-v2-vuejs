<template>
<v-row>
          <v-col xs="12" sm="12">
                    <router-link :to="{ name: 'Dashboard Permission', params: {}}">
                              <v-btn color="purple"><v-icon>mdi-chevron-left</v-icon>Back</v-btn>
                    </router-link>
          </v-col>
          <v-col xs="12">
                    <v-card>
                              <v-card-title fixed-header>
                                        Update Permission Information
                              </v-card-title>
                              <v-card-text>
                                        <v-text-field 
                                                  v-model="temp_data.title"
                                                  prepend-inner-icon="mdi-format-title"
                                                  persistent-hint hint="Title" 
                                                  />
                                        <v-text-field 
                                                  v-model="temp_data.key"
                                                  prepend-inner-icon="mdi-key"
                                                  persistent-hint hint="Key" 
                                                  />
                                        <v-textarea  
                                                  v-model="temp_data.description"
                                                  prepend-inner-icon="mdi-format-align-justify"
                                                  persistent-hint hint="Description"
                                                  />
                                                  <v-switch color="primary" v-model="temp_data.isDefault" label="Set as default permission" />
                              </v-card-text>
                              <v-card-actions >
                                        <v-spacer/>
                                        <v-btn @click="submit" class="bg-success"><v-icon class="me-1">mdi-account-plus</v-icon>Upddate Permission</v-btn>
                              </v-card-actions>
                              <v-card-text>
                                        <v-list density="compact">
                                                  <v-list-item v-for="err in errors">
                                                  {{ err }}
                                                  </v-list-item>   
                                        </v-list>
                              </v-card-text>
                    </v-card>
          </v-col>
</v-row>
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
                              temp_data : {
                                        title: '',
                                        key: '',
                                        description: '',
                                        isDefault: false,
                              },
                              orig_data : []
                    }
          },
          
          setup() {

          },
          created() {
                    this.get_Permission_Info();
          },
          mounted() {

          },
          methods: {
                    submit(){
                              this.errors = []
                              if ( this.temp_data.title == ''){
                                        this.errors.push('Title is required')
                              }
                              if ( this.temp_data.key == ''){
                                        this.errors.push('Key is required')
                              }
                              if ( this.temp_data.description == ''){
                                        this.errors.push('Description is required')
                              }
                              if( this.errors.length > 0){
                                        return;
                              }
                              this.$axios
                              .post( this.$serverURL + "api/" + "permissions/web-admin/" + "action", {
                                        tokenString :  localStorage.getItem("userToken"),
                                        action : 'update',
                                        permission_key : this.orig_data.id,
                                        data: {
                                                  key : this.temp_data.key,
                                                  title : this.temp_data.title,
                                                  description : this.temp_data.description,
                                                  isDefault : this.temp_data.isDefault ? 1 : 0
                                        }
                              }).then((res) => {
                                        
                                        this.get_Permission_Info()
                              }).catch((err) => {
                              });
                    },
                    get_Permission_Info(){
                              this.show_Registration = false
                              this.$axios
                              .post( this.$serverURL + "api/" + "permissions/web-admin/" + "get", {
                                        mode: 'exact-index',
                                        permission_id: this.$route.params.permission_id
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.temp_data = res.data.results;
                                                  this.temp_data['isDefault'] = this.temp_data['isDefault'] == 1
                                                  this.orig_data = JSON.parse(JSON.stringify( this.temp_data ))
                                        } else {

                                        }
                              }).catch( (err) => { } );
                    }
          },
}
</script>