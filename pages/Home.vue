<template>
  <v-ons-page>
  <div class="home-search">
    <v-ons-search-input class="home-search-field" placeholder="Search Location/Developer"></v-ons-search-input>
  </div>
  <v-ons-list>
   <v-ons-list-item>
    <div class="left">
      <v-ons-icon icon="home" class="list-item__icon"></v-ons-icon>
    </div>
    <div class="center">
    <span class="list-item__title">For Rent</span>
    <span class="list-item__subtitle">29,890 properties</span>
    </div>
    </v-ons-list-item>
    <v-ons-list-item>
    <div class="left">
      <v-ons-icon icon="home" class="list-item__icon"></v-ons-icon>
    </div>
    <div class="center">
    <span class="list-item__title">For Rent</span>
    <span class="list-item__subtitle">29,890 properties</span>
    </div>
    </v-ons-list-item>
    <v-ons-list-item>
    <div class="left">
      <v-ons-icon icon="home" class="list-item__icon"></v-ons-icon>
    </div>
    <div class="center">
    <span class="list-item__title">For Sale</span>
    <span class="list-item__subtitle">35,710 properties</span>
    </div>
    </v-ons-list-item>
    <v-ons-list-item>
    <div class="left">
      <v-ons-icon icon="home" class="list-item__icon"></v-ons-icon>
    </div>
    <div class="center">
    <span class="list-item__title">Off plan properties</span>
    <span class="list-item__subtitle">112,060 properties</span>
    </div>
    </v-ons-list-item>
    <v-ons-list-item>
    <div class="left">
      <v-ons-icon icon="home" class="list-item__icon"></v-ons-icon>
    </div>
    <div class="center">
    <span class="list-item__title">Luxury Properties</span>
    <span class="list-item__subtitle">5,110 properties</span>
    </div>
    </v-ons-list-item>
    <v-ons-list-item>
    <div class="left">
      <v-ons-icon icon="home" class="list-item__icon"></v-ons-icon>
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

<style>
.intro {
  text-align: left;
  padding: 0 22px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(0, 0, 0, .54);
}
ons-card {
  cursor: pointer;
  color: #333;
}
.card__title, .card--material__title {
  font-size: 20px;
}
</style>
