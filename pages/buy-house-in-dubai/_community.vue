<template>
  <section>
    <lazy-wrapper :loading="project.loading">
      <!--Banner Section Starts-->
      <section>
        <div class="container-fluid listing-bg px-0 position-relative comm-det">
        <a
                  href="javascript:void(0)"
                  @click="showCommModal"
                  class="comm-header-search d-none d-lg-block"
                >
                  <svg role="img" width="28px" height="28px">
                    <use xlink:href="~static/images/defs.svg#img-search-head" />
                  </svg>
                </a>
          <div
            class="search-bg position-absolute d-flex flex-row justify-content-center align-items-center h-100"
          >
            <div class="container">
              <div class="row w-100 pt-2 mx-0">
                <div class="col-lg-12 text-center pt-2">
                  <h1 class="text-dark">{{project.building}}</h1>
                  <p class="text-dark">by {{project.developer}} at {{project.area}} dubai</p>
                  <breadcrumb  v-if="project.building" :items="bread"/>
                  <div class="d-sm-block d-lg-none">
                    <SearchForm />
                  </div>
                </div>
              </div>
              <div class="row">
                <b-modal
                  ref="formModal"
                  size="lg"
                  class="d-none d-lg-block"
                  centered
                  title="Enquire Now"
                  hide-header
                  hide-footer
                >
                  <div class="comm-search-popup d-block text-center pb-3">
                    <b-button @click="hideCommModal" variant="outline-primary" class="close-btn">x</b-button>
                    <h2 class="text-center py-3">Search Property</h2>
                    <SearchForm />
                  </div>
                </b-modal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--Banner Section Ends-->
      <!--Gallery Section Starts-->
      <client-only>
        <section>
          <LightGallery
            :images="gallery"
            :index="index"
            :disable-scroll="true"
            @close="index = null"
          />
          <div class="container-fluid py-2 bg-light position-relative">
            <div class="row py-3 gallery-bg">
              <ul :id="`animated-thumbnails`">
                <li
                  v-for="(img, thumbIndex) in gallery"
                  :class="`hovereffect `+galleryClass(thumbIndex)"
                  :key="thumbIndex"
                >
                  <a class="info" href="javascript:void(0)" @click="index = thumbIndex">
                    <img v-lazy="`${img.url}?d=450`" alt v-if="thumbIndex <8" />
                    <span class="overlay">
                      <svg role="img" width="28px" height="28px">
                        <use xlink:href="~static/images/defs.svg#img-search" />
                      </svg>
                      <h2 v-if="thumbIndex == 7 && gallery.length>8">+{{gallery.length - 8}}</h2>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </client-only>
      <!--Gallery Section Ends-->
      <!--Property Facts Section Starts-->

      <section>
        <div
          class="container-fluid py-1 bg-light highlights-bg box-pt-bg"
          v-if="project.area"
        >
          <div class="container">
            <div class="row py-5">
              <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-if="project.building_min_price">
                <div class="box rounded">
                  <svg role="img" width="55px" height="55px">
                    <use xlink:href="~static/images/defs.svg#img-price" />
                  </svg>
                  <span class="position-absolute">
                    <h2>
                      {{project.building_min_price}}
                      <sup>AED</sup>
                    </h2>
                    <h3>Starting Price</h3>
                  </span>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-if="project.developer && project.developer_black_logo" >
                <div class="box rounded">
                  <img
                    :src="`https://famproperties.com`+project.developer_black_logo"
                    width="50%"
                  />
                  <span class="position-absolute">
                    <h2>{{project.developer}}</h2>
                    <h3>Developer</h3>
                  </span>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-if="project.total_units">
                <div class="box rounded">
                  <svg role="img" width="55px" height="55px">
                    <use xlink:href="~static/images/defs.svg#img-townhouse" />
                  </svg>
                  <span class="position-absolute">
                    <h2>{{project.total_units}}</h2>
                    <h3>Total Units</h3>
                  </span>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-if="project.lifestyle">
                <div class="box rounded">
                  <svg role="img" width="55px" height="55px">
                    <use xlink:href="~static/images/defs.svg#img-luxury" />
                  </svg>
                  <span class="position-absolute">
                    <h2>{{project.lifestyle}}</h2>
                    <h3>Lifestyle</h3>
                  </span>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-6 my-2 box-bg">
                <div class="box rounded">
                  <svg role="img" width="55px" height="55px">
                    <use xlink:href="~static/images/defs.svg#img-location" />
                  </svg>
                  <span class="position-absolute">
                    <h2>{{project.area}}</h2>
                    <h3>Area</h3>
                  </span>
                </div>
              </div>
              <div
                class="col-lg-3 col-md-4 col-6 my-2 box-bg"
                v-if="project.building_launch_date"
              >
                <div class="box rounded">
                  <svg role="img" width="55px" height="55px">
                    <use xlink:href="~static/images/defs.svg#img-launch" />
                  </svg>
                  <span class="position-absolute">
                    <h2>{{project.building_launch_date}}</h2>
                    <h3>Launch Date</h3>
                  </span>
                </div>
              </div>
              <div
                class="col-lg-3 col-md-4 col-6 my-2 box-bg"
                v-if="project.building_completion_date"
              >
                <div class="box rounded">
                  <svg role="img" width="55px" height="55px">
                    <use xlink:href="~static/images/defs.svg#img-handover" />
                  </svg>
                  <span class="position-absolute">
                    <h2>{{project.building_completion_date}}</h2>
                    <h3>Completion Date</h3>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--Property Facts Section Ends-->

      <!--Property Overview Section Starts-->

      <section>
        <div class="container-fluid bg-light">
          <div class="container">
            <div class="row">
              <div
                class="col-lg-12 py-4 text-center overview-bg"
                v-if="project.website_overview && project.website_overview.length"
              >
                <h2>About this property</h2>
                <div class="prop-det-overview">{{project.website_overview}}</div>
              </div>
              <div
                class="col-lg-12 pt-4 pb-5 text-center brochure-bg"
                v-if="project.download_brochure"
              >
                <a
                  :href="`https://famproperties.com`+project.download_brochure"
                  class="btn btn-primary"
                  target="_blank"
                >
                  <svg role="img" width="45px" height="45px">
                    <use xlink:href="~static/images/defs.svg#img-pdf" />
                  </svg>
                  <span>Download Brochure</span>
                  <svg role="img" width="35px" height="35px">
                    <use xlink:href="~static/images/defs.svg#img-download" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--Property Overview Section Ends-->

      <!--Property Features Section Starts-->
      <section v-if="project.features && project.features.length">
        <div class="container-fluid py-1 bg-white feature-bg box-pt-bg">
          <div class="container">
            <div class="row py-5">
              <div class="col-lg-12 text-center">
                <h2>Community Features</h2>
              </div>
              <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-for="feature in features">
                <div class="box rounded">
                  <img :src="feature.icon" width="50%" />
                  <span class="position-absolute">
                    <h3>{{feature.features}}</h3>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--Property Features Section Ends-->

      <!--Location Matrix Section Starts-->
      <section>
        <div class="container-fluid py-4 bg-light location-bg" :class="nearbyClass">
          <div class="container">
            <div class="row py-4">
              <div class="col-lg-4 px-0 map-info-bg">
                <div class="map-info w-100 float-left rounded-left">
                  <h2>Location Matrix</h2>
                  <b-tabs>
                    <b-tab active v-if="schoolLen > 0">
                      <template v-slot:title>
                        <svg role="img" width="25px" height="25px">
                          <use xlink:href="~static/images/defs.svg#img-school" />
                        </svg> Schools
                      </template>
                      <ul class="school-metro-list d-none d-lg-block">
                        <li v-for="sch in schoolList">
                          <a
                            href="javascript:void(0)"
                            @click="getDirection({lat:parseFloat(sch.school_lats),lng:parseFloat(sch.school_langs)})"
                          >
                            {{sch.school_names}}
                            <span>
                              <svg role="img" width="35px" height="35px">
                                <use xlink:href="~static/images/defs.svg#img-parking" />
                              </svg>
                              {{sch.distance}} Kilometers
                            </span>
                          </a>
                        </li>
                      </ul>
                      <div class="d-block d-lg-none py-3">
                        <select
                          class="form-control"
                          id="school"
                          v-model="school"
                          @change="getDirection(school)"
                        >
                          <option selected value>Select School</option>
                          <option
                            selected
                            v-for="sch in schoolList"
                            :value="`{lat:`+parseFloat(sch.school_lats)+`,lng:`+parseFloat(sch.school_langs)+`}`"
                          >{{sch.school_names}}</option>
                        </select>
                      </div>
                    </b-tab>
                    <b-tab v-if="metroLen>0">
                      <template v-slot:title>
                        <svg role="img" width="23px" height="23px">
                          <use xlink:href="~static/images/defs.svg#img-metro" />
                        </svg> Metros
                      </template>
                      <ul class="school-metro-list d-none d-lg-block">
                        <li v-for="met in metroList">
                          <a
                            href="javascript:void(0)"
                            @click="getDirection({lat:met.metro_lats,lng:met.metro_langs})"
                          >
                            {{met.metro_names}}
                            <span>
                              <svg role="img" width="28px" height="28px">
                                <use xlink:href="~static/images/defs.svg#img-metro" />
                              </svg>
                              {{met.distance}} Kilometers
                            </span>
                          </a>
                        </li>
                      </ul>
                      <div class="d-block d-lg-none py-3">
                        <select
                          class="form-control"
                          id="metro"
                          v-model="metro"
                          @change="getDirection(metro)"
                        >
                          <option selected value>Select Metro</option>
                          <option
                            selected
                            v-for="met in metroList"
                            :value="`{lat:`+parseFloat(met.metro_lats)+`,lng:`+parseFloat(met.metrolangs)+`}`"
                          >{{met.metro_names}}</option>
                        </select>
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </div>
              <div class="col-lg-8 px-0 map-info-cond">
                <client-only>
                  <gmap-map
                    ref="map"
                    :center="{lat:parseFloat(project.latitude), lng:parseFloat(project.longitude)}"
                    :zoom="10"
                    style="height:400px;"
                  >
                    <gmap-marker
                      :position="{lat:parseFloat(project.latitude), lng:parseFloat(project.longitude)}"
                    />
                  </gmap-map>
                </client-only>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--Location Matrix Section Ends-->
      <!--Properties For Sale Section Starts-->
      <section v-if="propSale.length>0">
        <div class="container-fluid listings py-2 px-0 bg-white comm-prop-list position-relative">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 py-4 text-center add-prop">
                <h2>Property For Sale in {{project.building}}</h2>
              </div>
            </div>
              <transition :name="transition" mode="out-in">
                <transition-group tag="div" name="item" class="row w-100 mx-0">
                  <property
                    v-for="property in propSale"
                    :key="property.id"
                    :item="property"
                    :grid="12"
                    class="col-lg-4 py-3 text-center listing-cont px-0"
                  />
                </transition-group>
              </transition>
          </div>
        </div>
      </section>
      <!--Properties For Sale Section Ends-->
      <!--Properties For Rent Section Starts-->
      <section v-if="propRent.length>0">
        <div class="container-fluid listings py-2 px-0 bg-white comm-prop-list position-relative">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 py-4 text-center add-prop">
                <h2>Property For Rent in {{project.building}}</h2>
              </div>
            </div>
              <transition :name="transition" mode="out-in">
                <transition-group tag="div" name="item" class="row w-100 mx-0">
                  <property
                    v-for="property in propRent"
                    :key="property.id"
                    :item="property"
                    :grid="12"
                    class="col-lg-4 py-3 text-center listing-cont px-0"
                  />
                </transition-group>
              </transition>
          </div>
        </div>
      </section>
      <!--Properties For Rent Section Ends-->
    </lazy-wrapper>
  </section>
