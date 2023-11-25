<template>
          <div class="col-12 py-2" v-if="this.related.length > 0">
                    <v-row>
                              <v-col cols="12" sm="12">
                                        <h4>Recommended Products</h4>
                              </v-col>
                    </v-row>
          </div>
          <Products_ThumbnailVue :initClass='"col-12 col-s-12 col-md-3 col-lg-2"' :data="item"
                    v-for="(item, index) in this.related" :key="index" />
</template>
<script>
import Products_ThumbnailVue from '@/components/WebApp/Products/Products_Thumbnail.vue';
export default {
          props: ['code'],
          components: { Products_ThumbnailVue },
          setup() {
          },
          data() {
                    return {
                              related: []
                    }
          },
          created() {
                    this.get_Related_Data();
          },
          mounted() {
          },
          methods: {
                    get_Related_Data() {
                              this.$axios
                                        .post(this.$serverURL + "api/products/data/related/" + this.code + "/related", {
                                        })
                                        .then((res) => {
                                                  if (res.data.code == 200) {
                                                            this.related = res.data.results;
                                                  } else {

                                                  }
                                        }).catch((err) => {

                                        });
                    },
          }
}
</script>
