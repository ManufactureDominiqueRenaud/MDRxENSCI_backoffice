import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function UsersProfilesCountSkeleton() {
  return (
    <div className="flex -space-x-2">
      <Skeleton className="w-5 h-5 rounded-full"></Skeleton>
      <Skeleton className="w-5 h-5 rounded-full"></Skeleton>
      <Skeleton className="w-5 h-5 rounded-full"></Skeleton>
    </div>
  );
}

export default UsersProfilesCountSkeleton;
