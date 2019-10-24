<template>
<v-ons-page>
    <v-ons-list>
        <v-ons-list-item>
            <v-ons-search-input class="home-search-field" style="width:95%" placeholder="Search Location/Developer"></v-ons-search-input>
        </v-ons-list-item>
        <v-ons-list-item>
          <v-ons-select v-model="propType" style="width:95%">
            <option v-for="item in items" :value="item.value">{{ item.text }}</option>
          </v-ons-select>
        </div>
        </v-ons-list-item>
        <div class="form-checkbox" v-for="(propcat, $index) in propcats" :key="propcat" tappable>
        <label class="left">
        <v-ons-radio :input-id="'radio-' + $index" :value="propcat" v-model=" selectedpropcat">
        </v-ons-radio>
        </label>
        <label :for="'radio-' + $index" class="center">
            {{ propcat }}
        </label>
        </div>
        <div class="form-status-checkbox" v-for="(propstatus, $index) in propstatuss" :key="propstatus" tappable>
        <label class="left">
        <v-ons-radio :input-id="'radio-' + $index" :value="propstatus" v-model=" selectedpropstatus">
        </v-ons-radio>
        </label>
        <label :for="'radio-' + $index" class="center">
            {{ propstatus }}
        </label>
        </div>
        <v-ons-list-item>
            Price Range
            <v-ons-row>
                <v-ons-col>
                <v-ons-range Min="1" Max="5000000" v-model="price" style="width: 95%;"></v-ons-range>
                </v-ons-col>
            </v-ons-row>
            Price Range: {{ price }} AED
        </v-ons-list-item>
        <v-ons-list-item>
            Bedroom
            <v-ons-row>
                <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
                Min
                </v-ons-col>
                <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
                Max
                </v-ons-col>
            </v-ons-row>
        </v-ons-list-item>
        <v-ons-list-item>
            Size Range
            <v-ons-row>
                <v-ons-col>
                <v-ons-range Min="600" Max="5000" v-model="size" style="width: 95%;"></v-ons-range>
                </v-ons-col>
            </v-ons-row>
            Size Range: {{ size }} Sq.ft
        </v-ons-list-item>
        <v-ons-list-header>Features</v-ons-list-header>
        <v-ons-list-item v-for="(feature, $index) in features" :key="feature" tappable>
            <label class="left">
            <v-ons-checkbox :input-id="'checkbox-' + $index" :value="feature" v-model="feat">
            </v-ons-checkbox>
            </label>
            <label class="center" :for="'checkbox-' + $index">
            {{ feature }}
            </label>
        </v-ons-list-item>
        <v-ons-list-item>
            <v-ons-button modifier="large" style="margin: 6px 0;background:red;">Submit</v-ons-button>
        </v-ons-list-item>
    </v-ons-list>
</v-ons-page>
</template>

<script>
export default {
  data() {
    return {
    items: [
        { text: 'Apartment', value: 'apartment' },
        { text: 'Villas', value: 'villas' },
        { text: 'Townhouse', value: 'townhouse' },
        { text: 'Offices', value: 'offices' },
        { text: 'Plots', value: 'plots' },
        { text: 'Commercial', value: 'commercial' }
      ],
      propType:'apartment',
      name: '',
      features:['Pet Allowed', 'Pool','Balcony', 'Waterfront','Study', 'Beach access','Maid', 'Landmark view','Gym', 'Furnished','Kitchen appliance'],
      feat: [],
      size: 0,
      price: 0,
      propcats: ['Sale','Rent'],
      selectedpropcat: 'Sale',
      propstatuss: ['All','Ready','Offplan'],
      selectedpropstatus: 'All'
    };
  }
};
</script>
