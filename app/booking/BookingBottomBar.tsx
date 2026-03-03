import React from "react";
import { Stack, Button, Typography } from "@mui/material";

type BookingBottomBarProps = {
    onBack?: () => void;
    onContinue?: () => void;
    isValid?: boolean;
    backText?: string;
    continueText?: string;
    helperText?: string;
};

export default function BookingBottomBar({
    onBack,
    onContinue,
    isValid = true,
    backText = "Back",
    continueText = "Continue",
    helperText,
}: BookingBottomBarProps) {
    return (
        <Stack spacing={1.5} alignItems="center">
            {/* --- Helper Text --- */}
            {helperText && (
                <Typography
                    fontSize={13}
                    fontWeight={600}
                    color="#374151"
                    textAlign="center"
                    sx={{
                        maxWidth: 720,
                        px: 2,
                    }}
                >
                    {helperText}
                </Typography>
            )}

            {/* --- Buttons --- */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="center"
                sx={{ width: "100%" }}
            >
                <Button
                    variant="outlined"
                    onClick={onBack}
                    sx={{
                        flex: 1,
                        maxWidth: { xs: "100%", sm: 360 },
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 900,
                        borderColor: "#CBD5E1",
                        color: "#1F2937",
                        bgcolor: "white",
                        py: 1.4,
                        "&:hover": { borderColor: "#94A3B8", bgcolor: "white" },
                    }}
                >
                    {backText}
                </Button>

                <Button
                    variant="contained"
                    disabled={!isValid}
                    onClick={onContinue}
                    sx={{
                        flex: 1,
                        maxWidth: { xs: "100%", sm: 360 },
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 900,
                        py: 1.4,
                        bgcolor: "#2E79C6",
                        "&:hover": { bgcolor: "#2566AB" },
                    }}
                >
                    {continueText}
                </Button>
            </Stack>
        </Stack>
    );
}