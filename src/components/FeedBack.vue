<template>
    <span>
    <v-dialog width="500" v-model="isActive" transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="fixed-btn" @click="isActive = true">
          <v-icon>mdi-thumbs-up-down-outline</v-icon>
          <span style="margin-left:6px">Feedback</span>
        </v-btn>
      </template>
  
      <template v-slot:default>
        <v-card title="Dialog" style="padding-bottom: 15px;">
          <v-card-text class="dialog-content">
            <h2 style="padding-bottom:10px">How you're enjoying the app?</h2>
            <vue-feedback-reaction v-model="feedback" :labels="['', '', '', '', '']" />
            <h2 style="padding-bottom:10px">Tell me your thoughts & How this app can be improved?</h2>
            <v-textarea style="width:100%" variant="outlined" class="text-a" v-model="text" name="feedback-text"></v-textarea>
            <input type="hidden" name="feedback" :value="feedback" />
            <input type="hidden" name="user" :value="name" />

          </v-card-text>
  
          <v-card-actions class="btn-container">
            <v-btn @click="close">close</v-btn>
            <v-btn @click.prevent="submitForm" v-if="feedback.length > 0 || text.length > 0">Submit</v-btn>
          </v-card-actions>
          <v-spacer></v-spacer>
        </v-card>
      </template>
    </v-dialog>
    <span v-bind:class="{ show: show }" id="toast">{{ message }}</span>
</span>

  </template>
  <script>
  import { VueFeedbackReaction } from 'vue-feedback-reaction';
  
  export default {
    name: "FeedBack",
    components: {
      VueFeedbackReaction
    },
    data() {
      return {
        isActive: false,
        feedback: '',
        text: '',
        message: "",
        show: false,
      };
    },
    props: {
    name: {},
  },
    methods: {
      async submitForm() {
        const formSpreeEndpoint = 'https://formspree.io/f/xyyryapp'; // Replace with your Formspree endpoint
  
        const formData = new FormData();
        formData.append('feedback', this.feedback);
        formData.append('text', this.text);
        formData.append('name', this.name);

  
        try {
          await fetch(formSpreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json',
            },
          });
  
          this.show = true;
        this.message = "Thanks for your Feedback! it has been succesfully submitted";
        this.feedback = ''
          this.text = ''
        setTimeout(() => {
          this.message = "";
          this.show = false;
        
        }, 3200);
        } catch (error) {
            this.show = true;
            this.message = "There was an Error submitting your feedback.";
            this.feedback = ''
          this.text = ''
        setTimeout(() => {
          this.message = "";
          this.show = false;
          
        }, 3200);
        }
  
        // Close the dialog
        this.isActive = false;
      },
      close(){
        this.feedback = ''
        this.text = ''
        this.isActive = false
      }
    },
  };
  </script>
  
<style>
.fixed-btn {
  position: fixed !important;
  right: -55px; /* Adjust as needed */
  top: 50%;
  transform: translateY(-50%);
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transform: rotate(270deg);
  color: #196aad !important;
  background: #bbd6db !important;
}
.vue-reaction img {
  filter: none !important;
}
.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 50px !important;
}
textarea {
  border: solid 2px grey !important;
  border-radius: 10px !important;
  padding: 7px !important;
}
.v-text-field > .v-input__control > .v-input__slot:after,
.v-text-field > .v-input__control > .v-input__slot:before {
  content: none !important;
}
.btn-container {
  display: flex;
  justify-content: space-between;
}
.btn-container button {
  color: #196aad !important;
  background: #bbd6db !important;
}
.vue-feedback-reaction {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 15px;
}
.vue-reaction img {
  height: 70px !important;
}
/* 391 */
@media (max-width: 650px) {
  .fixed-btn {
    width: 100% !important;
    margin: auto !important;
    bottom: 0px !important;
    transform: rotate(0deg);
    position: initial !important;
    height: 60px!important;
    font-size: 16px!important;
  }
}
@media (max-width: 391px) {
  .reaction:nth-child(5) {
    margin-left: 10px !important;
  }
  .reaction:nth-child(4) {
    margin-right: 10px !important;
  }
}
</style>
