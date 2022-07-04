<template>
	<div id="app">
		<div v-if="userId === false">
			<PopupSignup @nameUpdate="nameUpdate" />
		</div>
		<div class="welcome_user" :class="{ show: userName.length > 1 || name.length > 1 }">
			{{ dayTime }} {{ userName.length > 1 ? userName : name }}!
		</div>
		<div class="container">
			<MixForm ref="form" @playAudio="playAudio" :userId="id" :showUser="userId" />
		</div>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import MixForm from "./components/MixForm.vue";
import PopupSignup from "./components/PopupSignup.vue";
export default {
	name: "App",
	components: {
		MixForm,
		PopupSignup,
	},

	methods: {
		...mapMutations(["setDate"]),
		playAudio(event, mix) {
			this.$refs.form.$children.map((child) => {
				if (child.$refs.rain) {
					child.$refs.rain.value = mix.light_rain_volume;
					child.$refs.rain.previousElementSibling.volume = mix.light_rain_volume;
					child.$refs.rain.previousElementSibling.play();
				} else if (child.$refs.bird) {
					child.$refs.bird.value = mix.bird_volume;
					child.$refs.bird.previousElementSibling.volume = mix.bird_volume;
					child.$refs.bird.previousElementSibling.play();
				} else if (child.$refs.regularFire) {
					child.$refs.regularFire.value = mix.large_fire_volume;
					child.$refs.regularFire.previousElementSibling.volume = mix.large_fire_volume;
					child.$refs.regularFire.previousElementSibling.play();
				} else if (child.$refs.thunderCloud) {
					child.$refs.thunderCloud.value = mix.heavy_rain_volume;
					child.$refs.thunderCloud.previousElementSibling.volume = mix.heavy_rain_volume;
					child.$refs.thunderCloud.previousElementSibling.play();
					//
				} else if (child.$refs.wave) {
					child.$refs.wave.value = mix.wave_volume;
					child.$refs.wave.previousElementSibling.volume = mix.wave_volume;
					child.$refs.wave.previousElementSibling.play();
				} else if (child.$refs.strongWind) {
					child.$refs.strongWind.value = mix.strong_wind_volume;
					child.$refs.strongWind.previousElementSibling.volume = mix.strong_wind_volume;
					child.$refs.strongWind.previousElementSibling.play();
				} else if (child.$refs.forest) {
					child.$refs.forest.value = mix.forest_volume;
					child.$refs.forest.previousElementSibling.volume = mix.forest_volume;
					child.$refs.forest.previousElementSibling.play();
				} else if (child.$refs.thunder) {
					child.$refs.thunder.value = mix.thunder_volume;
					child.$refs.thunder.previousElementSibling.volume = mix.thunder_volume;
					child.$refs.thunder.previousElementSibling.play();
				} else if (child.$refs.fire) {
					child.$refs.fire.value = mix.campfire_volume;
					child.$refs.fire.previousElementSibling.volume = mix.campfire_volume;
					child.$refs.fire.previousElementSibling.play();
				} else if (child.$refs.riverWave) {
					child.$refs.riverWave.value = mix.river_volume;
					child.$refs.riverWave.previousElementSibling.volume = mix.river_volume;
					child.$refs.riverWave.previousElementSibling.play();
				} else if (child.$refs.simpleWind) {
					child.$refs.simpleWind.value = mix.light_wind_volume;
					child.$refs.simpleWind.previousElementSibling.volume = mix.light_wind_volume;
					child.$refs.simpleWind.previousElementSibling.play();
				} else if (child.$refs.cafe) {
					child.$refs.cafe.value = mix.coffee_shop_volume;
					child.$refs.cafe.previousElementSibling.volume = mix.coffee_shop_volume;
					child.$refs.cafe.previousElementSibling.play();
				} else if (child.$refs.cat) {
					child.$refs.cat.value = mix.cat_purring_volume;
					child.$refs.cat.previousElementSibling.volume = mix.cat_purring_volume;
					child.$refs.cat.previousElementSibling.play();
				} else if (child.$refs.night) {
					child.$refs.night.value = mix.night_sound_volume;
					child.$refs.night.previousElementSibling.volume = mix.night_sound_volume;
					child.$refs.night.previousElementSibling.play();
				} else if (child.$refs.chimes) {
					child.$refs.chimes.value = mix.wind_chime_volume;
					child.$refs.chimes.previousElementSibling.volume = mix.wind_chime_volume;
					child.$refs.chimes.previousElementSibling.play();
				}
			});
		},
		nameUpdate(e, name, id, show) {
			this.name = name;
			this.id = id;
			this.userId = show;
		},
	},
	data() {
		return {
			userId: false,
			userName: "",
			name: "",
			id: "",
			dayTime: "",
		};
	},
	mounted() {
		this.$store.commit("setDate");
    console.log(this.id)
	},

	created() {
		let id = localStorage.getItem("illucidId");
		let name = localStorage.getItem("illucidName");
		let bg = localStorage.getItem("illucidBackground");

		if (id && name.length) {
			this.userId = true;
			this.userName = name;
      this.id=id
		} else {
			this.userId = false;
		}
		if (bg === "fall") {
			document.body.style.backgroundImage = ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${require("@/assets/darkLeaves.svg")})`;
			document.body.style.backgroundRepeat = "initial";
			document.body.style.backgroundSize = "initial";
			document.body.style.backgroundPosition = "initial";
		} else if (bg === "rain") {
			document.body.style.backgroundImage = ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${require("@/assets/rain.svg")})`;
			document.body.style.backgroundRepeat = "initial";
			document.body.style.backgroundSize = "initial";
			document.body.style.backgroundPosition = "initial";
		} else if (bg === "night") {
			document.body.style.backgroundImage = ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${require("@/assets/night.svg")})`;
			document.body.style.backgroundRepeat = "no-repeat";
			document.body.style.backgroundSize = "cover";
			document.body.style.backgroundPosition = "center center";
		}
		const today = new Date();
		const curHr = today.getHours();

		if (curHr < 12) {
			this.dayTime = "Good morning";
		} else if (curHr < 18) {
			this.dayTime = "Good afternoon";
		} else {
			this.dayTime = "Good evening";
		}
	},
	watch: {
		name(name) {
			this.name = name;
		},
		id(id) {
			this.id = id;
			console.log(id);
		},
	},
};
</script>

<style>
body {
	background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("~@/assets/night.svg");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}
.container {
	/* background: #00000047; */
	border-radius: 60px;
	max-width: 900px;
	margin: 0 auto;
	padding: 20px;
	padding-top: 0;
}
.welcome_user {
	font-family: "Coiny";
	color: #bbd6db;
	font-size: 45px;
	margin: 0 auto;
	width: max-content;
	opacity: 0;
	margin-top: 1.5em;
}
.welcome_user.show {
	opacity: 1;
}
@media (max-width: 545px) {
	.sound-container {
		grid-template-columns: 1fr 1fr !important;
	}
	.welcome_user {
		width: 90%;
		text-align: center;
	}
}
@media (max-width: 437px) {
	input[type="text"] {
		min-width: 75% !important;
	}
	.random-options {
		flex-wrap: wrap;
	}
}
@media (max-width: 280px) {
	.sound-container {
		grid-template-columns: 1fr !important;
	}
}
</style>
