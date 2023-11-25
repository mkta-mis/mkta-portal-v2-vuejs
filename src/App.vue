<template>
	<router-view />
</template>
<script>
	import { RouterLink, RouterView } from "vue-router";
	export default {
		components: {},
		mounted() {
			this.$nextTick(function () {
				window.addEventListener("click", function (){

					const navLinks = document.querySelectorAll('.nav-item')
					let menuToggle = document.getElementById('navbarCollapse')
					
					// const bsCollapse = new bootstrap.Collapse(menuToggle)
					navLinks.forEach((l) => {
						l.addEventListener('click', () => { 
							menuToggle.className = 'collapse navbar-collapse';
						 })
					})
				});
				window.addEventListener("scroll", function () {
					var navbar = document.getElementById( "mainNav" );
					if( navbar !== null){

						
						var brandIcon = document.getElementById( "brandIcon" );
						var nav_classes = navbar.classList;
						if ( document.documentElement.scrollTop >= 1 ) {
							if ( nav_classes.contains( "navbar-shrink" ) == false ) {
								// Black
								nav_classes.toggle( "navbar-shrink" );

							}
						} else {
							if ( nav_classes.contains( "navbar-shrink" ) == true ) {
								// White
								nav_classes.toggle( "navbar-shrink" );
							}
						}
					}
				});

				
			});
		},
	};
</script>


