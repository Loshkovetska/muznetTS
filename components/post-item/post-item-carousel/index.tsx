import CommonImage from "@/components/common-image";
import CommonVideo from "@/components/common-video";
import IndicatorBlock from "@/components/indicator-block";
import { SCREEN_WIDTH } from "@/lib/constants";
import { detectFileType } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { BlurView } from "expo-blur";
import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Stack, Text } from "tamagui";

type PostItemCarouselPropType = {
  media: string[];
  inView: boolean;
  local?: boolean;
};

export default function PostItemCarousel({
  media,
  inView,
  local = false,
}: PostItemCarouselPropType) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMediaType = useMemo(
    () => detectFileType(media[currentIndex]).isVideo,
    [currentIndex, media]
  );

  return (
    <Stack
      width={SCREEN_WIDTH}
      height={SCREEN_WIDTH}
      position="relative"
    >
      {media.length > 1 && (
        <Stack
          position="absolute"
          zIndex={1}
          right={16}
          top={16}
          animateOnly={["opacity"]}
          opacity={currentMediaType ? 0 : 1}
          animation="lazy"
        >
          <BlurView
            style={{
              paddingVertical: 4,
              paddingHorizontal: 12,
              borderRadius: 60,
              overflow: "hidden",
            }}
            blurReductionFactor={10}
            intensity={100}
            tint="dark"
          >
            <Text
              {...typography["medium-12"]}
              color={colors["main"]}
            >
              {currentIndex + 1}/{media.length}
            </Text>
          </BlurView>
        </Stack>
      )}
      <FlatList
        nestedScrollEnabled
        data={media.length > 0 ? media : [""]}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={media.length > 1}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        onViewableItemsChanged={({ changed }) =>
          setCurrentIndex(changed[0].index as number)
        }
        renderItem={({ item, index }) => {
          const { isImage } = detectFileType(item);
          const styles = {
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            borderWidth: 0,
          };
          if (isImage || !item.length) {
            return (
              <CommonImage
                source={item}
                local={local}
                {...styles}
              />
            );
          }

          return (
            <CommonVideo
              postView
              source={item}
              inView={currentIndex === index && inView}
              local={local}
              {...styles}
            />
          );
        }}
      />
      {media.length > 1 && (
        <IndicatorBlock
          currentIndex={currentIndex}
          list={media}
          variant="light-circle"
          absolute
        />
      )}
    </Stack>
  );
}
