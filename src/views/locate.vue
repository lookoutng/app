<template>
<span>
    <div v-if="field1" class="alert alert-info">
        Current Value: {{field1}}
    </div>

    <place-autocomplete-field v-model="field1" placeholder="Enter an an address, zipcode, or location" label="Address" name="field1" api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"></place-autocomplete-field>
</span>
</template>



<script>
// <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>

import Vue from 'vue'
import VuePlaceAutocomplete from 'vue-place-autocomplete'

Vue.use(VuePlaceAutocomplete);

export default{
  name:'locate'
};
</script>
