import IndicatorBlock from "@/components/indicator-block";
import SingleCarousel from "@/components/single-carousel";
import { SCREEN_WIDTH } from "@/lib/constants";
import { useState } from "react";
import { Stack } from "tamagui";

type DetailsCarouselPropType = {
  navbar: React.ReactNode;
  images: string[] | null;
  onOpen: (ind: number) => void;
};

export default function DetailsCarousel({
  images,
  navbar,
  onOpen,
}: DetailsCarouselPropType) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Stack
      width={SCREEN_WIDTH}
      height={SCREEN_WIDTH + 64}
      position="relative"
    >
      {navbar}
      <SingleCarousel
        width={SCREEN_WIDTH}
        height={SCREEN_WIDTH + 64}
        images={images}
        onIndexChange={setCurrentIndex}
        onOpen={onOpen}
      />
      {images && images?.length > 1 && (
        <IndicatorBlock
          list={images}
          currentIndex={currentIndex}
          variant="light"
          absolute
        />
      )}
    </Stack>
  );
}
