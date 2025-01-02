import QueryProvider from "@/components/providers/query-provider";
import UserProvider from "@/components/providers/user-provider";
import { toastConfig } from "@/components/ui";
import tamaguiConfig from "@/tamagui.config";
import Toast from "react-native-toast-message";
import { PortalProvider, TamaguiProvider } from "tamagui";

export default function Providers(props: React.PropsWithChildren) {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider>
        <QueryProvider>
          <UserProvider>{props.children}</UserProvider>
        </QueryProvider>
        <Toast
          position="bottom"
          config={toastConfig}
        />
      </PortalProvider>
    </TamaguiProvider>
  );
}
