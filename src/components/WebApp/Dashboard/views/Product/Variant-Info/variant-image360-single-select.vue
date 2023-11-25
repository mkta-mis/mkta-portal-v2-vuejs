<template>
          <v-card class="bg-white">
                    <v-card-title fixed-header>
                              Product Image 360
                              <v-btn icon="mdi-close" @click="$emit('close')" class="text-white bg-danger float-end"  fab/>
                    </v-card-title>
                    <v-card-text>
                              <v-text-field persistent-hint hint="Search" v-model="this.files.search" @keyup.enter="searchFiles"></v-text-field>
                              <v-btn class="my-1" size="small" @click="()=>{files.search = ''; searchFiles();}"><v-icon class="me-2">mdi-refresh</v-icon>Refresh</v-btn>
                    </v-card-text>
                    <v-card-text>
                              <v-table
                                                  class="border p-1"
                                                  fixed-header
                                                  fixed-footer
                                                  height="63vh"
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
                                        <tfoot>
                                                  <tr>
                                                            <td colspan="3">
                                                                      <v-file-input
                                                                                v-model="uploaded"
                                                                                accept="image/png, image/jpeg, image/bmp"
                                                                                placeholder="Pick an Image 360"
                                                                                prepend-icon="mdi-file-image"
                                                                                label="Image 360"
                                                                                ref="uploadFile"
                                                                                density="compact"
                                                                                :ref="'uploadFile'"
                                                                                :loading="curCount < maxCount"
                                                                                single-line
                                                                                show-size
                                                                                multiple
                                                                                @change="multipleUpload"
                                                                      />
                                                            </td>
                                                  </tr>
                                        </tfoot>
                              </v-table>
                    </v-card-text>
                    <v-card-actions fixed-header>
                              <v-spacer/>
                              <v-btn @click="append2image360()" class="bg-success"><v-icon class="me-2">mdi-content-save</v-icon>Replace to Image</v-btn>
                    </v-card-actions>
          </v-card>
</template>
<script>
export default {
                    props: [  'img_data' ],
                    emits : [ 'change', 'close' ],
                    components: {  },
                    setup() {
          
                    },
                    data () {
                              return {
                                        maxCount : 0,
                                        curCount : 0,
          
                                        uploaded : [],
          
                                        selectedOptions : 1,
                                        files : {
                                                  selectedContent : [],
                                                  contents : [],
                                                  search : ''
                                        }
                              }
                    },
                    created() {
                    },
                    mounted() {
                              this.searchFiles();
                    },
                    methods: {
                              append2image360(){
                                        if( this.files.selectedContent.length == 0){
                                                  return;
                                        }
                                        this.$axios
                                        .post( this.$serverURL + "api/" + "products/image360/action" , {
                                                  mainFile : this.img_data.id,
                                                  file_id : this.files.selectedContent.id,
                                                  action : 'replace'
                                         })
                                        .then((res) => {
                                                  if (res.data.code == 200) {
                                                            this.$emit('change');
                                                  } 
                                        }).catch((err) => { });
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
                              multipleUpload(e){
                                        this.maxCount = e.target.files.length;
                                        this.curCount = 0
                                        for (let index = 0; index < this.maxCount; index++) {
                                                  const element = e.target.files[index];
                                                  const file = e.target.files[index];
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
                                                            this.curCount++
                                                            if( this.maxCount == this.curCount ){
                                                                      this.uploaded = []
                                                                      this.searchFiles();
                                                            }
                                                            
                                                  }).catch( err=>{} );
                                        }
                              },
                    } 
          }
          </script>