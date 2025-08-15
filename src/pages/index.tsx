import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { Card, CardBody } from "@heroui/card";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import { AnimatedChihuahuaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-16">
        {/* Big Chihuahua Logo */}
        <div className="flex justify-center mb-8">
          <AnimatedChihuahuaLogo size={200} />
        </div>

        {/* Main Content */}
        <div className="inline-block max-w-4xl text-center justify-center">
          <span className={title({ size: "lg" })}>Welcome to&nbsp;</span>
          <span className={title({ color: "violet", size: "lg" })}>
            Wonythings&nbsp;
          </span>
          <br />
          <span className={title({ size: "md" })}>
            A colorful collection of the very wonical things
          </span>
          <div className={subtitle({ class: "mt-6" })}>
            Explore my journey, projects, thoughts, and everything that makes
            life wonderfully wonical! This is where creativity meets technology,
            and where ideas come to life.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
            href="/about-me"
          >
            Get to Know Me
          </Link>
          <Link
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "lg",
            })}
            href="/projects"
          >
            View My Projects
          </Link>
          <Link
            className={buttonStyles({
              variant: "ghost",
              radius: "full",
              size: "lg",
            })}
            href="/journey"
          >
            My Journey
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-12">
          <Card className="p-4 hover:scale-105 transition-transform duration-300">
            <CardBody className="text-center">
              <h3 className="text-xl font-bold mb-3 text-primary">
                ✨ Creative Projects
              </h3>
              <p className="text-default-600">
                Discover my latest creative endeavors, from coding experiments
                to design explorations.
              </p>
            </CardBody>
          </Card>

          <Card className="p-4 hover:scale-105 transition-transform duration-300">
            <CardBody className="text-center">
              <h3 className="text-xl font-bold mb-3 text-secondary">
                📝 Thoughtful Blogs
              </h3>
              <p className="text-default-600">
                Read my insights on technology, life, and everything in between.
              </p>
            </CardBody>
          </Card>

          <Card className="p-4 hover:scale-105 transition-transform duration-300">
            <CardBody className="text-center">
              <h3 className="text-xl font-bold mb-3 text-success">
                🚀 My Journey
              </h3>
              <p className="text-default-600">
                Follow my path through learning, growing, and creating amazing
                things.
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Fun Quote */}
        <div className="mt-16 max-w-2xl">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
            <CardBody className="text-center p-8">
              <p className="text-lg italic mb-4">
                &quot;Life is too short for boring websites and ordinary
                experiences.&quot;
              </p>
              <p className="text-sm text-default-500">
                - The Wonical Philosophy
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Getting Started */}
        <div className="mt-12">
          <Snippet
            hideCopyButton
            hideSymbol
            className="bg-primary/5"
            variant="bordered"
          >
            <span>
              Ready to explore? Start with <Code color="primary">About Me</Code>{" "}
              or dive into my <Code color="secondary">Projects</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
