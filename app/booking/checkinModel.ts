
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

export type BoardingPassData = {
    pnr: string;
    terminal: string;
    gate: string;
    fromCode: string; // BKK
    fromName: string; // Suvarnabhumi Airport, Bangkok
    fromDate: string; // 19 Feb 2026
    toCode: string; // SIN
    toName: string; // Changi International Airport, Singapore
    toDate: string; // 20 Feb 2026
    flightNo: string; // QL123
    zone: string;
    seq: string;
    boardingTime: string; // 21:14
    departTime: string; // 14:54
    departDate: string; // Thu • 19 Feb 2026
    arriveTime: string; // 17:54
    arriveDate: string; // Fri • 20 Feb 2026
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

export const MOCK_FIGHT: BoardingPassData = {
    pnr: "ABC1234567890123",
    terminal: "1",
    gate: "40",
    fromCode: "BKK",
    fromName: "Suvarnabhumi Airport, Bangkok",
    fromDate: "19 Feb 2026",
    toCode: "SIN",
    toName: "Changi International Airport, Singapore",
    toDate: "20 Feb 2026",
    flightNo: "QL123",
    zone: "1",
    seq: "023",
    boardingTime: "21:14",
    departTime: "14:54",
    departDate: "Thu • 19 Feb 2026",
    arriveTime: "17:54",
    arriveDate: "Fri • 20 Feb 2026",
};