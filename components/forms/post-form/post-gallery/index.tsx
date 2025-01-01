import BottomBar from "@/components/bottom-bar";
import PostGalleryFunc from "@/components/forms/post-form/post-gallery/post-gallery-func";
import PostGalleryList from "@/components/forms/post-form/post-gallery/post-gallery-list";
import InfoMessage from "@/components/info-message";
import PostItemCarousel from "@/components/post-item/post-item-carousel";
import Button from "@/components/ui/button";
import { SCREEN_WIDTH } from "@/lib/constants";
import useMediaLibrary from "@/lib/hooks/media-library.hook";
import { setValueToForm } from "@/lib/utils";
import { colors } from "@/tamagui.config";
import { Asset } from "expo-media-library";
import { useCallback, useMemo } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

type PostGalleryPropType = {
  form: UseFormReturn<any>;
  edit?: boolean;
  hideBlocks?: boolean;
  onNext: () => void;
};

export default function PostGallery({
  form,
  edit,
  hideBlocks,
  onNext,
}: PostGalleryPropType) {
  const media = useWatch({ control: form.control, name: "media" });
  const { albums, albumMedia, currentAlbum, setCurrentAlbum } = useMediaLibrary(
    !edit
  );

  const selectedMedia = useMemo(
    () =>
      media?.map((m: any) => {
        return m?.id || m.uri;
      }) || [],
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

  const onCameraValueChange = useCallback(
    (f: any[]) => {
      setValueToForm(form, "media", [...media, ...f]);
    },
    [form, media]
  );

  const imagesUri = useMemo(
    () => media?.map((c: any) => c?.localUri || c?.uri || c),
    [media]
  );

  const carouselMedia = useMemo(
    () =>
      imagesUri?.length
        ? imagesUri
        : albumMedia?.[0]
        ? [albumMedia?.[0]?.localUri]
        : [],
    [imagesUri, albumMedia]
  );

  return (
    <>
      <PostItemCarousel
        local={!edit}
        media={carouselMedia}
        inView
      />
      {!hideBlocks && (
        <>
          <PostGalleryFunc
            albums={albums}
            currentAlbum={currentAlbum}
            setCurrentAlbum={setCurrentAlbum}
            onValueChange={onCameraValueChange}
          />
          <PostGalleryList
            selectedAssets={selectedMedia}
            albumMedia={albumMedia}
            onValueChange={onValueChange}
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
                backgroundColor={colors["ghost-white"]}
                textColor={colors["gray-80"]}
                borderRadius={8}
                padding={8}
              />
            )}
            <Button
              variant="dark"
              sizeB="lg"
              height={40}
              disabled={!media.length}
              onPress={onNext}
            >
              Next Step ({media.length})
            </Button>
          </BottomBar>
        </>
      )}
    </>
  );
}
