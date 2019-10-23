<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-header>Transitions</v-ons-list-header>
      <v-ons-list-item v-for="animation in animations" :key="animation"
        modifier="chevron"
      >
        {{ animation }}
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      animations: ['none', 'default', 'slide-ios', 'slide-md', 'lift-ios', 'lift-md', 'fade-ios', 'fade-md']
    };
  },
  methods: {
  }
};
</script>