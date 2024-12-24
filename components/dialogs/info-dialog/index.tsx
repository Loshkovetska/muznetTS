import Dialog from "@/components/ui/dialog";

type InfoDialogPropType = {
  icon: React.ReactNode;
  open: boolean;
  title: string;
  description: string;
  buttonText: string;
  onOpenChange: (v: boolean) => void;
};

export default function InfoDialog({
  icon,
  open,
  title,
  description,
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
      buttonText={buttonText}
    />
  );
}
