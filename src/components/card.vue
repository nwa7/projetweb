<template>
  <div class="city-card">
    <div>
      <img v-bind:src="getImageUrl(codeRegion)" class="picture" alt="region area">
      <div class="city-info">
      <h2 class="name">{{ name }}</h2>

      <div class="city-details">
      <p class="pop">Nombre d'habitants : {{ population }}</p>
      <p class="cp"> Code postal : {{ cp }}</p>
      <p class="loc">{{ department }}, {{ region }}</p>
    </div>
    </div>
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
    department: { type: String, default: 'pas d info' },
    region: { type: String, default: 'pas d info' },
    codeRegion: { type: String, default: 'drom' }
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
      return require('@/assets/drom.png'); // "image par défaut"
    }
  }
  }
}
</script>


<style scoped>
.city-card {
}

.picture {
  height: 200px;
  width: 200px;
}

.city-info {
  max-width: 200px;
}

.city-details{
  width: 100%;
  font-size: 0.7rem;
  color: white;
  height: 100%;
  margin-bottom:15px;
  align-items: center;
  justify-content: center;
}


.name {
  background-color:white;
  border: red 0.2rem solid;
  color: black;
  border-radius: 5%;
}

h2 {
  font-size: 20px;
}
</style>
