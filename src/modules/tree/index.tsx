import * as Menubar from "@radix-ui/react-menubar";
import { useParams } from "@tanstack/react-router";
import { Crown, Link, Plus, UserRoundCheck, UserX } from "lucide-react";
import { useState } from "react";
import { AddMemberForm } from "./components/AddMemberForm";
import PopupWrapper from "../form/components/PopupWrapper";
import TestSix from "./components/TestSix";
import { getFamilyTree, useMarkAsRootPerson } from "./services/service";
import LinkMemberForm from "./components/LinkMemberForm";
import { Spinner, Theme } from "@radix-ui/themes";

const MyTree = () => {
  const [popup, setPopup] = useState({ data: {}, state: false, form: "" });
  const { id } = useParams({ from: "/myTree/$id" });

  const { treeData } = getFamilyTree(id);

  return (
    <div>
      <FamilyTree setPopup={setPopup} popup={popup} />

      <MemberCountStatus treeData={treeData} setPopup={setPopup} />

      <AddMember setPopup={setPopup} />

      <LinkMember setPopup={setPopup} popup={popup} />
    </div>
  );
};

export default MyTree;

const FamilyTree = ({ setPopup, popup }: { setPopup?: any; popup?: any }) => {
  return (
    <>
      <TestSix setPopup={setPopup} popup={popup} />

      <PopupWrapper
        open={
          popup?.state &&
          (popup?.form === "editMember" || popup?.form === "addMember")
        }
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <AddMemberForm popup={popup} setPopup={setPopup} />
      </PopupWrapper>
    </>
  );
};

const LinkMember = ({ setPopup, popup }: { setPopup?: any; popup?: any }) => {
  return (
    <>
      <PopupWrapper
        open={popup?.state && popup?.form === "linkMember"}
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <LinkMemberForm popup={popup} setPopup={setPopup} />
      </PopupWrapper>
    </>
  );
};

const MemberCountStatus = ({
  treeData,
  setPopup,
}: {
  treeData: any;
  setPopup: any;
}) => {
  const {
    mutate: markAsRootPersonMutation,
    isPending: isMarkAsRootPersonPending,
  } = useMarkAsRootPerson();

  return (
    <Menubar.Root className="flex">
      <div className="flex flex-col fixed top-20 left-5 p-1 text-sm gap-2">
        <Menubar.Menu>
          <Menubar.Trigger className="flex select-none items-center justify-between">
            <span className="flex gap-2 justify-between text-secondary border border-secondary cursor-pointer pl-2 pr-1.5 py-1 rounded-full">
              <span className="flex gap-2">
                <UserRoundCheck size={16} className="my-auto" />
                Linked
              </span>
              <span className="flex items-center justify-center bg-secondary size-5 rounded-full text-white text-[12px]">
                {treeData?.meta?.connectedPeopleCount}
              </span>
            </span>
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="flex flex-col gap-2 min-w-[150px]"
              align="start"
              side="right"
              sideOffset={10}
            >
              {treeData?.connectedPeople?.map((item: any, index: any) => {
                const rootMember = treeData?.meta?.rootMemberIds?.[0];
                return (
                  <div className="bg-white rounded-md">
                    <Theme>
                      <Menubar.Item
                        key={index}
                        className="flex group items-center justify-between gap-2 text-sm text-secondary bg-secondary/5 rounded-md border border-secondary px-2 py-1"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <span>{item?.name}</span>
                        {rootMember == item?._id &&
                          (isMarkAsRootPersonPending ? (
                            <Spinner loading />
                          ) : (
                            <span>
                              <Crown size={16} className="mr-0.5" />
                            </span>
                          ))}
                        {rootMember != item?._id && (
                          <span
                            className="hidden group-hover:block cursor-pointer"
                            title="Mark as Root Member"
                            onClick={() => {
                              markAsRootPersonMutation({
                                treeId: item?.treeId,
                                personId: item?._id,
                              });
                            }}
                          >
                            {isMarkAsRootPersonPending ? (
                              <Spinner loading />
                            ) : (
                              <Crown
                                size={20}
                                className="bg-primary text-white rounded-full p-1"
                              />
                            )}
                          </span>
                        )}
                      </Menubar.Item>
                    </Theme>
                  </div>
                );
              })}
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger className="flex select-none items-center justify-between">
            <span className="flex gap-2 justify-between text-red-700 border border-red-700 cursor-pointer pl-2 pr-1.5 py-1 rounded-full">
              <span className="flex gap-2">
                <UserX size={16} className="my-auto" />
                Pending
              </span>
              <span className="flex items-center justify-center bg-red-700 size-5 rounded-full text-white text-[12px]">
                {treeData?.meta?.disConnectedPeopleCount}
              </span>
            </span>
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="flex flex-col gap-2 min-w-[150px]"
              align="start"
              side="right"
              sideOffset={10}
            >
              {treeData?.disConnectedPeople?.map((item: any, index: any) => {
                return (
                  <div className="bg-white rounded-md">
                    <Menubar.Item
                      key={index}
                      className="flex justify-between items-center gap-2 text-sm bg-red-700/5 text-red-700 rounded-md border border-red-700 px-2 py-1"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <span>{item?.name}</span>
                      <span
                        title="Link with tree"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setPopup({
                            data: item,
                            state: true,
                            form: "linkMember",
                          });
                        }}
                      >
                        <Link size={18} />
                      </span>
                    </Menubar.Item>
                  </div>
                );
              })}
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </div>
    </Menubar.Root>
  );
};

const AddMember = ({ setPopup }: { setPopup: any }) => {
  return (
    <Plus
      size={40}
      className="fixed bg-secondary text-white rounded-full bottom-5 right-5 p-1 cursor-pointer"
      onClick={() => setPopup({ data: {}, state: true, form: "addMember" })}
    />
  );
};
