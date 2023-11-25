<template>
          <v-list>
                    <v-list-item>

                              <v-img  @click="()=>{ curImageSrc = img ;showImage = true;}" :src="this.$serverURL+'resources/' + data.thumbnail['filename']" />
                    </v-list-item>
                    <v-list-item>
                              <v-btn variant="outlined" @click="()=>{files.selectedContent = null; files.search = ''; searchFiles(); showDialog=true; }" class="w-100">Change thumbnail</v-btn>
                    </v-list-item>
          </v-list>
<v-dialog v-model="showDialog" fullscreen>
          <File_Upload 
                    v-on:change="(data)=>{ setAsThumbnail(data); showDialog=false }"
                    v-on:close="showDialog=false" 
                    :pageTitle="'Product Thumbnail'"
                    :isDialog="true" />
</v-dialog>
<v-dialog v-model="showImage" width="800"> 
          <v-card class="bg-white">
                    <v-card-title fixed-header>
                              Preview
                              <v-btn icon="mdi-close" @click="showImage = !true" class="text-white bg-danger float-end"  fab/>
                    </v-card-title>
                    <v-img  :src="this.$serverURL+'resources/' + data.thumbnail['filename']" style="max-height: 500px;" />
          </v-card>
</v-dialog>
</template>
<script>
import File_Upload from '@/components/Files/File_Upload.vue';
export default {
          props: [  'data' ],
          emits : ['change'],
          components: { File_Upload },
          setup() {

          },
          data () {
                    return {
                              isSaving : true,
                              maxCount : 0,
                              curCount : 0,
                              showImage : false,
                              showDialog : false,
                              selectedOptions : 1,
                              files : {
                                        selectedContent : null,
                                        contents : [],
                                        search : ''
                              }
                    }
          },
          created() {
          },
          mounted() {
                    
          },
          methods: {
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
                    setAsThumbnail(data){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/full-info/update", {
                                        product_id : this.data.id,
                                        tokenString : localStorage.getItem('userToken'),
                                        data : {
                                                  file_id : data.id
                                        }
                                        })
                              .then((res) => {
                                        this.$emit('change')
                                        this.showDialog = false
                              }).catch((err) => { });
                    },
                    singleUpload(e){
                              return;
                              // Obselete Function
                              this.maxCount = 1;
                              this.curCount = 0

                              const file = e.target.files[0];
                              // const config = { headers: { 'enctype': 'multipart/form-data', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content, } }
                              let formData = new FormData();
                              formData.append('product_id', this.data.id);
                              formData.append('tokenString', localStorage.getItem("userToken"));
                              formData.append('image', file);
                              
                              this.$axios.post(
                                        this.$serverURL + "api/" + "products/thumbnail/update", 
                                        formData, 
                                        {
                                                  headers: {
                                                            'Content-Type': 'multipart/form-data'
                                                  }
                                        }
                              ).then(res => {
                                        this.curCount++
                                        this.$refs.uploadFile.value = null;
                                        this.showDialog = false
                                        this.$emit('change')
                              }).catch( err=>{} );
                    },
                    
          } 
}
</script>