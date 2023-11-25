<template>
          <v-row>
                    <v-col cols="12">
                              <v-card flat>
                                        <v-card-actions>
                                                  <v-spacer />
                                                  <v-btn @click="editTable()" :elevation="6" icon="mdi-pencil"></v-btn>
                                        </v-card-actions>
                                        <v-card-text>
                                                  <v-table>
                                                            <thead>
                                                                      <tr>
                                                                                <td v-for="(col, colIndex) in table.header">
                                                                                          {{ col }}
                                                                                </td>
                                                                      </tr>
                                                            </thead>
                                                            <tbody>
                                                                      <tr v-for="(row, rowIndex) in table.body">
                                                                                <td v-for="(col, colIndex) in row">
                                                                                          {{ col }}
                                                                                </td>
                                                                      </tr>
                                                            </tbody>
                                                  </v-table>
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
                                        Component Type: Table
                                        <v-btn icon="mdi-close" @click="isEditing = false" class="text-white bg-danger float-end"  fab/>
                              </v-card-title>
                              <v-card-text>
                                        <v-table fixed-header height="50%">
                                                  <thead>
                                                            <tr class="bg-grey-lighten-2">
                                                                      <td  v-for="(col, colIndex) in tempTable.header">
                                                                                <div class="d-flex justify-center align-center bg-transparent">
                                                                                          <v-btn  @click="removeColumn(colIndex)" class="bg-danger my-2 text-white" icon="mdi-table-column-remove" />
                                                                                </div>
                                                                      </td>
                                                                      <td style="width: 50px;">
                                                                      </td>
                                                            </tr>
                                                            <tr>
                                                                      <th v-for="(col, colIndex) in tempTable.header">
                                                                                <v-text-field v-model="tempTable.header[colIndex]" persistent-hint hint="Header Text"
                                                                                />
                                                                      </th>
                                                                      <th style="width: fit-content;">
                                                                                <div v-if="tempTable.header.length <5"  class="d-flex justify-center align-center">
                                                                                          <v-btn @click="addColumn()" class="py-2" icon="mdi-table-column-plus-after"></v-btn>
                                                                                </div>
                                                                      </th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            <tr v-for="(row, rowIndex) in tempTable.body">
                                                                      <td class="py-1" v-for="(col, colIndex) in row">
                                                                                <v-text-field v-model="tempTable.body[rowIndex][colIndex]" persistent-hint hint="Cell Content" />
                                                                      </td>
                                                                      <td >
                                                                                <div class="d-flex py-2 justify-center align-center">
                                                                                          <v-btn @click="removeRow(rowIndex)" class="bg-danger text-white" icon="mdi-table-row-remove" />
                                                                                </div>
                                                                      </td>
                                                            </tr>
                                                            <tr class="bg-grey-lighten-2">
                                                                      <td :colspan="tempTable.header.length + 1">
                                                                                <v-btn @click="addRow" class="my-2" icon="mdi-table-row-plus-after"></v-btn>
                                                                      </td>
                                                            </tr>
                                                  </tbody>
                                        </v-table>
                              </v-card-text>
                              <v-card-actions fixed>
                                        <v-spacer />
                                        <v-btn @click="updateTable" class="text-white bg-success"><v-icon>mdi-timetable</v-icon>Update Table</v-btn>
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
                              isEditing : false,
                              table : {
                                        header : [],
                                        body : [],
                                        footer : [],
                              },
                              tempTable : []
                    }
          },
          created() {
                    this.reset();
          },
          mounted() {
                    this.reset();
          },
          methods: {
                    updateTable(){
                              let sample = JSON.stringify(this.tempTable)
                              this.table = JSON.parse(sample)
                              this.isEditing = false
                    },
                    editTable(){
                              let sample = JSON.stringify(this.table)
                              this.tempTable = JSON.parse(sample)
                              this.isEditing = true
                    },
                    removeRow(index){
                              this.tempTable.body.splice(index, 1)
                    },
                    addRow(){
                              let sample = [];
                              this.tempTable.header.forEach(element => {
                                        sample.push("");
                              });
                              this.tempTable.body.push(sample);
                    },
                    removeColumn(index){
                              this.tempTable.header.splice(index, 1)
                              this.tempTable.body.forEach(element => {
                                        element.splice(index,1)
                              });
                    },
                    addColumn(){
                              this.tempTable.header.push("");
                              this.tempTable.body.forEach(element => {
                                        element.push("");
                              });
                    },
                    reset(){
                              this.table = JSON.parse(this.data.content)
                    },
                    update_Components(){
                              this.isSaving = !false;
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/update" , {
                                        id: this.data.id,
                                        data : {
                                                  content : this.table
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