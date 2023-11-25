<template>
<v-col cols="12" xs="12" sm="12" md="6">
          <v-row class="h-100 justify-center align-center" style="min-height: 200px;" v-if="!isShown">
                    <v-col cols="4" @click="()=>{ isShown = !isShown; step = 0 }"  >
                              <v-btn stacked class="w-100" style="min-height: 100px;" :color="isShown ? 'danger' : 'success'" size="x-large" :prepend-icon="isShown ? 'mdi-cancel' : 'mdi-plus'">Attribute</v-btn>
                    </v-col>
          </v-row>
          <v-row v-else class="h-100 justify-center align-stretch" style="min-height: 200px;">
                    <v-col cols="12" sm="12">
                              <v-window v-model="step">
                                        <v-window-item :value="0">
                                                  <v-card>
                                                            <v-card-text>
                                                                      <v-text-field label="Title" persistent-hint v-model="title" />
                                                                      <v-text-field label="Key" hint="space is disabled" persistent-hint v-model="key" @keydown.space.prevent />
                                                            </v-card-text>
                                                            <v-card-actions>
                                                                      <v-btn  @click="isShown = false"  class="bg-danger text-white"><v-icon class="me-2" :icon="'mdi-cancel'" />Cancel</v-btn>
                                                                      <v-spacer />
                                                                      <v-btn :disabled=" title.trim().length == 0 || key.trim().length == 0" class="bg-success" @click="step = 1"><v-icon class="me-2" :icon="'mdi-arrow-right'" />Next</v-btn>
                                                            </v-card-actions>
                                                  </v-card>
                                                  
                                        </v-window-item>
                                        <v-window-item :value="1">
                                                  <v-row class="py-2">
                                                            <v-col cols="4" v-for="(item, i) in types" :key="i">
                                                                      <v-btn  @click="add_Components(item)" style="min-height: 100px;"  v-show="isShown"  class="w-100 h-100 border" size="x-large"><v-icon class="me-2">{{ item.icon }}</v-icon>{{ item.text }}</v-btn>
                                                            </v-col>
                                                            <v-col cols="4" @click="isShown = false"  >
                                                                      <v-btn  style="min-height: 100px;" class="w-100 h-100 border bg-danger text-white" size="x-large" stacked prepend-icon="mdi-cancel">Cancel</v-btn>
                                                            </v-col>
                                                  </v-row>
                                        </v-window-item>
                              </v-window>
                    </v-col>
          </v-row>
</v-col>
</template>
<script>
export default {
          props: [  'data' ],
          emits : ['change'],
          components: { },
          setup() {

          },
          data () {
                    return {
                              step : 0,
                              isShown : false,
                              key : '',
                              title: '',
                              types : [
                                        {
                                                  text : 'List',
                                                  icon : 'mdi-format-list-bulleted',
                                                  key  : 'component-list',
                                                  contentType : 'JSON',
                                                  default: []
                                        },
                                        
                                        {
                                                  text : 'File(s)',
                                                  icon : 'mdi-file-outline',
                                                  key  : 'component-file',
                                                  contentType : 'JSON',
                                                  default : []
                                        },
                                        {
                                                  text : 'Text',
                                                  icon : 'mdi-format-text',
                                                  key  : 'component-text',
                                                  contentType : 'value',
                                                  default: ""
                                        },
                                        {
                                                  text : 'Image(s)',
                                                  icon : 'mdi-file-image',
                                                  key  : 'component-image',
                                                  contentType : 'JSON',
                                                  default: []
                                        },
                                        {
                                                  text : 'Table',
                                                  icon : 'mdi-table',
                                                  key  : 'component-table',
                                                  contentType : 'JSON',
                                                  default : { 
                                                                      header : [],
                                                                      body : [],
                                                                      footer: []
                                                            }
                                        },
                              ]
                    }
          },
          created() {
          },
          mounted() {
                    
          },
          methods: {
                    add_Components(data){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/add" , {
                                        tokenString         : localStorage.getItem('userToken'),
                                        product_id          : this.data.id,
                                        key                 : this.key,
                                        title               : this.title,
                                        displayType         : data.key,
                                        content             : data.default,
                                        contentType         : data.contentType

                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.key = '';
                                                  this.title = '';
                                                  this.step = 0;
                                                  this.isShown = false;
                                                  this.$emit('change');
                                        } else {
                                                  
                                        }
                              }).catch((err) => { });
                    }
          } 
}
</script>