"use client";

import { useRef } from "react";
import {
  FaCamera,
  FaBell,
  FaHome,
  FaSearch,
  FaTimes,
  FaUserCircle,
  FaVideo,
} from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useSearch } from "@/contexts/SearchContext";
import { useWishlist } from "@/contexts/WishlistContext";

type MobileBottomNavProps = {
  onLoginOpen: () => void;
  onProfileOpen: () => void;
};

const MobileBottomNav = ({
  onLoginOpen,
  onProfileOpen,
}: MobileBottomNavProps) => {
  const { isLoggedIn } = useAuth();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { query, setQuery } = useSearch();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileName = file.name;
        setQuery(fileName);
        console.log("Selected image:", file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Show only on small screens (hide on md and up via className on wrappers)

  return (
    <>
      {/* Fixed Top Search Bar */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "auto",
          zIndex: 70,
          borderBottom: "1px solid rgba(244, 114, 182, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "12px 12px 8px 12px",
        }}
      >
        <div style={{ position: "relative" }}>
          <FaSearch
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgb(236, 72, 153)",
              pointerEvents: "none",
            }}
          />
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search handbags by name..."
            style={{
              width: "100%",
              borderRadius: "9999px",
              border: "1px solid rgba(244, 114, 182, 0.3)",
              backgroundColor: "white",
              padding: "10px 48px 10px 48px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
            aria-label="Upload image"
          />
          <button
            type="button"
            onClick={() => {
              if (query.trim()) {
                setQuery("");
                searchInputRef.current?.focus();
              } else {
                handleCameraClick();
              }
            }}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgb(236, 72, 153)",
              fontSize: "18px",
              padding: "4px",
            }}
            aria-label={query.trim() ? "Clear search" : "Camera search"}
          >
            {query.trim() ? <FaTimes /> : <FaCamera />}
          </button>
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "auto",
          zIndex: 70,
          borderTop: "1px solid rgba(244, 114, 182, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "8px 12px",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "8px",
        }}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            padding: "10px",
            backgroundColor: "transparent",
            border: "none",
            color: "rgb(236, 72, 153)",
            cursor: "pointer",
            fontSize: "20px",
          }}
          aria-label="Home"
        >
          <FaHome />
        </button>
        <button
          type="button"
          onClick={() => alert("Video feature coming soon")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            padding: "10px",
            backgroundColor: "transparent",
            border: "none",
            color: "rgb(236, 72, 153)",
            cursor: "pointer",
            fontSize: "20px",
          }}
          aria-label="Video"
        >
          <FaVideo />
        </button>
        <button
          type="button"
          onClick={focusSearch}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            padding: "10px",
            backgroundColor: "transparent",
            border: "none",
            color: "rgb(236, 72, 153)",
            cursor: "pointer",
            fontSize: "20px",
          }}
          aria-label="Search"
        >
          <FaSearch />
        </button>
        <button
          type="button"
          onClick={() => alert("Notifications coming soon")}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            padding: "10px",
            backgroundColor: "transparent",
            border: "none",
            color: "rgb(236, 72, 153)",
            cursor: "pointer",
            fontSize: "20px",
          }}
          aria-label="Notifications"
        >
          <FaBell />
          {itemCount + wishlistCount > 0 && (
            <span
              style={{
                position: "absolute",
                right: "8px",
                top: "4px",
                display: "inline-flex",
                minHeight: "16px",
                minWidth: "16px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "9999px",
                backgroundColor: "rgb(236, 72, 153)",
                paddingLeft: "4px",
                paddingRight: "4px",
                fontSize: "10px",
                fontWeight: "600",
                color: "white",
              }}
            >
              {itemCount + wishlistCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            if (isLoggedIn) {
              onProfileOpen();
            } else {
              onLoginOpen();
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            padding: "10px",
            backgroundColor: "transparent",
            border: "none",
            color: "rgb(236, 72, 153)",
            cursor: "pointer",
            fontSize: "20px",
          }}
          aria-label={isLoggedIn ? "Open profile menu" : "Login"}
        >
          <FaUserCircle />
        </button>
      </div>
    </>
  );
};

export default MobileBottomNav;
