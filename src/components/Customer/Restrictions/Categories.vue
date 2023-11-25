<template>
          <v-card>
                    
                    
                    <v-card-item>
                              <v-autocomplete
                                        :disabled="( categories.filter(x => !restricted_Categories.includes(x)) ).length <= 0"
                                        v-model="selected_Categories"
                                        @update:modelValue="()=>{ 
                                                  User_Restriction('append', selected_Categories)
                                        }"
                                        hint="Hide all products related to the Categories"          
                                        persistent-hint
                                        item-title="name"
                                        return-object
                                        label="Categories"
                                        :items="( categories.filter(x => !restricted_Categories.includes(x)) )"
                              />
                              <v-sheet class="d-flex flex-wrap" v-if="restricted_Categories.length > 0">
                                        <v-sheet v-for="(item, index) in restricted_Categories" class=" ma-2 " >
                                                  <v-card 
                                                            flat
                                                            width="250" 
                                                            class="h-100 border">
                                                                      <v-img
                                                                                :src=" this.$serverURL +'resources/' + item.thumbnail['filename']"
                                                                                cover
                                                                                class="text-white"
                                                                                >
                                                                                <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
                                                                                          <template v-slot:append>
                                                                                                    <v-btn @click="()=>{ User_Restriction('remove',item); }" class="bg-danger" fab size="x-small" icon="mdi-close"></v-btn>
                                                                                          </template>
                                                                                </v-toolbar>
                                                                      </v-img>
                                                                      <v-card-title class="text-center">
                                                                                {{ item.name }}
                                                                      </v-card-title>
                                                                      <v-card-text>
                                                                                {{ item.description }}
                                                                      </v-card-text>
                                                  </v-card>
                                        </v-sheet>
                              </v-sheet>
                              <v-sheet class="text-center" v-else>
                                        No restricted Categories
                              </v-sheet>
                    </v-card-item>
          </v-card>
</template>
<script>
export default {
          emits : [],
          components: {
                    
          },
          props : {
                    
          },
          data() {
                    return {
                              customerToken : this.$route.params.customerToken,
                              restricted_Categories : [],
                              categories : [],
                              selected_Categories : null
                    }
          },
          
          setup() {

          },
          created() {
                    this.get_Categories();
                    this.get_Restriction_Categories();
          },
          mounted() {
                    
          },
          methods: {
                    get_Restriction_Categories(){
                              this.$axios
                              .post(this.$serverURL + "api/" + "customers/web-admin/restriction/" + "fetch" + "/" + "categories", { 
                                        tokenString: localStorage.getItem("userToken"),
                                        customerToken : this.customerToken, 
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.restricted_Categories = res.data.results;
                                        } else {

                                        }
                              }).catch((err) => {});
                    },
                    User_Restriction(mode, data){
                              this.$axios
                              .post(this.$serverURL + "api/" + "customers/web-admin/restriction/" + mode + "/" + "categories", { 
                                        tokenString: localStorage.getItem("userToken"),
                                        customerToken : this.customerToken, 
                                        referenceValue : data.id
                              })
                              .then((res) => {
                                        this.get_Restriction_Categories()
                                        if (res.data.code == 200) {
                                                  this.categories = res.data.data;
                                                  
                                        } else {

                                        }
                              }).catch((err) => {});
                    },
                    get_Categories() {
                              this.$axios
                              .post(this.$serverURL + "api/" + "categories/web-admin/list", { mode: 'parent-only', withs : ['thumbnail'] })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.categories = res.data.data;
                                        } else {

                                        }
                              }).catch((err) => {});
                    }
          },
}
</script>