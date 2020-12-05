<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="btn-toolbar mb-2 mb-md-0">
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary">Export</a>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="orderItem in orderItems" :key="orderItem.id">
                    <td>{{ orderItem.id }}</td>
                    <td>{{ orderItem.product_title }}</td>
                    <td>{{ orderItem.price }}</td>
                    <td>{{ orderItem.quantity }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <Paginator :last-page="lastPage" @page-changed="load($event)" />
</template>

<script lang="ts">
    import Paginator from '@/secure/components/Paginator.vue';
    import { Entity } from '@/interfaces/entity';
    import { onMounted, ref } from "vue";
    import axios from "axios";
import { useRoute } from 'vue-router';
    export default {
        name: "OrderItems",
        components: { Paginator },
        setup() {
            const orderItems = ref([]);

            const {params} = useRoute();

            onMounted(async () => {
                const response = await axios.get(`orders/${params.id}`);

                orderItems.value = response.data.data.order_items;
            });

            return {
                orderItems
            }
        }
    }
</script>
