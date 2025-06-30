<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <FormUserRegister />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormUserRegister from "~/components/registerComponent/formUserRegister.vue";

definePageMeta({
  layout: "login-sid",
  middleware: ["is-guest"],
});

export default defineComponent({
  components: {
    FormUserRegister,
  },
});
</script>
