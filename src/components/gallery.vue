<template>
    <div class="cities-gallery">
        <CityCard
          v-for="city in citiesData"
            :key="city.codePostal"
            :name="city.nom"
            :breed="city.pop"
            :pictureUrl="citiesData[0].picture"/>
    </div>
</template>
  
<script>
import { loadCity } from '@/services/franceAPI'
import { cityCard } from './cityCard.vue'

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
          this.citiesData = await loadCity()
      }
    }
  }
  </script>
  
  <style></style>
  