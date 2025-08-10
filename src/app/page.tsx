
"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import PatientForm from "./PatientForm";
import StaffView from "./StaffView";

// SOCKET_URL: Change to your deployed/local socket.io server if needed
const SOCKET_URL = typeof window !== "undefined"
  ? window.location.origin.replace(/^http/, "ws")
  : "";

// Patient form type
type PatientFormType = {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  religion: string;
  emergencyContact: string;
};


export default function Home() {
  // Patient form state
  const [form, setForm] = useState<PatientFormType>({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    phone: "",
    email: "",
    religion: "",
    emergencyContact: "",
  });
  const [status, setStatus] = useState<'editing' | 'submitted' | 'inactive'>("editing");
  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormType, string>>>({});
  const socketRef = useRef<Socket | null>(null);


  // Real-time sync: connect socket.io
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
    }
    const socket = socketRef.current;
    // Listen for updates from server
    socket.on("form-update", (data: { form: PatientFormType; status: string }) => {
      setForm(data.form);
      setStatus(data.status as 'editing' | 'submitted' | 'inactive');
    });
    return () => {
      socket.off("form-update");
      // socket.disconnect(); // Uncomment if you want to disconnect on unmount
    };
  }, []);

  // Emit form changes to server
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("form-update", { form, status });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, status]);


  // Validation
  function validate() {
    const errs: Partial<Record<keyof PatientFormType, string>> = {};
    if (!form.firstName) errs.firstName = "กรุณากรอกชื่อ";
    if (!form.lastName) errs.lastName = "กรุณากรอกนามสกุล";
    if (!form.birthDate) errs.birthDate = "กรุณากรอกวันเกิด";
    if (!form.gender) errs.gender = "กรุณาเลือกเพศ";
    if (!form.phone) errs.phone = "กรุณากรอกเบอร์โทร";
    else if (!/^\d{9,15}$/.test(form.phone)) errs.phone = "เบอร์โทรไม่ถูกต้อง";
    if (!form.email) errs.email = "กรุณากรอกอีเมล";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "อีเมลไม่ถูกต้อง";
    return errs;
  }

  // Handle input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setStatus("editing");
  }

  // Handle form submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStatus("submitted");
    }
  }

  // Render
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16">
      <main className="flex flex-col gap-8 sm:gap-12 row-start-2 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-2 text-center sm:text-left">Patient Form</h1>
        <PatientForm
          form={form}
          errors={errors}
          status={status}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <StaffView form={form} status={status} />
      </main>
    </div>
  );
}
