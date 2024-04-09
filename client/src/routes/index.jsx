import {
  AdminGames,
  AdminNews,
  Buddies,
  Community,
  Dashboard,
  Discover,
  Home,
  Messages,
  Notifications,
  Profile,
  Users,
} from "../pages";

const userRoutes = [
  {
    path: "/app/home",
    element: <Home />,
  },
  {
    path: "/app/profile",
    element: <Profile />,
  },
  {
    path: "/app/buddies",
    element: <Buddies />,
  },
  {
    path: "/app/discover",
    element: <Discover />,
  },
  {
    path: "/app/messages",
    element: <Messages />,
  },
  {
    path: "/app/notifications",
    element: <Notifications />,
  },
  {
    path: "/app/communities",
    element: <Community />,
  },
];

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/games",
    element: <AdminGames />,
  },
  {
    path: "/admin/news",
    element: <AdminNews />,
  },
  {
    path: "/admin/users",
    element: <Users />,
  },
];

export { userRoutes, adminRoutes };
