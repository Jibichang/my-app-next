"use client";
import React from "react";
import { useShallow } from 'zustand/react/shallow';
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import BookingTemplate from "../BookingTemplate";
import { useCheckInStore } from "../checkinStore";
import { BoardingPassData, MOCK_FIGHT } from "../checkinModel";
import { BoardingPassCard } from "./BoardingPassCard";

export default function Boarding() {
    const router = useRouter();
    const boarding: BoardingPassData = MOCK_FIGHT;

    const resetStore = useCheckInStore((s) => s.resetStore);
    const handleDone = () => {
        resetStore();
        router.push("/dashboard");
    };

    const passengerForms = useCheckInStore((s) => s.passengerForms);
    const selectedPassengers = useCheckInStore(
        useShallow((s) =>
            s.passengers.filter((p) => s.selectedPassengerIds.includes(p.id))
        )
    );

    return (
        <BookingTemplate
            header={{
                title: "Check-in",
                subtitle: "Boarding Pass",
                step: 5,
                totalSteps: 5,
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
                {selectedPassengers?.map((p) => (
                    <BoardingPassCard
                        key={p.id}
                        passenger={p}
                        form={passengerForms[p.id]}
                        data={boarding}
                    />
                ))}
            </Stack>
        </BookingTemplate>
    );
}