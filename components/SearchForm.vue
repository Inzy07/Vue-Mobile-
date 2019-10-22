<template>
  <!--Form Starts-->
  <div class="col-lg-12 p-0">
    <div class="col-lg-12 search-form mx-auto py-3 bg-white d-lg-block" id="cont-Form">
      <form>
        <div class="col-12 col-lg-11 px-0 pl-lg-3">
          <div class="row">
            <div class="col-lg-6 col-12 px-2">
              <div class="form-group">
                <span class="comm-marker float-left position-absolute">
                  <svg role="img" width="25px" height="25px">
                    <use xlink:href="~static/images/defs.svg#img-map" />
                  </svg>
                </span>
                <client-only>
                  <v-select
                    class="comm-list"
                    :options="fetchCommunities"
                    :reduce="building => building.building_url"
                    placeholder="Select a Community"
                    label="building"
                    v-model="community"
                  ></v-select>
                </client-only>
              </div>
            </div>
            <div class="col-lg-3 col-12 px-2">
              <div class="form-check form-group pl-0 prop-cat position-relative w-50 float-left">
                <input
                  v-model="deal"
                  id="deal"
                  class="form-check-input position-absolute w-100"
                  type="radio"
                  name="deal"
                  value="sale"
                />
                <label
                  class="form-check-label rounded-left w-100 border border-right-0 d-flex flex-row justify-content-center align-items-center bg-light"
                  for="sale"
                >Sale</label>
              </div>
              <div class="form-check form-group pl-0 prop-cat position-relative w-50 float-left">
                <input
                  v-model="deal"
                  id="deal"
                  class="form-check-input position-absolute w-100"
                  type="radio"
                  name="deal"
                  value="rent"
                />
                <label
                  class="form-check-label rounded-right w-100 border border-left-0 d-flex flex-row justify-content-center align-items-center bg-light"
                  for="rent"
                >Rent</label>
              </div>
            </div>
             <div class="col-lg-3 col-12 px-2" v-if="deal == `sale`">
              <div class="form-check form-group pl-0 prop-cat position-relative w-50 float-left">
                <input
                  v-model="is_offplan"
                  id="offplan"
                  class="form-check-input position-absolute w-100"
                  type="radio"
                  name="is_offplan"
                  value="Y"
                />
                <label
                  class="form-check-label rounded-left w-100 border border-right-0 d-flex flex-row justify-content-center align-items-center bg-light"
                  for="offplan"
                >Off Plan</label>
              </div>
              <div class="form-check form-group pl-0 prop-cat position-relative w-50 float-left">
                <input
                  v-model="is_offplan"
                  id="ready"
                  class="form-check-input position-absolute w-100"
                  type="radio"
                  name="is_offplan"
                  value="N"
                />
                <label
                  class="form-check-label rounded-right w-100 border border-left-0 d-flex flex-row justify-content-center align-items-center bg-light"
                  for="ready"
                >Ready</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-12 px-2">
                <b-form-group>
                <div class="row mx-0">
                <div class="col-lg-2 col-2 p-1">
                <svg role="img" width="40px" height="40px">
                <use xlink:href="~static/images/defs.svg#img-bed-search" />
                </svg>
                </div>
                <b-form-radio-group
                id="btn-radios-2"
                v-model="radBtns"
                :options="bedOptions"
                buttons
                class="col-lg-10 col-10 px-0 form-control bed-radio-btns py-0"
                button-variant="outline-primary rad-btn"
                size="lg"
                name="radio-btn-outline"
                ></b-form-radio-group>
                </div>
                </b-form-group>
            </div>
            <div class="col-lg-6 col-12 px-2">
              <div class="row">
                <div class="col-lg-6 col-6 pr-2">
                  <div class="form-group">
                    <input
                      v-model="min_price"
                      id="min_price"
                      class="form-control w-100"
                      type="number"
                      name="min_price"
                      placeholder="Min Price"
                      value
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-6 pl-2">
                  <div class="form-group">
                    <input
                      v-model="max_price"
                      id="max_price"
                      class="form-control w-100"
                      type="number"
                      name="max_price"
                      placeholder="Max Price"
                      value
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <button
            class="btn-primary submit-btn position-absolute h-100 border-0 px-2"
            type="button" @click="submit"
          >
            <svg role="img" width="30px" height="30px">
              <use xlink:href="~static/images/defs.svg#img-search" />
            </svg>
            <span class="d-inline d-lg-none">Search</span>
          </button>
          <a
            href="javascript:void(0)"
            @click="formHide"
            class="w-100 py-2 text-center d-block d-lg-none"
          >
            <svg role="img" width="15px" height="15px">
              <use xlink:href="~static/images/defs.svg#img-close" />
            </svg>
            <span class="d-inline text-dark">Close</span>
          </a>
        </div>
      </form>
    </div>
    <!--Form Ends-->
    <!--Mobile Form Starts-->
    <div class="col-12 d-block d-sm-none">
      <div class="form-group position-relative" @click="formShow">
        <span class="float-left position-absolute mb-comm-marker">
          <svg role="img" width="25px" height="25px">
            <use xlink:href="~static/images/defs.svg#img-map" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search Community"
          :value="getNameSelected"
          class="form-control mb-comm-list"
        />
        <span class="mb-comm-search">
          <svg role="img" width="25px" height="25px">
            <use xlink:href="~static/images/defs.svg#img-search" />
          </svg>
        </span>
      </div>
    </div>
    <!--Mobile Form Ends-->
  </div>
