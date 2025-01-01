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
          {...typography[key === "Total" ? "bold-16" : "medium-16"]}
          color={colors["nero"]}
        >
          {key}
        </Text>
        <Text
          {...typography[key === "Total" ? "bold-16" : "medium-16"]}
          color={
            colors[
              value === "Active"
                ? "success"
                : key === "Total"
                ? "black"
                : "gray-100"
            ]
          }
        >
          {value}
        </Text>
      </XStack>
    </Fragment>
  ));
}
