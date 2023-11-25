<template>
<v-card>
        <v-card-title>
                {{ $route.meta.contentTitle }}
        </v-card-title>
        <v-card-actions>
                <v-btn  prepend-icon="mdi-refresh" 
                        @click="()=>{
                                get_Roles()
                        }"
                        class="bg-info border">
                        Refresh
                </v-btn>
                <v-btn    
                        prepend-icon="mdi-plus" 
                        class="bg-info border"
                        @click="()=>{ show_Registration = true }"
                        >
                        Register Role
                </v-btn>
        </v-card-actions>
        <v-card-text>
                <v-table fixed-header >
                        <thead>
                                <tr>
                                        <th class="text-left">
                                                Title
                                        </th>
                                        <th class="text-left" style="width: 50px;">
                                                Users
                                        </th>
                                        <th class="text-left" style="width: 50px;">
                                                
                                        </th>
                                </tr>
                        </thead>

                        <tbody>
                                <tr
                                        v-for="(item, index) in paginate[curPage-1]"
                                        :key="index"
                                >
                                        <td>
                                                <v-card elevation="0" flat>
                                                        <v-card-title>
                                                                {{ item.title }}
                                                        </v-card-title>
                                                        <v-card-subtitle>
                                                                {{ item.description }}
                                                        </v-card-subtitle>
                                                </v-card>
                                        </td>
                                        <td class="text-center">
                                                {{ item.users.length }}
                                        </td>
                                        <td>
                                                <router-link class="text-decoration-none" :to="{ name: 'Dashboard Role Index', params: { roleIndex : item.id}}">
                                                        <v-btn fab variant="outlined" class="my-1" icon="mdi-eye" />
                                                </router-link>
                                        </td>
                                </tr>
                                
                        </tbody>
                </v-table>
        </v-card-text>
        <v-card-text>
                <v-pagination v-model="curPage" :length="paginate.length" :total-visible="7" />
        </v-card-text>
</v-card>
<v-dialog v-model="show_Registration" width="800">
        <RoleRegistration :isDialog="true" v-on:close="()=>{ show_Registration= false }" v-on:change="()=>{ show_Registration= false; get_Roles() }" />
</v-dialog>

</template>
<script>
import RoleRegistration from '@/components/globalComponents/RoleRegistration.vue';
export default {
        emits : ['change', 'close'],
        components: {
                RoleRegistration
         },
        setup() {

        },
        created() {

        },
        mounted() {
                this.get_Roles();
        },
        data () {
                return {
                                show_Registration : false,

                                /* Tabel with Pagination Data */
                                data : [],
                                paginate : [],
                                curPage : 1,
                                chunkSize : 10,
                        }
        },
        methods: {
                set_Paginate(){
                        this.paginate = []
                        for (let i = 0; i < this.data.length; i += this.chunkSize) {
                                this.paginate.push(this.data.slice(i, i + this.chunkSize));
                        }
                        this.curPage = 1;
                },
                get_Roles(){
                        this.$axios
                                .post( this.$serverURL + "api/" + "roles/get", { })
                                .then((res) => {
                                        if (res.data.code == 200) {
                                                this.data = res.data.data;
                                                this.set_Paginate()
                                        } else {

                                        }
                                }).catch((err) => {
                        });
                }
        },
        
}
</script>
