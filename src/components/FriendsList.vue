<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Friends
              </h1>
      <h2 class="subtitle">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Find a friend" />
            </p>
            <p class="control">
              <button class="button">Search</button>
            </p>
          </div>
      </h2>

      <div class="level-left">
        <div class="level-item image is-128x128">
          <img class="is-rounded"  src="../assets/IMG_20190920_103437.jpg" />
        </div>
        <div class="level-item">
          <strong>Ime i prezime</strong>
        </div>
        <div class="level-item">@username</div>
      </div>
      <div class="level-left">
        <div class="level-item image is-128x128">
          <img class="is-rounded" src="../assets/IMG_20190920_103437.jpg" />
        </div>
        <div class="level-item">
          <strong>Ime i prezime</strong>
        </div>
        <div class="level-item">@username</div>
      </div>
      <div class="level-left">
        <div class="level-item image is-128x128">
          <img class="is-rounded"  src="../assets/IMG_20190920_103437.jpg" />
        </div>
        <div class="level-item">
          <strong>Ime i prezime</strong>
        </div>
        <div class="level-item">@username</div>
      </div>
    </div>
  </section>
</template>
<script>
export default {};
</script>
<style scoped>
.container {
  width: 25vw;
}
.section img {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.level-left {
  margin-top: 2rem;
}
.subtitle{
    display:flex;
    justify-content: center;
}
</style>
