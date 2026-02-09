import React, { useState, useRef } from "react";

const FloatingIDCard = () => {
  const [position, setPosition] = useState({ x: 850, y: 100 }); // Default position
  const [isDragging, setIsDragging] = useState(false);
  const [formData] = useState({
    name: "FRANZ",
    role: "DEVELOPER",
    idNo: "2005-67",
    photoUrl:
      "https://i.pinimg.com/736x/97/93/29/979329dc7dd788331cee69e96a43e9fa.jpg", // Insert your photo URL here (e.g. "https://github.com/znrfrnz.png")
  });

  const cardRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    // Only allow dragging from the card background, not inputs
    if (e.target.tagName === "INPUT") return;

    e.preventDefault();
    const rect = cardRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setIsDragging(true);

    // Add global listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    setPosition({
      x: e.pageX - dragOffset.current.x,
      y: e.pageY - dragOffset.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Styles defined here to be self-contained
  const styles = {
    card: {
      position: "absolute",
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: "400px",
      height: "240px",
      backgroundColor: "#f0f0f0",
      border: "2px solid #000",
      borderRadius: "10px",
      boxShadow: isDragging
        ? "-15px 15px rgba(0,0,0,0.2)"
        : "-10px 10px rgba(0,0,0,0.5)",
      cursor: isDragging ? "grabbing" : "grab",
      zIndex: 1000,
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      transition: "box-shadow 0.1s, transform 0.1s",
      transform: isDragging ? "scale(1.02)" : "scale(1)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    sidebar: {
      width: "40px",
      backgroundColor: "#ff4757",
      borderRight: "2px solid #000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      writingMode: "vertical-rl",
      textOrientation: "mixed",
      color: "#fff",
      fontWeight: "bold",
      letterSpacing: "2px",
      userSelect: "none",
    },
    content: {
      flex: 1,
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      position: "relative",
    },
    hole: {
      position: "absolute",
      top: "15px",
      right: "50%",
      transform: "translateX(50%)",
      width: "50px",
      height: "10px",
      backgroundColor: "#333",
      borderRadius: "5px",
    },
    header: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#666",
      marginBottom: "5px",
      marginTop: "10px",
      textAlign: "right",
      textTransform: "uppercase",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "10px",
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#333",
    },
    input: {
      border: "none",
      borderBottom: "2px solid #000",
      backgroundColor: "transparent",
      fontFamily: "monospace",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#000",
      width: "65%",
      outline: "none",
      cursor: "default",
    },
    barcode: {
      marginTop: "auto",
      height: "20px",
      background:
        "repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 5px)",
      width: "100%",
      opacity: 0.7,
    },
    photo: {
      overflow: "hidden",
      position: "absolute",
      right: "20px",
      top: "45px",
      width: "90px",
      height: "105px",
      border: "2px solid #000",
      backgroundColor: "#ddd",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "50px",
    },
  };

  return (
    <div
      ref={cardRef}
      style={styles.card}
      onMouseDown={handleMouseDown}
      className="floating-id-card"
    >
      <div style={styles.sidebar}>ACCESS</div>
      <div style={styles.content}>
        <div style={styles.hole}></div>
        <div style={styles.header}>Identification</div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            readOnly
            style={{ ...styles.input, color: "#ff4757" }}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>ID NO.</label>
          <input
            type="text"
            name="idNo"
            value={formData.idNo}
            readOnly
            style={styles.input}
          />
        </div>

        <div style={styles.photo}>
          {formData.photoUrl ? (
            <img
              src={formData.photoUrl}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              draggable="false"
            />
          ) : (
            "👻"
          )}
        </div>

        <div style={styles.barcode}></div>
      </div>
    </div>
  );
};

export default FloatingIDCard;
