import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from './App.vue';
import Home from './views/home/Home.vue';

async function mountApp() {
    const host = document.createElement('div');
    host.id = 'app';
    document.body.append(host);
    const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: Home }] });
    await router.push('/');
    const wrapper = mount(App, { attachTo: host, global: { plugins: [router] } });
    await flushPromises();
    return { wrapper, host };
}

it('shows a real message inside the app canvas and initializes the global message API', async () => {
    const { wrapper, host } = await mountApp();
    expect(wrapper.text()).toContain('大屏工程已就绪');
    expect(typeof window.$message.success).toBe('function');
    await wrapper
        .findAll('button')
        .find((button) => button.text() === '消息示例')!
        .trigger('click');
    await flushPromises();
    expect(host.querySelector('.n-message')?.textContent).toContain('Naive UI 消息已接入');
    wrapper.unmount();
    host.remove();
});

it('opens and closes a real dialog inside the app canvas', async () => {
    const { wrapper, host } = await mountApp();
    expect(typeof window.$dialog.info).toBe('function');
    await wrapper
        .findAll('button')
        .find((button) => button.text() === '对话框示例')!
        .trigger('click');
    await flushPromises();
    expect(host.querySelector('.n-dialog')?.textContent).toContain('这是基础对话框示例');
    const close = Array.from(host.querySelectorAll('button')).find((button) => button.textContent?.includes('知道了'));
    expect(close).toBeDefined();
    close!.click();
    await flushPromises();
    // Naive UI 在过渡结束前保留隐藏节点；断言用户已看不到对话框。
    expect((host.querySelector('.n-dialog') as HTMLElement | null)?.style.display ?? 'none').toBe('none');
    wrapper.unmount();
    host.remove();
});
