"use client";
import { usePathname } from "next/navigation";

const capitalize = (word: string | undefined): string =>
  word ? word.charAt(0).toUpperCase() + word.slice(1) : "";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  return (
    <span>
      {course ? course.name : "Course"} &gt;{" "}
      {capitalize(
        pathname.split("/").pop() == "table"
          ? "people"
          : pathname.split("/").pop(),
      )}
    </span>
  );
}
