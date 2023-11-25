import { createRouter, createWebHistory } from "vue-router";

const webapp_url = '/mkta';
const webapp_title = 'Web ';
import indexPage from "@/views/WepPages/index.vue";
import { nextTick } from "vue";
import WebAdmin_Dashboard from "@/views/WebApp/Pages/Dashboard/index.vue"
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		//#region Guest Pages
		{
			path: "/",
			name: "Home",
			component: indexPage,
			meta : {
				pageTitle: 'Home',
				type: 'Guest'
			}
		},
		{
			path: "/about",
			name: "About",
			component: indexPage,
			meta : {
				pageTitle: 'About',
				type: 'Guest'
			}
		},
		{
			path: "/become-a-partner",
			name: "Become a Partner",
			component: indexPage,
			meta : {
				pageTitle: 'Become a Partner',
				type: 'Guest'
			}
		},
		{
			path: "/privacy",
			name: "Privacy Statement",
			component: indexPage,
			meta : {
				pageTitle: 'Privacy Statement',
				type: 'Guest'
			}
		},
		{
			path: "/disclaimer",
			name: "Disclaimer",
			component: indexPage,
			meta : {
				pageTitle: 'Disclaimer',
				type: 'Guest'
			}
		},
		{
			path: "/logout",
			name: "Logout",
			component: () => indexPage,
			meta : {
				pageTitle: webapp_title + 'Logout',
				type: 'Guest'
			},
			beforeEnter: (to, from, next) => { 
				localStorage.clear();
				next({name: 'Home'});
			}
		},
		{
			path: "/login",
			name: "Login",
			component: indexPage,
			meta : {
				pageTitle: 'Login',
				type: 'Guest'
			},
		},
		{
			path: "/login",
			name: "link",
			component: indexPage,
			meta : {
				pageTitle: 'Login',
				type: 'Guest'
			},
		},
		//#endregion
		//#region Web Store
		{
			path: webapp_url + "/store",
			name: "Web App Store",
			component:  () => import("@/views/WebApp/Pages/Store/storeIndex.vue"),
			meta : {
				pageTitle: webapp_title + 'Store'
			}
		},
		{
			path: webapp_url + "/store/cart",
			name: "Web App Cart",
			component:  () => import("@/views/WebApp/Pages/Cart/cart_index.vue"),
			meta : {
				pageTitle: webapp_title + 'Cart'
			}
		},
		{
			path: webapp_url + "/store/categories/:category",
			name: "Categories",
			component: () => import("@/views/WebApp/Pages/Store/Categories_Index.vue"),
			meta : {
				pageTitle: webapp_title + 'Category'
			}
		},
		{
			path: webapp_url + "/store/product/:code",
			name: "Product Card",
			component: () => import("@/views/WebApp/Pages/Store/Product_Index.vue"),
			meta : {
				pageTitle: webapp_title + 'Product'
			}
		},
		
		{
			path: webapp_url + "/store/products/:filter",
			name: "Product List Query",
			component: () => import("@/views/WebApp/Pages/Store/Products.vue"),
			meta : {
				pageTitle: webapp_title + 'Product Query'
			}
		},
		//#endregion
		//#region Web Admin
		{
			path: webapp_url + "/dashboard" + "/home",
			name: "Web App Dashboard",
			component: WebAdmin_Dashboard,
			meta : {
				pageTitle: webapp_title + 'Dashboard'
			},
			children: [
				
				{
					path: webapp_url + "/dashboard" + "/roles",
					name: "Dashboard Role",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/Role/index.vue") 
					},
					meta : {
						contentTitle : 'Roles',
						pageTitle: 'Roles'
					},
				},
				{
					path: webapp_url + "/dashboard" + "/roles/:roleIndex",
					name: "Dashboard Role Index",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/Role/role_index.vue") 
					},
					meta : {
						contentTitle : 'Role Information',
						pageTitle: 'Roles'
					},
				},
				{
					path: webapp_url + "/dashboard" + "/customers",
					name: "Dashboard Customers",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/Customers/index.vue") 
					},
					meta : {
						contentTitle : 'Customers',
						pageTitle: 'Customers'
					},
				},
				{
					path: webapp_url + "/dashboard" + "/customers/:customerToken",
					name: "Dashboard Customers Data",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/Customers/customer_data.vue") 
					},
					meta : {
						contentTitle : 'Customers',
						pageTitle: 'Customers'
					},
				},
				{
					path: webapp_url + "/dashboard" + "/customers/:customerToken",
					name: "Dashboard User Acount",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/User/account.vue") 
					},
					meta : {
						contentTitle : 'User Account',
						pageTitle: 'User Account'
					},
				},
				{
					path: webapp_url + "/dashboard" + "/products",
					name: "Dashboard Product",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/Product/index.vue") 
					},
					meta : {
						contentTitle : 'Products',
						pageTitle: 'Products'
					}
				},
				{
					props: true,
					path: webapp_url + "/dashboard" + "/products/:code",
					name: "Dashboard Product Item",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/Product/Product-Info/index.vue") 
					},
					meta : {
						contentTitle : 'Product Item Data',
						pageTitle: 'Product Item Data'
					},
				},
                                        {
					props: true,
					path: webapp_url + "/dashboard" + "/Categories",
					name: "Dashboard Categories",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/Categories/index.vue") 
					},
					meta : {
						contentTitle : 'Categories',
						pageTitle: 'Categories'
					},
				},
				{
					path: webapp_url + "/dashboard" + "/permissions",
					name: "Dashboard Permission",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/Permission/index.vue") 
					},
					meta : {
						contentTitle : 'Permission',
						pageTitle: 'Permission'
					},
				},
				{
					path: webapp_url + "/dashboard" + "/permissions/:permission_id",
					name: "Dashboard Permission Index",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/Permission/permission_index.vue") 
					},
					meta : {
						contentTitle : 'Permission',
						pageTitle: 'Permission'
					},
				},
				{
					path: webapp_url + "/dashboard" + "/users",
					name: "Dashboard User",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/User/index.vue") 
					},
					meta : {
						contentTitle : 'User',
						pageTitle: 'User'
					},
				},
				{
					path: webapp_url + "/dashboard" + "/users/:userToken",
					name: "Dashboard User Acount",
					components: { 
						default : WebAdmin_Dashboard,
						content : () => import("@/views/WebApp/Pages/Dashboard/User/account.vue") 
					},
					meta : {
						contentTitle : 'User Account',
						pageTitle: 'User Account'
					},
				},
			]
		},
		//#endregion
	],
});
router.beforeEach((to, from, next)=>{
	
	

	let needAuthentication = (to.meta.type === undefined);
	let userToken = localStorage.getItem("userToken")

	// if( userToken!=null ){
	// 	this.$axios.put(
	// 		this.$serverURL + "api/" + "customers" + "/list", 
	// 		{}
	// 	).then( (res) => {} ).catch( (err) => {} );
	// }

	if( needAuthentication &&  userToken != null){
		if(to.name == 'Login'){
			next({name: 'Web App Store'});
		}else{
			next();
		}
	}else if( userToken != null && to.name == 'Login' ){
		next({name: 'Web App Store'});
	}else{
		if( needAuthentication ){
			next({name : 'Login'});
		}else{
			next();
		}
	}
});
router.afterEach((to, from) => {
	if( to.meta.pageTitle !== undefined){
		document.title = "MKTA - PH | " + to.meta.pageTitle;
		// document.title = "MKTA - PH | " + to.name;

	}else{
		document.title = "MK Themed Attractions Philippines Inc";
	}
});
export default router;
