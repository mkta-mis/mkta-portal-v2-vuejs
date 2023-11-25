<template>
<div :class="initClass + ' mb-6'">
          <div class="card border border-1 rounded-0" >
                    <a href="#" @click="redirect" class="text-decoration-none">
                              <img class="w-100 rounded-0"  :src=" this.$serverURL +'resources/' + data.src" />
                              <div class="card-body">
                                                  <h2 class="card-title text-center text-black">{{ data.title }}</h2>
                              </div>
                    </a>
          </div>
</div>
</template>
<script>
export default {
          props:{
                    data : {
                              type : Object
                    },
                    initClass : {
                              type :  String,
                              default : "col-12 col-md-6"
                    }
          },
	data() {
		return {};
	},
	components: {  },
	setup() {},
	created() {},
	mounted() {},
	methods: {
		redirect(){
                              localStorage.removeItem('breadCrumbs');
                              let crumbs = [];
                              crumbs.push({
                                        urlTitle : 'Categories',
                                        title: this.data.title,
                                        urlKey: this.data.urlKey,
                                        data : { category : this.data.urlKey }
                              })
                              localStorage.setItem('breadCrumbs',JSON.stringify(crumbs))
                              this.$router.push({ name:'Categories', params: { category : this.data.urlKey } })
                    }
	},
};
</script>