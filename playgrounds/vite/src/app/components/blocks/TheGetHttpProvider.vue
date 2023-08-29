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
import { getHttpProvider, RequestError } from '@patriarche/vue-http';
import { getNameFromEntities } from '@/app/lib/requestExtractor';
import AppCollection from '@/app/components/AppCollection.vue';

const error = ref<RequestError | null>(null);
const loaded = ref(false);
const loading = ref(false);
const starships = ref<{ name: string }[]>([]);

async function getData() {
  loading.value = true;
  const httpProvider = getHttpProvider();
  const { datasource } = httpProvider;
  try {
    const res = await datasource.get('/starships');
    starships.value = res.data.results;
    loading.value = false;
  } catch (e) {
    if (e instanceof RequestError) {
      error.value = e;
    }
    throw e;
  } finally {
    loaded.value = true;
  }
}

onMounted(getData);
</script>
