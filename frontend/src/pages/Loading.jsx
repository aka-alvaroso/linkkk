import { LoaderCircle } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-navy">
      <LoaderCircle className="animate-spin text-white" />
    </div>
  );
}
