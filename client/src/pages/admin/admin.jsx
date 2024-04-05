import { Outlet, useNavigate } from "react-router-dom";
import { Header, SideNavigation, ThemeSwitchButton } from "../../components";
import adminRoutes from "../../routes/adminRoutes";
import Tab from "../../components/navigation/Tab";

const Admin = () => {
  const navigate = useNavigate();
  const path = window.location.pathname
    .replace("/admin/", "")
    .replace("-", " ");
  return (
    <div className="w-full h-screen bg-primary">
      <Header />
      <div className="flex w-full">
        <aside className="bg-primary p-5 flex flex-col gap-2">
          {/* <ThemeSwitchButton /> */}
          {adminRoutes.map((route, k) => {
            return (
              <Tab
                key={k}
                title={route.name}
                onClick={() => navigate(route.path)}
                icon={route.icon}
                isActive={route.name.toLowerCase() == path}
              />
            );
          })}
        </aside>
        <section className="p-3 w-full bg-ternary h-[89vh]">
          <div className="bg-primary h-full rounded-md overflow-y-auto p-2">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
