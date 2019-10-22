<template>
  <div v-lazy-container="{ selector: 'img' }">
    <div class="row">
      <div class="col-lg-10 offset-lg-1 shadow-lg listing bg-white">
        <div class="row">
          <div :class="`col-lg-`+grid+` col-12 px-0`">
            <router-link :to="`/property-for-`+item.deal+`/`+item.bed+`-bed-house-`+item.id">
              <img
                :data-src="this.$store.state.config.imagePrefix+item.image_url"
                class="w-100 h-100 float-left"
              />
            </router-link>
          </div>
          <div :class="`col-lg-`+grid+` col-12 pt-3 text-left`">
          <router-link :to="`/property-for-`+item.deal+`/`+item.bed+`-bed-house-`+item.id">
            <h2 v-if="item.bed>0">
              <router-link
                class="text-dark"
                :to="`/property-for-`+item.deal+`/`+item.bed+`-bed-house-`+item.id"
              >{{item.bed}} Bedroom {{item.prop_cat}} for {{item.deal}}</router-link>
            </h2>
            <h2 v-else>
              {{item.bed}} {{item.prop_cat}} for {{item.deal}}
            </h2>
            <h3 v-if="item.price !== null">
              Price
              <span>
                {{item.price}}
                <sup>AED</sup>
              </span>
            </h3>
            <p class="text-grey">{{item.building_name}} at {{item.area}}</p>
            <div class="row prop-feat">
              <div class="col-lg-4 col-4 pr-0">
                <svg role="img" width="35px" height="35px">
                  <use xlink:href="~static/images/defs.svg#img-bed" />
                </svg>
                <span class="text-dark pl-2">
                  {{item.bed}}
                  <sup v-if="item.bed>0">Bed</sup>
                </span>
              </div>
              <div class="col-lg-3 col-3 px-0" v-if="item.bath">
                <svg role="img" width="35px" height="35px">
                  <use xlink:href="~static/images/defs.svg#img-bath" />
                </svg>
                <span class="text-dark pl-2">
                  {{item.bath}}
                  <sup>Bath</sup>
                </span>
              </div>
              <div class="col-lg-5 col-5 pr-0" v-if="item.prop_size">
                <svg role="img" width="35px" height="35px">
                  <use xlink:href="~static/images/defs.svg#img-size" />
                </svg>
                <span class="text-dark pl-2">
                  {{ item.prop_size}}
                  <sup>Sq.ft</sup>
                </span>
              </div>
            </div>
            </router-link>
            <div class="row bg-light action-btns mt-1 py-3">
              <div class="col-lg-4 col-4 px-2">
                <a class="btn listing-btn w-100 py-2" href="tel:0097142483600" role="button">
                  <svg role="img" width="20px" height="20px">
                    <use xlink:href="~static/images/defs.svg#img-call" />
                  </svg> Call
                </a>
              </div>
              <div class="col-lg-4 col-4 d-none d-lg-block px-1">
                <a
                  class="btn listing-btn w-100 py-2"
                  :href="`https://web.whatsapp.com/send?text= Hi Dubai Villas Team (`+ this.$store.state.channel + `) I would like to have a consultation session. Please assist me! Thanks  Ref No: `+ item.ref +` in `+ item.area +` &amp;phone=971521778715`"
                  target="_blank"
                  role="button"
                >
                  <svg role="img" width="20px" height="20px">
                    <use xlink:href="~static/images/defs.svg#img-chat" />
                  </svg> Chat
                </a>
              </div>
              <div class="col-lg-4 col-4 d-sm-block d-lg-none px-1">
                <a
                  class="btn listing-btn w-100 py-2"
                  :href="`whatsapp://send?text= Hi Dubai Villas Team (`+ this.$store.state.channel + `) I would like to have a consultation session. Please assist me! Thanks  Ref No: `+ item.ref +` in `+ item.area +` &amp;phone=971521778715`"
                  target="_blank"
                  role="button"
                >
                  <svg role="img" width="20px" height="20px">
                    <use xlink:href="~static/images/defs.svg#img-chat" />
                  </svg> Chat
                </a>
              </div>
              <div class="col-lg-4 col-4 px-2">
                <a
                  class="btn listing-btn w-100 py-2"
                  href="javascript:void(0)"
                  @click="showModal"
                  :data-id="item.project_id"
                  :data-ref="item.id"
                  ref="btnShow"
                  role="button"
                >
                  <svg role="img" width="20px" height="20px">
                    <use xlink:href="~static/images/defs.svg#img-enquire" />
                  </svg> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Cookie from "js-cookie";
export default {
  name: "PropertyItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    grid: ""
  },
  methods: {
    showModal(e) {
      this.$root.$emit("bv::show::modal", "modal-center", "#btnShow");
      let x = e.currentTarget.getAttribute("data-ref");
      let y = e.currentTarget.getAttribute("data-id");
      this.$store.commit("SET_LISTINGID", x);
      this.$store.commit("SET_PROJECTID", y);
    }
  }
};
</script>
