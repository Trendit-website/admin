import Dashboard from "@/components/Dashboard";
const DashboardPage = () => {
  return (
    <>
      <main
        className={`hidden lg:flex min-h-screen flex-col items-center justify-between`}
      >
        <Dashboard />
      </main>
      <main
        className={`flex lg:hidden min-h-screen flex-col items-center justify-center`}
      >
        <div className="text-primary-black">
          For better viewing experience, please check on a bigger screen size
        </div>
      </main>
    </>
  );
};
export default DashboardPage;
