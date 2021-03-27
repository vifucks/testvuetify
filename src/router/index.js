import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import guest from '@/middleware/guest'
import middlewarePipeline from '@/router/middlewarePipeline'
import auth from '@/middleware/auth'
import store from '@/store/index'

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/c-transfer',
			name: 'create-transfer',
			props: true,
			component: () => import(/* webpackChunkName: "about" */ '../views/Create-transfer.vue'),
			meta: {
				middleware: [auth]
			}
		},
		{
			path: '/',
			name: 'Home',
			props: true,
			meta: {
				middleware: [auth]
			},
			component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
		},
		{
			path: '/allrequests',
			name: 'requests',
			props: true,
			component: () => import(/* webpackChunkName: "about" */ '../views/Requests.vue'),
			meta: {
				middleware: [auth]
			}
		},
		{
			path: '/booking',
			name: 'booking',
			props: true,
			component: () => import(/* webpackChunkName: "about" */ '../views/Booking.vue'),
			meta: {
				middleware: [auth]
			}
		},
		{
			path: '/transfers',
			name: 'transfers',
			props: true,
			component: () => import(/* webpackChunkName: "about" */ '../views/Transfer.vue'),
			meta: {
				middleware: [auth]
			}
		},
		{
			path: '/allcomments',
			name: 'allcomments',
			props: true,
			component: () => import(/* webpackChunkName: "about" */ '../views/Comments-app.vue'),
			meta: {
				middleware: [auth]
			}
		},
		{
			path: '/changeprices',
			name: 'changeprices',
			props: true,
			component: () => import(/* webpackChunkName: "about" */ '../views/Changeprices-app.vue'),
			meta: {
				middleware: [auth]
			}
		},
		{
			path: '/login',
			name: 'login',
			props: true,
			component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
			meta: {
				middleware: [guest]
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	if (!to.meta.middleware) {
		return next()
	}
	const middleware = to.meta.middleware
	const context = {
		to,
		from,
		next,
		store
	}

	return middleware[0]({
		...context,
		next: middlewarePipeline(context, middleware, 1)
	})
})

export default router
