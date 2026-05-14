"use client";

import Link from "next/link";
import {
  FaArrowLeft,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserCircle,
  FaBox,
  FaClock,
  FaTruck,
  FaStar,
  FaWallet,
  FaTicketAlt,
  FaCog,
} from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

type MobileProfileMenuProps = {
  open: boolean;
  onClose: () => void;
  onCartOpen: () => void;
};

const MobileProfileMenu = ({
  open,
  onClose,
  onCartOpen,
}: MobileProfileMenuProps) => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!open || !isLoggedIn) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 65,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      {/* Scrollable Content Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "white",
          paddingBottom: "100px",
        }}
      >
        {/* Header with Close Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            borderBottom: "1px solid rgba(244, 114, 182, 0.2)",
            backgroundColor: "white",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
            Account
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              display: "inline-flex",
              height: "40px",
              width: "40px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "rgb(51, 65, 85)",
              fontSize: "18px",
            }}
            aria-label="Close menu"
          >
            <FaArrowLeft />
          </button>
        </div>

        {/* Profile Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderRadius: "16px",
            backgroundColor: "rgba(244, 114, 182, 0.1)",
            padding: "16px",
            margin: "16px",
          }}
        >
          <FaUserCircle
            style={{ fontSize: "40px", color: "rgb(236, 72, 153)" }}
          />
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.02em",
                color: "rgb(236, 72, 153)",
                margin: "0 0 4px 0",
                textTransform: "uppercase",
              }}
            >
              Account
            </p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
                margin: 0,
                color: "rgb(15, 23, 42)",
              }}
            >
              Signed in
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: "16px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.02em",
              color: "rgb(236, 72, 153)",
              margin: "0 0 12px 0",
              textTransform: "uppercase",
            }}
          >
            Quick Actions
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            <Link
              href="/profile"
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "16px",
                padding: "12px",
                backgroundColor: "transparent",
                textDecoration: "none",
                color: "rgb(51, 65, 85)",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid rgba(244, 114, 182, 0.2)",
                cursor: "pointer",
              }}
            >
              <FaUserCircle style={{ color: "rgb(236, 72, 153)" }} />
              Profile
            </Link>
            <button
              type="button"
              onClick={() => {
                onClose();
                onCartOpen();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "16px",
                padding: "12px",
                backgroundColor: "transparent",
                border: "1px solid rgba(244, 114, 182, 0.2)",
                cursor: "pointer",
                color: "rgb(51, 65, 85)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              <FaShoppingCart style={{ color: "rgb(236, 72, 153)" }} />
              Cart
            </button>
            <Link
              href="/wishlist"
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "16px",
                padding: "12px",
                backgroundColor: "transparent",
                textDecoration: "none",
                color: "rgb(51, 65, 85)",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid rgba(244, 114, 182, 0.2)",
                cursor: "pointer",
              }}
            >
              <FaHeart style={{ color: "rgb(236, 72, 153)" }} />
              Wishlist
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "16px",
                padding: "12px",
                backgroundColor: "transparent",
                border: "1px solid rgba(244, 114, 182, 0.2)",
                cursor: "pointer",
                color: "rgb(51, 65, 85)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              <FaSignOutAlt style={{ color: "rgb(236, 72, 153)" }} />
              Logout
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div style={{ padding: "16px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              margin: "0 0 12px 0",
              color: "rgb(15, 23, 42)",
            }}
          >
            My Orders
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              textAlign: "center",
            }}
          >
            {[
              { icon: FaBox, label: "Pending" },
              { icon: FaClock, label: "Processing" },
              { icon: FaTruck, label: "Shipped" },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}
                >
                  <item.icon
                    style={{
                      fontSize: "24px",
                      color: "rgb(236, 72, 153)",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgb(51, 65, 85)",
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div style={{ padding: "16px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              margin: "0 0 12px 0",
              color: "rgb(15, 23, 42)",
            }}
          >
            Services
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            {[
              { icon: FaWallet, label: "Wallet" },
              { icon: FaTicketAlt, label: "Coupons" },
              { icon: FaStar, label: "Reviews" },
              { icon: FaCog, label: "Settings" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderRadius: "12px",
                  padding: "12px",
                  backgroundColor: "rgba(244, 114, 182, 0.05)",
                  border: "none",
                  cursor: "pointer",
                  color: "rgb(51, 65, 85)",
                  fontSize: "14px",
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                <item.icon
                  style={{ fontSize: "18px", color: "rgb(236, 72, 153)" }}
                />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Space */}
        <div style={{ height: "40px" }} />
      </div>
    </div>
  );
};

export default MobileProfileMenu;
