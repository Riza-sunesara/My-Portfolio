import { motion } from "framer-motion";

const RotateBorder = ({ children }) => {
  return (
    <div className="relative p-4 rounded-lg border border-transparent">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          rx="8"
          ry="8"
          className="stroke-cyan-400 stroke-opacity-30 fill-transparent"
          strokeWidth="3"
          width="100%"
          height="100%"
          strokeLinejoin="inherit"
          initial={{ strokeDasharray: 260, strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: [0, 1000] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
};

export default RotateBorder;