import loadMore from '../assets/js/loadMore.js'
import axios from "axios"

import errors from './errors'
import loading from './load'

export default {
	modules: { errors, loading },
	state: {
		messages: {all: [], main:[]}
	},
	mutations: {
		setMessage (state, payload) {
			state.messages.all =  payload
		},
		setMessagesMain (state, payload) {
			state.messages.main =  payload
		},
		loadMessages (state, payload) {
			state.messages.main = [...state.messages.main, ...payload]
		}
	},
	actions: {
		setMessage ({commit, dispatch}, payload, payloadMain) {
			axios
			.get("https://tocode.ru/static/c/vue-pro/notifyApi.php")
			.then(response => {
				let payload = response.data.notify,
					payloadMain = response.data.notify.filter( res => res.main === true )
				commit('setMessage', payload)
				commit('setMessagesMain', payloadMain)
			})
			.catch(() => dispatch('setError', 'Error: Network Error'))
			.finally(() => dispatch('setLoading', false))

		},
		loadMessages ({commit, getters}) {
			let res = getters.getMessageFilter
			const count = 2
			commit('loadMessages', loadMore(res, count))
		},
		setMessageLazy ({commit, dispatch}) {
			dispatch('setError', null)
			dispatch('setLoading', true)
		  	 setTimeout(() => {
				dispatch('setMessage')
			 }, 5000);
		}

	},
	getters: {
		getMessage (state) {
			return state.messages.all
		},
		getMessageFilter (state) {
			return state.messages.all.filter( mes => mes.main === false )
		},
		getMessagesMain (state) {
			return state.messages.main
		}
	}
}