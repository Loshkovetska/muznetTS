import CreateDealContent from "@/components/dialogs/create-deal-dialog/create-deal-content";
import InfoDialog from "@/components/dialogs/info-dialog";
import Button from "@/components/ui/button";
import useDeals from "@/lib/hooks/deal.hook";
import useMessages from "@/lib/hooks/messages.hook";
import { useCallback, useState } from "react";

export default function CreateDealDialog({
  user_id,
  performer_id,
}: {
  user_id: string;
  performer_id: string;
}) {
  const [isOpen, setOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);

  const [adsId, setAdsId] = useState<string | undefined>();

  const { sendMessage } = useMessages({
    enabled: false,
    enabledMessages: false,
    onSuccess: onClose,
  });

  const {
    isCreatePending,
    deal,
    isDeletePending: isDealDeletePending,
    createOffer,
    deleteDeal,
  } = useDeals({
    enabled: false,
    user_id,
    performer_id,
    onSuccess: (id) =>
      sendMessage({
        from: user_id,
        to: performer_id,
        text: "",
        files: [],
        deal_id: id,
      }),
    onDeleteSuccess: () => {
      setInfoOpen(false);
      setOpen(true);
    },
  });

  const onValueChange = useCallback((_: string, value: string) => {
    setAdsId(value);
  }, []);

  const onSubmit = useCallback(() => {
    adsId && createOffer({ ads_id: adsId, performer_id });
  }, [performer_id, adsId, createOffer]);

  const onCreateOffer = useCallback(() => {
    (deal ? setInfoOpen : setOpen)(true);
  }, [deal]);

  function onClose() {
    setOpen(false);
    setAdsId(undefined);
  }

  return (
    <>
      <Button
        variant="dark"
        sizeB="sm"
        position="absolute"
        bottom={-48}
        left="50%"
        transform={[{ translateX: "-50%" }]}
        zIndex={1000}
        width={160}
        onPress={onCreateOffer}
      >
        Create Offer
      </Button>
      <CreateDealContent
        open={isOpen}
        user_id={user_id}
        adsId={adsId}
        loading={isCreatePending}
        onOpenChange={onClose}
        onValueChange={onValueChange}
        onSubmit={onSubmit}
      />
      <InfoDialog
        title="Creating a new offer will delete the current one. You can read the refund policy here?"
        buttonText="Cancel"
        button={
          <Button
            variant="white"
            sizeB="lg"
            onPress={() => deleteDeal(deal?.id || "")}
            loading={isDealDeletePending}
          >
            Create new offer
          </Button>
        }
        open={isInfoOpen}
        onOpenChange={() => setInfoOpen(false)}
      />
    </>
  );
}
