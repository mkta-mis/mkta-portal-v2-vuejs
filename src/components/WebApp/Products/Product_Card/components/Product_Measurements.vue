<template>
<li class="list-group-item bg-transparent border-0 mt-4 mb-5 border-bottom" v-if="[isVisible_Dimension, isVisible_Volume, isVisible_Weight].includes(true)">
          Measurements
          <v-tabs v-model="sel_UoM">
                    <v-tab value="Metric">International System</v-tab>
                    <v-tab value="Imperial">English System</v-tab>
          </v-tabs>
          <v-list class="bg-transparent">
                    <v-list-item title="Dimension" v-if="isVisible_Dimension" >
                              <table class="bg-transparent table table-striped">
                                        <thead>
                                        
                                                  <tr>
                                                            <th scope="col" style="width: 20%" class="text-end"></th>
                                                            <th scope="col" class="text-center">Unpacked</th>
                                                            <th scope="col" class="text-center">Packed</th>
                                                  </tr>
                                        </thead>
                                        <tbody>
                                                  
                                                  <tr>
                                                            <td style="width: 20%" class="text-end">Length:</td>

                                                            <td v-if="sel_UoM == 'Metric'" class="text-center" v-html="convert('cm', data.Dimension_Raw_L)" />
                                                            <td v-else class="text-center" v-html="convert('in', data.Dimension_Packed_L)" />


                                                            <td v-if="sel_UoM == 'Metric'" class="text-center" v-html="convert('cm', data.Dimension_Raw_L)" />
                                                            <td v-else class="text-center" v-html="convert('in', data.Dimension_Packed_L)" />
                                                  </tr>
                                                  <tr>
                                                            <td style="width: 20%" class="text-end">Width:</td>
                                                            
                                                            <td v-if="sel_UoM == 'Metric'" class="text-center" v-html="convert('cm', data.Dimension_Raw_W)" />
                                                            <td v-else class="text-center" v-html="convert('in', data.Dimension_Packed_W)" />


                                                            <td v-if="sel_UoM == 'Metric'" class="text-center" v-html="convert('cm', data.Dimension_Raw_W)" />
                                                            <td v-else class="text-center" v-html="convert('in', data.Dimension_Packed_W)" />
                                                  </tr>
                                                  <tr>
                                                            <td style="width: 20%" class="text-end">Height:</td>
                                                            
                                                            <td v-if="sel_UoM == 'Metric'" class="text-center" v-html="convert('cm', data.Dimension_Raw_H)" />
                                                            <td v-else class="text-center" v-html="convert('in', data.Dimension_Packed_H)" />


                                                            <td v-if="sel_UoM == 'Metric'" class="text-center" v-html="convert('cm', data.Dimension_Raw_H)" />
                                                            <td v-else class="text-center" v-html="convert('in', data.Dimension_Packed_H)" />
                                                  </tr>
                                        </tbody>
                              </table>
                    </v-list-item>
                    <v-list-item title="Weight" v-if="isVisible_Weight">
                              <table class="bg-transparent table table-striped">
                                        <tbody>
                                                  <tr>
                                                            <td style="width: 20%" class="text-end">
                                                                      Net:
                                                            </td>
                                                            <td v-if="sel_UoM == 'Metric'" class="text-start" v-html="convert('kgs', data.Weight_Net)" />
                                                            <td v-else class="text-start" v-html="convert('lbs', data.Weight_Net)" />
                                                  </tr>
                                                  <tr>
                                                            <td style="width: 20%" class="text-end">
                                                                      Gross:
                                                            </td>
                                                            <td v-if="sel_UoM == 'Metric'" class="text-start" v-html="convert('kgs', data.Weight_Gross)" />
                                                            <td v-else class="text-start" v-html="convert('lbs', data.Weight_Gross)" />
                                                  </tr>
                                        </tbody>
                              </table>
                    </v-list-item>
                    <v-list-item title="Volume" v-if="isVisible_Volume">
                              <table class="bg-transparent table table-striped">
                                        <tbody>
                                                  <tr>
                                                            <td style="width: 20%" class="text-end">
                                                                      Product:
                                                            </td>
                                                            <td v-if="sel_UoM == 'Metric'" class="text-start" v-html="convert('m', data.Volume_Raw, '<sup>3</sup>')" />
                                                            <td v-else class="text-start" v-html="convert('ft', data.Volume_Raw, '<sup>3</sup>')" />
                                                  </tr>
                                        </tbody>
                              </table>
                    </v-list-item>
          </v-list>
</li>
</template>
<script>
export default {
          props: [  'data' ],
          components: { },
          setup() {
          },
          data () {
                    return {
                              sel_UoM : 'Metric', 
                              isVisible_Dimension : true,
                              isVisible_Weight    : true,
                              isVisible_Volume    : true,
                    }
          },
          created() {
          },
          mounted() {
          },
          methods: {
                    convert( to, value, appendix = ''){
                              switch (to) {
                                        case 'ft':
                                                  value = value * 35.3147
                                                  break;
                                        case 'in':
                                                  value = value * 0.393701;
                                                  break;
                                        case 'lbs':
                                                  value = value * 2.20462;
                                                  break;
                                        default:
                                                  value = value 
                                                  break;
                              }
                              return (new Number(value).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits: 2 })) + ' ' + to +  appendix;
                    },
                    convert_ft(value){
                              return (value * 35.3147)
                    }
          } 
}
</script>