import CommonImage from "@/components/common-image";
import CommonVideo from "@/components/common-video";
import { PostType } from "@/lib/types/post";
import { detectFileType } from "@/lib/utils";
import { colors } from "@/tamagui.config";
import { Copy, Play } from "@tamagui/lucide-icons";
import { Stack } from "tamagui";

export default function PostShortItem(post: PostType) {
  const isVideo = detectFileType(post.media?.[0]).isVideo;
  return (
    <Stack
      width="100%"
      height="100%"
      position="relative"
      overflow="hidden"
    >
      {post.media?.length > 1 && (
        <Copy
          position="absolute"
          top={4}
          right={4}
          zIndex={1}
          color={colors["white"]}
          size={18}
        />
      )}
      {post.media?.length === 1 && isVideo && (
        <Play
          position="absolute"
          top={4}
          right={4}
          zIndex={1}
          color={colors["white"]}
          fill={colors["white"]}
          size={18}
        />
      )}
      {isVideo && (
        <CommonVideo
          width="100%"
          height="100%"
          source={post.media?.[0]}
          contentFit="cover"
        />
      )}
      {!isVideo && (
        <CommonImage
          width="100%"
          height="100%"
          source={post.media?.[0]}
        />
      )}
    </Stack>
  );
}
