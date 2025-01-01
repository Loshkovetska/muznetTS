import InfoDialog from "@/components/dialogs/info-dialog";
import { BaseDialogPropType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { AlertCircle, CircleCheck } from "@tamagui/lucide-icons";

type ResultDialogPropType = {
  type: "success" | "error";
  title: string;
  description: string;
  buttonText: string;
} & BaseDialogPropType;

export default function ResultDialog({
  type,
  open,
  title,
  description,
  buttonText,
  onOpenChange,
}: ResultDialogPropType) {
  return (
    <InfoDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={
        type === "error" ? (
          <AlertCircle
            color={colors["error"]}
            size={80}
          />
        ) : (
          <CircleCheck
            color={colors["main"]}
            fill={colors["success"]}
            size={80}
          />
        )
      }
      title={title}
      description={description}
      buttonText={buttonText}
    />
  );
}
