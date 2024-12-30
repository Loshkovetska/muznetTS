import BottomBar from "@/components/bottom-bar";
import AddInfoForm from "@/components/forms/add-info-form";
import LocationsProvider from "@/components/providers/locations-provider";
import { useUser } from "@/components/providers/user-provider";
import MediaSelect from "@/components/screens/profile/personal-tab/media-select";
import SearchWithSelect from "@/components/search-with-select";
import Button from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { GENRES, GROUP_MEMBERS, INSTRUMENTS } from "@/lib/constants/lists";
import {
  updateContractorInfoScheme,
  updateMusicianInfoScheme,
} from "@/lib/scheme";
import { AuthService } from "@/lib/services";
import { PredictionType, UpdateInfoType, UserType } from "@/lib/types";
import { setValueToForm } from "@/lib/utils";
import { colors } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, YStack } from "tamagui";

type PersonalTabPropType = {
  user: UserType | null;
  header: React.ReactNode;
};

export default function PersonalTab({ user, header }: PersonalTabPropType) {
  const { updateUser } = useUser();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [ref, setRef] = useState<ScrollView | null>(null);

  const isMusician = user?.user_type === "musician";

  const scheme = useMemo(
    () => (isMusician ? updateMusicianInfoScheme : updateContractorInfoScheme),
    [isMusician]
  );

  const form = useForm({
    defaultValues: {
      photo: user?.photo || [],
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      description: user?.description || "",
      address: user?.address || "",
      sing_by_ear: user?.sing_by_ear || false,
      play_by_ear: user?.play_by_ear || false,
      read_sheet_music: user?.read_sheet_music || false,
      willing_to_travel: user?.willing_to_travel || false,
      musical_instruments: user?.musical_instruments || [],
      musical_genres: user?.musical_genres || [],
      group_members: user?.group_members || [],
      price_per_hour: String(user?.price_per_hour || ""),
      location: user?.location || {
        longitude: 0,
        latitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
    },
    mode: "onChange",
    resolver: zodResolver(scheme),
  });

  const { mutate: updateInfo, isPending } = useMutation({
    mutationFn: (body: UpdateInfoType) => AuthService.updateInfo(body),
    onSuccess: async (data) => {
      updateUser();
      form.reset();
    },
  });

  const onSubmit = useCallback(() => {
    const values = form.getValues();
    updateInfo({
      ...values,
      id: user?.id || "",
      old_photo: user?.photo || [],
      price_per_hour: Number(values.price_per_hour),
    });
  }, [user, form, updateInfo]);

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
    <Form {...form}>
      <LocationsProvider
        defaultValue={form.getValues("address")}
        scrollRef={ref}
        coords={coords}
        onValueChange={onAddressSelect}
      >
        <YStack
          paddingHorizontal={16}
          backgroundColor={colors["white"]}
          flexGrow={1}
        >
          {header}
          <ScrollView
            showsVerticalScrollIndicator={false}
            marginTop={32}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
            onLayout={({ nativeEvent: { layout } }) =>
              setCoords({ x: layout.x, y: layout.y })
            }
            ref={(e) => {
              setRef(e);
            }}
          >
            <AddInfoForm
              form={form}
              user_type={user?.user_type || "contractor"}
              hide={["password"]}
            >
              {isMusician && (
                <YStack
                  gap={16}
                  marginBlock={8}
                >
                  {user?.position === "band" && (
                    <SearchWithSelect
                      name="group_members"
                      form={form}
                      placeholder="Search group members"
                      options={GROUP_MEMBERS}
                      edit
                    />
                  )}
                  <SearchWithSelect
                    name="musical_instruments"
                    form={form}
                    placeholder="Search instruments"
                    options={INSTRUMENTS}
                    edit
                  />
                  <SearchWithSelect
                    name="musical_genres"
                    form={form}
                    placeholder="Search music genres"
                    options={GENRES}
                    edit
                  />
                  <MediaSelect form={form} />
                </YStack>
              )}
            </AddInfoForm>
          </ScrollView>
        </YStack>
      </LocationsProvider>
      <BottomBar>
        <Button
          variant="dark"
          sizeB="lg"
          disabled={!form.formState.isDirty || !form.formState.isValid}
          onPress={form.handleSubmit(onSubmit)}
          loading={isPending}
        >
          Update Info
        </Button>
      </BottomBar>
    </Form>
  );
}
