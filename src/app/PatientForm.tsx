import React from "react";

interface PatientFormProps {
  form: any;
  errors: any;
  status: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PatientForm({ form, errors, status, onChange, onSubmit }: PatientFormProps) {
  return (
    <form className="bg-white dark:bg-[#181818] rounded-xl shadow p-4 sm:p-8 flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">ชื่อ (First Name) <span className="text-red-500">*</span></label>
          <input name="firstName" value={form.firstName} onChange={onChange} className="input w-full" />
          {errors.firstName && <div className="text-red-500 text-xs">{errors.firstName}</div>}
        </div>
        <div>
          <label className="block font-medium">ชื่อกลาง (Middle Name)</label>
          <input name="middleName" value={form.middleName} onChange={onChange} className="input w-full" />
        </div>
        <div>
          <label className="block font-medium">นามสกุล (Last Name) <span className="text-red-500">*</span></label>
          <input name="lastName" value={form.lastName} onChange={onChange} className="input w-full" />
          {errors.lastName && <div className="text-red-500 text-xs">{errors.lastName}</div>}
        </div>
        <div>
          <label className="block font-medium">วันเกิด (Birth Date) <span className="text-red-500">*</span></label>
          <input type="date" name="birthDate" value={form.birthDate} onChange={onChange} className="input w-full" />
          {errors.birthDate && <div className="text-red-500 text-xs">{errors.birthDate}</div>}
        </div>
        <div>
          <label className="block font-medium">เพศ (Gender) <span className="text-red-500">*</span></label>
          <select name="gender" value={form.gender} onChange={onChange} className="input w-full">
            <option value="">-- เลือก --</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่น ๆ</option>
          </select>
          {errors.gender && <div className="text-red-500 text-xs">{errors.gender}</div>}
        </div>
        <div>
          <label className="block font-medium">ศาสนา (Religion)</label>
          <input name="religion" value={form.religion} onChange={onChange} className="input w-full" />
        </div>
        <div>
          <label className="block font-medium">เบอร์โทร (Phone) <span className="text-red-500">*</span></label>
          <input name="phone" value={form.phone} onChange={onChange} className="input w-full" />
          {errors.phone && <div className="text-red-500 text-xs">{errors.phone}</div>}
        </div>
        <div>
          <label className="block font-medium">อีเมล (Email) <span className="text-red-500">*</span></label>
          <input name="email" value={form.email} onChange={onChange} className="input w-full" />
          {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
        </div>
        <div>
          <label className="block font-medium">ที่อยู่ (Email) <span className="text-red-500">*</span></label>
          <input name="email" value={form.email} onChange={onChange} className="input w-full" />
          {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
        </div>
        <div className="sm:col-span-2">
          <label className="block font-medium">Emergency Contact</label>
          <input name="emergencyContact" value={form.emergencyContact} onChange={onChange} className="input w-full" />
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50" disabled={status==='submitted'}>
        {status === 'submitted' ? 'ส่งข้อมูลแล้ว' : 'ส่งข้อมูล'}
      </button>
    </form>
  );
}
