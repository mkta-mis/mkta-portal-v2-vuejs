<template>
          <v-row>
                    <v-col cols="12" sm="6" md="6" lg="4" v-for="(img, index) in JSON.parse(this.data.content)" style="height: 200px;">
                              <v-card class="h-100 w-100">
                                        <template v-slot:image>
                                                  <v-img :src="img" @error="onError(index)" />
                                        </template>
                                        <v-card-actions>
                                                  <v-spacer />
                                                  <v-btn icon="mdi-close" @click="()=>{
                                                            let sample = JSON.parse(this.data.content);
                                                            sample.splice(index,1)
                                                            this.data.content= JSON.stringify(sample)
                                                  }" density="compact" class="text-white bg-danger"  fab absolute/>
                                        </v-card-actions>
                              </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="4"  class="d-flex justify-center align-center"  style="min-height: 150px;">
                              <v-btn @click="isUploading = true"  icon="mdi-plus" size="x-large" :elevation="12" />
                    </v-col>
                    <v-col cols="12" class="d-flex justify-end align-center">
                              <v-btn @click="update_Components" :loading="isSaving" color="success"  icon="mdi-content-save" size="x-large" :elevation="12" fab />
                    </v-col>
          </v-row>
          <v-dialog v-model="isUploading" fullscreen>
                    <v-card>
                              <v-card-title>
                                        Component Type: Image
                                        <v-btn icon="mdi-close" @click="isUploading = false" class="text-white bg-danger float-end"  fab/>
                              </v-card-title>
                              <v-card-text>
                                        <v-row>
                                                  <v-col cols="12" sm="12" md="6">
                                                            <v-card flat>
                                                                      <v-card-title>
                                                                                <v-tabs
                                                                                          v-model="selectedOptions"
                                                                                          color="deep-purple-accent-4"
                                                                                >
                                                                                          <v-tab :value="1">Via URL Link</v-tab>
                                                                                          <v-tab :value="2">Via File Vault</v-tab>
                                                                                </v-tabs>
                                                                                <v-window v-model="selectedOptions">
                                                                                          <v-window-item :value="1">
                                                                                                    <v-text-field v-model="newImgSrc"></v-text-field>
                                                                                          </v-window-item>
                                                                                          <v-window-item :value="2">
                                                                                                    <v-text-field persistent-hint hint="Search"></v-text-field>
                                                                                                    <v-btn class="my-1" size="small" @click="searchFiles"><v-icon class="me-2">mdi-refresh</v-icon>Refresh
                                                                                                    </v-btn>
                                                                                                    <v-table
                                                                                                              class="border p-1"
                                                                                                              fixed-header
                                                                                                              height="500px"
                                                                                                    >
                                                                                                              <thead>
                                                                                                                        <tr>
                                                                                                                                  <th class="text-left">
                                                                                                                                            
                                                                                                                                  </th>
                                                                                                                                  <th class="text-left">
                                                                                                                                            Filename
                                                                                                                                  </th>
                                                                                                                                  <th class="text-left">
                                                                                                                                            Type
                                                                                                                                  </th>
                                                                                                                        </tr>
                                                                                                              </thead>
                                                                                                              <tbody>
                                                                                                                        <tr 
                                                                                                                                  v-for="(file, fileIndex) in files.contents" 
                                                                                                                                  @click="()=>{ 
                                                                                                                                            files.selectedContent = file; 
                                                                                                                                            newImgSrc = $serverURL +'resources/' + file.filename 
                                                                                                                                            }"
                                                                                                                                  :class=" ( file == files.selectedContent ? 'bg-secondary' : '' )"
                                                                                                                                  >
                                                                                                                                  <td>
                                                                                                                                            <v-img :src="$serverURL +'resources/' + file.filename" />
                                                                                                                                  </td>
                                                                                                                                  <td>
                                                                                                                                            {{ file.title }}
                                                                                                                                  </td>
                                                                                                                                  <td>
                                                                                                                                            {{ file.type }}
                                                                                                                                  </td>
                                                                                                                        </tr>
                                                                                                              </tbody>
                                                                                                    </v-table>
                                                                                          </v-window-item>
                                                                                </v-window> 
                                                                      </v-card-title>
                                                                      <v-card-actions>
                                                                                <v-spacer />
                                                                                <v-btn @click="addImage" class="text-white bg-success"><v-icon>mdi-plus</v-icon>Add</v-btn>
                                                                      </v-card-actions>
                                                            </v-card>        
                                                  </v-col>
                                                  <v-col cols="12" sm="12" md="6">
                                                            <label>Preview</label>
                                                            <v-img :src="newImgSrc" @error="()=>{
                                                                      newImgSrc = this.$errorImage
                                                            }" style="max-height: 500px;" />
                                                  </v-col>
                                        </v-row>
                              </v-card-text>
                    </v-card>
          </v-dialog>
</template>
<script>
export default {
          props: [  'data' ],
          emits : ['change', 'remove'],
          components: {  },
          setup() {

          },
          data () {
                    return {

                              isSaving   : false,
                              isUploading : false,
                              newImgSrc : '', 
                              selectedOptions : 1,
                              files : {
                                        selectedContent : [],
                                        contents : [],
                                        search : ''
                              }

                    }
          },
          created() {
                    this.newImgSrc = this.$errorImage;
                    this.searchFiles();
          },
          mounted() {
                    
          },
          methods: {
                    addImage(){
                              
                              let url = ''
                              if( this.selectedOptions == 1){
                                        url = this.newImgSrc;
                              }else{
                                        url =  this.$serverURL +'resources/' + this.files.selectedContent.filename;
                              }
                              if (url != '') {
                                        let sample = JSON.parse(this.data.content);
                                        sample.push(url)
                                        this.data.content= JSON.stringify(sample)
                              }
                              this.isUploading = false;  
                    },
                    searchFiles(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "files/search" , {
                                        title : this.files.search,
                                        type : 'image'
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.files.contents = res.data.results;
                                        } else {
                                        }
                              }).catch((err) => { });
                    },
                    update_Components(data){
                              this.isSaving = !false;
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/update" , {
                                        id: this.data.id,
                                        data : {
                                                  content : JSON.parse(this.data.content)
                                        }
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.isSaving = false;
                                                  this.$emit('change');
                                        } else {

                                        }
                              }).catch((err) => { });
                    },
                    onError(index){
                              let sample = JSON.parse(this.data.content);
                              sample[index] = this.$errorImage;
                              this.data.content= JSON.stringify(sample)
                    }  
          } 
}
</script>