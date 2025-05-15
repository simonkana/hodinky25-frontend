import { PropsWithChildren } from "react";
import DashboardClientLayout from "./DashboardClientLayout";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
