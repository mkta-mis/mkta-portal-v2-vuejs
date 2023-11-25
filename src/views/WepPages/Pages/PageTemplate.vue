<template>

	<NavBar />
		<div class="container">
			<AboutView  />
                              <Login  />
                              <title >{{ this.$route.name }}</title>
                    </div>
	<Footer/>
</template>
<script>
import NavBar from "@/components/WebPages/Global/NavBar.vue";
import Footer from "@/components/WebPages/Global/Footer.vue";
import Login from "../WebApp/Login.vue";
import AboutView from "./components/Pages/AboutView.vue";

export default {
	data() {
		return {
                              toogle : false
		};
	},
	components: { NavBar, Footer, Login, AboutView },
	setup() {},
	created() {},
	mounted() {},
	methods: {},
};
</script>
<style>
.mt-13 {
	margin-top: 13rem !important;
}
</style>
