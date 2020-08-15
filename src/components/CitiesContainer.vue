<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-12 scrolling-wrapper">
      <div v-for="(beach, index) in beaches" :key="index" class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="beach.url" alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <span class="icon is-small" v-bind:class="{ liked: beach.isClicked }">
                <font-awesome-icon icon="heart" @click="upvote(beach.id)" />
                <strong class="has-text-info">{{ beach.votes }}</strong>
              </span>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ beach.name }}</p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div class="content">
            {{ beach.description }}
            <a>@bulmaio</a>.
            <a href="#">#css</a>
            <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { beaches } from "../seed";
export default {
  name: "CitiesContainer",
  data () {
    return{
      beaches,
    }
  },
  methods:
  {
    upvote(beachId) {
      let clickedBeach = this.beaches.find((beach) => beach.id == beachId);
      clickedBeach.votes++;
      clickedBeach.isClicked =  true;
    }
  }, 
};
</script>
<style scoped>
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  margin-right: 5%;
}
.card {
  display: inline-block;
  margin-left: 2%;
  margin-right: 2%;
  width: calc(500px + 6 * ((100vw - 320px) / 680));
}
.content {
  white-space: break-spaces;
  width: 50vh;
}
.tile.is-ancestor:last-child {
  margin-right: 5%;
}
.icon {
  cursor: pointer;
  color:#c9c9c9;
}
.icon:hover {
  color: red;
}
.icon.liked{
  color:red;
}
.has-text-info{
  color: #00d1b2 !important;
}
</style>