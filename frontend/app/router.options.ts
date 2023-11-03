import type { RouterConfig } from '@nuxt/schema'
import { useRuntimeConfig } from 'nuxt/app';

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
  routes: (_routes) => {
    let routesToPush = [];
    let siteType = useRuntimeConfig().public.siteType;

    if(siteType === 'HQ') {
        routesToPush.push({
            name: 'index',
            path: '/',
            component: () => import('~/pages/hq/index.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'blog', 
            path: '/blog',
            component: () => import('~/pages/hq/blog/index.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'blog-slug', 
            path: '/blog/:slug',
            component: () => import('~/pages/hq/blog/[slug].vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'locations', 
            path: '/locations',
            component: () => import('~/pages/hq/locations.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'videos', 
            path: '/videos',
            component: () => import('~/pages/hq/videos.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'uri', 
            path: '/:uri',
            component: () => import('~/pages/[uri].vue').then(r => r.default || r)
        })
    }
    else {
        routesToPush.push({
            name: 'index',
            path: '/',
            component: () => import('~/pages/store/index.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'about-us', 
            path: '/about-us',
            component: () => import('~/pages/store/about-us/index.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'about-us-services', 
            path: '/about-us/services',
            component: () => import('~/pages/store/about-us/services.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'agent-name', 
            path: '/agent/:name',
            component: () => import('~/pages/store/agent/[name].vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'events-slug', 
            path: '/events/:slug',
            component: () => import('~/pages/store/events/[slug].vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'find-a-home-name', 
            path: '/find-a-home/:name',
            component: () => import('~/pages/store/find-a-home/[name].vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'find-a-home', 
            path: '/find-a-home',
            component: () => import('~/pages/store/find-a-home/index.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'homebuyers-guide-uri', 
            path: '/homebuyers-guide/:uri',
            component: () => import('~/pages/store/homebuyers-guide/[uri].vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'homebuyers-guide-index', 
            path: '/homebuyers-guide',
            component: () => import('~/pages/store/homebuyers-guide/index.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'prequalify', 
            path: '/prequalify',
            component: () => import('~/pages/store/prequalify.vue').then(r => r.default || r)
        })
        routesToPush.push({
            name: 'faqs', 
            path: '/faqs',
            component: () => import('~/pages/store/faqs.vue').then(r => r.default || r)
        })
        //Contact
        routesToPush.push({
            name: 'contact', 
            path: '/contact',
            component: () => import('~/pages/store/contact.vue').then(r => r.default || r)
        })
    }

    return routesToPush
},
}

