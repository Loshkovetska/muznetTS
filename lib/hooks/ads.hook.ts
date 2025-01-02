import { QUERY_TAGS } from "@/lib/constants";
import { AdService } from "@/lib/services";
import { AdType, AddUpdateAdRequestType } from "@/lib/types";
import { toggleToast } from "@/lib/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type useMusiciansParams = {
  enabled?: boolean;
  id?: string;
  user_id?: string;
  onSuccess?: () => void;
};

export const useAds = ({
  enabled = true,
  id,
  user_id,
  onSuccess,
}: useMusiciansParams) => {
  const queryClient = useQueryClient();

  const { data: ads } = useQuery({
    queryKey: [QUERY_TAGS.AD, id ? "SIMILAR" : undefined, user_id],
    queryFn: () => AdService.getAds({ id, user_id }),
    enabled,
  });

  const { mutate: addAd, isPending: isAddPending } = useMutation({
    mutationFn: (params: AddUpdateAdRequestType) => AdService.addAd(params),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [QUERY_TAGS.AD, id ? "SIMILAR" : undefined, user_id],
        (old: AdType[]) => [...old, data]
      );
      onSuccess?.();
    },
    onError: () => toggleToast("Can't create an ad", "error"),
  });

  const { mutate: updateAd, isPending: isUpdatePending } = useMutation({
    mutationFn: (params: AddUpdateAdRequestType) => AdService.updatedAd(params),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [QUERY_TAGS.AD, id ? "SIMILAR" : undefined, user_id],
        (old: AdType[]) => old.map((ad) => (ad.id === data.id ? data : ad))
      );
      onSuccess?.();
    },
    onError: () => toggleToast("Can't update the ad", "error"),
  });

  const { mutate: deleteAd, isPending: isDeletePending } = useMutation({
    mutationFn: (id: string) => AdService.deleteAd(id),
    onSuccess: (_, vars) => {
      queryClient.setQueryData(
        [QUERY_TAGS.AD, id ? "SIMILAR" : undefined, user_id],
        (old: AdType[]) => old.filter((ad) => ad.id !== vars)
      );
      onSuccess?.();
    },
    onError: () => toggleToast("Can't delete the ad", "error"),
  });

  return {
    ads,
    addAd,
    updateAd,
    deleteAd,
    isAddPending,
    isUpdatePending,
    isDeletePending,
  };
};
