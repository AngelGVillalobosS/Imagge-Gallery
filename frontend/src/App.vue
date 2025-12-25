<script setup>
import ImageGrid from './components/ImageGrid.vue';
import MessageBox from './components/MessageBox.vue';
import NavBar from './components/NavBar.vue';

</script>

<template>
  <nav class="sticky-top">
    <NavBar />
  </nav>
  <div class="container">
    <ImageGrid />
    <div class="sticky-md-bottom">
      <MessageBox />
    </div>
  </div>
</template>

<style scoped></style>
