import * as DocumentPicker from "expo-document-picker";
import { useCallback, useState } from "react";

export default function useDocument(
  onSuccess?: (files: DocumentPicker.DocumentPickerAsset[]) => void
) {
  const [assets, setAssets] = useState<DocumentPicker.DocumentPickerAsset[]>(
    []
  );

  const getDocument = useCallback(async () => {
    const assets = await DocumentPicker.getDocumentAsync();
    assets.assets && setAssets(assets.assets);
    assets.assets && onSuccess?.(assets.assets);
  }, [onSuccess]);

  return { assets, getDocument };
}
