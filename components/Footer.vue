<template>
  <!--Footer Section Starts-->
  <section>
    <div
      class="container-fluid footer-bg py-5 bg-light position-relative"
      id="footer-form">
      <div class="container">
        <div class="row d-flex flex-row justify-content-center align-items-center form-bg">
          <div class="col-lg-4 col-sm-12 mob-head">
            <h2 class="text-dark font-weight-bold">
              Get
              <span class="ls-font w-100 float-left font-weight-bold">Great</span>
              <span class="w-100 float-left">Advice Now</span>
            </h2>
          </div>
          <div class="col-lg-7 col-sm-12 mt-md-5 mt-lg-0">
            <form-wrapper :validator="$v.form" class="row mt-md-1">
              <form @submit.prevent="submit" novalidate class="w-100 float-left">
                <div class="row mt-md-1 px-2">
                  <div class="col-lg-6 col-sm-6 mt-md-3 px-0 px-sm-2 px-lg-2">
                    <form-group name="name">
                      <input
                        type="text"
                        name="name"
                        value
                        placeholder="Name"
                        required
                        class="form-control"
                        slot-scope="{validator}"
                        @input="validator.$touch();"
                        v-model.trim="form.name"
                      />
                    </form-group>

                    <form-group name="email">
                      <input
                        type="email"
                        name="email"
                        value
                        placeholder="Email Address"
                        required
                        class="form-control"
                        slot-scope="{validator}"
                        @input="validator.$touch();"
                        v-model="form.email"
                      />
                    </form-group>
                    <form-group name="phone">
                      <input
                        type="tel"
                        name="phone"
                        value
                        placeholder="Phone Number"
                        required
                        class="form-control"
                        slot-scope="{validator}"
                        @input="validator.$touch();"
                        v-model="form.phone"
                      />
                    </form-group>
                  </div>
                  <div class="col-lg-6 col-sm-6 mt-md-3 px-0 px-sm-2 px-lg-2">
                    <form-group name="message">
                      <textarea
                        placeholder="Message"
                        required
                        rows="3"
                        class="form-control message"
                        name="message"
                        v-model="form.message"
                      ></textarea>
                    </form-group>
                    <button class="btn btn-primary btn-block mt-3" type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </form-wrapper>
          </div>
        </div>
        <div class="row success-message" id="success-message">
          <div class="col-lg-4 col-sm-12">
            <svg role="img" width="240px" height="240px" title="Thanks">
              <use xlink:href="~static/images/defs.svg#img-thanks" />
            </svg>
          </div>
          <div class="col-lg-7 col-sm-12 mt-md-5 mt-lg-0 text-center">
            <h2>
              <span class="ls-font font-weight-bold">Thanks</span> For Your
              Interest We Will
              <span
                class="ls-font font-weight-bold primary-text"
              >Contact</span> You Soon.
            </h2>
            <a
              href="javascript:void(0)"
              @click="successForm"
              class="border border-primary btn btn-primary px-4"
            >Close</a>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid copy-bg pt-4 position-relative">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center text-white">
            <p>
              © 2019
              <strong>
                <font>fäm</font>
              </strong> Real Estate Broker
              <strong>
                <sup>
                  <font>TM</font>
                </sup>
              </strong>
            </p>
            <p>
              Select projects listed on dubai-villas.ae are purely for informative purposes only and not sold by us.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--Footer Section Ends-->
</template>

<script>
import axios from "axios";
import * as Cookie from "js-cookie";
import { config } from "~/common/api";
import { required, email } from "vuelidate/lib/validators";
const isPhone = value => /^\d{9}$/.test(value);
export default {
  name: "TheFooter",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        message: "",
        project_id: "",
        source: "",
        messageplus: "",
        session_id: ""
      },
      config: config
    };
  },
  validations: {
    form: {
      name: { required },
      email: { required, email },
      phone: { required }
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      // if its still pending or an error is returned do not submit
      if (this.$v.form.$pending || this.$v.form.$error) return;
      // to form submit after this
      axios
        .post(config.apiUrl + "/property/contact/lead/", {
          NAME: this.form.name,
          EMAIL: this.form.email,
          MOBILE: this.form.phone,
          NOTE: this.form.message + this.form.messageplus,
          CHANNEL_ID: this.$store.state.channel,
          LISTING_ID: this.$store.state.listing_id,
          LOCATION_ID:this.$store.state.location_id,
          PROJECT_ID: this.$store.state.project_id,
          ADWORD_CLICK_ID: this.adword,
          SOURCE: window.location.href,
          WEBSITE_ID: this.website
        })
        .then(response => {
          this.$gtag("event", "LeadGenForm", "Submit", "inquiry", 1);
          this.$gtag("event", "conversion", {
            send_to: "AW-1011239912/gYe6CIOi_pYBEKya_u0C"
          });
          document.getElementById("footer-form").classList.add("show-success");
          this.form.name = "";
          this.form.email = "";
          this.form.phone = "";
          this.form.message = "";
          this.form.messageplus = "";
          this.$store.commit('SET_LISTINGID','');
          this.$store.commit('SET_PROJECTID','');
          this.$store.commit('SET_LOCATIONID','');
          this.$v.form.$reset();
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    successForm() {
      document.getElementById("footer-form").classList.remove("show-success");
    }
  }
};
</script>


