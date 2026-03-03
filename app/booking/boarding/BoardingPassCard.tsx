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
import AppleIcon from "@mui/icons-material/Apple";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightIcon from "@mui/icons-material/Flight";
import { Passenger, PassengerForm, BoardingPassData } from "../checkinModel";
import Barcode from 'react-barcode';

export function BoardingPassCard({
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
                    direction={{ xs: "row", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={1}
                    sx={{ mb: 2 }}
                >
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography fontSize={11} color="#6B7280" fontWeight={800} sx={{ letterSpacing: 0.4 }}>
                            PASSENGER
                        </Typography>
                        <Typography
                            fontSize={{ xs: 16, sm: 18 }}
                            fontWeight={900}
                            color="#111827"
                            noWrap
                        >
                            {passenger.name}
                        </Typography>
                        <Typography fontSize={12} color="#374151" fontWeight={700}>
                            {passenger.paxType} • PNR: {data.pnr}
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={{ xs: 2, sm: 3 }} sx={{ flexShrink: 0 }}>
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
                    {/* FROM */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexShrink: 0 }}>
                        <Box sx={{ minWidth: 0, textAlign: "center" }}>
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

                        {/* Fight Number */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "40%" }}>
                            <Box
                                sx={{
                                    flex: 1,
                                    height: 0,
                                    borderBottom: "2px dashed #D1D5DB",
                                }}
                            />
                            <Stack direction="column" alignItems="center" sx={{ flexShrink: 0 }}>
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        color: '#2E79C6',
                                    }}
                                >
                                    <FlightIcon sx={{ fontSize: 16, transform: 'rotate(90deg)' }} />
                                </Box>
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

                            <Box
                                sx={{
                                    flex: 1,
                                    height: 0,
                                    borderBottom: "2px dashed #D1D5DB",
                                }}
                            />
                        </Stack>

                        {/* TO */}
                        <Box sx={{ minWidth: 0, textAlign: "center" }}>
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
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            overflow: "hidden"
                        }}
                    >
                        <Barcode
                            value={data.pnr || "BOARDINGPASS"}
                            width={1.2}
                            height={60}
                            displayValue={false}
                            background="transparent"
                            lineColor="#111827"
                            margin={0}
                        />
                    </Box>
                </Paper>

                <Typography fontSize={12}
                    color="#6B7280"
                    fontWeight={600}
                    sx={{
                        mt: 1.25,
                        textAlign: "center",
                        width: "100%",
                        display: "block"
                    }}>
                    Scan at security and boarding gate
                </Typography>

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