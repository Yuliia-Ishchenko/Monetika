
<template>
   <div class="centered-content" >
      <div class="">
        
         <div class="main-block block">
            <h3>  <span class="pi pi-wallet"></span> {{ total }} Kč</h3>
            <div class="income-by-category">
               <div class="by-category" :class="showMinusBlock && selectedCategory==1?'by-category-focus':''" :style="{ pointerEvents: showMinusBlock ? 'auto' : 'none' }" @click="selectedCategory=1">
                  <span>50 %</span> 
                  <span class="pi pi-graduation-cap"></span> 
                  <span class="span-summ">{{ incomingUseful }} Kč</span>
               </div>
               <div class="by-category" :class="showMinusBlock && selectedCategory==2?'by-category-focus':''" :style="{ pointerEvents: showMinusBlock ? 'auto' : 'none' }" @click="selectedCategory=2">
                  <span>30 %</span> 
                  <span class="pi pi-thumbs-up-fill"></span>
                  <span class="span-summ">{{ incomingEntertainment }} Kč</span>
               </div>
               <div class="by-category" :class="showMinusBlock && selectedCategory==3?'by-category-focus':''" :style="{ pointerEvents: showMinusBlock ? 'auto' : 'none' }" @click="selectedCategory=3">
                  <span>20 %</span> 
                  <span class="pi pi-gift"></span>
                  <span class="span-summ">{{ incomingGift }} Kč</span>
               </div>
            </div>
            <div v-if="!showAddedBlock && !showMinusBlock" class="btn-control">
               <Button icon="pi pi-plus" aria-label="Save" size="small" @click="()=>showAddedBlock=true"/>
               <Button icon="pi pi-minus" aria-label="Save" size="small"  @click="()=>showMinusBlock=true"/>
               
            </div>
            <div v-if="showAddedBlock" class="added-incoming">
               <NumericKeypad @send-value="onSendPlusValue" @close="onCloseNumeric"/>
            </div>
            <div v-if="showMinusBlock" class="added-incoming">
               <NumericKeypad @send-value="onSendMinusValue" @close="onCloseNumeric"/>
            </div>
            <div class="">
               <IncomeTable :incoming-list="incomingList"/>
            </div>

         </div>
         
      </div>
     
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {supabase} from '../supabase'
import IncomeTable from './components/IncomeTable.vue';
import NumericKeypad from './components/NumericKeypad.vue';
import Button from 'primevue/button';

const total = ref(0)
const incomingList = ref<any[]>([])
const showAddedBlock = ref(false)
const showMinusBlock = ref(false)
const selectedCategory = ref(1)

const incomingUseful = computed(() => {
  return incomingList.value
    .reduce((sum, item) => sum + item.category_50, 0).toFixed(2);
});


const incomingEntertainment = computed(() => {
  return incomingList.value
    .reduce((sum, item) => sum + item.category_30, 0).toFixed(2);
});


const incomingGift = computed(() => {
  return incomingList.value
    .reduce((sum, item) => sum + item.category_20, 0).toFixed(2);
});

onMounted(()=>{
   getAllData()
})
async function getAllData() {
  const { data, error } = await supabase
    .from('income_expenses')
    .select('*')
    .order('id', { ascending: false }); ;
  
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log(data);

  if (data) {
   incomingList.value = data 
    // Calculate the sum of the 'amount' field
    total.value = data.reduce((sum: number, item: any) => sum + item.total, 0).toFixed(2);
    
  }
}
function onSendMinusValue(value: number) {
   showMinusBlock.value=false
   let part1 = 0
   let part2 = 0
   let part3 = 0
 

if(selectedCategory.value==1) part1  = -value
if(selectedCategory.value==2) part2  = -value
if(selectedCategory.value==3) part3  = -value
  
  setInDB(-value, part1, part2, part3); 
}

function onSendPlusValue(value: number) {
showAddedBlock.value=false
const part1 = value * 0.5; // 50%
const part2 = value * 0.3; // 30%
const part3 = value * 0.2; // 20%


setInDB(value, part1, part2, part3); 
}

async function setInDB(total: number, category_50: number, category_30:number, category_20:number) {
  const { error } = await supabase
    .from('income_expenses')
    .insert({ total: total, category_50: category_50, category_30:category_30, category_20:category_20  });

  if (error) {
      console.error('Error:', error.message);
  } else {
      getAllData()
      console.log('Success! ');
  }
}
function onCloseNumeric(){
   showAddedBlock.value=false
   showMinusBlock.value=false
   selectedCategory.value=1
}
</script>


<style lang="scss" scoped>
.block{
   text-align: center;
}
.btn-control{
   button{
      margin: 1rem 0.5rem;
   }
}
.income-by-category{
   display: flex;
   justify-content: space-around;
   .by-category{
      display: flex;
      flex-direction: column;
      padding: 0.2rem 0.9rem;
      cursor: pointer;
      // border-radius: 5px;
      // box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
   }
   .by-category-focus{
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      cursor: pointer;
   }
   .pi{
      font-size: 30px;
      margin: 0.5rem 0;
   }
   .span-summ{
      font-weight: 700;
   }
}
.pi-wallet{
   font-size: 20px;
   color: rgb(176, 253, 176);
   font-weight: 600;
   margin-right: 0.5rem;
}
.pi-graduation-cap{
   color: rgb(167, 167, 252);
}
.pi-thumbs-up-fill{
   color:rgb(255, 175, 175);
}
.pi-gift{
   color: rgb(255, 255, 178)
}

</style>
