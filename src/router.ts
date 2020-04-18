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
            path: '/collections/:name',
            name: 'collections',
            component: loadView('Collection'),
            props: true,
        },
        {
            path: '/',
            name: 'contact',
            component: loadView('Contact'),
        },
        {
            path: '*',
            component: loadView('Home'),
        }

    ]
})

export default router;