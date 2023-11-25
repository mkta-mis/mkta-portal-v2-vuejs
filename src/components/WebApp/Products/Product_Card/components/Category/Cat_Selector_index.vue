<template>
          <v-card flat>
                    <v-card-title>
                              Catergories
                    </v-card-title>
                    <v-card-actions>
                              <v-btn variant="outlined" @click="this.tree=this.main_tree" prepend-icon="mdi-refresh">Reset</v-btn>
                    </v-card-actions>
                    <v-card-text >
                              <v-row class="ps-6 pt-2">
                                        <v-col cols="12" sm="12" v-for="(main, index) in categories" class="p-0 m-0" :key="index">
                                                  <v-btn @click="()=>{
                                                            if( tree.indexOf(main) != -1 ){
                                                                      tree = [];
                                                            }else{
                                                                      tree = []
                                                                      tree.push(main.id)
                                                            }
                                                  }" flat :prepend-icon="( tree.indexOf(main.id) != -1 ) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'">{{ main.name }}</v-btn>
                                                  <Categories_Selector v-on:selected="child_selected" :tree="tree"  v-for="(main, index) in main.full_data" :main="main" :key="index" />
                                        </v-col>
                              </v-row>
                    </v-card-text>

          </v-card>
          
</template>
<script>
import Categories_Selector from "@/components/WebApp/Products/Product_Card/components/Category/Categories_Selector.vue";
export default {
          emits : ['change'],
          props: ['main_tree'],
	data() {
		return {
                              categories : [],
                              isSelected : false, 
                              tree : []
                    };
	},
	components: { Categories_Selector },
	setup() {},
          watch:{
                    tree(){
                              if( this.tree != this.main_tree ){
                                        this.$emit('change', this.tree[0]);
                              }
                    }
          },
	created() {
                    this.tree = this.main_tree
          },
	mounted() {
                    this.get_Categories();
          },
	methods: {
                    child_selected( data ){
                              this.tree = []
                              this.tree = data;
                              
                    },
                    get_Categories(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "categories/web-admin/list", { })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.categories = res.data.data;
                                        } else {

                                        }
                              }).catch((err) => { });
                    },
	},
};
</script>
