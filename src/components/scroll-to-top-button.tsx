import { Button } from "@heroui/button";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { WonyIcon } from "./icons";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [hasShownDialogue, setHasShownDialogue] = useState(false);
  const constraintsRef = useRef(null);

  // Show button only when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 100;

      setVisible(shouldShow);

      // Show dialogue when button first appears (only once per page load)
      if (shouldShow && !hasShownDialogue) {
        setShowDialogue(true);
        setHasShownDialogue(true);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShownDialogue]);

  // Hide dialogue after 10 seconds
  useEffect(() => {
    if (showDialogue) {
      const timer = setTimeout(() => {
        setShowDialogue(false);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showDialogue]);

  const scrollToTop = () => {
    // Only scroll if not dragging
    if (!isDragging) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Hide dialogue on interaction
    setShowDialogue(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    // Hide dialogue on interaction
    setShowDialogue(false);
  };

  const handleDragEnd = () => {
    // Small delay to prevent click event from firing immediately after drag
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  return (
    <>
      {/* Invisible container that spans the entire viewport for drag constraints */}
      <motion.div
        ref={constraintsRef}
        className="fixed inset-4 pointer-events-none z-40"
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            drag
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              y: 0,
              x: 0,
            }}
            className="fixed bottom-6 right-6 z-50"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            exit={{
              scale: 0,
              opacity: 0,
              rotate: 180,
              y: 50,
            }}
            initial={{
              scale: 0,
              opacity: 0,
              rotate: -180,
              y: 50,
              x: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6,
            }}
            whileDrag={{ scale: 1.1, zIndex: 100 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            {/* Dialogue Sticker */}
            <AnimatePresence>
              {showDialogue && (
                <motion.div
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute -top-12 -left-28 z-50"
                  exit={{ opacity: 0, scale: 0, y: 10 }}
                  initial={{ opacity: 0, scale: 0, y: 10 }}
                  transition={{ type: "spring", duration: 0.3 }}
                >
                  <div className="relative max-w-[240px]">
                    <p className="text-[#faf4f6] dark:text-[#22171A] bg-[#22171A] dark:bg-[#F2E3E6] font-medium text-xs leading-[1.4] m-0 px-4 py-2 rounded-[18px] relative whitespace-pre-line">
                      DON&lsquo;T DRAG{"\n"}MEEEEEE! 😱
                    </p>
                    {/* iMessage-style tail on the right side */}
                    <div
                      className="absolute right-[-6px] bottom-0 w-[15.515px] h-[17.5px] transform scale-x-[-1]"
                      style={{
                        background: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15.515' height='17.5' viewBox='32.484 17.5 15.515 17.5'%3E%3Cpath fill='%2322171A' d='M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'/%3E%3C/svg%3E") no-repeat right bottom`,
                      }}
                    />
                    {/* Dark mode tail */}
                    <div
                      className="absolute right-[-6px] bottom-0 w-[15.515px] h-[17.5px] dark:block hidden transform scale-x-[-1]"
                      style={{
                        background: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15.515' height='17.5' viewBox='32.484 17.5 15.515 17.5'%3E%3Cpath fill='%23F2E3E6' d='M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'/%3E%3C/svg%3E") no-repeat right bottom`,
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              isIconOnly
              aria-label="Scroll to top"
              className="bg-primary text-white hover:bg-primary-600 transition-all duration-300 cursor-grab active:cursor-grabbing shadow-none"
              radius="full"
              size="lg"
              variant="solid"
              onClick={scrollToTop}
            >
              <WonyIcon className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
