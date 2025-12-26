<script setup>
import { Icon } from '@iconify/vue';
import { ref, watch, computed } from 'vue';

const props = defineProps({
    photos: {
        type: Array,
        default: () => []
    },
    user: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['upload-photo']);

const fileInput = ref(null);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const shortenFileName = (filename) => {
    if (!filename) return 'Sin nombre';
    if (filename.length <= 30) return filename;
    const extension = filename.split('.').pop();
    const name = filename.substring(0, 15);
    return `${name}...${extension ? '.' + extension : ''}`;
};

const getFileExtension = (fileName) => {
    if (!fileName) return '';
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const iconMap = {
        'jpg': 'mdi:file-jpg-box',
        'jpeg': 'mdi:file-jpg-box',
        'png': 'mdi:file-png-box',
        'gif': 'mdi:file-gif-box',
        'webp': 'mdi:file-image',
        'bmp': 'mdi:file-image',
        'svg': 'mdi:file-image',
        'default': 'mdi:file'
    };
    return iconMap[ext] || iconMap.default;
};

const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona una imagen.');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert('La imagen es demasiado grande (máximo 10MB)');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = e.target.result;
        emit('upload-photo', {
            base64: base64,
            filename: `${Date.now()}-${file.name}`,
            originalFilename: file.name
        });

        if (fileInput.value) {
            fileInput.value.value = '';
        }
    };
    reader.onerror = () => {
        alert('Error al leer el archivo');
    };
    reader.readAsDataURL(file);
};


</script>

<template>
    <div class="container text-center">
        <div v-if="loading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando....=</span>
            </div>
            <p class="text-secondary mt-2">Cargando fotos...</p>
        </div>
        <div v-else>
            <!-- Mensaje cuando no hay fotos -->
            <div v-if="photos.length === 0" class="col-12 text-center py-5  h-100">
                <Icon icon="material-symbols-light:hide-image" class="display-1 text-secondary" />
                <h5 class="text-secondary">No hay fotos todavía</h5>
                <p class="text-secondary">¡Sé el primero en subir una foto!</p>
            </div>
            <div class="container text-center"> <!-- grid de las imagenes -->
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4 mt-4 mb-2" v-for="(photo, index) in photos" :key="index">
                        <div class="card h-100">
                            <div class="card-body d-flex align-items-center justify-content-center">
                                <img :src="photo.base64" class="img-fluid mx-auto d-block" alt="Image" width="250px">
                            </div>
                            <div class="card-footer small bg-body-secondary">
                                <div class="row small text-black font-monospace">
                                    <span>
                                        <Icon icon="mdi:account" class="me-1" />
                                        {{ photo.user }}
                                    </span>
                                    <span class="text-secondary">
                                        {{ formatDate(photo.date) }}
                                    </span>
                                    <p :title="photo.originalFilename || photo.filename">
                                        <Icon icon="material-symbols:image" /> {{ photo.originalFilename ||
                                            photo.filename
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input type="file" ref="fileInput" accept="image/*" @change="handleFileSelect" class="d-none"
                id="fileInput" />

            <div class="mt-4 mb-5 mx-auto"> <!-- Subir foto -->
                <label for="fileInput" class="btn btn-primary">
                    <Icon icon="material-symbols-light:upload" class="me-2" />
                    Subir Nueva Foto
                </label>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card {
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>