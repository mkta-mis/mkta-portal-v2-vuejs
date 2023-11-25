<template>
   <v-table class="bg-transparent">
      <thead>
            <tr >
                     <th scope="col" v-for="(col, colIndex) in JSON_Data.header" :class=" colIndex == 0 ? 'text-end' : 'text-center' ">{{ col }}</th>
            </tr>
      </thead>
      <tbody>
               <tr v-for="(row, rowIndex) in JSON_Data.body">
                        <td v-for="(col, colIndex) in row" :class=" colIndex == 0 ? 'text-end' : 'text-center' ">{{ col }}</td>
               </tr>
      </tbody>
   </v-table>
</template>
<script>
export default {
          props: {
                    Title : {
                              type : String,
                              default : 'Title'
                    },
                    JSON_Data : {
                              type : Object,
                              default : "[]"
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