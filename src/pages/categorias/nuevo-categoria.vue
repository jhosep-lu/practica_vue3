<template>
  <div style="text-align: center;">
    <h2 style="font-weight: bold">NUEVA CATEGORIA</h2>
    <FormCategoria ref="formCategoriaRef"></FormCategoria>
    <div class="buttons-container">
      <button @click="onGuardar">GUARDAR</button>
      <button style="margin-left: 5px;" @click="$router.push({name: 'CategoriasList'})">CANCELAR</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FormCategoria from '../../components/categorias/form-categoria.vue';
import {useResource} from '@/api/resource';
import { useRouter } from 'vue-router';

const catRsrc = useResource('categorias');
const router = useRouter();

const formCategoriaRef = ref();

const onGuardar = async () => {
  if(formCategoriaRef.value){
    const respGuardar = await catRsrc.create(formCategoriaRef.value?.data);
    if(respGuardar){
      formCategoriaRef.value.data = {};
      router.push({
        name: 'CategoriasList',
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