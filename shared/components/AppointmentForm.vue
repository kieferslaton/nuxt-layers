<template>
  <Card classes="bg-white flex flex-col items-center px-row pt-12 pb-row">
    <div v-if="submitted" class="mb-row flex w-full flex-col items-center rounded bg-white px-row py-12 text-gray-dark">
      <h2 class="mb-8 text-4xl text-gray-dark">Thank You</h2>
      <p class="mb-12 text-center">
        Thanks for your submission! One of our sales representatives will be in
        touch shortly.
      </p>
    </div>
    <div v-else class="flex w-full flex-col items-center">
      <h2 class="mb-8 text-4xl text-gray-dark">Schedule Appointment</h2>
      <p class="mx-row2x mb-12 text-center text-gray-dark">
        Fill out this short form and I'll respond in no time!
      </p>
      <form class="w-full">
        <InputText id="first-name" label="First Name" v-model="formData.firstName" classes="mb-8" />
        <InputText id="last-name" label="Last Name" v-model="formData.lastName" classes="mb-8" />
        <InputPhone id="phone" label="Phone" v-model="formData.phone" classes="mb-12" />
        <div class="flex w-full gap-4">
          <InputDate id="date" label="Date" v-model="formData.date" classes="mb-12" />
          <InputTime id="time" label="Time" v-model="formData.time" classes="mb-12" />
        </div>
        <InputRadio label="Preferred Method of Contact" :options="[
          {
            label: 'Phone',
            value: 'phone',
          },
          {
            label: 'Text',
            value: 'text',
          },
        ]" v-model="formData.contactMethod" class="mb-12 px-row" />
        <InputTextarea id="last-name" label="Message" v-model="formData.message" classes="mb-8" :lines="6" />
        <button class="btn btn-secondary btn-full" @click.prevent="submit">
          Submit Message
        </button>
      </form>
    </div>
  </Card>
</template>
<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const formData = reactive({
  firstName: "",
  lastName: "",
  phone: "",
  contactMethod: "",
  message: "",
});

const rules = reactive({
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  phone: {
    required,
  },
  contactMethod: {
    required,
  },
  message: {
    required,
  },
});

const v$ = useVuelidate(rules, formData);

const submitted = ref(false);

const submit = async () => {
  const result = await v$.value.$validate();
  console.log(result);
  if (!result) {
    return;
  }
  submitted.value = true;
  console.log(formData);
};
</script>
