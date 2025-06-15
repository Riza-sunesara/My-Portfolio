import { useState } from "react";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import { Settings } from "lucide-react";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/20 p-4 md:gap-8 sm:pl-40 mr-32">
        <div className="mx-auto grid w-full max-w-6xl gap-2 relative">          
          {/* Settings Icon */}
          <div className="absolute top-0 right-0">
            <button 
              className="p-2 rounded-full hover:bg-gray-200 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Settings className="text-2xl" />
            </button>
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                <button 
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => { setSelectedComponent("Profile"); setDropdownOpen(false); }}
                >
                  Profile
                </button>
                <button 
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => { setSelectedComponent("Update Profile"); setDropdownOpen(false); }}
                >
                  Update Profile
                </button>
                <button 
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => { setSelectedComponent("Update Password"); setDropdownOpen(false); }}
                >
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Component Rendering */}
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <div className="grid gap-6">
            {selectedComponent === "Profile" && <Profile />}
            {selectedComponent === "Update Profile" && <UpdateProfile />}
            {selectedComponent === "Update Password" && <UpdatePassword />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
