<template>
  <div class="container">{{ $auth.user }}</div>
</template>

<script>
export default {
  middleware: "auth",
}
</script>

<style></style>
