<template>
  <div
    class="input-container"
    :class="[classes, { error: errors?.street?.length }]"
  >
    <input
      type="text"
      id="autocomplete"
      name="address"
      required
      @blur="onBlur('street')"
      v-model="modelValue.street"
    />
    <label for="address">Address</label>
    <small v-if="errors?.street?.length"
      >{{ errors.street[0]?.$message }}.</small
    >
  </div>
  <div
    class="input-container"
    :class="[classes, { error: errors?.city?.length }]"
  >
    <input
      type="text"
      id="city"
      name="city"
      required
      @blur="onBlur('city')"
      v-model="modelValue.city"
    />
    <label for="city">City</label>
    <small v-if="errors?.city?.length">{{ errors.city[0]?.$message }}.</small>
  </div>
  <div class="flex w-full justify-between gap-6">
    <div
      class="input-container flex flex-grow flex-col"
      :class="[classes, { error: errors?.state?.length }]"
    >
      <v-select
        class="w-full"
        :options="states"
        v-model="modelValue.state"
      ></v-select>
      <label for="state">State</label>
      <small v-if="errors?.state?.length">{{
        errors.state[0]?.$message
      }}</small>
    </div>
    <div
      class="input-container flex flex-shrink basis-[70%] flex-col"
      :class="[classes, { error: errors?.zip?.length }]"
    >
      <input
        type="text"
        id="zip"
        name="zip"
        required
        @blur="onBlur('zip')"
        v-model="modelValue.zip"
      />
      <label for="zip">Zip</label>
      <small v-if="errors?.zip?.length">{{ errors.zip[0]?.$message }}</small>
    </div>
  </div>
</template>
<script setup>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const props = defineProps({
  modelValue: Object,
  classes: String,
  errors: Object,
});
const emits = defineEmits(["update:modelValue", "blur"]);

const onBlur = (key) => {
  emits("blur", key);
};

let autocomplete;

const city = ref("");
const state = ref("");
const zip = ref("");

onMounted(() => {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["geocode"],
    }
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    let streetAddress = "";
    let cityValue = "";
    let stateValue = "";
    let zipValue = "";

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];

      if (addressType === "locality") {
        cityValue = place.address_components[i]["long_name"];
      } else if (addressType === "administrative_area_level_1") {
        stateValue = place.address_components[i]["long_name"];
      } else if (addressType === "postal_code") {
        zipValue = place.address_components[i]["short_name"];
      } else if (addressType === "street_number") {
        streetAddress =
          streetAddress + place.address_components[i]["short_name"];
      } else if (addressType === "route") {
        streetAddress =
          streetAddress + " " + place.address_components[i]["long_name"];
      }
    }

    // Emit the updated model value.
    emits("update:modelValue", {
      street: streetAddress.trim(),
      city: cityValue,
      state: stateValue,
      zip: zipValue,
    });

    // Set the value of the autocomplete input to the selected street address
    document.getElementById("autocomplete").value = streetAddress.trim();
  });
});

const states = [
  { label: "Alaska", value: "Alaska" },
  { label: "Alabama", value: "Alabama" },
  { label: "Arkansas", value: "Arkansas" },
  { label: "Arizona", value: "Arizona" },
  { label: "California", value: "California" },
  { label: "Colorado", value: "Colorado" },
  { label: "Connecticut", value: "Connecticut" },
  { label: "District of Columbia", value: "District of Columbia" },
  { label: "Delaware", value: "Delaware" },
  { label: "Florida", value: "Florida" },
  { label: "Georgia", value: "Georgia" },
  { label: "Hawaii", value: "Hawaii" },
  { label: "Iowa", value: "Iowa" },
  { label: "Idaho", value: "Idaho" },
  { label: "IL", value: "Illinois" },
  { label: "Illinois", value: "Indiana" },
  { label: "Kansas", value: "Kansas" },
  { label: "Kentucky", value: "Kentucky" },
  { label: "Louisiana", value: "Louisiana" },
  { label: "Massachusetts", value: "Massachusetts" },
  { label: "Maryland", value: "Maryland" },
  { label: "Maine", value: "Maine" },
  { label: "Michigan", value: "Michigan" },
  { label: "Minnesota", value: "Minnesota" },
  { label: "Missouri", value: "Missouri" },
  { label: "Mississippi", value: "Mississippi" },
  { label: "Montana", value: "Montana" },
  { label: "North Carolina", value: "North Carolina" },
  { label: "North Dakota", value: "North Dakota" },
  { label: "Nebraska", value: "Nebraska" },
  { label: "New Hampshire", value: "New Hampshire" },
  { label: "New Jersey", value: "New Jersey" },
  { label: "New Mexico", value: "New Mexico" },
  { label: "Nevada", value: "Nevada" },
  { label: "New York", value: "NewYork" },
  { label: "Ohio", value: "Ohio" },
  { label: "Oklahoma", value: "Oklahoma" },
  { label: "Oregon", value: "Oregon" },
  { label: "Pennsylvania", value: "Pennsylvania" },
  { label: "Rhode Island", value: "Rhode Island" },
  { label: "South Carolina", value: "South Carolina" },
  { label: "South Dakota", value: "South Dakota" },
  { label: "Tennessee", value: "Tennessee" },
  { label: "Texas", value: "Texas" },
  { label: "Utah", value: "Utah" },
  { label: "Virginia", value: "Virginia" },
  { label: "Vermont", value: "Vermont" },
  { label: "Washington", value: "Washington" },
  { label: "Wisconsin", value: "Wisconsin" },
  { label: "West Virginia", value: "West Virginia" },
  { label: "Wyoming", value: "Wyoming" },
];
</script>
<style scoped lang="scss">
.input-container {
  position: relative;
  width: 100%;

  input {
    border: 1px solid #dddddd;
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 9999px;
    color: #333;

    &:focus {
      outline: 1px solid #3dbdff;

      & + label {
        color: #3dbdff;
      }
    }
  }

  label {
    position: absolute;
    font-size: 10px;
    padding: 0 0.5rem;
    color: #333;
    background-color: white;
    left: 1.5rem;
    transform: translateY(-50%);
  }
}
</style>
