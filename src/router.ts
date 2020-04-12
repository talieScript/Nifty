import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

const router = new Router({
    routes: [
        {
            path: '',
            name: 'home',
            component: loadView('Home'),
            meta: {
                authenticated: true,
            },
        },
    ]
})

export default router;