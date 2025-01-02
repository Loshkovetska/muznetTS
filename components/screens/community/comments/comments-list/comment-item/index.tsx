import CommonImage from "@/components/common-image";
import { Text } from "@/components/ui";
import { useLikes } from "@/lib/hooks";
import { CommentType } from "@/lib/types/comment";
import { colors } from "@/tamagui.config";
import { Heart } from "@tamagui/lucide-icons";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { GestureResponderEvent } from "react-native";
import { XStack, YStack } from "tamagui";

export default function CommentItem(
  comment: CommentType & {
    currentUserId?: string;
    onReact: (b: boolean) => void;
    onPress: () => void;
    scrollToComment: (comment_id: string) => void;
  }
) {
  const { isLiked, reactComment } = useLikes({
    user_id: comment.currentUserId || "",
    comment_id: comment.id,
    totalCount: comment.likes_count,
    onSuccess: comment.onReact,
  });

  const commentDate = useMemo(
    () =>
      dayjs(comment.created_at)
        .fromNow(true)
        .replace(/(minutes?)/, "m"),
    [comment.created_at]
  );

  const onPress = useCallback(
    (e: GestureResponderEvent) => {
      e.stopPropagation();
      comment?.comment?.id && comment.scrollToComment(comment?.comment?.id);
    },
    [comment?.comment, comment.scrollToComment]
  );

  const commentToUser = comment?.comment?.user?.user_name;

  return (
    <XStack
      gap={8}
      borderBottomWidth={1}
      borderColor={colors["gray-20"]}
      paddingBottom={16}
      onPress={comment.onPress}
    >
      <CommonImage
        width={32}
        height={32}
        borderRadius={16}
        source={comment.user.photo?.[0]}
      />
      <YStack
        gap={8}
        flexGrow={1}
        maxWidth="90%"
      >
        <Text>
          <Text
            typo="bold-14"
            onPress={commentToUser ? onPress : undefined}
          >
            {comment.user.name} {comment.user.surname}{" "}
            {commentToUser ? `@${commentToUser}, ` : ""}
          </Text>

          {comment.text}
        </Text>
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack
            alignItems="center"
            gap={13}
            flexGrow={1}
          >
            <Text color="gray-80">{commentDate}</Text>
            <Text
              typo="medium-15"
              color="gray-80"
            >
              <Text color="secondary">{comment.likes_count}</Text>
              {comment.likes_count === 1 ? " like" : " likes"}
            </Text>
          </XStack>
          <Heart
            size={16}
            fill={colors[isLiked ? "black" : "main"]}
            onPress={() => reactComment(isLiked)}
          />
        </XStack>
      </YStack>
    </XStack>
  );
}
