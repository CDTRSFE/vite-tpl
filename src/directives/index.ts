import type { App, Directive } from 'vue';

const directives = import.meta.glob<Directive>(['@/directives/*.js', '!@/directives/index.js'], {
    import: 'default',
    eager: true,
});

export default function(vm: App) {
    Object.keys(directives).forEach(k => {
        const match = k.match(/([^/]+).js/);
        const name = match && match[1];
        name && vm.directive(name, directives[k]);
    });
}
