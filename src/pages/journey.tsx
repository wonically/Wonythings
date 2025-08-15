import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

const timelineData = [
  {
    year: "2025",
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    description:
      "Leading a team of developers in creating cutting-edge web applications using React, Node.js, and cloud technologies.",
    achievements: ["Team Leadership", "Architecture Design", "Mentoring"],
    color: "primary" as const,
    type: "work" as const,
  },
  {
    year: "2024",
    title: "Full-Stack Developer",
    company: "Digital Solutions Co.",
    description:
      "Developed and maintained multiple client projects, focusing on modern web technologies and user experience.",
    achievements: [
      "React Expert",
      "API Development",
      "Performance Optimization",
    ],
    color: "secondary" as const,
    type: "work" as const,
  },
  {
    year: "2023",
    title: "Frontend Developer",
    company: "Creative Agency",
    description:
      "Specialized in creating beautiful, responsive user interfaces and interactive web experiences.",
    achievements: ["UI/UX Design", "Responsive Design", "JavaScript Mastery"],
    color: "success" as const,
    type: "work" as const,
  },
  {
    year: "2022",
    title: "Computer Science Degree",
    company: "University of Technology",
    description:
      "Graduated with honors, focusing on software engineering, algorithms, and web development.",
    achievements: ["Magna Cum Laude", "Dean's List", "Research Project"],
    color: "warning" as const,
    type: "education" as const,
  },
  {
    year: "2021",
    title: "Junior Developer Internship",
    company: "StartUp Labs",
    description:
      "First professional experience, learning industry best practices and contributing to real-world projects.",
    achievements: ["Git Workflow", "Code Reviews", "Agile Methodology"],
    color: "danger" as const,
    type: "work" as const,
  },
  {
    year: "2020",
    title: "Started Coding Journey",
    company: "Self-Taught",
    description:
      "Began learning programming through online courses, tutorials, and personal projects.",
    achievements: ["HTML/CSS", "JavaScript Basics", "First Project"],
    color: "default" as const,
    type: "milestone" as const,
  },
];

export default function JourneyPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-16">
        {/* Header */}
        <div className="text-center max-w-4xl">
          <h1 className={title({ size: "lg" })}>My Journey</h1>
          <p className="text-lg text-default-600 mt-4">
            A timeline of my professional growth, learning experiences, and key
            milestones in my development career.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl w-full">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-success" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div key={index} className="relative flex items-start gap-8">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-full border-4 border-white dark:border-gray-900 shadow-lg flex items-center justify-center bg-${item.color} bg-opacity-20`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full bg-${item.color}`}
                      />
                    </div>
                  </div>

                  {/* Content Card */}
                  <Card className="flex-1 hover:scale-[1.02] transition-transform duration-300">
                    <CardHeader className="flex flex-col items-start gap-2 pb-4">
                      <div className="flex items-center gap-3 w-full">
                        <Chip color={item.color} size="lg" variant="flat">
                          {item.year}
                        </Chip>
                        <Chip
                          color={
                            item.type === "work"
                              ? "primary"
                              : item.type === "education"
                                ? "warning"
                                : "success"
                          }
                          size="sm"
                          variant="dot"
                        >
                          {item.type === "work"
                            ? "💼 Work"
                            : item.type === "education"
                              ? "🎓 Education"
                              : "🌟 Milestone"}
                        </Chip>
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-default-600 font-medium">
                        {item.company}
                      </p>
                    </CardHeader>

                    <Divider />

                    <CardBody className="pt-4">
                      <p className="text-default-700 mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.achievements.map(
                          (achievement, achievementIndex) => (
                            <Chip
                              key={achievementIndex}
                              color={item.color}
                              size="sm"
                              variant="bordered"
                            >
                              {achievement}
                            </Chip>
                          ),
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 max-w-4xl w-full">
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-success/10 border-none">
            <CardBody>
              <h2 className={title({ size: "md" })}>Journey Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-default-600">Years Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    3
                  </div>
                  <div className="text-sm text-default-600">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">
                    50+
                  </div>
                  <div className="text-sm text-default-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">∞</div>
                  <div className="text-sm text-default-600">Growth</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
