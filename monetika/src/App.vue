
<template>
   <div class="centered-content">
      <SelectButton v-model="selectedBlock" :options="blockOptions" optionLabel="name"  />
      <div v-if="selectedBlock===1" class="main-block"></div>
      <div v-if="selectedBlock===2" class="income-block"></div>
      
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {supabase} from '../supabase'
import SelectButton from 'primevue/selectbutton';


// const { data, error } = await supabase
//   .from('income_expenses')
//   .select('*');

// if (error) {
//   console.error('Ошибка:', error.message);
// } else {
//   console.log('Данные:', data);
// }
const selectedBlock = ref(1);
const blockOptions = ref([
    { name: 'Главная', id: 1 },
    { name: 'Внести доход', id: 2 },
   //  { name: 'История', id: 3 }
]);

//  await supabase
//   .from('income_expenses')
//   .insert({ amount: 200, description: 'Дополнительный доход', category: 1 });



</script>


<style scoped>
.centered-content {
  display: flex;
  justify-content: center;
  /* align-items: center;    */
  /* min-height: 100vh;      */
  /* text-align: center;     */
}
</style>
