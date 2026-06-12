"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CourseCard } from "@/components/courses/CourseCard";
import { useLanguage } from "@/lib/language-context";
import { getCourses } from "@/lib/data";

export function CatalogPreview() {
  const { t, dir } = useLanguage();
  const featured = getCourses().slice(0, 6);
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section className="border-y border-line/10 bg-surface/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center sm:text-start">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            {t("landing.catalogTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("landing.catalogSubtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>

        {/* Only the featured tracks are shown above — make "all of them" unmissable */}
        <div className="mt-12 text-center">
          <Button href="/courses" variant="outline" size="lg">
            {t("landing.viewAllCourses")} <Arrow className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
