<script setup>
const minimize = () => window.electronAPI.minimize();
const maximize = () => window.electronAPI.maximize();
const closeApp = () => window.electronAPI.close();

import logoUrl from './assets/images/localboxd.png'
</script>

<template>
  <header class="bg-[#2c3440] text-white h-10 flex items-center justify-between px-4 titlebar-drag flex-shrink-0">
      
      <div class="flex items-center gap-2">
          <img :src="logoUrl" alt="localboxd-logo" class="h-5 w-5">
          
          <span class="text-xl tracking-tighter" 
                style="font-family: 'Inter', sans-serif; font-weight: 900; letter-spacing: 0em; text-transform: lowercase;">
              Localboxd
          </span>
      </div>

      <div class="flex items-center gap-2 no-drag">
          <button @click="minimize" class="p-1 hover:bg-gray-700 rounded transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
          </button>

          <button @click="maximize" class="p-1 hover:bg-gray-700 rounded transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
          </button>

          <button @click="closeApp" class="p-1 hover:bg-red-600 rounded transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
          </button>
      </div>
  </header>

  <div class="flex-1 overflow-auto flex items-center justify-center p-4">

  </div>
</template>