<template>
  <div style="text-align: center;">
    <h2 style="font-weight: bold">NUEVO PRODUCTO</h2>
    <FormProducto ref="formProductoRef"></FormProducto>
    <div class="buttons-container">
      <button @click="onGuardar">GUARDAR</button>
      <button style="margin-left: 5px;" @click="$router.push({name: 'ProductosList'})">CANCELAR</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FormProducto from '../../components/productos/form-producto.vue';
import {useResource} from '@/api/resource';
import { useRouter } from 'vue-router';

const prodRsrc = useResource('productos');
const router = useRouter();

const formProductoRef = ref();

const onGuardar = async () => {
  if(formProductoRef.value){
    const respGuardar = await prodRsrc.create(formProductoRef.value?.data);
    if(respGuardar){
      formProductoRef.value.data = {};
      router.push({
        name: 'ProductosList',
      });
    }
  }
}

</script>

<style lang="css" scoped>
.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>