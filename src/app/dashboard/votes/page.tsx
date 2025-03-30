import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/actions";
import prisma from "@/lib/prisma";
import { fetchStrapiData } from "@/lib/strapi-api";
import { StrapiProjectsListData } from "@/types";
import { Project } from "@prisma/client";
import { LucideExternalLink } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GoDigital - Dashboard Administrateur",
  description: "",
};

export default async function Page() {
  const user = await getCurrent();
  const projectsData: {
    data: StrapiProjectsListData;
  } = await fetchStrapiData(`api/projets?populate=*`, [`projects-fr`]);
  const votes: Project[] = await prisma.project.findMany();

  return (
    <main className="p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.data.map((project) => (
          <div
            key={project.id}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-md"
          >
            <div className="overflow-hidden w-1/2 h-[200px] rounded-md">
              <img
                src={project.attributes.thumbnail.data.attributes.url}
                alt={
                  project.attributes.thumbnail.data.attributes
                    .alternativeText || ""
                }
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {project.attributes.projectTitle}
              </h2>
              <ul className="mt-2">
                {project.attributes.studentList.map((student) => (
                  <li
                    className="text-xs bg-foreground/10 text-foreground inline-block px-2 py-0.5 rounded-full"
                    key={student.id}
                  >
                    {student.name}
                  </li>
                ))}
              </ul>
              <p>
                Number of votes :{" "}
                {
                  //Find the number of votes for the current project
                  votes.find((vote) => vote.projectId === project.id)?.votes ||
                    0
                }
              </p>
              <Button variant="default" className="mt-4 gap-2" asChild>
                <Link
                  href={`${process.env.NEXT_PUBLIC_WEBSITE_FRONT_URL}/fr/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LucideExternalLink className="mr-2" size={16} />
                  Go to the project page
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
