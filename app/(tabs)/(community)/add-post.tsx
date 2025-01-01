import AddEditPostContent from "@/components/screens/community/add-edit-post-content";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Page() {
  const [firstTime, setFirstTime] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("add-post").then((res) => setFirstTime(!res));
  }, []);

  return (
    <AddEditPostContent
      step={step}
      firstTime={firstTime}
      setFirstTime={setFirstTime}
      onNext={() => setStep((prev) => prev + 1)}
      onPrev={() => setStep((prev) => prev - 1)}
    />
  );
}
