<template>
	<transition  enter-active-class="animate__animated animate__fadeInUp animate__fast"
    leave-active-class="animate__animated animate__fadeOutUp animate__fast" >
		<div class="container  position-absolute" v-if="this.$route.name == 'Privacy Statement'">
			<div class="card rounded-0 border-0  bg-black-80">
				<div class="card-body">
					<h1 class=" w-100 border-bottom">Privacy Statement</h1>
					<p class="indent-2 h4 p-2">At our manufacturing company, we take your privacy and the protection of your personal information very seriously. This privacy statement explains how we collect, use, and protect your personal information when you visit our website.</p>
                                                  
                                                  <h4 class="mt-3 text-decoration-underline">
                                                            Collection of Personal Information:
                                                  </h4>
					<p class="indent-2 h5 p-2">
                                                            We may collect personal information such as your name, email address, postal address, phone number, and other relevant information when you fill out a form on our website. This information is collected for the purpose of fulfilling your request and providing you with the best possible service.
                                                  </p>

                                                  <h4 class="mt-3 text-decoration-underline">
                                                            Use of Personal Information:
                                                  </h4>
					<p class="indent-2 h5 p-2">
                                                            We use your personal information to provide you with the services and products you have requested, to communicate with you about your orders, to send you important updates and promotional materials about our company, and to improve our website and the products and services we offer. We may also use your personal information to conduct market research and to better understand our customers' needs.
                                                  </p>

                                                  <h4 class="mt-3 text-decoration-underline">
                                                            Protection of Personal Information:
                                                  </h4>
					<p class="indent-2 h5 p-2">
                                                            We take appropriate measures to protect your personal information from unauthorized access, disclosure, or misuse. We use secure servers and encryption technologies to safeguard your information, and we restrict access to your information to only those employees who need it to perform their jobs.
                                                  </p>

                                                  <h4 class="mt-3 text-decoration-underline">
                                                            Disclosure of Personal Information:
                                                  </h4>
					<p class="indent-2 h5 p-2">
                                                            We may share your personal information with third-party service providers who assist us in providing you with our products and services. These service providers are contractually obligated to keep your information confidential and use it only for the purposes of providing their services to us.
                                                  </p>
                                                  <p class="indent-2 h5 p-2">
                                                            We may also share your personal information if required by law or if we believe that such disclosure is necessary to protect our rights, property, or safety or that of others.
                                                  </p>

                                                  <h4 class="mt-3 text-decoration-underline">
                                                            Cookies:
                                                  </h4>
					<p class="indent-2 h5 p-2">
                                                            We may use cookies to enhance your experience on our website. Cookies are small files that are stored on your computer and allow us to remember your preferences, such as your language preferences or the items in your shopping cart. You can choose to disable cookies in your browser settings, but this may affect the functionality of our website.
                                                  </p>

                                                  <h4 class="mt-3 text-decoration-underline">
                                                            Links to Other Websites:
                                                  </h4>
					<p class="indent-2 h5 p-2">
                                                            Our website may contain links to other websites that are not under our control. We are not responsible for the privacy practices or the content of these websites. We encourage you to review the privacy policies of these websites before providing them with any personal information.
                                                  </p>

                                                  <h4 class="mt-3 text-decoration-underline">
                                                            Changes to this Privacy Statement:
                                                  </h4>
					<p class="indent-2 h5 p-2">
                                                            We reserve the right to modify or update this privacy statement at any time without prior notice. Any changes to this statement will be posted on our website.
                                                  </p>
                                                  <h4 class="mt-3 text-decoration-underline">
                                                            Contact Information:
                                                  </h4>
					<p class="indent-2 h5 p-2">
                                                            If you have any questions or concerns about our privacy statement or the way we collect and use your personal information, please contact us.
                                                  </p>
				</div>
			</div>
		</div>
	</transition>
</template>
<script >
export default {
	data() {
		return {
			
		};
	},
	components: { },
	setup() {},
	created() {
		
	},
	mounted() {},
	methods: {
		
	},
};
</script>
<style>
.mt-13 {
	margin-top: 13rem !important;
}
</style>
