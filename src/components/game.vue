<template>
    <div>
      <h2>Régionnade</h2>
      <p>Trouve la région de la ville suivante :</p>
      <p>{{ currentCity }}</p>
      <select v-model="userGuess">
        <option value="">Sélectionne une région</option>
        <option v-for="region in regions" :value="region" :key="region">{{ region }}</option>
      </select>
      <button @click="checkGuess">Ok</button>
      <button @click="pickRandomCity">Ville suivante</button>
      <p v-if="isCorrect !== null">
        Ta réponse est <strong>{{ isCorrect ? 'correcte' : 'incorrecte' }}</strong>.
        <span v-if="!isCorrect">La bonne réponse était : <strong>{{ correctRegion }}</strong>.</span>
      </p>
    </div>
  </template>
  
  <script>
  import { loadCity } from '@/services/franceAPI';
  
  export default {
    name: 'GuessTheRegion',
    data() {
      return {
        cities: [],
        regions: [],
        currentCity: '',
        userGuess: '',
        isCorrect: null,
        correctRegion: ''
      };
    },
    created() {
      this.retrieveCitiesData();
    },
    methods: {
      async retrieveCitiesData() {
        this.cities = await loadCity();
        this.extractRegions();
        this.pickRandomCity();
      },
      extractRegions() {
        this.regions = [...new Set(this.cities.map(city => city.region))];
      },
      pickRandomCity() {
        let randomIndex = Math.floor(Math.random() * this.cities.length);
        while(this.cities[randomIndex].population < 30000){
        randomIndex = Math.floor(Math.random() * this.cities.length);
        }
        this.currentCity = this.cities[randomIndex].nom;
        this.userGuess = '';
        this.isCorrect = null;
        this.correctRegion = this.cities[randomIndex].region;
      },
      checkGuess() {
        const currentCity = this.currentCity;
        const correctRegion = this.cities.find(city => city.nom === currentCity)?.region;
        if (this.userGuess === correctRegion) {
          this.isCorrect = true;
        } else {
          this.isCorrect = false;
        }
      }
    }
  };
  </script>
  