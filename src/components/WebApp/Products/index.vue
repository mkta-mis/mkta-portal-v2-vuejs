<template>
<div class="container text-black" style="margin-top: -1.5rem!important;">
          <BreadCrumbs />
          <div class="row">
                    
                    <div class="col-12 col-md-4">
                              <div class="list-group rounded-0">
                                        <li class="list-group-item bg-black text-white fs-5">Sub-Categories</li>
                                        <li class="list-group-item cursor-hand" @click="filter_Categories('All')">
                                                  <v-icon :color="selected_Categories.indexOf('All') != -1  ? 'green' : 'black'" :icon=" (selected_Categories.indexOf('All') != -1 ) ? 'mdi-checkbox-marked-circle': 'mdi-checkbox-blank-circle-outline' " />
                                                  All
                                        </li>
                                        <li class="list-group-item cursor-hand" @click="filter_Categories(item.id)" v-for="(item, index) in sub_Categories" :key="index">
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
                                        <Products_Thumbnail :data="item"  />
                              </div>
                    </div>
                    
          </div>
</div>
</template>
<script>
import Products_Thumbnail from '@/components/WebApp/Products/Products_Thumbnail.vue';
export default {
          props:{
                   
          },
	data() {
		return {
                    };
	},
	components: { Products_Thumbnail },
	setup() {},
	created() {
                    this.get_AllProducts();
          },
	mounted() {

          },
	methods: {
		

	},
};
</script>