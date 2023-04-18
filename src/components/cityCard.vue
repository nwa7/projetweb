<template>

<div class="city-card">
  <img :src="require('@/assets/city.jpg')" :alt="name">
  <h3>{{ name }}</h3>
</div>

</template>

<script>
export default {
    name : 'cityCard',
    props : {
        name : String,
        cityCode: Number,
        dpCode : Number,
        rCode : Number,
        pop : Number,
        surface : Number,
        location : Array,
    },
    data(){
        return {
            citiesData:[],
            search:'',
        }
    }
}
</script>

<style>
    .city-card{    
        width:20rem;
        text-align: center;
        box-shadow: 0.1rem .2rem .4rem #ff85859d;
        background:#fff;
        margin:4rem 2rem;
        background-color: rgb(15, 3, 44);
        color: rgb(162, 245, 245);
        margin :1.3rem;
        transition: all 0.2s ease;
    }
    .city-card:hover{    
        scale: 1.05;
    }
    h3{
        margin: 0.5rem;
    }
    img{
        width: 100%;
    }
</style>