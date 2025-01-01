import BottomBar from "@/components/bottom-bar";
import PostGalleryFunc from "@/components/forms/post-form/post-gallery/post-gallery-func";
import PostGalleryList from "@/components/forms/post-form/post-gallery/post-gallery-list";
import InfoMessage from "@/components/info-message";
import PostItemCarousel from "@/components/post-item/post-item-carousel";
import Button from "@/components/ui/button";
import { SCREEN_WIDTH } from "@/lib/constants";
import useMediaLibrary from "@/lib/hooks/media-library.hook";
import { setValueToForm } from "@/lib/utils";
import { Asset } from "expo-media-library";
import { useCallback, useMemo } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

type PostGalleryPropType = {
  form: UseFormReturn<any>;
  edit?: boolean;
  onNext: () => void;
};

export default function PostGallery({
  form,
  edit,
  onNext,
}: PostGalleryPropType) {
  const media = useWatch({ control: form.control, name: "media" });
  const { albums, albumMedia, currentAlbum, setCurrentAlbum } =
    useMediaLibrary();

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
      {!edit && (
        <>
          <PostGalleryFunc
            albums={albums}
            currentAlbum={currentAlbum}
            setCurrentAlbum={setCurrentAlbum}
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
