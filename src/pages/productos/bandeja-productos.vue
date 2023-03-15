<template>
  <div>
    <div class="header-container">
      <h3 style="font-weight: bold">PRODUCTOS</h3>
      <button @click="$router.push({name: 'ProductoNuevo'})">NUEVO</button>
    </div>
    <table>
      <tr>
        <th>NO.</th>
        <th>NOMBRE</th>
        <th>PRECIO</th>
        <th>CATEGORÍA</th>
        <th style="width: 160px">OPCIONES</th>
      </tr>
      <tr>
        <th></th>
        <th><input type="text" style="width: 100%;" placeholder="Buscar nombre" v-model="filtros.nombre_like"/></th>
        <th>
          <input type="number" style="width: calc(100% - 50px);" placeholder="Buscar precio" v-model="precioFiltro"/>
          <select style="width: 50px;" v-model="precioTipoFiltro">
            <option value="">{{ '=' }}</option>
            <option value="_gte">{{ '>=' }}</option>
            <option value="_lte">{{ '<=' }}</option>
          </select>
        </th>
        <th>
          <SelectCategoria v-model="filtros.categoriaId" />
        </th>
        <th style="width: 160px">
          <button @click="limpiarFiltros">Limpiar</button>
          <button style="margin-left: 5px;" @click="getProductos">Buscar</button>
        </th>
      </tr>
      <tr v-for="(producto, index) in productos" :key="producto.id">
        <td>{{ index+1 }}</td>
        <td>{{ producto.nombre }}</td>
        <td>{{ producto.precio }}</td>
        <td>{{ producto.categoria.nombre }}</td>
        <td>
          <button @click="$router.push({name: 'ProductoEditar', params: {id: producto.id}})">
            Editar
          </button>
          <button style="margin-left: 5px" @click="onEliminar(producto.id)">
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
import SelectCategoria from '../../components/categorias/select-categoria.vue';

const productosRsrc = useResource('productos');

const productos = ref([]);
const filtros = ref({_expand: 'categoria'});

const precioTipoFiltro = ref('');
const precioFiltro = ref();

const limpiarFiltros = () => {
  filtros.value = {_expand: 'categoria'};
  precioFiltro.value = undefined;
  precioTipoFiltro.value = '';
  getProductos();
}

const getProductos = async () => {
  if(precioFiltro.value){
    filtros.value.precio_gte = filtros.value.precio_lte = filtros.value.precio = undefined;
    filtros.value[`precio${precioTipoFiltro.value}`] = precioFiltro.value;
  }
  const resp = await productosRsrc.getList(filtros.value);
  productos.value = resp;
}

const onEliminar = async (id) => {
  await productosRsrc.delete(id);
  getProductos();
}

onMounted(() => {
  getProductos();
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