</template>

<script>
import SearchForm from "~/components/SearchForm.vue";
import breadcrumb from "~/components/breadcrumb";
import Property from "~/components/Property.vue";
import LazyWrapper from "~/components/LazyWrapper";
import { feeds, config } from "~/common/api";
import axios from "axios";

export default {
  components: {
    SearchForm,
    Property,
    breadcrumb,
    LazyWrapper
  },
  created(){
    if (process.browser) {
        window.addEventListener('scroll', this.schoolsData);
        window.addEventListener('scroll', this.metrosData);
    }
  },
  data() {
    return {
      transition: "slide-right",
      config: config,
      index: null,
      schoolList: "",
      metroList: "",
      school: "",
      metro: "",
      breaditems:[]
    };
  },
  fetch({ store, params: { community } }) {
    return store
      .dispatch('FETCH_BUILDING', { community })
      .then(res => {
        return store.dispatch("FETCH_FEED", {
          feed: "BuildingList",
          filters: "/ALL/ALL/" + config.websiteId + "/ALL/Villa/ALL"
        });
      })
      .then(res => {
        return store.dispatch("FETCH_FEED", {
          feed: "PropertyList",
          filters:
            "/ALL/" + community + "/ALL/ALL/61/ALL/ALL/ALL/ALL/ALL/ALL/ALL"
        });
      });
  },
  computed: {
    project() {
      let proj = this.$store.state.buildings[this.$route.params.community];
      if (proj.id > 0) {
        this.$store.commit("SET_LOCATIONID", proj.building_location_id);
        this.$store.commit("SET_PROJECTID", proj.id);
      }
      return proj;
    },
    bread(){
    return this.breaditems = [
          {
            text: 'Home',
            to: '/'
          },
          {
            text:'Buy House in Dubai',
            to:'/buy-house-in-dubai'
          },
          {
            text:this.project.building
          }
        ]
    },
    gallery() {
      let newArr = [];
      if(this.project.images){
        newArr = this.project.images.map(el => {
          if (el.large_url != null) {
            return { url: config.imagePrefix + el.large_url };
          }
        });
      }

      return newArr;
    },
    features() {
      let newArr = [];
      newArr = this.project.features.map(el => {
        if (el.icon != null && el.features != null) {
          return { icon: config.imagePrefix + el.icon, features: el.features };
        }
      });
      return newArr;
    },
    propertyData() {
      return this.$store.state.feeds["PropertyList"][
        "/ALL/" +
          this.project.building_url +
          "/ALL/ALL/61/ALL/ALL/ALL/ALL/ALL/ALL/ALL"
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
    },
    propRent() {
      if(this.Properties.length>0){
          return this.Properties.filter(function(elem){
                   return elem.deal=="Rent";
                });
      }
      else{
        return [];
      }

    },
    propSale() {
      if(this.Properties.length>0){
          return this.Properties.filter(function(elem){
                    return elem.deal=="Sale";
                });
      }
      else{
        return [];
      }
    },
    nearbyClass(){
      if (this.schoolList.length>0 && this.metroList.length>0){
        return 'bothShow'
      }else if(this.schoolList.length>0){
        return 'schoolShow'
      }else if(this.metroList.length>0){
        return 'metroShow'
      }else{
        return 'notShow'
      }
    },
    metroLen(){
        return this.metroList.length;
    },
    schoolLen(){
        return this.schoolList.length;
    }
  },
  head() {
    return {
      title:this.project.website_overview && this.project.website_overview.length>0 && this.project.website_overview.meta_title?this.project.website_overview.meta_title:this.project.building +` Villas  by  ` +this.project.developer +` - ` +this.project.area,
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content:  this.project.website_overview && this.project.website_overview.length>0 && this.project.website_overview.meta_title?this.project.website_overview.meta_title:this.project.building +` Villas  by  ` +this.project.developer +` - ` +this.project.area,
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content: this.project.website_overview && this.project.website_overview.length>0 && this.project.website_overview.meta_desc?this.project.website_overview.meta_desc:`Villas are available for sale and rent in ` +this.project.building +` at ` +this.project.area +`. Contact us now & book your viewing today.`,
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          property: "og:site_name",
          content: "Luxury Villas Dubai"
        },
        {
          hid: "og:site_image",
          name: "og:site_image",
          property: "og:site_image",
          content: config.imagePrefix+this.project.image_url
        },
        {
          hid: "description",
          name: "description",
          content: this.project.website_overview && this.project.website_overview.length>0 && this.project.website_overview.meta_desc ? this.project.website_overview.meta_desc : `Villas are available for sale and rent in ` +this.project.building +` at ` +this.project.area +`. Contact us now & book your viewing today.`,
        },
      ]
    }
  },
  methods: {
    galleryClass: function(index) {
      if (index >= 8) {
        return "fixed-img";
      } else {
        return "";
      }
    },
    showCommModal: function() {
      this.$refs["formModal"].show();
    },
    hideCommModal: function() {
      this.$refs["formModal"].hide();
    },
       schoolsData:function(){
    if(!this.schoolList){
      axios.get(config.apiUrl+`/property/website/GetSchoolsByProjectId/`+this.project.project_id)
      .then(res => {
        let items;
        if(res.data.items.length>0){
          items = res.data.items
        }else{
          items = 0
        }
        return this.schoolList = items;
      })
    }
    },
    metrosData:function(){
    if(!this.metroList){
       axios.get(config.apiUrl+`/property/website/GetMetroByProjectId/`+this.project.project_id).then(res => {
           let items;
        if(res.data.items.length>0){
          items = res.data.items
        }else{
          items = 0
        }
        return this.metroList = items;
      })
      }
    },
    //Map Get Directions
    getDirection: function(dest) {
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      //google maps API's direction service
      function calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        start,
        destination
      ) {
        directionsService.route(
          {
            origin: start,
            destination: destination,
            travelMode: "DRIVING"
          },
          function(response, status) {
            if (status === "OK") {
              directionsDisplay.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      }
      calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        {
          lat: parseFloat(this.project.latitude),
          lng: parseFloat(this.project.longitude)
        },
        dest
      );
    }
  },
  destroyed () {
    if (process.browser) {
      window.removeEventListener('scroll', this.schoolsData);
      window.removeEventListener('scroll', this.metrosData);
    }
  }
}

</script>

