<script setup>
import { Icon } from "@iconify/vue";
const images = [
    "https://cdn-icons-png.flaticon.com/512/9584/9584876.png", "https://cdn-icons-png.flaticon.com/512/10278/10278187.png", "https://cdn.pixabay.com/photo/2025/10/07/10/59/parrot-9878922_1280.jpg"
]

console.log(images[0]);

</script>

<template>
    <div class="container text-center">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 mt-4 mb-2" v-for="(image, index) in images" :key="index">
                <div class="card h-100">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <img :src="image" class="img-fluid mx-auto d-block" alt="Image" width="250px">
                    </div>
                    <div class="card-footer small bg-body-secondary">
                        <div class="row small text-black font-monospace">
                            <p class="">{{ image }}</p>
                        </div>
                        <div class="row small">
                            <Icon icon="mdi:file" style="color: gray" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>