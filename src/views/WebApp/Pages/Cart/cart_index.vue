<template>
          this is the cart
          {{ userToken }}
</template>
<script>
export default {
          emits : [],
          components: {
          },
          props : {
                    
          },
          data() {
                    return {
                             userToken : localStorage.getItem('userToken')
                    }
          },
          
          setup() {

          },
          created() {
          },
          mounted() {

          },
          methods: {
                    
          },
}
</script>