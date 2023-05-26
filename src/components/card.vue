<template>
  <div class="city-card">
    <div>
      <img v-bind:src="getImageUrl(codeRegion)" class="picture" alt="region area">
      <div class="city-info">
      <div class="name">{{ name }}</div>

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
  width:22%;
}

.picture {
  width: 100%;
  max-width: 200px;
  display: flex; 
}

.city-info {
  max-width: 200px;
  display: flex; 
  flex-direction: column; 
  margin-top:5px;
}

.city-details{
  font-size: 0.7rem;
  color: white;
  height: 100%;
  margin-bottom:15px;
}


.name {
  font-family: 'Staatliches', cursive;
  font-size : 20px;
  background-color:white;
  border: red 0.2rem solid;
  color: black;
  letter-spacing: 2px;
}

</style>
