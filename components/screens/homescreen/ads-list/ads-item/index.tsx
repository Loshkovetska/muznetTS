import CommonImage from "@/components/common-image";
import GenresList from "@/components/genres-list";
import PricePerHour from "@/components/price-per-hour";
import ProfileLocation from "@/components/profile-location";
import RateBlock from "@/components/rate-block";
import { AdType, UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Text, XStack, YStack, styled } from "tamagui";

const ItemContainer = styled(XStack, {
  width: "100%",
  borderRadius: 6,
  borderColor: colors["light-gray"],
  borderWidth: 1,
  padding: 8,
  backgroundColor: colors["main"],
});

const ItemInfo = styled(YStack, {
  marginLeft: 12,
  justifyContent: "space-between",
  width: "61%",
});

export default function AdsItem(data: UserType | AdType) {
  const isMusician = "surname" in data;

  const genres = useMemo(
    () => (isMusician ? data.musical_genres.slice(0, 3) : []),
    [data]
  );

  const cardImage = useMemo(() => data.photo?.[0] || null, [data]);

  return (
    <Link
      asChild
      href={{
        pathname: "/details/[id]",
        params: { id: data.id },
      }}
    >
      <ItemContainer>
        <RateBlock
          reviewData={data.rate}
          screenType="list"
        />
        <CommonImage
          source={cardImage}
          width={96}
          height={96}
          resizeMode="cover"
          borderRadius={6}
        />
        <ItemInfo>
          <ProfileLocation
            address={data.address}
            maxWidth="70%"
          />
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            {...typography["bold-16"]}
          >
            {isMusician ? `${data.name} ${data.surname}` : data.title}
          </Text>
          {isMusician && genres.length > 0 && <GenresList genres={genres} />}
          {!isMusician && (
            <Text
              {...typography["semi-12"]}
              numberOfLines={1}
            >
              {data.description}
            </Text>
          )}
          <PricePerHour price={data.price_per_hour} />
        </ItemInfo>
      </ItemContainer>
    </Link>
  );
}
