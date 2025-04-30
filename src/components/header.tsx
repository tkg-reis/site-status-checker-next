import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="mx-auto my-4 min-w-80 max-w-5xl flex gap-4 justify-between rounded-xl border shadow">
      <p className="p-2 ">
        <Link href="/">SiteStatusChecker</Link>
      </p>
      <ul className="flex gap-4 justify-center">
        <li className="p-2">
          <Link href="/insert">insert</Link>
        </li>
        <li className="p-2">
          <Link href="/user">user</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
