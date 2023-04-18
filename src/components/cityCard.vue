<template>
    <div class="city-card">
    <img class="picture" v-bind:src="pictureUrl"/>
        <div>
            <h2 class="name">{{name}}</h2>
            <p class="breed">{{breed}}</p>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'cityCard',
    props: {
      name: { type: String, required: true },
      breed: String,
      pictureUrl: {
        type: String,
        default:
          'https://citygame.com/wp-content/blogs.dir/1/files/sites/37/2022/06/Citygame.com-Secrets-of-Amsterdam-1280x720.png'
      }
    }
  }
  </script>
  
  <style scoped>
  .city-card {
    display: flex;
  }
  
  .picture {
    height: 100px;
    width: 150px;
  }
  
  h2 {
    font-size: 20px;
  }
  </style>
  