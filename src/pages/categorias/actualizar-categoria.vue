<template>
  <div style="text-align: center;">
    <h2 style="font-weight: bold">ACTUALIZAR CATEGORIA</h2>
    <FormCategoria ref="formCategoriaRef"></FormCategoria>
    <div class="buttons-container">
      <button @click="onGuardar">ACTUALIZAR</button>
      <button style="margin-left: 5px;" @click="$router.push({name: 'CategoriasList'})">CANCELAR</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FormCategoria from '../../components/categorias/form-categoria.vue';
import {useResource} from '@/api/resource';
import { useRoute, useRouter } from 'vue-router';

const catRsrc = useResource('categorias');
const router = useRouter();
const route = useRoute();

const categoriaId = ref();
const formCategoriaRef = ref();

const onGuardar = async () => {
  if(formCategoriaRef.value){
    const dataUp = formCategoriaRef.value?.data;
    delete dataUp.id;
    const respGuardar = await catRsrc.update(categoriaId.value, dataUp);
    if(respGuardar){
      formCategoriaRef.value.data = {};
      router.push({
        name: 'CategoriasList',
      });
    }
  }
}

onMounted(async () => {
  if(route.params.id){
    categoriaId.value = route.params.id;
    const categoria = await catRsrc.getById(categoriaId.value);
    if(categoria){
      formCategoriaRef.value.data = categoria;
    } else {
      router.push({
        name: 'CategoriasList',
      })
    }
  } else {
    router.push({
      name: 'CategoriasList',
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