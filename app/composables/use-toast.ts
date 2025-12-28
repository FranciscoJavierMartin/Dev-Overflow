import { toast } from 'vue-sonner';

export function useToast() {
  function showErrorToast(message: string) {
    toast.error(message, {
      richColors: true,
    });
  }

  function showSuccessToast(message: string) {
    toast.success(message, {
      richColors: true,
    });
  }

  return {
    showErrorToast,
    showSuccessToast,
  };
}
