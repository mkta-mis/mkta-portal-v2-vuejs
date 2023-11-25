<template>
          <v-list class="bg-transparent">
                    <v-list-item class="my-2" v-for="(row, rowIndex) in JSON_Data">
                              <a class="link-opacity-100 link-info w-100 h5" :href="row.value" target="_blank"><span class="mdi mdi-web me-2" />{{ row.title }}</a>
                    </v-list-item>
          </v-list>
</template>
<script>
export default {
          props: {
                    JSON_Data : {
                              type: Object,
                              default : []
                    }
          },
          components: {},
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