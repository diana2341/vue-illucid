import axios from "axios";

const state = {
	mixes: [],
	soundDictionary: {
		light_rain_volume: {
			name: "rain",
			image: "rainy.png",
			audio: "light-rain.mp3",
		},
		bird_volume: {
			name: "bird",

			image: "bird.png",
			audio: "birds.fade.ogg",
		},
		large_fire_volume: {
			name: "regularFire",

			image: "regular-fire.png",
			audio: "fire-large-flame.mp3",
		},
		thunder_volume: {
			name: "thunderCloud",

			image: "thunder-cloud.png",
			audio: "thunder.fade.ogg",
		},
		wave_volume: {
			name: "wave",

			image: "wave.png",
			audio: "ocean-wave.mp3",
		},
		strong_wind_volume: {
			// too strong
			name: "strongWind",

			image: "strongwind.png",
			audio: "wind-strong.mp3",
		},
		forest_volume: {
			// also pretty loud windy more than forest
			name: "forest",

			image: "forest.png",
			audio: "forest-windy-bird.mp3",
		},
		heavy_rain_volume: {
			// like this one
			name: "thunder",

			image: "thunder.png",
			audio: "rain-concrete.mp3",
		},
		campfire_volume: {
			name: "fire",

			image: "fire.png",
			audio: "campfire.mp3",
		},
		river_volume: {
			name: "riverWave",

			image: "riverWave.png",
			audio: "river.mp3",
		},
		light_wind_volume: {
			name: "simpleWind",
			image: "wind-simple.png",
			audio: "rain-light-in-nature.mp3",
		},
		coffee_shop_volume: {
			name: "cafe",

			image: "cafe.png",
			audio: "coffee.mp3",
		},
		cat_purring_volume: {
			name: "cat",

			image: "cat.png",
			audio: "Cat-purring-sound.wav",
		},
		night_sound_volume: {
			name: "night",

			image: "nighttime.png",
			audio: "Summer-insect-sounds-night.mp3",
		},
		wind_chime_volume: {
			name: "chimes",

			image: "windchime.png",
			audio: "Wind-chimes-sound.mp3",
		},
	},
};

const getters = {
	allMixes: (state) => state.mixes,
	soundDictionary: (state) => state.soundDictionary,
};

const actions = {
	async fetchMixes({ commit }) {
		const response = await axios.get("https://illucid-backend.herokuapp.com/mixes");
		commit("setMixes", response.data);
	},
	async addMix({ commit }, payload) {
		const response = await axios.post("https://illucid-backend.herokuapp.com/mixes", payload);
		commit("newMix", response.data);
	},
	async deleteMix({ commit }, id) {
		await axios.get(`https://illucid-backend.herokuapp.com/mixes/${id}`);
		commit("removeMix", id);
	},
};

const mutations = {
	setMixes: (state, mixes) => (state.mixes = mixes),
	newMix: (state, mix) => state.mixes.unshift(mix),
	removeMix: (state, id) => (state.mixes = state.mixes.filter((mix) => mix.id !== id)),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
