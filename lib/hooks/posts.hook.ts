import { useUser } from "@/components/providers/user-provider";
import { QUERY_TAGS } from "@/lib/constants";
import { PostService } from "@/lib/services";
import { UserType } from "@/lib/types";
import { PostType } from "@/lib/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

type UsePostsParamsType = {
  requestType?: "my-likes" | "my-posts" | "all";
  onReportSuccess?: () => void;
  onHideSuccess?: () => void;
  onUnHideSuccess?: () => void;
  onDeleteSuccess?: () => void;
};

export default function usePosts({
  requestType,
  onReportSuccess,
  onHideSuccess,
  onDeleteSuccess,
  onUnHideSuccess,
}: UsePostsParamsType) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: allPosts } = useQuery({
    queryKey: [QUERY_TAGS.POST, "all"],
    queryFn: () => PostService.getPosts(user?.id || ""),
    enabled: requestType === "all" && !!user?.id,
  });

  const { data: myPosts } = useQuery({
    queryKey: [QUERY_TAGS.POST, "my-posts"],
    queryFn: () => PostService.getUserPosts(user?.id || ""),
    enabled: requestType === "my-posts" && !!user?.id,
  });

  const { data: likedPosts } = useQuery({
    queryKey: [QUERY_TAGS.POST, "my-likes"],
    queryFn: () => PostService.getLikedPosts(user?.id || ""),
    enabled: requestType === "my-likes" && !!user?.id,
  });

  const { mutate: reportPost, isPending: isReportPending } = useMutation({
    mutationFn: (args: { post_id: string; reason: string }) =>
      PostService.reportPost(args),
    onSuccess: onReportSuccess,
  });

  const { mutate: hidePost } = useMutation({
    mutationFn: (args: { post_id: string; user_id: string }) =>
      PostService.hidePost(args),
    onSuccess: (_, vars) => {
      onHideSuccess?.();

      queryClient.setQueryData([QUERY_TAGS.POST, "all"], (old: PostType[]) =>
        old.map((d) => ({
          ...d,
          hidden: d.id === vars.post_id,
        }))
      );
    },
  });

  const { mutate: unhidePost } = useMutation({
    mutationFn: (args: { post_id: string; user_id: string }) =>
      PostService.unhidePost(args),
    onSuccess: (_, vars) => {
      onUnHideSuccess?.();

      queryClient.setQueryData([QUERY_TAGS.POST, "all"], (old: PostType[]) =>
        old.map((d) => ({
          ...d,
          hidden: d.id === vars.post_id ? false : d.hidden,
        }))
      );
    },
  });

  const { mutate: deletePost, isPending: isDeletePending } = useMutation({
    mutationFn: (post_id: string) => PostService.deletePost(post_id),
    onSuccess: (_, vars) => {
      onDeletePost([QUERY_TAGS.POST, "all"], vars);
      onDeletePost([QUERY_TAGS.POST, "my-posts"], vars);
      onDeletePost([QUERY_TAGS.POST, "my-likes"], vars);
      onDeleteSuccess?.();
    },
  });

  const { mutate: toggleSettings } = useMutation({
    mutationFn: (args: {
      post_id: string;
      toggle_name: string;
      value: boolean;
    }) => PostService.toggleSettings(args),
    onSuccess: (_, vars) => {
      onToggleChanged([QUERY_TAGS.POST, "all"], vars);
      onToggleChanged([QUERY_TAGS.POST, "my-posts"], vars);
      onToggleChanged([QUERY_TAGS.POST, "my-likes"], vars);
    },
  });

  const removeHiddenPost = useCallback((post_id: string) => {
    onDeletePost([QUERY_TAGS.POST, "all"], post_id);
    onDeletePost([QUERY_TAGS.POST, "my-posts"], post_id);
    onDeletePost([QUERY_TAGS.POST, "my-likes"], post_id);
  }, []);

  const updatePostInfoOnReact = useCallback((post_id: string, b: boolean) => {
    onReactChanged([QUERY_TAGS.POST, "my-likes"], post_id, b);
    onReactChanged([QUERY_TAGS.POST, "my-posts"], post_id, b);
    onReactChanged([QUERY_TAGS.POST, "all"], post_id, b);
  }, []);

  function onReactChanged(queryTags: string[], post_id: string, b: boolean) {
    queryClient.setQueryData(queryTags, (old: PostType[]) =>
      (old || []).map((d) => ({
        ...d,
        info:
          post_id === d.id
            ? { ...d.info, likes: d.info.likes + (b ? 1 : -1) }
            : d.info,
      }))
    );
  }

  function onToggleChanged(
    queryTags: string[],
    vars: { post_id: string; toggle_name: string; value: boolean }
  ) {
    queryClient.setQueryData(queryTags, (old: PostType[]) =>
      (old || []).map((d) => ({
        ...d,
        [vars.toggle_name]:
          d.id === vars.post_id
            ? vars.value
            : d[vars.toggle_name as "comment_on"],
      }))
    );
  }

  function onDeletePost(queryTags: string[], post_id: string) {
    queryClient.setQueryData(queryTags, (old: PostType[]) =>
      (old || []).filter((d) => d.id !== post_id)
    );
  }

  return {
    allPosts,
    myPosts,
    likedPosts,
    communityUser: user as UserType,
    isReportPending,
    isDeletePending,
    reportPost,
    hidePost,
    unhidePost,
    deletePost,
    toggleSettings,
    removeHiddenPost,
    updatePostInfoOnReact,
  };
}
