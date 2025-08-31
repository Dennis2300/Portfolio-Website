<template>
  <div class="homepage-spinner" v-if="pageLoading">
    <span class="page-loader"></span>
  </div>

  <div class="homepage-container fade-in" v-if="!pageLoading">
    <div class="hero-section">
      <!--Background Image-->
      <div class="background-container">
        <div class="overlay"></div>
        <video
          autoplay
          muted
          loop
          playsinline
          style="width: 100%; height: 100%; object-fit: cover; z-index: -1"
        >
          <source src="./../assets/homepage-video.webm" type="video/webm" />
        </video>
        <div class="fallback-image"></div>
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
        <span class="image-loader"></span>
      </div>
      <!---->
      <div class="gallery-wrap" v-if="!loading && images.length">
        <div class="item" v-for="image in images" :key="image.id">
          <img loading="lazy" :src="image.url" alt="" />
        </div>
      </div>
      <!---->
      <div class="mt-13 mb-3" v-if="!loading && images.length">
        <router-link to="/gallery">
          <button class="button-30">View Gallery</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../supabaseClient";

import "./../css/buttonStyle.css";
import "./../css/spinnerStyle.css";

const pageLoading = ref(true);
const imageLoading = ref(null);
const images = ref([]);

const CACHE_DURATION = 1000 * 60 * 60;

function getCachedData(key) {
  const cachedData = sessionStorage.getItem(key);

  if (!cachedData) {
    return null;
  }

  const { timestamp, data } = JSON.parse(cachedData);
  const now = new Date().getTime();

  if (now - timestamp < CACHE_DURATION) {
    return data;
  } else {
    sessionStorage.removeItem(key);
    return null;
  }
}

function setCachedData(key, data) {
  const cache = {
    timestamp: new Date().getTime(),
    data,
  };
  sessionStorage.setItem(key, JSON.stringify(cache));
}

async function getHomePageImages() {
  imageLoading.value = true;
  const cacheKey = "homepage_images";

  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    images.value = cachedData;
    imageLoading.value = false;
    return;
  }

  try {
    const { data, error } = await supabase
      .from("homepage_images")
      .select("*, country_id(name)");

    if (error) throw error;

    images.value = data;
    setCachedData(cacheKey, data);
  } catch (error) {
    console.error("Error fetching homepage images:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getHomePageImages();
  setTimeout(() => {
    pageLoading.value = false;
  }, 3000);
});
</script>

<style scoped>
@import url(https://fonts.bunny.net/css?family=alfa-slab-one:400|angkor:400|montserrat:500);

.homepage-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.hero-section {
  height: 100vh;
  box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6);
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

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.fallback-image {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("./../assets/fallback-image.jpg");
  background-size: cover;
  background-position: center;
  z-index: -3; /* Behind the video */
  display: none; /* Hidden by default */
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
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.75);
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
