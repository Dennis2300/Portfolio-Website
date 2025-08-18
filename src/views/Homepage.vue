<template>
  <div class="homepage-container">
    <div class="homepage-header">
      <h1>Hello! <br></br> I'm Dennis-Zixiang Zhou</h1>
    </div>

    <!--Background Image-->
    <div class="background-container">
      <img
        class="background-image"
        src="https://images.pexels.com/photos/316093/pexels-photo-316093.jpeg"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped>
.homepage-header {
display: flex;
    justify-content: center;
    align-items: center;
  font-size: 4em;
  z-index: 2;

  
}

.homepage-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
</style>
