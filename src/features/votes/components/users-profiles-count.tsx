import { LucideUser } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@prisma/client";

function UsersProfilesCount({ users }: { users: User[] }) {
  return (
    <div className="flex -space-x-2">
      {users.length < 4 ? (
        users.map((user) => {
          return (
            <div key={user.id}>
              <UserProfileCircle avatarUrl={user.avatarUrl} name={user.name} />
            </div>
          );
        })
      ) : (
        <>
          <UserProfileCircle
            avatarUrl={users[0].avatarUrl}
            name={users[0].name}
          />
          <UserProfileCircle
            avatarUrl={users[1].avatarUrl}
            name={users[1].name}
          />
          <UserProfileCircle
            avatarUrl={users[2].avatarUrl}
            name={users[2].name}
          />
          <span className="flex items-center justify-center w-5 h-5 bg-foreground text-background text-xs rounded-full border border-background">
            {`+${users.length - 2}`}
          </span>
        </>
      )}
    </div>
  );
}

const UserProfileCircle = ({
  avatarUrl,
  name,
}: {
  avatarUrl?: string;
  name: string;
}) => {
  return (
    <span className="flex items-center justify-center w-5 h-5 bg-foreground text-background rounded-full border border-background">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Avatar className="w-full h-full object-cover">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                {name.charAt(0).toUpperCase() || (
                  <LucideUser className="size-[1.05rem] mt-1" />
                )}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};

export default UsersProfilesCount;
