<template>
<v-card>
          <v-card-title>
                    Customers
          </v-card-title>
          <v-card-actions>
                    <v-btn  prepend-icon="mdi-refresh" 
                              @click="()=>{
                                        get_Users()
                              }"
                              class="bg-info border">
                              Refresh
                    </v-btn>
                    <v-btn    prepend-icon="mdi-plus" 
                              @click="()=>{
                                        show_Registration = true;
                              }"
                              class="bg-info border">
                              Register Customers
                    </v-btn>
          </v-card-actions>
          <v-card-text>
                    <v-text-field v-model="search"></v-text-field>
                    <v-table :search="search">
                              <thead>
                                        <tr>
                                        <th class="text-left">
                                        Name
                                        </th>
                                        <th class="text-left">
                                        Email
                                        </th>
                                        <th class="text-left" style="max-width: 150px;">
                                        
                                        </th>
                                        </tr>
                              </thead>
                              <tbody>
                                        <template v-for="item in paginate[curPage-1]" :key="item.email">
                                        <tr v-if="item.userToken != this.userToken">
                                                  <td>{{ item.name }}</td>
                                                  <td>{{ item.email }}</td>
                                                  <td>
                                                            <router-link :to="{ name: 'Dashboard Customers Data', params: { customerToken : item.userToken}}">
                                                                      <v-btn fab color="primary" class="my-1" icon="mdi-eye"></v-btn>
                                                            </router-link>
                                                  </td>
                                        </tr>        
                                        </template>
                                        
                              </tbody>
                    </v-table>
          </v-card-text>
          <v-card-text>
                    <v-pagination v-model="curPage" :length="paginate.length" :total-visible="7" />
          </v-card-text>
</v-card>
<v-dialog v-model="show_Registration" width="800" persistent>
          <CustomerRegistration :isDialog="true" v-on:close="()=>{ get_Users(); show_Registration = false; }" v-on:change="()=>{ get_Users(); show_Registration = false; }" />
</v-dialog>
</template>
<script>
import CustomerRegistration from '@/components/globalComponents/CustomerRegistration.vue';
export default {
          emits : ['change', 'close'],
          components: {
                    CustomerRegistration
          },
          props : {
                    userToken : {
                              type: String,
                              default: localStorage.getItem('userToken')
                    }
          },
          data() {
                    return {

                              /* User Registration Data */
                              show_Registration : false,

                              /* Table with Pagination Data */
                              data : [],
                              paginate : [],
                              curPage : 1,
                              chunkSize : 10,

                              /* Index Data */
                              search : '',
                              users : []
                    }
          },
          
          setup() {

          },
          created() {
                    this.get_Users()
          },
          mounted() {},
          methods: {
                    set_Paginate(data){
                              this.paginate = []
                              for (let i = 0; i < data.length; i += this.chunkSize) {
                                        this.paginate.push(data.slice(i, i + this.chunkSize));
                              }
                              this.curPage = 1;
                    },
                    get_Users(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "customers/web-admin" + "/list", { 
                                        tokenString: localStorage.getItem("userToken"),

                              })
                              .then((res) => {
                                        if(res.data.code == 200){
                                        this.data = res.data.results;
                                        this.set_Paginate(this.data);                                        
                                        }else{

                                        }
                              }).catch((err) => {
                              });
                    }
          },
}
</script>