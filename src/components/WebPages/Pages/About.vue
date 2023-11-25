<template>
          <NavBar />
                    <div class="container my-3">
                              <h1 class="fs-1 fw-bold ">About</h1>
                              <p style="text-indent: 3rem; text-align:justify">
                                        MK Themed Attractions Philippines Inc is a leading manufacturer of high-quality products for <KBD>[industry or market]</KBD>. Established in <kbd>[year]</kbd>, our company has been providing innovative solutions to our customers for <kbd>[number]</kbd> years. We are committed to delivering the highest quality products and services to our customers, while always striving for continuous improvement and innovation.
                              </p>
                              <p style="text-indent: 3rem; text-align:justify">
                                        Our products are designed and manufactured in our state-of-the-art facilities using the latest technology and the highest quality materials. We have a team of experienced engineers, designers, and technicians who work closely with our customers to develop customized solutions that meet their unique needs and specifications.
                              </p>
                              <p style="text-indent: 3rem; text-align:justify">
                                        At MK Themed Attractions Philippines Inc, we are committed to sustainability and responsible manufacturing practices. We strive to minimize our impact on the environment by using eco-friendly materials and processes whenever possible. We are also committed to ensuring the health and safety of our employees and the communities in which we operate.
                              </p>
                              <p style="text-indent: 3rem; text-align:justify">
                                        Our commitment to quality and customer satisfaction is the foundation of our success. We take pride in our work and are dedicated to providing our customers with the best possible products and services. Thank you for choosing MK Themed Attractions Philippines Inc as your partner for all your <kbd>[industry or market]</kbd> needs.
                              </p>
                    </div>
          <Footer/>
</template>
<script>
import NavBar from "@/components/WebPages/Global/NavBar.vue";
import Footer from "@/components/WebPages/Global/Footer.vue";

export default {
	title: () => {
		return "Log In";
	},
	data() {
		return {
			colors: [
				'primary',
				'secondary',
				'yellow darken-2',
				'red',
				'orange',
			],
			model: 0,
		};
	},
	components: { NavBar, Footer },
	setup() {},
	created() {},
	mounted() {},
	methods: {},
};
</script>