<template>
          <v-list class="bg-transparent">
                    <v-list-item
                              class="my-2"
                              v-for="(row, rowIndex) in JSON_Data"
                              :title="row.title"
                              :subtitle="row.value"
                    />
          </v-list>
</template>
<script>
export default {
          props: {
                    JSON_Data : {
                              type : Object,
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