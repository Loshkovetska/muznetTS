import {
  commonSignUpScheme,
  musiciansignUpScheme,
  signUpStep0,
  signUpStep1,
  signUpStep2,
  signUpStepGroupMembers,
  signUpStepMusicalGenres,
  signUpStepMusicalInstruments,
} from "@/lib/scheme";

export const isLastSignUpStep = (
  step: number,
  userType: string,
  userPosition: string
) => {
  return (
    (step === 3 && userType === "contractor") ||
    (step === 5 && userPosition !== "band") ||
    (step === 6 && userPosition === "band")
  );
};

export const generateStepName = (
  step: number,
  userType: string,
  userPosition: string
) => {
  if (!step) return "user_name";
  if (step === 1) return "user_type";
  if (step === 2) return "position";
  if (isLastSignUpStep(step, userType, userPosition)) return "add_info";
  if (step === 3)
    return userPosition === "band" ? "group_members" : "musical_instruments";
  if (step === 4)
    return userPosition === "band" ? "musical_instruments" : "musical_genres";
  if (step === 5) return "musical_genres";
  return "add_info";
};

export const generateScheme = (
  step: number,
  userType: string,
  userPosition: string
) => {
  if (!step) return signUpStep0;
  if (step === 1) return signUpStep1;
  if (step === 2) return signUpStep2;
  if (isLastSignUpStep(step, userType, userPosition))
    return userType === "contractor"
      ? commonSignUpScheme
      : musiciansignUpScheme;
  if (step === 3)
    return userPosition === "band"
      ? signUpStepGroupMembers
      : signUpStepMusicalInstruments;
  if (step === 4)
    return userPosition === "band"
      ? signUpStepMusicalInstruments
      : signUpStepMusicalGenres;
  if (step === 5) return signUpStepMusicalGenres;

  return signUpStep0;
};
