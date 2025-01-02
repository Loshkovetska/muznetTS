import { Dialog } from "@/components/ui";
import { BaseDialogPropType } from "@/lib/types";

type InfoDialogPropType = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  button?: React.ReactNode;
  buttonText: string;
} & BaseDialogPropType;

export default function InfoDialog({
  icon,
  open,
  title,
  description,
  button,
  buttonText,
  onOpenChange,
}: InfoDialogPropType) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      icon={icon}
      title={title}
      description={description}
      button={button}
      buttonText={buttonText}
    />
  );
}
