import Dialog from "@/components/ui/dialog";
import { colors } from "@/tamagui.config";
import { AlertCircle, CircleCheck } from "@tamagui/lucide-icons";

type ResultDialogPropType = {
  type: "success" | "error";
  open: boolean;
  title: string;
  description: string;
  buttonText: string;
  onOpenChange: (v: boolean) => void;
};

export default function ResultDialog({
  type,
  open,
  title,
  description,
  buttonText,
  onOpenChange,
}: ResultDialogPropType) {
  return (
    <Dialog
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
            color={colors["white"]}
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
