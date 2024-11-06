import Image from "next/image";
import Link from "next/link";
import Hamburger from "./Hamburger";
import { cookies } from "next/headers";
import logo from '../app/assets/MEDISAT.png'

export default function Navbar() {

    const Cookie = cookies().get("Authorization")?.value;

    return (
        <div className="flex flex-wrap justify-start items-center px-3 py-3 fixed top-0 w-full  bg-blue-100 ">
                {/* <Sidebar/> */}
                {Cookie ? <Hamburger/> : null}
                <Link href={"/patients"}>
                <Image
                    src={logo}
                    alt="MEDISAT"
                    width={150}
                    height={50}
                />
                </Link>

            </div>
    )
}
