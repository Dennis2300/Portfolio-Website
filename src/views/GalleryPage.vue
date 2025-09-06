<template>
  <section class="landing-section">
    <div class="welcome-container">
      <h1 class="welcome-title">Welcome to the Gallery</h1>
      <p class="welcome-message">
        Hey there! Welcome to my photo gallery - a casual collection of shots
        I've taken while exploring with my camera. I'm just someone who loves
        capturing interesting moments, beautiful light, and scenes that catch my
        eye. No fancy professional gear or training here - just the simple joy
        of photography as a hobby. These are my personal favorites that I wanted
        to share. Hope you find something that makes you smile or pause for a
        moment!
      </p>
    </div>
  </section>
  <section class="gallery-section">
    <div class="image-gallery">
      <div class="image-card" v-for="country in countries" :key="country.id">
        <img class="image" :src="images[country.name]" alt="" />
        <h3 class="image-title">{{ country.name }}</h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabaseClient";

const countries = ref([]);

const images = {
  Denmark: "src/assets/Gallery-pics/DK.webp",
  Germany: "src/assets/Gallery-pics/DE.webp",
  Greece: "src/assets/Gallery-pics/GR.webp",
  "The Netherlands": "src/assets/Gallery-pics/NL.webp",
  Sweden: "src/assets/Gallery-pics/SE.webp",
  China: "src/assets/Gallery-pics/CN.webp",
  Hungary: "src/assets/Gallery-pics/HU.webp",
};

async function fetchCountries() {
  try {
    const { data, error } = await supabase.from("countries").select("*");
    if (error) throw error;
    countries.value = data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

onMounted(() => {
  fetchCountries();
});
</script>

<style scoped>
@import url(https://fonts.bunny.net/css?family=alfa-slab-one:400|angkor:400|anton:400|montserrat:500);
@import url("https://fonts.googleapis.com/css2?family=Bangers&family=Sriracha&display=swap");

.landing-section {
  height: 33vh;
  margin: 3rem;
  background-color: var(--tertiary);
  border-radius: 25px;
}

.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  height: 33vh;
}

.welcome-title {
  font-family: "Alfa Slab One", cursive;
  font-size: 4em;
  text-transform: uppercase;
}

.welcome-message {
  font-family: "Montserrat", sans-serif;
  font-size: 1.4em;
  line-height: 1.5;
  padding-left: 100px;
  padding-right: 100px;
}

.gallery-section {
  min-height: 100vh;
  margin-left: 3rem;
  margin-right: 3rem;
  padding: 3rem;
  background-color: var(--secondary);
  border-radius: 25px;
}

.image-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  justify-items: center;
}

.image-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 2rem;
  cursor: pointer;
  box-shadow: 15px 15px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;
}

.image-card:hover {
  transform: rotate(3deg) scale(1.05);
  transition: transform 0.3s ease-out;
}

.image {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border: 2px solid black;
}

.image-title {
  font-family: "Sriracha", cursive;
  font-size: 3em;
  text-transform: uppercase;
  margin-top: 1rem;
  color: black;
}
</style>
