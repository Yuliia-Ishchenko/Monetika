<template>
   <div class="keypad">
      <div class='btn-close'>
         <Button icon="pi pi-times" severity="secondary" aria-label="Close" size="small" @click="closeKeypad"/>
      </div>
      
     <div class="display">
       Kč {{ formattedValue }}
     </div>
     <div class="keys">
       <button 
         v-for="key in keys" 
         :key="key" 
         @click="onKeyPress(key)"
         class="key"
       >
         {{ key === '.' ? '.' : key }}
       </button>
       <button class="key delete" @click="deleteLast">⌫</button>
     </div>
     <button class="confirm" @click="confirmInput" :disabled="value === ''">✔</button>
   </div>
 </template>
 
 <script lang="ts" setup>
 import Button from 'primevue/button';
 import {  ref, computed } from 'vue';
 
const emits = defineEmits(['send-value', 'close'])

 const value = ref('');
 
   const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0];

   const onKeyPress = (key: number | string) => {
      if (key === '.' && value.value.includes('.')) return; // Prevent multiple dots
      value.value += key.toString();
   };

   const deleteLast = () => {
      value.value = value.value.slice(0, -1);
   };

   const confirmInput = () => {
      console.log(`Confirmed value: ${value.value}`);
      emits('send-value', value.value)
   };
   const closeKeypad = () => {
      emits('close');
   };
   const formattedValue = computed(() => {
      return value.value || '0';
   });
 </script>
 
 <style scoped>
 .btn-close{
   width: 100%;
   text-align: right
 }
 .keypad {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   font-family: Arial, sans-serif;
   background-color: black;
   color: white;
   padding: 20px;
   border-radius: 10px;
   margin: 1rem 0
 }
 
 .display {
   font-size: 24px;
   margin-bottom: 20px;
   text-align: center;
   width: 100%;
 }
 
 .keys {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 10px;
   margin-bottom: 10px;
 }
 
 .key {
   background-color: #333;
   color: white;
   border: none;
   padding: 10px 30px;
   font-size: 16px;
   border-radius: 3px;
   cursor: pointer;
 }
 
 .key.delete {
   background-color: #ef4444;
   color: white;
   font-weight:600;
   font-size: 24px;
   padding: 0
 }
 
 .key:active {
   background-color: #555;
 }
 
 .confirm {
   background-color: #a5f3fc;
   color: black;
   border: none;
   padding: 8px 20px;
   font-size: 20px;
   border-radius: 5px;
   cursor: pointer;
 }
 
 .confirm:active {
   background-color: #a5f3fc;
 }
 </style>
 