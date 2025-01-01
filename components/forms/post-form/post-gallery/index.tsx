import BottomBar from "@/components/bottom-bar";
import CameraDialog from "@/components/dialogs/camera-dialog";
import SelectAlbumDialog from "@/components/dialogs/select-album-dialog";
import PostGalleryList from "@/components/forms/post-form/post-gallery/post-gallery-list";
import InfoMessage from "@/components/info-message";
import PostItemCarousel from "@/components/post-item/post-item-carousel";
import Button from "@/components/ui/button";
import { SCREEN_WIDTH } from "@/lib/constants";
import useMediaLibrary from "@/lib/hooks/media-library.hook";
import { setValueToForm } from "@/lib/utils";
import { typography } from "@/tamagui.config";
import { Camera, ChevronDown } from "@tamagui/lucide-icons";
import { Album, Asset } from "expo-media-library";
import { useCallback, useMemo, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { XStack } from "tamagui";

export default function PostGallery({
  form,
  edit,
}: {
  form: UseFormReturn<any>;
  edit?: boolean;
}) {
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
        if (media.length === 3) {
          return;
        }
        mediaArr = [...media, selected];
      }

      setValueToForm(form, "media", mediaArr);
    },
    [albumMedia, form, selectedMedia, media]
  );

  const imagesUri = useMemo(
    () => media?.map((c: any) => c?.localUri || c),
    [media]
  );

  return (
    <>
      <PostItemCarousel
        local={!edit}
        media={
          imagesUri?.length
            ? imagesUri
            : albumMedia?.[0]
            ? [albumMedia?.[0]?.localUri || albumMedia?.[0]?.uri]
            : []
        }
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
      <BottomBar
        gap={12}
        flexDirection="column"
        backgroundColor="transparent"
        borderWidth={0}
        bottom={(SCREEN_WIDTH - 80) / 2}
      >
        {media.length === 3 && (
          <InfoMessage
            text="You can’t select more than 3 media files"
            backgroundColor="#F2F3F9"
            textColor="rgba(92, 101, 116, 0.8)"
            borderRadius={8}
            padding={8}
          />
        )}
        <Button
          variant="dark"
          sizeB="lg"
          height={40}
          disabled={!media.length}
        >
          Next Step ({media.length})
        </Button>
      </BottomBar>
    </>
  );
}
