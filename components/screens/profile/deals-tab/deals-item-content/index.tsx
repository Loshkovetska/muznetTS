import CommonHeader from "@/components/common-header";
import ProfileBottomBar from "@/components/screens/profile/profile-bottombar";
import Button from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import { QUERY_TAGS } from "@/lib/constants";
import AdService from "@/lib/services/ad";
import { AdType } from "@/lib/types";
import { generateDealList } from "@/lib/utils";
import { colors, typography } from "@/tamagui.config";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useMemo, useState } from "react";
import { ScrollView, Text, XStack, YStack } from "tamagui";

export default function DealsItemContent(
  deal: AdType & { onClose: () => void; user_id?: string }
) {
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);

  const data = useMemo(() => generateDealList(deal), [deal]);

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: () => AdService.updateStatus(deal.id),
    onSuccess: (data: AdType | null) => {
      if (data) {
        queryClient.setQueryData(
          [QUERY_TAGS.AD, undefined, deal.user_id],
          (old: AdType[]) => {
            const dt = old.filter((ad) => ad.id !== deal.id);

            return [...dt, data];
          }
        );
      }
    },
  });
  return (
    <>
      <YStack
        gap={16}
        paddingHorizontal={16}
        backgroundColor={colors["white"]}
      >
        <CommonHeader
          title={`Deal № ${deal.deal_number}`}
          onBack={deal.onClose}
        />
        <Text
          {...typography["heading-24"]}
          textAlign="center"
        >
          {deal.title}
        </Text>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 40,
            gap: 16,
            paddingBottom: 260,
          }}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(data).map(([key, value], ind) => (
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
                    value === "Active"
                      ? colors["success"]
                      : key === "Total"
                      ? colors["black"]
                      : "#5C6574"
                  }
                >
                  {value}
                </Text>
              </XStack>
            </Fragment>
          ))}
          <Separator />
          <XStack
            width="100%"
            justifyContent="space-between"
            onPress={() => setOpen((prev) => !prev)}
          >
            <Text
              {...typography["label-16"]}
              color="#232323"
            >
              More details
            </Text>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </XStack>
          <Separator />
          {isOpen && (
            <Text {...typography["label-16"]}>{deal.description}</Text>
          )}
        </ScrollView>
      </YStack>
      <ProfileBottomBar>
        <Button
          sizeB="lg"
          variant="dark"
          width="100%"
          disabled={deal.status === "closed"}
          loading={isPending}
          onPress={() => updateStatus()}
        >
          Close the deal
        </Button>
      </ProfileBottomBar>
    </>
  );
}
