<template>
  <v-ons-page>
  <div class="home-search">
    <v-ons-search-input class="home-search-field" placeholder="Search Location/Developer"></v-ons-search-input>
  </div>
  <v-ons-list class="home-list">
    <v-ons-list-item modifier="chevron" ripple>
    <div class="left thumbnail">
     <svg role="img" width="25px" height="25px">
        <use xlink:href="~/static/images/defs.svg#icon-handover-o"></use>
      </svg>
    </div>
    <div class="center">
    <span class="list-item__title">For Rent</span>
    <span class="list-item__subtitle">29,890 properties</span>
    </div>
    </v-ons-list-item>
    <v-ons-list-item modifier="chevron" ripple>
    <div class="left thumbnail">
      <v-ons-icon style="color:#5da7a6" icon="home" class="list-item__icon"></v-ons-icon>
    </div>
    <div class="center">
    <span class="list-item__title" >For Sale</span>
    <span class="list-item__subtitle">35,710 properties</span>
    </div>
    </v-ons-list-item>
    <v-ons-list-item modifier="chevron" ripple>
    <div class="left thumbnail">
      <svg role="img" width="25px" height="25px">
        <use xlink:href="~/static/images/defs.svg#icon-underconstruction"></use>
      </svg>
    </div>
    <div class="center">
    <span class="list-item__title">Off plan properties</span>
    <span class="list-item__subtitle">112,060 properties</span>
    </div>
    </v-ons-list-item>
    <v-ons-list-item modifier="chevron" ripple>
    <div class="left thumbnail">
      <svg role="img" width="25px" height="25px">
        <use xlink:href="~/static/images/defs.svg#img-luxury"></use>
      </svg>
    </div>
    <div class="center">
    <span class="list-item__title">Luxury Properties</span>
    <span class="list-item__subtitle">5,110 properties</span>
    </div>
    </v-ons-list-item>
    <v-ons-list-item modifier="chevron" ripple>
    <div class="left thumbnail">
      <svg role="img" width="25px" height="25px">
        <use xlink:href="~/static/images/defs.svg#icon-list-sell"></use>
      </svg>
    </div>
    <div class="center">
    <span class="list-item__title">List/Sell your property in Dubai</span>
    <span class="list-item__subtitle">Sell faster, save thousands</span>
    </div>
    </v-ons-list-item>
  </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  methods: {
  }
};
</script>
