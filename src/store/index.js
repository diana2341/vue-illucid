import Vuex from "vuex";
import mixes from "./modules/mixes";

// Load Vuex
// Vue.use(Vuex);

export default Vuex.createStore({
	modules: {
		mixes,
	},
});
