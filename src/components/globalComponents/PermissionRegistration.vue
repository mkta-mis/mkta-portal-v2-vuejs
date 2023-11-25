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
                    <v-text-field 
                              v-model="title"
                              prepend-inner-icon="mdi-format-title"
                              persistent-hint hint="Title" 
                              />
                    <v-text-field 
                              v-model="key"
                              prepend-inner-icon="mdi-key"
                              persistent-hint hint="Key" 
                              />
                    <v-textarea  
                              v-model="description"
                              prepend-inner-icon="mdi-format-align-justify"
                              persistent-hint hint="Description"
                              />
                              <v-switch color="primary" v-model="isDefault" label="Set as default permission" />
          </v-card-text>
          <v-card-actions >
                    <v-btn v-if="isReadonly" @click="$emit('close')" class="bg-danger text-white"><v-icon class="me-1">mdi-close</v-icon>Close</v-btn>
                    <v-spacer/>
                    <v-btn v-if="!isReadonly" @click="submit" class="bg-success"><v-icon class="me-1">mdi-account-plus</v-icon>Register Permission</v-btn>
          </v-card-actions>
          <v-card-text>
                    <v-list density="compact">
                              <v-list-item v-for="err in errors">
                              {{ err }}
                              </v-list-item>   
                    </v-list>
          </v-card-text>
</v-card>
</template>
<script>
export default {
          emits : ['change', 'close'],
          props : {
                    isDialog : {
                              default: false,
                              type: Boolean
                    },
                    pageTitle : {
                              default : 'Permissions',
                              type: String
                    },
          },
          data() {
                    return {
                              title : '',
                              key : '',
                              description : '',
                              isDefault : false,
                              errors : [],
                              isReadonly :false
                    }
          },
          components: {
          },
          setup() {

          },
          created() {
                    this.password='';
          },
          mounted() {},
          methods: {
                    submit(){
                              this.errors = []

                              if ( this.title == ''){
                                        this.errors.push('Title is required')
                              }
                              if ( this.key == ''){
                                        this.errors.push('Key is required')
                              }
                              if ( this.description == ''){
                                        this.errors.push('Description is required')
                              }
                              if( this.errors.length > 0){
                                        return;
                              }
                              this.$axios
                              .post( this.$serverURL + "api/" + "permissions/web-admin/" + "action", {
                                        tokenString :  localStorage.getItem("userToken"),
                                        action : 'register',
                                        data: {
                                                  key : this.key,
                                                  title : this.title,
                                                  description : this.description,
                                                  isDefault : this.isDefault ? 1 : 0
                                        }
                              }).then((res) => {
                                        
                                        this.$emit('change')
                              }).catch((err) => {
                              });
                    }
          },
}
</script>