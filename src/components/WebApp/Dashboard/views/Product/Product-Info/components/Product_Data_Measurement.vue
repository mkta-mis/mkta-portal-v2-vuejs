<template>
<v-card flat>
          <v-card-title>Measurements</v-card-title>
          <v-card-text>
                    <v-row>
                              <v-col cols="12" xs="12" sm="12" md="6" lg="4">
                                        <v-card flat  class="h-100 border">
                                                  <v-card-title>
                                                            Volume
                                                  </v-card-title>
                                                  <v-card-text>
                                                            <v-table>
                                                                      <tbody>
                                                                                <tr>
                                                                                          <td>
                                                                                                    Product
                                                                                          </td>
                                                                                          <td>
                                                                                                    <div class="input-group">
                                                                                                              <input type="number" class="form-control rounded-0" v-model="data.Volume_Raw" @change="isNotEqual()">
                                                                                                              <span class="input-group-text rounded-0">m<sup>3</sup></span>
                                                                                                    </div>
                                                                                          </td>
                                                                                </tr>
                                                                      </tbody>
                                                            </v-table>
                                                  </v-card-text>
                                        </v-card>
                              </v-col>
                              <v-col cols="12" xs="12" sm="12" md="6" lg="4">
                                        <v-card flat class="h-100 border">
                                                  <v-card-title>
                                                            Weight
                                                  </v-card-title>
                                                  <v-card-text>
                                                            <v-table>
                                                                      <tbody>
                                                                                <tr>
                                                                                          <td>
                                                                                                    Net
                                                                                          </td>
                                                                                          <td>
                                                                                                    <div class="input-group">
                                                                                                              <input type="number" class="form-control rounded-0" v-model="data.Weight_Net" @change="isNotEqual()">
                                                                                                              <span class="input-group-text rounded-0">kg</span>
                                                                                                    </div>
                                                                                          </td>
                                                                                </tr>
                                                                                <tr>
                                                                                          <td>
                                                                                                    Gross
                                                                                          </td>
                                                                                          <td>
                                                                                                    <div class="input-group">
                                                                                                              <input type="number" class="form-control rounded-0" v-model="data.Weight_Gross" @change="isNotEqual()">
                                                                                                              <span class="input-group-text rounded-0">kg</span>
                                                                                                    </div>
                                                                                          </td>
                                                                                </tr>
                                                                      </tbody>
                                                            </v-table>
                                                  </v-card-text>
                                        </v-card>
                              </v-col>
                              <v-col cols="12" xs="12" sm="12" md="6" lg="4">
                                        <v-card  flat  class="h-100 border">
                                                  <v-card-title>
                                                            Dimensions
                                                  </v-card-title>
                                                  <v-card-text>
                                                            <v-table>
                                                                      <tbody>
                                                                                <tr>
                                                                                          <td>

                                                                                          </td>
                                                                                          <td>
                                                                                                    Raw
                                                                                          </td>
                                                                                          <td>
                                                                                                    Packed
                                                                                          </td>
                                                                                </tr>
                                                                                <tr>
                                                                                          <td>
                                                                                                    Length
                                                                                          </td>
                                                                                          <td>
                                                                                                    <div class="input-group">
                                                                                                              <input type="number" class="form-control rounded-0" v-model="this.data.Dimension_Raw_L" @change="isNotEqual" :min="0">
                                                                                                              <span class="input-group-text rounded-0">cm</span>
                                                                                                    </div>
                                                                                          </td>
                                                                                          <td>
                                                                                                    <div class="input-group">
                                                                                                              <input type="number" class="form-control rounded-0" v-model="this.data.Dimension_Packed_L" @change="isNotEqual" :min="0">
                                                                                                              <span class="input-group-text rounded-0">cm</span>
                                                                                                    </div>
                                                                                          </td>
                                                                                </tr>
                                                                                <tr>
                                                                                          <td>
                                                                                                    Width
                                                                                          </td>
                                                                                          <td>
                                                                                                    <div class="input-group">
                                                                                                              <input type="number" class="form-control rounded-0" v-model="this.data.Dimension_Raw_W" @change="isNotEqual" :min="0">
                                                                                                              <span class="input-group-text rounded-0">cm</span>
                                                                                                    </div>
                                                                                          </td>
                                                                                          <td>
                                                                                                    <div class="input-group">
                                                                                                              <input type="number" class="form-control rounded-0" v-model="this.data.Dimension_Packed_W" @change="isNotEqual" :min="0">
                                                                                                              <span class="input-group-text rounded-0">cm</span>
                                                                                                    </div>
                                                                                          </td>
                                                                                </tr>
                                                                                <tr>
                                                                                          <td>
                                                                                                    Height
                                                                                          </td>
                                                                                          <td>
                                                                                                    <div class="input-group">
                                                                                                              <input type="number" class="form-control rounded-0" v-model="this.data.Dimension_Raw_H" @change="isNotEqual" :min="0">
                                                                                                              <span class="input-group-text rounded-0">cm</span>
                                                                                                    </div>
                                                                                          </td>
                                                                                          <td>
                                                                                                    <div class="input-group">
                                                                                                              <input type="number" class="form-control rounded-0" v-model="this.data.Dimension_Packed_H" @change="isNotEqual" :min="0">
                                                                                                              <span class="input-group-text rounded-0">cm</span>
                                                                                                    </div>
                                                                                          </td>
                                                                                </tr>
                                                                      </tbody>
                                                            </v-table>
                                                  </v-card-text>
                                        </v-card>
                              </v-col>
                    </v-row>
          </v-card-text>
          <v-card-actions>
                    Note: This will be automatically converted into Imperial/English System
                    <v-spacer/>
                    <v-btn :loading="isSaving" @click="updateMeasurement()" v-if="isChanged.indexOf(true) != -1" class="bg-success"><v-icon class="me-2">mdi-content-save</v-icon>Save</v-btn>
          </v-card-actions>
