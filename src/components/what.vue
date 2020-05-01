<template>
    <md-dialog class="dialog" :md-active.sync="showDialog" @md-closed="$emit('close')">
        <div class="container">
            <div class="image-container">
                <span class="md-headline">{{pic.Title}}</span>
                <img
                    class="image"
                    :src="getPicUrl(pic.Image.url)"
                    :alt="pic.Title"
                >
            </div>
            <div class="prices-sizes">
                <p>These limited edition fine art giclee prints are produced under the guide lines of the Fine Arts    Trade Guild using archival quality 210gsm Hahnemuhle Albrecht Durer paper and lightfast inks including a 50mm border all round ready for framing with or without a mount.</p>
                <p>Each giclee print is produced individually, hand signed and numbered by the artist and released as a limited or open edition.</p>
                <p>All prints are rolled and packaged with an accompanying certificate.</p>
                <p>As each giclee print is individually produced please allow up to 2 weeks for delivery.These limited edition fine art giclee prints are produced under the guide lines of the Fine Arts    Trade Guild using archival quality 210gsm Hahnemuhle Albrecht Durer paper and lightfast inks including a 50mm border all round ready for framing with or without a mount.</p>
                <p>Each giclee print is produced individually, hand signed and numbered by the artist and released as a limited or open edition.</p>
                <p>All prints are rolled and packaged with an accompanying certificate.</p>
                <p>As each giclee print is individually produced please allow up to 2 weeks for delivery.</p>
                <span class="price">£{{ activePrice }}</span>
                Format: {{ pic.Format }}
                <label for="sizes">Size:</label>
                <v-select id="sizes" @input="changeSelect" :value="selected"  :options="dropdownOptions">
                    <template #selected-option="item">
                        <div style="display: flex; align-items: baseline;">
                           {{ item.label }} cm
                        </div>
                    </template>
                </v-select>
                <div>
                    Actual image size: <span class="actual-size">{{ this.activeSize ? this.activeSize.ImageSize  + ' cm' : '-' }}</span>
                </div>
                <pay-pal
                    v-if="activePrice"
                    class="paypal-btn"
                    :amount="activePrice.toString()"
                    currency="GBP"
                    :client="paypal"
                    env="sandbox"
                />
            </div>
        </div>
    </md-dialog>
</template>

<script>
    import { getPicUrl } from '../utils.js';
    import 'vue-select/dist/vue-select.css';
    import VSelect from 'vue-select';
    import PayPal from 'vue-paypal-checkout';
    export default {
        name: 'PictureModal',
        components: {
            VSelect,
            PayPal
        },
        props: {
            show: {
                type: Boolean,
                required: true
            },
            pic: {
                type: Object,
                required: true,
            }
        },
        computed: {
            showDialog: {
                get() {
                    return this.show;
                },
                set() {
                    this.$emit('close');
                }
            },
            activeSize() {
                return this.pic.PriceSize.price_and_sizes.find(size => {
                    return size.FrameSize === this.selected;
                });
            },
            dropdownOptions() {
                return this.pic.PriceSize.price_and_sizes.map(size => {
                    return size.FrameSize
                });
            },
            activePrice() {
                return this.activeSize?.Price
            }
        },
        methods: {
            changeSelect(value) {
                this.selected = value;
            }
        },
        mounted () {
            const firstSize = this.pic.PriceSize.price_and_sizes[0].FrameSize;
            this.changeSelect(firstSize)
        },
        data() {
            return {
                getPicUrl,
                size: '',
                selected: '',
                paypal: {
                    sandbox: 'AaCSLEPU-GZnVGLdovCiCiOrc9LvE7I5UJDM7tGSUmY2L-jx0BFo0h1VP_2w0tLupb59QenPcLPmJC6K',
                    production: '<production client id>'
                }
            }
        },
        watch: {
            showDialog(val) {
                console.log(val);
                 const firstSize = this.pic.PriceSize.price_and_sizes[0].FrameSize;
                this.changeSelect(firstSize)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "vue-select/src/scss/vue-select.scss";
    .dialog {
        display: flex;
        width: 70%;
        flex-direction: row;
        max-width: 1000px;
        background-color: #F0F3F4;
    }
    .md-headline {
        margin: 10px 15px;
        width: fit-content;
        font-family: 'Volkhov', serif;
        font-size: 30px;
    }
    .container {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    .image {
        width: 70%;
        max-height: 100%;
        margin: 15px;
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);
        border-radius: 5px;
    }
    .image-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        height: 100%
    }
    .prices-sizes {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        min-width: 300px;
        min-height: 500px;
    }
    .price {
        font-weight: bold;
        margin-bottom: 20px;
        font-size: 20px;
    }
    .actual-size {
        margin-left: 10px;
        font-style: italic;
    }
    .paypal-btn {
        margin-top: 20px;
        align-self: flex-end;
    }
</style>