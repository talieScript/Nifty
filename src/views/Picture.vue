<template>
    <div class="picture">
        <div class="image">
            <md-button @click="back" @click.stop class="md-accent back-btn">
                <md-icon class="overlay-icon">keyboard_backspace</md-icon> Back to collection
            </md-button>
            <collection-image
                v-if="picture.Image"
                :url="picture.Image.url"
                :title="picture.Title"
                :windowWidth="0"
                :picturePage="true"
            />
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
                <div ref="paypal"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import CollectionImage from '../components/CollectionImage.vue';
    import { toKebabCase, getPicUrl } from '../utils.js';
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
    import { API } from '../API.ts';
    import VSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    export default Vue.extend({
        name: 'Picture',
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
                paidFor: false,
            }
        },
        components: {
            CollectionImage,
            VSelect,
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
            const picture = this.collection.pictures.find(picture => {
                return toKebabCase(picture.Title.toLowerCase()) === splitRoute[splitRoute.length - 1]
            })
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
                    this.data;
                    this.paidFor = true;
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
            }
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
    })
</script>

<style lang="scss" scoped>
    .picture {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: 40px;
        padding-top: 60px;
        color: rgb(145, 145, 145);
        @media only screen and (max-width: 1000px) {
            padding-top: 20px;
        }
    }
    .back-btn {
        position: absolute;
        top: 0;
    }
    .image {
        padding-top: 50px;
        position: relative;
        width: 50%;
        margin-right: 0;
    }
    .infomation {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-left: 25px;
        padding-top: 60px;
    }
    .size-select {
        width: 50%;
        .v-select {
            margin-bottom: 15px;
        }
    }
    .price {
        font-size: 25px;
    }
    .paypal-btn {
        width: 40%;
        margin-top: 20px;
    }
</style>