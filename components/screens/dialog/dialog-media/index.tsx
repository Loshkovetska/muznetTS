import CommonImage from "@/components/common-image";
import CommonVideo from "@/components/common-video";
import { detectFileType } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { Paperclip } from "@tamagui/lucide-icons";
import { Text, XStack } from "tamagui";

type DialogMediaPropType = {
  file: string;
  imageSize: { width: number | string; height: number };
};

export default function DialogMedia({ file, imageSize }: DialogMediaPropType) {
  const { isImage, isVideo } = detectFileType(file);
  if (!isImage && !isVideo) {
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
      <CommonImage
        borderRadius={4}
        {...imageSize}
        source={file}
      />
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
