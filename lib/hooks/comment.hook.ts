import { QUERY_TAGS } from "@/lib/constants";
import { CommentService } from "@/lib/services";
import { AddCommentType, CommentType } from "@/lib/types/comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useComments(post_id: string) {
  const queryClient = useQueryClient();

  const { data: comments } = useQuery({
    queryKey: [QUERY_TAGS.COMMENT, post_id],
    queryFn: () => CommentService.getPostComments(post_id),
    enabled: !!post_id,
  });

  const { mutate: sendComment } = useMutation({
    mutationFn: (args: AddCommentType) => CommentService.postComment(args),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [QUERY_TAGS.COMMENT, post_id],
        (old: CommentType[]) => [...old, data]
      );
    },
  });

  const updateDataOnReact = useCallback(
    (comment_id: string, b: boolean) => {
      queryClient.setQueryData(
        [QUERY_TAGS.COMMENT, post_id],
        (old: CommentType[]) =>
          old.map((d) => ({
            ...d,
            likes_count:
              d.id === comment_id
                ? d.likes_count + (b ? 1 : -1)
                : d.likes_count,
          }))
      );
    },
    [queryClient, post_id]
  );

  return { comments, updateDataOnReact, sendComment };
}
