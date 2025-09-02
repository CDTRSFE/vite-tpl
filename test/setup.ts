import { config } from '@vue/test-utils';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

// 全局配置 Vue Test Utils
config.global.stubs = {
    // // Vue 内置组件
    // transition: false,
    // 'transition-group': false,
    // // Ant Design Vue 常用组件
    // 'a-button': true,
    // 'a-input': true,
    // 'a-form': true,
    // 'a-form-item': true,
    // 'a-select': true,
    // 'a-table': true,
    // 'a-modal': true,
    // 'a-dropdown': true,
    // 'a-menu': true,
    // 'a-menu-item': true,
    // 'a-tabs': true,
    // 'a-tab-pane': true,
    // // Element Plus 常用组件
    // 'el-button': true,
    // 'el-input': true,
    // 'el-form': true,
    // 'el-form-item': true,
    // 'el-select': true,
    // 'el-table': true,
    // 'el-dialog': true,
    // // 项目中的全局组件，如果测试中遇到问题可以添加
    // 'confirm-dialog': true,
    // dialog: true,
    // 'no-data': true,
    // 'scale-layout': true,
    // 'title-box': true,
    // transfer: true,
    // 'keywords-input': true,
};

// 模拟axios
const genMockAxiosFn = () =>
    vi.fn(() =>
        Promise.resolve({
            data: {
                code: 200,
                data: [],
            },
        }),
    );
const mockAxios = {
    get: genMockAxiosFn(),
    post: genMockAxiosFn(),
    put: genMockAxiosFn(),
    delete: genMockAxiosFn(),
    request: genMockAxiosFn(),
    head: genMockAxiosFn(),
    options: genMockAxiosFn(),
    patch: genMockAxiosFn(),
    interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() },
    },
    defaults: {},
} as any;

vi.mock('axios', () => ({
    default: mockAxios,
}));

vi.mock('clipboard', () => {
    const mockOn = vi.fn();
    const mockDestroy = vi.fn();
    const mockClipboardJS = vi.fn(() => ({
        on: mockOn,
        destroy: mockDestroy,
    }));
    return {
        default: mockClipboardJS,
    };
});

const mockNProgress = {
    start: vi.fn(),
    done: vi.fn(),
    set: vi.fn(),
    inc: vi.fn(),
    configure: vi.fn(),
    status: 0,
    remove: vi.fn(),
    isStarted: vi.fn(() => false),
    setGlobalOptions: vi.fn(),
    get: vi.fn(() => 0),
};
vi.mock('nprogress', () => {
    return mockNProgress;
});

vi.mock('vue-router', () => {
    return {
        useRoute: vi.fn(() => {
            return {
                query: {},
                params: {},
                name: '',
                fullPath: '',
                matched: [],
                path: '',
            };
        }),
        useRouter: vi.fn(() => ({
            push: vi.fn(),
            replace: vi.fn(),
            go: vi.fn(),
            back: vi.fn(),
            forward: vi.fn(),
            beforeEach: vi.fn(),
            afterEach: vi.fn(),
            onError: vi.fn(),
            resolve: vi.fn(),
            options: {},
        })),
        onBeforeRouteLeave: vi.fn((fn) => {
            return fn;
        }),
    };
});

beforeAll(() => {
    // 模拟window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });

    // 模拟window.axios，因为项目中axios是通过插件挂载到window对象上的
    Object.defineProperty(window, 'axios', {
        writable: true,
        value: mockAxios,
    });

    Object.defineProperty(window, 'NProgress', {
        writable: true,
        value: mockNProgress,
    });

    Object.defineProperty(window, '$message', {
        writable: false,
        value: {
            success: vi.fn(),
            error: vi.fn(),
            warning: vi.fn(),
            info: vi.fn(),
            loading: vi.fn(() => ({ close: vi.fn() })),
        },
    });

    Object.defineProperty(window, '$modal', {
        writable: false,
        value: {
            confirm: vi.fn(() => Promise.resolve(true)),
        },
    });
});

// 每个测试后清理模拟
afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
});

// 所有测试结束后清理
afterAll(() => {
    vi.resetAllMocks();
});
