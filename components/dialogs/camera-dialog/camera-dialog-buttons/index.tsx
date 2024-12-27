import Button from "@/components/ui/button";
import { YStack } from "tamagui";

type CameraDialogButtonsPropType = {
  text: string;
  retake: () => void;
  onAccept: () => void;
};

export default function CameraDialogButtons({
  text,
  retake,
  onAccept,
}: CameraDialogButtonsPropType) {
  return (
    <YStack gap={16}>
      <Button
        variant="white"
        sizeB="lg"
        onPress={retake}
      >
        Retake {text}
      </Button>
      <Button
        variant="white"
        sizeB="lg"
        onPress={onAccept}
      >
        Send {text}
      </Button>
    </YStack>
  );
}
