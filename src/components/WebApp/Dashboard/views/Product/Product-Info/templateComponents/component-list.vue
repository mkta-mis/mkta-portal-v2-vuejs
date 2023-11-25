<template>
          <v-row>
                    <v-col cols="12" sm="12" >
                              <v-card flat>
                                        <v-card-actions>
                                                  <v-spacer />
                                                  <v-btn @click="editList" :elevation="6" icon="mdi-pencil"></v-btn>
                                        </v-card-actions>
                                        <v-card-text>
                                                  <v-list>
                                                            <v-list-item
                                                                      class="my-2"
                                                                      v-for="(row, rowIndex) in List"
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
                                        Component Type: List
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
                                                            <tr v-for="(row, rowIndex) in tempList" >
                                                                      <td class="py-2">
                                                                                <v-text-field persistent-hint hint="Title" v-model="tempList[rowIndex].title" />
                                                                      </td>
                                                                      <td class="py-2">
                                                                                <v-text-field persistent-hint hint="Value" v-model="tempList[rowIndex].value" />
                                                                      </td>
                                                                      <td class="py-2">
                                                                                <v-btn @click="remove_ListItem(rowIndex)" icon="mdi-playlist-remove" class="my-2 bg-danger text-white" />
                                                                      </td>
                                                            </tr>
                                                            <tr>
                                                                      <td colspan="3">
                                                                                <v-btn @click="add_ListItem" icon="mdi-playlist-plus" class="my-2" />
                                                                      </td>
                                                            </tr>
                                                  </tbody>
                                        </v-table>
                              </v-card-text>
                              <v-card-actions fixed>
                                        <v-spacer />
                                        <v-btn @click="updateList" class="text-white bg-success"><v-icon class="me-2">mdi-playlist-check</v-icon>Update List</v-btn>
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
                              tempList : [],
                              List : []
                    }
          },
          created() {
          },
          mounted() {
                    this.reset();
          },
          methods: {
                    editList(){
                              this.isEditing = true
                              let sample = JSON.stringify(this.List)
                              this.tempList = JSON.parse(sample)
                    },
                    reset(){
                              this.isEditing = !true
                              let sample = JSON.parse(this.data.content)
                              this.List = sample
                    },
                    add_ListItem(){
                              this.tempList.push({ title: '', value: '' })
                    },
                    remove_ListItem(index){
                              this.tempList.splice(index,1)
                    },
                    updateList(){
                              let sample = JSON.stringify(this.tempList)
                              this.List = JSON.parse(sample)
                              this.isEditing = !true
                    },
                    update_Components(){
                              this.isSaving = !false;
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/update" , {
                                        id: this.data.id,
                                        data : {
                                                  content : this.List
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