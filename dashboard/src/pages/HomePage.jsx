import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BookMarked,
  FileBadge,
  FolderGit,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  PencilRuler,
  User,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import Dashboard from "./sub-components/Dashboard";
import AddSkill from "./sub-components/AddSkill";
import AddProject from "./sub-components/AddProject";
import AddCertificates from "./sub-components/AddCertificates";
import Account from "./sub-components/Account";
import Messages from "./sub-components/Messages";
import AddTimeline from "./sub-components/AddTimeline";

const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const [navOpen, setNavOpen] = useState(false);
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  const menuItems = [
    { name: "Dashboard", icon: LayoutGrid },
    { name: "Add Project", icon: FolderGit },
    { name: "Add Skill", icon: PencilRuler },
    { name: "Add Certificate", icon: FileBadge },
    { name: "Add Education", icon: BookMarked },
    { name: "Messages", icon: MessageSquareMore },
    { name: "Account", icon: User },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 ${navOpen ? "w-60" : "w-[80px]"} flex flex-col border-r bg-background z-50 transition-all duration-300`}>
        <nav className="flex flex-col items-start gap-4 px-6 py-5">
          <Link className="group flex items-center gap-3 pb-4 text-lg font-semibold text-blue-600">
            {/* Toggle Button */}
            <button onClick={() => setNavOpen(!navOpen)}>
              <Home className="h-7 w-7" />
              {navOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
            {navOpen && <span>ADMIN MENU</span>}
          </Link>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              className={`flex items-center gap-3 w-full px-1 py-2 rounded-lg transition-colors ${active === item.name
                  ? "bg-accent text-blue-600"
                  : "text-muted-foreground hover:text-blue-500 hover:bg-background"
                }`}
              onClick={() => {
                setActive(item.name);
                setNavOpen(false);
              }}
            >
              <item.icon className="h-[25px] w-[25px]" />
              {navOpen && <span className="text-lg">{item.name}</span>}
            </Link>
          ))}
        </nav>
        {/* Logout */}
        <nav className="mt-auto flex flex-col items-start px-4 py-5">
          <Link
            className="flex items-center gap-3 w-full px-3 py-2 text-red-500 hover:text-red-400 hover:bg-muted rounded-lg transition-colors"
            onClick={() => {
              dispatch(logout());
              toast.success("Logged Out!");
            }}
          >
            <LogOut className="h-6 w-6" />
            {navOpen && <span className="text-lg">Logout</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex flex-col ${navOpen ? "lg:ml-60" : "lg:ml-16 "} flex-1 transition-all duration-300 overflow-x-hidden p-4`}>
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 bg-transparent px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
          <div className="flex items-center gap-4 ml-8 sm:ml-16 sm:mt-5 pt-4">
            <img
              src={user && user.avatar && user.avatar.url}
              alt="avatar"
              className="w-20 h-20 rounded-full max-[500px]:hidden"
            />
            <div className="flex flex-col">
              <h1 className="text-4xl font-medium max-[900px]:text-2xl pb-2">
                Welcome back! {user.fullName}
              </h1>
              <h3 className="text-lg text-muted-foreground">
                Enhance your experience towards a better portfolio creation
              </h3>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        {(() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard />;
            case "Add Project":
              return <AddProject />;
            case "Add Skill":
              return <AddSkill />;
            case "Add Certificate":
              return <AddCertificates />;
            case "Add Education":
              return <AddTimeline />;
            case "Messages":
              return <Messages />;
            case "Account":
              return <Account />;
            default:
              return <Dashboard />;
          }
        })()}
      </div>
    </div>
  );
};

export default HomePage;
