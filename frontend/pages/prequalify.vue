<template>
    <div class="px-row border-t border-primary-light pt-6 pb-20">
        <Breadcrumb :title="toTitle(route.name)" />
        <div class="bg-white mb-row w-full flex flex-col items-center px-row py-12 rounded">
            <h2 class="text-4xl text-gray-dark mb-8">Personal Info</h2>
            <p class="text-center mb-12">First, we need a small bit of personal information.</p>
            <InputText id="first-name" label="First Name" v-model="formData.firstName" class="mb-8" />
            <InputText id="last-name" label="Last Name" v-model="formData.lastName" class="mb-8" />
            <InputPhone id="phone" label="Phone" v-model="formData.phone" class="mb-8" />
            <InputEmail id="email" label="Email" v-model="formData.email" class="mb-8" />
            <InputAddress v-model="formData.address" class="mb-8" />
            <InputDate id="dob" label="DOB" v-model="formData.dob" class="mb-8" />
        </div>
        <div class="bg-white mb-row w-full flex flex-col items-center py-12 rounded">
            <h2 class="text-4xl text-gray-dark mb-8 text-center mx-row">Financial Info</h2>
            <p class="text-center mb-12 mx-row">Next, we need a few estimates about your budget and credit.</p>
            <hr class="w-full border-gray-lighter" />
            <InputRange id="credit_score" label="Estimated Credit Score" v-model="formData.creditScore"
                class="py-8 mx-row mb-4" />
            <hr class="w-full border-gray-lighter" />
            <div class="w-full px-row">
                <InputDollar id="monthly_budget" label="Estimated Monthly Budget" v-model="formData.monthlyBudget"
                    class="py-8 mb-4 w-full" longLabel />
                <hr class="w-full border-gray-lighter" />
                <InputDollar id="monthly_wages" label="Monthly Wages (Before Taxes)" v-model="formData.monthlyWages"
                    class="pt-8 pb-2 w-full" longLabel />
            </div>
        </div>
        <div class="bg-white mb-row w-full flex flex-col items-center py-12 rounded">
            <h2 class="text-4xl text-gray-dark mb-8 text-center mx-row">Home Preferences</h2>
            <p class="text-center mb-12 mx-row">Tell us a bit about what you're looking for.</p>
            <hr class="w-full border-gray-lighter" />
            <InputCheckboxes label="Condition" :options="[{
                label: 'New',
                value: 'new'
            }, {
                label: 'Pre-Owned',
                value: 'pre-owned'
            }, {
                label: 'Clearance',
                value: 'clearance'
            }]" v-model="formData.condition" class="py-8 px-row" />
            <hr class="w-full border-gray-lighter" />
            <InputCheckboxes label="Type" :options="[{
                label: 'Single',
                value: 'single'
            }, {
                label: 'Double',
                value: 'double'
            }]" v-model="formData.type" class="py-8 px-row" />
            <hr class="w-full border-gray-lighter" />
            <InputRadio label="Do You Need Land?" :options="[{
                label: 'Yes',
                value: 'yes'
            }, {
                label: 'No',
                value: 'no'
            }]" v-model="formData.land" class="py-12 px-row" />
            <hr class="w-full border-gray-lighter" />
            <InputRadio label="Estimated Date of Purchase" :options="[{
                label: 'Less Than 1 Month',
                value: 'less-than-1-month'
            },
            {
                label: '1-6 Months',
                value: '1-6-months'
            },
            {
                label: 'Longer Than 6 Months',
                value: 'longer-than-6-months'
            }]" v-model="formData.purchaseDate" class="pt-12 pb-6 px-row" />
        </div>
        <div class="bg-white mb-row w-full flex flex-col items-center py-12 rounded">
            <h2 class="text-4xl text-gray-dark mb-8 text-center mx-row">Sales and Marketing</h2>
            <p class="text-center mb-12 mx-row">You're almost done!</p>
            <hr class="w-full border-gray-lighter" />
            <InputRadio label="Are you working with a sales person?" :options="[{
                label: 'Yes',
                value: 'yes'
            }, {
                label: 'No',
                value: 'no'
            }]" v-model="formData.salesPerson" class="py-12 px-row" />
            <hr class="w-full border-gray-lighter" />
            <InputSelect label="How did you hear about us?" :options="[
                {
                    label: 'Google',
                    value: 'google'
                }, {
                    label: 'Facebook',
                    value: 'facebook'
                }, {
                    label: 'Instagram',
                    value: 'instagram'
                }, {
                    label: 'Twitter',
                    value: 'twitter'
                }, {
                    label: 'YouTube',
                    value: 'youtube'
                }, {
                    label: 'Referral',
                    value: 'referral'
                }, {
                    label: 'Other',
                    value: 'other'
                }]" v-model="formData.referral" class="py-12 px-row" />
            <hr class="w-full border-gray-lighter" />
            <InputCheckbox
                label="Sign up for our email newsletter and receive marketing texts or emails with latest specials, offers, and news."
                v-model="newsletter" class="pt-12 px-row" />
        </div>
        <button class="btn btn-secondary btn-full mb-8">Submit Request</button>
        <small class="text-[0.75rem]">
            * For Marketing Text Messages - standard data rates may apply.
            <br />
            <br />
            ** By submitting this application, you are granting us permission to pull your credit report if necessary, in
            order to help us qualify you for a loan.
            <br />
            <br />
            *** Monthly payments are based on a lender-published interest rate of 7.25% (7.58% APR) with 10% down for 300
            months. For example: APR is calcuated with a sales price of $150,000 and $15,000 down payment, with a loan
            amount of $135,000 and $4,050 in fees. We are not the lender, finance company, originator, or bank and make no
            credit decisions. The published monthly payments are for example purposes only. Your monthly payments will vary
            based on lender, credit score, credit history, interest rate, down payment, loan amount, originating fees,
            closing costs, and/or other underwriting requirements of the lender. The actual APR and monthly payment will
            vary based on the lender’s fees, points, loan amount, finance charges, and other factors.
        </small>
    </div>
</template>
<script setup>
const route = useRoute();
const formData = reactive({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: {
        street: '',
        city: '',
        state: '',
        zip: ''
    },
    dob: '',
    creditScore: 600,
    monthlyBudget: '0',
    monthlyWages: '0',
    condition: [],
    type: [],
    land: 'no',
    purchaseDate: 'less-than-1-month',
    salesPerson: 'no',
    referral: '',
    newsletter: false
})

watch(formData, (newVal) => {
    console.log(newVal)
})
</script>