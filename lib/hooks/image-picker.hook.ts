import { toggleToast } from "@/lib/utils/toast";
import * as ImagePickerNative from "expo-image-picker";
import { useCallback } from "react";

export function useImagePicker(
  onSuccess?: (file: ImagePickerNative.ImagePickerAsset) => void
) {
  const pickImage = useCallback(async () => {
    const result = await ImagePickerNative.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.5,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      if (result.assets?.length) {
        const file = result.assets[0];

        onSuccess?.(file);
      }
    } else {
      toggleToast("You did not select any image.", "error");
    }
  }, [onSuccess]);
  return { pickImage };
}
