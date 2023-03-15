<template>
  <div style="text-align: center;">
    <h2 style="font-weight: bold">ACTUALIZAR PRODUCTO</h2>
    <FormProducto ref="formProductoRef"></FormProducto>
    <div class="buttons-container">
      <button @click="onGuardar">ACTUALIZAR</button>
      <button style="margin-left: 5px;" @click="$router.push({name: 'ProductosList'})">CANCELAR</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FormProducto from '../../components/productos/form-producto.vue';
import {useResource} from '@/api/resource';
import { useRoute, useRouter } from 'vue-router';

const prodRsrc = useResource('productos');
const router = useRouter();
const route = useRoute();

const productoId = ref();
const formProductoRef = ref();

const onGuardar = async () => {
  if(formProductoRef.value){
    const dataUp = formProductoRef.value?.data;
    delete dataUp.id;
    const respGuardar = await prodRsrc.update(productoId.value, dataUp);
    if(respGuardar){
      formProductoRef.value.data = {};
      router.push({
        name: 'ProductosList',
      });
    }
  }
}

onMounted(async () => {
  if(route.params.id){
    productoId.value = route.params.id;
    const producto = await prodRsrc.getById(productoId.value);
    if(producto){
      formProductoRef.value.data = producto;
    } else {
      router.push({
        name: 'ProductosList',
      })
    }
  } else {
    router.push({
      name: 'ProductosList',
    });
  }
})

</script>

<style lang="css" scoped>
.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>