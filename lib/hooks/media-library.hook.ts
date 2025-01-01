import * as MediaLibrary from "expo-media-library";
import { useCallback, useEffect, useState } from "react";

export default function useMediaLibrary() {
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [albumMedia, setAlbumMedia] = useState<MediaLibrary.AssetInfo[]>([]);
  const [currentAlbum, setCurrentAlbum] = useState<MediaLibrary.Album | null>(
    null
  );
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const getAlbums = useCallback(async () => {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });

    const album = fetchedAlbums.find((a) => a.title === "Recents");
    setCurrentAlbum(album || null);
    setAlbums(fetchedAlbums);
  }, []);

  const getAlbumMedia = useCallback(async () => {
    if (currentAlbum) {
      const medias = await MediaLibrary.getAssetsAsync({ album: currentAlbum });
      const res: MediaLibrary.AssetInfo[] = [];
      for (let i = 0; i < medias.assets.length; i++) {
        const media = await MediaLibrary.getAssetInfoAsync(medias.assets[i]);

        res.push(media);
      }

      setAlbumMedia(res);
    }
  }, [currentAlbum]);

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  useEffect(() => {
    getAlbumMedia();
  }, [getAlbumMedia]);

  return { albums, albumMedia, currentAlbum, setCurrentAlbum, getAlbums };
}
