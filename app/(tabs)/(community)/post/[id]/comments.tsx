import CommonHeader from "@/components/common-header";
import AddCommentBar from "@/components/screens/community/comments/add-comment-bar";
import CommentsList from "@/components/screens/community/comments/comments-list";
import { QUERY_TAGS } from "@/lib/constants";
import { useComments } from "@/lib/hooks";
import { PostService } from "@/lib/services";
import { AddCommentType, CommentType } from "@/lib/types/comment";
import { colors } from "@/tamagui.config";
import { Send } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { YStack } from "tamagui";

export default function Page() {
  const postId = useLocalSearchParams().id as string;

  const { data: post } = useQuery({
    queryKey: [QUERY_TAGS.POST, postId],
    queryFn: () => PostService.getPost(postId),
  });

  const [comment, setComment] = useState<CommentType | null>(null);

  const { comments, updateDataOnReact, sendComment } = useComments(postId);

  const onSend = useCallback(
    (args: AddCommentType) => {
      sendComment(args);
      setComment(null);
    },
    [sendComment]
  );
  return (
    <>
      <YStack
        width="100%"
        gap={16}
        flexGrow={1}
        backgroundColor={colors["main"]}
      >
        <CommonHeader
          title="Comments"
          buttonRight={
            <Link href="/(tabs)/(chat)/dialogs">
              <Send />
            </Link>
          }
          paddingHorizontal={16}
          withBorder
        />
        {post && (
          <CommentsList
            comments={comments || []}
            post={post}
            updateOnReact={updateDataOnReact}
            setComment={setComment}
          />
        )}
      </YStack>
      <AddCommentBar
        commentTo={comment}
        onSend={(args) =>
          onSend({
            ...args,
            post_id: post?.id || "",
          })
        }
      />
    </>
  );
}
