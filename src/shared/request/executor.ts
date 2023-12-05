import { useGlobalLoading, useSecondaryLoading } from 'shared/composables/useLoadingState';


export const enum LoadingType {
  Global = 'global',
  Secondary = 'secondary',
}

export interface ExecutorOptions<T> {
  request: Promise<any>
  showError?: boolean
  loadingType?: LoadingType
  onResult?: (data: T) => void
  onError?: (error: any) => void
  onComplete?: () => void
}

const globalLoadingState = useGlobalLoading();
const secondaryLoadingState = useSecondaryLoading();

export abstract class Executor {
  static async run<T = any>(options: ExecutorOptions<T>): Promise<any> {
    const {
      request,
      loadingType,
      onResult,
      onError,
      onComplete,
      showError,
    } = options;
    let { loadingState } = options;

    if (!loadingState && loadingType)
      loadingState = loadingType === LoadingType.Global ? globalLoadingState : secondaryLoadingState;

    const loading = (loading: boolean) => {
      if (loadingState)
        loading ? loadingState.startLoading() : loadingState.stopLoading();
    };

    const parseErrorMessage = (error: any) => {
      if (!error)
        return 'Что то пошло не так';

        return error;
    };

    const handleError = (error: any) => {
      if (showError) {
        const errorText = parseErrorMessage(error._data?.detail);
        const errorStatus = error.status ? error.status : 'Попробуйте позднее';
        this.$swal(errorText)
      }

      onError?.({
        status: error.status,
        message: error._data,
      });
    };

    try {
      loading(true);
      const result = await request;

      onResult?.(result);

      return result;
    } catch (error) {
      handleError(error);
      return error;
    } finally {
      loading(false);
      onComplete?.();
    }
  }
    static $swal(arg0: string) {
        throw new Error('Method not implemented.');
    }
}
