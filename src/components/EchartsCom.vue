<template>
    <div ref="chartEl" class="w-full h-full"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts/core';
import debounce from 'lodash/debounce';
import type {
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    PictorialBarSeriesOption,
    LineSeriesOption,
    PieSeriesOption,
    ScatterSeriesOption,
    MapSeriesOption,
} from 'echarts/charts';
import { BarChart, PictorialBarChart, LineChart, PieChart, ScatterChart, MapChart, GaugeChart } from 'echarts/charts';
import type {
    // 组件类型的定义后缀都为 ComponentOption
    TooltipComponentOption,
    GridComponentOption,
    LegendComponentOption,
    DataZoomComponentOption,
    SingleAxisComponentOption,
    VisualMapComponentOption,
    TitleComponentOption,
    MarkPointComponentOption,
    MarkAreaComponentOption,
    MarkLineComponentOption,
    GraphicComponentOption,
} from 'echarts/components';
import {
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    SingleAxisComponent,
    VisualMapComponent,
    TitleComponent,
    MarkPointComponent,
    MarkAreaComponent,
    MarkLineComponent,
    GraphicComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | PictorialBarSeriesOption
    | LineSeriesOption
    | PieSeriesOption
    | ScatterSeriesOption
    | MapSeriesOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | DataZoomComponentOption
    | SingleAxisComponentOption
    | VisualMapComponentOption
    | TitleComponentOption
    | MarkPointComponentOption
    | MarkAreaComponentOption
    | MarkLineComponentOption
    | GraphicComponentOption
>;

// 注册必须的组件
echarts.use([
    PictorialBarChart,
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    MapChart,
    GaugeChart,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    SVGRenderer,
    SingleAxisComponent,
    VisualMapComponent,
    TitleComponent,
    MarkPointComponent,
    MarkAreaComponent,
    MarkLineComponent,
    GraphicComponent,
]);
const props = defineProps<{ options: ECOption }>();

const chartEl = ref<HTMLDivElement>();
let myChart: echarts.ECharts | null = null;

// 暴露图表实例给父组件
defineExpose({
    get chartInstance() {
        return myChart;
    },
});

const initCharts = () => {
    if (!chartEl.value) return;
    if (!myChart) {
        myChart = echarts.init(chartEl.value, undefined, { renderer: 'svg', locale: 'ZH' });
    }
    myChart.clear();
    myChart.setOption(props.options);
};

onMounted(() => {
    setTimeout(initCharts, 400);
    const resizeFn = debounce(() => myChart && myChart.resize(), 400);

    // 使用 ResizeObserver 监听图表容器尺寸变化
    if (chartEl.value) {
        const resizeObserver = new ResizeObserver(resizeFn);
        resizeObserver.observe(chartEl.value);

        // 在组件卸载时清理观察器和图表实例
        onUnmounted(() => {
            resizeObserver.disconnect();
            myChart?.dispose();
        });
    }
});
// 请求参数发生改变时重新渲染
watch(
    () => props.options,
    () => {
        initCharts();
    },
);
</script>
