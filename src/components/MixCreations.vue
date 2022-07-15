<template>
  <div>
    <div v-for="mix in allMixes" class="mix" :key="mix._id">
      <img
        @click="deleteAudio(mix._id)"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAo0lEQVRIieWTTQqDMBCFP6xb7yg9Qo/SHik3qUgXFlxWqGI3WYQ4Jc5I0NIHswnM+5lH4F9wAXpg9tP7NzVcQGIdFxIWFhcJzBk4D4Yb9vtfYzKpg2aDucWuJHDPLbAlwcJc9gQSTsAbfcEjUMZkUoIJeKi9Q+tFkgJg60Hc+SZg6UHc2S3BIQVUJ7J0oDJVAQPr/8DL76hwBp4ryDug1pL/Dj5MW2BhteGWuAAAAABJRU5ErkJggg=="
      />
      <div @click="$emit('playAudio', $event, mix)">{{ mix.mix_name }}</div>
    </div>
    <div v-if="allMixes.length < 1">No mixes</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MixCreations",
  methods: {
    ...mapActions(["fetchMixes", "deleteMix"]),
    deleteAudio(id) {
      this.deleteMix(id);
    },
  },
  props: {
    userId: {},
  },
  computed: mapGetters(["allMixes"]),
  created() {
    this.fetchMixes(this.userId);
  },
};
</script>
<style >
.mix {
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  line-height: 1;
  white-space: nowrap;

}
.mix:first-child {
  margin-top: 10px;
}
.mix img {
  width: 12px;
  filter: invert(29%) sepia(100%) saturate(1041%) hue-rotate(183deg)
    brightness(89%) contrast(86%);
  margin-bottom: 3px;
}
</style>
