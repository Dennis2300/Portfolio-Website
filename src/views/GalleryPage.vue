<template>
  <div class="gallery-container">
    <h1 class="text-center">Gallery</h1>
    <div class="gallery-sections-container">
      <div class="gallery-section" v-for="country in countries">
        <h2>{{ country.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../supabaseClient";

const countries = ref([]);

async function fetchCountries() {
  const { data, error } = await supabase.from("countries").select("*");

  countries.value = data;

  if (error) {
    console.error("Error fetching countries:", error);
  } else {
    console.log("Countries:", data);
  }
}

onMounted(() => {
  fetchCountries();
});
</script>

<style scoped>
.gallery-container {
  min-height: 100vh;
}

.gallery-container h1 {
  font-family: "Alfa Slab One", sans-serif;
  font-size: 4rem;
  margin: 20px 0;
}

.gallery-sections-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gallery-section {
  height: 66vh;
  width: 90vw;
  background-color: darkslateblue;
  margin-bottom: 50px;
}
</style>
