<template>
  <div>
    <div id="popup1" class="overlay" :class="{ hide: success }">
      <div class="popup" data-aos="fade-up">
        <h2>Welcome to Illucid ! <img src="~@/assets/images/music.png" /></h2>
        <div class="content">
          <p>
            Hi there! Illucid allows you to create beautiful noises to mask the
            noises you don’t want to hear, whether it's to help you sleep or
            help you concentrate while working, You can create and save as many
            mixes as you want. To begin just click on the icons and adjust each
            volume to your desire and that's it! you can now save that mix and
            listen to it later or just listen to it on the spot! To begin please
            enter your name below ! Enjoy ☺
          </p>
          <div class="form-container">
            <form class="signUp" @submit="savePersonalInfo">
              <input type="text" placeholder="Enter your name" v-model="name" />
              <input type="submit" />
            </form>
            <p class="error">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "PopupSignup",
  data() {
    return {
      name: "",
      id: "",
      error: "",
      success: false,
    };
  },
  methods: {
    savePersonalInfo(e) {
      e.preventDefault();
      if (this.name.length > 1) {
        const id = uuidv4();
        localStorage.setItem("illucidName", this.name);
        localStorage.setItem("illucidId", id);
        this.error = "";
        this.success = true;
        setTimeout(() => {
          this.$emit("nameUpdate", e, this.name, id, true);
        }, 700);
        document.body.style.overflow='auto'

      } else {
        this.error = "* Please enter your name to begin!";
        this.success = false;
      }
    },
  },
};
</script>
<style >
.box {
  width: 40%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.2);
  padding: 35px;
  border: 2px solid #fff;
  border-radius: 20px/50px;
  background-clip: padding-box;
  text-align: center;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  /* visibility: hidden;
  opacity: 0; */
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.overlay:target {
  visibility: visible;
  opacity: 1;
}
.overlay.hide {
  display: none;
}
.popup {
  margin: 70px auto;
  padding: 20px;
  background: #293248;
  border-radius: 5px;

  width: 100%;
  max-width: 600px;
  position: relative;
  transition: all 5s ease-in-out;
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.popup h2 {
  margin-top: 0;
  color: #87b2d9;
  font-family: Tahoma, Arial, sans-serif;
  margin: 0 auto;
  width: fit-content;
  font-family: "Coiny";
  font-size: 35px;
  display: flex;
  align-items: center;
  gap: 15px;
}
.popup h2 img {
  width: 30px;
  height: 30px;
  filter: invert(75%) sepia(17%) saturate(939%) hue-rotate(176deg)
    brightness(90%) contrast(87%);
  margin-bottom: 10px;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 35px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.popup .content {
  max-height: 30%;
  color: white;
  text-align: center;
  font-family: "Coiny";
  font-size: 20px;
}
p {
  margin-top: 0;
}
.error {
  color: #87b2d9;
}

@media screen and (max-width: 700px) {
  .box {
    width: 70%;
  }
  .popup {
    width: 85%;
  }
}
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-bottom: 22px;
  margin-top: 1em;
}
input[type="submit"] {
  /* position: absolute; */
  background: #87b2d9;
  color: #196aad;
  border: none;
  padding: 10px;
  border-radius: 45px;
  /* right: 21em; */
  min-height: 47px;
  top: 0;
  min-width: 80px;
  font-weight: 800;
  right: 5em;
  top: -5px;
  position: relative;
  cursor: pointer;
  height: 50px;
  max-height: 50px;
  font-size: 14px;

}
input[type="text"][placeholder] {
  color: #656d79;
  font-size: 15px;
  font-weight: 500;
  outline: none;
}
form {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  right: -30px;
}

input[type="text"] {
  background-color: #f7f8ff;
  -webkit-border-radius: 45px;
  -moz-border-radius: 45px;
  border-radius: 45px;
  font-size: 15px;
  height: 50px;
  border: none;
  padding-left: 15px;
  min-width: 50%;
  margin-bottom: 10px;
  border: solid 1px #186aad;
  max-height: 50px;

}
.guest{
  font-size: 15px;
}
#popup1 input[type=submit]{
  max-width: initial!important;
  right: 4.5em!important;
  font-size: 14px;
  min-height: 50px;
}
@media screen and (max-width: 560px) {
  .popup h2 img {
    display: none;
  }
  .popup h2 {
    text-align: center;
    /* font-size: 25px; */

  }
  /* .popup .content {
    font-size: 20px;
  } */
}
</style>
