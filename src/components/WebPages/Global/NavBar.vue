<template>
	<video autoplay muted loop id="myVideo">
		<source
			src="http://mkthemedattractions.com.ph/videos/MKTA%20Showroom%20DK%20540p%20LQ.mp4"
			type="video/mp4"
		/>
		Your browser does not support HTML5 video.
	</video>
	<header class=" mb-15 pb-15">
		<nav class="navbar navbar-expand-lg fixed-top" id="mainNav" style="background-color: rgba(0, 0, 0, 0.8);">
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
					class="navbar-toggler text-white border-none bg-white"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse"
					aria-controls="navbarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span
						class="navbar-toggler-icon " style=""
					></span>
				</button>
				<div
					class="collapse navbar-collapse"
					id="navbarCollapse"
				>
					<div class="d-flex ml-auto">
						<ul
						class="navbar-nav me-auto mb-2 mb-md-0 d-flex w-100"
						>
							<li class="nav-item my-auto">
								<RouterLink :to="{name:'About'}" 
								class="nav-link mx-2 my-1 py-2 px-3 navBtn" >About</RouterLink>
							</li>
							<li class="nav-item my-auto">
								<RouterLink :to="{name:'Become a Partner'}" 
								class="nav-link mx-2 my-1 py-2 px-3 navBtn" >Become a Partner</RouterLink>
							</li>
							<li class="nav-item my-auto">
								<RouterLink :to="{name:'Login'}" 
								class="nav-link mx-2 my-1 py-2 px-3 navBtn" >Log In</RouterLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	</header>
	
</template>
<style>
	.navBtn{
		/* border: solid 2px white !important; */
		color: white !important;
		border-radius: 0px  !important;
		background-color: transparent !important;

	}
	.navBtn:hover,.navBtn:focus{
		background-color: white !important;
		color: black !important;
	}
@media (max-width: 992px) {
          .navBtn{
		border: solid 2px white !important;
		color: white !important;
		border-radius: 0px  !important;
		background-color: transparent !important;
	}
	.navBtn:hover,.navBtn:focus	 {
		background-color: white !important;
		color: black !important;
	}
}
	
</style>
<script>
export default {

	data() {
		return {};
	},
	components: {
	},
	setup() {},
	created() {},
	mounted() {},
	methods: {
	},
};
</script>