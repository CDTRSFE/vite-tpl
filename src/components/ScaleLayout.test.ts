import { mount } from '@vue/test-utils';
import ScaleLayout from './ScaleLayout.vue';

// 模拟 window 对象
Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1920,
});

Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 1080,
});

// 模拟 document.documentElement
const mockHtml = {
    style: {
        setProperty: vi.fn(),
        width: '',
        height: '',
    },
};

Object.defineProperty(document, 'documentElement', {
    value: mockHtml,
    writable: true,
});

// 模拟 document.body
const mockBody = {
    setAttribute: vi.fn(),
};

Object.defineProperty(document, 'body', {
    value: mockBody,
    writable: true,
});

describe('ScaleLayout', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // 重置窗口尺寸
        window.innerWidth = 1920;
        window.innerHeight = 1080;
    });

    afterEach(() => {
        // 清理事件监听器
        window.removeEventListener('resize', expect.any(Function));
    });

    it('应该正确渲染插槽内容', () => {
        const wrapper = mount(ScaleLayout, {
            slots: {
                default: '<div class="test-content">测试内容</div>',
            },
        });

        expect(wrapper.html()).toContain('<div class="test-content">测试内容</div>');
    });

    it('应该使用默认 props 值', () => {
        mount(ScaleLayout);

        // 验证默认值设置的 CSS 变量
        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-width', '1920px');
        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-height', '1080px');
        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--scale', '1, 1');
    });

    it('应该正确处理自定义 props', () => {
        mount(ScaleLayout, {
            props: {
                w: 1366,
                h: 768,
                fit: 'contain',
            },
        });

        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-width', '1366px');
        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-height', '768px');
    });

    it('应该在 fit="fill" 模式下正确计算缩放比例', () => {
        // 设置不同的窗口尺寸
        window.innerWidth = 1600;
        window.innerHeight = 900;

        mount(ScaleLayout, {
            props: {
                w: 1920,
                h: 1080,
                fit: 'fill',
            },
        });

        // 计算期望的缩放比例
        const expectedScaleW = 1600 / 1920; // ≈ 0.833
        const expectedScaleH = 900 / 1080; // ≈ 0.833

        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--scale', `${expectedScaleW}, ${expectedScaleH}`);
    });

    it('应该在 fit="contain" 模式下使用较小的缩放比例', () => {
        // 设置不同的窗口尺寸
        window.innerWidth = 1600;
        window.innerHeight = 1200;

        mount(ScaleLayout, {
            props: {
                w: 1920,
                h: 1080,
                fit: 'contain',
            },
        });

        const scaleW = 1600 / 1920; // ≈ 0.833
        const scaleH = 1200 / 1080; // ≈ 1.111
        const minScale = Math.min(scaleW, scaleH); // 0.833

        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--scale', `${minScale}, ${minScale}`);
    });

    it('应该正确设置页面边距', () => {
        window.innerWidth = 1600;
        window.innerHeight = 900;

        mount(ScaleLayout, {
            props: {
                w: 1920,
                h: 1080,
            },
        });

        const scaleW = 1600 / 1920;
        const scaleH = 900 / 1080;
        const expectedMarginLeft = (1600 - 1920 * scaleW) / 2;
        const expectedMarginTop = (900 - 1080 * scaleH) / 2;

        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-margin-left', `${expectedMarginLeft}px`);
        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-margin-top', `${expectedMarginTop}px`);
    });

    it('应该设置 HTML 元素的宽高', () => {
        window.innerWidth = 1600;
        window.innerHeight = 900;

        mount(ScaleLayout);

        expect(mockHtml.style.width).toBe('1600px');
        expect(mockHtml.style.height).toBe('900px');
    });

    it('应该为 body 元素设置 scale-container 属性', () => {
        mount(ScaleLayout);

        expect(mockBody.setAttribute).toHaveBeenCalledWith('scale-container', '');
    });

    it('应该在 props 变化时重新计算缩放', async () => {
        const wrapper = mount(ScaleLayout, {
            props: {
                w: 1920,
                h: 1080,
            },
        });

        // 清除之前的调用记录
        vi.clearAllMocks();

        // 更新 props
        await wrapper.setProps({
            w: 1366,
            h: 768,
        });

        await nextTick();

        // 验证重新计算
        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-width', '1366px');
        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-height', '768px');
    });

    it('应该监听窗口 resize 事件', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

        mount(ScaleLayout);

        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('应该在窗口 resize 时重新计算缩放', () => {
        mount(ScaleLayout);

        // 清除之前的调用记录
        vi.clearAllMocks();

        // 模拟窗口尺寸变化
        window.innerWidth = 1366;
        window.innerHeight = 768;

        // 触发 resize 事件
        const resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);

        // 验证重新计算
        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-width', '1920px');
        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--page-height', '1080px');
    });

    it('应该正确处理边界情况 - 零尺寸', () => {
        window.innerWidth = 0;
        window.innerHeight = 0;

        mount(ScaleLayout);

        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--scale', '0, 0');
        expect(mockHtml.style.width).toBe('0px');
        expect(mockHtml.style.height).toBe('0px');
    });

    it('应该正确处理极小的组件尺寸', () => {
        mount(ScaleLayout, {
            props: {
                w: 1,
                h: 1,
            },
        });

        const expectedScaleW = 1920 / 1;
        const expectedScaleH = 1080 / 1;

        expect(mockHtml.style.setProperty).toHaveBeenCalledWith('--scale', `${expectedScaleW}, ${expectedScaleH}`);
    });
});
