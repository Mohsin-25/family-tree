import { Spinner, Theme } from "@radix-ui/themes";
import { useParams } from "@tanstack/react-router";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { getUserTrees } from "../../dashboard/services/service";
import { useGetInviteData } from "../services/service";
import AcceptInvitation from "./AcceptInvitation";
import ExistingMemberOfTree from "./ExistingMemberOfTree";

const Invitation = () => {
  const { id } = useParams({ from: "/inviteToken/$id" });
  const { data, isLoading } = useGetInviteData({ id: id });
  const { trees, isLoading: isUserTreesLoading } = getUserTrees();

  const isAlreadyMemberOfTree = trees
    ?.map((itm: any) => itm?.treeId)
    ?.includes(data?.tree?.id);

  return (
    <Dialog open={true}>
      <DialogContent
        className={`bg-background p-0 border-none h-[98vh] flex justify-center`}
      >
        <Theme>
          {isLoading || isUserTreesLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner loading className="text-black" />
            </div>
          ) : isAlreadyMemberOfTree ? (
            <ExistingMemberOfTree data={data} />
          ) : (
            <AcceptInvitation data={data} />
          )}
        </Theme>
      </DialogContent>
    </Dialog>
  );
};

export default Invitation;
