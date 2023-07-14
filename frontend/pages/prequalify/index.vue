<template>
  <div class="border-t border-primary-light px-row pb-20 pt-6">
    <Breadcrumb :title="toTitle(route.name)" />
    <div
      v-if="submitted"
      class="mb-row flex w-full flex-col items-center rounded bg-white px-row py-12"
    >
      <h2 class="mb-8 text-4xl text-gray-dark">Thank You</h2>
      <p class="mb-12 text-center">
        Thanks for your submission! One of our sales representatives will be in
        touch shortly.
      </p>
    </div>
    <div v-else>
      <PrequalifyPreferences
        :formData="formData"
        :v$="v$"
        :preselect="preselect"
        v-if="preselect"
      />
      <PrequalifyPersonal :formData="formData" :v$="v$" />
      <PrequalifyFinancial :formData="formData" :v$="v$" />
      <PrequalifyPreferences :formData="formData" :v$="v$" v-if="!preselect" />
      <PrequalifyMarketing :formData="formData" :v$="v$" />
      <button class="btn btn-secondary btn-full mb-8" @click.prevent="submit">
        Submit Request
      </button>
    </div>
    <small class="text-[0.75rem]">
      * For Marketing Text Messages - standard data rates may apply.
      <br />
      <br />
      ** By submitting this application, you are granting us permission to pull
      your credit report if necessary, in order to help us qualify you for a
      loan.
      <br />
      <br />
      *** Monthly payments are based on a lender-published interest rate of
      7.25% (7.58% APR) with 10% down for 300 months. For example: APR is
      calcuated with a sales price of $150,000 and $15,000 down payment, with a
      loan amount of $135,000 and $4,050 in fees. We are not the lender, finance
      company, originator, or bank and make no credit decisions. The published
      monthly payments are for example purposes only. Your monthly payments will
      vary based on lender, credit score, credit history, interest rate, down
      payment, loan amount, originating fees, closing costs, and/or other
      underwriting requirements of the lender. The actual APR and monthly
      payment will vary based on the lender’s fees, points, loan amount, finance
      charges, and other factors.
    </small>
  </div>
</template>
<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const route = useRoute();
const preselect = ref(null);
if (route.query?.home) {
  const { data } = await useFetch(`/api/home?name=${route.query.home}`);
  preselect.value = data.value;
}
const formData = reactive({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  dob: "",
  creditScore: 600,
  monthlyBudget: null,
  monthlyWages: null,
  condition: [],
  type: preselect.value ? [preselect.value.category.toLowerCase()] : [],
  land: "no",
  purchaseDate: "less-than-1-month",
  salesPerson: "no",
  referral: "",
  newsletter: false,
});

const rules = {
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  phone: {
    required,
  },
  email: {
    required,
  },
  address: {
    street: {
      required,
    },
    city: {
      required,
    },
    state: {
      required,
    },
    zip: {
      required,
    },
  },
  dob: {
    required,
  },
  creditScore: {
    required,
  },
  monthlyBudget: {
    required,
  },
  monthlyWages: {
    required,
  },
  land: {
    required,
  },
  purchaseDate: {
    required,
  },
  salesPerson: {
    required,
  },
  newsletter: {
    required,
  },
};

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

watch(formData, (newVal) => {
  console.log(newVal);
});
</script>
