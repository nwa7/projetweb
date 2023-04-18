<template>
    <div class="cities-gallery">
      <cityCard
        v-for="city in citiesData"
        :key="city.codePostal"
        :name="city.nom"
        :breed="city.pop"
        :pictureUrl="city.picture"
      />
    </div>
</template>
  
<script>
import cityCard from './card.vue'
import { loadCity } from '@/services/franceAPI'


  export default {
  name: 'citiesGallery',
  components : {
    cityCard,
  },
  data() {
      return {
      citiesData: []
      }
  },

  created: function(){
        this.retrieveCitiesData()
  },

  methods: {
      async retrieveCitiesData() {
      console.log('Retrieving cities data...');
      this.citiesData = await loadCity();
      console.log('Cities data:', this.citiesData);
  }
    }
  }
  </script>
  
  <style></style>
  