</template>


<script>
import { feeds, config } from "~/common/api";
export default {
  name: "SearchForm",
  data: function() {
    return {
      community:
        this.$route.query.community == "null"
          ? ""
          : this.$route.query.community || "",
      deal: this.$route.query.deal || "sale",
      is_offplan: this.$route.query.is_offplan || "N",
      min_price: this.$route.query.min_price || "",
      max_price: this.$route.query.max_price || "",
      radBtns:this.$route.query.min_beds  || "ALL",
      bedOptions: [
          { text: 'All', value: 'ALL' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
          { text: '5', value: '5' },
          { text: '6', value: '6' },
          { text: '7', value: '7' }
        ]
    };
  },
  computed: {
    getNameSelected() {
      const el = this.fetchCommunities.find(
        e => e.building_url == this.community
      );
      if (el) {
        return el.building;
      }
    },
    fetchCommunities: function() {
      let filter = "/ALL/ALL/" + config.websiteId + "/ALL/Villa/ALL";
      return this.$store.state.feeds["BuildingList"][filter].map(
        id => this.$store.state.items["BuildingList"][id]
      );
      //return [{building:"test building",building_url:"url"}]
    }
  },
  methods: {
    submit() {
      if(this.deal=='rent'){
          this.is_offplan='N'
      }
      this.$router.push({
        path:
          "/search?community=" +
          this.community +
          "&deal=" +
          this.deal +
          "&is_offplan=" +
          this.is_offplan +
          "&min_price=" +
          this.min_price +
          "&max_price=" +
          this.max_price+
          "&min_beds=" +
          this.radBtns+
          "&max_beds=" +
          this.radBtns
      });
      document.getElementById("cont-Form").classList.remove("animateForm");
    },
    fetchProjectapi() {
      return this.$store
        .dispatch("FETCH_FEED", {
          feed: "BuildingList",
          filters: "/ALL/ALL/" + config.websiteId + "/ALL/Villa/ALL"
        })
        .catch(() => {});
    },
    formShow() {
      document.getElementById("cont-Form").classList.add("animateForm");
      document.getElementsByClassName("vs__search")[0].focus();
    },
    formHide() {
      document.getElementById("cont-Form").classList.remove("animateForm");
    }
  }
};
</script>
