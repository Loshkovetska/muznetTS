import { colors, typography } from "@/tamagui.config";
import { CameraMode } from "expo-camera";
import { FlatList } from "react-native";
import { Stack, Text, YStack, styled } from "tamagui";

const CameraButton = styled(Stack, {
  width: 56,
  height: 56,
  borderRadius: 28,
  borderWidth: 2,
  borderColor: colors["white"],
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
        backgroundColor: colors["white"],
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
  return (
    <YStack
      gap={16}
      maxWidth={97}
      alignItems="center"
    >
      <FlatList
        data={["picture", "video"]}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ maxWidth: 97 }}
        contentContainerStyle={{ gap: 10, paddingRight: 26, paddingLeft: 24 }}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text
            {...typography["heading-17"]}
            color={mode === item ? colors["white"] : "#5C6574"}
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
