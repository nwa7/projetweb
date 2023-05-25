<template>
  <div class="city-card">
    <img class="picture" :src="pictureUrl" />
    <div>
      <h2 class="name">{{ name }}</h2>
      <p class="pop">{{ population }}</p>
      <p class="cp">{{ cp }}</p>
      <p class="dept">{{ department }}</p>
      <p class="region">{{ region }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cityCard',
  props: {
    name: { type: String, required: true },
    population: { type: Number, default: 0 }, // Corrected prop name to 'population'
    cp: { type: String, default: 'pas d info' },
    pictureUrl: {
      type: String,
      default:
        'https://citygame.com/wp-content/blogs.dir/1/files/sites/37/2022/06/Citygame.com-Secrets-of-Amsterdam-1280x720.png'
    },
    department: { type: String, required: true },
    region: { type: String, required: true }
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
