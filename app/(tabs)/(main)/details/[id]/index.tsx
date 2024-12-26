import ContactUserDialog from "@/components/dialogs/contact-user-dialog";
import FullScreenCarousel from "@/components/dialogs/full-screen-carousel";
import FullScreenReviews from "@/components/dialogs/full-screen-reviews";
import { useUser } from "@/components/providers/user-provider";
import BottomBar from "@/components/screens/details/bottom-bar";
import MainInfo from "@/components/screens/details/main-info";
import { QUERY_TAGS } from "@/lib/constants";
import AdService from "@/lib/services/ad";
import UsersServiceClass from "@/lib/services/user";
import { AdType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "tamagui";

export default function Index() {
  const { user, isMusician } = useUser();
  const { id } = useLocalSearchParams();
  const [isFullSliderOpen, setOpen] = useState(-1);
  const [dialogs, setDialogs] = useState({
    reviews: false,
    message: false,
  });

  const { data: musician } = useQuery({
    queryKey: [QUERY_TAGS.MUSICIAN, id],
    queryFn: () => UsersServiceClass.getMusician(id as string),
    enabled: !isMusician,
  });

  const { data: ad } = useQuery({
    queryKey: [QUERY_TAGS.AD, id],
    queryFn: () => AdService.getAd(id as string),
    enabled: isMusician,
  });

  const handleDialog = useCallback(
    (name: string, value: boolean) =>
      setDialogs((prev) => ({ ...prev, [name]: value })),
    []
  );

  const data = isMusician ? ad : musician;
  if (!data) return null;

  const images = data.photo?.length ? data.photo : [];
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <MainInfo
          {...data}
          photo={images}
          profile_id={user?.user_type === "contractor" ? data.id : undefined}
          ad_id={user?.user_type === "musician" ? data.id : undefined}
          openFullDialog={setOpen}
          openReviews={() => handleDialog("reviews", true)}
        />
      </ScrollView>
      <BottomBar
        price={data.price_per_hour}
        buttonTitle={"Contact Performer"}
        onPress={() => handleDialog("message", true)}
      />
      <FullScreenCarousel
        images={images}
        ind={isFullSliderOpen}
        onOpenChange={() => setOpen(-1)}
      />
      <FullScreenReviews
        rate={data.rate}
        open={dialogs["reviews"]}
        onOpenChange={() => handleDialog("reviews", false)}
      />
      <ContactUserDialog
        from={user?.id || ""}
        to={!isMusician ? data.id : (data as AdType).creator.id}
        open={dialogs["message"]}
        isMusician={isMusician}
        onOpenChange={() => handleDialog("message", false)}
      />
    </>
  );
}
