<template>
  <div class="gallery-container">
    <!--Will make this dynamic later-->
    <div class="gallery-section">
      <!------>
      <div class="gallery-title">
        <h1>Denmark</h1>
      </div>
      <!------>
      <div class="gallery-image">
        <img
          src="https://iuequzkfjoqpinrkdete.supabase.co/storage/v1/object/public/website%20images/_MG_1637.webp"
          alt=""
        />
      </div>
    </div>
    <div class="gallery-section">
      <!------>
      <div class="gallery-title">
        <h1>China</h1>
      </div>
      <!------>
      <div class="gallery-image">
        <img
          src="https://iuequzkfjoqpinrkdete.supabase.co/storage/v1/object/public/website%20images/_MG_5055.webp"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
@import url(https://fonts.bunny.net/css?family=alfa-slab-one:400|angkor:400|montserrat:500);

.gallery-container {
  min-height: 100vh;
  margin-left: 200px;
  margin-right: 200px;
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
