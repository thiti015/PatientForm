"use client";
import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

type PatientData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob?: string;
  gender?: string;
  phone?: string;
  email: string; // ใช้ email เป็น unique key
  address?: string;
  language?: string;
  nationality?: string;
  emergencyContact?: string;
  religion?: string;
  status: "filling" | "completed" | "editing" | "inactive";
};

export default function StaffView() {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [highlightFields, setHighlightFields] = useState<{ [email: string]: string }>({});

  useEffect(() => {
    const handleUpdate = (data: PatientData & { updatedField?: string }) => {
      setPatients(prev => {
        const idx = prev.findIndex(p => p.email === data.email);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = data;
          return updated;
        }
        return [...prev, data];
      });

      if (data.updatedField) {
        setHighlightFields(prev => ({ ...prev, [data.email]: "" }));
        // ลบ highlight หลัง 3 วินาที
        setTimeout(() => {
          setHighlightFields(prev => ({ ...prev, [data.email]: "" }));
        }, 3000);
      }
    };

    socket.on("form_update", handleUpdate);
    return () => {
      socket.off("form_update", handleUpdate);
    };
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "filling": return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed": return "bg-green-100 text-green-800 border-green-300";
      case "editing": return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getFieldStyle = (email: string, field: string) => {
    return highlightFields[email] === field ? "bg-yellow-100 transition-colors" : "";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📋 Staff Dashboard</h2>
      {patients.length === 0 ? (
        <p className="text-gray-500 text-center">No patient data yet...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {patients.map(p => (
            <div
              key={p.email}
              className={`p-5 rounded-2xl shadow-md border ${getStatusStyle(p.status)} transition-transform hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">
                  {p.firstName} {p.middleName || ""} {p.lastName}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-bold capitalize">
                  {p.status}
                </span>
              </div>
              <div className="text-sm space-y-1">
                <p className={getFieldStyle(p.email, "dob")}><strong>Date of Birth:</strong> {p.dob || "-"}</p>
                <p className={getFieldStyle(p.email, "gender")}><strong>Gender:</strong> {p.gender || "-"}</p>
                <p className={getFieldStyle(p.email, "phone")}><strong>Phone:</strong> {p.phone || "-"}</p>
                <p className={getFieldStyle(p.email, "email")}><strong>Email:</strong> {p.email}</p>
                <p className={getFieldStyle(p.email, "address")}><strong>Address:</strong> {p.address || "-"}</p>
                <p className={getFieldStyle(p.email, "language")}><strong>Language:</strong> {p.language || "-"}</p>
                <p className={getFieldStyle(p.email, "nationality")}><strong>Nationality:</strong> {p.nationality || "-"}</p>
                <p className={getFieldStyle(p.email, "emergencyContact")}><strong>Emergency Contact:</strong> {p.emergencyContact || "-"}</p>
                <p className={getFieldStyle(p.email, "religion")}><strong>Religion:</strong> {p.religion || "-"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
