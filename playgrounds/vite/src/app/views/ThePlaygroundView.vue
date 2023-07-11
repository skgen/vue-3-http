<template>
  <div class="pux-ThePlaygroundView">
    <AppDemoBlock
      v-for="item of list"
      :key="item.name"
    >
      <template #block>
        {{ item.name }}
      </template>
      <component :is="item.component" />
    </AppDemoBlock>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import AppDemoBlock from '@/app/components/partials/AppDemoBlock.vue';

const blocks = [
  'TheGetHttpProvider',
  'TheUseHttpProvider',
  'TheCreateRequest',
  'TheUseRequest',
  'TheUseTypedRequest',
];

const list = blocks.map((block) => ({
  name: block,
  component: defineAsyncComponent(() => import(`@/app/components/blocks/${block}.vue`)),
}));

</script>

<style lang="scss">
.pux-ThePlaygroundView {
    display: flex;
    flex-direction: column;
    gap: var(--app-m-4);
    min-height: 100vh;
    padding: var(--app-m-2);
}
</style>
