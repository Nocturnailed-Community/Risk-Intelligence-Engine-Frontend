<template>
  <div class="container-fluid">
    <div class="row min-vh-100">
      <div class="col-md-3 bg-light d-none d-md-flex flex-column justify-content-between p-4 border-end">
        <SideBar />
      </div>
      <div class="col-md-9 col-12  mt-md-0 mt-5">
        <Header />
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/baseComponent/header.vue";
import SideBar from "~/components/baseComponent/sideBar.vue";

export default {
  components: {
    Header,
    SideBar,
  },
};
</script>
