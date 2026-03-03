import {
    Box,
    Container,
    Paper,
} from "@mui/material";
import { StepHeader } from "./StepView";

export type StepHeaderProps = {
    title: string;
    subtitle?: string;
    step: number;
    totalSteps: number;
    onClose?: () => void;
};

type StepLayoutProps = {
    header: StepHeaderProps;
    children: React.ReactNode;
    bottomBar?: React.ReactNode;
};

export default function BookingTemplate({ header, children, bottomBar }: StepLayoutProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                bgcolor: "#F6F9FC",
                overflow: "hidden",
            }}
        >
            <Box sx={{ flexShrink: 0 }}>
                <StepHeader {...header} />
            </Box>

            {/* 2. Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    pt: { xs: 2, md: 4 },
                    pb: bottomBar ? { xs: 4, md: 6 } : 4,
                }}
            >
                <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
                    {children}
                </Container>
            </Box>

            {/* 3. Bottom Bar */}
            {bottomBar && (
                <Paper
                    elevation={0}
                    sx={{
                        flexShrink: 0,
                        bgcolor: "#F3F7FB",
                        borderTop: "1px solid #E5E7EB",
                        py: { xs: 2, md: 2.5 },
                        width: "100%",
                    }}
                >
                    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
                        {bottomBar}
                    </Container>
                </Paper>
            )}
        </Box>
    );
}