<template>
  <div class="city-card">
    <div>
      <img v-bind:src="getImageUrl(codeRegion)" class="picture" alt="region area">
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
    population: {type: Number, default : 0 },
    cp: { type: String, default: 'pas d info' },
    department: { type: String, required: true },
    region: { type: String, required: true },
    codeRegion: { type: String, default: '94' }
  },
  methods: {
    getImageUrl(regionCode) {
    try {
      if (!regionCode) {
        return require('@/assets/drom.png');
      }
      return require(`@/assets/${regionCode}.png`);
    } catch (error) {
      console.error(error);
      return require('@/assets/drom.png');
    }
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
  width: 100px;
}

h2 {
  font-size: 20px;
}
</style>
