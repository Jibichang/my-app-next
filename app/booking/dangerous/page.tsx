"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import BookingTemplate from "../BookingTemplate";
import BookingBottomBar from "../BookingBottomBar";

export default function Dangerous() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push("/booking/boarding");
  };

  return (
    <BookingTemplate
      header={{
        title: "Check-in",
        subtitle: "Dangerous Goods",
        step: 4,
        totalSteps: 5,
      }}
      bottomBar={
        <BookingBottomBar
          onBack={handleBack}
          onContinue={handleContinue}
          continueText="Accept & Continue"
          helperText="I understand and accept the dangerous goods policy."
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
              Dangerous Goods Declaration
            </Typography>
            <Typography fontSize={14} color="#6B7280" sx={{ mt: 0.5 }}>
              A mandatory safety and legal declaration as required by Thai law (CAAT/AOT).
            </Typography>

            <Divider sx={{ my: 2.5 }} />

            <Stack spacing={2}>
              <Typography fontSize={16} fontWeight={900} sx={{ color: "#DC2626" }}>
                For the safety of the flight, the transport of specific hazardous items is strictly
                forbidden.
              </Typography>

              <Typography fontSize={14} color="#374151" sx={{ lineHeight: 1.7 }}>
                By continuing, you confirm that you and those in your booking are NOT carrying the
                following Dangerous Goods in your carry-on or checked baggage, which are prohibited
                under all circumstances:
              </Typography>

              <Box
                component="ul"
                sx={{
                  m: 0,
                  pl: 4,
                  color: "#374151"
                }}
              >
                {[
                  "Explosives (e.g., Fireworks, Flares, Ammunition, Toy Caps, Gunpowder).",
                  "Flammable Items (e.g., Flammable Gases, Gasoline, Lighter Fluid, Aerosol Paints, Strike-Anywhere Matches).",
                  "Corrosives & Poisons (e.g., Acids, Bleach, Pesticides, Toxic or Infectious Substances).",
                  "Lithium Battery-Powered Vehicles (e.g., Hoverboards, Self-Balancing Wheels, Mini-Segways are forbidden in all baggage).",
                  "Other items like Tear Gas, Pepper Spray, or Radioactive Material."
                ].map((text, index, array) => (
                  <Typography
                    key={index}
                    component="li"
                    fontSize={16}
                    sx={{
                      display: "list-item",
                      listStyleType: "disc",
                      mb: index === array.length - 1 ? 0 : 1,
                      lineHeight: 1.5,
                      "&::marker": {
                        color: "#374151",
                      },
                    }}
                  >
                    {text}
                  </Typography>
                ))}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </BookingTemplate>
  );
}