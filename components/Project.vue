<template>
  <div v-lazy-container="{ selector: 'img' }">
    <div class="com-det-box">
      <router-link :to="'/buy-house-in-dubai/'+item.building_url" exact>
        <img :data-src="this.$store.state.config.imagePrefix+item.image_url" width="100%">
      <div class="comm-content">
        <h2 :title="item.building">
          {{ item.building }}
        </h2>
        <h3 v-if="item.building_min_price">
          Starting from
          <span>
            {{ item.building_min_price }}
            <sup>AED</sup>
          </span>
        </h3>
        <h3 v-else>
          Price is on Request
        </h3>
        <div class="text-center hover-content py-2">
          <div slot="project_overview">
            {{ item.overview }}
          </div>
          <div class="btn btn-primary" role="button">
            Read More
          </div>
        </div>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
