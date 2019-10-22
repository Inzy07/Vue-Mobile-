<template>
  <section>
     <!--Banner Section Starts-->
    <section>
      <div class="container-fluid listing-bg px-0 position-relative comm-det">
            <a href="javascript:void(0)" @click="showCommModal" class="comm-header-search d-none d-lg-block">
              <svg role="img" width="28px" height="28px">
                <use xlink:href="~static/images/defs.svg#img-search-head" />
              </svg>
            </a>
        <div class="search-bg position-absolute d-flex flex-row justify-content-center align-items-center h-100" v-if="property.building_name">
          <div class="container">
          <div class="row w-100 pt-2 mx-0">
            <div class="col-lg-12 text-center pt-2">
              <h1 class="text-dark">{{property.prop_cat+` for `+ property.deal + ` in ` + property.building_name}}</h1>
              <p class="text-dark">{{property.sub_title}}</p>
              <breadcrumb  v-if="property.building_url" :items="bread"/>
              <div class="d-sm-block d-lg-none">
                <SearchForm/>
              </div>
            </div>
          </div>
          <div class="row">
            <b-modal ref="formModal" size="lg" class="d-none d-lg-block"  centered title="Enquire Now" hide-header hide-footer>
              <div class="comm-search-popup d-block text-center pb-3">
                <b-button @click="hideCommModal" variant="outline-primary" class="close-btn">x</b-button>
                <h2 class="text-center py-3">Search Property</h2>
                <SearchForm/>
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
                <li v-for="(img, thumbIndex) in gallery" :class="`hovereffect `+galleryClass(thumbIndex)" :key="thumbIndex">
                  <a class="info" href="javascript:void(0)" @click="index = thumbIndex">
                    <img v-lazy="`${img.url}?d=450`" alt v-if="thumbIndex <8" />
                    <span class="overlay">
                      <svg role="img" width="28px" height="28px">
                        <use xlink:href="~static/images/defs.svg#img-search" />
                      </svg>
                      <h2
                        v-if="thumbIndex == 7 && gallery.length>8"
                      >+{{gallery.length - 8}}</h2>
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
      <div class="container-fluid py-1 bg-light highlights-bg box-pt-bg" v-if="this.property.price">
        <div class="container">
          <div class="row py-5">
            <div class="col-lg-3 col-md-4 col-6 my-2 box-bg">
              <div class="box rounded">
                <svg role="img" width="55px" height="55px">
                  <use xlink:href="~static/images/defs.svg#img-price-prop" />
                </svg>
                <span class="position-absolute">
                  <h2>
                    {{this.property.price}}<sup>AED</sup></h2>
                  <h3>Price</h3>
                </span>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-if="this.property.prop_size">
              <div class="box rounded">
                <svg role="img" width="55px" height="55px">
                  <use xlink:href="~static/images/defs.svg#img-size" />
                </svg>
                <span class="position-absolute">
                  <h2>
                    {{this.property.prop_size}}<sup>/ Sq.ft</sup></h2>
                  <h3>Size</h3>
                </span>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-if="this.property.bed">
              <div class="box rounded">
                <svg role="img" width="55px" height="55px">
                  <use xlink:href="~static/images/defs.svg#img-bed" />
                </svg>
                <span class="position-absolute">
                  <h2>
                    {{this.property.bed}}</h2>
                  <h3>Bed</h3>
                </span>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-if="this.property.parking">
              <div class="box rounded">
                <svg role="img" width="55px" height="55px">
                  <use xlink:href="~static/images/defs.svg#img-parking" />
                </svg>
                <span class="position-absolute">
                  <h2>
                    {{this.property.parking}}</h2>
                  <h3>Parking</h3>
                </span>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-if="this.property.bath">
              <div class="box rounded">
                <svg role="img" width="55px" height="55px">
                  <use xlink:href="~static/images/defs.svg#img-bath" />
                </svg>
                <span class="position-absolute">
                  <h2>
                    {{this.property.bath}}</h2>
                  <h3>Bath</h3>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--Property Facts Section Ends-->

    <!--Property Overview Section Starts-->

    <section v-if="property.overview">
      <div class="container-fluid bg-light">
        <div class="container">
          <div class="row">
          <client-only>
            <div class="col-lg-12 py-4 overview-bg">
              <h2 class="text-center">About this property</h2>
              <div class="prop-det-overview" v-html="property.overview">
                {{property.overview}}
              </div>
            </div>
          </client-only>
          </div>
        </div>
      </div>
    </section>

    <!--Property Overview Section Ends-->

    <!--Property Features Section Starts-->
    <section v-if="property.feature && property.feature.length > 0">
      <div class="container-fluid py-1 bg-white feature-bg box-pt-bg">
        <div class="container">
          <div class="row py-5">
            <div class="col-lg-12 text-center">
              <h2>Property Features</h2>
            </div>
            <div class="col-lg-3 col-md-4 col-6 my-2 box-bg" v-for="feat in features" v-if="feat.icon != null">
              <div class="box rounded">
                <img :src="config.imagePrefix+feat.icon" width="50%" />
                <span class="position-absolute">
                  <h3>{{feat.feature}}</h3>
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
      <div class="container-fluid py-4 bg-light location-bg" :class="nearbyClass" v-if="property.latitude && property.longitude">
        <div class="container">
          <div class="row py-4">
            <div class="col-lg-4 px-0">
              <div class="map-info w-100 float-left rounded-left">
                <h2>Location Matrix</h2>
                <b-tabs>
                  <b-tab active v-if="schoolLen>0">
                    <template v-slot:title>
                      <svg role="img" width="25px" height="25px">
                        <use xlink:href="~static/images/defs.svg#img-school" />
                      </svg> Schools
                    </template>
                    <ul class="school-metro-list d-none d-lg-block">
                      <li v-for="sch in schoolList">
                        <a href="javascript:void(0)" @click="getDirection({lat:parseFloat(sch.school_lats),lng:parseFloat(sch.school_langs)})">
                          {{sch.school_names}}
                          <span>
                            <svg role="img" width="35px" height="35px">
                              <use xlink:href="~static/images/defs.svg#img-parking" />
                            </svg>{{sch.distance}} Kilometers
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div class="d-block d-lg-none py-3">
                      <select
                        class="form-control"
                        id="school"
                        v-model="school"
                        @change="getDirection(school)">
                        <option selected value>Select School</option>
                        <option selected v-for="sch in schoolList" :value="`{lat:`+parseFloat(sch.school_lats)+`,lng:`+parseFloat(sch.school_langs)+`}`">{{sch.school_names}}</option>
                      </select>
                    </div>
                  </b-tab>
                  <b-tab  v-if="metroLen>0">
                    <template v-slot:title>
                      <svg role="img" width="23px" height="23px">
                        <use xlink:href="~static/images/defs.svg#img-metro" />
                      </svg> Metros
                    </template>
                    <ul class="school-metro-list d-none d-lg-block">
                      <li v-for="met in metroList">
                        <a href="javascript:void(0)" @click="getDirection({lat:met.metro_lats,lng:met.metro_langs})">
                           {{met.metro_names}}
                          <span>
                            <svg role="img" width="28px" height="28px">
                              <use xlink:href="~static/images/defs.svg#img-metro" />
                            </svg>{{met.distance}} Kilometers
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
                        <option selected v-for="met in metroList" :value="`{lat:`+parseFloat(met.metro_lats)+`,lng:`+parseFloat(met.metrolangs)+`}`">{{met.metro_names}}</option>
                      </select>
                    </div>
                  </b-tab>
                </b-tabs>
              </div>
            </div>
            <div class="col-lg-8 px-0">
              <client-only>
              <gmap-map
                ref="map"
                :center="{lat:parseFloat(property.latitude), lng:parseFloat(property.longitude)}"
                :zoom="10"
                style="height:400px;"
              >
                <gmap-marker
                  :position="{lat:parseFloat(property.latitude), lng:parseFloat(property.longitude)}"
                />
              </gmap-map>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--Location Matrix Section Ends-->

  </section>
