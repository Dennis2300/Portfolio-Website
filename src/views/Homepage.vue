<template>
  <div class="homepage-container">
    <div class="hero-section">
      <!--Background Image-->
      <div class="background-container">
        <img
          class="background-image"
          src="https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg"
          alt=""
        />
      </div>

      <!--Header Section-->
      <div class="homepage-header">
        <h1>
          Hello! <br />
          I'm Dennis-Zixiang Zhou
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus totam
          in eos, labore ipsum architecto fuga nihil placeat esse asperiores
          aliquam dolores, ad dolorem ipsam. Reprehenderit ipsum voluptas
          consequuntur necessitatibus?
        </p>
      </div>
    </div>

    <div class="gallery-section">
      <div class="countries-container">
        <h2
          v-for="country in countries"
          class="country"
          @click="selectCountry(country)"
          :key="country.id"
        >
          {{ country.name }}
        </h2>
      </div>
      <div class="images-container">
        <img
          v-for="image in homepageImages"
          class="image"
          loading="lazy"
          :src="image.url"
          :alt="image.alt"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { supabase } from "../supabaseClient";

const countries = ref([]);
const allImages = ref([]); // Store all images
const selectedCountry = ref(1);

// Computed property to filter images
const homepageImages = computed(() => {
  return allImages.value.filter(
    (image) => image.country_id === selectedCountry.value
  );
});

function selectCountry(country) {
  selectedCountry.value = country.id;
}

async function fetchCountries() {
  try {
    const { data, error } = await supabase.from("countries").select("*");
    if (error) throw error;
    countries.value = data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

async function fetchAllImages() {
  try {
    const { data, error } = await supabase.from("homepage_images").select("*");
    if (error) throw error;
    allImages.value = data;
  } catch (error) {
    console.error("Error fetching homepage images:", error);
    allImages.value = [];
  }
}

onMounted(() => {
  fetchCountries();
  fetchAllImages();
});
</script>

<style scoped>
@import url(https://fonts.bunny.net/css?family=angkor:400|montserrat:500);
.hero-section {
  height: 100vh;
}

.homepage-container {
  width: 100vw;
  min-height: 100vh;
}

.background-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.homepage-header {
  position: absolute;
  top: 50%;
  left: 3vw;
  transform: translate(0%, -50%);
}

.homepage-header h1 {
  color: var(--accent);
  font-size: 4rem;
  font-family: "Angkor", sans-serif;
  font-weight: 700;
}

.homepage-header p {
  color: white;
  font-size: 1.5rem;
  font-family: "Montserrat", sans-serif;
  margin-top: 1rem;
  width: 50%;
}

.country {
  cursor: pointer;
  position: relative;
  display: inline-block;
  color: white;
}

.country::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -3px;
  left: 0;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease;
}

.country:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.country:active {
  text-decoration-color: #007bff; /* Blue color when active */
  text-decoration-thickness: 3px; /* Thicker when active */
}

.gallery-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.countries-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 66px;
  font-size: 2em;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
}

.images-container {
  margin-top: 66px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 66px;
}

.image {
  width: 400px;
  height: 600px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
}
</style>
