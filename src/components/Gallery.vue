<template>
  <section class="section">
    <div class="container">
      <h1 class="title" >Plaže</h1>
      <h2 class="subtitle">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" placeholder="Pretraži omiljene plaže" />
          </p>
          <p class="control">
            <button class="button">Search</button>
          </p>
        </div>
      </h2>
      <div v-if="requestFinished" class="columns is-multiline">
        <div v-for="(beach, index) in filteredBeaches" :key="index" class="card column is-4">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="getImage()+beach.beachImage" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ beach.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  props: {
    userId: String,
  },
  data() {
    return { beaches: [], requestFinished: false, childMessage: 0 };
  },
  computed: {
    filteredBeaches: function () {
      return this.beaches.beaches.filter((beach) => beach.isClicked);
    },
  },
  methods: {
    getImage() {
      return "http://localhost:3000/";
    },
    emitToParent(){
      this.childMessage = this.filteredBeaches.length;
      this.$emit('childToParent', this.childMessage)
    }
  },
  mounted() {
    var self = this;
    axios
      .get("http://localhost:3000/beaches/")
      .then((response) => {
        self.beaches = JSON.parse(JSON.stringify(response.data));
        console.log(self.beaches);
        this.requestFinished = true;
         this.emitToParent();
      })
      .catch((error) => {
        console.log(error);
      });
    
  },
  
};
</script>
<style scoped>
.subtitle {
  display: flex;
  justify-content: center;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>