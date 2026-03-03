"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  Link,
  Grid,
  Paper,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LuggageIcon from "@mui/icons-material/Luggage";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

type NavItem = { label: string; href?: string; active?: boolean };

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Flights", href: "#" },
  { label: "Check-in", href: "#", active: true },
  { label: "Manage Booking", href: "#" },
  { label: "Contact", href: "#" },
];

function NavLinkItem({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href ?? "#"}
      underline="none"
      sx={{
        whiteSpace: "nowrap",
        fontSize: 14,
        fontWeight: item.active ? 700 : 600,
        color: item.active ? "#1E6BD6" : "#111827",
        pb: 1,
        borderBottom: item.active ? "2px solid #1E6BD6" : "2px solid transparent",
        "&:hover": { color: "#1E6BD6" },
      }}
    >
      {item.label}
    </Link>
  );
}

function TipRow({ title, description }: { title: string; description: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <CheckCircleOutlineIcon sx={{ mt: "2px", fontSize: 18, color: "#1E6BD6" }} />
      <Box>
        <Typography fontWeight={800} fontSize={14} color="#111827">
          {title}
        </Typography>
        <Typography fontSize={13} color="#6B7280" sx={{ mt: 0.25, lineHeight: 1.45 }}>
          {description}
        </Typography>
      </Box>
    </Stack>
  );
}

