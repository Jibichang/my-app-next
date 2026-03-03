"use client";
import React from "react";
import { useShallow } from 'zustand/react/shallow';
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import BookingTemplate from "../BookingTemplate";
import { useCheckInStore } from "../checkinStore";
import { BoardingPassData } from "../bookingData";
import { BoardingPassCard } from "./BoardingPassCard";

export default function Boarding() {
    const router = useRouter();

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

    const handleDone = () => {
        // router.push("/");
    };

    const selectedPassengers = useCheckInStore(
        useShallow((s) =>
            s.passengers.filter((p) => s.selectedPassengerIds.includes(p.id))
        )
    );
    const passengerForms = useCheckInStore((s) => s.passengerForms);

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
                {selectedPassengers?.map((p) => (
                    <BoardingPassCard
                        key={p.id}
                        passenger={p}
                        form={passengerForms[p.id]}
                        data={data}
                    />
                ))}
            </Stack>
        </BookingTemplate>
    );
}