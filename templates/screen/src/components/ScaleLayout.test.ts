import { mount } from '@vue/test-utils';
import ScaleLayout from './ScaleLayout.vue';

const html = document.documentElement;
const originalStyle = html.getAttribute('style');
const originalContainer = document.body.getAttribute('scale-container');

function resize(width: number, height: number) {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: height });
    window.dispatchEvent(new Event('resize'));
}

beforeEach(() => {
    resize(1920, 1080);
});

afterEach(() => {
    if (originalStyle === null) html.removeAttribute('style');
    else html.setAttribute('style', originalStyle);
    if (originalContainer === null) document.body.removeAttribute('scale-container');
    else document.body.setAttribute('scale-container', originalContainer);
});

describe('ScaleLayout', () => {
    it('renders content and establishes the default design canvas', () => {
        const wrapper = mount(ScaleLayout, { slots: { default: '<div>画布内容</div>' } });
        expect(wrapper.text()).toBe('画布内容');
        expect(html.style.getPropertyValue('--page-width')).toBe('1920px');
        expect(html.style.getPropertyValue('--page-height')).toBe('1080px');
        expect(html.style.getPropertyValue('--scale')).toBe('1, 1');
        expect(document.body.hasAttribute('scale-container')).toBe(true);
    });

    it('fills a different aspect ratio using independent width and height scales', () => {
        resize(1600, 1200);
        mount(ScaleLayout);
        expect(html.style.getPropertyValue('--scale')).toBe('0.8333333333333334, 1.1111111111111112');
        expect(html.style.getPropertyValue('--page-margin-left')).toBe('0px');
        expect(html.style.getPropertyValue('--page-margin-top')).toBe('0px');
    });

    it('contains the whole canvas with equal scales and centered letterboxing', () => {
        resize(1600, 1200);
        mount(ScaleLayout, { props: { fit: 'contain' } });
        expect(html.style.getPropertyValue('--scale')).toBe('0.8333333333333334, 0.8333333333333334');
        expect(html.style.getPropertyValue('--page-margin-top')).toBe('150px');
    });

    it('updates the canvas when dimensions or fit change', async () => {
        const wrapper = mount(ScaleLayout);
        await wrapper.setProps({ w: 960, h: 1080, fit: 'contain' });
        expect(html.style.getPropertyValue('--page-width')).toBe('960px');
        expect(html.style.getPropertyValue('--scale')).toBe('1, 1');
        expect(html.style.getPropertyValue('--page-margin-left')).toBe('480px');
    });

    it('responds to resize including a temporarily zero-sized viewport', () => {
        mount(ScaleLayout);
        resize(960, 540);
        expect(html.style.getPropertyValue('--scale')).toBe('0.5, 0.5');
        expect(html.style.width).toBe('960px');
        resize(0, 0);
        expect(html.style.getPropertyValue('--scale')).toBe('0, 0');
    });

    it('restores owned styles and attributes on unmount without removing unrelated changes', () => {
        html.style.setProperty('--scale', '2, 2');
        html.style.setProperty('width', '80%', 'important');
        document.body.setAttribute('scale-container', 'previous');
        const wrapper = mount(ScaleLayout);
        html.style.setProperty('--unrelated', 'kept');
        wrapper.unmount();
        expect(html.style.getPropertyValue('--scale')).toBe('2, 2');
        expect(html.style.getPropertyPriority('width')).toBe('important');
        expect(html.style.width).toBe('80%');
        expect(html.style.getPropertyValue('--page-width')).toBe('');
        expect(html.style.getPropertyValue('--unrelated')).toBe('kept');
        expect(document.body.getAttribute('scale-container')).toBe('previous');
    });

    it('stops responding after unmount and can be mounted again', () => {
        const first = mount(ScaleLayout);
        first.unmount();
        resize(960, 540);
        expect(html.style.getPropertyValue('--scale')).toBe('');
        expect(document.body.hasAttribute('scale-container')).toBe(false);
        const second = mount(ScaleLayout, { props: { w: 960, h: 540 } });
        expect(html.style.getPropertyValue('--scale')).toBe('1, 1');
        second.unmount();
        resize(1920, 1080);
        expect(html.style.getPropertyValue('--scale')).toBe('');
    });
});
