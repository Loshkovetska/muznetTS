import CommonHeader from "@/components/common-header";
import AdForm from "@/components/forms/ad-form";
import ProfileBottomBar from "@/components/screens/profile/profile-bottombar";
import Button from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useAds from "@/lib/hooks/ads.hook";
import { adScheme } from "@/lib/scheme";
import { AdType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Spinner, Text, XStack, YStack } from "tamagui";
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

  return (
    <>
      <YStack
        backgroundColor={colors["white"]}
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
          >
            <AdForm form={form} />
            {selectedAd && (
              <XStack
                alignItems="center"
                marginTop={24}
                gap={8}
              >
                <Text
                  {...typography["paragraph-17"]}
                  color="#636364"
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
      <ProfileBottomBar>
        <Button
          variant="dark"
          sizeB="lg"
          disabled={!form.formState.isValid}
          loading={isAddPending || isUpdatePending}
          onPress={form.handleSubmit(onSubmit)}
        >
          {selectedAd ? "Edit " : "Add new "}ad
        </Button>
      </ProfileBottomBar>
    </>
  );
}
