import Button from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import { SCREEN_WIDTH } from "@/lib/constants";
import { typography } from "@/tamagui.config";
import { useCallback, useMemo } from "react";
import { Image, Stack, Text, XStack, YStack, styled } from "tamagui";

const BLOCK_HEIGHT = SCREEN_WIDTH - 100;

const ImageWrapper = styled(Stack, {
  variants: {
    variant: {
      full: {
        width: "100%",
        height: "100%",
      },
      "hor-50": {
        flexGrow: 1 / 2,
        height: "100%",
      },
      "v-50": {
        height: BLOCK_HEIGHT / 2 - 4,
      },
    },
    rounded: {
      full: { borderRadius: 12 },
      "hor-50/left": {
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
      },
      "hor-50/right": {
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
      },
      "v-50/top": {
        borderTopRightRadius: 12,
      },
      "v-50/bottom": {
        borderBottomRightRadius: 12,
      },
    },
  } as const,
});

export default function DetailsMedia({
  images,
  onOpen,
}: {
  images: string[];
  onOpen: () => void;
}) {
  const getImage = useCallback(
    (id: number) => (
      <Image
        source={{
          uri: images[id],
        }}
        width="100%"
        height="100%"
        resizeMode="cover"
      />
    ),
    [images]
  );
  const imagesBlock = useMemo(() => {
    if (!images.length) return null;
    if (images.length === 1) {
      return (
        <ImageWrapper
          variant="full"
          rounded="full"
        >
          {getImage(0)}
        </ImageWrapper>
      );
    }
    if (images.length === 2) {
      return (
        <>
          <ImageWrapper
            variant="hor-50"
            rounded="hor-50/left"
          >
            {getImage(0)}
          </ImageWrapper>
          <ImageWrapper
            variant="hor-50"
            rounded="hor-50/right"
          >
            {getImage(1)}
          </ImageWrapper>
        </>
      );
    }

    return (
      <>
        <ImageWrapper
          variant="hor-50"
          rounded="hor-50/left"
        >
          {getImage(0)}
        </ImageWrapper>
        <ImageWrapper
          variant="hor-50"
          gap={9}
        >
          <ImageWrapper
            variant="v-50"
            rounded="v-50/top"
          >
            {getImage(1)}
          </ImageWrapper>
          <ImageWrapper
            variant="v-50"
            rounded="v-50/bottom"
          >
            {getImage(2)}
          </ImageWrapper>
        </ImageWrapper>
      </>
    );
  }, [images, getImage]);

  if (!images.length) return null;
  return (
    <>
      <Separator />
      <YStack
        gap={16}
        width="100%"
      >
        <Text {...typography["bold-20"]}>Media</Text>
        <XStack
          width="100%"
          gap={9}
          height={BLOCK_HEIGHT}
          overflow="hidden"
          borderRadius={12}
        >
          {imagesBlock}
        </XStack>
        <Button
          variant="white"
          sizeB="lg"
          onPress={onOpen}
        >
          See more
        </Button>
      </YStack>
    </>
  );
}
