"use client";
import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
    Paper,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AppleIcon from "@mui/icons-material/Apple";
import { useRouter } from "next/navigation";
import BookingTemplate from "../BookingTemplate";

type PassengerForm = {
    nationality: string;
    countryCode: string;
    phoneNumber: string;
};

type Passenger = {
    id: string;
    name: string;
    paxType: "ADT" | "CHD" | "INF";
    seat: string;
};

type BoardingPassData = {
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

function InfoTile({
    label,
    value,
    highlight,
}: {
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 2,
                borderColor: "#E5E7EB",
                bgcolor: "#F8FAFC",
                px: 2,
                py: 1.5,
                flex: 1,
                minWidth: 0,
            }}
        >
            <Typography fontSize={12} color="#6B7280" fontWeight={700}>
                {label}
            </Typography>
            <Typography
                fontSize={16}
                fontWeight={900}
                sx={{ color: highlight ? "#2E79C6" : "#111827" }}
            >
                {value}
            </Typography>
        </Paper>
    );
}

function TimeTile({
    label,
    time,
    sub,
}: {
    label: string;
    time: string;
    sub: string;
}) {
    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 2,
                borderColor: "#E5E7EB",
                bgcolor: "#F8FAFC",
                px: 2,
                py: 1.5,
                flex: 1,
                minWidth: 0,
            }}
        >
            <Typography fontSize={12} color="#6B7280" fontWeight={700}>
                {label}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography fontSize={20} fontWeight={900} color="#111827">
                    {time}
                </Typography>
                <Typography fontSize={12} color="#6B7280" fontWeight={800}>
                    UTC
                </Typography>
            </Stack>
            <Typography fontSize={12} color="#6B7280" fontWeight={600} sx={{ mt: 0.5 }}>
                {sub}
            </Typography>
        </Paper>
    );
}

