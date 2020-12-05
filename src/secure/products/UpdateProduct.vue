<template>
    <form @submit.prevent="updateProduct">
        <div class="form-group mt-4">
            <label>Title</label>
            <input type="text" class="form-control" name="title" v-model="title">
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" name="description" v-model="description">
        </div>
        <div class="form-group">
            <label>Price</label>
            <input type="text" class="form-control" name="price" v-model="price">
        </div>
        <div class="form-group">
            <label>Image</label>
            <div class="input-group-append">
                <input type="text" class="form-control" name="image" v-model="image" disabled />
                <ImageUpload @file-uploaded="image = $event" />
            </div>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import ImageUpload from '@/secure/components/ImageUpload.vue';
import { Product } from '@/classes/product';

    export default {
        name: "UpdateProduct",
        components: {ImageUpload},
        setup() {
            const title = ref('');
            const description = ref('');
            const price = ref(0);
            const image = ref('');

            const router = useRouter();
            const {params} = useRoute();

            onMounted(async () => {
                const response = await axios.get(`products/${params.id}`);

                const product: Product = response.data.data;

                title.value = product.title;
                description.value = product.description;
                image.value = product.image;
                price.value = product.price;
            });

            const updateProduct = async () => {
                await axios.put(`products/${params.id}`, {
                    title: title.value,
                    description: description.value,
                    image: image.value,
                    price: price.value,
                });

                await router.push('/products');
            }

            return {
                title,
                description,
                price,
                image,
                updateProduct
            }
        }
    }
</script>