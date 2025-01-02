import { Input, InputPropType } from "@/components/ui";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import React, { useMemo, useState } from "react";
import { TextInput } from "react-native";

const PasswordInput = React.forwardRef<
  TextInput,
  InputPropType & { withIcons?: boolean }
>(({ withIcons, ...props }, ref) => {
  const [showPass, setShow] = useState(false);

  const Icon = useMemo(
    () => (withIcons ? (showPass ? Eye : EyeOff) : undefined),
    [withIcons, showPass]
  );
  return (
    <Input
      ref={ref}
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
});

export default PasswordInput;
