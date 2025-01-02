import BottomBar from "@/components/bottom-bar";
import CommonHeader from "@/components/common-header";
import AdForm from "@/components/forms/ad-form";
import LocationsProvider from "@/components/providers/locations-provider";
import { Button, Form, Text } from "@/components/ui";
import useAds from "@/lib/hooks/ads.hook";
import { adScheme } from "@/lib/scheme";
import { AdType, PredictionType } from "@/lib/types";
import { setValueToForm } from "@/lib/utils";
import { colors } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Spinner, XStack, YStack } from "tamagui";
import { z } from "zod";

type AddEditAdDialogPropType = {
  selectedAd?: AdType;
  user_id: string;
  onOpenChange: () => void;
};

export default function AddEditAdDialog({
  selectedAd,
  user_id,
  onOpenChange,
}: AddEditAdDialogPropType) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [ref, setRef] = useState<ScrollView | null>(null);
  const {
    addAd,
    updateAd,
    deleteAd,
    isDeletePending,
    isAddPending,
    isUpdatePending,
  } = useAds({
    enabled: false,
    user_id,
    onSuccess: onOpenChange,
  });

  const form = useForm({
    defaultValues: {
      title: selectedAd?.title || "",
      description: selectedAd?.description || "",
      address: selectedAd?.address || "",
      basic_date: dayjs(selectedAd?.start_date).format("YYYY/MM/DD"),
      start_date: dayjs(selectedAd?.start_date).format("HH:MM"),
      end_date: selectedAd
        ? dayjs(selectedAd.end_date).format("HH:MM")
        : dayjs().set("h", 1).format("HH:MM"),
      price_per_hour: String(selectedAd?.price_per_hour || ""),
      musical_instruments: selectedAd?.musical_instruments || [],
      musical_genres: selectedAd?.musical_genres || [],
      photo: selectedAd?.photo || [],
      sing_by_ear: selectedAd?.sing_by_ear || false,
      play_by_ear: selectedAd?.play_by_ear || false,
      read_sheet_music: selectedAd?.read_sheet_music || false,
      location: selectedAd?.location || {
        longitude: 0,
        latitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
    },
    resolver: zodResolver(adScheme),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof adScheme>) => {
      const copy = JSON.parse(JSON.stringify(values));
      const basicDate = dayjs(values.basic_date);

      delete copy.basic_date;
      const [startHours, startMinutes] = values.start_date.split(":");
      const fullStartDate = basicDate
        .set("h", Number(startHours))
        .set("m", Number(startMinutes));
      const [endHours, endMinutes] = values.end_date.split(":");

      const fullEndDate = basicDate
        .set("h", Number(endHours))
        .set("m", Number(endMinutes));

      copy.start_date = fullStartDate;
      copy.end_date = fullEndDate;
      copy.price_per_hour = Number(values.price_per_hour);

      selectedAd
        ? updateAd({ ...copy, id: selectedAd.id })
        : addAd({ ...copy, user_id: user_id });
    },
    [selectedAd, user_id, updateAd, addAd]
  );

  const onAddressSelect = useCallback(
    (item: PredictionType) => {
      setValueToForm(form, "location", {
        latitude: item.properties.lat,
        longitude: item.properties.lon,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
      setValueToForm(form, "address", item.properties.formatted);
    },
    [form]
  );

  return (
    <>
      <LocationsProvider
        defaultValue={form.getValues("address")}
        scrollRef={ref}
        coords={coords}
        onValueChange={onAddressSelect}
      >
        <YStack
          backgroundColor={colors["main"]}
          paddingHorizontal={16}
          gap={16}
          flexGrow={1}
        >
          <CommonHeader
            title={`${selectedAd ? "Edit " : "Add  "}ad`}
            onBack={onOpenChange}
          />
          <Form {...form}>
            <ScrollView
              contentContainerStyle={{ gap: 8, paddingBottom: 220 }}
              showsVerticalScrollIndicator={false}
              onLayout={({ nativeEvent: { layout } }) =>
                setCoords({ x: layout.x, y: layout.y })
              }
              ref={(e) => {
                setRef(e);
              }}
            >
              <AdForm form={form} />
              {selectedAd && (
                <XStack
                  alignItems="center"
                  marginTop={24}
                  gap={8}
                >
                  <Text
                    typo="reg-17"
                    color="comet"
                    textDecorationLine="underline"
                    onPress={() => deleteAd(selectedAd.id)}
                  >
                    Delete Add
                  </Text>
                  {isDeletePending && <Spinner size="small" />}
                </XStack>
              )}
            </ScrollView>
          </Form>
        </YStack>
      </LocationsProvider>
      <BottomBar>
        <Button
          variant="dark"
          sizeB="lg"
          disabled={!form.formState.isValid}
          loading={isAddPending || isUpdatePending}
          onPress={form.handleSubmit(onSubmit)}
        >
          {selectedAd ? "Edit " : "Add new "}ad
        </Button>
      </BottomBar>
    </>
  );
}
