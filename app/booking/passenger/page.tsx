"use client";
import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import BookingTemplate from "../BookingTemplate";
import BookingBottomBar from "../BookingBottomBar";
import { useRouter } from "next/navigation";
// import CloseIcon from "@mui/icons-material/Close";

type Passenger = {
    id: string;
    name: string;
};

type CountryOption = {
    code: string;      // e.g. "TH"
    name: string;      // e.g. "Thailand"
    dialCode: string;  // e.g. "+66"
    flag: string;      // emoji to match screenshot quickly
};

type PassengerForm = {
    nationality: string;
    countryCode: string; // used for dial code dropdown
    phoneNumber: string;
};

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        bgcolor: "white",
    },
};

function PassengerSection({
    index,
    passenger,
    countries,
    value,
    onChange,
}: {
    index: number;
    passenger: Passenger;
    countries: CountryOption[];
    value: PassengerForm;
    onChange: (next: PassengerForm) => void;
}) {
    const selectedCountry = countries.find((c) => c.code === value.countryCode);

    return (
        <Box
            sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 2,
                p: { xs: 2, md: 2.5 },
                bgcolor: "white",
            }}
        >
            <Typography fontWeight={900} fontSize={14} color="#111827">
                {index}. {passenger.name}
            </Typography>

            <Stack spacing={2} sx={{ mt: 2 }}>
                {/* Nationality */}
                <Box>
                    <Typography fontSize={13} fontWeight={800} color="#374151" sx={{ mb: 0.75 }}>
                        Nationality
                    </Typography>
                    <TextField
                        fullWidth
                        value={value.nationality}
                        onChange={(e) => onChange({ ...value, nationality: e.target.value })}
                        placeholder="TH"
                        sx={fieldSx}
                    />
                </Box>

                {/* Phone Number */}
                <Box>
                    <Typography fontSize={13} fontWeight={800} color="#374151" sx={{ mb: 0.75 }}>
                        Phone Number
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        alignItems="stretch"
                    >
                        <TextField
                            select
                            value={value.countryCode}
                            onChange={(e) => onChange({ ...value, countryCode: e.target.value })}
                            sx={{
                                ...fieldSx,
                                width: { xs: "100%", sm: 120 },
                            }}
                        >
                            {countries.map((c) => (
                                <MenuItem key={c.code} value={c.code}>
                                    {c.flag} {c.dialCode}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            value={value.phoneNumber}
                            onChange={(e) => onChange({ ...value, phoneNumber: e.target.value })}
                            placeholder="811234567"
                            sx={fieldSx}
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
                        />
                    </Stack>

                    <Typography fontSize={12} color="#6B7280" sx={{ mt: 0.75 }}>
                        {selectedCountry?.name ?? ""}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
}

export default function PassengerDetailsStep() {
    const passengers: Passenger[] = useMemo(
        () => [
            { id: "p1", name: "ALEX HUUM" },
            { id: "p2", name: "Somsee Kuum" },
        ],
        [],
    );

    const countries: CountryOption[] = useMemo(
        () => [
            { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
            { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
            { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
            { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
        ],
        [],
    );

    const [forms, setForms] = useState<Record<string, PassengerForm>>({
        p1: { nationality: "TH", countryCode: "TH", phoneNumber: "811234567" },
        p2: { nationality: "US", countryCode: "US", phoneNumber: "5551234567" },
    });

    const updatePassenger = (id: string, next: PassengerForm) => {
        setForms((prev) => ({ ...prev, [id]: next }));
    };

    // simple validation: require nationality + phone number
    const isValid = passengers.every((p) => {
        const f = forms[p.id];
        return Boolean(f?.nationality?.trim()) && Boolean(f?.phoneNumber?.trim());
    });

    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleBack = () => {
        // router.back(); // กลับไปหน้าก่อนหน้า
    };

    const handleContinue = () => {
        console.log("Saving data...", selectedIds);
        // router.push("/next-step"); // ไปหน้าถัดไป
    };

    return (
        <BookingTemplate
            header={{
                title: "Check-in",
                subtitle: "Passenger Details",
                step: 3,
                totalSteps: 5,
                onClose: () => console.log("close"),
            }}
            bottomBar={
                <BookingBottomBar
                    onBack={handleBack}
                    onContinue={handleContinue}
                    isValid={isValid}
                />
            }
        >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Card
                    elevation={0}
                    sx={{
                        width: "100%",
                        maxWidth: 720,
                        borderRadius: 3,
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 10px 28px rgba(17, 24, 39, 0.08)",
                    }}
                >
                    <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                        <Typography fontSize={20} fontWeight={900} color="#111827">
                            Passenger Details
                        </Typography>
                        <Typography fontSize={13} color="#6B7280" sx={{ mt: 0.5 }}>
                            Enter required information for each passenger
                        </Typography>

                        <Divider sx={{ my: 2.5 }} />

                        <Stack spacing={2.5}>
                            {passengers.map((p, idx) => (
                                <PassengerSection
                                    key={p.id}
                                    index={idx + 1}
                                    passenger={p}
                                    countries={countries}
                                    value={forms[p.id]}
                                    onChange={(next) => updatePassenger(p.id, next)}
                                />
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </BookingTemplate>
    );
}