import InfoDialog from "@/components/dialogs/info-dialog";
import Button from "@/components/ui/button";

type DeletePostDialogPropType = {
  open: boolean;
  loading: boolean;
  onDelete: () => void;
  onOpenChange: () => void;
};

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
