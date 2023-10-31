interface Item {
  icon: string;
  title: string;
  staffType: string;
}

export interface SidebarType {
  icon: string;
  title: string;
  items: Item[];
}

export const staffItems: SidebarType = {
  icon: "/assets/icons/staffMembers.png",
  title: "Staff Members",
  items: [
    {
      icon: "/assets/icons/board.png",
      title: "Board Members",
      staffType: "BoardMember",
    },
    {
      icon: "/assets/icons/management.png",
      title: "Management",
      staffType: "ManagementMember",
    },
    {
      icon: "/assets/icons/Staff.png",
      title: "Our Staff",
      staffType: "StaffMember",
    },
    {
      icon: "/assets/icons/former.png",
      title: "Former Staff",
      staffType: "FormerMember",
    },
  ],
};

export const sidebarProjects = {
  icon: "/assets/icons/projects.png",
  title: "Our Projects",
  items: [
    {
      icon: "/assets/icons/grouphome.png",
      title: "Group home sector",
    },
    {
      icon: "/assets/icons/youth.png",
      title: "Youth enrichment center",
    },
    {
      icon: "/assets/icons/skill.png",
      title: "Like skill training",
    },
    {
      icon: "/assets/icons/social.png",
      title: "Social accountable program",
    },
    {
      icon: "/assets/icons/capacity.png",
      title: "Capacity building",
    },
  ],
};

export const sidebarPrograms = {
  icon: "/assets/icons/Program.png",
  title: "Our Programs",
  items: [
    {
      icon: "/assets/icons/health.png",
      title: "Health",
      href: "#health",
    },
    {
      icon: "/assets/icons/education.png",
      title: "Education",
      href: "#education",
    },
    {
      icon: "/assets/icons/strategies.png",
      title: "Strategies",
      href: "#strategies",
    },
    {
      icon: "/assets/icons/Psycho.png",
      title: "Psychological care and support",
      href: "#psychosocial",
    },
    {
      icon: "/assets/icons/livelihood.png",
      title: "Livelihood",
      href: "#livelihood",
    },
  ],
};
