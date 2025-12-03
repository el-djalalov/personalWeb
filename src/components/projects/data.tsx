export const projects = [
  {
    description: "Control system for public transport",
    title: "Tallinja Public Transport Control System",
    src: "/images/projects/tallinja.webp",
    ctaText: "Visit",
    ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
    content: () => {
      return (
        <p>
          This is an application where controllers can have real time data of
          all the buses, bus drivers shifts/efficiency, Routes, Depots, Fire and
          technical Alarms and so on. It provides different roles Super, Admin
          and Controller with relevant privileges. Controllers will leave a
          report form covering all the accomplished work to the next shift
          controller
        </p>
      );
    },
  },
  {
    description: "AgronetZero is a platform for farmers...",
    title: "AgronetZero Bio Sync 365",
    src: "/images/projects/agroNetZeroLanding.webp",
    ctaText: "Visit",
    ctaLink: "https://soilsync.bio",
    content: () => {
      return (
        <p>
          An app for farmers and landowners, where they can create profile, draw
          land on the map, upload their soil test result and get calculated
          feedback with different charts and recommendations. It also provides
          many other helpful insights into soil productivity combining the power
          of AI and other government databases.
        </p>
      );
    },
  },
  {
    description: "The cross-industrial CIMP marketing platform...",
    title: "CIMP marketing platform",
    src: "/images/projects/cimp.webp",
    ctaText: "Visit",
    ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
    content: () => {
      return (
        <p>
          CIMP is designed to run and manage marketing programs of various
          orientations - loyalty programs, camping, bonuses, customer retention
          programs, software and cross-mail programs, and other programs. The
          solution is a dynamically extensible modular architecture in the form
          of a component set, each of which implements a piece of logic of
          separate business processes.
        </p>
      );
    },
  },
  {
    description: "Project planner app is designed for companies who...",
    title: "Project management system",
    src: "/images/projects/planner.webp",
    ctaText: "Visit",
    ctaLink: "https://plasch.silberwal.ch/planner",
    content: () => {
      return (
        <p>
          Project planner app is designed for companies who are seeking to
          integrate into Jira and bring Jira Tickets and tasks right into the
          Planner app where you can efficiently divide tickets to team members.
          By assigning specific tasks and setting ticket status to Pending, In
          progress and Done, you will gain a greater control of your team
          members with exact allocation dates.
        </p>
      );
    },
  },
  {
    description: "Simple video app with full of features...",
    title: "UzVideo",
    src: "/images/projects/uzVideo.webp",
    ctaText: "Visit",
    ctaLink: "https://uz-video.vercel.app/?genre=fetchTrending",
    content: () => {
      return (
        <p>
          UzVideo is a simple video app with full of features like search,
          trending, subscriptions, liked videos, watch later and history. It
          also has a dark mode and light mode. The app is built with React,
          Redux, Tailwind CSS and uses the IMD Data API v3 to fetch videos. The
          app is responsive and works on all devices. It also has a beautiful UI
          with animations and transitions. The app is deployed on Vercel and is
          open source on GitHub.
        </p>
      );
    },
  },
];
