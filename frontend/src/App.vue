<script setup>
import { Icon } from '@iconify/vue';
import ImageGrid from './components/ImageGrid.vue';
import MessageBox from './components/MessageBox.vue';

</script>

<template>
  <nav class="navbar bg-body-secondary sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <Icon icon="material-symbols-light:folder" color="black" height="24" width="30" class="d-inline-block align-text-top" />
        Image Gallery | Tempo
      </a>
      <button type="button" class="btn ">
        <Icon icon="material-symbols-light:refresh-rounded" height="24" />

      </button>
    </div>
  </nav>
  <div class="container">
    <ImageGrid />
    <div class="sticky-md-bottom">
      <MessageBox />
    </div>
  </div>
</template>

<style scoped></style>
