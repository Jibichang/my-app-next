import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  LinearProgress,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type StepHeaderProps = {
  title: string; // e.g. "Check-in"
  subtitle?: string; // e.g. "Select Passengers"
  step: number; // e.g. 2
  totalSteps: number; // e.g. 5
  onClose?: () => void;
};

export function StepHeader({ title, subtitle, step, totalSteps, onClose }: StepHeaderProps) {
  const progress = Math.max(0, Math.min(100, (step / totalSteps) * 100));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "white", borderBottom: "1px solid #E5E7EB" }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <IconButton size="small" aria-label="close" onClick={onClose}>
                <CloseIcon />
              </IconButton>

              <Box>
                <Typography fontWeight={800} color="#111827" lineHeight={1.1}>
                  {title}
                </Typography>
                {subtitle ? (
                  <Typography fontSize={12} color="#6B7280">
                    {subtitle}
                  </Typography>
                ) : null}
              </Box>
            </Stack>

            <Typography fontSize={12} color="#6B7280" fontWeight={700}>
              Step {step} of {totalSteps}
            </Typography>
          </Stack>
        </Container>
      </Toolbar>

      <Box sx={{ px: { xs: 2, md: 3 }, pb: 1 }}>
        <Container maxWidth="lg" sx={{ px: 0 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 999,
              bgcolor: "#E5E7EB",
              "& .MuiLinearProgress-bar": {
                borderRadius: 999,
                bgcolor: "#2E79C6",
              },
            }}
          />
        </Container>
      </Box>
    </AppBar>
  );
}