<template>
  <div>
    <table class="table-form">
      <tr>
        <td style="text-align: end; width: 50%;">
          <label for="nombre">Nombre:</label>
        </td>
        <td style="text-align: left;  width: 50%;">
          <input type="string" v-model="data.nombre" />
        </td>
      </tr>
      <tr>
        <td style="text-align: end">
          <label for="percio">Precio:</label>
        </td>
        <td style="text-align: left;">
          <input type="number" v-model="data.precio" />
        </td>
      </tr>
      <tr>
        <td style="text-align: end">
          <label for="categoria">Categoria:</label>
        </td>
        <td style="text-align: left;">
          <select name="categoria" v-model="data.categoriaId">
            <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
          </select>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {useResource} from '@/api/resource';

const props = defineProps({
  defaultData: {
    type: Object,
    default: () => ({}),
  }
});

const catRsrc = useResource('categorias');

const data = ref({});

const categorias = ref([]);

const getCategorias = async () => {
  const respCats = await catRsrc.getList();
  categorias.value = respCats;
}

onMounted(() => {
  data.value = props.defaultData;
  getCategorias();
})

defineExpose({
  data,
});
</script>

<style lang="css" scoped>
.table-form {
  border: 0px;
}

.table-form > tr,td,th {
  border: 0px;
}
</style>