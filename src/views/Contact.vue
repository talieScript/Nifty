<template>
    <div class="contact">
        <h1 class="h1">Contact Us</h1>
        <img
            class="gallery-image"
            :src="imageUrl"
        >
        <p v-html="parsedContent" class="content"></p>
        <div class="details">
            <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2515.3305341245564!2d-0.4539130485844393!3d50.91760236137425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875bc0561fdbd47%3A0x814dd0fee0b0a98c!2sNifty%20Art%20Gallery!5e0!3m2!1sen!2suk!4v1587668463475!5m2!1sen!2suk" width="600" height="450" frameborder="0" style="border:0;"  allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            <div class="info">
                <div class="detail">
                    <md-icon color="blue">location_on</md-icon><p>{{ address }}</p>
                </div>
                <div class="detail">
                    <md-icon color="blue">phone</md-icon><p>{{ phone }}</p>
                </div>
                <div class="detail">
                    <md-icon color="blue">email</md-icon><p>{{ email }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { getPicUrl } from '../utils.ts'
    import { API } from '../API.ts'
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

    export default Vue.extend({
        name: 'Contact',
        props: {
            windowWidth: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                content: '',
                imageUrl: '',
                address: '',
                phone: '',
                email: '',
            }
        },
        created() {
            API.get('/contact-page')
                .then(({data}) => {
                    this.content = data.content;
                    console.log(data)
                    this.imageUrl = getPicUrl(data.Picture.url)
                    this.address = data.Address;
                    this.phone = data.Phone;
                    this.email = data.Email;
                })
        },
        computed: {
            parsedContent() {
                if (this.content){
                    const splitContent = this.content.split("\n");
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
        },
    })
</script>

<style lang='scss' scoped>
    .contact {
        padding: 16px;
        text-align: left;
        background: #F0F3F4;
        @media only screen and (max-width: 56.25em) {
            padding: 10px;
        }
    }
    .gallery-image {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);
        float: left;
        margin: 30px 15px 15px 20px;
        width: 30vw;
        float: right;
        height: auto;
        border-radius: 5px;
        @media only screen and (max-width: 56.25em) {
            display: none;
            margin: 30px 15px 0px 10px;
            width: 35vw;
        }
    }
    .h1 {
        margin: 0;
        padding: 30px 0px 0px 20px;
        @media only screen and (max-width: 56.25em) {
            padding: 15px 0px 0px 10px;
        }
        font-size: 35px;
    }
    .content {
        margin: 0;
        padding: 20px;
        font-size: 20px;
        line-height: 25px;
       @media only screen and (max-width: 56.25em) {
            font-size: 15px;
            line-height: unset;
            padding: 15px
        };
    }
    .details {
        display: flex;
        p {
            margin: 0;
            margin-left: 10px;
        }
        @media only screen and (max-width: 56.25em) {
            flex-direction: column-reverse;
            align-items: center;
            justify-content: space-between;
        }
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        min-height: 105px;
        @media only screen and (max-width: 56.25em) {
            height: 15vh;
            margin-bottom: 20px;
        }
    }
    .detail {
        display: flex;
        align-items: center;
        i {
            color: #2F89A0!important;
            margin: 0;
        }
    }
    .map {
        margin: 0 30px;
    }
</style>