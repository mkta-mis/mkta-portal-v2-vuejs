<template>
          <v-card flat class="">
                    <v-img :src="this.$serverURL + 'resources/' + data.thumbnail.filename" height="200px" contain />
                    <v-card-text>
                              <v-row>
                                        <v-col cols="12" sm="4"  v-for="(variant, var_index) in data.variants" :key="var_index">
                                                  <v-img contain :src="this.$serverURL + 'resources/' + variant.thumbnail['filename']" />
                                        </v-col>
                              </v-row>
                              
                    </v-card-text>
                    <v-card-text class="text-center h6 text-dark">
                              {{ data.code }}<br/>
                              {{ data.name }}
                    </v-card-text>
          </v-card>
</template>
<script>


export default {
          props: [ 'data', 'isThumbnail' ],
          data() {
                    return {};
          },
          components: {  },
          setup() { },
          created() { },
          mounted() { },
          methods: {
                    
          },
};
</script>