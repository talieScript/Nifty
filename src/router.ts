import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: loadView('Home'),
        },
        {
            path: '/artist',
            name: 'artist',
            component: loadView('Artist'),
        },
        {
            path: '/tour',
            name: 'tour',
            component: loadView('Tour'),
        },
        {
            path: '/collections/:name',
            name: 'collections',
            component: loadView('Collection'),
            children: [
                { path: 'collection/:name/:picture', component: loadView('Collection')},
            ]
        },
        {
            path: '/collections/:collection/:picture',
            name: 'picture',
            props: true,
            component: loadView('Picture'),
        },
        {
            path: '/contact',
            name: 'contact',
            component: loadView('Contact'),
            props: true,
        },
        {
            path: '*/*',
            component: loadView('Home'),
        }

    ]
})

export default router;