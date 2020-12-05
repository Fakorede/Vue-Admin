<template>
    <form @submit.prevent="createProduct">
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
                <label class="btn btn-primary">
                    Upload <input type="file" hidden @change="change($event.target.files)" />
                </label>
            </div>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

    export default {
        name: "CreateProduct",
        setup() {
            const title = ref('');
            const description = ref('');
            const price = ref(0);
            const image = ref('');

            const router = useRouter();

            onMounted(() => {
                console.log();
            });

            const change = async (files: any) => {
                const file = files.item(0);

                const data = new FormData;
                data.append('image', file);

                const response = await axios.post('upload', data);

                image.value = response.data.url;
            }

            const createProduct = async () => {
                await axios.post('products', {
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
                change,
                createProduct
            }
        }
    }
</script>