<template>
<v-app theme="light" full-height>
          <v-navigation-drawer app theme="dark">
                    <v-list>
                              <v-list-item >         
                                        <v-card theme="dark" class="mx-auto py-2 rounded-0" >
                                                  <v-img
                                                            class="mx-auto my-3"
                                                            height="200px"
                                                            cover
                                                            :src="this.$serverURL +'resources/Default_Thumbnail.png'"
                                                  />
                                                  <v-card-title class="text-center">
                                                            {{ userData.userName }}
                                                  </v-card-title>
                                                  <v-card-subtitle class="text-center">
                                                            {{ userData.userMail }}
                                                  </v-card-subtitle>
                                        </v-card>
                              </v-list-item>
                              <v-divider></v-divider>
                              <v-list-item  v-for="(item, i) in sale" :prepend-icon="item.icon" :key="i">         
                                        <RouterLink :to="{name: item.link }"
                                                  class="text-decoration-none nav-link p-2 " exact>
                                                  {{ item.title }}
                                        </RouterLink>
                              </v-list-item>
                              <v-divider></v-divider>
                              <v-list-item  v-for="(item, i) in admin" :prepend-icon="item.icon" :key="i">         
                                        <RouterLink :to="{name: item.link }"
                                                  class="text-decoration-none nav-link p-2 " exact>
                                                  {{ item.title }}
                                        </RouterLink>
                              </v-list-item>
                              <v-divider></v-divider>
                              <v-list-item  prepend-icon="mdi-account">
                                        <RouterLink :to="{ name: 'Dashboard User Acount', params: { userToken : cur_userToken}}"
                                                  class="text-decoration-none nav-link p-2 " exact>
                                                  Account
                                        </RouterLink>
                              </v-list-item>
                              <v-list-item  prepend-icon="mdi-logout" >         
                                        <RouterLink :to="{name: 'Logout' }"
                                                  class="text-decoration-none nav-link p-2 " exact>
                                                  Logout
                                        </RouterLink>
                              </v-list-item>
                    </v-list>
          </v-navigation-drawer>

          <v-main class="d-flex bg-light w-100" style="min-height: 300px;">
                    <v-container class="text-black" style="min-width: 500px;">
                              <router-view name="content"/>
                    </v-container>
          </v-main>
</v-app>
</template>
<script>
export default {
          data() {
                    return {
                              cur_userToken : localStorage.getItem('userToken'),
                              sale : [
                                        {
                                                  title: 'Store', 
                                                  icon : 'mdi-store', 
                                                  isNamed : false,
                                                  link : 'Web App Store'
                                        },
                                        {
                                                  title: 'Customers', 
                                                  icon : 'mdi-clipboard-account', 
                                                  isNamed : false,
                                                  link : 'Dashboard Customers'
                                        },
                                        // {
                                        //           title: 'Orders', 
                                        //           icon : 'mdi-cart', 
                                        //           isNamed : false,
                                        //           link : 'Web App Dashboard'
                                        // },
                              ],
                              admin : [
                                        {
                                                  title: 'Product', 
                                                  icon : 'mdi-table', 
                                                  isNamed : false,
                                                  link : 'Dashboard Product'
                                        },
                                        {
                                                  title: 'Categories', 
                                                  icon : 'mdi-group', 
                                                  isNamed : false,
                                                  link : 'Dashboard Categories'
                                        },

                                        {
                                                  title: 'Users', 
                                                  icon : 'mdi-account', 
                                                  isNamed : false,
                                                  link : 'Dashboard User'
                                        },
                                        {
                                                  title: 'Roles', 
                                                  icon : 'mdi-account-multiple', 
                                                  isNamed : false,
                                                  link : 'Dashboard Role'
                                        },
                                        {
                                                  title: 'Permissions', 
                                                  icon : 'mdi-shield', 
                                                  isNamed : false,
                                                  link : 'Dashboard Permission'
                                        },
                              ],
                              userData : {
                                        userName : localStorage.getItem('userName'),
                                        userMail : localStorage.getItem('userMail')
                              }
                    };
          },
          components: { },
          setup() {

          },
          created() {

          },
          mounted() {

          },
          methods: {
                    
          },
};
</script>
