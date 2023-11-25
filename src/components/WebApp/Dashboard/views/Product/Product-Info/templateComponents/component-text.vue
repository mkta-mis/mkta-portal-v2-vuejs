<template>
          <v-row>
                    <v-col cols="12" sm="12" >
                              <v-card  flat  >
                                        <v-card-text >
                                                  <v-textarea v-model="data.content" label="Text"/>
                                        </v-card-text>
                              </v-card>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-end align-center">
                              <v-btn @click="update_Components" :loading="isSaving" color="success"  icon="mdi-content-save" size="x-large" :elevation="12" fab />
                    </v-col>
          </v-row>
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
                              isSaving : false
                    }
          },
          created() {
          },
          mounted() {
                    
          },
          methods: {
                    update_Components(data){
                              this.isSaving = !false;
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/data/components/update" , {
                                        id: this.data.id,
                                        data : {
                                                  content : this.data.content
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