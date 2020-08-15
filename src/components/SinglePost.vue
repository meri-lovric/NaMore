<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="../assets/Screenshot_20200809-211649 (2).jpg" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>John Smith</strong>
          <small>@johnsmith</small>
          <small>31m</small>
          <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small">
              <font-awesome-icon icon="reply" />
            </span>
          </a>
          <a class="level-item">
            <span class="icon is-small">
              <font-awesome-icon icon="retweet" />
            </span>
          </a>
          <a class="level-item">
            <span class="icon is-small">
              <font-awesome-icon icon="heart" />
            </span>
          </a>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <button class="delete"></button>
    </div>
  </article>
</template>

<script>
export default {};
</script>
<style scoped>
</style>