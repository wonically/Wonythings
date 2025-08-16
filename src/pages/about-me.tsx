import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useRef, useEffect, useState } from "react";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "Framer Motion",
  "Tailwind CSS",
  "Hero UI",
  "JavaScript",
  "CSS",
  "HTML",
  "Git",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const scrollFadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scrollSlideInLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scrollSlideInRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function AboutMePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Sticker logic: pin to corners, randomize only rotation
  const stickerImages = [
    "/sticker 1.png",
    "/sticker 2.png",
    "/sticker 3.png",
    "/sticker 4.png",
  ];
  const STICKER_SIZE = 150; // px, 3x bigger
  // Configure rotation ranges for each sticker: [min, max] degrees
  const stickerRotationRanges = [
    [-30, 10], // top left
    [-10, 30], // top right
    [-30, 10], // bottom left
    [-10, 30], // bottom right
  ];

  // Each sticker: { top, left, rotate }
  const [positions, setPositions] = useState([
    { top: 64, left: 64, rotate: 0 }, // top left
    { top: 64, left: 0, rotate: 0 }, // top right (left set in effect)
    { top: 0, left: 64, rotate: 0 }, // bottom left (top set in effect)
    { top: 0, left: 0, rotate: 0 }, // bottom right (top/left set in effect)
  ]);

  useEffect(() => {
    function randomRotationForSticker(idx: number) {
      const [min, max] = stickerRotationRanges[idx] || [-75, 75];

      return Math.random() * (max - min) + min;
    }
    function randomOffset() {
      return Math.random() * 10 - 5; // -5px to +5px
    }
    function getCornerPositions() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const size = STICKER_SIZE;
      const margin = 64;

      return [
        {
          top: margin + randomOffset(),
          left: margin + randomOffset(),
          rotate: randomRotationForSticker(0),
        }, // top left
        {
          top: margin + randomOffset(),
          left: vw - size - margin + randomOffset(),
          rotate: randomRotationForSticker(1),
        }, // top right
        {
          top: vh - size - margin + randomOffset(),
          left: margin + randomOffset(),
          rotate: randomRotationForSticker(2),
        }, // bottom left
        {
          top: vh - size - margin + randomOffset(),
          left: vw - size - margin + randomOffset(),
          rotate: randomRotationForSticker(3),
        }, // bottom right
      ];
    }
    function updatePositions() {
      setPositions(getCornerPositions());
    }
    updatePositions();
    const interval = setInterval(updatePositions, 1200);

    window.addEventListener("resize", updatePositions);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  return (
    <DefaultLayout>
      {/* Teleporting Stickers */}
      {stickerImages.map((src, i) => (
        <img
          key={src}
          alt={`Sticker ${i + 1}`}
          src={src}
          style={{
            position: "fixed",
            zIndex: 100,
            width: `${STICKER_SIZE}px`,
            height: `${STICKER_SIZE}px`,
            objectFit: "contain",
            pointerEvents: "none",
            top: positions[i]?.top ?? 0,
            left: positions[i]?.left ?? 0,
            transform: `rotate(${positions[i]?.rotate ?? 0}deg)`,
          }}
        />
      ))}
      <motion.div
        ref={containerRef}
        animate="visible"
        className="max-w-6xl mx-auto px-4 py-8 md:py-12"
        initial="hidden"
        variants={containerVariants}
      >
        {/* Hero Section with parallax effect */}
        <motion.section
          className="text-center mb-16"
          style={{ y, opacity }}
          variants={itemVariants}
        >
          <h1 className={title({ size: "lg" })}>
            Hi, I&apos;m{" "}
            <motion.span
              animate={{ opacity: 1, x: 0 }}
              className="text-primary"
              initial={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Wony
            </motion.span>
          </h1>
          <motion.p
            animate={{ opacity: 1 }}
            className={subtitle({ class: "mt-4 max-w-2xl mx-auto" })}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            A passionate full-stack developer who loves creating beautiful,
            functional, and user-friendly web experiences with modern
            technologies.
          </motion.p>
        </motion.section>

        {/* Main Content Grid with scroll animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About Card - slides in from left */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            variants={scrollSlideInLeftVariants}
            viewport={{ once: true, amount: 0.3 }}
            whileInView="visible"
          >
            <Card className="h-full shadow">
              <CardHeader className="pb-4">
                <h2 className={title({ size: "sm" })}>About Me</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <motion.p
                  animate={{ opacity: 1, x: 0 }}
                  className="text-default-600 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  Welcome to my digital space! I&apos;m a dedicated developer
                  with a passion for crafting exceptional web experiences. My
                  journey in technology started with curiosity and has grown
                  into a love for problem-solving and creative coding.
                </motion.p>
                <motion.p
                  animate={{ opacity: 1, x: 0 }}
                  className="text-default-600 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  I specialize in modern web technologies and enjoy working on
                  both frontend and backend development. When I&apos;m not
                  coding, you can find me exploring new technologies,
                  contributing to open source projects, or learning about the
                  latest trends in web development.
                </motion.p>
                <motion.p
                  animate={{ opacity: 1, x: 0 }}
                  className="text-default-600 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  I believe in writing clean, maintainable code and creating
                  user experiences that are not only functional but also
                  delightful. Let&apos;s build something amazing together!
                </motion.p>
              </CardBody>
            </Card>
          </motion.div>

          {/* Profile Card - slides in from right */}
          <motion.div
            initial="hidden"
            variants={scrollSlideInRightVariants}
            viewport={{ once: true, amount: 0.3 }}
            whileInView="visible"
          >
            <Card className="h-full shadow">
              <CardBody className="text-center space-y-6">
                <motion.div
                  animate={{ scale: 1 }}
                  initial={{ scale: 0 }}
                  transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                >
                  <Avatar
                    alt="Wony"
                    className="w-24 h-24 mx-auto mb-4"
                    src="/wony-chihuahua-logo.svg"
                  />
                </motion.div>

                <div>
                  <h3 className={title({ size: "sm" })}>Wony</h3>
                  <p className="text-default-500 mt-2">Full-Stack Developer</p>
                  <p className="text-default-500">Based in Your Location</p>
                </div>

                <Divider />

                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="w-full"
                      startContent={<GitHubIcon size={20} />}
                      variant="flat"
                    >
                      GitHub
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="w-full"
                      startContent={<LinkedInIcon size={20} />}
                      variant="flat"
                    >
                      LinkedIn
                    </Button>
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Skills Section - fades in from bottom */}
        <motion.section
          className="mt-16"
          initial="hidden"
          variants={scrollFadeInVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          <Card className="shadow">
            <CardHeader>
              <h2 className={title({ size: "sm" })}>Skills & Technologies</h2>
            </CardHeader>
            <CardBody>
              <motion.div
                animate="visible"
                className="flex flex-wrap gap-3"
                initial="hidden"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 1.5,
                    },
                  },
                }}
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={skillVariants}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      className="cursor-pointer"
                      color="primary"
                      variant="flat"
                    >
                      {skill}
                    </Chip>
                  </motion.div>
                ))}
              </motion.div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Call to Action - fades in with scale */}
        <motion.section
          className="text-center mt-16"
          initial="hidden"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          <Card className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 shadow">
            <CardBody className="py-12">
              <h2 className={title({ size: "sm", class: "mb-4" })}>
                Let&lsquo;s Work Together!
              </h2>
              <p className="text-default-600 mb-8 max-w-md mx-auto">
                Have a project in mind? I&lsquo;d love to hear about it and see
                how we can bring your ideas to life.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="font-semibold" color="primary" size="lg">
                  Get In Touch
                </Button>
              </motion.div>
            </CardBody>
          </Card>
        </motion.section>
      </motion.div>
    </DefaultLayout>
  );
}
