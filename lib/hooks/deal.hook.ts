import { QUERY_TAGS } from "@/lib/constants";
import DealService from "@/lib/services/deal";
import { DealType } from "@/lib/types/deal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type useDealsParams = {
  user_id: string;
  enabled?: boolean;
  performer_id?: string;
  onSuccess?: (id?: string) => void;
  onDeleteSuccess?: (id: string) => void;
};

const useDeals = ({
  user_id,
  enabled = true,
  performer_id,
  onSuccess,
  onDeleteSuccess,
}: useDealsParams) => {
  const queryClient = useQueryClient();

  const { data: deals } = useQuery({
    queryKey: [QUERY_TAGS.DEAL, user_id],
    queryFn: () => DealService.getDeals(user_id),
    enabled: enabled && !!user_id,
  });

  const { data: deal } = useQuery({
    queryKey: [QUERY_TAGS.DEAL, "OFFER"],
    queryFn: () => DealService.getDeal(user_id, performer_id!),
    enabled: !!performer_id && !!user_id,
  });

  const { mutate: updateStatus, isPending: isUpdateStatusPending } =
    useMutation({
      mutationFn: (deal_id: string) => DealService.updateStatus(deal_id),
      onSuccess: (data: DealType | null, vars) => {
        if (data) {
          queryClient.setQueryData(
            [QUERY_TAGS.DEAL, user_id],
            (old: DealType[]) => {
              const dt = old.filter((ad) => ad.id !== vars);
              return [...dt, data];
            }
          );
        }
      },
    });

  const { mutate: createOffer, isPending: isCreatePending } = useMutation({
    mutationFn: (args: { ads_id: string; performer_id: string }) =>
      DealService.createDeal(args),
    onSuccess: (dt) => dt && onSuccess?.(dt.id),
  });

  const { mutate: updateOfferStatus, isPending: isOfferUpdating } = useMutation(
    {
      mutationFn: (args: {
        deal_id: string;
        status: "waiting" | "declined" | "accepted";
      }) => DealService.updateOfferStatus(args),
      onSuccess: (dt) => dt && onSuccess?.(dt.id),
    }
  );

  const { mutate: deleteDeal, isPending: isDeletePending } = useMutation({
    mutationFn: (deal_id: string) => DealService.deleteDeal(deal_id),
    onSuccess: (data, vs) => data && onDeleteSuccess?.(vs),
  });

  return {
    deals,
    isUpdateStatusPending,
    isCreatePending,
    deal,
    isOfferUpdating,
    isDeletePending,
    updateStatus,
    createOffer,
    updateOfferStatus,
    deleteDeal,
  };
};

export default useDeals;
