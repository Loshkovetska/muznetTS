import Dialog from "@/components/ui/dialog";

type InfoDialogPropType = {
  icon?: React.ReactNode;
  open: boolean;
  title: string;
  description?: string;
  button?: React.ReactNode;
  buttonText: string;
  onOpenChange: (v: boolean) => void;
};

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
