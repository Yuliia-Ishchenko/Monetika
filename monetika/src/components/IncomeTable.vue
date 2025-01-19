<template>
   <DataTable :value="props.incomingList" size="small" tableStyle="min-width: 20rem" scrollable scrollHeight="300px">
    <Column field="date" header="Date">
      <template #body="{data}">
       {{ formattedDate(data.date)  }} 
      </template>
    </Column>
    <Column  header="Amount">
      <template #body="{data}">
       {{ amount(data) }}  <span class="incoming-icon pi" :class="icon(data)"></span>
      </template>
    </Column>
    <Column  >
      <template #body="{data}">
        <span class=" pi" :class="viewIcon(data)"></span>
      </template>
    </Column>
</DataTable>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props =defineProps<{
    incomingList:any
  }>()

const amount = (data:any) => {
if(data.total>0) return data.total.toFixed(2)
else return (-1*[data.category_50, data.category_30, data.category_20].find(item=>item!=0)).toFixed(2)
}
const icon = (data:any) =>{
  if(data.total>0) return 'pi-arrow-down-right'
  else return 'pi-arrow-up-right'
  
} 
const formattedDate =(data:string)=>{
  const date = new Date(data);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear().toString().slice(2)} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
const viewIcon = (data:any) =>{
  if(data.total>0) return 'pi-wallet'
  else {
    if(data.category_50 != 0) return 'pi-graduation-cap'
    if(data.category_30 != 0) return 'pi-thumbs-up-fill'
    if(data.category_20 != 0) return 'pi-gift'
  }
} 
</script>


<style scoped>
.incoming-icon{
  font-size: 9px;

}
.pi-wallet{
   color: rgb(176, 253, 176);
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
.pi-arrow-up-right{
  color:red
}
.pi-arrow-down-right{
  color: greenyellow
}
</style>
