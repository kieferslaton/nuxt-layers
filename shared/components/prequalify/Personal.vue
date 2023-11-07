<template>
  <div
    class="mb-row flex w-full flex-col rounded bg-white py-12 d:flex-row d:py-0"
  >
    <div
      class="w-full self-start px-row text-center d:sticky d:top-0 d:w-1/3 d:py-12 d:text-left"
    >
      <h2 class="mb-8 text-4xl text-gray-dark">Personal Info</h2>
      <p class="mb-12 d:pr-12">
        First, we need a small bit of personal information.
      </p>
    </div>
    <div class="w-full px-row d:w-2/3 d:border-l d:border-gray-lighter d:py-12">
      <div class="flex flex-col tl:flex-row tl:gap-6 d:mt-4">
        <InputText
          id="first-name"
          label="First Name"
          v-model="formData.firstName"
          classes="mb-8"
          @blur="v$.firstName.$touch"
          :errors="v$.firstName.$errors"
        />
        <InputText
          id="last-name"
          label="Last Name"
          v-model="formData.lastName"
          classes="mb-8"
          @blur="v$.lastName.$touch"
          :errors="v$.lastName.$errors"
        />
      </div>
      <div class="flex flex-col tl:flex-row tl:gap-6 d:mt-4">
        <InputPhone
          id="phone"
          label="Phone"
          v-model="formData.phone"
          classes="mb-8"
          @blur="v$.phone.$touch"
          :errors="v$.phone.$errors"
        />
        <InputEmail
          id="email"
          label="Email"
          v-model="formData.email"
          class="mb-8"
          @blur="v$.email.$touch"
          :errors="v$.email.$errors"
        />
      </div>
      <InputAddress
        v-model="formData.address"
        :errors="addressErrors"
        classes="mb-8"
      />
      <InputDate
        id="dob"
        label="DOB"
        v-model="formData.dob"
        classes="mb-4"
        @blur="v$.dob.$touch"
        :errors="v$.dob.$errors"
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
