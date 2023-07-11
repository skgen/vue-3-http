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
import { createRequest, type HttpRequest } from '@patriarche/vue-http';
import { getNameFromEntities } from '@/app/lib/requestExtractor';
import AppCollection from '@/app/components/AppCollection.vue';

type StarshipsRequest = HttpRequest<'GET', '/starships'>;

type StarshipsResponse = {
  results: {
    name: string;
  }[];
};

const loading = ref(false);
const error = ref<Error | null>(null);
const loaded = ref(false);
const starships = ref<{ name: string }[]>([]);

const { exec, cancel } = createRequest<StarshipsRequest, StarshipsResponse>(
  {
    method: 'GET',
    url: '/starships',
  },
  {
    onLoadingChange: ((newLoading) => {
      loading.value = newLoading;
    }),
  },
);

async function getData() {
  try {
    cancel();
    const res = await exec();
    if (res) {
      starships.value = res.data.results;
    }
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
