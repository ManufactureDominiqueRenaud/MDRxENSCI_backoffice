import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/actions";
import prisma from "@/lib/prisma";
import { fetchStrapiData } from "@/lib/strapi-api";
import { StrapiProjectsListData } from "@/types";
import { LucideExternalLink } from "lucide-react";
import { Metadata } from "next";
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

  // Refetch des votes directement depuis la base de données
  const votes = await prisma.project.findMany();

  // Ajouter un tri des projets par score décroissant
  const sortedProjects = projectsData.data.sort((a, b) => {
    const votesA = votes.find((vote) => vote.slug === a.attributes.slug)?.votes || 0;
    const votesB = votes.find((vote) => vote.slug === b.attributes.slug)?.votes || 0;
    return votesB - votesA; // Tri décroissant
  });

  // Calculer les scores et les positions
  const projectScores = sortedProjects.map((project) => ({
    ...project,
    score: votes.find((vote) => vote.slug === project.attributes.slug)?.votes || 0,
  }));

  // Attribuer les couleurs en fonction des positions avec égalités
  const getColorByRank = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-green-500"; // Premier projet
      case 2:
        return "bg-orange-500"; // Deuxième projet
      case 3:
        return "bg-red-500"; // Troisième projet
      default:
        return "bg-slate-900"; // Couleur par défaut (gris)
    }
  };

  // Identifier les rangs distincts et attribuer les couleurs
  const rankedProjects = projectScores.map((project, index, array) => {
    const rank =
      array.findIndex(
        (p) => p.score === project.score
      ) + 1; // Trouver le rang basé sur le score
    return {
      ...project,
      rank,
    };
  });

  const distinctRanks = [...new Set(rankedProjects.map((p) => p.rank))];
  const rankToColorMap = new Map<number, string>();

  distinctRanks.forEach((rank, index) => {
    rankToColorMap.set(rank, getColorByRank(index + 1));
  });

  const finalRankedProjects = rankedProjects.map((project) => ({
    ...project,
    color: rankToColorMap.get(project.rank) || "bg-slate-900",
  }));

  return (
    <main className="p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {finalRankedProjects.map((project) => (
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
              <p className="text-xs">id: {project.attributes.slug}</p>
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
              <p
                className={`font-bold text-lg inline-block ${project.color} rounded-sm text-slate-50 px-4 py-1 mt-2`}
              >
                Score : {project.score}
              </p>
              <Button
                variant="outline"
                size={"sm"}
                className="mt-4 gap-2"
                asChild
              >
                <Link
                  href={`${process.env.NEXT_PUBLIC_WEBSITE_FRONT_URL}/fr/${project.attributes.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs"
                >
                  <LucideExternalLink size={8} />
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