import { PropsWithChildren, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider(props: PropsWithChildren) {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
