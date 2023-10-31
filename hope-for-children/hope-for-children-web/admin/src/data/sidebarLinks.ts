import {
  FolderIcon,
  UsersIcon,
  PhotoIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

let navigation = [
  { name: "Projects", href: "/", icon: FolderIcon, current: true },
  { name: "Gallery", href: "/galleries", icon: PhotoIcon, current: false },
  { name: "Alumni", href: "/alumnis", icon: UsersIcon, current: false },
  {
    name: "Staffs",
    current: false,
    icon: UserGroupIcon,
    href: "/staff",
    children: [
      { name: "Board Members", href: "/staff/BoardMember", current: false },
      { name: "Management", href: "/staff/ManagementMember", current: false },
      { name: "Staff Members", href: "/staff/StaffMember", current: false },
      { name: "Former Members", href: "/staff/FormerMember", current: false },
    ],
  },
];

export default navigation;
