<template>
  <div class="section">
    <div class="title">Nova plaža</div>
    <div class="container">
      <div class="field">
        <label class="label">Naziv plaže</label>
        <div class="control">
          <input class="input" ref="beachName" type="text" placeholder="Text input" />
        </div>
        <p class="help is-success">This username is available</p>
      </div>
      <div class="field">
        <label class="label">Slika plaže</label>
        <div class="control">
          <input type="file" id="file" ref="file" @change="handleFileUpload()" />
        </div>
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field">
        <label class="label">Opis plaže</label>
        <div class="control">
          <textarea class="textarea" ref="beachDescription" placeholder="Textarea"></textarea>
        </div>
      </div>
      <div class="options">
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" ref="beachBar" />
              Beach Bar
              <font-awesome-icon icon="coffee" />
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" ref="beachShade" />
              Hlad
              <font-awesome-icon icon="umbrella-beach" />
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" ref="beachKids" />
              Djeca
              <font-awesome-icon icon="child" />
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" ref="beachPets" />
              Životinje
              <font-awesome-icon icon="dog" />
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" ref="beachParking" />
              Parking
              <font-awesome-icon icon="parking" />
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" ref="beachFood" />
              Hrana
              <font-awesome-icon icon="utensils" />
            </label>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="submitNewBeachForm()">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" @click="exitNewBeachForm()">Cancel</button>
        </div>
      </div>
      <div class="modal" :class="{'is-active': isModalActive}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="notification is-danger">
            <button class="delete" @click="exitModal()"></button>
            Greška! Neki podatak je krivo unesen. Pokušajte ponovno.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { beaches } from "../seed.js";
import axios from "axios";
import auth from "../auth/index";
export default {
  data() {
    return {
      beaches,
      isModalActive: false,
      file: "",
      authToken: "",
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitNewBeachForm() {
      let formData = new FormData();
      console.log(this.$refs.beachBar.checked);
      formData.append("name", this.$refs.beachName.value);
      formData.append("beachImage", this.file),
        formData.append("description", this.$refs.beachDescription.value),
        formData.append("author", auth.user.userObject._id);
      let options ={
        bar: this.$refs.beachBar.checked,
        shade: this.$refs.beachShade.checked,
        kids: this.$refs.beachKids.checked,
        pets: this.$refs.beachPets.checked,
        parking: this.$refs.beachParking.checked,
        food: this.$refs.beachFood.checked,
      };
      formData.append("options", options);
      console.log(options)
      axios
        .post("http://localhost:3000/beaches", formData, {
          headers: {
            Authorization: this.authToken,
          },
        })
        .then(() => {
          console.log("Successfully added new beach");
          this.$router.push({ name: "Beaches" });
        })
        .catch((error) => {
          console.log(error)
          this.isModalActive = true;
        });
    },
    exitModal() {
      this.isModalActive = false;
    },
    exitNewBeachForm() {
      this.$router.push({ name: "Beaches" });
    },
  },
  mounted() {
    this.authToken = auth.getAuthHeader();
  },
};
</script>
<style scoped>
.options {
  display: flex;
  justify-content: space-between;
}
</style>