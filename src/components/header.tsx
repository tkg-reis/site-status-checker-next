import Link from "next/link";
import React from "react";
import LogoutButton from "./logoutButton";
import { createClient } from "../lib/supabase/server";

const Header = async() => {
  const supabase = await createClient();
  const { data: { user }} = await supabase.auth.getUser();

  return (
    <header className="mx-auto my-4 min-w-80 max-w-5xl flex gap-4 justify-between rounded-xl border shadow">
      <p className="p-2 ">
        { user !== null ? 
        <Link href="/">SiteStatusChecker</Link> : <span>SiteStatusChecker</span>
        }
      </p>
      { user !== null ? 
        <ul className="flex gap-4 justify-center">
          <li className="p-2">
            <Link href="/insert">insert</Link>
          </li>
          <li className="p-2">
            <Link href="/user">user</Link>
          </li>
          <li className="p-2">
            <LogoutButton />
          </li>
        </ul>
        : ""
      }

    </header>
  );
};

export default Header;
