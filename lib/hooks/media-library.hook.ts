import * as MediaLibrary from "expo-media-library";
import { useCallback, useEffect, useState } from "react";

export default function useMediaLibrary(enabled: boolean = true) {
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
    if (!enabled) return;
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });

    const album = fetchedAlbums.find((a) => a.title === "Recents");
    setCurrentAlbum(album || null);
    setAlbums(fetchedAlbums);
  }, [enabled]);

  const getAlbumMedia = useCallback(async () => {
    if (currentAlbum && enabled) {
      const medias = await MediaLibrary.getAssetsAsync({
        album: currentAlbum,
        mediaType: ["photo", "video"],
      });

      const res: MediaLibrary.AssetInfo[] = [];
      for (let i = 0; i < medias.assets.length; i++) {
        const media = await MediaLibrary.getAssetInfoAsync(medias.assets[i]);

        res.push(media);
      }

      setAlbumMedia(res);
    }
  }, [currentAlbum, enabled]);

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  useEffect(() => {
    getAlbumMedia();
  }, [getAlbumMedia]);

  return { albums, albumMedia, currentAlbum, setCurrentAlbum, getAlbums };
}
