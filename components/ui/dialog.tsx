import Button from "@/components/ui/button";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import { colors, typography } from "@/tamagui.config";
import {
  Adapt,
  Sheet,
  Stack,
  Dialog as TDialog,
  Text,
  XStack,
  YStack,
} from "tamagui";

type DialogPropType = {
  open: boolean;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  button?: React.ReactNode;
  onOpenChange: (fl: boolean) => void;
};

export default function Dialog({
  open,
  title,
  description,
  icon,
  buttonText,
  button,
  onOpenChange,
}: DialogPropType) {
  return (
    <TDialog
      modal
      open={open}
      onOpenChange={onOpenChange}
    >
      <Adapt
        when="sm"
        platform="touch"
      >
        <Sheet
          animation="fast"
          zIndex={200000}
          modal
          snapPointsMode="fit"
          dismissOnSnapToBottom={false}
          disableDrag
        >
          <Sheet.Frame
            gap="$4"
            top={SCREEN_HEIGHT / -2}
            left={0}
            width={SCREEN_WIDTH - 32}
            transform={[{ translateY: "50%" }, { translateX: 16 }]}
            backgroundColor="transparent"
          >
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <TDialog.Portal>
        <TDialog.Content
          key="content"
          width="100%"
        >
          <YStack
            alignItems="center"
            backgroundColor={colors["white"]}
            width="100%"
            padding="$4"
            borderRadius={16}
          >
            {icon && (
              <Stack
                width={120}
                height={120}
                alignItems="center"
                justifyContent="center"
                marginBottom={8}
              >
                {icon}
              </Stack>
            )}
            <YStack
              gap={4}
              marginBottom={20}
            >
              {title && (
                <TDialog.Title unstyled>
                  <Text
                    textAlign="center"
                    {...typography["heading-20"]}
                  >
                    {title}
                  </Text>
                </TDialog.Title>
              )}
              {description && (
                <TDialog.Description
                  {...typography["label-15"]}
                  color={colors["disabled"]}
                  textAlign="center"
                >
                  {description}
                </TDialog.Description>
              )}
            </YStack>
            <XStack
              width="100%"
              alignSelf={button ? undefined : "flex-end"}
              gap={8}
              flexDirection={button ? "column" : "row"}
            >
              <Button
                aria-label="Close"
                variant="dark"
                sizeB="lg"
                onPress={() => onOpenChange(false)}
              >
                {buttonText || "Save"}
              </Button>
              {button}
            </XStack>
          </YStack>
        </TDialog.Content>
      </TDialog.Portal>
    </TDialog>
  );
}
