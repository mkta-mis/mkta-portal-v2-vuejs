<template>
	<NavBar />
	<br/>
	<Product_Card_Index />
</template>

<script>
import NavBar from "@/components/WebApp/Global/NavBar.vue";
import Product_Card_Index from "@/components/WebApp/Products/Product_Card/Product_Card_Index.vue";
export default {
	data() {
		return {
			data: null,
			metaObjects_permission: ["product-dimension"],
		};
	},
	components: { NavBar, Product_Card_Index },
	setup() {},
	created() {
	},
	mounted() {},
	methods: {
	},
};
</script>
