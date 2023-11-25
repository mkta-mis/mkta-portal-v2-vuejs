<template>
<v-card flat>
        <v-card-actions>
                <v-btn @click="get_Account_Roles()" prepend-icon="mdi-refresh" variant="outlined" class="bg-primary">Refresh</v-btn>
                <v-btn variant="outlined" class="bg-success" prepend-icon="mdi-plus" @click="newRole_data.showDialog = true">Append Role</v-btn>
        </v-card-actions>
        <v-card-text>

                <v-tabs v-model="selectedOptions" class="mb-3">
                        <v-tab :value="index" v-for="(role, index) in userRoles">
                                {{ role.title }}
                        </v-tab>
                        <v-spacer></v-spacer>
                        
                </v-tabs>
                <v-window v-model="selectedOptions">
                        <v-window-item v-for="(role, index) in userRoles" >
                                <v-card-text>
                                                <v-row class="my-2">
                                                        <v-col cols="12" sm="12">
                                                                {{ role.description }}
                                                                <v-btn v-if="userRoles.length > 1" @click="remove_Role(role.id)" prepend-icon="mdi-delete" class="bg-danger text-white float-end my-2">Remove Role</v-btn>
                                                        </v-col>
                                                        <v-col 
                                                                cols="12" 
                                                                md="4"
                                                                v-for="(permi, index) in role.permissions"
                                                        >
                                                                <v-card :elevation="6" class="p-2">
                                                                        <v-card-title>{{ permi.permission_data.title }}</v-card-title>
                                                                        <v-card-subtitle class="text-danger">{{ permi.permission_data.key }}</v-card-subtitle>
                                                                        <v-card-text>{{ permi.permission_data.description }}</v-card-text>
                                                                </v-card>
                                                        </v-col>
                                                </v-row>
                                </v-card-text>
                        </v-window-item>
                </v-window>
        </v-card-text>
        
</v-card>

<v-dialog v-model="newRole_data.showDialog " persistent width="800" > 
        <v-card >
                <v-card-actions>
                        <v-card-title>
                                Append Role to User
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn class="bg-danger text-white" fab icon="mdi-close" @click="newRole_data.showDialog  = false"></v-btn>
                </v-card-actions>
                <v-card-text>
                        <v-select
                                v-model="newRole_data.role_data"
                                label="Role"
                                item-value="id"
                                item-title="title"
                                :items="roles.filter( (x) => { return !(this.currentRoles.indexOf(x.id) != -1) }) "
                                />
                </v-card-text>
                <v-card-actions>
                        <v-btn class="bg-danger text-white" prepend-icon="mdi-close" @click="newRole_data.showDialog  = false">Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-if="newRole_data.role_data != null" class="bg-success text-white" prepend-icon="mdi-plus" @click="append_Role">Append Role</v-btn>
                </v-card-actions>
        </v-card>
</v-dialog>
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
                        newRole_data: {
                                showDialog : false,
                                role_data : null
                        },
                        userToken : this.$route.params.userToken,
                        userRoles : [],
                        currentRoles : [],
                        selectedOptions : 0,
                        roles : []
                }
        },
        
        setup() {

        },
        created() {
        },
        mounted() {
                this.get_Account_Roles();
                this.get_Roles();
        },
        methods: {
                append_Role(){
                        this.$axios
                        .post( this.$serverURL + "api/" + "users/web-admin" + "/update", { 
                                mode : 'append-role',
                                tokenString: localStorage.getItem("userToken"),
                                data : {
                                                userToken : this.userToken,
                                                role_data : this.newRole_data.role_data 
                                }
                                
                        }).then((res) => {
                                if(res.data.code == 200){
                                                this.get_Account_Roles();
                                }
                        }).catch((err) => {
                        });
                },
                remove_Role(role_id){
                        this.$axios
                        .post( this.$serverURL + "api/" + "users/web-admin" + "/update", { 
                                mode : 'remove-role',
                                tokenString: localStorage.getItem("userToken"),
                                data : {
                                                userToken : this.userToken,
                                                role_data : role_id
                                }
                                
                        }).then((res) => {
                                if(res.data.code == 200){
                                                this.get_Account_Roles();
                                }
                        }).catch((err) => {
                        });
                },
                get_Roles(){
                        this.$axios
                                .post( this.$serverURL + "api/" + "roles/get", { })
                                .then((res) => {
                                        if (res.data.code == 200) {
                                                this.roles = res.data.data;
                                        } else {

                                        }
                                }).catch((err) => {
                        });
                },
                get_Account_Roles(){
                        this.get_Roles();
                        this.newRole_data.role_data = null
                        this.newRole_data.showDialog = false
                        this.$axios
                        .post( this.$serverURL + "api/" + "users/web-admin" + "/list", { 
                                mode : 'exact-token-roles',
                                tokenString: localStorage.getItem("userToken"),
                                data : {
                                                userToken : this.userToken
                                }
                                
                        }).then((res) => {
                                if(res.data.code == 200){
                                                this.userRoles = res.data.results;
                                                this.currentRoles = []
                                                this.userRoles.forEach(element => {
                                                        this.currentRoles.push( element.id )
                                                });
                                                this.selectedOptions = 0
                                }
                        }).catch((err) => {
                        });
                }
        },
}
</script>