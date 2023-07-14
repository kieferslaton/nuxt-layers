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
      <div
        class="mb-row flex w-full flex-col items-center rounded bg-white py-12"
      >
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
      <div
        class="mb-row flex w-full flex-col items-center rounded bg-white py-12"
      >
        <h2 class="mx-row mb-8 text-center text-4xl text-gray-dark">
          Home Preferences
        </h2>
        <p class="mx-row mb-12 text-center">
          Tell us a bit about what you're looking for.
        </p>
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
      <div
        class="mb-row flex w-full flex-col items-center rounded bg-white py-12"
      >
        <h2 class="mx-row mb-8 text-center text-4xl text-gray-dark">
          Sales and Marketing
        </h2>
        <p class="mx-row mb-12 text-center">You're almost done!</p>
        <hr class="w-full border-gray-lighter" />
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
          class="px-row py-12"
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
          class="px-row py-12"
        />
        <hr class="w-full border-gray-lighter" />
        <InputCheckbox
          label="Sign up for our email newsletter and receive marketing texts or emails with latest specials, offers, and news."
          v-model="formData.newsletter"
          class="px-row pt-12"
        />
      </div>
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
  type: [],
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

const addressErrors = computed(() => ({
  street: v$.street,
  city: v$.city,
  state: v$.state,
  zip: v$.zip,
}));

const onAddressBlur = (field) => {
  v$.address[field].$touch();
};

watch(v$, (newVal) => {
  console.log(newVal);
});
</script>
