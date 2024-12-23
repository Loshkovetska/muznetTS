import { is2HoursBetweenDates } from "@/lib/utils";
import dayjs from "dayjs";
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

const adScheme = z
  .object({
    title: z.string().min(3),
    description: z.string().min(10),
    address: z.string().min(6),
    photo: z.any(),
    basic_date: z.string().refine((arg) => {
      const [year, month, date] = arg.split("/");
      const currentDate = dayjs(`${year}/${Number(month)}/${Number(date)}`);
      const currentMonth = dayjs(
        new Date(Number(year), Number(month) - 1, 1)
      ).daysInMonth();

      const isDateValid = currentDate.isValid();
      const isCountDayValid = Number(date) <= currentMonth;

      return isDateValid && isCountDayValid;
    }, "Invalid date"),
    start_date: z.string(),
    end_date: z.string(),
    sing_by_ear: z.boolean(),
    play_by_ear: z.boolean(),
    read_sheet_music: z.boolean(),
    musical_instruments: z
      .array(z.string())
      .refine((args) => args.length, "Choose musical instruments"),
    musical_genres: z
      .array(z.string())
      .refine((args) => args.length, "Choose musical instruments"),
    price_per_hour: z.string().refine((str) => Number(str), "Invalid number"),
  })
  .superRefine(({ start_date, end_date, basic_date }, ctx) => {
    const [startHours, startMinutes] = start_date.split(":");
    const fullStartDate = dayjs(basic_date)
      .set("h", Number(startHours))
      .set("m", Number(startMinutes));

    const [endHours, endMinutes] = end_date.split(":");
    const fullEndDate = dayjs(basic_date)
      .set("h", Number(endHours))
      .set("m", Number(endMinutes));

    if (!fullStartDate.isValid() || !fullEndDate.isValid()) {
      ctx.addIssue({
        code: "custom",
        message: `Invalid ${fullStartDate.isValid() ? "start" : "end"} time`,
        path: [fullStartDate.isValid() ? "start_date" : "end_date"],
      });
    }

    if (!is2HoursBetweenDates(fullStartDate.toDate(), fullEndDate.toDate())) {
      ctx.addIssue({
        code: "custom",
        message: "Maximum 2 hours should be between dates",
        path: ["end_date"],
      });
    }
  });

export {
  adScheme,
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
