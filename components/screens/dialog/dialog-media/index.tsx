import CommonImage from "@/components/common-image";
import CommonVideo from "@/components/common-video";
import useDocument from "@/lib/hooks/document.hook";
import { detectFileType } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { Paperclip } from "@tamagui/lucide-icons";
import { useCallback } from "react";
import { Stack, Text, XStack } from "tamagui";

type DialogMediaPropType = {
  file: string;
  imageSize: { width: number | string; height: number | string };
};

export default function DialogMedia({ file, imageSize }: DialogMediaPropType) {
  const { isImage, isFile } = detectFileType(file);
  const { downloadFile } = useDocument();

  const onDownload = useCallback(
    () => downloadFile(process.env.EXPO_PUBLIC_SUPABASE_STORAGE + "/" + file),
    [file]
  );

  if (isFile) {
    return (
      <XStack
        borderWidth={1}
        borderColor={colors["light-gray"]}
        backgroundColor={colors["white"]}
        paddingVertical={4}
        paddingHorizontal={8}
        borderRadius={16}
        gap={4}
        alignItems="center"
        onPress={onDownload}
      >
        <Paperclip
          size={16}
          color={colors["black"]}
        />
        <Text
          {...typography["label-12"]}
          numberOfLines={1}
          maxWidth="80%"
        >
          {file}
        </Text>
      </XStack>
    );
  }
  if (isImage) {
    return (
      <Stack
        borderRadius={4}
        {...imageSize}
        onPress={onDownload}
      >
        <CommonImage
          {...imageSize}
          source={file}
        />
      </Stack>
    );
  }
  return (
    <CommonVideo
      source={file}
      borderRadius={4}
      {...imageSize}
    />
  );
}
