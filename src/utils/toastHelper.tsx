// src/utils/toastHelper.tsx
import { useToast } from "@/hooks/use-toast"

// Define valid toast variants
type ToastVariant = "default" | "destructive";

// Custom Toast Hook
export const useCustomToast = () => {
  const { toast } = useToast();

  // Function to create a toast object
  const createToast = (title: string, description: string, variant: ToastVariant) => ({
    title,
    description,
    variant,
  });

  // Function to show the toast
  const showCustomToast = (title: string, description: string, variant: ToastVariant) => {
    const toastObject = createToast(title, description, variant);
    toast(toastObject); // Call the toast function with the created toast object
  };

  return { showCustomToast };
};