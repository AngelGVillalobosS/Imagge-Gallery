<script setup>
import ImageGrid from './components/ImageGrid.vue';
import MessageBox from './components/MessageBox.vue';
import NavBar from './components/NavBar.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import * as api from './services/api.js'

const currentUser = ref('');
const photos = ref([]);
const messages = ref([]);
const loading = ref(false);

let messagePollingInterval = null;

const selectUser = async () => {
  try {
    const response = await api.getRandomUser();
    if (response.success) {
      currentUser.value = response.user;
      console.log('Selected user: ', currentUser.value);
    } else {
      currentUser.value = 'Usuario';
      console.log('Using default user');
    }
  } catch (e) {
    console.error('Error getting the user', e);
    currentUser.value = 'User';
  }
};

const loadMessages = async () => {
  try {
    const response = await api.getMessages(5);
    if (response.success) {
      messages.value = response.messages;
      console.log('Mensajes cargados:', messages.value.length);
    } else {
      console.error('Error to load messages', response.error);
    }
  } catch (e) {
    console.error('Error in loadMessages', e);
  }
}

const handleSendMessage = async (text) => {
  if (!text.trim()) {
    return;
  }
  try {
    const response = await api.sendMessage(currentUser.value, text);
    if (response.success) {
      console.log('Message sent succesfully');
      await loadMessages();
    } else {
      alert(response.error || 'Error al enviar el mensaje.');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Error al enviar el mensaje. Verifica la conexión.');
  }
};

const startMessagePolling = () => {
  loadMessages();
  messagePollingInterval = setInterval(loadMessages, 5000);
  console.log('Starting polling messages (every 5s)');
}

const loadPhotos = async () => {
  loading.value = true;
  try {
    const response = await api.getPhotos(0, 20);
    if (response.success) {
      photos.value = response.photos;
    }
  } catch (error) {
    console.error('Error al cargar fotos:', error);
  } finally {
    loading.value = false;
  }
};
const handleUploadPhoto = async (uploadData) => {
  try {
    // uploadData contiene: base64, filename, originalFilename
    const response = await api.uploadPhoto(
      currentUser.value,
      uploadData.base64,
      uploadData.filename,
      uploadData.originalFilename
    );

    if (response.success) {
      console.log('Foto subida:', response.photo.filename);
      await loadPhotos(); // Recargar la galería
    } else {
      alert(response.error || 'Error al subir la foto');
    }
  } catch (error) {
    console.error('Error al subir foto:', error);
    alert('Error al subir la foto');
  }
};

const handleRefreshPhotos = () => {
  console.log('Refrescando fotos...');
  loadPhotos();
};

onMounted(async () => {
  console.log('Starting app...');

  await selectUser();
  await loadMessages();
  handleRefreshPhotos();
  startMessagePolling();

  console.log('Aplicación inicializada correctamente');
});

onUnmounted(() => {
  if (messagePollingInterval) {
    clearInterval(messagePollingInterval);
    console.log('Message polling stopped');
  }
});
</script>

<template>
  <nav class="sticky-top">
    <NavBar @refresh-photos="handleRefreshPhotos" />
  </nav>
  <div class="container">
    <ImageGrid :photos="photos" :user="currentUser" :loading="loading" @upload-photo="handleUploadPhoto" />
    <div class="sticky-md-bottom">
      <MessageBox :messages="messages" :user="currentUser" @send-message="handleSendMessage"
        @upload-photo="handleUploadPhoto" />
    </div>
  </div>
</template>

<style scoped></style>
