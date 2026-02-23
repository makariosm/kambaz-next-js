"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const pathParts = pathname.split("/");
  const cid = pathParts[2];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = link.toLowerCase();
        const isActive = pathname.includes(linkPath);
        return (
          <Link
            key={link}
            href={`/courses/${cid}/${link == "People" ? `${linkPath}/table` : linkPath}`}
            id={`wd-course-${linkPath}-link`}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
