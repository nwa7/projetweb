<template>

        <p>Recherche d'une ville :</p>

        <div class="searchBar">
          <form action="" @submit.prevent = "searchingCities">
            <input type="search-bar" v-model="search" class="search" placeholder="Choisir une ville">
            <input type="submit" name="submit" class="submit" alt="ok">
          </form>
        </div>

    <div class="city-gallery">

        <cityCard 
            v-for="city in searchingCities" 
            :key="city.cityCode"
            :name="city.name"
            :dpCode="city.dpCode"
            :rCode="city.rCode"         
            :pop="city.pop"
            :surface="city.surface"
            :location="city.location"
        />
             
    </div>

    <div v-if="searchingCities.length === 0">
        <h2>Oh no..</h2>
        <p>Pas de ville correspondante dans la BDD</p>
    </div>
  
  </template>
  
  <script>
  
    import { loadCity} from '@/services/franceAPI';
  
    import cityCard from './cityCard.vue';
  
    export default {
    name : 'getGallery',
  
    components : {
        cityCard,
    },
  
    data() {
        return {
            citiesData : [],
            search:'',
            gridView: true,
        }
    },

    computed: {
        searchingCities(){
            return this.citiesData.filter((citiesData) => {
                return citiesData.name.toLowerCase().includes(this.search.toLowerCase());
            })
        },
    
    },

    created: function(){
            this.retrieveCitiesData()
    },

    methods: {
      
        async retrieveCitiesData(){
            this.citiesData = await loadCity()
            console.log(this.citiesData)
        },
    },
    
  
  };

 
  </script>
  
  <style>
  
   
   .cities-gallery{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .gallery-options{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        background-color: rgb(1, 1, 10);
    }
    .search-bar>.fa-solid{
        color: #ff85859d;
        position: relative;
        left: 3.5rem;
    }
    .search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 2rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.search-bar input {
  border: none;
  outline: none;
  margin-left: 0.5rem;
  font-size: 1rem;
  flex: 1;
}

.search-bar span {
  cursor: pointer;
  margin-left: 0.5rem;
}
    span{
        position: relative;
        right: 1.3rem;
        color:#f45e5e9d;
        cursor: pointer;
    }
    input{
        height: 2rem;
        width: 15rem;
        padding-left: 1.6rem;
        border-radius: 5px;
        border: 2px solid #ff85859d;
        margin: 2rem;
    }
    
    input:focus {
        outline: none;
        border: 2px solid #ff85859d;
    }
    .display {
        display: flex;
        font-size: 24px;
    }
    .display li {
        list-style: none;
        margin: 1rem;
    }
    .display i {
    transition: 0.25s;
    cursor: pointer;
    }
    .display i:hover {
    color: #fd4f4f9d;
    }
    
  </style>