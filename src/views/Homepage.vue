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

    <div class="hero-section">
      <div>
        <div v-for="country in countries" :key="country.id">
          <h2>{{ country.name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../supabaseClient";

const countries = ref([]);

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
</style>
