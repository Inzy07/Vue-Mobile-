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
            <div class="col-lg-12 text-center  py-3">
              <p class="text-dark">{{Properties.length}} Properties Found</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--Banner Section Ends-->
    <!--Communities Section Starts-->
    <section>
      <div class="container-fluid listings py-2 px-0 bg-light position-relative">
        <div class="container">
          <lazy-wrapper :loading="loading">
            <transition :name="transition" mode="out-in">
              <transition-group tag="div" name="item" class="row">
                <property
                  v-for="property in Properties"
                  :key="property.id"
                  :item="property"
                  :grid="6"
                  class="col-lg-10 offset-lg-1 py-3 text-center listing-cont"
                />
              </transition-group>
            </transition>
          </lazy-wrapper>
        </div>
      </div>
    </section>
    <!--Communities Section Ends-->
  </section>
</template>

<script>
import SearchForm from "~/components/SearchForm.vue";
import breadcrumb from "~/components/breadcrumb";
import Property from "~/components/Property.vue";
import LazyWrapper from "~/components/LazyWrapper";
import { feeds, config } from "~/common/api";

export default {
  components: {
    SearchForm,
    breadcrumb,
    Property,
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
            text:'Villa For Rent',
            to:'/houses-for-rent'
          }]
    };
  },
  computed: {
    propertyData() {
      return this.$store.state.feeds["PropertyList"][
        "/Rent/ALL/ALL/ALL/61/N/ALL/ALL/ALL/ALL/ALL/ALL"
      ];
    },
    Properties() {
      if (this.propertyData) {
        return this.propertyData.map(
          id => this.$store.state.items["PropertyList"][id]
        );
      } else {
        return false;
      }
      //return false
    },
    loading() {
      return this.Properties.length === 0;
    }
  },
  fetch({ store }) {
    return store
      .dispatch("FETCH_FEED", {
        feed: "PropertyList",
        filters: "/Rent/ALL/ALL/ALL/61/N/ALL/ALL/ALL/ALL/ALL/ALL"
      })
      .then(res => {
        return store.dispatch("FETCH_FEED", {
          feed: "BuildingList",
          filters: "/ALL/ALL/" + config.websiteId + "/ALL/Villa/ALL"
        });
      });
  },
   head() {
    return {
      title: `Villas & Houses for Rent in Dubai - Dubai Villas`,
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: `Villas & Houses for Rent in Dubai - Dubai Villas`
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content:`Villas are available for rent in Dubai. Find out all the details including rent prices, exclusive images . Contact us now & book your viewing.`
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
          content: `Villas are available for rent in Dubai. Find out all the details including rent prices, exclusive images . Contact us now & book your viewing.`
        },

      ]
    }
  },
  methods: {}
};
</script>

