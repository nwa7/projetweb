<template>
  <div class="gallery">
    <div class="gallery-options">
      <input type="text" v-model="search" placeholder="Rechercher une ville">
      <button v-if="search" @click="cleanSearch">x</button>
      <label for="city-sort"> Trier par :</label>
      <select v-model="citiesSortType" id="city-sort">
        <option value="AZName">Noms de A à Z</option>
        <option value="ZAName">Noms de Z à A</option>
      </select>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
    <div class="cities-gallery">
      
      <cityCard
        v-for="city in displayedCities"
        :key="city.code"
        :name="city.nom"
        :population="city.population"
        :cp="city.codePostal"
        :codeRegion="city.codeRegion"
        :department="city.departement"
        :region="city.region"
      />
    </div>
  </div>
</template>

<script>
import cityCard from './card.vue'
import { loadCity } from '@/services/franceAPI'

const RESULTS_PER_PAGE = 20; // Images par page

export default {
  name: 'citiesGallery',
  components: {
    cityCard,
  },
  data() {
    return {
      citiesData: [],
      search: "",
      citiesSortType: "AZName",
      currentPage: 1,
    }
  },
  created() {
    this.retrieveCitiesData()
  },
  watch: {
    search() {
      this.currentPage = 1; // Remettre à la première page à chaque recherche
    },
  },
  methods: {
    async retrieveCitiesData() {
      console.log('Retrieving cities data...');
      this.citiesData = await loadCity();
      console.log('Cities data:', this.citiesData);
    },
    cleanSearch() {
      this.search = ""
    },
    nextPage() {
      this.currentPage++;
    },
    prevPage() {
      this.currentPage--;
    },
    getImageUrl(regionCode) {
    if (!regionCode) {
      return require('@/assets/94.png');
    }
    return require(`@/assets/${regionCode}.png`);
  },


  },
  computed: {
    sortedCitiesData() {
      let data = [...this.filteredCities];
      if (this.citiesSortType === "AZName") {
        data.sort((a, b) => a.nom.localeCompare(b.nom));
      } else if (this.citiesSortType === "ZAName") {
        data.sort((a, b) => b.nom.localeCompare(a.nom));
      }
      return data;
    },
    filteredCities() {
      return this.citiesData.filter(city => city.nom.toLowerCase().includes(this.search.toLowerCase()));
    },
    totalPages() {
      return Math.ceil(this.filteredCities.length / RESULTS_PER_PAGE);
    },
    displayedCities() {
      const startIndex = (this.currentPage - 1) * RESULTS_PER_PAGE;
      const endIndex = startIndex + RESULTS_PER_PAGE;
      return this.sortedCitiesData.slice(startIndex, endIndex);
    },
  },
}
</script>

<style>

.cities-gallery{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.gallery-options{

}
.cities-sort{

}

</style>
