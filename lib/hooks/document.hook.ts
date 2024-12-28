import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
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

  const downloadFile = useCallback(async (file: string) => {
    const splitted = file.split("/");
    const fileName = splitted?.[splitted.length - 1];

    const downloadResumable = FileSystem.createDownloadResumable(
      file,
      FileSystem.documentDirectory + fileName,
      {}
    );

    try {
      const res = await downloadResumable.downloadAsync();
      res?.uri && alert("File was downloaded!");
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { assets, getDocument, downloadFile };
}
