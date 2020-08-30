<template>
  <div class="modal" :class="{'is-active': modalActivity}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="notification">
        <button class="delete" @click="exitModal()"></button>
  <!--      <Comment v-for="(comment,index) in beachComments" :key="index" :comment="comment" /> !-->
      </div>
    </div>
  </div>
</template>
<script>
//import Comment from "../components/Comment";
import { beaches } from "../seed.js";
export default {
  data() {
    return { beaches };
  },
  components: {
    //Comment,
  },
  props: {
    isModalActive: Boolean,
    beachId: Number,
  },
  methods: {
    exitModal() {
      this.isModalActive = false;
    },
  },
  computed: {
    modalActivity: function () {
      return this.isModalActive;
    },
    beachComments: function () {
        let beachComments = this.beaches.filter((beach)=> beach.id === this.beachId);
      return beachComments[0].comments
    },
  },
};
</script>