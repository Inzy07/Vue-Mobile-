<template>
  <!--Header Section Starts-->
  <section>
    <!--Bootstrap Vue Nav-->
    <div class="container-fluid header-bg shadow bg-white p-0 fixed-top py-2 py-lg-0">
      <b-navbar toggleable="lg" class="p-0">
       <b-navbar-brand class="col-2 col-sm-2 d-block d-lg-none p-0 mr-0">
          <b-navbar-toggle target="nav-collapse">
            <svg role="img" width="28px" height="28px">
              <use xlink:href="~static/images/defs.svg#img-ellipses" />
            </svg>
          </b-navbar-toggle>
        </b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav class="col-lg-5 navigation">
          <b-navbar-nav class="pt-2">
            <li>
              <nuxt-link class="nav-link text-uppercase text-dark font-weight-bold" to="/">Home</nuxt-link>
            </li>
            <li>
              <router-link
                class="nav-link text-uppercase text-dark font-weight-bold"
                to="/buy-house-in-dubai"
              >Communities</router-link>
            </li>
            <li>
              <nuxt-link
                class="nav-link text-uppercase text-dark font-weight-bold"
                to="/houses-for-rent"
              >For Rent</nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="nav-link text-uppercase text-dark font-weight-bold"
                to="/houses-for-sale"
              >For Sale</nuxt-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
        <b-navbar-brand href="/" class="logo col-lg-4 col-sm-9 col-8 mr-0 mt-2">
          <img src="~static/images/logo2.png" class="w-50" />
        </b-navbar-brand>
        <b-navbar-brand class="col-2 col-sm-1 p-0 d-sm-block d-lg-none mr-0 pl-2">
          <a href="javascript:void(0)" @click="formShow" class="d-block h-100">
            <svg role="img" width="28px" height="28px">
              <use xlink:href="~static/images/defs.svg#img-search-head" />
            </svg>
          </a>
        </b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="col-lg-3 p-0 header-rt text-right d-none d-lg-block">
          <a
            href="javascript:void(0)"
            @click="showModal"
            ref="btnShow"
            class="d-block bg-primary text-center text-white text-uppercase"
          >Enquire Now</a>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <!--Bootstrap Vue Nav-->
    <enquireModal />
  </section>
  <!--Header Section Ends-->
</template>
<script>
import enquireModal from "~/components/enquireModal.vue";
import * as Cookie from "js-cookie";
export default {
  name: "TheHeader",
  components: {
    enquireModal
  },
  mounted:function(){
    if(this.$route.query.channel_id){
      Cookie.set('channel_id', this.$route.query.channel_id, { expires: null, path: '/' });
    }
    let ch = Cookie.get("channel_id")? Cookie.get("channel_id"): this.$store.state.channel;
    this.$store.commit('SET_CHANNELID',ch);
    if(this.$route.query.adword_id){
      Cookie.set('adword_id', this.$route.query.adword_id, { expires: null, path: '/' });
    }
  },
  data() {
    return {};
  },
  computed: {
    adword: function() {
      return Cookie.get("adword_id") ? Cookie.get("adword_id") : null;
    },
    website: function() {
      return Cookie.get("website_id")
        ? Cookie.get("website_id")
        : config.websiteId;
    },
    session: function() {
      return Cookie.get("session_id") ? Cookie.get("session_id") : null;
    }
  },
  methods: {
    formShow() {
      document.getElementById("cont-Form").classList.add("animateForm");
    },
    showModal() {
      this.$root.$emit("bv::show::modal", "modal-center", "#btnShow");
    }
  }
};
</script>
