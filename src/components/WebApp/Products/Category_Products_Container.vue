<template>
<div class="container text-black" style="margin-top: -1.5rem!important;">
          <BreadCrumbs />
          <div class="row">
                    <div class="col-12 col-md-4">
                              <div class="list-group rounded-0">
                                        <li class="list-group-item bg-black text-white fs-5">Sub-Categories</li>
                                        <li class="list-group-item cursor-hand" @click="filter_Categories('All')">
                                                  <v-icon :color="selected_Categories.indexOf('All') != -1  ? 'green' : 'black'" :icon=" (selected_Categories.indexOf('All') != -1 ) ? 'mdi-checkbox-marked-circle': 'mdi-checkbox-blank-circle-outline' " />
                                                  All here
                                        </li>
                                        <li class="list-group-item cursor-hand" @click="filter_Categories(item.id)" v-for="(item, index) in sub_Categories">
                                                  <v-icon :color="    (
                                                                      (selected_Categories.indexOf( item.id) != -1 )
                                                                      || 
                                                                      (selected_Categories.indexOf('All') != -1)
                                                                      ) ? 'green' : 'black'" 
                                                                      
                                                                      :icon=" (
                                                                      (selected_Categories.indexOf( item.id) != -1 )
                                                                      || 
                                                                      (selected_Categories.indexOf('All') != -1)
                                                                      ) ? 'mdi-checkbox-marked-circle': 'mdi-checkbox-blank-circle-outline' " />
                                                  {{ item.name }}
                                        </li>
                              </div>
                    </div>
                    <div class="col-12 col-md-8">
                              <div class="row">
                                        <template  v-for="(item, index) in filtered_products">
                                                  <template 
                                                            v-if="selected_Categories.indexOf('All') != -1 || ( item['categories'].filter(x => selected_Categories.includes(x))).length > 0">
                                                            <Products_Thumbnail :data="item"  />
                                                  </template>
                                        </template>
                                        
                              </div>
                    </div>
                    
          </div>
</div>
</template>
<script>
import Products_Thumbnail from '@/components/WebApp/Products/Products_Thumbnail.vue';
import BreadCrumbs from '@/components/WebApp/Global/breadCrumbs.vue';
export default {
          props:{
                    data : [],
                    initClass : {
                              type :  String,
                              default : "col-12 col-md-6"
                    }
          },
	data() {
		return {
                              sub_Categories : [],
                              selected_Categories : ['All'],
                              products : [],
                              filtered_products : []

                    };
	},
	components: { Products_Thumbnail, BreadCrumbs },
	setup() {},
	created() {
                    this.get_Sub_Categories();
                    this.get_AllProducts();
          },
	mounted() {

          },
	methods: {
		get_Sub_Categories(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "categories/" + this.$route.params.category , {
                              })
                              .then((res) => {
                                        if (res.data.code == 200) {
                                                  this.sub_Categories = res.data.subCat;
                                        } else {

                                        }
                              }).catch((err) => {

                              });
                    },
                    get_AllProducts(){
                              this.$axios
                              .post( this.$serverURL + "api/" + "categories/products/" + this.$route.params.category , {
                                        Token : localStorage.getItem('userToken')

                              })
                              .then((res) => {
                                        
                                        if (res.data.code == 200) {
                                                  this.products = res.data.products;
                                                  this.filtered_products = [];
                                                  for (let index = 0; index < this.products.length; index++) {
                                                            const element = this.products[index];
                                                            let category_list = [];
                                                            let category_name = [];
                                                            for (let cat_index = 0; cat_index < element['categories'].length; cat_index++) {
                                                                      const category = element['categories'][cat_index];
                                                                      category_list.push(category['category_id']);
                                                                      category_list.push(category['category_id']);

                                                            }
                                                            element['categories'] = category_list;
                                                            element['categories_name'] = category_name;
                                                            this.filtered_products.push(element);
                                                  }
                                        } else {

                                        }
                              }).catch((err) => {

                              });
                    },
                    filter_Categories(id){
                              if(id == 'All'){
                                        this.selected_Categories = [];
                                        this.selected_Categories.push('All')
                                        for (let index = 0; index < this.sub_Categories.length; index++) {
                                                  const element = this.sub_Categories[index];
                                                  this.selected_Categories.push(element.id);
                                        }
                                        return;
                              }
                              if ( this.selected_Categories.indexOf(id) == -1 ){
                                        this.selected_Categories.push(id);
                                        if( this.selected_Categories.length == (this.sub_Categories.length) ){
                                                  this.selected_Categories.push('All')
                                        }
                              }else{
                                        let curIndex = this.selected_Categories.indexOf(id);
                                        this.selected_Categories.splice(curIndex, 1);

                                        curIndex = this.selected_Categories.indexOf('All');
                                        this.selected_Categories.splice(curIndex, 1);
                              }

                    }
	},
};
</script>