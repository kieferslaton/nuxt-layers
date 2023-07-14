<template>
  <div
    class="mb-row flex w-full flex-col items-center rounded bg-white px-row py-12"
  >
    <h2 class="mb-8 text-4xl text-gray-dark">Personal Info</h2>
    <p class="mb-12 text-center">
      First, we need a small bit of personal information.
    </p>
    <InputText
      id="first-name"
      label="First Name"
      v-model="formData.firstName"
      classes="mb-8"
      @blur="v$.firstName.$touch"
      :errors="v$.firstName.$errors"
    />
    <span class="gray-dark">{{ v$.firstName.errors }}</span>
    <InputText
      id="last-name"
      label="Last Name"
      v-model="formData.lastName"
      classes="mb-8"
      @blur="v$.lastName.$touch"
      :errors="v$.lastName.$errors"
    />
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
    <InputAddress
      v-model="formData.address"
      :errors="addressErrors"
      classes="mb-8"
    />
    <InputDate
      id="dob"
      label="DOB"
      v-model="formData.dob"
      classes="mb-8"
      @blur="v$.dob.$touch"
      :errors="v$.dob.$errors"
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
});
</script>
