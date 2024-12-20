import PricePerHour from "@/components/price-per-hour";
import Button from "@/components/ui/button";
import { colors } from "@/tamagui.config";
import { XStack, styled } from "tamagui";

const Container = styled(XStack, {
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: 8,
  paddingHorizontal: 16,
  paddingBottom: 40,
  backgroundColor: "white",
  position: "absolute",
  bottom: 0,
  left: 0,
  borderTopWidth: 1,
  borderColor: colors["light-gray"],
  gap: 16,
});

type BottomBarPropType = {
  price: number;
  buttonTitle: string;
};

export default function BottomBar({ price, buttonTitle }: BottomBarPropType) {
  return (
    <Container>
      <PricePerHour
        price={price}
        sizeB="lg"
      />
      <Button
        sizeB="lg"
        variant="dark"
        maxWidth={227}
      >
        {buttonTitle}
      </Button>
    </Container>
  );
}
