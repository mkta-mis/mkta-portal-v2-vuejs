<template>
          <v-row class="" height="500">
                    
                    <v-col cols="12">
                              <v-card-subtitle>
                                        Restrict the access of the customer(s) in the Categories, Product Items, and Product Components.
                              </v-card-subtitle>
                    </v-col>
                    <v-col cols="12" sm="12">
                              <v-tabs
                                        v-model="selectedTabs"
                                        
                                        color="deep-purple-accent-4"
                              >
                                        <v-tab v-for="(Tab, index) in Tabs" :value="Tab">{{ Tab }}</v-tab>
                              </v-tabs>
                    </v-col>
                    <v-col cols="12" sm="12">
                              <v-window direction="vertical" v-model="selectedTabs" class="w-100">
                                        <v-window-item value="Categories" >
                                                  <Restriction_Categories />
                                        </v-window-item>
                                        <v-window-item value="Product Item">
                                                  <Restriction_Products />
                                        </v-window-item>
                                        <v-window-item value="Product Components">
                                                  <Restriction_Component_Keys />
                                        </v-window-item>
                              </v-window>
                    </v-col>
          </v-row>
</template>
<script>
import Restriction_Categories from '@/components/Customer/Restrictions/Categories.vue';
import Restriction_Products from '@/components/Customer/Restrictions/Products.vue';
import Restriction_Component_Keys from '@/components/Customer/Restrictions/Component-Keys.vue';

export default {
          emits : [],
          components: {
                    Restriction_Categories, Restriction_Products, Restriction_Component_Keys
          },
          props : {
                    
          },
          data() {
                    return {
                              customerToken : this.$route.params.customerToken,
                              selectedTabs : null,
                              Tabs : [ 'Categories', 'Product Item', 'Product Components' ]
                    }
          },
          
          setup() {

          },
          created() {
          },
          mounted() {

          },
          methods: {
                    
          },
}
</script>