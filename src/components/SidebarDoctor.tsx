import { CalendarDays, Home, LogOut, NotepadText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
const logo = require('../app/assets/MEDISAT.png')

// Menu items.
const items = [
  {
    title: "Beranda",
    url: "/doctors",
    icon: Home,
  },
  {
    title: "Daftar Pasien",
    url: "/doctors",
    icon: NotepadText,
  },
]

export function SidebarDoctor() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image
              src={logo}
              alt="MEDISAT Logo"
              width={150}
              height={50}
            />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon color="#3e9392" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* LOGOUT BUTTON*/}
              <form action={async () => {
                'use server'
                cookies().delete("Authorization")
                redirect('/doctors/auth/login')
              }}>
                <SidebarMenuItem key="Keluar">
                  <SidebarMenuButton>
                    <LogOut color="#3e9392"></LogOut>
                    <span>Keluar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </form>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
