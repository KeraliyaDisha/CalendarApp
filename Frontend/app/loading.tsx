import React from "react";

interface LoaderProps {
  color?: string;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function Loader({ color = "#4a5568" }: LoaderProps) {
  const loaderStyle: React.CSSProperties = {
    border: "8px solid #f3f3f3",
    borderTop: `8px solid ${color}`,
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={containerStyle}>
      <div style={loaderStyle} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