</template>

<script>
import SearchForm from '~/components/SearchForm.vue'
import breadcrumb from "~/components/breadcrumb"
import { feeds, config } from '~/common/api'
import axios from "axios"

export default {
  components: {
    SearchForm,
    breadcrumb
  },
  data() {
    return {
      transition: 'slide-right',
      config: config,
      index: null,
      schoolList:"",
      metroList:"",
      school: "",
      metro: "",
      breaditems:[],
    }
  },
    created(){
    if (process.browser) {
        window.addEventListener('scroll', this.schoolsData);
        window.addEventListener('scroll', this.metrosData);
    }
  },
  fetch({ store, params: { id } }) {
    let sid = id.split("-");
    let did = sid[sid.length - 1];
    let pid = did
    return store.dispatch('FETCH_PROPERTY', {id:pid})
    .then(res => {return store.dispatch("FETCH_FEED", {feed: "BuildingList",filters: "/ALL/ALL/" + config.websiteId + "/ALL/Villa/ALL"});
    });
  },
  computed: {
    property() {
      let commid = this.$route.params.id;
      let sid = commid.split("-");
      let id = sid[sid.length - 1];
      let prop = this.$store.state.properties[id];
      if (prop.id > 0) {
        this.$store.commit('SET_LOCATIONID','');
        this.$store.commit('SET_LISTINGID',prop.id);
        this.$store.commit('SET_PROJECTID',prop.project_id);
      }
      return prop;
    },
    bread(){
    if(this.property){
    return this.breaditems = [
          {
            text: 'Home',
            to: '/'
          },
          {
            text:this.property.building_name,
            to:'/buy-house-in-dubai/'+this.property.building_url
          },
          {
            text:this.property.prop_cat+` for `+this.property.deal+` in `+this.property.project
          }
        ]
    }},
    gallery(){
      let newArr = []
      if(this.property.images){
      newArr=this.property.images.map(el => {
        if (el.image != null) {
          return ({url:config.imagePrefix+el.image});
        }
      });
      }
      return newArr;
    },
    features(){
      let newArr = []
       if(this.property.feature){
      newArr=this.property.feature.map(el => {
        if (el.feature != null || el.icon != null) {
          return ({feature:el.feature,icon:el.icon});
        }
      });
      }
      return newArr;
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
      title: this.property.bed+` Bed `+this.property.prop_cat+ ` is available for `+this.property.deal+ ` in ` + this.property.area,
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: this.property.bed+` Bed `+this.property.prop_cat+ ` is available for `+this.property.deal+ ` in ` + this.property.area
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content: this.property.bed+` Bed `+this.property.prop_cat+ ` is available for `+this.property.deal+ ` in ` + this.property.area
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
          content: config.imagePrefix+this.property.image_url
        },
        {
          hid: "description",
          name: "description",
          content: this.property.bed+` Bed `+this.property.prop_cat+ ` is available for `+this.property.deal+ ` in ` + this.property.area + `Contact us now & book your viewing today.`
        },

      ]
    }
  },
  methods:{
    galleryClass: function(index) {
      if (index >= 8) {
        return "fixed-img";
      } else {
        return '';
      }
    },
    showCommModal:function(){
       this.$refs['formModal'].show();
    },
    hideCommModal:function(){
       this.$refs['formModal'].hide();
    },
    schoolsData:function(){
    if(!this.schoolList){
      axios.get(config.apiUrl+`/property/website/GetSchoolsByProjectId/`+this.property.project_id)
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
       axios.get(config.apiUrl+`/property/website/GetMetroByProjectId/`+this.property.project_id).then(res => {
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
    getDirection: function(dest) {
      var directionsDisplay = new google.maps.DirectionsRenderer();
      var directionsService = new google.maps.DirectionsService();
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      //google maps API's direction service
      function calculateAndDisplayRoute(directionsService,directionsDisplay,start,destination){
        directionsService.route({origin: start,destination: destination,travelMode: "DRIVING"},function(response, status) {
            if (status === "OK") {
              directionsDisplay.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      }
      calculateAndDisplayRoute(directionsService,directionsDisplay,{lat: parseFloat(this.property.latitude),lng: parseFloat(this.property.longitude)},dest);

  },
  },
   destroyed () {
    if (process.browser) {
      window.removeEventListener('scroll', this.schoolsData);
      window.removeEventListener('scroll', this.metrosData);
    }
  }
}
</script>

