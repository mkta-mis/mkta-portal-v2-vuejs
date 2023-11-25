<template>
<v-row>
          <v-col xs="12" sm="12">
                    <router-link :to="{ name: 'Dashboard User', params: {}}">
                              <v-btn color="purple"><v-icon>mdi-chevron-left</v-icon>Back</v-btn>
                    </router-link>
          </v-col>
          <v-col xs="12">
                    <v-card>
                              <v-tabs v-model="selectedOptions" class="mb-3">
                                        <v-tab :value="index" v-for="(item, index) in ['Basic Information', 'Role Information']">{{ item }}</v-tab>
                              </v-tabs>
                              <v-window v-model="selectedOptions">
                                        <v-window-item :value="0">
                                                  <BasicInformation />
                                        </v-window-item>
                                        <v-window-item :value="1">
                                                  <RoleInformation />
                                        </v-window-item>
                              </v-window>
                    </v-card>
          </v-col>
</v-row>
</template>
<script>
import BasicInformation from '@/components/Users/BasicInformation.vue';
import RoleInformation from '@/components/Users/RoleInformation.vue';

export default {
          emits : [],
          components: {
                    BasicInformation, RoleInformation
          },
          props : {
                    
          },
          data() {
                    return {
                              
                              selectedOptions : 0,
                              
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