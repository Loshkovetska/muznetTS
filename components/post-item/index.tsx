import DeletePostDialog from "@/components/dialogs/delete-post-dialog";
import PostFuncDialog from "@/components/dialogs/post-func-dialog";
import PostMoreDialog from "@/components/dialogs/post-more-dialog";
import ReportDialog from "@/components/dialogs/report-dialog";
import PostItemCarousel from "@/components/post-item/post-item-carousel";
import PostItemFunc from "@/components/post-item/post-item-func";
import PostItemHeader from "@/components/post-item/post-item-header";
import PostItemHidden from "@/components/post-item/post-item-hidden";
import PostItemInfo from "@/components/post-item/post-item-info";
import useLikes from "@/lib/hooks/like.hook";
import usePosts from "@/lib/hooks/posts.hook";
import { PostType } from "@/lib/types/post";
import { toggleToast } from "@/lib/utils/toast";
import { colors } from "@/tamagui.config";
import { useCallback, useState } from "react";
import { YStack } from "tamagui";

export default function PostItem(post: PostType & { inView?: boolean }) {
  const [dialogs, setDialogs] = useState({
    report: false,
    actions: false,
    delete: false,
    more: false,
  });

  const toggleState = useCallback(
    (name: string) =>
      setDialogs((prev) => ({ ...prev, [name]: !prev[name as "report"] })),
    []
  );

  const {
    communityUser,
    isDeletePending,
    hidePost,
    deletePost,
    toggleSettings,
    unhidePost,
    removeHiddenPost,
    updatePostInfoOnReact,
  } = usePosts({
    onDeleteSuccess: () => toggleState("delete"),
    onHideSuccess: () => toggleState("actions"),
  });

  const { isLiked, reactPost } = useLikes({
    post_id: post.id,
    user_id: communityUser.id || "",
    totalCount: post.info.likes,
    onSuccess: (b) => updatePostInfoOnReact(post.id, b),
  });

  const onReport = useCallback(() => {
    toggleState("actions");
    toggleState("report");
  }, [toggleState]);

  const onDelete = useCallback(() => {
    toggleState("actions");
    toggleState("delete");
  }, []);

  const onShare = useCallback(() => {
    if (!post.share_on)
      return toggleToast("Can't share the post due to post settings", "error");

    // add share logic
  }, [post]);

  return (
    <>
      {post.hidden && (
        <PostItemHidden
          onUnHide={() =>
            unhidePost({ post_id: post.id, user_id: communityUser.id })
          }
          onRemove={() => removeHiddenPost(post.id)}
          onReport={() => toggleState("report")}
        />
      )}
      {!post.hidden && (
        <YStack
          gap={12}
          backgroundColor={colors["white"]}
        >
          <PostItemHeader
            {...post}
            toggleState={() => toggleState("actions")}
          />
          <PostItemCarousel
            media={post.media}
            inView={post.inView || false}
          />
          <YStack
            gap={12}
            width="100%"
            paddingHorizontal={16}
          >
            <PostItemFunc
              {...post}
              isLiked={isLiked}
              onToggle={() => toggleState("more")}
              onReact={() => reactPost(isLiked)}
            />
            <PostItemInfo {...post} />
          </YStack>
        </YStack>
      )}

      {post.inView && (
        <>
          <PostFuncDialog
            post={post}
            postOwner={communityUser?.id === post.user.id}
            open={dialogs.actions}
            onOpenChange={() => toggleState("actions")}
            onReport={onReport}
            onEdit={() => {}}
            onDelete={onDelete}
            onShare={onShare}
            onToggle={(name, value) =>
              toggleSettings({ post_id: post.id, toggle_name: name, value })
            }
            onHide={() =>
              hidePost({
                post_id: post.id,
                user_id: communityUser?.id || "",
              })
            }
          />
          <ReportDialog
            open={dialogs.report}
            post_id={post.id}
            onOpenChange={() => toggleState("report")}
          />
          {communityUser?.id === post.user.id && (
            <DeletePostDialog
              open={dialogs.delete}
              loading={isDeletePending}
              onOpenChange={() => toggleState("delete")}
              onDelete={() => deletePost(post.id)}
            />
          )}
          <PostMoreDialog
            open={dialogs["more"]}
            canShare={post.share_on}
            ownerPost={communityUser?.id === post.user.id}
            onShare={onShare}
            onOpenChange={() => toggleState("more")}
          />
        </>
      )}
    </>
  );
}
