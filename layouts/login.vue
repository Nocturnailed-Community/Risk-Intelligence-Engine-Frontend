<template>
    <div> 
    <div class="wrapper">
      <div class="main">
        <main>
          <div>
            <NuxtPage />
          </div>
        </main>
      </div>
    </div></div>
  </template>
<script>
export default{
  middleware: ['isGuest'],
}
</script>