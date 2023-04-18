<template>
    <div class="cities-gallery">
        <CityCard
            :name="citiesData[0].nom"
            :breed="citiesData[0].codePostal"
            :pictureUrl="citiesData[0].picture"/>
    </div>
</template>
  
<script>
import { loadCity } from '@/services/franceAPI'
import { cityCard } from '@/components/cityCard.vue'
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
  