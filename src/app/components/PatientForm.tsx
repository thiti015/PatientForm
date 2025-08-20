"use client";
import { useState } from "react";
import socket from "../../../lib/socket";

export default function PatientForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    language: "",
    nationality: "",
    emergencyContact: "",
    religion: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  const newData = { ...formData, [name]: value };
  setFormData(newData);

  // ส่งข้อมูลพร้อม field ที่อัปเดต
  if (newData.email) { // ต้องมี email ก่อน
    socket.emit("form_update", { ...newData, status: "filling", updatedField: name });
  }

  if (errors[name]) {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }
};



  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field as keyof typeof formData] && !["middleName", "religion", "emergencyContact"].includes(field)) {
        newErrors[field] = "This field is required";
      }
    });
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    socket.emit("form_update", { ...formData, status: "completed" });
    alert("✅ Form submitted successfully!");
  };

  return (
    <form className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center text-gray-800">🧾 Patient Registration</h2>
      <p className="text-gray-500 text-center">กรอกข้อมูลผู้ป่วยให้ครบถ้วน</p>

      {/* Name Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} required />
        <InputField label="Middle Name (Optional)" name="middleName" value={formData.middleName} onChange={handleChange} />
        <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} required />
      </div>

      {/* Other Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} error={errors.dob} required />
        <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} error={errors.gender} options={[
          { value: "", label: "Select Gender" },
          { value: "male", label: "ชาย" },
          { value: "female", label: "หญิง" },
          { value: "other", label: "อื่น ๆ" }
        ]} required />
      </div>

      {/* Contact Info */}
      <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />
      <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
      <InputField label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} required />

      {/* Optional fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Language" name="language" value={formData.language} onChange={handleChange} />
        <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} error={errors.nationality} />
      </div>
      <InputField label="Emergency Contact (Optional)" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
      <InputField label="Religion (Optional)" name="religion" value={formData.religion} onChange={handleChange} />

      <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-200">Submit</button>
      </div>
    </form>
  );
}

function InputField({ label, name, value, onChange, type="text", error, required=false }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded-lg focus:ring-2 ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-400"}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, error, options, required=false }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded-lg focus:ring-2 ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-400"}`}
      >
        {options.map((o: any, i: number) => <option key={i} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
