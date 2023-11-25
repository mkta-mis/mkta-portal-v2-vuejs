<template>
<v-card height="85vh">
          <v-card-title>
                    {{ $route.meta.contentTitle }}
          </v-card-title>
          <v-card-actions>
                    <v-btn  prepend-icon="mdi-refresh" 
                              @click="()=>{
                                        get_Permissions()
                              }"
                              class="bg-info border">
                              Refresh
                    </v-btn>
                    <v-btn    
                              prepend-icon="mdi-plus" 
                              class="bg-info border"
                              @click="()=>{ show_Registration = true }"
                              >
                              Register Permission
                    </v-btn>
          </v-card-actions>
          <v-card-text>
                    <v-table fixed-header >
                        <thead>
                                <tr>
                                        <th class="text-left">
                                                Permission
                                        </th>
                                        <th>
                                                Description
                                        </th>
                                        <th class="text-left" style="width: 50px;">
                                                
                                        </th>
                                </tr>
                        </thead>

                        <tbody>
                                <tr
                                        v-for="(item, index) in paginate[curPage-1]"
                                        :key="index"
                                >
                                        <td>
                                                  <span class="fs-5">{{ item.title }}</span>
                                                  <br>
                                                  <small class="text-danger">{{ item.key }}</small>
                                        </td>
                                        <td class="text-start">
                                                  {{ item.description }}
                                        </td>
                                        <td>
                                                <router-link class="text-decoration-none" :to="{ name: 'Dashboard Permission Index', params: { permission_id : item.id}}">
                                                        <v-btn fab variant="outlined" class="my-1" icon="mdi-eye" />
                                                </router-link>
                                                
                                        </td>
                                </tr>
                                
                        </tbody>
                </v-table>
          </v-card-text>
</v-card>
<v-dialog v-model="show_Registration" width="800" persistent>
          <PermissionRegistration v-on:change="()=>{ get_Permissions() }" v-on:close="()=>{ show_Registration = false }" :isDialog="true" />
</v-dialog>
</template>
<script>
import PermissionRegistration from '@/components/globalComponents/PermissionRegistration.vue';
export default {
          components: { PermissionRegistration },
          setup() {

          },
          created() {

          },
          mounted() {
                    this.get_Permissions();
          },
          data () {
                    return {
                              show_Registration : false,
                               /* Tabel with Pagination Data */
                              data : [],
                              paginate : [],
                              curPage : 1,
                              chunkSize : 10,
                    }
          },
          methods: {
                    set_Paginate(){
                        this.paginate = []
                        for (let i = 0; i < this.data.length; i += this.chunkSize) {
                                this.paginate.push(this.data.slice(i, i + this.chunkSize));
                        }
                        this.curPage = 1;
                    },
                    get_Permissions(){
                              this.show_Registration = false
                              this.$axios
                              .post( this.$serverURL + "api/" + "permissions/web-admin/" + "get", {})
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.data = res.data.results;
                                                  this.set_Paginate();
                                        } else {

                                        }
                              }).catch( (err) => { } );
                    }
          },
          
}
</script>
