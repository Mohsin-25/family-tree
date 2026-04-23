import { FormProvider, useForm } from "react-hook-form";
import { Card } from "../../../components/ui/card";
import { Copy, EllipsisVertical, Link, Users } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Spinner } from "@radix-ui/themes";
import { useGenerateInviteToken } from "../services/service";
import { useParams } from "@tanstack/react-router";

const CollabForm = ({ setPopup, popup }: { setPopup: any; popup: any }) => {
  const methods = useForm();
  const { id } = useParams({ from: "/myTree/$id" });

  console.log({ setPopup, popup });

  const {
    mutate: generateInviteTokenMutate,
    data: generateInviteTokenData,
    isPending: isGenerateInviteTokenPending,
  } = useGenerateInviteToken();

  const token = generateInviteTokenData?.data?.inviteToken;
  const url = location.origin + "/inviteToken/" + token;

  const onSubmit = () => {};

  const dummyMembers = [
    {
      name: "Mohammad Mohsin (You)",
      role: "Owner",
    },
    {
      name: "Mohammad Wasim",
      role: "Editor",
    },
    {
      name: "Kunal",
      role: "Viewer",
    },
  ];

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

            <div className="flex flex-col border rounded-md mt-2">
              <div className="flex bg-primary/10 w-full text-sm px-4 py-2 rounded-t-md">
                <Users className="size-4 mt-0.5 mr-2" />
                <span className="font-[500]">Current Collaborators</span>
                <span className="ml-auto font-[500]">
                  {dummyMembers?.length} Member(s)
                </span>
              </div>
              <div className="max-h-[220px] overflow-y-auto">
                {dummyMembers?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex ${index < dummyMembers?.length - 1 && "border-b"} p-2 items-center gap-2 text-sm`}
                    >
                      <span className="flex items-center justify-center rounded-full size-8 bg-primary/5 border border-primary/10">
                        {item?.name?.[0]}
                      </span>
                      <span>{item?.name}</span>
                      <span className="flex items-center justify-center rounded-md py-1 px-2 ml-auto bg-primary/5 border border-primary/10">
                        {item?.role}
                      </span>
                      <EllipsisVertical className="size-4 mt-0.5 mr-2 ml-1 cursor-pointer" />
                    </div>
                  );
                })}
                <div></div>
              </div>
            </div>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};

export default CollabForm;
