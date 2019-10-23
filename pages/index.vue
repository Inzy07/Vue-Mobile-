<template>
<v-ons-tabbar position="bottom"  :on-swipe="onSwipe" swipeable  :tabs="tabs"  @postchange="showTip($event, 'Tip: Try swiping pages!')"></v-ons-tabbar>
</template>
<script>
import Home from './Home.vue';
import Forms from './Forms.vue';
import Animations from './Animations.vue';
export default {
  name: "TheHeader",
  data () {
    return {
      showingTip: false,
      animationOptions: {},
      tabs: [
        {
          icon: 'home',
          page: Home,
        },
        {
          icon: 'search',
          page: Forms,
        },
        {
          icon: 'heart',
          page: Animations,
        }
      ]
    };
  },
  methods: {
    showTip(e, message) {
      if (!this.shutUp && !(e && e.swipe) && !this.showingTip) {
        this.showingTip = true;
        this.$ons.notification.toast({
          message,
          buttonLabel: 'Shut up!',
          timeout: 2000
        }).then(i => {
          this.shutUp = i === 0;
          this.showingTip = false;
        });
      }
    }
  },
  computed: {

  }
};
</script>
