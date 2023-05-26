<template>
  <div class="gallery">
    <div class="gallery-options">
      <input type="text" v-model="search" placeholder="Rechercher une ville">
      <button class="erase-button" v-show="search" @click="cleanSearch">x</button>
      <label for="city-sort">Trier par :</label>
      <select v-model="citiesSortType" id="city-sort">
        <option v-if="citiesSortType !== 'AZName'" value="AZName">Noms de A à Z</option>
        <option v-if="citiesSortType !== 'ZAName'" value="ZAName">Noms de Z à A</option>
        <option v-if="citiesSortType !== 'croiPop'" value="croiPop">Population croissante</option>
        <option v-if="citiesSortType !== 'decroiPop'" value="decroiPop">Population décroissante</option>
      </select>

      <label for="region-filter">Filtrer par région :</label>
      <select v-model="selectedRegion" id="region-filter">
        <option value="">Toutes les régions</option>
        <option v-for="region in regions" :value="region" :key="region">{{ region }}</option>
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
      selectedRegion: "",
      currentPage: 1,
    }
  },
  created() {
    this.retrieveCitiesData();
    this.recoverFromLocalStorage();
  },
  watch: {
    search() {
    this.currentPage = 1; // on remeet la page à 1 lorsqu'il y a une nouvelle recherche
    this.saveToLocalStorage(); // save recherche
  },
    citiesSortType() {
      this.saveToLocalStorage(); // save ordre
    },
    selectedRegion() { 
      this.saveToLocalStorage(); // save filtre région
      this.currentPage = 1; // on remet la page à 1 quand on change de filtre région
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
      localStorage.setItem("selectedRegion", this.selectedRegion);
    },
    recoverFromLocalStorage() {
      this.search = localStorage.getItem("search") || "";
      this.citiesSortType = localStorage.getItem("citiesSortType") || "AZName";
      this.selectedRegion = localStorage.getItem("selectedRegion") || "";
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
      let filtered = this.citiesData;
      if (this.selectedRegion) {
        filtered = filtered.filter(city => city.region === this.selectedRegion);
      }
      return filtered.filter(city => city.nom.toLowerCase().includes(this.search.toLowerCase()));
    },
    totalPages() {
      return Math.ceil(this.filteredCities.length / RESULTS_PER_PAGE);
    },
    displayedCities() {
      const startIndex = (this.currentPage - 1) * RESULTS_PER_PAGE;
      const endIndex = startIndex + RESULTS_PER_PAGE;
      return this.sortedCitiesData.slice(startIndex, endIndex);
    },
    regions() {
      const regionsSet = new Set(this.citiesData.map(city => city.region));
      return Array.from(regionsSet).sort();
    },
  },
}
</script>

<style>
.cities-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.erase-button {
  margin-left:-18px;
}

.gallery-options {
}

.cities-sort {
}

</style>