</v-card>
</template>
<script>
export default {
          props: [  'item' ],
          components: { },
          setup() {

          },
          data () {
                    return {
                              data : [],
                              isSaving : false,
                              isChanged : [false, false, false, false, false, false]
                    }
          },
          created() {
                    this.data = JSON.parse(JSON.stringify(this.item))
                    // this.data = this.item

          },
          mounted() {
                    
          },
          methods: {
                    isNotEqual(){
                              this.isChanged = [
                                                  this.item.Dimension_Packed_L != this.data.Dimension_Packed_L
                                                  ,
                                                  this.item.Dimension_Packed_W != this.data.Dimension_Packed_W
                                                  ,
                                                  this.item.Dimension_Packed_H != this.data.Dimension_Packed_H
                                                  ,
                                                  this.item.Dimension_Raw_L != this.data.Dimension_Raw_L
                                                  ,
                                                  this.item.Dimension_Raw_W != this.data.Dimension_Raw_W
                                                  ,
                                                  this.item.Dimension_Raw_H != this.data.Dimension_Raw_H
                                                  ,
                                                  this.item.Volume_Raw != this.data.Volume_Raw
                                                  ,
                                                  this.item.Volume_Packed != this.data.Volume_Packed
                                                  ,
                                                  this.item.Weight_Net != this.data.Weight_Net
                                                  ,
                                                  this.item.Weight_Gross != this.data.Weight_Gross
                              ]
                    }, 
                    updateMeasurement(){
                              this.isSaving = true;
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/full-info/update" , {
                                        product_id: this.data.id,
                                        tokenString : localStorage.getItem("userToken"),
                                        data : {
                                                  Dimension_Packed_L            : this.data.Dimension_Packed_L,
                                                  Dimension_Packed_W            : this.data.Dimension_Packed_W,
                                                  Dimension_Packed_H            : this.data.Dimension_Packed_H,
                                                  Dimension_Raw_L               : this.data.Dimension_Raw_L,
                                                  Dimension_Raw_W               : this.data.Dimension_Raw_W,
                                                  Dimension_Raw_H               : this.data.Dimension_Raw_H,
                                                  Volume_Raw                    : this.data.Volume_Raw,
                                                  Volume_Packed                 : this.data.Volume_Packed,
                                                  Weight_Net                    : this.data.Weight_Net,
                                                  Weight_Gross                  : this.data.Weight_Gross,
                                        }
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.isSaving = false;
                                                  this.$emit('change');
                                        } else {

                                        }
                              }).catch((err) => { });
                    }
          } 
}
</script>