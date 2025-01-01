import CameraDialog from "@/components/dialogs/camera-dialog";
import SelectAlbumDialog from "@/components/dialogs/select-album-dialog";
import PostGalleryList from "@/components/forms/post-form/post-gallery/post-gallery-list";
import PostItemCarousel from "@/components/post-item/post-item-carousel";
import Button from "@/components/ui/button";
import useMediaLibrary from "@/lib/hooks/media-library.hook";
import { setValueToForm } from "@/lib/utils";
import { typography } from "@/tamagui.config";
import { Camera, ChevronDown } from "@tamagui/lucide-icons";
import { Album, Asset } from "expo-media-library";
import { useCallback, useMemo, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { XStack } from "tamagui";

export default function PostGallery({ form }: { form: UseFormReturn<any> }) {
  const media = useWatch({ control: form.control, name: "media" });
  const { albums, albumMedia, currentAlbum, setCurrentAlbum } =
    useMediaLibrary();
  const [isOpen, setOpen] = useState(false);
  const [isCameraOpen, setCameraOpen] = useState(false);

  const onAlbumSelect = useCallback(
    (album: Album) => {
      setCurrentAlbum(album);
      setOpen(false);
    },
    [setCurrentAlbum]
  );

  const selectedMedia = useMemo(
    () => media?.map((m: any) => m.id) || [],
    [media]
  );

  const onValueChange = useCallback(
    (id: string) => {
      const selected = albumMedia.find((a) => a.id === id);
      let mediaArr = media;
      if (selectedMedia.includes(id)) {
        mediaArr = mediaArr.filter((m: Asset) => m.id !== id);
      } else {
        mediaArr = [...media, selected];
      }

      setValueToForm(form, "media", mediaArr);
    },
    [albumMedia, form, selectedMedia, media]
  );

  console.log(media);

  return (
    <>
      <PostItemCarousel
        media={media}
        inView
      />
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={16}
        paddingVertical={12}
      >
        <Button
          width="auto"
          gap={0}
          iconRight={<ChevronDown size={18} />}
          variant="transparent"
          textProps={typography["heading-14"]}
          onPress={() => setOpen(true)}
        >
          {currentAlbum?.title}
        </Button>
        <Button
          iconLeft={<Camera size={18} />}
          variant="transparent"
          textProps={typography["heading-14"]}
          onPress={() => setCameraOpen(true)}
        >
          Take a Photo / Video
        </Button>
      </XStack>
      <PostGalleryList
        selectedAssets={selectedMedia}
        albumMedia={albumMedia}
        onValueChange={onValueChange}
      />
      <SelectAlbumDialog
        open={isOpen}
        albums={albums}
        onValueChange={onAlbumSelect}
        onOpenChange={() => setOpen(false)}
      />
      <CameraDialog
        open={isCameraOpen}
        onOpenChange={() => setCameraOpen(false)}
        onSendMessage={() => {}}
      />
    </>
  );
}
