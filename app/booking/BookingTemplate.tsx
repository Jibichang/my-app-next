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
        <Box sx={{ minHeight: "100vh", bgcolor: "#F6F9FC" }}>
            <StepHeader {...header} />
            <Container
                maxWidth="lg"
                sx={{
                    px: { xs: 2, md: 3 },
                    pt: { xs: 3, md: 5 },
                    pb: bottomBar ? { xs: 20, md: 16 } : { xs: 3, md: 5 },
                    minHeight: "100%",
                }}
            >
                {children}
            </Container>
            {bottomBar ? (
                <Paper
                    elevation={0}
                    sx={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: "#F3F7FB",
                        borderTop: "1px solid #E5E7EB",
                        py: { xs: 1.5, md: 2 },
                    }}
                >
                    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
                        {bottomBar}
                    </Container>
                </Paper>
            ) : null}
        </Box>
    );
}