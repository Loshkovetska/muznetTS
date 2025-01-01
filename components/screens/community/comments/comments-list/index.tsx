import PostItemInfo from "@/components/post-item/post-item-info";
import PostItemUser from "@/components/post-item/post-item-user";
import { useUser } from "@/components/providers/user-provider";
import CommentItem from "@/components/screens/community/comments/comments-list/comment-item";
import { CommentType } from "@/lib/types/comment";
import { PostType } from "@/lib/types/post";
import { colors } from "@/tamagui.config";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Stack, YStack } from "tamagui";

type CommentsListPropType = {
  comments: CommentType[];
  post: PostType;
  updateOnReact: (comment_id: string, b: boolean) => void;
  setComment: (comment: CommentType) => void;
};

export default function CommentsList({
  comments,
  post,
  updateOnReact,
  setComment,
}: CommentsListPropType) {
  const ref = useRef<FlatList>(null);
  const [focused, setFocused] = useState(-1);

  const { user } = useUser();

  const onScrollToComment = useCallback(
    (comment_id: string) => {
      const comment = comments
        .map((c, ind) => (c.id === comment_id ? ind : null))
        .find((c) => c !== null);

      if (ref.current) {
        ref.current.scrollToIndex({
          animated: true,
          index: comment || 0,
          viewOffset: 300,
        });
        setFocused(comment || 0);

        setTimeout(() => {
          setFocused(-1);
        }, 1000);
      }
    },
    [comments]
  );

  useEffect(() => {
    if (ref.current && comments.length > 0) {
      setTimeout(() => {
        ref.current?.scrollToIndex({
          animated: true,
          index: comments.length - 1,
        });
      }, 500);
    }
  }, [comments]);

  return (
    <FlatList
      ref={ref}
      data={comments}
      ListHeaderComponent={
        <YStack
          paddingHorizontal={16}
          paddingBottom={16}
          gap={12}
          borderBottomWidth={1}
          borderColor={colors["gray-20"]}
        >
          <PostItemUser {...post.user} />
          <PostItemInfo
            showFullDescription
            {...post}
          />
        </YStack>
      }
      style={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 16, paddingBottom: 250, flexGrow: 1 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <Stack
          key={item.id}
          paddingHorizontal={16}
          animateOnly={["opacity"]}
          animation="lazy"
          opacity={focused === index ? 0.6 : 1}
        >
          <CommentItem
            {...item}
            currentUserId={user?.id}
            onReact={(b) => updateOnReact(item.id, b)}
            onPress={() => setComment(item)}
            scrollToComment={onScrollToComment}
          />
        </Stack>
      )}
    />
  );
}
