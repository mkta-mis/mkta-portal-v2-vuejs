<template>
          <v-card>
                    <v-card-item>
                              <v-autocomplete
                                        :disabled="( components_keys).length <= 0"
                                        v-model="selected_Components"
                                        @update:modelValue="()=>{ 
                                                  User_Restriction('append', selected_Components)
                                        }"
                                        hint="Hide all products component related to the Component Keys"          
                                        persistent-hint
                                        item-title="key"
                                        item-value="key"
                                        label="Component Keys"
                                        :items="( components_keys )"
                              />
                              <v-sheet class="my-2" v-if="restricted_Components.length > 0">
                                        <v-chip class="m-2" @click:close="User_Restriction('remove', key)" closable v-for="(key, index) in restricted_Components" :key="key"> {{ key }} </v-chip>
                              </v-sheet>
                              <v-sheet class="text-center" v-else>
                                        No restricted Component Keys
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
                              restricted_Components : [],
                              components_keys : [],
                              selected_Components : null
                    }
          },
          
          setup() {

          },
          created() {
                    this.get_Keys();
                    this.get_Restriction();
          },
          mounted() {
                    
          },
          methods: {
                    get_Restriction(){
                              this.selected_Components = null
                              this.$axios
                              .post(this.$serverURL + "api/" + "customers/web-admin/restriction/" + "fetch" + "/" + "product-components", { 
                                        tokenString: localStorage.getItem("userToken"),
                                        customerToken : this.customerToken, 
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.restricted_Components = res.data.results;
                                        } else {

                                        }
                              }).catch((err) => {});
                    },
                    User_Restriction(mode, data){
                              this.$axios
                              .post(this.$serverURL + "api/" + "customers/web-admin/restriction/" + mode + "/" + "product-components", { 
                                        tokenString: localStorage.getItem("userToken"),
                                        customerToken : this.customerToken, 
                                        referenceValue : data
                              })
                              .then((res) => {
                                        this.get_Restriction()
                                        if (res.data.code == 200) {
                                                  this.components_keys = res.data.data;
                                        } else {

                                        }
                              }).catch((err) => {});
                    },
                    get_Keys() {
                              this.$axios
                              .post(this.$serverURL + "api/" + "customers/web-admin/restriction/" + "fetch" + "/" + "product-components-list", { 
                                        tokenString: localStorage.getItem("userToken"),
                                        customerToken : this.customerToken, 
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.components_keys = res.data.results;
                                                  ['product-measurements-dimensions', 'product-measurements-weight', 'product-measurements-volume'].forEach(
                                                            (key) => {
                                                                      this.components_keys.push(key)
                                                            }
                                                  );
                                                  
                                        } else {

                                        }
                              }).catch((err) => {});
                    }
          },
}
</script>