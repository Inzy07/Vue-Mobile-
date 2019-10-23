<template>
 <v-ons-page>
    <the-header />
    <nuxt nuxt-child-key="none" role="main" />
    <the-footer />
 </v-ons-page>
</template>

<script>
import TheHeader from "@/components/header";
import TheFooter from "@/components/footer";

export default {
  components: {
    TheHeader,
    TheFooter
  },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host;

    return {
      link: [
        // We use $route.path since we don't use query parameters
        { rel: "canonical", href: `https://${host}${this.$route.path}` }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "../assets/scss/style.scss";
</style>
