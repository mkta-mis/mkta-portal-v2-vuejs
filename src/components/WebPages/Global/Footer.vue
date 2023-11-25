<template>
	<br />
	<br />
	<footer class="position-fixed bottom-0 start-0 w-100 p-2 bg-black-80" style=" z-index: 100; background-color:rgba(241, 241, 241, .1);">
		<footer class="d-flex flex-wrap justify-content-between align-items-center ">
			<p class="col-md-8 my-auto">© MK Themed Attractions Philippines Inc. All Rights Reserved.</p>
			<ul class="nav col-md-4 justify-content-end ">
				<li class="nav-item">
					<RouterLink :to="{name:'Privacy Statement'}" class="nav-link px-2 text-white text-decoration-underline" >Privacy Statement</RouterLink>
				</li>
				<li class="nav-item">
					<RouterLink :to="{name:'Disclaimer'}" class="nav-link px-2 text-white text-decoration-underline" >Disclaimer</RouterLink>
				</li>
				
			</ul>
		</footer>
	</footer>
</template>
<script>
export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {},
};
</script>
<style></style>
