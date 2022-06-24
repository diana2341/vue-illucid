import Vuex from "vuex";
import mixes from "./modules/mixes";
import Vue from "vue";

// Load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		mixes,
	},
});
