<template>
  <div class="mb-row flex w-full flex-col items-center rounded bg-white py-12">
    <h2 class="mx-row mb-8 text-center text-4xl text-gray-dark">
      Home Preferences
    </h2>
    <p class="mx-row mb-12 text-center">
      {{
        preselect
          ? `Looks like you're interested in the
      ${preselect.name}. That's a great choice!`
          : `Tell us a
      bit about what you're looking for.`
      }}
    </p>
    <!-- Div with background image set to preselect.defaultImageUrl with a 40% opacity black overlay-->
    <div v-if="preselect" class="relative mb-12">
      <img :src="preselect.defaultImageUrl" class="w-full" />
      <div
        class="absolute left-0 top-0 flex h-full w-full flex-col justify-end bg-[rgba(0,0,0,0.4)] px-row pb-4"
      >
        <h3 class="self-start pt-12 text-center font-serif text-4xl text-white">
          {{ preselect.name }}
        </h3>
        <div class="flex w-full justify-between">
          <h4
            v-html="
              preselect.beds &&
              `${preselect.beds} Bed / ` +
                (preselect.baths && `${preselect.baths} Bath / `) +
                (preselect.width &&
                  preselect.length &&
                  `${preselect.width * preselect.length}ft<sup>2</sup>`)
            "
          ></h4>
          <h5 class="font-bold">{{ preselect.category }}</h5>
        </div>
      </div>
      <a
        href="/prequalify"
        class="absolute right-[5vw] top-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-error"
      >
        <Icon name="close" color="white" size="16" />
      </a>
    </div>
    <div v-if="preselect" class="mb-12 flex flex-col items-center">
      <small class="mb-3 text-sm font-bold text-gray-dark"
        >Not what you wanted?</small
      >
      <a href="/find-a-home" class="text-sm text-primary underline"
        >Change your selection.</a
      >
    </div>
    <hr class="w-full border-gray-lighter" />
    <InputCheckboxes
      label="Condition"
      :options="[
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Pre-Owned',
          value: 'pre-owned',
        },
        {
          label: 'Clearance',
          value: 'clearance',
        },
      ]"
      v-model="formData.condition"
      class="px-row py-8"
    />
    <hr class="w-full border-gray-lighter" />
    <InputCheckboxes
      label="Type"
      :options="[
        {
          label: 'Single',
          value: 'single',
        },
        {
          label: 'Double',
          value: 'double',
        },
      ]"
      v-model="formData.type"
      class="px-row py-8"
    />
    <hr class="w-full border-gray-lighter" />
    <InputRadio
      label="Do You Need Land?"
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
      v-model="formData.land"
      class="px-row py-12"
    />
    <hr class="w-full border-gray-lighter" />
    <InputRadio
      label="Estimated Date of Purchase"
      :options="[
        {
          label: 'Less Than 1 Month',
          value: 'less-than-1-month',
        },
        {
          label: '1-6 Months',
          value: '1-6-months',
        },
        {
          label: 'Longer Than 6 Months',
          value: 'longer-than-6-months',
        },
      ]"
      v-model="formData.purchaseDate"
      class="px-row pb-6 pt-12"
    />
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
  preselect: {
    type: Object,
    default: {},
  },
});
</script>
