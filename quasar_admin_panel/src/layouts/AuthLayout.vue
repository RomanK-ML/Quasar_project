<template>
  <q-layout class="bg-dark" width="100%" hight="100%">
    <router-view />
  </q-layout>
</template>

<script>
import db from "src/db";

export default {
  name: "auth-layout",
};
</script>
