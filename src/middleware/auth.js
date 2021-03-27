import store from '@/store/index'
import axios from 'axios'
axios.defaults.withCredentials = true

export default function auth({ next }) {
	axios
		.post('https://test.siberianspirits.ru/api/admin/check')
		.then(() => {
			store.dispatch('goHome')
			next()
		})
		.catch(() => {
			next({ name: 'login' })
		})
}
