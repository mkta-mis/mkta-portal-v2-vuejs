<template>
<v-col cols="12" xs="12" sm="12" md="6" >
          <v-card  class="h-100 border" flat>
                    <v-card-text class="d-flex justify-space-between">
                              <p class="h5">
                                        {{ components.title }}<br/>
                                        <small class="text-muted">{{ components.key }}</small>
                              </p>
                              <div class="">
                                        <v-btn v-if="!isDeleting"  @click="isDeleting =  true"  class="bg-red text-white float-end mx-1" icon="mdi-close"></v-btn>
                                        <v-btn v-if=" isDeleting"  @click="isDeleting = false"  class="bg-warning text-white float-end mx-1" icon="mdi-cancel"></v-btn>
                                        <v-btn v-if=" isDeleting"  @click="remove_Component(components)"  class="bg-red text-white float-end mx-1" icon="mdi-check"></v-btn>
                              </div>
                    </v-card-text>
                    <v-card-item>
                              <v-switch  
                              inset 
                              color="primary"
                              v-model="components.isVisible"
                              @update:modelValue="update_Visibility"
                              :label="`Component is : ${components.isVisible ? 'visible' : 'hidden'}`"
                              />
                    </v-card-item>
                    <v-card-text>
                              <ComponentImage 
                                        v-on:change="emitChange"
                                        v-if="components.displayType == 'component-image'" 
                                        :data="components"
                              />
                              <ComponentTable 
                                        v-on:change="emitChange"
                                        v-if="components.displayType == 'component-table'" 
                                        :data="components"
                              />
                              <ComponentText 
                                        v-on:change="emitChange"
                                        v-if="components.displayType == 'component-text'" 
                                        :data="components"
                              />
                              <ComponentFile 
                                        v-on:change="emitChange"
                                        v-if="components.displayType == 'component-file'" 
                                        :data="components"
                              />
                              <ComponentList 
                                        v-on:change="emitChange"
                                        v-if="components.displayType == 'component-list'" 
                                        :data="components"
                              />
                    </v-card-text>
                    
          </v-card>
          
</v-col>
</template>
<script>
import ComponentImage from '@/components/WebApp/Dashboard/views/Product/Product-Info/templateComponents/component-image.vue';
import ComponentTable from '@/components/WebApp/Dashboard/views/Product/Product-Info/templateComponents/component-table.vue';
import ComponentText from '@/components/WebApp/Dashboard/views/Product/Product-Info/templateComponents/component-text.vue';
import ComponentFile from '@/components/WebApp/Dashboard/views/Product/Product-Info/templateComponents/component-file.vue';
import ComponentList from '@/components/WebApp/Dashboard/views/Product/Product-Info/templateComponents/component-list.vue';

export default {
          props: [  'components', 'index' ],
          components: { ComponentImage, ComponentTable, ComponentText,ComponentFile, ComponentList },
          emits : ['change'],
          setup() {

          },
          data () {
                    return {
                              isHiding   : false,
                              isSaving   : false,
                              isDeleting : false,
                              isUpdating : false,
                    }
          },
          created() {
                    this.components.isVisible = this.components.isVisible == 1
          },
          mounted() {
                    
          },
          methods: {
                    emitChange(){
                              this.$emit('change')
                    },
                    updateContent(data){
                              this.components.content = data;
                    },
                    update_Visibility(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/update" , {
                                        id: this.components.id,
                                        data : {
                                                  isVisible : this.components.isVisible ? 1 : 0
                                        }
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  
                                        } else {

                                        }
                              }).catch((err) => { });
                              
                    },
                    update_Components(data){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/update" , {
                                        id: this.components.id,
                                        data : {
                                                  content : this.components.content
                                        }
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  
                                        } else {

                                        }
                              }).catch((err) => { });
                              
                    },
                    remove_Component(data){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/remove" , {
                                        id : this.components.id
                               })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.isDeleting = false
                                                  // this.$emit('remove', this.index);
                                        } else {

                                        }
                              }).catch((err) => { });
                              this.$emit('remove', this.index);
                    }
          } 
}
</script>