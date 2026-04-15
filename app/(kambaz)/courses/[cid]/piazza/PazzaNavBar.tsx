"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PazzaNavBar({
  courseName,
  currentUser,
  activeTab,
  onTabChange,
  isFaculty,
}: {
  courseName: string;
  currentUser: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isFaculty: boolean;
}) {
  const userName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "Guest";

  return (
    <div
      style={{
        backgroundColor: "#3e7cb1",
        color: "white",
        padding: "8px 16px",
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span
            style={{
              fontStyle: "italic",
              fontWeight: "bold",
              fontSize: "1.3rem",
              marginRight: "30px",
            }}
          >
            pazza
          </span>
          <span style={{ fontWeight: "bold", marginRight: "30px" }}>
            {courseName}
          </span>
          <Nav>
            <NavItem>
              <NavLink
                onClick={() => onTabChange("qa")}
                style={{
                  color: "white",
                  fontWeight: activeTab === "qa" ? "bold" : "normal",
                  textDecoration: activeTab === "qa" ? "underline" : "none",
                  cursor: "pointer",
                }}
              >
                Q & A
              </NavLink>
            </NavItem>
            {isFaculty && (
              <NavItem>
                <NavLink
                  onClick={() => onTabChange("manageClass")}
                  style={{
                    color: "white",
                    fontWeight:
                      activeTab === "manageClass" ? "bold" : "normal",
                    textDecoration:
                      activeTab === "manageClass" ? "underline" : "none",
                    cursor: "pointer",
                  }}
                >
                  Manage Class
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </div>
        <div className="d-flex align-items-center">
          <FaUserCircle className="me-2" />
          <span>{userName}</span>
        </div>
      </div>
    </div>
  );
}
