import store from '@/store/index'
import axios from 'axios'
axios.defaults.withCredentials = true
export default function guest({ next }) {
	if (store.state.user.loggedIn.token) {
		return next('/transfers')
	} else {
		axios
			.post('https://test.siberianspirits.ru/api/admin/check')
			.then(() => {
				store.dispatch('goHome')
				next('/')
			})
			.catch(() => {
				next()
			})
	}

	// axios.post('https://test.belotouriha.ru/admin/check')
	//   .then(()=>{
	//     return next({
	//       name: 'Home'
	//     })
	//   })
	//   .catch(() => {
	//     next()
	//   })
}
