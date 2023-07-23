<template>
  <div class="flex justify-center h-full py-10">
    <!-- Replace "max-w-xl" with other values for different sizes. -->
    <!-- Example: "max-w-gl", "max-w-2xl", "max-w-3xl", "max-w-4xl". Or remove it to have a "full" width-->
    <div class="max-w-xl w-full md:mt-24 mx-2">
      <div class="bg-white md:shadow-md mb-4 border md:border-0">
        <div
          class="bg-gray-100 px-4 py-4 text-center border-t-4 border-indigo-500 md:rounded-t"
        >
          <h1 class="font-semibold">{{ title }}</h1>
        </div>
        <div class="pt-6 px-4 md:px-8 pb-8 border-t"><slot></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
