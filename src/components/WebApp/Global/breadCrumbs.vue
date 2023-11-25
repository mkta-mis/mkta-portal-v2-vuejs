<template>
          <div class="row ">
                    <div class="col-12">
                              <SearchBar v-on:submit="submit" />
                    </div>
                    <div class="col-12">
                              <nav style=" --bs-breadcrumb-divider: '/'; " aria-label="breadcrumb" >
                                        <ol class="breadcrumb">
                                                  <li class="cursor-hand breadcrumb-item text-muted" @click="redirect( -1,'Web App Store')"  >
                                                            <v-icon>mdi-home</v-icon>
                                                  </li>
                                                  <li 
                                                            :class="'cursor-hand breadcrumb-item ' + ( index == (breadCrumbs.length - 1)  ? ' ' : ' active')"  
                                                            v-for="(crumbs, index) in breadCrumbs" 
                                                            aria-current="page" 
                                                            :key="index"
                                                            @click="redirect( index, crumbs.urlTitle,  crumbs.data )"
                                                            >
                                                            <span class="text-decoration-underline">{{ crumbs.title }}</span>
                                                  </li>
                                        </ol>
                              </nav>
                    </div>
          </div>
</template>
<script>
import SearchBar from '@/components/WebApp/Global/SearchBar.vue';

export default {
          props:{ },
	data() {
		return {
                              breadCrumbs : []
                    };
	},
          emits:[ 'submit' ],
	components: { SearchBar },
	setup() {},
	created() {
                    if( this.$route.name == 'Web App Store' ){
                              localStorage.setItem('breadCrumbs', JSON.stringify([]))
                    }
                    this.breadCrumbs = JSON.parse(localStorage.getItem('breadCrumbs'));

          },
	mounted() {},
	methods: {
                    submit(data){
                              this.$emit('submit',data);
                    },
		redirect( index, name, obj = {}){
                              if( index == -1 ) { 
                                        localStorage.removeItem('breadCrumbs'); 
                              }else{
                                        this.breadCrumbs.splice(index+1, (this.breadCrumbs.length - index));
                                        localStorage.setItem('breadCrumbs',JSON.stringify(this.breadCrumbs))
                              }
                              if(obj == []){
                                        this.$router.push({name: name});
                              }else{
                                        this.$router.push({name: name, params : obj } );
                              }
                    }         
	},
};
</script>