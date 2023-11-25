<template>
<v-card flat>
          
          <v-card-text class="text-black">
                    <v-row>
                              <v-col cols="12" sm="12" md="4">
                                        <v-img @click="()=>{ curImageSrc = img ;showImage = true;}" :src="this.$serverURL+'resources/' + original_data.thumbnail['filename']" />
                                        <v-btn @click="showDialog=true;" class="w-100">Change thumbnail</v-btn>
                              </v-col>
                              <v-col cols="12" sm="12" md="8">
                                        <v-text-field :disabled="isUpdating" class="my-1" v-model="original_data.name" hint="Name" persistent-hint />
                                        <v-textarea   :disabled="isUpdating" class="my-1" v-model="original_data.description" hint="Description" persistent-hint />
                                        <v-card-actions>
                                                  <v-spacer />
                                                  <v-btn 
                                                            v-show="original_data.name != temp_data.name || original_data.description != temp_data.description"
                                                            :loading="isUpdating"
                                                            @click="save_Category" variant="outlined" class="mx-1 bg-success text-white" prepend-icon="mdi-content-save">Save</v-btn>
                                        </v-card-actions>  
                              </v-col>
                    </v-row>
                          
          </v-card-text>
          
          <v-card-item>
                    <v-row class="p-1">
                              <v-col cols="12" sm="12" class="h4">
                                        Sub-Categories
                              </v-col>
                              <v-col cols="12" sm="12" md="4" v-for="(sub, subIndex) in original_data.full_data"
                                        class="h-100" style="min-height: 100px;">
                                        <Category_Child :isParent="true" :sub="sub" />
                              </v-col>
                              <v-col cols="12" sm="12" md="4" class="h-100 d-flex" >
                                        <v-btn style="min-height: 200px;" @click="showAppend = true" v-if="!showAppend" class="my-auto w-100" stacked prepend-icon="mdi-plus">Add</v-btn>
                                        <Category_Append 
                                                  v-on:change="(data)=>{ 
                                                            showAppend = false 
                                                            this.temp_data = JSON.parse(JSON.stringify(data));
                                                            this.original_data = JSON.parse(JSON.stringify(data)); 
                                                            isAdding = false; showChild = true
                                                  }"
                                                  v-on:close="()=>{ showAppend = false }" v-else :parent_id="original_data.id" />
                              </v-col>
                    </v-row>
          </v-card-item>
</v-card>
<v-dialog v-model="showImage"> 
          <v-card class="bg-white">
                    <v-card-title fixed-header>
                              Preview
                              <v-btn icon="mdi-close" @click="showImage = !true" class="text-white bg-danger float-end"  fab/>
                    </v-card-title>
                    <v-img  :src="this.$serverURL+'resources/' + original_data.thumbnail['filename']" style="max-height: 500px;" />
                    <v-card-title fixed-header>
                              
                    </v-card-title>
          </v-card>
</v-dialog>
<v-dialog v-model="showDialog" fullscreen>
          <File_Upload 
                    v-on:change="setThumbnail"
                    v-on:close="showDialog=false" 
                    :pageTitle="'Category Thumbnail'"
                    :isDialog="true" />
</v-dialog>
</template>

<script>
import Category_Append from '@/components/WebApp/Dashboard/views/Categories/Category_Append.vue';
import Category_Child from '@/components/WebApp/Dashboard/views/Categories/Category_Child.vue';
import File_Upload from '@/components/Files/File_Upload.vue';
export default {
          emits : ['change','dataChange'],
          props : [ 'main' ],
          data() {
                    return {
                              showAppend : false,
                              showImage : false,
                              showDialog : false,
                              original_data :[],
                              temp_data : {
                                        name : '',
                                        description : ''
                              },
                              isUpdating : false,
                    }
          },
          components: {
                    Category_Child,
                    File_Upload,
                    Category_Append
          },
          setup() {

          },
          created() {
                    this.temp_data = JSON.parse(JSON.stringify(this.main))
                    this.original_data = JSON.parse(JSON.stringify(this.main))
          },
          mounted() {},
          methods: {
                    save_Category(){
                              this.isUpdating = true
                                        this.$axios
                                        .post(this.$serverURL + "api/" + "categories/web-admin/action", {
                                                  tokenString : localStorage.getItem('userToken'),
                                                  category_id : this.original_data.id,
                                                  action: 'update',
                                                  data :{
                                                            name : this.original_data.name,
                                                            description : this.original_data.description
                                                  }
                                        })
                                        .then((res) => {
                                                  if (res.data.code == 200) {
                                                            this.temp_data = JSON.parse(JSON.stringify(res.data.data))
                                                            this.original_data = JSON.parse(JSON.stringify(res.data.data))
                                                            this.isUpdating = false;
                                                            this.$emit('dataChange', JSON.parse(JSON.stringify(res.data.data)))
                                                  } 
                                        }).catch((err) => {});
                    },
                    setThumbnail(data){
                              this.showDialog = false
                              this.$axios
                                        .post(this.$serverURL + "api/" + "categories/web-admin/action", {
                                                  tokenString : localStorage.getItem('userToken'),
                                                  category_id : this.original_data.id,
                                                  action: 'update',
                                                  data :{
                                                            file_id : data.id
                                                  }
                                        })
                                        .then((res) => {
                                                  if (res.data.code == 200) {
                                                            this.temp_data = JSON.parse(JSON.stringify(res.data.data))
                                                            this.original_data = JSON.parse(JSON.stringify(res.data.data))
                                                            this.isUpdating = false;
                                                            this.$emit('dataChange', JSON.parse(JSON.stringify(res.data.data)))
                                                  } 
                                        }).catch((err) => {});
                    },
          },
}
</script>