<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <!-- <div class="card-body p-4"> -->
            <slot />
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  middleware: ['isGuest'],
}
</script>

<style scoped>
.card {
  max-width: 400px;
  margin: 50px auto;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
</style>
