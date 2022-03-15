<template>
  <v-form>
    <div
      v-for="{ as, name, label, ...attrs } in schema.fields"
      :key="name"
    >
      <label :for="name">{{ label }}</label>
      <v-field
        :id="name"
        :as="as"
        :name="name"
        v-bind="attrs"
      ></v-field>
      <ErrorMessage
        ge
        :name="name"
      ></ErrorMessage>
    </div>

    <button type="submit">
      Submit
    </button>
  </v-form>
</template>

<script>
export default {
  name: 'DynamicForm',
  props: {
    schema: {
      type: Object,
      required: true,
    }
  }
}
</script>