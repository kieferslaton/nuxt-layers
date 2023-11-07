<template>
  <div
    class="mb-row flex w-full flex-col rounded bg-white py-12 d:flex-row d:py-0"
  >
    <div
      class="w-full self-start text-center d:sticky d:top-0 d:w-1/3 d:py-12 d:text-left"
    >
      <h2 class="mx-row mb-8 text-4xl text-gray-dark">Financial Info</h2>
      <p class="mx-row mb-12">
        Next, we need a few estimates about your budget and credit.
      </p>
      <hr class="w-full border-gray-lighter d:hidden" />
    </div>
    <div
      class="w-full text-center d:w-2/3 d:border-l d:border-gray-lighter d:py-12 d:text-left"
    >
      <InputRange
        id="credit_score"
        label="Estimated Credit Score"
        v-model="formData.creditScore"
        class="mb-4 py-8"
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
      </div>
      <hr class="w-full border-gray-lighter" />
      <div class="w-full px-row">
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
