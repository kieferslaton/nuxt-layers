<template>
  <div
    class="mb-row flex w-full flex-col rounded bg-white py-12 d:flex-row d:py-0"
  >
    <div
      class="w-full self-start text-center d:sticky d:top-0 d:w-1/3 d:py-12 d:text-left"
    >
      <h2 class="mx-row mb-8 text-4xl text-gray-dark">Sales and Marketing</h2>
      <p class="mx-row mb-12">You're almost done!</p>
      <hr class="w-full border-gray-lighter d:hidden" />
    </div>
    <div
      class="w-full text-center d:w-2/3 d:border-l d:border-gray-lighter d:py-12"
    >
      <InputRadio
        label="Are you working with a sales person?"
        :options="[
          {
            label: 'Yes',
            value: 'yes',
          },
          {
            label: 'No',
            value: 'no',
          },
        ]"
        v-model="formData.salesPerson"
        class="px-row py-8"
      />
      <hr class="w-full border-gray-lighter" />
      <InputSelect
        label="How did you hear about us?"
        :options="[
          {
            label: 'Google',
            value: 'google',
          },
          {
            label: 'Facebook',
            value: 'facebook',
          },
          {
            label: 'Instagram',
            value: 'instagram',
          },
          {
            label: 'Twitter',
            value: 'twitter',
          },
          {
            label: 'YouTube',
            value: 'youtube',
          },
          {
            label: 'Referral',
            value: 'referral',
          },
          {
            label: 'Other',
            value: 'other',
          },
        ]"
        v-model="formData.referral"
        class="px-row py-8"
      />
      <hr class="w-full border-gray-lighter" />
      <InputCheckbox
        label="Sign up for our email newsletter and receive marketing texts or emails with latest specials, offers, and news."
        v-model="formData.newsletter"
        class="px-row pt-12"
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
