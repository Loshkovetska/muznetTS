import CommonImage from "@/components/common-image";
import CommonVideo from "@/components/common-video";
import { SCREEN_WIDTH } from "@/lib/constants";
import { colors, typography } from "@/tamagui.config";
import { CameraMode, CameraType, CameraView, FlashMode } from "expo-camera";
import { Stack, Text, XStack, styled } from "tamagui";

const Frame = styled(Stack, {
  width: 24,
  height: 24,
  borderColor: "#F2F3F9",
  position: "absolute",
  zIndex: 200,
  variants: {
    variant: {
      topleft: {
        top: 0,
        left: 0,
        borderTopWidth: 2,
        borderLeftWidth: 2,
      },
      topright: {
        top: 0,
        right: 0,
        borderTopWidth: 2,
        borderRightWidth: 2,
      },
      bottomleft: {
        bottom: 0,
        left: 0,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
      },
      bottomright: {
        bottom: 0,
        right: 0,
        borderRightWidth: 2,
        borderBottomWidth: 2,
      },
    },
  } as const,
});

type CameraBlockPropType = {
  facing: CameraType;
  flash: FlashMode;
  mode: CameraMode;
  cameraRef: React.RefObject<CameraView>;
  preview: any;
};

export default function CameraBlock({
  facing,
  flash,
  mode,
  cameraRef,
  preview,
}: CameraBlockPropType) {
  return (
    <Stack
      width={SCREEN_WIDTH}
      height={SCREEN_WIDTH + 100}
      backgroundColor={colors["black"]}
      marginHorizontal={-16}
      position="relative"
    >
      <Frame variant="topleft" />
      <Frame variant="topright" />
      <Frame variant="bottomleft" />
      <Frame variant="bottomright" />
      <XStack
        backgroundColor="rgba(0,0,0,0.5)"
        borderRadius={58}
        position="absolute"
        top={16}
        left="50%"
        zIndex={200}
        height={32}
        maxWidth={100}
        minWidth={88}
        transform={[
          {
            translateX: "-50%",
          },
        ]}
      >
        <Text
          {...typography["heading-17"]}
          color={colors["white"]}
        >
          00:00:00
        </Text>
      </XStack>
      {preview && (
        <>
          {!preview?.uri.includes("mov") && (
            <CommonImage
              width="100%"
              height="100%"
              local
              source={preview.uri}
            />
          )}
          {preview?.uri.includes("mov") && (
            <CommonVideo
              width="100%"
              height="100%"
              source={preview}
            />
          )}
        </>
      )}
      {!preview && (
        <CameraView
          ref={cameraRef}
          style={{
            width: "100%",
            height: "100%",
            flexGrow: 1,
          }}
          facing={facing}
          flash={flash}
          mode={mode}
          onCameraReady={() => console.log("ready")}
        />
      )}
    </Stack>
  );
}
