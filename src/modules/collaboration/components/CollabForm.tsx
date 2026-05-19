import { FormProvider, useForm } from "react-hook-form";
import { Card } from "../../../components/ui/card";
import {
  Copy,
  Crown,
  EllipsisVertical,
  Link,
  ScanEye,
  UserPen,
  Users,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Spinner, Table, Theme } from "@radix-ui/themes";
import { useGenerateInviteToken, useGetTreeMembers } from "../services/service";
import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  useRemoveMemberFromTree,
  useUpdateMemberRoleForTree,
} from "../../dashboard/services/service";

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

  const {
    mutate: removeMemberFromTreeMutate,
    isPending: isRemoveMemberFromTreePending,
  } = useRemoveMemberFromTree({
    treeId: id,
  });

  const {
    mutate: updateMemberRoleMutate,
    isPending: isUpdateMemberRolePending,
  } = useUpdateMemberRoleForTree({
    treeId: id,
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

  const treeRole = localStorage.getItem("treeRole");

  const isOwner = treeRole === "OWNER";
  const isEditor = treeRole === "EDITOR";

  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Card className="w-full bg-white p-5 gap-3">
            <p className="font-medium">Collaborators</p>
            {(isOwner || isEditor) && (
              <>
                <p className="text-[14px] -mt-2 text-gray-500">
                  Share this tree with others and work together
                </p>

                <hr className="text-gray-300 w-[calc(100%+40px)] -ml-5" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Link className="size-10 border border-primary/10 bg-primary/5 rounded-full text-primary p-2" />
                    <div className="flex flex-col">
                      <p className="font-medium">Generate Invitation Link</p>
                      <p className="text-[14px] text-gray-500">
                        Anyone with this link can view or join this tree
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() =>
                      generateInviteTokenMutate({
                        treeId: id,
                        expiresAt: dayjs().add(1, "hour").toDate(),
                      })
                    }
                    disabled={isGenerateInviteTokenPending}
                  >
                    {isGenerateInviteTokenPending ? (
                      <Spinner loading />
                    ) : (
                      <Link />
                    )}
                    Generate Invitation Link
                  </Button>
                </div>
                {token && (
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col">
                      <span
                        id="invitationLink"
                        className="text-sm border rounded-md px-3 py-2"
                      >
                        {url}
                      </span>
                      <span className="text-[10px] text-red-500 ml-3.5">
                        Link expires in 1 hour
                      </span>
                    </div>
                    <Button
                      id="copyLink"
                      onClick={() => copyToClipboard(url)}
                      variant="outline"
                      className="mb-auto"
                    >
                      <Copy />
                      Copy Link
                    </Button>
                  </div>
                )}
              </>
            )}

            <hr className="text-gray-300 w-[calc(100%+40px)] -ml-5 mt-3" />

            <span className="flex gap-1 items-center ml-3 text-sm font-medium">
              <Users className="mr-2" size={18} /> Collaborators{" "}
              {isTreeMembersLoading ? (
                <Spinner loading />
              ) : (
                <span>
                  {"("}
                  {members?.length}
                  {")"}
                </span>
              )}
            </span>
            <Table.Root className="max-h-[280px] overflow-y-auto!">
              <Table.Header className="border-t bg-gray-200">
                <Table.Row>
                  <Table.ColumnHeaderCell>Members</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Invited By</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              {!isTreeMembersLoading && (
                <Table.Body className="">
                  {members?.map((item: any, index: any) => {
                    const isLoggedInUser =
                      localStorage.getItem("id") == item?.userId?._id;

                    const isMemberOwner = item?.role === "OWNER";
                    const isMemberEditor = item?.role === "EDITOR";
                    const isMemberViewer = item?.role === "VIEWER";

                    return (
                      <Table.Row key={index}>
                        <Table.RowHeaderCell>
                          <span>{item?.userId?.fullName} </span>
                          <span className="font-bold">
                            {isLoggedInUser ? "(You)" : ""}
                          </span>
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell>
                          <span
                            className={`lowercase px-2 py-1 rounded-md flex gap-2 w-min justify-center items-center ${isMemberOwner ? "bg-green-300!" : isMemberViewer ? "bg-yellow-200!" : isMemberEditor ? "bg-blue-300!" : "bg-red-300!"}`}
                          >
                            {isMemberOwner && (
                              <Crown size={16} className="text-black" />
                            )}
                            {isMemberViewer && (
                              <ScanEye size={16} className="text-black" />
                            )}
                            {isMemberEditor && (
                              <UserPen size={16} className="text-black" />
                            )}
                            <span>{item?.role}</span>
                          </span>
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell>
                          {dayjs(item?.createdAt).format(
                            "DD-MMM-YYYY | hh:mm A",
                          )}
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell>
                          {item?.invitedBy?.fullName || "- - -"}
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell>
                          {isOwner ? (
                            <Popover>
                              {!isMemberOwner ? (
                                <PopoverTrigger asChild>
                                  <EllipsisVertical className="size-4 mt-0.5 mr-2 ml-1 cursor-pointer" />
                                </PopoverTrigger>
                              ) : (
                                "- - -"
                              )}
                              <PopoverPortal>
                                <Theme>
                                  <PopoverContent
                                    className="relative z-100 rounded-md flex flex-col border bg-white shadow-lg p-2 gap-2 mr-2"
                                    side="left"
                                  >
                                    <span className="bg-white border-r border-t size-3 absolute rotate-45 -right-1.5 top-[50%] bottom-[50%]"></span>
                                    {isMemberViewer && (
                                      <Button
                                        variant={"outline"}
                                        className="text-[12px] px-2 bg-gray-200"
                                        onClick={() => {
                                          updateMemberRoleMutate({
                                            memberId: item?.userId?._id,
                                            role: "EDITOR",
                                          });
                                        }}
                                        disabled={isUpdateMemberRolePending}
                                      >
                                        {isUpdateMemberRolePending ? (
                                          <Spinner loading />
                                        ) : (
                                          ""
                                        )}
                                        Provide Edit Access
                                      </Button>
                                    )}
                                    {isMemberEditor && (
                                      <Button
                                        variant={"outline"}
                                        className="text-[12px] px-2 bg-gray-200"
                                        onClick={() => {
                                          updateMemberRoleMutate({
                                            memberId: item?.userId?._id,
                                            role: "VIEWER",
                                          });
                                        }}
                                        disabled={isUpdateMemberRolePending}
                                      >
                                        {isUpdateMemberRolePending ? (
                                          <Spinner loading />
                                        ) : (
                                          ""
                                        )}
                                        Remove Edit Access
                                      </Button>
                                    )}
                                    {isOwner && (
                                      <Button
                                        variant={"outline"}
                                        className="text-[12px] px-2 bg-gray-200"
                                        onClick={() => {
                                          removeMemberFromTreeMutate({
                                            userId: item?.userId?._id,
                                          });
                                        }}
                                        disabled={isRemoveMemberFromTreePending}
                                      >
                                        {isRemoveMemberFromTreePending ? (
                                          <Spinner loading />
                                        ) : (
                                          ""
                                        )}
                                        Remove From Tree
                                      </Button>
                                    )}
                                  </PopoverContent>
                                </Theme>
                              </PopoverPortal>
                            </Popover>
                          ) : (
                            "- - -"
                          )}
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
