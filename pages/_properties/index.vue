<template>
  <section>
    <!--Banner Section Starts-->
    <section>
      <div class="container-fluid listing-bg px-0 position-relative">
        <div
          class="search-bg position-absolute d-flex flex-row justify-content-center align-items-center h-100"
        >
          <div class="row w-100">
            <SearchForm />
            <div class="col-lg-12 text-center py-3">
            <p class="text-dark">{{Properties.length}} Properties Found</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--Banner Section Ends-->
    <!--Prop Section Starts-->
    <section>
      <div class="container-fluid listings py-2 px-0 bg-light position-relative">
        <div class="container">
          <lazy-wrapper  v-if="Properties.length > 0">
            <transition :name="transition" mode="out-in">
              <transition-group tag="div" name="item" class="row">
                <property
                  v-for="property in Properties"
                  :key="property.id"
                  :item="property"
                  :grid = 6
                  class="col-lg-10 offset-lg-1 py-3 text-center listing-cont"/>
              </transition-group>
            </transition>
          </lazy-wrapper>
        </div>
      </div>
    </section>
    <!--Prop Section Ends-->
  </section>
</template>

<script>
import SearchForm from "~/components/SearchForm.vue";
import Property from "~/components/Property.vue";
import LazyWrapper from "~/components/LazyWrapper";
import { feeds, config } from "~/common/api";

export default {
  components: {
    SearchForm,
    Property,
    LazyWrapper
  },
  data() {
    return {
      transition: "slide-right",
      hasProperty:""
    };
  },
  computed: {
    community() {
      return this.$route.query.community.replace("null", "") || "ALL";
    },
    deal() {
      return this.$route.query.deal || "sale";
    },
    is_offplan() {
      return this.$route.query.is_offplan || "N";
    },
    min_price() {
      return this.$route.query.min_price || "ALL";
    },
    max_price() {
      return this.$route.query.max_price || "ALL";
    },
    min_beds() {
      return this.$route.query.min_beds || "ALL";
    },
    max_beds() {
      return this.$route.query.max_beds || "ALL";
    },
    propertyData() {
      return this.$store.state.feeds["PropertyList"][
        "/" +
          this.deal +
          "/" +
          this.community +
          "/ALL/ALL/61/" +
          this.is_offplan +
          "/" +
          this.min_price +
          "/" +this.max_price +
          "/"+this.min_beds +
          "/" +this.max_beds +
          "/ALL/ALL"
      ];
    },
    Properties() {
        if (this.propertyData) {
        let prop= this.propertyData.map(
        id => this.$store.state.items["PropertyList"][id]
        );
        return prop;
        } else {
        return false;
        }
    },
    loading() {
      return this.Properties.length === 0;
    }
  },
  watchQuery: ["deal", "community", "is_offplan", "min_price", "max_price","min_beds","max_beds"],
  fetch({ store, query }) {
    let deal = query.deal || "sale",
      community = query.community.replace("null", "") || "ALL",
      is_offplan = query.is_offplan || "N",
      min_beds= query.min_beds || "ALL",
      max_beds = query.max_beds || "ALL",
      min_price = query.min_price || "ALL",
      max_price = query.max_price || "ALL";
    return store
      .dispatch("FETCH_FEED", {
        feed: "PropertyList",
        filters:
          "/" +
          deal +
          "/" +
          community +
          "/ALL/ALL/61/" +
          is_offplan +
          "/" +
          min_price +
          "/" +max_price +
          "/"+min_beds +
          "/" +max_beds +
          "/ALL/ALL"
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
      title: `Villas & Houses for Sale and Rent in Dubai - Dubai Villas`,
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: `Villas & Houses for Sale and Rent in Dubai - Dubai Villas`
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content:`Villas are available for sale and Rent in Dubai. Find out all the details including a payment plan, prices, floor plans, exclusive images. Contact us now & book your viewing.`
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
          content: `Villas are available for sale and Rent in Dubai. Find out all the details including a payment plan, prices, floor plans, exclusive images. Contact us now & book your viewing.`
        },
      ]
    }
  },
  methods: {}
};
</script>

