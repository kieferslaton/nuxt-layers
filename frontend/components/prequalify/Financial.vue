<template>
  <div class="mb-row flex w-full flex-col items-center rounded bg-white py-12">
    <h2 class="mx-row mb-8 text-center text-4xl text-gray-dark">
      Financial Info
    </h2>
    <p class="mx-row mb-12 text-center">
      Next, we need a few estimates about your budget and credit.
    </p>
    <hr class="w-full border-gray-lighter" />
    <InputRange
      id="credit_score"
      label="Estimated Credit Score"
      v-model="formData.creditScore"
      class="mx-row mb-4 py-8"
    />
    <hr class="w-full border-gray-lighter" />
    <div class="w-full px-row">
      <InputDollar
        id="monthly_budget"
        label="Estimated Monthly Budget"
        v-model="formData.monthlyBudget"
        classes="mb-4 w-full py-8"
        @blur="v$.monthlyBudget.$touch"
        :errors="v$.monthlyBudget.$errors"
        longLabel
      />
      <hr class="w-full border-gray-lighter" />
      <InputDollar
        id="monthly_wages"
        label="Monthly Wages (Before Taxes)"
        v-model="formData.monthlyWages"
        classes="w-full pb-2 pt-8"
        @blur="v$.monthlyWages.$touch"
        :errors="v$.monthlyWages.$errors"
        longLabel
      />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  v$: {
    type: Object,
    required: true,
  },
});
</script>
