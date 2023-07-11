<template>
  <AppCollection
    :collection="getNameFromEntities(starships)"
    :loaded="loaded"
    :loading="loading"
    :error="error"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useHttpProvider } from '@patriarche/vue-http';
import { getNameFromEntities } from '@/app/lib/requestExtractor';
import AppCollection from '@/app/components/AppCollection.vue';

const { httpProvider } = useHttpProvider();

const error = ref<Error | null>(null);
const loaded = ref(false);
const loading = ref(false);
const starships = ref<{ name: string }[]>([]);

async function getData() {
  loading.value = true;
  const { datasource } = httpProvider.value;
  try {
    const res = await datasource.get('/starships');
    starships.value = res.data.results;
    loading.value = false;
  } catch (e) {
    if (e instanceof Error) {
      error.value = e;
    }
    throw e;
  } finally {
    loaded.value = true;
  }
}

onMounted(getData);
</script>
