<template>
<v-card flat class="border w-100" >
          <v-card-actions>
                    <v-spacer />
                    <v-btn fab icon="mdi-close" class="bg-danger text-white" @click="$emit('close')" />
          </v-card-actions>
          <v-row>
                    <v-col cols="12" sm="12" md="4" v-if="parent_id == 0">
                              <v-img :src="this.$serverURL+'resources/' + file_data.filename" />
                              <v-btn @click="isBrowsingThumbnail=true;"  class="w-100">Change thumbnail</v-btn>
                    </v-col>
                    <v-col cols="12" sm="12" :md="parent_id == 0 ? 8 : 12">
                              <v-text-field  v-model="newData.name" label="Name" persistent-hint :hint="newData.name.trim().toLocaleLowerCase().replace(/ /g,'-')" />
                              <v-textarea v-if="parent_id == 0" class="my-1" v-model="newData.description" hint="Description" persistent-hint /> 
                    </v-col>
          </v-row>
          <v-card-text>
                           
          </v-card-text>
          <v-card-actions>
                    <v-btn prepend-icon="mdi-cancel" @click="$emit('close')" class="bg-warning">Cancel</v-btn>
                    <v-spacer />
                    <v-btn prepend-icon="mdi-content-save" @click="save_Category" class="bg-success">Save</v-btn>
          </v-card-actions>
</v-card>
<v-dialog v-model="isBrowsingThumbnail"  >
          <div style="height: 80vh!important;">
                    <File_Upload 
                              v-on:change="(data)=>{ file_data = data ;  newData.file_id = data.id; isBrowsingThumbnail=false; }"
                              v-on:close="isBrowsingThumbnail=false" 
                              :pageTitle="'Select Thumbnail'"
                              :isDialog="true" />
          </div>
</v-dialog>
</template>
<script>
import File_Upload from '@/components/Files/File_Upload.vue';

export default {
          emits : ['change', 'close'],
          props : [ 'parent_id'],
          data() {
                    return {
                              isBrowsingThumbnail : false,
                              isAdding   : false,
                              newData : {
                                        name : '',
                                        description : '',
                                        urlKey : '',
                                        parent_id : this.parent_id,
                                        file_id : 1
                              },
                              file_data : {
                                        filename : 'Logo.svg'
                              }
                    }
          },
          components: {
                    File_Upload
          },
          setup() {

          },
          created() {
          },
          mounted() {},
          methods: {
                    save_Category(){
                              if(this.newData.name.trim() == ''){
                                        return;
                              }
                              this.newData.urlKey = this.newData.name.trim().toLocaleLowerCase().replace(/ /g,'-')
                              this.isUpdating = true
                                        this.$axios
                                        .post(this.$serverURL + "api/" + "categories/web-admin/action", {
                                                  tokenString : localStorage.getItem('userToken'),
                                                  action: 'append',
                                                  data : this.newData
                                        })
                                        .then((res) => {
                                                  this.$emit('change', res.data.data);

                                        }).catch((err) => {});
                    }
          },
}
</script>