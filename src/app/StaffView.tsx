import React from "react";

interface StaffViewProps {
  form: any;
  status: string;
}

export default function StaffView({ form, status }: StaffViewProps) {
  return (
    <div className="mt-8 bg-gray-50 dark:bg-[#222] rounded-xl shadow p-4 sm:p-8">
      <h2 className="text-lg font-bold mb-2">Staff View</h2>
      <div className="mb-2">
        <span className="font-medium">สถานะผู้ป่วย: </span>
        <span className={
          status === 'editing' ? 'text-yellow-600' :
          status === 'submitted' ? 'text-green-600' :
          'text-gray-400'
        }>
          {status === 'editing' ? 'กำลังกรอก' : status === 'submitted' ? 'กรอกเสร็จแล้ว' : 'ไม่ active'}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <tbody>
            <tr><td className="font-medium">ชื่อ</td><td>{form.firstName}</td></tr>
            <tr><td className="font-medium">ชื่อกลาง</td><td>{form.middleName}</td></tr>
            <tr><td className="font-medium">นามสกุล</td><td>{form.lastName}</td></tr>
            <tr><td className="font-medium">วันเกิด</td><td>{form.birthDate}</td></tr>
            <tr><td className="font-medium">เพศ</td><td>{form.gender}</td></tr>
            <tr><td className="font-medium">ศาสนา</td><td>{form.religion}</td></tr>
            <tr><td className="font-medium">เบอร์โทร</td><td>{form.phone}</td></tr>
            <tr><td className="font-medium">อีเมล</td><td>{form.email}</td></tr>
            <tr><td className="font-medium">Emergency Contact</td><td>{form.emergencyContact}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
