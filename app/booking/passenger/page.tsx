"use client";
import React, { useMemo } from "react";
import { useShallow } from 'zustand/react/shallow';
import {
    Box,
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

import { useCheckInStore } from "../checkinStore";
import { CountryOption, Passenger, PassengerForm, MOCK_CONTRIES } from "../bookingData";

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

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems="stretch">
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
                            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
    const router = useRouter();
    const countries: CountryOption[] = useMemo(() => MOCK_CONTRIES, []);

    const passengers = useCheckInStore(
        useShallow((s) =>
            s.passengers.filter((p) => s.selectedPassengerIds.includes(p.id))
        )
    );
    const passengerForms = useCheckInStore((s) => s.passengerForms);
    const upsertPassengerForm = useCheckInStore((s) => s.upsertPassengerForm);

    const getFormValue = (id: string): PassengerForm =>
        passengerForms[id] ?? { nationality: "", countryCode: "TH", phoneNumber: "" };

    const isValid =
        passengers.length > 0 &&
        passengers.every((p) => {
            const f = getFormValue(p.id);
            return Boolean(f.nationality.trim()) && Boolean(f.phoneNumber.trim());
        });

    const handleBack = () => router.back();

    const handleContinue = () => {
        console.log("Saving data...", passengerForms);
        router.push("/booking/dangerous");
    };

    return (
        <BookingTemplate
            header={{
                title: "Check-in",
                subtitle: "Passenger Details",
                step: 3,
                totalSteps: 5,
                onClose: () => router.back(),
            }}
            bottomBar={<BookingBottomBar onBack={handleBack} onContinue={handleContinue} isValid={isValid} />}
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
                                    value={getFormValue(p.id)}
                                    onChange={(next) => upsertPassengerForm(p.id, next)}
                                />
                            ))}
                        </Stack>

                        {/* Optional: if no passenger selected (direct access step-3) */}
                        {passengers.length === 0 && (
                            <Typography sx={{ mt: 2 }} color="#DC2626" fontWeight={700} fontSize={13}>
                                No passengers selected. Please go back and select passengers first.
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </BookingTemplate>
    );
}