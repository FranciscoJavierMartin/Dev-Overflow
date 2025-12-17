import { toast } from 'vue-sonner';

export function useToast() {
  function showErrorToast(message: string) {
    toast.error(message, {
      richColors: true,
    });
  }

  return {
    showErrorToast,
  };
}
