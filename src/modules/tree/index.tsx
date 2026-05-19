import * as Menubar from "@radix-ui/react-menubar";
import { useParams } from "@tanstack/react-router";
import {
  Crown,
  Handshake,
  Link,
  Plus,
  ScrollText,
  UserRoundCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { AddMemberForm } from "./components/AddMemberForm";
import PopupWrapper from "../form/components/PopupWrapper";
import TestSix from "./components/TestSix";
import { getFamilyTree, useMarkAsRootPerson } from "./services/service";
import LinkMemberForm from "./components/LinkMemberForm";
import { Spinner, Theme } from "@radix-ui/themes";
import CollabForm from "../collaboration/components/CollabForm";
import ActivityLog from "../activityLog";

const MyTree = () => {
  const [popup, setPopup] = useState({ data: {}, state: false, form: "" });
  const { id } = useParams({ from: "/myTree/$id" });

  const { treeData } = getFamilyTree(id);

  const isOwner = treeData?.member?.role === "OWNER";
  const isEditor = treeData?.member?.role === "EDITOR";

  return (
    <div>
      <FamilyTree setPopup={setPopup} popup={popup} />

      <div className="flex flex-col fixed bottom-5 right-5 gap-5 items-end text-[12px]">
        {(isOwner || isEditor) && (
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() =>
              setPopup({ data: {}, state: true, form: "addMember" })
            }
          >
            <span className="group-hover:font-bold transition-all">
              Add person
            </span>
            <Plus
              size={40}
              className="bg-secondary text-white rounded-full p-[7px] group-hover:bg-secondary/90 group-hover:p-[6px] transition-all"
            />
          </div>
        )}
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => setPopup({ data: {}, state: true, form: "collab" })}
        >
          <span className="group-hover:font-bold transition-all">
            Invite / manage members
          </span>
          <Handshake
            size={40}
            className="border-1 border-secondary shadow-lg rounded-full text-secondary rounded-full p-[7px] group-hover:bg-secondary/5 group-hover:p-[6px] transition-all"
          />
        </div>
        <div
          className="flex items-center gap-3 group"
          onClick={() =>
            setPopup({ data: {}, state: true, form: "activityLog" })
          }
        >
          <span className="group-hover:font-bold transition-all cursor-pointer">
            Activity logs
          </span>
          <ScrollText
            size={40}
            className="border-1 border-secondary shadow-lg rounded-full text-secondary rounded-full p-[7px] group-hover:bg-secondary/5 group-hover:p-[6px] transition-all"
          />
        </div>
      </div>

      <Popups treeData={treeData} setPopup={setPopup} popup={popup} />
    </div>
  );
};

export default MyTree;

const FamilyTree = ({ setPopup, popup }: { setPopup?: any; popup?: any }) => {
  return (
    <>
      <TestSix setPopup={setPopup} popup={popup} />
    </>
  );
};

const Popups = ({
  setPopup,
  popup,
  treeData,
}: {
  setPopup?: any;
  popup?: any;
  treeData?: any;
}) => {
  return (
    <>
      <PopupWrapper
        open={
          popup?.state &&
          (popup?.form === "editMember" || popup?.form === "addMember")
        }
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <AddMemberForm popup={popup} setPopup={setPopup} />
      </PopupWrapper>

      <MemberCountStatus treeData={treeData} setPopup={setPopup} />

      <PopupWrapper
        open={popup?.state && popup?.form === "linkMember"}
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <LinkMemberForm popup={popup} setPopup={setPopup} />
      </PopupWrapper>

      <PopupWrapper
        open={popup?.state && popup?.form === "collab"}
        onOpenChange={() => setPopup({ data: {}, state: false })}
        className="max-w-[800px]!"
      >
        <CollabForm popup={popup} setPopup={setPopup} />
      </PopupWrapper>

      <PopupWrapper
        open={popup?.state && popup?.form === "activityLog"}
        onOpenChange={() => setPopup({ data: {}, state: false })}
        className="left-auto! right-0! top-0! translate-x-0! translate-y-0! h-screen! max-h-screen! w-[600px]! max-w-[600px]! overflow-y-auto rounded-tr-none rounded-br-none"
      >
        <ActivityLog />
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

  const treeRole = localStorage.getItem("treeRole");

  const isOwner = treeRole === "OWNER";
  const isEditor = treeRole === "EDITOR";

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
              className="flex flex-col gap-2 min-w-[150px] max-h-[400px] overflow-y-auto"
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
                      {(isOwner || isEditor) && (
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
                      )}
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
