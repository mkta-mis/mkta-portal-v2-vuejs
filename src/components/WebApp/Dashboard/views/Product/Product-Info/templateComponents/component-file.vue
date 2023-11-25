<template>
          <v-row>
                    <v-col cols="12" sm="12" >
                              <v-card flat>
                                        <v-card-actions>
                                                  <v-spacer />
                                                  <v-btn @click="editFiles" :elevation="6" icon="mdi-pencil"></v-btn>
                                        </v-card-actions>
                                        <v-card-text>
                                                  <v-list>
                                                            <v-list-item
                                                                      class="my-2"
                                                                      v-for="(row, rowIndex) in Files"
                                                                      :title="row.title"
                                                                      :subtitle="row.value"
                                                            />
                                                  </v-list>
                                        </v-card-text>
                              </v-card>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-end align-center">
                              <v-btn @click="update_Components" :loading="isSaving" color="success"  icon="mdi-content-save" size="x-large" :elevation="12" fab />
                    </v-col>
          </v-row>
          <v-dialog v-model="isEditing" fullscreen scrollable >
                    <v-card>
                              <v-card-title fixed>
                                        Component Type: File
                                        <v-btn icon="mdi-close" @click="isEditing = false" class="text-white bg-danger float-end"  fab/>
                              </v-card-title>
                              <v-card-text>
                                        <v-table>
                                                  <thead>
                                                            <tr>
                                                                      <th>Title</th>
                                                                      <th>Value</th>
                                                                      <th style="width: 50px;">
                                                                                
                                                                      </th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            <tr v-for="(row, rowIndex) in tempFiles" >
                                                                      <td class="py-2">
                                                                                <v-text-field persistent-hint hint="Title" v-model="tempFiles[rowIndex].title" />
                                                                      </td>
                                                                      <td class="py-2">
                                                                                <v-text-field persistent-hint hint="Value" v-model="tempFiles[rowIndex].value" />
                                                                      </td>
                                                                      <td class="py-2">
                                                                                <v-btn @click="remove_FilesItem(rowIndex)" icon="mdi-playlist-remove" class="my-2 bg-danger text-white" />
                                                                      </td>
                                                            </tr>
                                                            <tr>
                                                                      <td colspan="3">
                                                                                <v-btn @click="add_FilesItem" icon="mdi-playlist-plus" class="my-2" />
                                                                      </td>
                                                            </tr>
                                                  </tbody>
                                        </v-table>
                              </v-card-text>
                              <v-card-actions fixed>
                                        <v-spacer />
                                        <v-btn @click="updateFiles" class="text-white bg-success"><v-icon class="me-2">mdi-playlist-check</v-icon>Update Files</v-btn>
                              </v-card-actions>
                    </v-card>
          </v-dialog>
</template>
<script>
export default {
          props: [  'data' ],
          emits : ['change'],
          components: {  },
          setup() {

          },
          data () {
                    return {
                              isSaving : false,
                              isEditing: false,
                              Files : [],
                              tempFiles : []
                    }
          },
          created() {
          },
          mounted() {
                    this.reset();
          },
          methods: {
                    editFiles(){
                              this.isEditing = true
                              let sample = JSON.stringify(this.Files)
                              this.tempFiles = JSON.parse(sample)
                    },
                    reset(){
                              this.isEditing = !true
                              let sample = JSON.parse(this.data.content)
                              this.Files = sample
                    },
                    add_FilesItem(){
                              this.tempFiles.push({ title: '', value: '' })
                    },
                    remove_FilesItem(index){
                              this.tempFiles.splice(index,1)
                    },
                    updateFiles(){
                              let sample = JSON.stringify(this.tempFiles)
                              this.Files = JSON.parse(sample)
                              this.isEditing = !true
                    },
                    update_Components(){
                              this.isSaving = !false;
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/update" , {
                                        id: this.data.id,
                                        data : {
                                                  content : this.Files
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
          } 
}
</script>