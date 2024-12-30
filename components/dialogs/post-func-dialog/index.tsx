import CommonActions from "@/components/dialogs/post-func-dialog/common-actions";
import OwnerActions from "@/components/dialogs/post-func-dialog/owner-actions";
import { MobileSheet } from "@/components/ui/mobile-sheet";
import { PostType } from "@/lib/types/post";

type PostFuncDialogPropType = {
  open: boolean;
  postOwner: boolean;
  post: PostType;
  onOpenChange: () => void;
  onReport: () => void;
  onHide: () => void;
  onDelete: () => void;
  onShare: () => void;
  onEdit: () => void;
  onToggle: (name: string, value: boolean) => void;
};

export default function PostFuncDialog({
  open,
  postOwner,
  post,
  onOpenChange,
  onReport,
  onHide,
  onDelete,
  onShare,
  onEdit,
  onToggle,
}: PostFuncDialogPropType) {
  return (
    <MobileSheet
      open={open}
      onOpenChange={onOpenChange}
    >
      {postOwner && (
        <OwnerActions
          {...post}
          onDelete={onDelete}
          onShare={onShare}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      )}
      {!postOwner && (
        <CommonActions
          onHide={onHide}
          onReport={onReport}
          onShare={onShare}
        />
      )}
    </MobileSheet>
  );
}
