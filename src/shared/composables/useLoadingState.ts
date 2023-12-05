import { reactive, ref, computed, toRef, type Ref, ComputedRef } from 'vue';

interface LoadingService {
    startLoading: () => void
    stopLoading: () => void
    isLoading: ComputedRef<boolean>
    isBlindLoading: boolean
  }

const state = reactive({
  globalLoadingCount: 0,
  secondaryLoadingCount: 0,
});

function useLoadingControls(loadingCountRef: Ref<number>, isBlindLoading = false): LoadingService {
  const isLoading = computed(() => loadingCountRef.value > 0);

  const startLoading = () => {
    loadingCountRef.value += 1;
  };
  const stopLoading = () => {
    // Prevent fast jumps
    setTimeout(() => {
      if (loadingCountRef.value > 0)
        loadingCountRef.value -= 1;
    });
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    isBlindLoading,
  };
}

export function useGlobalLoading() {
  return useLoadingControls(toRef(state, 'globalLoadingCount'));
}

export function useSecondaryLoading() {
  return useLoadingControls(toRef(state, 'secondaryLoadingCount'));
}

export function useLoading(isBlindLoading = false) {
  const loadingCount = ref(0);
  return useLoadingControls(loadingCount, isBlindLoading);
}