function BoardingPassCard({
    passenger,
    form,
    data,
}: {
    passenger: Passenger;
    form: PassengerForm;
    data: BoardingPassData;
}) {
    return (
        <Card
            elevation={0}
            sx={{
                width: "100%",
                maxWidth: 720,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 28px rgba(17, 24, 39, 0.08)",
                overflow: "hidden",
            }}
        >
            {/* top blue strip */}
            <Box
                sx={{
                    bgcolor: "#3B82B6",
                    color: "white",
                    px: 2.5,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <FlightTakeoffIcon sx={{ fontSize: 18 }} />
                    <Typography fontWeight={900} fontSize={18}>
                        Qoomlee
                    </Typography>
                </Stack>
                <Typography fontWeight={800} fontSize={13}>
                    Boarding Pass
                </Typography>
            </Box>

            <CardContent sx={{ p: { xs: 2.25, md: 3 } }}>
                {/* passenger header row */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Box>
                        <Typography fontSize={11} color="#6B7280" fontWeight={800} sx={{ letterSpacing: 0.4 }}>
                            PASSENGER
                        </Typography>
                        <Typography fontSize={18} fontWeight={900} color="#111827">
                            {passenger.name}
                        </Typography>
                        <Typography fontSize={12.5} color="#374151" fontWeight={700} sx={{ mt: 0.5 }}>
                            {passenger.paxType} • PNR: {data.pnr}
                        </Typography>
                        <Typography fontSize={12} color="#6B7280" sx={{ mt: 0.5 }}>
                            {form.nationality} • {form.countryCode} {form.phoneNumber}
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={3} justifyContent="flex-end">
                        <Box sx={{ textAlign: "right" }}>
                            <Typography fontSize={11} color="#6B7280" fontWeight={800}>
                                Terminal
                            </Typography>
                            <Typography fontSize={18} fontWeight={900} color="#111827">
                                {data.terminal}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                            <Typography fontSize={11} color="#6B7280" fontWeight={800}>
                                Gate
                            </Typography>
                            <Typography fontSize={18} fontWeight={900} color="#111827">
                                {data.gate}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>

                {/* route block */}
                <Paper
                    variant="outlined"
                    sx={{
                        mt: 2.25,
                        borderRadius: 2,
                        borderColor: "#E5E7EB",
                        bgcolor: "#F8FAFC",
                        p: { xs: 2, md: 2.25 },
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box sx={{ minWidth: 0 }}>
                            <Typography fontSize={11} color="#6B7280" fontWeight={700}>
                                {data.fromName}
                            </Typography>
                            <Typography fontSize={32} fontWeight={900} color="#2E79C6" sx={{ lineHeight: 1.1 }}>
                                {data.fromCode}
                            </Typography>
                            <Typography fontSize={12} color="#6B7280" fontWeight={700} sx={{ mt: 0.5 }}>
                                {data.fromDate}
                            </Typography>
                        </Box>

                        <Stack alignItems="center" sx={{ px: 2, flexShrink: 0 }}>
                            <Box sx={{ width: 90, height: 2, bgcolor: "#D1D5DB", borderRadius: 999 }} />
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                                <FlightTakeoffIcon sx={{ fontSize: 16, color: "#2E79C6" }} />
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        px: 1.25,
                                        py: 0.4,
                                        borderRadius: 999,
                                        borderColor: "#D6E7FF",
                                        bgcolor: "white",
                                    }}
                                >
                                    <Typography fontSize={12} fontWeight={900} color="#2E79C6">
                                        {data.flightNo}
                                    </Typography>
                                </Paper>
                            </Stack>
                        </Stack>

                        <Box sx={{ textAlign: "right", minWidth: 0 }}>
                            <Typography fontSize={11} color="#6B7280" fontWeight={700}>
                                {data.toName}
                            </Typography>
                            <Typography fontSize={32} fontWeight={900} color="#2E79C6" sx={{ lineHeight: 1.1 }}>
                                {data.toCode}
                            </Typography>
                            <Typography fontSize={12} color="#6B7280" fontWeight={700} sx={{ mt: 0.5 }}>
                                {data.toDate}
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>

                {/* info tiles row */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    sx={{ mt: 2 }}
                >
                    <InfoTile label="Seat" value={passenger.seat} />
                    <InfoTile label="Zone" value={data.zone} />
                    <InfoTile label="Seq" value={data.seq} />
                    <InfoTile label="Boarding" value={data.boardingTime} highlight />
                </Stack>

                {/* time tiles */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    sx={{ mt: 1.5 }}
                >
                    <TimeTile label="Departure" time={data.departTime} sub={data.departDate} />
                    <TimeTile label="Arrival" time={data.arriveTime} sub={data.arriveDate} />
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* barcode placeholder */}
                <Paper
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        borderColor: "#D6DEE9",
                        bgcolor: "white",
                        p: 2,
                        textAlign: "center",
                    }}
                >
                    <Box
                        sx={{
                            height: 60,
                            width: "100%",
                            borderRadius: 1,
                            bgcolor: "#FFFFFF",
                            backgroundImage:
                                "repeating-linear-gradient(90deg, #111827 0, #111827 3px, transparent 3px, transparent 6px)",
                            mx: "auto",
                            maxWidth: 340,
                        }}
                    />
                    <Typography fontSize={12} color="#6B7280" fontWeight={600} sx={{ mt: 1.25 }}>
                        Scan at security and boarding gate
                    </Typography>
                </Paper>

                {/* Apple Wallet */}
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AppleIcon />}
                    sx={{
                        mt: 2,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 900,
                        py: 1.4,
                        bgcolor: "#111827",
                        "&:hover": { bgcolor: "#0B1220" },
                    }}
                    onClick={() => console.log("Add to Apple Wallet")}
                >
                    Add to Apple Wallet
                </Button>
            </CardContent>
        </Card>
    );
}

export default function Boarding({
    selectedPassengers,
    passengerForms,
}: {
    selectedPassengers: Passenger[];
    passengerForms: Record<string, PassengerForm>;
}) {
    const router = useRouter();

    // demo: these would come from your API after step 4 accept
    const data: BoardingPassData = {
        pnr: "ABC123",
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

    const selectedPassengersMock: Passenger[] = [
        {
            id: "p1",
            name: "ALEX HUUM",
            paxType: "ADT",
            seat: "12A",
        },
        {
            id: "p2",
            name: "Somsee Kuum",
            paxType: "ADT",
            seat: "12B",
        },
    ];

    const passengerFormsMock: Record<string, PassengerForm> = {
        p1: { nationality: "TH", countryCode: "TH", phoneNumber: "811234567" },
        p2: { nationality: "US", countryCode: "US", phoneNumber: "5551234567" },
    };

    const handleDone = () => {
        router.push("/"); // or wherever "finish" goes
    };

    return (
        <BookingTemplate
            header={{
                title: "Check-in",
                subtitle: "Boarding Pass",
                step: 5,
                totalSteps: 5,
                onClose: () => router.back(),
            }}
            bottomBar={
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleDone}
                    sx={{
                        maxWidth: 720,
                        mx: "auto",
                        display: "block",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 900,
                        py: 1.4,
                        bgcolor: "#2E79C6",
                        "&:hover": { bgcolor: "#2566AB" },
                    }}
                >
                    Done
                </Button>
            }
        >
            <Stack spacing={3} alignItems="center">
                {selectedPassengersMock?.map((p) => (
                    <BoardingPassCard
                        key={p.id}
                        passenger={p}
                        form={passengerFormsMock[p.id]}
                        data={data}
                    />
                ))}
            </Stack>
        </BookingTemplate>
    );
}