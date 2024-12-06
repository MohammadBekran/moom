const SIDEBAR_ITEMS = [
  {
    path: "/",
    label: "Home",
    imageUrl: "/icons/Home.svg",
  },
  {
    path: "/upcoming",
    label: "Upcoming",
    imageUrl: "/icons/upcoming.svg",
  },
  {
    path: "/previous",
    label: "Previous",
    imageUrl: "/icons/previous.svg",
  },
  {
    path: "/recordings",
    label: "Recordings",
    imageUrl: "/icons/video.svg",
  },
  {
    path: "/personal-room",
    label: "Personal Room",
    imageUrl: "/icons/add-personal.svg",
  },
] as const;

const USER_AVATAR_IMAGES = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
] as const;

export { SIDEBAR_ITEMS, USER_AVATAR_IMAGES };
