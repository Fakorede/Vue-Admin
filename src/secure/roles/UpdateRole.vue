<template>
    <form @submit.prevent="updateRole">
        <div class="form-group row mt-4">
            <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" name="name" id="name" v-model="name">
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Permissions</label>
            <div class="col-sm-10">
                <div class="form-check form-check-inline col-3" v-for="permission in permissions" :key="permission.id">
                    <input type="checkbox" class="form-check-input" :value="permission.id" :checked="checked(permission.id)" @change="select(permission.id, $event.target.checked)">
                    <label class="form-check-label">{{ permission.name }}</label>
                </div>
            </div>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { Role } from '@/classes/role';

    export default {
        name: "UpdateRole",
        setup() {
            const name = ref('');
            const permissions = ref([]);
            const selected = ref([] as number[]);

            const router = useRouter();
            const {params} = useRoute();

            onMounted(async () => {
                const response = await axios.get('permissions');
                permissions.value = response.data.data;

                const roleCall = await axios.get(`roles/${params.id}`);
                const role: Role = roleCall.data.data;

                name.value = role.name;
                selected.value = role.permissions.map(p => p.id);
            });

            const checked = (id: number) => selected.value.some(s => s === id)

            const select = (id: number, checked: boolean) => {
                if(checked) {
                    selected.value = [...selected.value, id];
                    return;
                }

                selected.value = selected.value.filter((s) => s !== id);
            }

            const updateRole = async () => {
                await axios.put(`roles/${params.id}`, {
                    name: name.value,
                    permissions: selected.value,
                });

                await router.push('/roles');
            }

            return {
                name,
                permissions,
                selected,
                select,
                checked,
                updateRole
            }
        }
    }
</script>