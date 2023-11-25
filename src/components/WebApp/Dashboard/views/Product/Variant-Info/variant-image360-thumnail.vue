<template>
<v-card  flat height="200px" rounded="0" class="border" >
          <template v-slot:image>
                    <v-img contain :src=" this.$serverURL + 'resources/' +  img_data.file_data['filename']" />
          </template>
          <v-card-actions>
                    <v-btn icon="mdi-delete" class="bg-white" fab>{{ img_data.index }}</v-btn>
                    <v-spacer />
                    <v-btn :loading="isLoading" v-if="!isDeleting" @click="isDeleting =  true" icon="mdi-delete" class="text-white bg-danger"  fab/>
                    <v-btn :loading="isLoading" v-if=" isDeleting" @click="set_Image360('delete')" class="bg-red text-white float-end mx-1" icon="mdi-check"></v-btn>
                    <v-btn :loading="isLoading" v-if=" isDeleting"  @click="isDeleting = false" class="bg-warning text-white float-end mx-1" icon="mdi-cancel"></v-btn>
                    
          </v-card-actions>
</v-card>
<v-card  rounded="0" class="border">
          <v-card-actions class="d-flex justify-space-between align-center">
                    <v-btn :disabled="1 == img_data.index" :loading="isLoading" variant="outlined" @click="set_Image360('up')" icon="mdi-chevron-up" />
                    <v-btn :loading="isLoading" @click="isEditing = true" variant="outlined" icon="mdi-pencil" />
                    <v-btn :disabled="maxCount == img_data.index" :loading="isLoading" variant="outlined" @click="set_Image360('down')" icon="mdi-chevron-down" />
          </v-card-actions>
</v-card>
<v-dialog v-model="isEditing" fullscreen>
          <File_Upload 
                              :isSelectMultiple="!true"
                              v-on:change="(data)=>{ 
                                                  append2image360(data); 
                                                  isEditing=false;
                                        }"
                              v-on:close="isEditing=false" 
                              :pageTitle="'Replace Image for 360 View'"
                              :isDialog="true" />
</v-dialog>
</template>
<script>
import File_Upload from '@/components/Files/File_Upload.vue';
export default {
          props: [  'img_data', 'maxCount' ],
          emits : [ 'change' ],
          components: { File_Upload },
          setup() {

          },
          data () {
                    return {
                              isEditing : false,
                              isDeleting : false,
                              isLoading : false
                    }
          },
          created() {
          },
          mounted() {
          },
          methods: {
                    append2image360(data){
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/image360/action" , {
                                        mainFile : this.img_data.id,
                                        file_id : data.id,
                                        action : 'replace'
                                        })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.$emit('change');
                                        } 
                              }).catch((err) => { });
                    },
                    set_Image360( action ){
                              this.isLoading = true
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/image360/action" , {
                                        product_image_id : this.img_data.id,
                                        tokenString : localStorage.getItem('userToken'),
                                        action : action
                               })
                              .then((res) => {
                                        this.isLoading = this.isDeleting = false;
                                        this.$emit('change')
                              }).catch((err) => { });
                    },
          } 
}
</script>