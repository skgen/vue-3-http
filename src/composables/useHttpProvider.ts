import { ref, onUnmounted, type Ref } from 'vue';
import { getHttpProvider, onMainHttpProviderChange, type HttpProvider } from '@src/lib/httpProvider';

type UseHttpProviderReturnType = {
  httpProvider: Ref<HttpProvider>;
};

export default function useHttpProvider(): UseHttpProviderReturnType {
  const httpProvider = ref(getHttpProvider());

  const stopListening = onMainHttpProviderChange((newHttpProvider) => {
    httpProvider.value = newHttpProvider;
  });

  onUnmounted(stopListening);

  return {
    httpProvider,
  };
}
