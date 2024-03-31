import { Outlet } from "react-router-dom";
import { Header, SideNavigation } from "../../components";
import adminRoutes from "../../routes/adminRoutes";
import Tab from "../../components/navigation/Tab";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const path = window.location.pathname
    .replace("/admin/", "")
    .replace("-", " ");
  return (
    <div className="w-full h-screen">
      <Header />
      <div className="flex w-full px-5">
        <aside>
          {adminRoutes.map((route, k) => {
            return (
              <Tab
                title={route.name}
                onClick={() => navigate(route.path)}
                icon={route.icon}
                isActive={route.name.toLowerCase() == path}
              />
            );
          })}
        </aside>
        <section className="px-10 w-full">
          <Outlet />
        </section>
      </div>
      {/* <Outlet /> */}
    </div>
  );
};

export default Admin;
