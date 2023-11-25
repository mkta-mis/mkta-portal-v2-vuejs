<template>
          <div class="ms-3 border-start" >
                    <v-btn @click="child_selected(main.id)" flat :prepend-icon="(this.tree.indexOf(this.main.id) != -1 ) ? 'mdi-checkbox-marked': 'mdi-checkbox-blank-outline'">{{ main.name }}</v-btn>
                    <div>
                              <Categories_Selector :tree="this.tree" v-for="(sub, index) in main.full_data" :main="sub" v-on:selected="child_selected" />
                    </div>
          </div>
</template>
<script>
export default {
          emits : ['selected'],
          props: {
                    tree :{ 
                              type: Object,
                              default : []
                    },
                    main : {
                              type : Object
                    }
          },
	data() {
		return {
                              isSelected : false,
                              finalTree : []
                    };
	},
	components: {  },
	setup() {},
          watch:{
                    tree(){
                              this.finalTree = this.tree
                    }
          },
	created() {
                    
          },
	mounted() {

          },
	methods: {
		child_selected( data ){
                              this.finalTree = []
                              if( Array.isArray(data) ){
                                        data.forEach(element => {
                                                  this.finalTree.push(element)
                                        });
                              }else{
                                        this.finalTree.push(data)
                              }
                              this.finalTree.push(this.main.parent_id);
                              this.$emit('selected', this.finalTree);
                    }
	},
};
</script>
