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
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  defaultData: {
    type: Object,
    default: () => ({}),
  }
});


const data = ref({});


onMounted(() => {
  data.value = props.defaultData;
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