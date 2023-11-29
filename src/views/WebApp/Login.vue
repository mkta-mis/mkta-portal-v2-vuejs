<template>
	<transition
		enter-active-class="animate__animated animate__fadeInUp animate__fast"
		leave-active-class="animate__animated animate__fadeOutUp animate__fast"
	>
		<div
			class="container position-absolute my-auto"
			v-if="this.$route.name == 'Login'"
		>
			<div class="row g-3 bg-black-80 p-3">
				<div class="col-12 col-lg-6 d-flex p-0">
					<div
						class="bg-transparent card text-white border-none rounded-0 mt-3 w-100"
					>
						<div
							class="card-header bg-none border-white"
						>
							<div
								class="card-title"
							>
								Log
								In
							</div>
						</div>
						<div
							class="card-body"
						>
							<ul
								class="list-group"
							>
								<li
									class="list-group-item bg-transparent border-0"
								>
									<v-text-field
										v-model="username"
										label="Email address"
										prepend-icon="mdi-email"
										placeholder="E-mail"
										type="email"
									/>
								</li>
								<li
									class="list-group-item bg-transparent border-0"
								>
									<v-text-field
										v-model="password"
										label="Password"
										prepend-icon="mdi-lock"
										placeholder="Password"
										type="password"
									/>
								</li>
								<li
									class="list-group-item bg-transparent border-0"
								>
									<v-btn
										:loading="SnackBar_Data.loading"
										class="bg-white float-end"
										@click="login"
									>
										Log
										In
									</v-btn>
									
								</li>
							</ul>
						</div>
						<div
							class="card-footer border-none"
						>
							
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 p-0">
					<v-carousel
						hide-delimiters
						touch
						progress="white"
						:show-arrows="false"
						:cycle="true"
					>
						<v-carousel-item
							v-for="(
								color,
								i
							) in colors"
							:key="
								color
							"
							:value="i"
						>
							<v-sheet
								:color="
									color
								"
								height="100%"
								tile
							>
								<div
									class="d-flex fill-height justify-center align-center"
								>
									<div
										class="text-h2"
									>
										Slide
										{{
											i +
											1
										}}
									</div>
								</div>
							</v-sheet>
						</v-carousel-item>
					</v-carousel>
				</div>
				<v-snackbar
					variant="text"
					close-on-content-click
					v-model="SnackBar_Data.isVisible"
					class="p-0"
					:content-class="SnackBar_Data.contentClass"
					:location="SnackBar_Data.location"
					multi-line
					>
					<v-icon size="x-large" class="me-2" :icon="this.SnackBar_Data.icon" />
					{{ this.SnackBar_Data.text }}
				</v-snackbar>
			</div>
		</div>
	</transition>
</template>
<script>
import NavBar from "@/components/WebPages/Global/NavBar.vue";
import Footer from "@/components/WebPages/Global/Footer.vue";

export default {
	data() {
		return {
			colors: [
				"primary",
				"secondary",
				"yellow darken-2",
				"red",
				"orange",
			],
			username : 'johnrickyl@mkthemedattractions.com.ph',
			password : 'johnrickyl@mkthemedattractions.com.ph',
			SnackBar_Data : {
				loading : false,
				location : 'top',
				color : 'success',
				isVisible : false,
				contentClass : 'mt-7 bg-green rounded',
				isHTML 	: false,
				text 	: "Welcome ",
				icon 	: 'mdi-email'
			}
		};
	},
	components: { NavBar, Footer },
	setup() {},
	created() {
		
	},
	mounted() {},
	methods: {
		login() {
			this.SnackBar_Data.loading 		= true;
			this.$axios.get(this.$serverURL + "/sanctum/csrf-cookie");

			this.$axios
				.post( this.$serverURL + "api/" + "login", {
					email: this.username,
					password: this.password,
				})
				.then((res) => {
					if (res.data.code == 200) {
						localStorage.clear();
						localStorage.setItem( "userToken", res.data.userToken );
						localStorage.setItem( "userName", res.data.name);
						localStorage.setItem( "userMail", res.data.email);
						localStorage.setItem( "hasDashboard", res.data.hasDashboard );
						localStorage.setItem( "restriction_product_component_keys", res.data.restriction_product_component_keys )

						this.SnackBar_Data.isVisible 		= true;
						this.SnackBar_Data.icon 		= 'mdi-email';
						this.SnackBar_Data.contentClass 	= 'mt-7 bg-green';
						this.SnackBar_Data.text 		= "Welcome " + "Username";
						this.$router.push({name: 'Web App Store'});
						setTimeout(() => {
                                                                      this.$router.push({name: 'Web App Store'});          
                                                            }, 3000);
						
					} else {
						this.SnackBar_Data.icon 		= 'mdi-card-account-mail';
						this.SnackBar_Data.isVisible 		= true;
						this.SnackBar_Data.contentClass 	= 'mt-7 bg-warning';
						this.SnackBar_Data.text 		= "Incorrect Email or Password";
					}
					this.SnackBar_Data.loading 		= !true;
				}).catch((err) => {
					this.SnackBar_Data.icon 		= 'mdi-web-sync';
					this.SnackBar_Data.isVisible 		= true;
					this.SnackBar_Data.contentClass 	= 'mt-5 bg-red';
					this.SnackBar_Data.text 		= "Something went wrong, please try again later."
					this.SnackBar_Data.loading 		= !true;
				});
		},
	},
};
</script>
<style>
.bg-black-80 .v-icon {
	color: white;
	font-size: 2rem;
}
.bg-black-80 .v-input__control {
	background-color: rgba(255, 255, 255, 0.1);
}
.mt-13 {
	margin-top: 13rem !important;
}
</style>
