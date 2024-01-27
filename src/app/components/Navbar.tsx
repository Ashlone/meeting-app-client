import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,Image} from "@nextui-org/react";

const NavbarComponent=()=> {
  return (
    <Navbar className="flex justify-between items-center p-4 text-white w-full">
      <NavbarBrand>
      <Image
            alt="Chillisoft Logo"
            height={200}
            radius="sm"
            src="https://www.chillisoft.co.za/wp-content/uploads/2019/12/cropped-Chilli-Logo-with-the-R.png-new.png"
            width={200}
          />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/home">Dashboard</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarComponent