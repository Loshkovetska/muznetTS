import InfoDialog from "@/components/dialogs/info-dialog";
import Button from "@/components/ui/button";
import { BaseDialogPropType } from "@/lib/types";

type DeletePostDialogPropType = {
  loading: boolean;
  onDelete: () => void;
} & BaseDialogPropType;

export default function DeletePostDialog({
  open,
  loading,
  onDelete,
  onOpenChange,
}: DeletePostDialogPropType) {
  return (
    <InfoDialog
      title="Delete post?"
      buttonText="Cancel"
      button={
        <Button
          variant="red-outlined"
          sizeB="lg"
          onPress={onDelete}
          loading={loading}
        >
          Delete
        </Button>
      }
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
