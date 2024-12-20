import Input, { InputPropType } from "@/components/ui/input";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { useMemo, useState } from "react";

export default function PasswordInput({
  withIcons = true,
  ...props
}: InputPropType & { withIcons?: boolean }) {
  const [showPass, setShow] = useState(false);

  const Icon = useMemo(
    () => (withIcons ? (showPass ? Eye : EyeOff) : undefined),
    [withIcons, showPass]
  );

  return (
    <Input
      secureTextEntry={!showPass}
      iconRight={
        Icon ? (
          <Icon
            size={18}
            onPress={() => setShow((prev) => !prev)}
          />
        ) : undefined
      }
      {...props}
    />
  );
}
