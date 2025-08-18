"use client";
import { ScaleLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { deleteUser } from "@/lib/actions/action";
export default function VerifyPage() {
  const pathname = usePathname();
  const router = useRouter();
  const split = pathname?.split("/").slice(2);
  const email = split?.[0];
  const id = split?.[1];
  useEffect(() => {
    const verify = async () => {
      const response = await axios.get(`/api/auth/verify/${email}/${id}`);
      const result = response?.data;
      if (result.message == "success") {
        toast.success("Email verified successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const timeoutId = setTimeout(() => {
          router.push("/login");
        }, 3000);

        return () => clearInterval(timeoutId);
      } else {
        deleteUser(id as string);
        router.push("/signup");
      }
    };
    verify();
  }, [email, id, router]);
  return (
    <div className="h-screen w-full flex items-center bg-white justify-center">
      <ToastContainer />
      <p className="mr-[10px] text-xl text-black font-bold">Verifying...</p>
      <span>
        <ScaleLoader color="#000" />
      </span>
    </div>
  );
}
