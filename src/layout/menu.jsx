export const menuItems = [
  {
    name: "DashBoard",
    path: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
        className="inline-block size-4 my-1.5"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      </svg>
    ),
  },
  {
    name: "Border",
    path: "/border",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block size-4 my-1.5"
      >
        <circle cx="8" cy="7" r="3" />
        <path d="M2 21a6 6 0 0 1 12 0" />
        <path d="M16 11h6M19 8v6" />
      </svg>
    ),
  },

  {
    name: "Bazar",
    path: "/bazar",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block size-4 my-1.5"
      >
        <path d="M5 6h14l1 7H4l1-7z" />
        <path d="M2 6h20" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="15" cy="20" r="1" />
      </svg>
    ),
  },

  {
    name: "Meal",
    path: "/meal",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block size-4 my-1.5"
      >
        <path d="M4 3v18" />
        <path d="M10 3v18" />
        <path d="M16 3v7a3 3 0 0 0 6 0V3" />
      </svg>
    ),
  },

  {
    name: "Deposit",
    path: "/deposit",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block size-4 my-1.5"
      >
        <path d="M12 1v22" />
        <path d="M5 9h14" />
        <path d="M8 5h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z" />
      </svg>
    ),
  },

  // {
  //   name: "Report",
  //   path: "/report",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 24 24"
  //       strokeWidth="2"
  //       stroke="currentColor"
  //       fill="none"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       className="inline-block size-4 my-1.5"
  //     >
  //       <path d="M3 3h18v18H3z" />
  //       <path d="M7 14l3-3 2 2 4-4" />
  //     </svg>
  //   ),
  // },
  {
    name: "Report",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block size-4 my-1.5"
      >
        <path d="M3 3h18v18H3z" />
        <path d="M7 14l3-3 2 2 4-4" />
      </svg>
    ),
    children: [
      {
        name: "Border Report",
        path: "/report/border",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block w-5 h-5 my-1.5"
          >
            {/* Document outline */}
            <path d="M4 3h16v18H4z" />
            {/* Checkmark */}
            <path d="M7 14l3-3 2 2 4-4" />
            {/* Text lines */}
            <line x1="7" y1="7" x2="17" y2="7" />
            <line x1="7" y1="10" x2="17" y2="10" />
          </svg>
        ),
      },
      {
        name: "Payment Report",
        path: "/report/payment",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block w-5 h-5 my-1.5"
          >
            {/* Plate */}
            <circle cx="12" cy="12" r="8" />
            {/* Fork */}
            <line x1="10" y1="8" x2="10" y2="16" />
            <line x1="9" y1="8" x2="11" y2="8" />
            <line x1="9" y1="16" x2="11" y2="16" />
            {/* Knife */}
            <line x1="14" y1="8" x2="14" y2="16" />
            <line x1="13" y1="8" x2="15" y2="8" />
          </svg>
        ),
      },
    ],
  },
];
