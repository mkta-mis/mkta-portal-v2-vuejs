<template>
<v-col cols="12" xs="12" sm="12" md="4" >
          <v-card  :elevation="6" class="h-100 bg-white" >
                    <v-card-title>{{ data.title }}</v-card-title>
                    <v-card-text>
                              <metaImage v-if="(data.displayType).toLowerCase() == 'component-image'"         :JSON_Data="JSON.parse(data.content)" />
                              <metaList v-if="(data.displayType).toLowerCase() == 'component-list'"           :JSON_Data="JSON.parse(data.content)"/>
                              <metaTable v-if="(data.displayType).toLowerCase() == 'component-table'"         :JSON_Data="JSON.parse(data.content)" />
                              <metaText v-if="(data.displayType).toLowerCase() == 'component-text'"           :sentence="data.content" />
                              <metaFile v-if="(data.displayType).toLowerCase() == 'component-file'"           :JSON_Data="JSON.parse(data.content)" />
                    </v-card-text>
          </v-card>
          
</v-col>
</template>
<script>

import metaImage from '@/components/WebApp/Products/metaObjects/meta-Image.vue';
import metaList from '@/components/WebApp/Products/metaObjects/meta-List.vue';
import metaTable from '@/components/WebApp/Products/metaObjects/meta-Table.vue';
import metaFile from '@/components/WebApp/Products/metaObjects/meta-File.vue';
import metaText from '@/components/WebApp/Products/metaObjects/meta-Text.vue';


export default {
          props: {
                    initClass : {
                              type : String,
                              default : 'col-12 col-md-6 col-lg-4 p-1'
                    },
                    data : {
                                        type : Object,
                                        default : []
                    },
          },
          components: {metaImage, metaList, metaTable, metaFile, metaText },
          data() {
                    return {
                    };
          },
          created() {
          },
          mounted() {
                    
          },
          methods: {
                    
          },
};
</script>