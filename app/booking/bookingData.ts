
export type PaxType = "ADT" | "CHD" | "INF";

export interface Passenger {
    id: string;
    name: string;
    paxType: PaxType;
    seat: string;
}

export type PassengerForm = {
    nationality: string;
    countryCode: string;
    phoneNumber: string;
};

export type CountryOption = {
    code: string;      // e.g. "TH"
    name: string;      // e.g. "Thailand"
    dialCode: string;  // e.g. "+66"
    flag: string;      // emoji to match screenshot quickly
};

export const MOCK_PASSENGERS: Passenger[] = [
    { id: "p1", name: "ALEX HUUM", paxType: "ADT", seat: "12A" },
    { id: "p2", name: "Somsee Kuum", paxType: "ADT", seat: "12B" },
];

export const MOCK_CONTRIES: CountryOption[] = [
    { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
    { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
    { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
    { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
];