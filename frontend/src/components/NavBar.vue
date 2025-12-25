<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['refresh-photos']);
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-secondary shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <Icon icon="material-symbols-light:folder" color="black" height="24" width="30"
          class="d-inline-block align-text-top me-2" />
        Image Gallery | Tempo
      </a>

      <div class="d-flex align-items-center">
        <button type="button" class="btn btn-outline-secondary" @click="$emit('refresh-photos')">
          <Icon icon="material-symbols-light:refresh-rounded" height="24" color="black" />
        </button>
      </div>
    </div>
  </nav>
</template>