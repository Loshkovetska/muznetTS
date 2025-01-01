import CommonImage from "@/components/common-image";
import { colors } from "@/tamagui.config";
import { useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { Stack } from "tamagui";

type SingleCarouselPropType = {
  width: number;
  height: number | "auto";
  images: string[] | null;
  initialIndex?: number;
  dark?: boolean;
  resizeMode?: "cover" | "contain";
  onIndexChange?: (ind: number) => void;
  onOpen?: (ind: number) => void;
};
export default function SingleCarousel({
  width,
  height,
  images,
  initialIndex = 0,
  dark,
  resizeMode,
  onIndexChange,
  onOpen,
}: SingleCarouselPropType) {
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    if (ref.current && initialIndex > -1) {
      ref.current.scrollToIndex({
        animated: false,
        index: initialIndex,
      });
    }
  }, [initialIndex]);

  if (!images?.length)
    return (
      <Stack
        width={width}
        height={height}
      >
        <CommonImage
          source={null}
          width={width}
          height={height}
          resizeMode={resizeMode}
        />
      </Stack>
    );
  return (
    <FlatList
      ref={ref}
      pagingEnabled
      data={images}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      scrollEnabled={(images && images?.length > 1) || false}
      onViewableItemsChanged={({ changed }) =>
        onIndexChange?.(changed[0].index as number)
      }
      horizontal
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100,
      }}
      renderItem={({ item, index }) => (
        <Stack
          width={width}
          height={height}
          onPress={() => onOpen?.(index)}
        >
          <CommonImage
            source={item}
            width={width}
            height={height}
            resizeMode={resizeMode}
          />
        </Stack>
      )}
      keyExtractor={(item) => item}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
      style={{
        width: width,
        height: height,
        backgroundColor: dark ? colors["ghost-white"] : undefined,
      }}
    />
  );
}
