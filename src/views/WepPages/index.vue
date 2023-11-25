<template>

	<NavBar />
		<div class="container">
			<AboutView  />
                              <Login  />
			<BecomeAPartner />
			<Disclaimer />
			<PrivacyStatement />
                    </div>
	<Footer/>
</template>
<script>
import NavBar from "@/components/WebPages/Global/NavBar.vue";
import Footer from "@/components/WebPages/Global/Footer.vue";
import Login from "../WebApp/Login.vue";
import AboutView from "./Pages/About.vue";
import BecomeAPartner from "./Pages/BecomeAPartner.vue";
import Disclaimer from "./Pages/Disclaimer.vue";
import PrivacyStatement from "./Pages/PrivacyStatement.vue";

export default {
	data() {
		return {
                              toogle : false
		};
	},
	components: { NavBar, Footer, Login, AboutView, BecomeAPartner, Disclaimer, PrivacyStatement },
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
