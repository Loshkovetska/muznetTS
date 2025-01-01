import CommonDialogWrapper from "@/components/common-dialog-wrapper";
import CommonImage from "@/components/common-image";
import DialogMedia from "@/components/screens/dialog/dialog-media";
import { SCREEN_WIDTH } from "@/lib/constants";
import { BaseDialogPropType, UserType } from "@/lib/types";
import { detectFileType } from "@/lib/utils";
import { typography } from "@/tamagui.config";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { Fragment, useMemo } from "react";
import { ScrollView, Stack, Text, XStack, YStack } from "tamagui";

type DialogMediaDialogPropType = {
  chatUser?: UserType;
  media: string[];
} & BaseDialogPropType;

export default function DialogMediaDialog({
  open,
  chatUser,
  media,
  onOpenChange,
}: DialogMediaDialogPropType) {
  const sections = useMemo(() => {
    const ms = media?.filter((f) => !detectFileType(f).isFile) || [];
    const files = media?.filter((f) => detectFileType(f).isFile) || [];

    return [
      {
        title: "Shared media",
        data: ms,
      },
      {
        title: "Shared files",
        data: files,
      },
    ];
  }, [media]);

  return (
    <CommonDialogWrapper open={open}>
      <ChevronLeft onPress={onOpenChange} />
      <YStack
        width="100%"
        alignItems="center"
        gap={16}
      >
        <CommonImage
          width={72}
          height={72}
          borderRadius={6}
          source={chatUser?.photo?.[0]}
        />
        <Text {...typography["bold-22"]}>
          {chatUser?.name} {chatUser?.surname}
        </Text>
      </YStack>
      <ScrollView
        width="100%"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <YStack gap={32}>
          {sections.map(({ title, data }) => (
            <Fragment key={title}>
              {data?.length ? (
                <YStack gap={16}>
                  <Text {...typography["bold-20"]}>{title}</Text>
                  <XStack
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={8}
                  >
                    {data.map((item) => {
                      const { isFile } = detectFileType(item);
                      return (
                        <Stack
                          key={item}
                          width={isFile ? "100%" : (SCREEN_WIDTH - 58) / 4}
                          height={isFile ? undefined : (SCREEN_WIDTH - 58) / 4}
                          borderRadius={isFile ? 0 : 6}
                          overflow={isFile ? undefined : "hidden"}
                        >
                          <DialogMedia
                            file={item}
                            imageSize={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </Stack>
                      );
                    })}
                  </XStack>
                </YStack>
              ) : null}
            </Fragment>
          ))}
        </YStack>
      </ScrollView>
    </CommonDialogWrapper>
  );
}
