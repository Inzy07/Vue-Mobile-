<template>
  <div>
    <b-modal id="modal-center" centered title="Enquire Now" hide-header hide-footer>
      <div class="d-block">
        <div class="container-fluid position-relative enquire-popup" id="enquire-form">
          <b-button @click="hideModal" variant="outline-primary" class="close-btn">x</b-button>
          <div class="container">
            <div class="row d-flex flex-row justify-content-center align-items-center enquirePop">
              <div class="col-lg-12 col-sm-12 py-3 px-0 px-lg-3">
                <h2 class="text-dark font-weight-bold">
                  Get
                  <span class="ls-font w-100 float-left font-weight-bold">Great</span>
                  <span class="w-100 float-left">Advice Now</span>
                </h2>
              </div>
              <div class="col-lg-12 col-sm-12 mt-lg-0 pb-4 px-0 px-lg-3">
                <form-wrapper :validator="$v.form" class="row mt-md-1">
                  <form @submit.prevent="submit" novalidate class="w-100 float-left">
                    <div class="row mt-md-1 px-3">
                      <div class="col-lg-12 col-sm-12 px-3 px-sm-2 px-lg-2">
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
                    <form-group name="project_id">
                      <input
                      id="projectIDS"
                      type="hidden"
                      required
                      name="project_id"
                      value
                      class="form-control"
                      v-model="form.project_id"
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
                      <div class="col-lg-12 col-sm-12 px-3 px-sm-2">
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
                        <button class="btn btn-primary btn-block mt-3 py-3" type="submit">Submit</button>
                      </div>
                    </div>
                  </form>
                </form-wrapper>
              </div>
            </div>
            <div class="row success-message" id="success-message">
              <div class="col-lg-12 col-sm-12 mt-md-5 mt-lg-0 text-center">
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
      </div>
    </b-modal>
  </div>
  <!--Enquire Modal Section Starts-->

  <!--Enquire Modal Section Ends-->
</template>

<script>
import axios from "axios";
import { config } from "~/common/api";
import { required, email } from "vuelidate/lib/validators";
const isPhone = value => /^\d{9}$/.test(value);
export default {
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
          document.getElementById("enquire-form").classList.add("show-success");
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
      document.getElementById("enquire-form").classList.remove("show-success");
    },
    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-center", "#btnShow");
    }
  }
};
</script>