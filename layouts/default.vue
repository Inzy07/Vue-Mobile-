<template>
  <section>
    <the-header />
    <nuxt nuxt-child-key="none" role="main" />
    <the-footer />
  </section>
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
