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
import { z } from 'zod';
import { useTypedRequest, type HttpRequest } from '@patriarche/vue-http';
import AppCollection from '@/app/components/AppCollection.vue';
import { getNameFromEntities } from '@/app/lib/requestExtractor';

type StarshipsRequest = HttpRequest<'GET', '/starships'>;

const starshipsResponseSchema = z.object({
  results: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

const {
  data,
  loading,
  loaded,
  error,
} = useTypedRequest<StarshipsRequest, typeof starshipsResponseSchema>(
  {
    method: 'GET',
    url: '/starships',
  },
  starshipsResponseSchema,
);

const starships = computed(() => (data.value?.results ? data.value.results : []));
</script>
