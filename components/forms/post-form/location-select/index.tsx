import LocationSelectDialog from "@/components/dialogs/location-select-dialog";
import { Text } from "@/components/ui";
import { setValueToForm } from "@/lib/utils";
import { colors } from "@/tamagui.config";
import { ChevronRight, MapPin } from "@tamagui/lucide-icons";
import { useCallback, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { XStack } from "tamagui";

type LocationSelectPropType = {
  form: UseFormReturn<any>;
};

export default function LocationSelect({ form }: LocationSelectPropType) {
  const [isOpen, setOpen] = useState(false);

  const selectedLocation = useWatch({
    control: form.control,
    name: "location",
  });

  const onValueChange = useCallback(
    (v: string) => {
      setValueToForm(form, "location", v);
      setOpen(false);
    },
    [form]
  );
  return (
    <>
      <XStack
        paddingHorizontal={16}
        paddingVertical={12}
        gap={8}
        alignItems="center"
        onPress={() => setOpen(true)}
      >
        <MapPin
          size={20}
          color={colors["secondary"]}
        />
        <Text
          typo="reg-17"
          flexGrow={1}
          color={selectedLocation ? "secondary" : "comet"}
          maxWidth="90%"
        >
          {selectedLocation || "Add Location"}
        </Text>
        <ChevronRight />
      </XStack>
      <LocationSelectDialog
        open={isOpen}
        defaultValue={selectedLocation}
        onOpenChange={() => setOpen(false)}
        onValueChange={onValueChange}
      />
    </>
  );
}
