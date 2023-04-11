<template>

    <div class="gallery-options">

        <!--<div class="filter">
            <label for="dog-sort"> Trier par : </label>
            <select v-model="dogsSortType" id="dog-sort">
                <option value="AZName">Noms de A à Z</option>
                <option value="ZAName">Noms de Z à A</option>
                <option value="AZBreed">Espèces de A à Z</option>
                <option value="ZABreed">Espèces de Z à A</option>
            </select>
        </div>-->

        <div class="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" v-model="search" placeholder="Rechercher une ville ">
            <span v-if="search" @click="cleanSearch">reset</span>
            <i v-if="search && searchingList.length >= 1 ">
            {{searchingList.length}} résultat<i v-if="searchingList.length >= 2">s </i>
            </i>
        </div>

       

        <ul class="display">
            <li>
                <i @click="gridView = true" class="fa-solid fa-grip fa-xl"></i>
            </li>
            <li>
                <i @click="gridView = false" class="fa-solid fa-list fa-xl"></i>
            </li>
        </ul>
    </div>


    <div class="city-gallery">

        <cityCard 
            v-for="city in searchingList" 
            :key="city.cityCode"
            :name="city.name"
            :dpCode="city.dpCode"
            :rCode="city.rCode"         
            :pop="city.pop"
            :surface="city.surface"
            :location="city.location"
        />
             
    </div>

    <div v-if="searchingList.length == []">
        <h2>Oh no..</h2>
        <p>Pas de ville correspondante dans la BDD</p>
    </div>
  
  </template>
  
  <script>
  
    import { loadCity } from '@/services/franceAPI';
  
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
        searchingList(){
            return this.citiesData.filter((citiesData) => {
                return citiesData.title.toLowerCase().includes(this.search.toLowerCase());
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
        
        cleanSearch:function(){
            this.search = '' 
		}
    },
  
  };
 
  </script>
  
  <style scoped>
  
   
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