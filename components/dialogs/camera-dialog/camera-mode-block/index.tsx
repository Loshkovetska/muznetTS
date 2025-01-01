import { colors, typography } from "@/tamagui.config";
import { CameraMode } from "expo-camera";
import { useRef } from "react";
import { FlatList } from "react-native";
import { Stack, Text, YStack, styled } from "tamagui";

const CameraButton = styled(Stack, {
  width: 56,
  height: 56,
  borderRadius: 28,
  borderWidth: 2,
  borderColor: colors["main"],
  padding: 2,
  justifyContent: "center",
  alignItems: "center",
});

const CameraButtonContent = styled(Stack, {
  variants: {
    variant: {
      picture: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
        backgroundColor: colors["main"],
      },
      video: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
        backgroundColor: colors["error"],
      },
    },
    record: {
      true: {
        width: 24,
        height: 24,
        borderRadius: 6,
      },
    },
  } as const,
});

type CameraModeBlockPropType = {
  mode: CameraMode;
  isRecording: boolean;
  onPress: () => void;
  onMode: (mode: CameraMode) => void;
};

export default function CameraModeBlock({
  mode,
  isRecording,
  onPress,
  onMode,
}: CameraModeBlockPropType) {
  const ref = useRef<FlatList>(null);
  return (
    <YStack
      gap={16}
      maxWidth={97}
      alignItems="center"
    >
      <FlatList
        ref={ref}
        data={["picture", "video"]}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ maxWidth: 120 }}
        keyExtractor={(item) => item}
        snapToAlignment="center"
        renderItem={({ item, index }) => (
          <Text
            {...typography["bold-17"]}
            color={colors[mode === item ? "main" : "gray-100"]}
            paddingLeft={!index ? 32 : 5}
            paddingRight={index + 1 === 2 ? 40 : 5}
            onPress={() =>
              ref.current?.scrollToIndex({
                animated: true,
                index,
              })
            }
          >
            {item === "picture" ? "Photo" : "Video"}
          </Text>
        )}
        onViewableItemsChanged={(info) => {
          info.viewableItems[0] &&
            onMode(info.viewableItems[0]?.index == 0 ? "picture" : "video");
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
      <CameraButton onPress={onPress}>
        <CameraButtonContent
          variant={mode as "picture"}
          record={isRecording}
        />
      </CameraButton>
    </YStack>
  );
}
