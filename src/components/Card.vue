<template>
  <div class="
  p-6
  min-w-10
<!--  max-w-sm-->
  bg-white
  rounded-xl
  shadow-lg
  flex
  items-center
  space-x-4
  overflow-hidden">

    <div class="shrink-0">
      <img class="w-12 h-12" :src="imageSrcOrDefault" alt="Logo"/>
    </div>

    <div class="flex flex-col text-nowrap grow">
      <div class="text-xl font-medium text-black text-nowrap">{{ text.title }}</div>
      <p class="text-slate-500 text-nowrap">{{ text.brief }}</p>
    </div>

    <div class="
    col-span-3
    text-4xl
    font-extrabold
    flex
    justify-center
    items-center">
      <div class="
          font-sans
          subpixel-antialiased
          bg-clip-text
          text-transparent
          bg-gradient-to-r
          from-pink-500
          to-violet-500
          truncate">
        {{ cardQuantity }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

interface TextProps {
  title: string;
  brief: string;
}

const props: {
  text: TextProps,
  cardQuantity: string,
  imageSrc: string
} = defineProps<{
  text: TextProps;
  cardQuantity: string;
  imageSrc: string
}>();

const defaultImageSrc = "src/assets/svg/purchaseLedger.svg";
const imageSrcOrDefault = props.imageSrc ?? defaultImageSrc;

</script>
