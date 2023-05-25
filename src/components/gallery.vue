<template>
  <div class="gallery">
    <div class="gallery-options">
      <input type="text" v-model="search" placeholder="Rechercher une ville">
      <button v-show="search" @click="cleanSearch">x</button>
      <label for="city-sort"> Trier par :</label>
      <select v-model="citiesSortType" id="city-sort">
      <option v-if="citiesSortType !== 'AZName'" value="AZName">Noms de A à Z</option>
      <option v-if="citiesSortType !== 'ZAName'" value="ZAName">Noms de Z à A</option>
      <option v-if="citiesSortType !== 'croiPop'" value="croiPop">Population croissante</option>
      <option v-if="citiesSortType !== 'decroiPop'" value="decroiPop">Population décroissante</option>
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
      @click="goToCityDetails(city)" 
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
    this.retrieveCitiesData();
    this.loadFromLocalStorage();
  },
  watch: {
    search() {
      this.currentPage = 1; // Remettre à la première page à chaque recherche
      this.saveToLocalStorage();
    },
    citiesSortType() {
      this.saveToLocalStorage();
    },
  },
  methods: {
    async retrieveCitiesData() {
      console.log('Retrieving cities data...');
      this.citiesData = await loadCity();
      console.log('Cities data:', this.citiesData);
    },
    cleanSearch() {
      this.search = "";
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
    saveToLocalStorage() {
      localStorage.setItem("search", this.search);
      localStorage.setItem("citiesSortType", this.citiesSortType);
    },
    loadFromLocalStorage() {
      this.search = localStorage.getItem("search") || "";
      this.citiesSortType = localStorage.getItem("citiesSortType") || "AZName";
    }
  },
  computed: {
    sortedCitiesData() {
      let data = [...this.filteredCities];
      if (this.citiesSortType === "AZName") {
        data.sort((a, b) => a.nom.localeCompare(b.nom));
      } else if (this.citiesSortType === "ZAName") {
        data.sort((a, b) => b.nom.localeCompare(a.nom));
      } else if (this.citiesSortType === "croiPop") {
        data.sort((a, b) => a.population - b.population);
      } else if (this.citiesSortType === "decroiPop") {
        data.sort((a, b) => b.population - a.population);
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