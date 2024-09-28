<template>
  <ElTabs v-model="activeTab" @tab-click="handleClick">
    <div class="flex justify-center">
      <ElTabPane v-for="(tab, index) in tabsInfo" :key="index" :label="tab.name" :name="tab.id">
        <slot />
      </ElTabPane>
    </div>
  </ElTabs>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import type { TGenre } from '@/types/movies';
import { genreInApp } from '@/enum.json'

const emit = defineEmits(['changeTab'])

const tabsInfo = ref<TGenre[]>(genreInApp)
const activeTab = ref<number | string>(tabsInfo.value[0].id)

onMounted(() => {
  emit('changeTab', activeTab.value.toString())
})

const handleClick = (tab: TabsPaneContext) => {
  console.log('TAB', tab.paneName?.toString())
  emit('changeTab', tab.paneName?.toString())
}
</script>
