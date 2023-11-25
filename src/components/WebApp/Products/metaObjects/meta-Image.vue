<template>
          <v-row>
                    <v-col cols="12" sm="12" md="6" v-for="(img, index) in JSON_Data">
                              <v-img @click="()=>{ curImageSrc = img ;showImage = true;}" :src="img"></v-img>
                    </v-col>
          </v-row>
          
          <v-dialog v-model="showImage"> 
                    <v-card class="bg-white">
                              <v-card-title fixed-header>
                                        Preview
                                        <v-btn icon="mdi-close" @click="showImage = !true" class="text-white bg-danger float-end"  fab/>
                              </v-card-title>
                              <v-img  :src="curImageSrc"  @error="()=>{
                                        curImageSrc = this.$errorImage
                              }" style="max-height: 500px;" />
                    </v-card>
          </v-dialog>
</template>
<script>
export default {
          props: {
                    JSON_Data : {
                              type : Object,
                              default : ["Logo.svg"]
                    }
          },
          components: {},
          data() {
                    return {
                              showImage : false,
                              curImageSrc : ''
                    };
          },
          created() {
                    
          },
          mounted() {
                    
          },
          methods: {
                    log(str){
                    }
          },
};
</script>