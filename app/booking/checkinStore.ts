import { create } from "zustand";
import { Passenger, PassengerForm } from "./bookingData";


type CheckInState = {
  // Step 2
  selectedPassengerIds: string[];
  passengers: Passenger[];

  // Step 3
  passengerForms: Record<string, PassengerForm>;

  setPassengers: (passengers: Passenger[]) => void;
  setSelectedPassengerIds: (ids: string[]) => void;

  upsertPassengerForm: (passengerId: string, form: PassengerForm) => void;
};

export const useCheckInStore = create<CheckInState>((set, get) => ({
  selectedPassengerIds: [],
  passengers: [],
  passengerForms: {},

  setPassengers: (passengers) => set({ passengers }),
  setSelectedPassengerIds: (ids) => set({ selectedPassengerIds: ids }),

  upsertPassengerForm: (passengerId, form) =>
    set((s) => ({ passengerForms: { ...s.passengerForms, [passengerId]: form } })),
}));