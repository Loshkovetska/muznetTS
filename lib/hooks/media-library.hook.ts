import * as MediaLibrary from "expo-media-library";
import { useCallback, useState } from "react";

export default function useMediaLibrary() {
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const getAlbums = useCallback(async () => {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }, []);

  return { albums, getAlbums };
}
