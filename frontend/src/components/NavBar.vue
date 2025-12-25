<script setup>
import { defineEmits } from 'vue';

// Emitir eventos
const emit = defineEmits(['refresh-photos']);
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-secondary shadow-sm">
    <div class="container-fluid">
      <!-- Logo y título -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <Icon icon="material-symbols-light:folder" color="black" height="24" width="30" 
              class="d-inline-block align-text-top me-2" />
        Image Gallery | Tempo
      </a>

      <!-- Controles -->
      <div class="d-flex align-items-center">
        <!-- Botón de refresh -->
        <button type="button" class="btn btn-outline-primary" @click="$emit('refresh-photos')">
                <Icon icon="material-symbols-light:refresh-rounded" height="24" />
            </button>
      </div>
    </div>
  </nav>
</template>