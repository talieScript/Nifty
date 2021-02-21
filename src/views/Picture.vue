<template>
  <div class="picture">
    <div class="swiper-container">
      <md-button @click="back" @click.stop class="md-accent back-btn">
        <md-icon class="overlay-icon">keyboard_backspace</md-icon>Back to collection
      </md-button>
      <div class="swiper-wrapper">
        <img
          v-for="(image) in picture.Images"
          :key="image.id"
          class="image swiper-slide"
          :src="getPicUrl(image.url)"
          :alt="'Nigel Emery - ' + picture.Title"
        />
      </div>
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <div class="infomation">
      <h2>{{ picture.Title }}</h2>
      <p class="description" v-html="parsedDescription"></p>
      <div class="buy">
        <div class="size-select">
          <label for="sizes">Sizes</label>
          <v-select
            @input="changeSize"
            :value="selectedSize"
            :clearable="false"
            :searchable="false"
            id="sizes"
            :options="dropdownOptions"
          >
            <template #selected-option="item">
              <div style="display: flex; align-items: baseline;">{{ item.label }} cm</div>
            </template>
          </v-select>
          <span class="price">£{{price}}</span>
        </div>
        <div class="paypal-btn" ref="paypal"></div>
      </div>
    </div>
    <md-snackbar
      class="snack"
      md-position="center"
      :md-duration="Infinity"
      :md-active.sync="showSnackbar"
    >
      <span>Purchase complete, please check your emails</span>
      <md-button class @click="showSnackbar = false">Continue</md-button>
    </md-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { toKebabCase, getPicUrl } from "../utils.js";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { API } from "../API.ts";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default Vue.extend({
  name: "Picture",
  metaInfo() {
    const title = this.picture.Title;
    return {
      titleTemplate: `%s | ${title}`,
      meta: [
        {
          name: "description",
          content: "Limited edition fine art giclee print by Nigel Emery."
        }
      ]
    };
  },
  data() {
    return {
      picture: {},
      getPicUrl,
      collectionName: {},
      description: "",
      selectedSize: "",
      paypal: {
        sandbox: "",
        production: process.env.VUE_APP_PAYPAL_CLIENT_ID
      },
      showSnackbar: false
    };
  },
  components: {
    VSelect
  },
  async mounted() {
    const splitRoute = this.$router.currentRoute.path.split("/");
    const collectionId = splitRoute[splitRoute.length - 2];
    this.$store.commit('setShowCollectionTabs', true)
    this.$store.commit('setActiveCollection', collectionId)

    // check there is a active picture and set the current picture
    const pictureId = splitRoute[splitRoute.length - 1];
    if(!(this.$store.state.activePicture && toKebabCase(this.$store.state.activePicture) === pictureId)) {
      this.$store.commit('setActivePicture', pictureId)
    }

    // Get picture info
    this.picture = (await API.get(`/pictures/${pictureId}`)).data
    this.selectedSize = this.picture.PriceSize.price_and_sizes[0].FrameSize;

    setTimeout(() => {
      new window.Swiper(".swiper-container", {
        autoHeight: true,
        slidesPerView: "auto",
        speed: 1000,
        loop: true,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }, 200) 

    // paypal stuff
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?currency=GBP&client-id=${this.paypal.production}`;
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  created() {
    API.get("/picture-description")
      .then(res => {
        this.description = res.data.Description;
      })
      .catch(err => console.log(err));
  },
  methods: {
    setLoaded() {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.itemDescription,
                  amount: {
                    currency_code: "GBP",
                    value: this.price
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.showSnackbar = true;
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    },
    back() {
      this.$router.push("/collections/" + this.$store.state.activeCollection);
    },
    changeSize(value) {
      this.selectedSize = value;
    }
  },
  computed: {
    itemDescription() {
      return `${this.picture.Title} - ${this.selectedSize}`;
    },
    dropdownOptions() {
      if (this.picture.PriceSize) {
        return this.picture.PriceSize.price_and_sizes.map(size => {
          return size.FrameSize;
        });
      }
      return [];
    },
    price() {
      if (this.picture.PriceSize) {
        const selection = this.picture.PriceSize.price_and_sizes.find(
          priceSize => {
            return priceSize.FrameSize === this.selectedSize;
          }
        );
        return selection.Price;
      }
      return "-";
    },
    parsedDescription() {
      if (this.description.length) {
        const splitContent = this.description.split("\n");
        const doc = {
          nodeType: "document",
          content: splitContent.map(para => {
            return {
              nodeType: "paragraph",
              content: [
                {
                  nodeType: "text",
                  value: para,
                  marks: []
                }
              ]
            };
          })
        };
        return documentToHtmlString(doc);
      }
      return "";
    },
    paypalBtnStyle() {
      return {
        label: "checkout",
        size: "responsive",
        shape: "rect",
        color: "gold"
      };
    }
  },
  beforeDestroy() {
    this.showSnackbar = false;
    this.$emit("showCollectionTabs", false);
  }
});
</script>

<style lang="scss" scoped>
.picture {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 100%;
  width: 100%;
  padding-top: 60px;
  color: rgb(145, 145, 145);
  @media only screen and (max-width: 56.25em) {
    flex-direction: column;
  }
  @media only screen and (max-width: 1000px) {
    padding-top: 20px;
  }
  @media only screen and (max-width: 37.5em) {
    padding: 10px;
  }
}
.swiper-container {
  height: fit-content;
  width: 48%;
  padding-top: 50px;
  margin-left: 0 !important;
  margin-right: 0 !important;
  @media only screen and (max-width: 56.25em) {
    width: 100%;
  }
}
.image {
  position: relative;
  margin-right: 0;
  box-shadow: none;
  border-radius: 5px;
}
.infomation {
  display: flex;
  flex-direction: column;
  width: 48%;
  // margin-left: 25px;
  padding-top: 60px;
  @media only screen and (max-width: 56.25em) {
    width: 100%;
    padding-top: 30px;
    margin-left: 0;
  }
}
.description {
  @media only screen and (max-width: 56.25em) {
    font-size: 12px;
  }
}
.size-select {
  width: 50%;
  .v-select {
    margin-bottom: 15px;
  }
  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }
}
.price {
  font-size: 25px;
}
.paypal-btn {
  width: 50%;
  margin-top: 20px;
  ::v-deep .component-frame {
    z-index: 1 !important;
  }
  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }
}
.snack {
  color: #f0f3f4;
  background-color: #2f89a0;
  button {
    color: #f0f3f4;
  }
}
.swiper-button-next,
.swiper-button-prev {
  color: white;
  border-radius: 5px;
  height: 60px;
  margin-top: calc(-1 * 60px / 2);
  transition: background-color 0.5s;
  &:hover {
    background-color: rgba(#f0f3f4, 0.4);
  }
}
</style>