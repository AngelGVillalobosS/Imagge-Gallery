<script setup>
import { Icon } from '@iconify/vue';
import ImageGrid from './components/ImageGrid.vue';

</script>

<template>
  <nav class="navbar bg-body-secondary sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <Icon icon="mdi:clock" color="black" height="24" width="30" class="d-inline-block align-text-top"/>
        Image Gallery | Tempo
      </a>
      <button class="btn">
        <Icon icon="mdi:restart"  height="24"/>
      </button>
    </div>
  </nav>
  <div class="container">
    <ImageGrid />
  </div>
</template>

<style scoped></style>
