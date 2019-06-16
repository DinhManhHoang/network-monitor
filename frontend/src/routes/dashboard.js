import Dashboard from "../views/Dashboard";
import Log from "../views/Log";
import User from '../views/User';
import Alert from '../views/Alert';
import Permission from '../views/Permission';
import Website from '../views/Website';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Bảng điều khiển",
    icon: "dashboard",
    component: Dashboard,
  },
  {
    path: "/user",
    name: "Quản lý tài khoản",
    icon: "person",
    component: User,
  },
  {
    path: "/log",
    name: "Quản lý Log",
    icon: "content_paste",
    component: Log,
  },
  {
    path: "/alert",
    name: "Quản lý Cảnh báo",
    icon: "notification_important",
    component: Alert,
  },
  {
    path: "/website",
    name: "Quản lý Trang Web",
    icon: "web",
    component: Website,
  },
  {
    path: "/permission",
    name: "Quản lý Quyền hệ thống",
    icon: "poll",
    component: Permission,
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
