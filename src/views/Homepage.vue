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
      <!---->
      <div class="gallery-header" v-if="!loading && images.length">
        <h1>Moments Captured</h1>
      </div>
      <!---->
      <div v-if="loading">
        <span class="loader"></span>
      </div>
      <!---->
      <div class="gallery-wrap" v-if="!loading && images.length">
        <div class="item" v-for="image in images" :key="image.id">
          <img loading="lazy" :src="image.url" :alt="image.country_id.name" />
        </div>
      </div>
      <!---->
      <div class="gallery-button mt-13 mb-3" v-if="!loading && images.length">
        <button class="button-30" role="button">See more</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../supabaseClient";

import "./../css/buttonStyle.css";
import "./../css/spinnerStyle.css";

const loading = ref(true);
const images = ref([]);

async function getHomePageImages() {
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from("homepage_images")
      .select("*, country_id(name)");

    if (error) throw error;

    images.value = data;
  } catch (error) {
    console.error("Error fetching homepage images:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getHomePageImages();
});
</script>

<style scoped>
@import url(https://fonts.bunny.net/css?family=alfa-slab-one:400|angkor:400|montserrat:500);

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

.gallery-section {
  min-height: 100vh;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
}

.gallery-header {
  margin-bottom: 15px;
  font-size: 5em;
  font-family: "Alfa Slab One", display;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.gallery-wrap {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 85%;
  height: 70vh;
}

.item {
  flex: 1;
  background-position: center;
  background-size: cover;
  background-repeat: none;
  transition: flex 0.8s ease;

  &:hover {
    flex: 2;
  }
}

.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}
</style>
