<template>
  <div class="homepage-container">
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
</template>

<style scoped>
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
