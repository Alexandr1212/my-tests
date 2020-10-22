import { Store } from './src/js/store.js';
import { Router } from './src/js/router.js';

import { MetricsContainer } from './src/components/Metrics/Metrics.js';
import { Home } from './src/components/Home/Home.js';


// Config
const PORT = 3000;
const SITE_URL = 'http://localhost:';
const MODELS = [
	'metrics',
];

// Create store
var store = new Store(MODELS, PORT, SITE_URL);

// Set routes
const ROUTES = [
	{
		path: '/',
		template: MetricsContainer,
		params: {
			store: store,
			model: 'metrics'
		}
	},
	{
		path: '/home',
		template: Home
	},
];

// Create router with routes
var router = new Router(ROUTES);

/* 
  Add event for nav_link
  If click then load new route and change path from ROUTES 
*/
let links = document.querySelectorAll('.nav_link');
for (let i = 0; i < links.length; i++) {
	links[i].addEventListener('click', function () {
		let active_link = document.querySelector(".nav_link.active");
		active_link.classList.remove('active');
		this.classList.toggle('active');
		router.loadRoute(this.dataset.url);
	});
}
