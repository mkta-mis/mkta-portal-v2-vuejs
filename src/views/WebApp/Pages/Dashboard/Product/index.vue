<template>
          <v-card>
                    <v-card-title>
                              {{ $route.meta.contentTitle }}
                    </v-card-title>
                    <v-card-actions>
                              <v-btn    prepend-icon="mdi-refresh" 
                                        @click="()=>{
                                                  search = ''
                                                  get_Products('')
                                        }"
                                        class="bg-info border">
                                        Refresh
                              </v-btn>
                              <v-spacer></v-spacer>
                              <v-btn    prepend-icon="mdi-plus" 
                                        @click="()=>{
                                                  isAdding = true
                                        }"
                                        class="bg-info border">
                                        Add Product
                              </v-btn>
                    </v-card-actions>
                    <v-card-text>
                              <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                                  <v-text-field clearable v-model="search" label="Search" prepend-icon="mdi-magnify" @keyup.enter="get_Products(search)"></v-text-field>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                                  <div>
                                                            Product Details
                                                  </div>
                                        </li>
                                        <li       class="list-group-item d-flex justify-content-between align-items-center"  
                                                  v-for="item in paginate[curPage-1]"
                                                  :key="item.name"
                                                  >
                                                  <div class="d-flex align-items-center">
                                                            <img  v-if="item.thumbnail !== null "
                                                                      :src="this.$serverURL+'resources/' + item.thumbnail.filename" 
                                                                      alt="" 
                                                                      style="width: 100px;"
                                                                      class="rounded-circle" />
                                                            <img  v-else
                                                                      :src="this.$errorImage" 
                                                                      alt="" 
                                                                      style="width: 100px;"
                                                                      class="rounded-circle" />

                                                            <div class="ms-3">
                                                                      <p class="fw-bold mb-1">{{ item.name }}</p>
                                                                      <small class="text-muted mb-0">{{ item.code }}</small>
                                                                      <p>{{ item.description }}</p>
                                                                      <div class="my-1">
                                                                                <button class="btn btn-sm btn-success" @click="open_Product(item.code)">
                                                                                          <v-icon>mdi-folder</v-icon> Open
                                                                                </button>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-center align-items-center">
                                                  <v-pagination v-model="curPage" :length="paginate.length" :total-visible="7" />

                                        </li>
                              </ul>
                    </v-card-text>
          </v-card>
          <v-dialog v-model="isAdding" fullscreen>
                    <productAdd v-on:change="get_Products(this.search)" v-on:close="isAdding = false" />
          </v-dialog>

</template>
<script>
import productAdd from '@/components/WebApp/Dashboard/views/Product/product-add.vue';
export default {
          components: {
                    productAdd
                    },
          setup() {

          },
          created() {
                    this.get_Products('');
          },
          mounted() {
                    
          },
          data () {
                    return {
                              isAdding : false,
                              search : '',
                              products : [],
                              itemsPerPage : 5,

                              /* Table with Pagination Data */
                              data : [],
                              paginate : [],
                              curPage : 1,
                              chunkSize : 10,
                    }
          },
          methods: {
                    set_Paginate(data){
                              this.paginate = []
                              for (let i = 0; i < data.length; i += this.chunkSize) {
                                        this.paginate.push(data.slice(i, i + this.chunkSize));
                              }
                              this.curPage = 1;
                    },
                    open_Product(code){
                              this.$router.push({name: 'Dashboard Product Item', params : { code : code }});
                    }, 
                    get_Products(query){
                              this.isAdding = false
                              this.$axios
                              .post( this.$serverURL + "api/" + "products/web-admin/list", { 
                                        mode :  query == '' ? 'all' : 'search',
                                        text : query,
                                        userToken: localStorage.getItem("userToken"),

                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.products = this.data = res.data.data;
                                                  this.set_Paginate(this.data)
                                        } else {

                                        }
                              }).catch((err) => {
                              });
                    }
          },
          
}
</script>
