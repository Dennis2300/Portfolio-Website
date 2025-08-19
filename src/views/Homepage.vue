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
      </div>
    </div>

    <div class="hero-section">
      <h2>Welcome to My Portfolio</h2>
      <p>
        I am a software engineer with a passion for building impactful
        applications. Explore my work and get in touch!
      </p>
      <button @click="$router.push('/projects')">View Projects</button>
    </div>
  </div>
</template>

<style scoped>
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
  left: 5vw;
  transform: translate(0%, -50%);
  color: var(--accent);
  font-size: 4rem;
}
</style>
