<template>
  <select name="categoria" v-model="catSelected" placeholder="Categoria">

    <option :value="undefined">categoria</option>
    <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
  </select>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import {useResource} from '@/api/resource';

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  }
});

const emit = defineEmits(['update:modelValue']);

const catSelected = computed({
  get: () => props.modelValue,
  set: (newVal) => emit('update:modelValue', newVal),
})

const catRsrc = useResource('categorias');

const categorias = ref([]);

const getCategorias = async () => {
  const respCats = await catRsrc.getList();
  categorias.value = respCats;
}

onMounted(() => {
  getCategorias();
})
</script>

<style scoped>

</style>