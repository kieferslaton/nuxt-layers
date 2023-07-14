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
      :value="modelValue.street"
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
      :value="modelValue.city"
    />
    <label for="city">City</label>
    <small v-if="errors?.city?.length">{{ errors.city[0]?.$message }}.</small>
  </div>
  <div class="flex justify-between gap-6">
    <div
      class="input-container basis_[70%]"
      :class="[classes, { error: errors?.state?.length }]"
    >
      <input
        type="text"
        id="state"
        name="state"
        required
        @blur="onBlur('state')"
        :value="modelValue.state"
      />
      <label for="state">State</label>
      <small v-if="errors?.state?.length"
        >{{ errors.state[0]?.$message }}.</small
      >
    </div>
    <div
      class="input-container"
      :class="[classes, { error: errors?.zip?.length }]"
    >
      <input
        type="text"
        id="zip"
        name="zip"
        required
        @blur="onBlur('zip')"
        :value="modelValue.zip"
      />
      <label for="zip">Zip</label>
      <small v-if="errors?.zip?.length">{{ errors.zip[0]?.$message }}.</small>
    </div>
  </div>
</template>
<script setup>
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
        stateValue = place.address_components[i]["short_name"];
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
