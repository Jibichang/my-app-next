import Image from "next/image";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <Dashboard />
  );
}