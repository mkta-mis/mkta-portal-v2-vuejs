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
                    <v-tabs v-model="selectedOptions" class="mb-3">
                              <v-tab :value="1">Via Upload</v-tab>
                              <v-tab :value="2">Via File Vault</v-tab>
                    </v-tabs>
                    <v-window v-model="selectedOptions">
                              <v-window-item :value="1">
                                        <v-card>
                                                  <v-card-text>
                                                            <v-file-input
                                                                      :multiple="isMultiple"
                                                                      :accept="Configuration.accepts"
                                                                      :label="Configuration.label"
                                                                      :placeholder="Configuration.placeholder"
                                                                      :prepend-icon="Configuration.icon"
                                                                      :disabled="curCount < maxCount"

                                                                      ref="uploadFile"
                                                                      :loading="curCount < maxCount"
                                                                      single-line
                                                                      show-size
                                                                      @change="isMultiple ? multipleUpload($event) : singleUpload($event)"
                                                            />
                                                            <v-progress-linear 
                                                                      class="rounded"
                                                                      :height="15"
                                                                      color="green"
                                                                      :max="maxCount" 
                                                                      :model-value="curCount" />

                                                  </v-card-text>
                                        </v-card>
                              </v-window-item>
                              <v-window-item :value="2">
                                        <v-card>
                                                  <v-card-text>
                                                            <v-text-field prepend-icon="mdi-magnify" persistent-hint hint="Search" v-model="this.files.search" @keyup.enter="searchFiles"></v-text-field>
                                                            <v-btn class="my-1" size="small" @click="()=>{files.search = ''; searchFiles();}"><v-icon class="me-2">mdi-refresh</v-icon>Refresh</v-btn>
                                                  </v-card-text>
                                                  <v-card-actions v-if="isDialog">
                                                            <v-spacer/>
                                                            <v-btn @click="()=>{ $emit('change',files.selectedContent) }" v-show="files.selectedContent != null" class="bg-success"><v-icon class="me-1">mdi-content-save</v-icon>Proceed</v-btn>
                                                  </v-card-actions>
                                                  <v-card-text>
                                                            <v-table
                                                            density="compact"
                                                                      class="border p-1"
                                                                      fixed-header
                                                            >
                                                                      <thead>
                                                                                <tr>
                                                                                          <th class="text-left" v-if="this.Configuration.searchType == 'image'">
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

                                                                                <!-- v-for="(curFile, fileIndex) in files.contents"  -->
                                                                                <tr v-for="curFile in paginate[curPage-1]"
                                                                                          @click="fileSelection(curFile)"
                                                                                          :class=" ( this.files.selectedKey.indexOf(curFile.id) != -1 ? 'bg-secondary' : '' )"
                                                                                          >
                                                                                          <td v-if="this.Configuration.searchType == 'image'">

                                                                                                    <v-img  :src="$serverURL +'resources/' + curFile.filename" />
                                                                                          </td>
                                                                                          <td>
                                                                                                    {{ curFile.title }}
                                                                                          </td>
                                                                                          <td>
                                                                                                    {{ curFile.type }}
                                                                                          </td>
                                                                                </tr>
                                                                      </tbody>
                                                            </v-table>
                                                  </v-card-text>
                                                  <v-card-text>
                                                            <v-pagination v-model="curPage" :length="paginate.length" :total-visible="7" />
                                                            
                                                  </v-card-text>
                                                  
                                        </v-card>
                              </v-window-item>
                    </v-window>
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
                              default : 'File Upload',
                              type: String
                    },
                    isMultiple : {
                              default: false,
                              type: Boolean
                    },
                    isSelectMultiple : {
                              default: false,
                              type: Boolean
                    },
                    Configuration : {
                              default : {
                                        accepts : 'image/png, image/jpeg, image/bmp',
                                        label : 'Upload Image',
                                        placeholder : 'Pick an Image',
                                        icon : 'mdi-file-image',
                                        searchType : 'image'
                              },
                              type: Object
                    }
          },
          data() {
                    return {
                              isSaving : true,
                              maxCount : 0,
                              curCount : 0,
                              showImage : false,
                              showDialog : false,
                              selectedOptions : 1,
                              files : {
                                        selectedContent : [],
                                        selectedKey : [],
                                        contents : [],
                                        search : ''
                              },


                              /* Table with Pagination Data */
                              data : [],
                              paginate : [],
                              curPage : 1,
                              chunkSize : 10,
                    }
          },
          components: {
          },
          setup() {

          },
          created() {
                    this.searchFiles()
          },
          mounted() {},
          methods: {
                    set_Paginate(data){
                              this.paginate = []
                              for (let i = 0; i < data.length; i += this.chunkSize) {
                                        this.paginate.push(data.slice(i, i + this.chunkSize));
                              }
                              this.curPage = 1;
                    },
                    fileSelection(curFile){
                              if(this.isSelectMultiple){
                                        let selectedKey = this.files.selectedKey.indexOf(curFile.id)
                                        if( selectedKey != -1){
                                                  this.files.selectedContent.splice(selectedKey,1)
                                                  this.files.selectedKey.splice(selectedKey,1)
                                        }else{
                                                  this.files.selectedContent.push(curFile)
                                                  this.files.selectedKey.push(curFile.id)
                                        }
                              }else{
                                        this.files.selectedContent = curFile; 
                                        this.files.selectedKey = []
                                        this.files.selectedKey.push(curFile.id)
                              }
                    },
                    searchFiles(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "files/search" , {
                                        title : this.files.search,
                                        type : this.Configuration.searchType
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.files.contents = res.data.results;
                                                  this.set_Paginate(this.files.contents);
                                        } else {
                                        }
                              }).catch((err) => { });
                    },
                    uploadFile(file){
                              let formData = new FormData();
                              formData.append('tokenString', localStorage.getItem("userToken"));
                              formData.append('image', file);
                              
                              this.$axios.post(
                                        this.$serverURL + "api/" + "files/upload", 
                                        formData, 
                                        {
                                                  headers: {
                                                            'Content-Type': 'multipart/form-data'
                                                  }
                                        }
                              ).then(res => {
                                        console.log(res.data)
                                        this.curCount++;
                                        if( this.curCount >= this.maxCount ){
                                                  this.searchFiles();
                                                  this.$refs.uploadFile.value = null;
                                        }
                              }).catch( 
                                        err=>{
                                                  this.curCount++;
                                        } 
                              );
                    },
                    singleUpload(e){
                              this.maxCount = 1;
                              this.curCount = 0
                              this.uploadFile(e.target.files[0])
                    },
                    multipleUpload(e){
                              this.maxCount = e.target.files.length;
                              this.curCount = 0
                              for (let index = 0; index <  e.target.files.length; index++) {
                                        const element =  e.target.files[index];
                                        this.uploadFile(element)
                              }
                    },
          },
}
</script>