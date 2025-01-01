import CommonImage from "@/components/common-image";
import CommonVideo from "@/components/common-video";
import PostMediaItemRadio from "@/components/forms/post-form/post-gallery/post-gallery-list/post-media-item/post-media-item-radio";
import { SCREEN_WIDTH } from "@/lib/constants";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-media-library";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Stack } from "tamagui";

type PostMediaItemPropType = {
  isSelected?: boolean;
  item: Asset;
  onValueChange: (v: string) => void;
};

function PostMediaItem({
  item,
  isSelected,
  onValueChange,
}: PostMediaItemPropType) {
  const [uri, setUri] = useState<string | null>(null);

  const imageComponent = useMemo(() => {
    const commonProps = {
      width: "100%",
      height: "100%",
      source: uri,
      local: true,
      borderWidth: 0,
    };
    return item.mediaType === "photo" ? (
      <CommonImage
        {...commonProps}
        resizeMode="cover"
      />
    ) : item.mediaType === "video" ? (
      <CommonVideo
        {...commonProps}
        contentFit="cover"
        timeVariant="absolute-right-bottom"
        postView
      />
    ) : null;
  }, [item, uri]);

  const getUri = useCallback(async () => {
    const asset = await MediaLibrary.getAssetInfoAsync(item);

    setUri(asset.localUri || asset.uri);
  }, [item]);

  useEffect(() => {
    getUri();
  }, [getUri]);

  return (
    <Stack
      key={item.id}
      htmlFor={item.id}
      width={(SCREEN_WIDTH - 2) / 4}
      height={(SCREEN_WIDTH - 2) / 4}
      position="relative"
      onPress={() => onValueChange(item.id)}
    >
      {isSelected && (
        <Stack
          backgroundColor="rgba(256,256,256,0.3)"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={1}
        />
      )}
      <PostMediaItemRadio isSelected={isSelected} />
      {imageComponent}
    </Stack>
  );
}

export default React.memo(PostMediaItem);