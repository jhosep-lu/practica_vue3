<template>
  <div>
    <div class="header-container">
      <h3 style="font-weight: bold">CATEGORÍAS</h3>
      <button @click="$router.push({name: 'CategoriaNuevo'})">NUEVO</button>
    </div>
    <table>
      <tr>
        <th>NO.</th>
        <th>NOMBRE</th>
        <th style="width: 160px">OPCIONES</th>
      </tr>
      <tr>
        <th></th>
        <th><input type="text" style="width: 100%;" placeholder="Buscar nombre" v-model="filtros.nombre_like"/></th>
        <th style="width: 160px">
          <button @click="() => {filtros={}; getCategorias();}">Limpiar</button>
          <button style="margin-left: 5px;" @click="getCategorias">Buscar</button>
        </th>
      </tr>
      <tr v-for="(categoria, index) in categorias" :key="categoria.id">
        <td>{{ index+1 }}</td>
        <td>{{ categoria.nombre }}</td>
        <td>
          <button @click="$router.push({name: 'CategoriaEditar', params: {id: categoria.id}})">
            Editar
          </button>
          <button style="margin-left: 5px" @click="onEliminar(categoria.id)">
            Eliminar
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import {useResource} from '@/api/resource';
import { ref, onMounted } from 'vue';

const categoriasRsrc = useResource('categorias');

const categorias = ref([]);
const filtros = ref({});

// const filterPrecio = computed({

// });

const getCategorias = async () => {
  const resp = await categoriasRsrc.getList(filtros.value);
  categorias.value = resp;
}

const onEliminar = async (id) => {
  await categoriasRsrc.delete(id);
  getCategorias();
}

onMounted(() => {
  getCategorias();
});
</script>

<style lang="css" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: end;
}
</style>