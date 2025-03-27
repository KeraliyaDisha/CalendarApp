import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";

interface UserMenuProps {
  onLogout: () => void;
}

export default function UserProfileMenu({ onLogout }: UserMenuProps) {
  const { data, loading, error } = useQuery(GET_USER);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (loading) return null;
  if (error) return <p>Error loading user data.</p>;

  const user = data.user;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden hover:border-2"
      >
        <Image
          src="/profile icon.png" 
          alt="Profile"
          width={30} 
          height={30}
          className="w-full h-full rounded-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-[#F5F5F5] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {/* User Information */}
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900">
              {user.firstName}
            </p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          <div className="border-t border-gray-200" />

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 font-semibold"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
