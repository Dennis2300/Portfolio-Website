<template>
  <div class="gallery-container">
    <div class="gallery-section mt-10" v-for="country in countries" :key="country.id">
      <!------>
      <div class="gallery-title">
        <h1>{{ country.name }}</h1>
      </div>
      <!------>
      <div class="gallery-image">
        <img loading="lazy" :src="images[country.name]" alt="" />
      </div>
    </div>
  </div>
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
  Hungary: "src/assets/Gallery-pics/HU.webp"
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
@import url(https://fonts.bunny.net/css?family=alfa-slab-one:400|angkor:400|montserrat:500);

.gallery-container {
  min-height: 100vh;
  margin-left: 17vw;
  margin-right: 17vw;
}

.gallery-section {
  padding: 3rem;
  background-color: var(--tertiary);
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 15px;
}

.gallery-title {
  display: flex;
  align-items: center;
  font-size: 5em;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
  font-family: "Angkor", sans-serif;
}

.gallery-image {
  width: 400px;
  height: 400px;
  margin-bottom: 15px;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6);
}
</style>
