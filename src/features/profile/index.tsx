import note from "@/assets/note-text.svg";
import lock from "@/assets/lock-2.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import PersonalDetails from "./components/PersonalDetails";
import LoginSecurity from "./components/LoginSecurity";
import { useGetProfile } from "@/services/profile/queries";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal-info");
  const { data, isRefetching } = useGetProfile();

  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-3.5">Your profile</h1>
        <p className="text-lg">Manage your RewardClan account</p>
      </div>
      <div className="mt-12">
        <div className="flex gap-8 mb-11">
          <div
            className={cn(
              "flex flex-col gap-2 max-w-2xs border border-[#E5E9EB] rounded-xl p-6 cursor-pointer",
              activeTab === "personal-info" && "border-[#F15822] bg-[#FAF2EF]"
            )}
            onClick={() => setActiveTab("personal-info")}
          >
            <img src={note} alt="" className="mb-0.5 h-12 w-12" />
            <h2 className="text-xl font-semibold">Personal Info</h2>
            <p className="text-[#717171]">
              Provide personal details and how we can reach you
            </p>
          </div>
          <div
            className={cn(
              "flex flex-col gap-2 max-w-2xs border border-[#E5E9EB] rounded-xl p-6 cursor-pointer",
              activeTab === "login-security" && "border-[#F15822] bg-[#FAF2EF]"
            )}
            onClick={() => setActiveTab("login-security")}
          >
            <img src={lock} alt="" className="mb-0.5 h-12 w-12" />
            <h2 className="text-xl font-semibold">Login & Security</h2>
            <p className="text-[#717171]">
              Update your password and secure your account
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl py-6">
          {activeTab === "personal-info" && (
            <PersonalDetails data={data} isRefetching={isRefetching} />
          )}
          {activeTab === "login-security" && <LoginSecurity />}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
