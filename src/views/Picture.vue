<template>
    <div class="picture">
         <!-- <md-button @click="back" @click.stop class="md-accent back-btn">
            <md-icon class="overlay-icon">keyboard_backspace</md-icon> Back to collection
        </md-button> -->
            <div class="swiper-container">
                <div v-if="picture.Image" class="swiper-wrapper">
                    <img
                        v-for="(image) in picture.Images"
                        :key="image.id"
                        class="image swiper-slide"
                        :src="getPicUrl(image.url)"
                        :alt="'Nigel Emery - ' + picture.Title"
                    >
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
                    <v-select @input="changeSize" :value="selectedSize" :clearable="false" :searchable="false" id="sizes" :options="dropdownOptions" >
                        <template #selected-option="item">
                            <div style="display: flex; align-items: baseline;">
                            {{ item.label }} cm
                            </div>
                        </template>
                    </v-select>
                    <span class="price">£{{price}}</span>
                </div>
                <div class="paypal-btn" ref="paypal"></div>
            </div>
        </div>
        <md-snackbar class="snack" md-position="center" :md-duration="Infinity" :md-active.sync="showSnackbar">
            <span>Purchase complete, please check your emails</span>
            <md-button class="" @click="showSnackbar = false">Continue</md-button>
        </md-snackbar>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    // import CollectionImage from '../components/CollectionImage.vue';
    import { toKebabCase, getPicUrl } from '../utils.js';
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
    import { API } from '../API.ts';
    import VSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    export default Vue.extend({
        name: 'Picture',
        metaInfo() {
            const title = this.picture.Title
            return {
                titleTemplate: `%s | ${title}`,
                meta: [
                    { name: 'description', content: 'Limited edition fine art giclee print by Nigel Emery.' },
                ]
            }
        },
        data() {
            return {
                picture: {},
                getPicUrl,
                collection: {},
                description: '',
                selectedSize: '',
                paypal: {
                    sandbox: 'AaCSLEPU-GZnVGLdovCiCiOrc9LvE7I5UJDM7tGSUmY2L-jx0BFo0h1VP_2w0tLupb59QenPcLPmJC6K',
                    production: '<production client id>'
                },
                showSnackbar: false,
            }
        },
        components: {
            VSelect,
            // CollectionImage
        },
        props: {
            collections: {
                type: Array,
                required: true,
            }
        },
        mounted() {
            const splitRoute = this.$router.currentRoute.path.split('/');
            this.collection = this.collections.find(collection => {
                return toKebabCase(collection.Title.toLowerCase()) === splitRoute[splitRoute.length - 2]
            })
            this.$emit(
                'activeCollectionChange',
                toKebabCase(this.collection.Title)
            )
            this.$emit('showCollectionTabs', true)
            const picture = this.collection.Pictures.pictures.find(picture => {
                console.log(toKebabCase(picture.Title.toLowerCase()))
                return toKebabCase(picture.Title.toLowerCase()) === splitRoute[splitRoute.length - 1]
            });
            console.log(picture)
            this.picture = picture;
            this.selectedSize = this.picture.PriceSize.price_and_sizes[0].FrameSize;

            // paypal stuff
            const script = document.createElement('script');
            script.src = 'https://www.paypal.com/sdk/js?currency=GBP&client-id=AaCSLEPU-GZnVGLdovCiCiOrc9LvE7I5UJDM7tGSUmY2L-jx0BFo0h1VP_2w0tLupb59QenPcLPmJC6K';
            script.addEventListener("load", this.setLoaded);
            document.body.appendChild(script);

        },
        created() {
             API.get('/picture-description')
                .then(res => {
                    this.description = res.data.Description;
                    new window.Swiper('.swiper-container', {
                        slidesPerView: '1',
                        speed: 1000,
                        loop: true,
                        spaceBetween: 30,
                        effect: 'flip',
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        centeredSlides: true,
                    });
                })
                .catch(err => console.log(err))
        },
        methods: {
            setLoaded() {
            this.loaded = true;
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
                this.$router.push('/collections/' + toKebabCase(this.collection.Title))
            },
            changeSize(value) {
                this.selectedSize = value;
            },
        },
        computed: {
            itemDescription() {
                return `${this.picture.Title} - ${this.selectedSize}`
            },
            dropdownOptions() {
                if(this.picture.PriceSize) {
                    return this.picture.PriceSize.price_and_sizes.map(size => {
                        return size.FrameSize
                    });
                }
                return []
            },
            price() {
                if(this.picture.PriceSize) {
                    const selection = this.picture.PriceSize.price_and_sizes.find(priceSize => {
                        return priceSize.FrameSize === this.selectedSize;
                    });
                    return selection.Price
                }
                return '-';
            },
            parsedDescription() {
                if (this.description.length){
                    const splitContent = this.description.split("\n");
                    const doc = {
                        nodeType: 'document',
                        content: splitContent.map(para => {
                            return {
                                nodeType: 'paragraph',
                                content: [{
                                    nodeType: 'text',
                                    value: para,
                                    marks: []
                                }]
                            }
                        })
                    }
                    return documentToHtmlString(doc)
                }
                return '';
            },
            paypalBtnStyle() {
                return {
                    label: 'checkout',
                    size:  'responsive',
                    shape: 'rect',
                    color: 'gold'
                }
            }
        },
        beforeDestroy() {
            this.showSnackbar = false;
            this.$emit('showCollectionTabs', false);
        }
    })
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
    .back-btn {
        position: absolute;
        top: 0;
        z-index: 0;
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
         };
    }
    .snack {
        color: #F0F3F4;
        background-color: #2F89A0;
        button {
            color: #F0F3F4;
        }
    }
    .swiper-button-next, .swiper-button-prev {
        color: white;
        border-radius: 5px;
        height: 60px;
        margin-top: calc(-1 * 60px/ 2);
        transition: background-color .5s;
        &:hover {
            background-color: rgba(#F0F3F4, .4);
        }
    }
</style>