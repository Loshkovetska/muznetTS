import Separator from "@/components/ui/separator";
import { AdType } from "@/lib/types";
import { DealType } from "@/lib/types/deal";
import { generateDealList } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { Fragment, useMemo } from "react";
import { Text, XStack } from "tamagui";

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
          {...typography[key === "Total" ? "heading-16" : "label-16"]}
          color="#232323"
        >
          {key}
        </Text>
        <Text
          {...typography[key === "Total" ? "heading-16" : "label-16"]}
          color={
            value === "Active" || key === "Total"
              ? colors[value === "Active" ? "success" : "black"]
              : "#5C6574"
          }
        >
          {value}
        </Text>
      </XStack>
    </Fragment>
  ));
}
