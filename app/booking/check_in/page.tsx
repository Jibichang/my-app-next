"use client";
import React, { useEffect, useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import { Box, Button, Card, CardContent, Stack, Typography, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import BookingTemplate from "../BookingTemplate";
import BookingBottomBar from "../BookingBottomBar";
import { useRouter } from "next/navigation";
import { useCheckInStore } from "../checkinStore";
import { Passenger, MOCK_PASSENGERS } from "../checkinModel";

function PassengerSelectRow({
    passenger,
    selected,
    onToggle,
}: {
    passenger: Passenger;
    selected: boolean;
    onToggle: (id: string) => void;
}) {
    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={() => onToggle(passenger.id)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onToggle(passenger.id);
            }}
            sx={{
                cursor: "pointer",
                position: "relative",
                borderRadius: 3,
                border: selected ? "2px solid #2E79C6" : "1px solid #D1D5DB",
                bgcolor: "#F8FBFF",
                px: { xs: 2, md: 2.5 },
                py: 2,
                "&:hover": { boxShadow: "0 8px 18px rgba(17, 24, 39, 0.08)" },
                outline: "none",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 54,
                    height: 54,
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                    bgcolor: selected ? "#2E79C6" : "#E5E7EB",
                    borderTopRightRadius: 8,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    marginRight: -0.6,
                    marginTop: -0.3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: selected ? "white" : "transparent",
                    border: selected ? "none" : "1px solid #9CA3AF",
                }}
            >
                {selected ? <CheckIcon sx={{ fontSize: 16, color: "#2E79C6" }} /> : null}
            </Box>

            <Typography fontWeight={900} color="#111827" fontSize={14} sx={{ pr: 6 }}>
                {passenger.name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <Chip
                    label={passenger.paxType}
                    size="small"
                    sx={{
                        height: 22,
                        borderRadius: 1.2,
                        bgcolor: "#E9F2FF",
                        color: "#1E6BD6",
                        fontWeight: 800,
                        fontSize: 12,
                    }}
                />
                <Typography fontSize={13} color="#1F2937" fontWeight={600}>
                    Seat {passenger.seat}
                </Typography>
            </Stack>
        </Box>
    );
}

export default function CheckIn() {
    const passengers: Passenger[] = useMemo(() => MOCK_PASSENGERS, []);

    const router = useRouter();
    const allIds = passengers.map((p) => p.id);

    const selectedPassengerIds = useCheckInStore(
        (s) => s.selectedPassengerIds
    );

    const setPassengers = useCheckInStore(
        (s) => s.setPassengers
    );

    const setSelectedPassengerIds = useCheckInStore(
        (s) => s.setSelectedPassengerIds
    );

    useEffect(() => {
        setPassengers(passengers);
    }, [passengers, setPassengers]);

    const [selectedIds, setSelectedIds] = useState<string[]>(
        selectedPassengerIds ?? []
    );

    const toggle = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const noneSelected = selectedIds.length === 0;
    const isValid = !noneSelected;

    const handleBack = () => {
        router.back();
    };

    const handleContinue = () => {
        setSelectedPassengerIds(selectedIds);
        console.log("Saving data...", selectedIds);
        router.push("/booking/passenger");
    };

    const onBulkAction = () => {
        if (noneSelected) setSelectedIds(allIds); // Select all
        else setSelectedIds([]); // Clear all
    };

    return (
        <BookingTemplate
            header={{
                title: "Check-in",
                subtitle: "Select Passengers",
                step: 2,
                totalSteps: 5,
            }}
            bottomBar={
                <BookingBottomBar
                    onBack={handleBack}
                    onContinue={handleContinue}
                    isValid={isValid}
                />
            }
        >
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                mb: { xs: 6, md: 8 }, // space so floating button + bottom bar don't overlap
            }}>
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
                            Select Passengers
                        </Typography>
                        <Typography fontSize={13} color="#6B7280" sx={{ mt: 0.5 }}>
                            Choose passengers for check-in
                        </Typography>

                        <Stack spacing={2} sx={{ mt: 2.5 }}>
                            {passengers.map((p) => (
                                <PassengerSelectRow
                                    key={p.id}
                                    passenger={p}
                                    selected={selectedIds.includes(p.id)}
                                    onToggle={toggle}
                                />
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
                <Box
                    sx={{
                        position: "absolute",
                        right: "50%",
                        transform: "translateX(360px)",
                        bottom: { xs: -56, md: -64 },
                        display: "flex",
                        justifyContent: "flex-end",
                        "@media (max-width: 760px)": {
                            right: 16,
                            transform: "none",
                        },
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={onBulkAction}
                        startIcon={<CloseIcon />}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 800,
                            borderColor: "#CBD5E1",
                            color: "#1F2937",
                            bgcolor: "white",
                            "&:hover": { borderColor: "#94A3B8", bgcolor: "white" },
                        }}
                    >
                        {noneSelected ? "Select all" : "Clear all"}
                    </Button>
                </Box>
            </Box>
        </BookingTemplate>
    );
}