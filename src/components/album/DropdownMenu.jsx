import { useEffect } from "react";
import { createPortal } from "react-dom";

export const DropdownMenu = ({
  buttonRef,
  isOpen,
  setIsOpen,
  menuItems = [],
  menuPosition,
  setMenuPosition,
  scrollContainer,
  zIndex = 9999,
}) => {
  // Update menu position based on buttonRef
  const updateMenuPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    updateMenuPosition();
    scrollContainer?.current?.addEventListener("scroll", updateMenuPosition);
    window.addEventListener("resize", updateMenuPosition);
    return () => {
      scrollContainer?.current?.removeEventListener("scroll", updateMenuPosition);
      window.removeEventListener("resize", updateMenuPosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`bg-white border border-gray-300 rounded shadow-lg z-[${zIndex}] w-fit`}
      style={{
        position: "absolute",
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      {menuItems.map((item, idx) => (
        <span
          key={idx}
          className="p-2.5 block text-sm hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            item.onClick();
            setIsOpen(false);
          }}
        >
          {item.label}
        </span>
      ))}
    </div>,
    document.getElementById("dropdown-root")
  );
};