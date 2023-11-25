<template>
	<transition  enter-active-class="animate__animated animate__fadeInUp animate__fast"
    leave-active-class="animate__animated animate__fadeOutUp animate__fast" >
		<div class="container  position-absolute" v-if="this.$route.name == 'Become a Partner'">
			<div class="row bg-black-80" >
				<v-card class="bg-transparent border rounded-0 border-white col-12 col-lg-8 p-3">
					<v-card-title class="border-bottom mb-3">
						<strong class="h4">Become a Partner</strong><br>
						<small class="h1 fw-bold">Send us a message</small>
					</v-card-title>
					<v-card-item>
						<v-select
							prepend-icon="mdi-map"
							class="text-white"
							label="Region"
							:items="['Asia', 'Africa', 'Australia', 'Europe', 'North America', 'South America']"
						/>	
					</v-card-item>
					<v-card-item>
						<v-text-field
							
							class="text-white"
							label="Company"
							prepend-icon="mdi-office-building"
							type="text"
						/>
					</v-card-item>
					<v-card-item>
						<v-text-field
							class="text-white form-input-control"
							label="Email"
							prepend-icon="mdi-web"
							type="text"
						/>
					</v-card-item>
					<v-card-item>
						<v-textarea 
							class="text-white"
							label="Message"
							prepend-icon="mdi-email"></v-textarea>
					</v-card-item>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
								class="text-none-4 bg-white"
								color="black"
								size="x-large"
								variant="outlined"
								@click="send"
								>
								Send 
								</v-btn>
					</v-card-actions>
				</v-card>
				<div class="col-12 col-lg-4 bg-white">
					<ul class="list-group">
						<li class="list-group-item border-0">
							<label class="h3 text-black">
								Reach us
							</label>
						</li>
						<li class="list-group-item border-0">
							<div class="row d-flex">
								<div class="col-xs-1 col-sm-1 col-md-1 col-lg-2 my-auto mx-auto">
									<span class="text-black mdi mdi-phone-classic display-6"></span>
								</div>
								<div class="col-xs-11 col-sm-11 col-md-11 col-lg-10 my-auto">
									<a target="_blank" 
									class=" text-black stretched-link"> 09XX XXX XXXX</a>
								</div>
							</div>
						</li>
						<li class="list-group-item border-0">
							<div class="row d-flex">
								<div class="col-xs-1 col-sm-1 col-md-1 col-lg-2 my-auto mx-auto">
									<span class="text-black mdi mdi-email display-6"></span>
								</div>
								<div class="col-xs-11 col-sm-11 col-md-11 col-lg-10 my-auto">
									<a target="_blank" 
									href="mailto:sales@mkta.com.ph" 
									class=" text-black stretched-link">sales@mkta.com.ph</a>
								</div>
							</div>
						</li>
						<li class="list-group-item border-0">
							<div class="row d-flex">
								<div class="col-xs-1 col-sm-1 col-md-1 col-lg-2 my-auto mx-auto">
									<span class="text-black mdi mdi-google-maps display-6"></span>
								</div>
								<div class="col-xs-11 col-sm-11 col-md-11 col-lg-10 my-auto">
									<a target="_blank" 
									href="https://www.google.com/maps/place/Tema+Design+Philippines+Inc./@15.1705569,120.6121301,19.08z/data=!4m6!3m5!1s0x3396e9e9a4098e1b:0x679a4717f5e44fb5!8m2!3d15.1709995!4d120.6111994!16s%2Fg%2F11c43nvtf_?entry=ttu" 
									class=" text-black stretched-link">Lot 19, 21, 23 Livelihood St Pampanga Economic Zone, Angeles City, Pampanga 2009, Philippines</a>
								</div>
							</div>
						</li>
					</ul>
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
		send(){
			
		}
	},
};
</script>
<style>
.bg-black-80 .v-icon{
	color: white;
	font-size: 2rem;
}
.bg-black-80 .v-input__control{
	background-color: rgba(255, 255, 255, .1);
}

.mt-13 {
	margin-top: 13rem !important;
}
</style>
