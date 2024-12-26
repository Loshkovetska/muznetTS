import { supabase } from "@/lib/utils/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";

export const uploadImage = async (photo: ImagePickerAsset[] | string[]) => {
  if (!photo.length) return [];
  const imagesUrls = [];
  const old_photos = photo.filter((photo) => typeof photo === "string");
  const new_photos = photo.filter((photo) => typeof photo !== "string");

  if (old_photos.length === photo.length) {
    return old_photos;
  }

  for (let i = 0; i < new_photos.length; i++) {
    const file = new_photos[i] as ImagePickerAsset;

    const base64Str = await FileSystem.readAsStringAsync(file.uri, {
      encoding: "base64",
    });

    const buffer = decode(base64Str);

    const bucket = await supabase.storage
      .from("Images")
      .upload(file.fileName || "", buffer, {
        contentType: file.type === "image" ? "image/png" : "video/mp4",
      });

    if (bucket.error) throw new Error("Can't upload image to Storage");

    imagesUrls.push(bucket.data.path);
  }
  return [...old_photos, ...imagesUrls];
};
