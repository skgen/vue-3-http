<template>
  <AppCollection
    :collection="getNameFromEntities(starships)"
    :loaded="loaded"
    :loading="loading"
    :error="error"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRequest, type HttpRequest } from '@patriarche/vue-http';
import AppCollection from '@/app/components/AppCollection.vue';
import { getNameFromEntities } from '@/app/lib/requestExtractor';

type StarshipsRequest = HttpRequest<'GET', '/starships'>;

type StarshipsResponse = {
  results: {
    name: string;
  }[];
};

const {
  data,
  loading,
  loaded,
  error,
} = useRequest<StarshipsRequest, StarshipsResponse>({
  method: 'GET',
  url: '/starships',
});

const starships = computed(() => (data.value?.results ? data.value.results : []));
</script>
