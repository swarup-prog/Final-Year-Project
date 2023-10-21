import { DashCard, DashNav, DashSidebar } from "../../components";

const Dashboard = () => {
  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-between"
      style={{ background: "#edf2f7" }}
    >
      <DashSidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <DashNav />
        {/* ============================================================ */}
        <div className="px-6 pt-6 2xl:container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
