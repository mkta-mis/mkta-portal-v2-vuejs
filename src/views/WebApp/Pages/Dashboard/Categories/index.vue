<template>
          <v-card>
                    <v-card-title>
                              {{ $route.meta.contentTitle }}
                    </v-card-title>
                    <v-card-actions>
                              <v-btn prepend-icon="mdi-refresh" @click="() => {
                                        get_Categories('')
                              }" class="bg-info border">
                                        Refresh
                              </v-btn>
                              <v-btn prepend-icon="mdi-plus" @click="() => {
                                        isAdding=true
                              }" class="bg-success border">
                                        Add Category
                              </v-btn>
                              <v-spacer></v-spacer>
                    </v-card-actions>
                    <v-card-text>
                                <v-expansion-panels>
                                        <v-expansion-panel  v-for="(main, index) in categories" :key="index" >
                                                <v-expansion-panel-title class="h5" >
                                                        {{ main.name }}
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                        <Category_Parent v-on:dataChange="(data)=>{ categories[index] = data }" v-on:change="get_Categories('')" :main="main" />
                                                </v-expansion-panel-text>
                                        </v-expansion-panel>
                                </v-expansion-panels>   
                    </v-card-text>
          </v-card>
          <v-dialog v-model="isAdding" fullscreen>
                <Category_Append 
                                                  v-on:change="(data)=>{ 
                                                            get_Categories('')
                                                  }"
                                                  v-on:close="()=>{ isAdding = false }" :parent_id="0" />
          </v-dialog>
</template>
<script>
import Category_Append from "@/components/WebApp/Dashboard/views/Categories/Category_Append.vue";
import Categories_Selector from "@/components/WebApp/Products/Product_Card/components/Category/Categories_Selector.vue";
import Category_Parent from "@/components/WebApp/Dashboard/views/Categories/Category_Parent.vue";
export default {
          emits : [],
          props : [],
          data() {
                    return {
                              isAdding: false,
                              itemsPerPage: 5,
                              categories: []
                    }
          },
          components: {
                  Categories_Selector,
                  Category_Parent,
                  Category_Append
          },
          setup() {

          },
          created() {
                    this.get_Categories('');
          },
          mounted() {

          },
          
          methods: {
                get_Categories(query) {
                        this.isAdding = false
                        this.$axios
                                .post(this.$serverURL + "api/" + "categories/web-admin/list", {
                                                mode: query == '' ? 'all' : 'search',
                                                text: query
                                })
                                .then((res) => {
                                                if (res.data.code == 200) {
                                                        this.categories = res.data.data;
                                                } else {

                                                }
                                }).catch((err) => {
                                });
                }
          },
          
}
</script>
