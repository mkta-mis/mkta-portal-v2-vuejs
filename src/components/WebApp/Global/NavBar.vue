<template>
<header class=" mb-15 pb-15">
		<nav class="navbar navbar-expand-lg fixed-top" id="mainNav" style="background-color: rgba(0, 0, 0, 1);">
			<div class="container-fluid mx-lg-in-1 ">
				<RouterLink :to="{ name:'Home' }" class="navbar-brand" >
					<img
						id="brandIcon"
						class="me-3 my-auto py-2 h-24"
						src="@/assets/MKLogo-White.svg"
						style="height: 6rem;"
					/>
				</RouterLink>
				<button
					class="navbar-toggler text-white border-none bg-white me-5"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse"
					aria-controls="navbarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon " style="" />
				</button>
				<div
					class="collapse navbar-collapse"
					id="navbarCollapse"
				>
					<div class="d-flex ml-auto">
						<ul
						class="navbar-nav w-100 mx-2"
						>
							<!-- <li class="nav-item my-auto pe-2">
								<RouterLink :to="{name:'Web App Cart'}" 
									class="nav-link mx-2 my-1 py-2 px-3 navBtn border-0" >
									<v-icon icon="mdi-cart" />
									Cart
								</RouterLink>
							</li> -->
							<li class="nav-item my-auto pe-2" v-if="hasDashboard">
								<RouterLink :to="{name:'Web App Dashboard'}" 
									class="nav-link mx-2 my-1 py-2 px-3 navBtn border-0" >
									<v-icon icon="mdi-view-dashboard" />
									Dashboard
								</RouterLink>
							</li>
							<li class="nav-item my-auto pe-2">
								<RouterLink :to="{name:'Logout'}" 
									class="nav-link mx-2 my-1 py-2 px-3 navBtn border-0" >
									<v-icon icon="mdi-logout" />
									Logout
								</RouterLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	</header>
	<div class="pb-2">
		&nbsp;
	</div>
</template>
<style>
.navBtn {
	color: white !important;
	border-radius: 0px !important;
	background-color: transparent !important;
}
.navBtn:hover,
.navBtn:focus {
	background-color: white !important;
	color: black !important;
}
@media (max-width: 992px) {
	.navBtn {
		color: white !important;
		border-radius: 0px !important;
		background-color: transparent !important;
	}
	.navBtn:hover,
	.navBtn:focus {
		background-color: white !important;
		color: black !important;
	}
}
</style>
<script>
export default {
	data() {
		return {
			hasDashboard : false
		};
	},
	components: {},
	setup() {},
	created() {},
	mounted() {
		this.hasDashboard = localStorage.getItem('hasDashboard') == 1;
	},
	methods: {},
};
</script>
