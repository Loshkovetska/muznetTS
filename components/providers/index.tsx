import QueryProvider from "@/components/providers/query-provider";
import UserProvider from "@/components/providers/user-provider";
import tamaguiConfig from "@/tamagui.config";
import { PortalProvider, TamaguiProvider } from "tamagui";

export default function Providers(props: React.PropsWithChildren) {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider>
        <QueryProvider>
          <UserProvider>{props.children}</UserProvider>
        </QueryProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}
