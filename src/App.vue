<template>
  <div id="app">
    <notifications group="foo" />
    <Form />
  </div>
</template>

<script>
import Form from "./components/Form.vue";

export default {
  name: "App",
  components: {
    Form,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 24px;
  box-sizing: border-box;
  max-width: 850px;
  margin: 0 auto;
}

html,
body {
  background-color: #fafafa;
  height: 100%;
}

* {
  box-sizing: border-box;
}
</style>
