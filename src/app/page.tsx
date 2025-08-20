export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Patient Form System</h1>
      <a href="/PatientForm" className="text-blue-500 underline">Go to Patient Form</a>
      <a href="/StaffView" className="text-green-500 underline">Go to Staff View</a>
    </main>
  );
}
