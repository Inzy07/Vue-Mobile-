<template>
  <section>
    <!--Banner Section Starts-->
    <section>
      <div class="container-fluid listing-bg px-0 position-relative">
        <div
          class="search-bg position-absolute d-flex flex-row justify-content-center align-items-center h-100"
        >
          <div class="row w-100">
            <div class="col-lg-12 text-center">
              <breadcrumb :items="breaditems"/>
            </div>
            <SearchForm />
          </div>
        </div>
      </div>
    </section>
    <!--Banner Section Ends-->

    <!--Communities Section Starts-->
    <section>
      <div class="container-fluid comm-det-pg px-0 bg-light position-relative">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 py-5 text-center">
              <h1 class="text-dark">Dubai's Communities</h1>
            </div>
            <div class="col-lg-12 pb-3 text-center">
              <lazy-wrapper :loading="loading">
                <transition :name="transition" mode="out-in">
                  <transition-group tag="div" name="item" class="row">
                    <project
                      v-for="project in Projects"
                      :key="project.id"
                      :item="project"
                      class="col-lg-4 comm-det-col mb-4"
                    />
                  </transition-group>
                </transition>
              </lazy-wrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--Communities Section Ends-->
  </section>
</template>

<script>
import SearchForm from "~/components/SearchForm.vue";
import Project from "~/components/Project.vue";
import breadcrumb from "~/components/breadcrumb";
import LazyWrapper from "~/components/LazyWrapper";
import { feeds, config } from "~/common/api";

export default {
  components: {
    SearchForm,
    breadcrumb,
    Project,
    LazyWrapper
  },
  data() {
    return {
      transition: "slide-right",
      breaditems:[ {
            text: 'Home',
            to: '/'
          },
          {
            text:'Communities',
            to:'/communities'
          }]
    };
  },
  computed: {
    projectData() {
      return this.$store.state.feeds["BuildingList"][
        "/ALL/ALL/" + config.websiteId + "/ALL/Villa/ALL"
      ];
    },
    Projects() {
      return this.projectData.map(
        id => this.$store.state.items["BuildingList"][id]
      );
      // return false
    },
    loading() {
      return this.Projects.length === 0;
    }
  },
  fetch({
    store,
    params: {
      feed = "BuildingList",
      filters = "/ALL/ALL/" + config.websiteId + "/ALL/Villa/ALL"
    }
  }) {
    return store.dispatch("FETCH_FEED", { feed, filters });
  },
  head() {
    return {
      title: `Top Villa Communities in Dubai - Ready & Off Plan Villas in Dubai`,
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: `Top Villa Communities in Dubai - Ready & Off Plan Villas in Dubai`
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content:`Check out all villa communities in Dubai with their complete information including prices, exclusive images, floor plans and location map. `
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          property: "og:site_name",
          content: "Luxury Villas Dubai"
        },
        {
          hid: "description",
          name: "description",
          content: `Check out all villa communities in Dubai with their complete information including prices, exclusive images, floor plans and location map. `
        },

      ]
    }
  },
  methods: {}
};
</script>
