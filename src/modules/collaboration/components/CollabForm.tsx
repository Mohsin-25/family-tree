import { FormProvider, useForm } from "react-hook-form";
import { Card } from "../../../components/ui/card";
import { Copy, EllipsisVertical, Link } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Spinner, Table } from "@radix-ui/themes";
import { useGenerateInviteToken, useGetTreeMembers } from "../services/service";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";

const CollabForm = ({ setPopup, popup }: { setPopup: any; popup: any }) => {
  const methods = useForm();
  const { id } = useParams({ from: "/myTree/$id" });

  const {
    mutate: generateInviteTokenMutate,
    data: generateInviteTokenData,
    isPending: isGenerateInviteTokenPending,
  } = useGenerateInviteToken();

  const { members, isLoading: isTreeMembersLoading } = useGetTreeMembers({
    id,
  });

  console.log({ setPopup, popup, members });

  const token = generateInviteTokenData?.data?.inviteToken;
  const url = location.origin + "/inviteToken/" + token;

  const onSubmit = () => {};

  async function copyToClipboard(text?: any) {
    try {
      await navigator.clipboard.writeText(text);
      const copyLink = document.getElementById("copyLink");
      if (copyLink) {
        setTimeout(() => {
          copyLink.innerHTML = "Copied";
        }, 500);
        setTimeout(() => {
          copyLink.innerHTML = "Copy Link";
        }, 3000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Card className="w-full bg-white p-5 gap-3">
            <p className="font-[500]">Invite collaborators</p>
            <p className="text-[14px] -mt-2 text-gray-500">
              Share this tree with others and work together
            </p>

            <hr className="text-gray-300 w-[calc(100%+40px)] -ml-5" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link className="size-10 border border-primary/10 bg-primary/5 rounded-full text-primary p-2" />
                <div className="flex flex-col">
                  <p className="font-[500]">Generate Invitation Link</p>
                  <p className="text-[14px] text-gray-500">
                    Anyone with this link can view or join this tree
                  </p>
                </div>
              </div>
              <Button
                onClick={() => generateInviteTokenMutate({ treeId: id })}
                disabled={isGenerateInviteTokenPending}
              >
                {isGenerateInviteTokenPending ? <Spinner loading /> : <Link />}
                Generate Invitation Link
              </Button>
            </div>
            {token && (
              <div className="flex gap-4 items-center">
                <span
                  id="invitationLink"
                  className="text-sm border rounded-md px-3 py-2"
                >
                  {url}
                </span>
                <Button
                  id="copyLink"
                  onClick={() => copyToClipboard(url)}
                  variant="outline"
                >
                  <Copy />
                  Copy Link
                </Button>
              </div>
            )}

            <hr className="text-gray-300 w-[calc(100%+40px)] -ml-5 mt-3" />

            <span className="ml-3 text-sm font-[500]">
              Current Collaborators ({members?.length})
            </span>
            <Table.Root>
              <Table.Header className="border-t bg-gray-200">
                <Table.Row>
                  <Table.ColumnHeaderCell>Members</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              {!isTreeMembersLoading && (
                <Table.Body>
                  {members?.map((item: any, index: any) => {
                    const isOwner =
                      localStorage.getItem("fullName") ==
                      item?.userId?.fullName;
                    return (
                      <Table.Row key={index}>
                        <Table.RowHeaderCell>
                          {item?.userId?.fullName} {isOwner ? "(You)" : ""}
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell className="lowercase">
                          {item?.role}
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell>
                          {dayjs(item?.createdAt).format(
                            "DD-MMM-YYYY | hh:mm A",
                          )}
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell>
                          <EllipsisVertical className="size-4 mt-0.5 mr-2 ml-1 cursor-pointer" />
                        </Table.RowHeaderCell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              )}
            </Table.Root>
            {isTreeMembersLoading && (
              <span className="flex items-center justify-center py-2 w-full">
                <Spinner loading />
              </span>
            )}
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};

export default CollabForm;
