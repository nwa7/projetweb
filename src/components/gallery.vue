<template>
  <div class="cities-gallery">
    <div class="gallery-options">
      <input type="text" v-model="search" placeholder="Rechercher une ville">
      <button v-if="search" @click="cleanSearch">X</button>
      <label for="city-sort"> Trier par :</label>
      <select v-model="citiesSortType" id="city-sort">
        <option value="AZName">Noms de A à Z</option>
        <option value="ZAName">Noms de Z à A</option>
      </select>
    </div>
    <div class="gallery">
      <cityCard
        v-for="city in displayedCities"
        :key="city.codePostal"
        :name="city.nom"
        :breed="city.pop"
        :pictureUrl="city.picture"
      />
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script>
import cityCard from './card.vue'
import { loadCity } from '@/services/franceAPI'

const RESULTS_PER_PAGE = 20; // Number of search results per page

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
      this.currentPage = 1; // Reset the page to 1 whenever a new search is performed
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
      // Return the filtered cities based on the search input
      // You can modify the logic as per your requirement
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

<style></style>
