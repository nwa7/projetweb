<template>
  <div>
    <label for="search">Sélectionner une ville française :</label>
    <input type="text" id="search" v-model="query" @input="searchCities" />
    <ul v-if="searchResults.length">
      <li v-for="result in searchResults" :key="result.code">
        {{ result.nom }} ({{ getDepartmentName(result.codeDepartement) }} - {{ getRegionName(result.codeRegion) }})
      </li>
    </ul>
    <p v-else> Vide </p>
  </div>
</template>

<script>
import {loadDepartmentData, loadRegionData } from './services/franceAPI.js';

export default {
  data() {
    return {
      query: "",
      searchResults: [],
      departments: [],
      regions: [],
    };
  },
  methods: {
    async searchCities() {
      if (this.query === "") {
        this.searchResults = [];
        return;
      }

      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${this.query}&fields=nom,codeDepartement,codeRegion`
      );
      const data = await response.json();
      this.searchResults = data;
    },
    getDepartmentName(code) {
      return this.departments.find((dept) => dept.code === code)?.nom || "Unknown";
    },
    getRegionName(code) {
      return this.regions.find((region) => region.code === code)?.nom || "Unknown";
    },
  },
async mounted() {
  try {
    this.departments = await loadDepartmentData();
    this.regions = await loadRegionData();
  } catch (error) {
    console.error(error);
  }
}


};
</script>

/***     async loadDepartments() {
      const response = await fetch("https://geo.api.gouv.fr/departements");
      const data = await response.json();
      this.departments = data;
    },
    async loadRegions() {
      const response = await fetch("https://geo.api.gouv.fr/regions");
      const data = await response.json();
      this.regions = data;
    }, ***/