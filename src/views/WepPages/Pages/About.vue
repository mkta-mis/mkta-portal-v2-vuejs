<template>
	<transition  enter-active-class="animate__animated animate__fadeInUp animate__fast"
    leave-active-class="animate__animated animate__fadeOutUp animate__fast" >
		<div class="container  position-absolute mt-6" v-if="this.$route.name == 'About'" >
			<div class="row mt-n12 bg-white " >
				<div class="col-12 col-md-6 p-3">
					<img loading="eager" class="img-fluid w-100 h-100 " style="object-fit: contain;" src="@/assets/Images/About/half/1.png" />
				</div>
				<div class="col-12 col-md-6 fw-bold p-3 d-flex">
					<div class="my-auto">
						<p class="w-75 text-center align-middle mx-auto text-uppercase BauerBodoniStd h1"  >
							About
						</p>
						<p class="indent-1 ">
							MK Themed Attractions Philippines (formerly Tema Design) is a fiberglass products manufacturer and is a part of the well-reputed Danish Company: Creation Group. Best known for the creative production of world-class products for decorations and displays within different themes and Christmas, Comic, Wildlife, Halloween, Wild West, Pirates, Easter, etc.
						</p>
						<p class="indent-1 ">
							We use high-quality materials in produing fiberglass products and projects to ensure the best quality and meet the satisfactions of our partners. Our main markets are amusement parks, malls, hotels, bars, resorts, and family entertainment
						</p>
						<p class="indent-1 ">
							We are a group of designers, architects, sculptors, casters, painters, welders, installers, projects, and techinical managers that can help our client with the requirements for custom design, development, manufacturing, and installations of small to large scale projects worldwide.
						</p>
					</div>
				</div>
				
				
			</div>
			<div class="row text-black fw-bold bg-black-80 text-white" >
				
				<div class="col-12 col-md-6 col-lg-6 p-3 d-flex">
					<div class="row my-auto">
						<div class="col-12">
							<p class="w-75 p-3 text-center align-middle mx-auto text-uppercase BauerBodoniStd h1"  >
								Specialties
							</p>
							<p class="indent-1 ">
								Custom Projects, Themed and Architectural Projects, Animatronics, Lighting, Theming Design, Festive Lightning, Indoor and Outdoor Theming, Fiberglass Decorations, Themed Attractions, Themed Parks, Leisure and Tourism Attractions, 3D Design, Themed Scultptures, Themed Decorations
							</p>
						</div>
						<div class="col-12 col-lg-6 p-3">
							<p class="w-75 p-3 text-center align-middle mx-auto text-uppercase BauerBodoniStd h1"   >
								Mission
							</p>
							<p class="indent-1 ">
								To be the reason of today's smile on our partners visitors worldwide.
							</p>
						</div>
						<div class="col-12 col-lg-6 p-3">
							<p class="w-75 p-3 text-center align-middle mx-auto text-uppercase BauerBodoniStd h1"   >
								Vision
							</p>
							<p class="indent-1 ">
								To be one of the world's leading producers and providers themed turnkey solutions and using its portfolio of high quality procedures to differentiate its content, service and design.
							</p>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-6 col-lg-6 p-3">
					<img loading="eager" class="img-fluid w-100 h-100 " style="object-fit: contain;" src="@/assets/Images/About/half/2.png" />
				</div>
			</div>	
			<div class="row bg-white d-flex">
				<div class="col-12 col-md-6 p-3 my-auto">
					<img loading="eager" class="img-fluid w-100 "  src="@/assets/Images/About/3.png" />
				</div>
				<div class="col-12 col-md-6 p-3 my-auto">
					<p class="text-capitalize BauerBodoniStd fs-6"><strong class="h1 text-uppercase BauerBodoniStd">reasons</strong><br>to work with us</p>
					<ul class="list-group list-">
						<li  class="list-group-item bg-transparent border-0 mb-1" v-for="(item, index) in Reasons">
							<div class="row">
								<div class="col-1 col-md-hidden d-flex">
									<div class="my-auto">
										<span class="mdi mdi-checkbox-blank-circle" />
									</div>
								</div>
								<div class="col-11 col-md-hidden">
									<p class="m-0 h5">{{ item.Title }}...<br>
										<strong class="h6 text-muted">...{{ item.Description }}</strong>
									</p>		
								</div>
							</div>
						</li>
					</ul>
				</div>
				
				
			</div>
			<div class="row bg-transparent" style="height:80px" />
		</div>
	</transition>
</template>
<script>
export default {
	title: () => { return `About`; },
	data() {
		return {
			Reasons : [
					{Title: 'We believe', Description:'that everything is possible'},
					{Title: 'The end-user', Description:'is our top priority'},

					{Title: 'Our passion', Description:'is our work'},
					{Title: 'We make', Description:'dreams come true'},

					{Title: 'We champion', Description:'innovation and forward-thinking'},
					{Title: 'We focus exclusively', Description:'on themed attractions'},

					{Title: 'We offer', Description:'global experience and local expertise'},

				],
		};
	},
	components: { },
	setup() {},
	created() {

	},
	mounted() {},
	methods: {},
};
</script>
