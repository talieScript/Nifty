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
                <div class="detail">
                    <a class="social-icon" href="https://www.facebook.com/niftygallery/" target="_blank">
                        <svg class="social-icon" height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m297.277344 508.667969c-2.132813.347656-4.273438.667969-6.421875.960937 2.148437-.292968 4.289062-.613281 6.421875-.960937zm0 0"/><path d="m302.398438 507.792969c-1.019532.1875-2.039063.359375-3.058594.535156 1.019531-.175781 2.039062-.347656 3.058594-.535156zm0 0"/><path d="m285.136719 510.339844c-2.496094.28125-5.007813.53125-7.527344.742187 2.519531-.210937 5.03125-.460937 7.527344-.742187zm0 0"/><path d="m290.054688 509.738281c-1.199219.160157-2.40625.308594-3.609376.449219 1.203126-.140625 2.410157-.289062 3.609376-.449219zm0 0"/><path d="m309.367188 506.410156c-.898438.191406-1.800782.382813-2.703126.566406.902344-.183593 1.804688-.375 2.703126-.566406zm0 0"/><path d="m326.664062 502.113281c-.726562.207031-1.453124.402344-2.179687.605469.726563-.203125 1.453125-.398438 2.179687-.605469zm0 0"/><path d="m321.433594 503.542969c-.789063.207031-1.582032.417969-2.375.617187.792968-.199218 1.585937-.40625 2.375-.617187zm0 0"/><path d="m314.589844 505.253906c-.835938.195313-1.679688.378906-2.523438.566406.84375-.1875 1.6875-.371093 2.523438-.566406zm0 0"/><path d="m277.527344 511.089844c-1.347656.113281-2.695313.214844-4.046875.304687 1.351562-.089843 2.699219-.191406 4.046875-.304687zm0 0"/><path d="m512 256c0-141.363281-114.636719-256-256-256s-256 114.636719-256 256 114.636719 256 256 256c1.503906 0 3-.03125 4.5-.058594v-199.285156h-55v-64.097656h55v-47.167969c0-54.703125 33.394531-84.476563 82.191406-84.476563 23.367188 0 43.453125 1.742188 49.308594 2.519532v57.171875h-33.648438c-26.546874 0-31.6875 12.617187-31.6875 31.128906v40.824219h63.476563l-8.273437 64.097656h-55.203126v189.453125c107.003907-30.675781 185.335938-129.257813 185.335938-246.109375zm0 0"/><path d="m272.914062 511.429688c-2.664062.171874-5.339843.308593-8.023437.398437 2.683594-.089844 5.359375-.226563 8.023437-.398437zm0 0"/><path d="m264.753906 511.835938c-1.414062.046874-2.832031.082031-4.25.105468 1.417969-.023437 2.835938-.058594 4.25-.105468zm0 0"/></svg>
                    </a>
                    <a class="social-icon" href="https://www.instagram.com/nigel_emery/" target="_blank">
                        <svg class="social-icon" height="511pt" viewBox="0 0 511 511.9" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.949219 150.5c-1.199219-27.199219-5.597657-45.898438-11.898438-62.101562-6.5-17.199219-16.5-32.597657-29.601562-45.398438-12.800781-13-28.300781-23.101562-45.300781-29.5-16.296876-6.300781-34.898438-10.699219-62.097657-11.898438-27.402343-1.300781-36.101562-1.601562-105.601562-1.601562s-78.199219.300781-105.5 1.5c-27.199219 1.199219-45.898438 5.601562-62.097657 11.898438-17.203124 6.5-32.601562 16.5-45.402343 29.601562-13 12.800781-23.097657 28.300781-29.5 45.300781-6.300781 16.300781-10.699219 34.898438-11.898438 62.097657-1.300781 27.402343-1.601562 36.101562-1.601562 105.601562s.300781 78.199219 1.5 105.5c1.199219 27.199219 5.601562 45.898438 11.902343 62.101562 6.5 17.199219 16.597657 32.597657 29.597657 45.398438 12.800781 13 28.300781 23.101562 45.300781 29.5 16.300781 6.300781 34.898438 10.699219 62.101562 11.898438 27.296876 1.203124 36 1.5 105.5 1.5s78.199219-.296876 105.5-1.5c27.199219-1.199219 45.898438-5.597657 62.097657-11.898438 34.402343-13.300781 61.601562-40.5 74.902343-74.898438 6.296876-16.300781 10.699219-34.902343 11.898438-62.101562 1.199219-27.300781 1.5-36 1.5-105.5s-.101562-78.199219-1.300781-105.5zm-46.097657 209c-1.101562 25-5.300781 38.5-8.800781 47.5-8.601562 22.300781-26.300781 40-48.601562 48.601562-9 3.5-22.597657 7.699219-47.5 8.796876-27 1.203124-35.097657 1.5-103.398438 1.5s-76.5-.296876-103.402343-1.5c-25-1.097657-38.5-5.296876-47.5-8.796876-11.097657-4.101562-21.199219-10.601562-29.398438-19.101562-8.5-8.300781-15-18.300781-19.101562-29.398438-3.5-9-7.699219-22.601562-8.796876-47.5-1.203124-27-1.5-35.101562-1.5-103.402343s.296876-76.5 1.5-103.398438c1.097657-25 5.296876-38.5 8.796876-47.5 4.101562-11.101562 10.601562-21.199219 19.203124-29.402343 8.296876-8.5 18.296876-15 29.398438-19.097657 9-3.5 22.601562-7.699219 47.5-8.800781 27-1.199219 35.101562-1.5 103.398438-1.5 68.402343 0 76.5.300781 103.402343 1.5 25 1.101562 38.5 5.300781 47.5 8.800781 11.097657 4.097657 21.199219 10.597657 29.398438 19.097657 8.5 8.300781 15 18.300781 19.101562 29.402343 3.5 9 7.699219 22.597657 8.800781 47.5 1.199219 27 1.5 35.097657 1.5 103.398438s-.300781 76.300781-1.5 103.300781zm0 0"/><path d="m256.449219 124.5c-72.597657 0-131.5 58.898438-131.5 131.5s58.902343 131.5 131.5 131.5c72.601562 0 131.5-58.898438 131.5-131.5s-58.898438-131.5-131.5-131.5zm0 216.800781c-47.097657 0-85.300781-38.199219-85.300781-85.300781s38.203124-85.300781 85.300781-85.300781c47.101562 0 85.300781 38.199219 85.300781 85.300781s-38.199219 85.300781-85.300781 85.300781zm0 0"/><path d="m423.851562 119.300781c0 16.953125-13.746093 30.699219-30.703124 30.699219-16.953126 0-30.699219-13.746094-30.699219-30.699219 0-16.957031 13.746093-30.699219 30.699219-30.699219 16.957031 0 30.703124 13.742188 30.703124 30.699219zm0 0"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { getPicUrl } from '../utils.js'
    import { API } from '../API.ts'
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

    export default Vue.extend({
        name: 'Contact',
        metaInfo() {
            return {
                titleTemplate: '%s | Contact',
                meta: [
                    { name: 'description', content: 'Contact us.' },
                ]
            }
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
    .social-icon {
        width: 30px;
        height: auto;
        cursor: pointer;
        color: #2F89A0;
        &:not(:last-of-type) {
            margin-right: 15px;
        }
        svg {
            fill: #2F89A0;
        }
    }
</style>