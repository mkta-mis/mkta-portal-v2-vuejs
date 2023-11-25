<template>
          <NavBar />
          <br/>
          <Category_Products_Container />
</template>
<script>
import NavBar from "@/components/WebApp/Global/NavBar.vue";
import Category_Products_Container from "@/components/WebApp/Products/Category_Products_Container.vue";
          export default {
                    data() {
                              return {};
                    },
                    components: { NavBar, Category_Products_Container },
                    setup() {},
                    created() {
                    },
                    mounted() {},
                    methods: {

                    },
          };
</script>
