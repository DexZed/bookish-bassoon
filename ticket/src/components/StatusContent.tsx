
export const StatusContent = [
    {
      title: "In-Progress",
      count: 0,
      date: `Jan 1st,${new Date().getFullYear()} - Dec 1st, ${new Date().getFullYear()}`,
      style: "text-secondary",
      backgroundGradient: "bg-[linear-gradient(125.04deg,#632EE3_5.68%,#9F62F2_88.38%)]",
      icon: (
        <>
          <div className="stat-figure text-purple-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
        </>
      ),
    },
    {
      title: "Resolved",
      count: 0,
      date: `Jan 1st,${new Date().getFullYear()} - Dec 1st, ${new Date().getFullYear()}`,
      style: "text-primary",
      backgroundGradient: "bg-[linear-gradient(90deg,#54CF68_9.6%,#00827A_92.23%)]",
      icon: (
        <>
          <div className="stat-figure text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </>
      ),
    },
  ]