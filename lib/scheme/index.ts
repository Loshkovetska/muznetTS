import { z } from "zod";

const loginScheme = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6).max(8),
});

const emailScheme = z.object({
  email: z.string().email("Invalid email"),
});

const signUpStep0 = z.object({
  user_name: z.string().min(3),
});

const signUpStep1 = z.object({
  user_type: z.enum(["contractor", "musician"]),
});

const signUpStep2 = z.object({
  position: z.string().min(3),
});

const signUpStepGroupMembers = z.object({
  group_members: z
    .array(z.string())
    .refine((args) => args.length, "Choose group members"),
});

const signUpStepMusicalInstruments = z.object({
  musical_instruments: z
    .array(z.string())
    .refine((args) => args.length, "Choose musical instruments"),
});

const signUpStepMusicalGenres = z.object({
  musical_genres: z
    .array(z.string())
    .refine((args) => args.length, "Choose musical genres"),
});

const commonSignUpScheme = z.object({
  user_name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6).max(8),
  name: z.string().min(3),
  surname: z.string().min(3),
  user_type: z.enum(["contractor", "musician"]),
  photo: z.any(),
  position: z.string(),
  description: z.string().min(10),
  address: z.string().min(6),
});

let musicianScheme = z.object({
  sing_by_ear: z.boolean(),
  play_by_ear: z.boolean(),
  read_sheet_music: z.boolean(),
  musical_instruments: z.any(),
  musical_genres: z.any(),
  willing_to_travel: z.boolean(),
  group_members: z.any(),
  price_per_hour: z.string().refine((str) => Number(str), "Invalid number"),
});

const musiciansignUpScheme = musicianScheme.merge(commonSignUpScheme);

const addReviewScheme = z.object({
  rate: z.number().min(1),
  text: z.string().min(5),
});

const updateContractorInfoScheme = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  surname: z.string().min(3),
  photo: z.any(),
  description: z.string().min(10),
  address: z.string().min(6),
});

const updateMusicianInfoScheme =
  updateContractorInfoScheme.merge(musicianScheme);

const updatePasswordScheme = z
  .object({
    old_password: z.string().min(6).max(8),
    new_password: z.string().min(6).max(8),
    rep_password: z.string().min(6).max(8),
  })
  .superRefine(({ new_password, rep_password }, ctx) => {
    if (new_password !== rep_password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["rep_password"],
      });
    }
  });

export {
  addReviewScheme,
  commonSignUpScheme,
  emailScheme,
  loginScheme,
  musiciansignUpScheme,
  signUpStep0,
  signUpStep1,
  signUpStep2,
  signUpStepGroupMembers,
  signUpStepMusicalGenres,
  signUpStepMusicalInstruments,
  updateContractorInfoScheme,
  updateMusicianInfoScheme,
  updatePasswordScheme,
};
