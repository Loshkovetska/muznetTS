import Separator from "@/components/ui/separator";
import Text from "@/components/ui/text";
import { AdType } from "@/lib/types";
import { DealType } from "@/lib/types/deal";
import { generateDealList } from "@/lib/utils";
import { Fragment, useMemo } from "react";
import { XStack } from "tamagui";

export default function DealsItemInfo(
  props: AdType & { status?: DealType["status"] }
) {
  const { status, ...ad } = props;

  const data = useMemo(() => generateDealList(ad, status), [ad, status]);

  return Object.entries(data).map(([key, value], ind) => (
    <Fragment key={key}>
      {!!ind && <Separator />}
      <XStack
        width="100%"
        justifyContent="space-between"
      >
        <Text
          typo={key === "Total" ? "bold-16" : "medium-16"}
          color="nero"
        >
          {key}
        </Text>
        <Text
          typo={key === "Total" ? "bold-16" : "medium-16"}
          color={
            value === "Active"
              ? "success"
              : key === "Total"
              ? "black"
              : "gray-100"
          }
        >
          {value}
        </Text>
      </XStack>
    </Fragment>
  ));
}
