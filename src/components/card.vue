<template>
  <div class="city-card">
    <img class="picture" :src="pictureUrl" />
    <div>
      <h2 class="name">{{ name }}</h2>
      <p class="pop">{{ pop }}</p>
      <p class="cp">{{ cp }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cityCard',
  props: {
    name: { type: String, required: true },
    pop: { type: Number, default: 0 }, 
    cp: {type: String, default: 'llo'},
    pictureUrl: {
      type: String,
      default:
        'https://citygame.com/wp-content/blogs.dir/1/files/sites/37/2022/06/Citygame.com-Secrets-of-Amsterdam-1280x720.png'
    }
  }
}
</script>

<style scoped>
.city-card {
  /* Your styling here */
}

.picture {
  height: 100px;
  width: 150px;
}

h2 {
  font-size: 20px;
}
</style>
