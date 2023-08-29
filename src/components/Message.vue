<template>
  <div class="message">
    <span v-if="!sender">{{ name }} </span>
    <div class="flex items-center" :class="sender ? 'flex-row-reverse' : ''">
      <div>
        <div class="flex items-center justify-center rounded-full bg-red-100 w-10 h-10">
          {{ props.name?.at(0)?.toUpperCase() }}
        </div>
      </div>
      <div class="text" :class="sender ? 'bg-blue-300' : 'bg-gray-700'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
  },
  sender: {
    type: Boolean,
  },
})
</script>

<style>
.message {
  @apply my-2;
}

.message span {
  @apply ml-12;
  @apply text-xs;
  @apply text-gray-500;
}

.message .text {
  @apply mx-2;
  @apply p-2;
  @apply rounded-lg;
  @apply text-white max-w-sm  break-all;
}
</style>
