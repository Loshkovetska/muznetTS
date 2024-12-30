import { QUERY_TAGS } from "@/lib/constants";
import { LikeService } from "@/lib/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type UseLikesPropType = {
  user_id: string;
  post_id?: string;
  comment_id?: string;
  totalCount: number;
  onSuccess: (b: boolean) => void;
};

export default function useLikes({
  post_id,
  user_id,
  totalCount,
  comment_id,
  onSuccess,
}: UseLikesPropType) {
  const [isLiked, setLiked] = useState(false);

  const { data: isLikedPost } = useQuery({
    queryKey: [QUERY_TAGS.POST, "liked", post_id, user_id],
    queryFn: () => LikeService.isPostLiked({ post_id: post_id || "", user_id }),
    enabled: !!totalCount && !!post_id,
  });

  const { data: isCommentLiked } = useQuery({
    queryKey: [QUERY_TAGS.POST, "liked", comment_id, user_id],
    queryFn: () =>
      LikeService.isCommentLiked({ comment_id: comment_id || "", user_id }),
    enabled: !!totalCount && !!comment_id,
  });

  const { mutate: reactPost } = useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked
        ? LikeService.unlikePost({ post_id: post_id || "", user_id })
        : LikeService.reactPost({ post_id: post_id || "", user_id }),
    onMutate: (vs) => setLiked(!vs),
    onSuccess: (_, vs) => {
      setLiked(!vs);
      onSuccess?.(!vs);
    },
    onError: (_, vs) => setLiked(vs),
  });

  const { mutate: reactComment } = useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked
        ? LikeService.unlikeComment({ comment_id: comment_id || "", user_id })
        : LikeService.reactComment({ comment_id: comment_id || "", user_id }),
    onMutate: (vs) => setLiked(!vs),
    onSuccess: (_, vs) => {
      setLiked(!vs);
      onSuccess?.(!vs);
    },
    onError: (_, vs) => setLiked(vs),
  });

  useEffect(() => {
    typeof isLikedPost === "boolean" && setLiked(isLikedPost);
  }, [isLikedPost]);

  useEffect(() => {
    typeof isCommentLiked === "boolean" && setLiked(isCommentLiked);
  }, [isCommentLiked]);

  return { isLiked, reactPost, reactComment };
}
