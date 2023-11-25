<template>
<v-card flat :class="(isParent ? 'border' : '')">
          <v-card-text v-if="!isEditing">
                    <span class="h4 my-2 w-100"><v-icon>mdi-chevron-right</v-icon>{{ original_data.name }}</span> <br/>
                    
                    <v-btn fab size="x-small" class="bg-success m-1" icon="mdi-plus"      v-show="!isAdding && !isEditing" @click="()=>{isAdding = true; showChild = false}"/>
                    <v-btn fab size="x-small" class="bg-success m-1" icon="mdi-pencil"    v-show="!isAdding && !isEditing" @click="()=>{isEditing = true; showChild = false}" />
          </v-card-text>
          <v-card-text v-if="isEditing">
                    <v-text-field :disabled="isUpdating" v-model="temp_data.name" persistent-hint hint="Name" class="my-1" />
                    <v-btn @click="()=>{isEditing=false; showChild = true}" variant="outlined" class="mx-1 bg-success text-white" prepend-icon="mdi-cancel">Cancel</v-btn>
                    <v-btn :loading="isUpdating" v-show="original_data.name != temp_data.name || original_data.description != temp_data.description" @click="save_Category" variant="outlined" class="mx-1 bg-warning text-white float-end" prepend-icon="mdi-content-save">Save</v-btn>
          </v-card-text>
          <v-divider :thickness="3" class="border-opacity-50 mb-0" color="error" v-show="isParent" />
          <v-card-text v-show="original_data.full_data.length > 0">
                    <Category_Child v-show="showChild " :isParent="false" :sub="subData" v-for="(subData, subData_Index) in original_data.full_data" />
          </v-card-text>
          <Category_Append v-on:change="(data)=>{ 
                    this.temp_data = JSON.parse(JSON.stringify(data));
                    this.original_data = JSON.parse(JSON.stringify(data)); 
                    isAdding = false; showChild = true
                    }" v-on:close="()=>{ isAdding = false; showChild = true}" v-if="isAdding" :parent_id="original_data.id" />
</v-card>
</template>
<script>
import Category_Append from '@/components/WebApp/Dashboard/views/Categories/Category_Append.vue';
export default {
          emits : [],
          props : [ 'sub', 'isParent'],
          data() {
                    return {
                              showChild : true,
                              isEditing : false,
                              original_data : [],
                              temp_data : {
                                        name : '',
                                        description : ''
                              },
                              isUpdating : false,
                              newData : {
                                        name : ''
                              },
                              isAdding   : false
                    }
          },
          components: {
                    Category_Append
          },
          setup() {

          },
          created() {
                    this.temp_data = JSON.parse(JSON.stringify(this.sub))
                    this.original_data = JSON.parse(JSON.stringify(this.sub))
          },
          mounted() {},
          methods: {
                    save_Category(){
                              this.isUpdating = true
                                        this.$axios
                                        .post(this.$serverURL + "api/" + "categories/web-admin/update", {
                                                  tokenString : localStorage.getItem('userToken'),
                                                  category_id : this.sub.id,
                                                  action: 'update',
                                                  data :{
                                                            name : this.temp_data.name,
                                                            description : this.temp_data.description
                                                  }
                                        })
                                        .then((res) => {
                                                  
                                                  if (res.data.code == 200) {
                                                            this.isEditing = this.isUpdating = false;
                                                            this.showChild = true;
                                                            this.original_data = res.data.data
                                                            this.temp_data = JSON.parse(JSON.stringify(res.data.data))
                                                  } 
                                        }).catch((err) => {});
                    }
          },
}
</script>