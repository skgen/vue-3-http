<template>
  <div v-if="!loaded">
    <mk-skeleton
      height="20px"
      width="100%"
    />
  </div>
  <template v-else>
    <div v-if="loading">
      Re loading ...
    </div>
    <pre v-if="error">{{ error }}</pre>
    <template v-if="(error instanceof HttpResponseTypeError)">
      <pre>{{ error.zodError }}</pre>
    </template>
    <div v-else>
      <div class="pux-AppCollection">
        <AppChip
          v-for="(item, index) of props.collection"
          :key="index"
        >
          <slot>{{ item }}</slot>
        </AppChip>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup generic="T">
import { HttpResponseTypeError } from '@patriarche/vue-http';
import AppChip from '@/app/components/AppChip.vue';

type Props = {
  collection: T[];
  loading?: boolean;
  loaded?: boolean;
  error?: Error | HttpResponseTypeError | null;
};

const props = defineProps<Props>();
</script>

<style lang="scss">
.pux-AppCollection {
    display: flex;
    flex-wrap: wrap;
    gap: var(--app-m-1);
}
</style>
