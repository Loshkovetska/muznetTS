import { QUERY_TAGS } from "@/lib/constants";
import { UsersService } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";

type useMusiciansParams = {
  enabled?: boolean;
  id?: string;
};

const useMusicians = ({ enabled = true, id }: useMusiciansParams) => {
  const { data: musicians } = useQuery({
    queryKey: [QUERY_TAGS.MUSICIAN, id ? "SIMILAR" : undefined],
    queryFn: () => UsersService.getMusicians(id),
    enabled,
  });
  return { musicians };
};

export default useMusicians;
