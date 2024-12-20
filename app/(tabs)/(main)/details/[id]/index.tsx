import FullScreenCarousel from "@/components/dialogs/full-screen-carousel";
import FullScreenReviews from "@/components/dialogs/full-screen-reviews";
import { useUser } from "@/components/providers/user-provider";
import BottomBar from "@/components/screens/details/bottom-bar";
import MainInfo from "@/components/screens/details/main-info";
import { QUERY_TAGS } from "@/lib/constants";
import UserService from "@/lib/services/user";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView } from "tamagui";

export default function Index() {
  const { user } = useUser();
  const { id } = useLocalSearchParams();
  const [isFullSliderOpen, setOpen] = useState(-1);
  const [openReviews, setOpenReviews] = useState(false);

  const { data } = useQuery({
    queryKey: [QUERY_TAGS.MUSICIAN, id],
    queryFn: () => UserService.getMusician(id as string),
    enabled: user?.user_type === "contractor",
  });

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
          openReviews={() => setOpenReviews(true)}
        />
      </ScrollView>
      <BottomBar
        price={data.price_per_hour}
        buttonTitle="Contact Performer"
      />
      <FullScreenCarousel
        images={images}
        ind={isFullSliderOpen}
        onOpenChange={() => setOpen(-1)}
      />
      <FullScreenReviews
        rate={data.rate}
        open={openReviews}
        onOpenChange={() => setOpenReviews(false)}
      />
    </>
  );
}