function IconPill({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: 38,
        height: 38,
        borderRadius: 2,
        bgcolor: "#E9F2FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}

export default function Dashboard() {
  const router = useRouter();

  const handleDone = () => {
    router.push("/booking/check_in");
  };

  const [lastName, setLastName] = useState("");
  const [pnr, setPnr] = useState("");
  const isFormValid = lastName.trim() !== "" && pnr.trim() !== "";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F6F9FC" }} suppressHydrationWarning>
      {/* Top Nav */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: "white", borderBottom: "1px solid #E5E7EB" }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              {/* Brand */}
              <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 140 }}>
                <FlightTakeoffIcon sx={{ color: "#1E6BD6" }} />
                <Box>
                  <Typography fontWeight={900} color="#111827" lineHeight={1}>
                    Qoomlee
                  </Typography>
                  <Typography fontSize={12} color="#1E6BD6" lineHeight={1}>
                    Airline
                  </Typography>
                </Box>
              </Stack>

              {/* Links (scrollable on mobile) */}
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                sx={{
                  overflowX: "auto",
                  maxWidth: { xs: "60vw", md: "unset" },
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {navItems.map((item) => (
                  <NavLinkItem key={item.label} item={item} />
                ))}
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #2E79C6 0%, #3AA6D6 100%)",
          color: "white",
          py: { xs: 5, md: 8 },
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Stack spacing={1.25} alignItems="center" textAlign="center">
            <Typography sx={{ fontSize: { xs: 30, sm: 36, md: 48 }, fontWeight: 900 }}>
              Online Check-in
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, fontWeight: 700, opacity: 0.95 }}>
              Fly Smart. Fly Qoomlee.
            </Typography>
            <Typography sx={{ fontSize: { xs: 12.5, sm: 13.5, md: 14 }, opacity: 0.9 }}>
              Check in online and save time at the airport
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* On mobile: form first, tips second. On desktop: form left, tips right */}
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 1 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                boxShadow: "0 8px 24px rgba(17, 24, 39, 0.06)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.25, md: 3 } }}>
                <Typography fontSize={{ xs: 18, md: 22 }} fontWeight={900} color="#111827">
                  Retrieve Your Booking
                </Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                  <Box>
                    <Typography fontSize={13} fontWeight={800} color="#374151" sx={{ mb: 0.75 }}>
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      InputProps={{ sx: { borderRadius: 2, bgcolor: "white" } }}
                    />
                  </Box>

                  <Box>
                    <Typography fontSize={13} fontWeight={800} color="#374151" sx={{ mb: 0.75 }}>
                      Booking reference (PNR)
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="ABC123 OR 1234567890123"
                      value={pnr}
                      onChange={(e) => setPnr(e.target.value)}
                      InputProps={{ sx: { borderRadius: 2, bgcolor: "white" } }}
                    />
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!isFormValid}
                    onClick={handleDone}
                    sx={{
                      py: 1.35,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 800,
                      bgcolor: isFormValid ? "#4A8BB2" : "#8FB7D8",
                      color: "white",
                      "&:hover": {
                        bgcolor: isFormValid ? "#3A7293" : "#8FB7D8"
                      },
                      "&.Mui-disabled": {
                        bgcolor: "#8FB7D8",
                        color: "rgba(255, 255, 255, 0.7)"
                      }
                    }}
                  >
                    Retrieve Booking
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Bottom cards */}
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: { xs: 0.5, md: 0.75 } }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    mt: { xs: 2, md: 3 },
                    borderRadius: 3,
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 8px 24px rgba(17, 24, 39, 0.06)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <IconPill>
                        <AccessTimeIcon sx={{ color: "#1E6BD6" }} />
                      </IconPill>
                      <Typography fontSize={18} fontWeight={900} color="#111827">
                        Flight Status
                      </Typography>
                    </Stack>

                    <Typography fontSize={13} color="#6B7280" sx={{ mt: 1.25, lineHeight: 1.6 }}>
                      Track your flight in real-time. Get updates on departure, arrival, gate
                      changes, and delays.
                    </Typography>

                    <Link
                      href="#"
                      underline="none"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.75,
                        mt: 2,
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#1E6BD6",
                      }}
                    >
                      Check Status <ArrowForwardIcon sx={{ fontSize: 16 }} />
                    </Link>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    mt: { xs: 2, md: 3 },
                    borderRadius: 3,
                    border: "1px solid #E5EEB",
                    boxShadow: "0 8px 24px rgba(17, 24, 39, 0.06)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <IconPill>
                        <LuggageIcon sx={{ color: "#1E6BD6" }} />
                      </IconPill>
                      <Typography fontSize={18} fontWeight={900} color="#111827">
                        Baggage Rules
                      </Typography>
                    </Stack>

                    <Typography fontSize={13} color="#6B7280" sx={{ mt: 1.25, lineHeight: 1.6 }}>
                      Economy: 1 carry-on (7kg) + checked (23kg). <br />
                      Business: 2 carry-ons + 2 checked bags (32kg each).
                    </Typography>

                    <Link
                      href="#"
                      underline="none"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.75,
                        mt: 2,
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#1E6BD6",
                      }}
                    >
                      Learn More <ArrowForwardIcon sx={{ fontSize: 16 }} />
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Right column: Travel Tips */}
          <Grid size={{ xs: 12, md: 4 }} order={{ xs: 2, md: 2 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                boxShadow: "0 8px 24px rgba(17, 24, 39, 0.06)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.25, md: 3 } }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <IconPill>
                    <LocationOnIcon sx={{ color: "#1E6BD6" }} />
                  </IconPill>
                  <Typography fontSize={18} fontWeight={900} color="#111827">
                    Travel Tips
                  </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  <TipRow
                    title="Arrive Early"
                    description="Arrive 2–3 hours before international flights, 1–2 hours for domestic."
                  />
                  <TipRow
                    title="Valid Documents"
                    description="Ensure your passport is valid for 6 months beyond your travel dates."
                  />
                  <TipRow
                    title="Mobile Boarding"
                    description="Download your boarding pass to your phone for quick access."
                  />
                  <TipRow
                    title="Pack Smart"
                    description="Keep liquids in containers ≤100ml and place in a clear bag."
                  />
                  <TipRow
                    title="Stay Informed"
                    description="Check visa requirements and travel advisories for your destination."
                  />
                </Stack>

                <Paper
                  variant="outlined"
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    p: 2,
                    borderColor: "#D6E7FF",
                    bgcolor: "white",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={12} color="#6B7280">
                    Need help? Contact our 24/7 support team
                  </Typography>
                  <Typography fontSize={16} fontWeight={900} color="#1E6BD6" sx={{ mt: 0.5 }}>
                    +1-800-QOOMLEE
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}