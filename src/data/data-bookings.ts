import { add } from "date-fns";

function fromToday(numDays: number, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export const bookings = [
  // CABIN 001
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(7),
    cabinID: 1,
    guestID: 2,
    hasBreakfast: true,
    observations:
      "I have a gluten allergy and would like to request a gluten-free breakfast.",
    isPaid: false,
    numGuests: 1
  },
  {
    created_at: fromToday(-33, true),
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    cabinID: 1,
    guestID: 3,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 2
  },
  {
    created_at: fromToday(-27, true),
    startDate: fromToday(12),
    endDate: fromToday(18),
    cabinID: 1,
    guestID: 4,
    hasBreakfast: false,
    observations: "",
    isPaid: false,
    numGuests: 2
  },

  // CABIN 002
  {
    created_at: fromToday(-45, true),
    startDate: fromToday(-45),
    endDate: fromToday(-29),
    cabinID: 2,
    guestID: 5,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 2
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(15),
    endDate: fromToday(18),
    cabinID: 2,
    guestID: 6,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 2
  },
  {
    created_at: fromToday(-5, true),
    startDate: fromToday(33),
    endDate: fromToday(48),
    cabinID: 2,
    guestID: 7,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 2
  },

  // CABIN 003
  {
    created_at: fromToday(-65, true),
    startDate: fromToday(-25),
    endDate: fromToday(-20),
    cabinID: 3,
    guestID: 8,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(-2),
    endDate: fromToday(0),
    cabinID: 3,
    guestID: 9,
    hasBreakfast: false,
    observations: "We will be bringing our small dog with us",
    isPaid: true,
    numGuests: 3
  },
  {
    created_at: fromToday(-14, true),
    startDate: fromToday(-14),
    endDate: fromToday(-11),
    cabinID: 3,
    guestID: 10,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4
  },

  // CABIN 004
  {
    created_at: fromToday(-30, true),
    startDate: fromToday(-4),
    endDate: fromToday(8),
    cabinID: 4,
    guestID: 11,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4
  },
  {
    created_at: fromToday(-1, true),
    startDate: fromToday(12),
    endDate: fromToday(17),
    cabinID: 4,
    guestID: 12,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 4
  },
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(18),
    endDate: fromToday(19),
    cabinID: 4,
    guestID: 13,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 1
  },

  // CABIN 005
  {
    created_at: fromToday(0, true),
    startDate: fromToday(14),
    endDate: fromToday(21),
    cabinID: 5,
    guestID: 14,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 5
  },
  {
    created_at: fromToday(-6, true),
    startDate: fromToday(-6),
    endDate: fromToday(-4),
    cabinID: 5,
    guestID: 15,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4
  },
  {
    created_at: fromToday(-4, true),
    startDate: fromToday(-4),
    endDate: fromToday(-1),
    cabinID: 5,
    guestID: 16,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 6
  },

  // CABIN 006
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(0),
    endDate: fromToday(11),
    cabinID: 6,
    guestID: 17,
    hasBreakfast: false,
    observations:
      "We will be checking in late, around midnight. Hope that's okay :)",
    isPaid: true,
    numGuests: 6
  },
  {
    created_at: fromToday(-16, true),
    startDate: fromToday(-16),
    endDate: fromToday(-9),
    cabinID: 6,
    guestID: 18,
    hasBreakfast: true,
    observations: "I will need a rollaway bed for one of the guests",
    isPaid: true,
    numGuests: 4
  },
  {
    created_at: fromToday(-18, true),
    startDate: fromToday(-4),
    endDate: fromToday(-1),
    cabinID: 6,
    guestID: 19,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 6
  },

  // CABIN 007
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(17),
    endDate: fromToday(23),
    cabinID: 7,
    guestID: 20,
    hasBreakfast: false,
    observations: "",
    isPaid: false,
    numGuests: 8
  },
  {
    created_at: fromToday(-7, true),
    startDate: fromToday(40),
    endDate: fromToday(50),
    cabinID: 7,
    guestID: 21,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 7
  },
  {
    created_at: fromToday(-55, true),
    startDate: fromToday(32),
    endDate: fromToday(37),
    cabinID: 7,
    guestID: 22,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 6
  },

  // CABIN 008
  {
    created_at: fromToday(-8, true),
    startDate: fromToday(-5),
    endDate: fromToday(0),
    cabinID: 8,
    guestID: 1,
    hasBreakfast: true,
    observations:
      "My wife has a gluten allergy so I would like to request a gluten-free breakfast if possible",
    isPaid: true,
    numGuests: 9
  },
  {
    created_at: fromToday(0, true),
    startDate: fromToday(0),
    endDate: fromToday(5),
    cabinID: 8,
    guestID: 23,
    hasBreakfast: true,
    observations:
      "I am celebrating my anniversary, can you arrange for any special amenities or decorations?",
    isPaid: true,
    numGuests: 10
  },
  {
    created_at: fromToday(-10, true),
    startDate: fromToday(10),
    endDate: fromToday(13),
    cabinID: 8,
    guestID: 24,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 7
  }
];
