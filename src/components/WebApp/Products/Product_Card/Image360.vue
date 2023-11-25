<template>
    <v-row class="bg-white">
        <v-col cols="12" v-if="images.length > 0">
            <img  
                        v-for="(img, imgIndex) in images"  
                        :class="'w-100 '+ ( (((new Number(currentIndex) / 360)  * (images.length -1)).toFixed(0)) == imgIndex ? 'd-block' : 'd-none' )"
                        :src="img" 
                        :key="imgIndex"
                        loading="eager"
                        alt="Slider Image" />
            <v-slider :min="0" v-model="currentIndex" :max="360"  color="black" track-color="green" thumb-size="12"  thumb-color="purple" />
        </v-col>
        <v-col cols="12" v-else>
            <v-img :src=" this.$serverURL + 'thumbnail/' + this.code" 
                aspect-ratio="4/3"
                cover
                />
                
        </v-col>
    </v-row>
</template>

<script>
export default {
    props : [ 'code'],
    components : {},
    data() {
        return {
            loaded_images : 0,
            images: [],
            interval:100,
            currentIndex: 0,
            allowScroll : false,
            intervalTimer_ID : 0,
        };
    },
    watch:{
        code: function(newVal, oldVal) { // watch it
            this.curCode = newVal;        
            this.get_Product_Data(newVal);
        }
    },
    created(){
        this.get_Product_Data(this.code);
    },
    computed: {
    },
    methods: {
        get_Product_Data(code){
                    this.$axios
                    .post( this.$serverURL + "api/" + "products/image360/" + code , {
                    })
                    .then((res) => {
                        this.images = [];
                            if (res.data.code == 200) {
                                res.data.data.forEach(element => {
                                    this.images.push(this.$serverURL + 'resources/' + element['file_data']['filename'] );
                                });
                                res.data.data.forEach(element => {
                                    this.images.push(this.$serverURL + 'resources/' + element['file_data']['filename'] );
                                });
                            } else {
                            }
                            this.images.push(this.$serverURL + 'thumbnail/' + code );
                            this.currentIndex  = 1 
                    }).catch((err) => {

                    });  
        },
        prevImage() {
            this.currentIndex = new Number(this.currentIndex);
            if( !this.allowScroll ){ return; }
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        },
        nextImage() {
            this.currentIndex = new Number(this.currentIndex);
            if( !this.allowScroll ){ return; }
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
    },
};
</script>

<style scoped>

    .slider {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .slider img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0s ease;
    }
</style>
