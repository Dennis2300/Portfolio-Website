<template>
  <div class="gallery-spinner" v-if="pageLoading">
    <span class="page-loader"></span>
  </div>
  <div class="gallery-container fade-in" v-if="!pageLoading">
    <h1 class="text-center my-10">My Gallery</h1>
    <div
      class="gallery-section-container"
      v-for="country in countries"
      :key="country.id"
    >
      <div class="gallery-section">
        <h1>{{ country.name }}</h1>
        <div class="gallery-images">
          <img src="https://placehold.co/400x400" alt="" />
          <img src="https://placehold.co/400x400" alt="" />
          <img src="https://placehold.co/400x400" alt="" />
        </div>
        <div class="text-center mt-7">
          <button class="button-30">See more</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../supabaseClient";
import "./../css/spinnerStyle.css";
import "./../css/buttonStyle.css";

const pageLoading = ref(true);
const countries = ref([]);

async function fetchCountries() {
  const { data, error } = await supabase.from("countries").select("*");

  countries.value = data;

  if (error) {
    console.error("Error fetching countries:", error);
  }
}

onMounted(() => {
  fetchCountries();
  setTimeout(() => {
    pageLoading.value = false;
  }, 3000);
});
</script>

<style scoped>
@import url(https://fonts.bunny.net/css?family=alfa-slab-one:400|angkor:400|montserrat:500);

.gallery-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.gallery-container {
  min-height: 100vh;
}

.gallery-container h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 4em;
  margin-bottom: 25px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.gallery-section-container {
  background-color: var(--secondary);
  min-height: 66vh;
  width: 90vw;
  margin: 0 auto;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
}

.gallery-section {
  padding-left: 50px;
  padding-right: 50px;
}

.gallery-section h1 {
  font-family: "Alfa Slab One", cursive;
  font-size: 3em;
  margin-bottom: 25px;
  letter-spacing: 3px;
}

.gallery-images {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
}

.gallery-images img {
  border-radius: 25px;
}

.fade-in {
  animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
