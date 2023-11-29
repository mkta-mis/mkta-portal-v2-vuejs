import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/bs5_additional.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
// make sure to also import the coresponding css
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

const vuetify = createVuetify({
	theme: {
		defaultTheme: "dark",
	},
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			mdi,
		},
	},
	ssr: false,
	components,
	directives,
});


import axios from "./plugins/axios";

const app = createApp(App);
// app.use(axios, {
// 	baseUrl: "https://portal-api.mkthemedattractions.com.ph/api/",
// });

let url = "https://portal-api.mkthemedattractions.com.ph/"

app.use(axios, {
	baseUrl: url + "api",
});

app.use(router).use(vuetify)
app.config.globalProperties.$myGlobalVariable = "John Ricky Lapitan";
app.config.globalProperties.$errorImage = 'https://developers.google.com/static/maps/documentation/maps-static/images/error-image-generic.png';
// app.config.globalProperties.$serverURL = "https://portal-api.mkthemedattractions.com.ph/";
// app.config.globalProperties.$apiURL = "https://portal-api.mkthemedattractions.com.ph/api";


app.config.globalProperties.$serverURL = url ;
app.config.globalProperties.$apiURL = url + "api" ;


app.mount("#app");
