import { detectFileType } from "@/lib/utils";
import { supabase } from "@/lib/utils/supabase";
import { decode } from "base64-arraybuffer";
import { DocumentPickerAsset } from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";

export const uploadImage = async (
  photo: Array<DocumentPickerAsset | ImagePickerAsset | string>
) => {
  if (!photo.length) return [];
  const imagesUrls = [];
  const old_photos = photo.filter((photo) => typeof photo === "string");
  const new_photos = photo.filter((photo) => typeof photo !== "string");

  if (old_photos.length === photo.length) {
    return old_photos;
  }

  for (let i = 0; i < new_photos.length; i++) {
    const file = new_photos[i] as any;
    const uri = file.localUri || file.uri;

    const base64Str = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });

    const buffer = decode(base64Str);

    const uriParts = uri.split("/");
    const fileName = uriParts[uriParts.length - 1];
    const { isImage, isVideo } = detectFileType(fileName);

    const bucket = await supabase.storage
      .from("Images")
      .upload(file.fileName || file?.name || fileName, buffer, {
        contentType: isImage ? "image/png" : isVideo ? "video/mp4" : undefined,
      });

    if (bucket.error) throw new Error("Can't upload image to Storage");

    imagesUrls.push(bucket.data.path);
  }
  return [...old_photos, ...imagesUrls];
};
