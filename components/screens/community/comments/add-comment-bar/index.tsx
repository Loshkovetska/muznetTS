import BottomBar from "@/components/bottom-bar";
import CommonImage from "@/components/common-image";
import { useUser } from "@/components/providers/user-provider";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { SCREEN_WIDTH } from "@/lib/constants";
import { AddCommentType, CommentType } from "@/lib/types/comment";
import { typography } from "@/tamagui.config";
import { useCallback, useEffect, useState } from "react";

type AddCommentBarPropType = {
  commentTo: CommentType | null;
  onSend: (args: Omit<AddCommentType, "post_id">) => void;
};

export default function AddCommentBar({
  commentTo,
  onSend,
}: AddCommentBarPropType) {
  const [radius, setRadius] = useState(90);
  const [height, setHeight] = useState(40);
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const onSendComment = useCallback(() => {
    const text = commentTo?.user.user_name
      ? comment.replace(`@${commentTo?.user.user_name} `, "")
      : comment;

    onSend({
      text,
      user_id: user?.id || "",
      comment_id: commentTo?.id,
    });
    setComment("");
  }, [comment, user, commentTo, onSend]);

  useEffect(() => {
    if (commentTo) {
      setComment(`@${commentTo.user.user_name} `);
    }
  }, [commentTo]);

  return (
    <BottomBar gap={8}>
      <CommonImage
        width={40}
        height={40}
        borderRadius={20}
        source={user?.photo?.[0]}
      />
      <Input
        animate={false}
        placeholder="Add a comment"
        scrollEnabled
        value={comment}
        onChangeText={setComment}
        wrapper={{
          width: SCREEN_WIDTH - 72,
          height: height,
          maxHeight: 68,
          flexGrow: 1,
          borderRadius: radius,
          paddingVertical: 0,
          paddingRight: 16,
        }}
        fontSize={14}
        lineHeight={18}
        onContentSizeChange={({ nativeEvent }) => {
          if (nativeEvent) {
            const height = nativeEvent.contentSize.height;
            const r = 90 - 18 * (height / 18) - 18;
            setHeight(nativeEvent.contentSize.height + 24);
            setRadius(r > 10 ? r : 10);
          }
        }}
        multiline
        iconRight={
          <Button
            sizeB="sm"
            variant="transparent"
            textProps={typography["bold-14"]}
            pointerEvents={comment.length >= 2 ? "auto" : "none"}
            opacity={comment.length >= 2 ? 1 : 0.3}
            onPress={onSendComment}
          >
            Post
          </Button>
        }
      />
    </BottomBar>
  );
}
