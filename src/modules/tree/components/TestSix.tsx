import { useParams } from "@tanstack/react-router";
import { Edit, Plus, Sprout } from "lucide-react";
import Tree, { type RawNodeDatum } from "react-d3-tree";
import { getFamilyTree, useMarkAsRootPerson } from "../services/service";
import men from "../../../assets/user-vector-men.jpg";
import women from "../../../assets/user-vector-women.jpg";
import { Spinner } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "../../../components/Toast";

type FamilyNode = RawNodeDatum & {
  type: "single" | "couple";
  person?: {
    id: string;
    data: any;
  };
  spouse?: {
    id: string;
    data: any;
  } | null;
  children?: FamilyNode[];
};

const TestSix = ({
  setPopup,
}: // popup,
// setPopover,
{
  setPopup?: any;
  popup?: any;
  setPopover?: any;
}) => {
  const { id } = useParams({ from: "/myTree/$id" });

  const { treeData, isLoading: isTreeDataLoading } = getFamilyTree(id);

  if (isTreeDataLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-65px)]">
        <Spinner className="!size-7" loading />
      </div>
    );
  }

  if (!treeData) {
    return null;
  }

  const getPersonById = (id: any) => {
    return (
      treeData?.connectedPeople?.filter((item: any) => item?._id === id)?.[0] ||
      treeData?.disConnectedPeople?.filter((item: any) => item?._id === id)?.[0]
    );
  };

  const getStructuredPerson = (obj: any): FamilyNode => {
    return {
      name: obj?.name,
      type: obj?.spouse ? "couple" : "single",
      person: {
        id: obj?._id,
        data: getPersonById(obj?._id),
      },
      spouse: obj?.spouse
        ? {
            id: obj?.spouse,
            data: getPersonById(obj?.spouse),
          }
        : null,
      children: obj?.children?.length
        ? obj.children.map((itm: any) =>
            getStructuredPerson(getPersonById(itm)),
          )
        : [],
    };
  };

  const rootPersonId =
    treeData?.meta?.rootMemberIds?.[0] ||
    treeData?.connectedPeople?.[0]?._id ||
    treeData?.disConnectedPeople?.[0]?._id;

  const getTopAncestor = (person: any) => {
    let current = person;
    while (current?.father) {
      current = getPersonById(current.father);
    }
    while (current?.mother) {
      current = getPersonById(current.mother);
    }
    return current;
  };

  const actualRoot = getTopAncestor(getPersonById(rootPersonId));

  const structuredData: FamilyNode | any = rootPersonId
    ? getStructuredPerson(actualRoot)
    : {};

  return (
    <div className="bg-background-100 h-[calc(100vh-65px)] " id="">
      <Tree
        data={structuredData}
        collapsible={true}
        /////////////////////
        orientation="vertical"
        zoomable={true} // enable mousewheel zoom
        draggable={true} // enable click+drag panning
        translate={{ x: 700, y: 100 }} // initial position
        zoom={0.5} // initial zoom level
        nodeSize={{ x: 300, y: 300 }}
        onNodeClick={() => alert("yeet")}
        separation={{ siblings: 2, nonSiblings: 2 }}
        pathFunc={"step"}
        onLinkClick={() => alert("yeet")}
        /////////////////////
        renderCustomNodeElement={({ nodeDatum, toggleNode }) => {
          const customNode = nodeDatum as unknown as FamilyNode;
          const { type, person, spouse } = customNode;

          return (
            <foreignObject width={500} height={300} x={-250} y={-90}>
              <div
                onClick={toggleNode}
                className="flex items-center justify-center"
              >
                {/* ✅ THIS enables collapse */}
                {type === "couple" ? (
                  <CoupleNode
                    allData={nodeDatum}
                    person={person}
                    spouse={spouse}
                    setPopup={setPopup}
                  />
                ) : (
                  <SingleNode
                    allData={nodeDatum.attributes}
                    person={person}
                    setPopup={setPopup}
                  />
                )}
              </div>
            </foreignObject>
          );
        }}
      />
    </div>
  );
};

export default TestSix;

const CoupleNode = ({
  allData,
  person,
  spouse,
  setPopup,
}: // popup,
// setPopover,
{
  allData?: any;
  person?: any;
  spouse?: any;
  setPopup?: any;
  popup?: any;
  setPopover?: any;
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl cursor-pointer">
      {/* person */}
      <SingleNode allData={allData} person={person} setPopup={setPopup} />

      <div className="h-0.5 w-[100px] mt-0 bg-black/50 rounded-full"></div>

      {/* spouse */}
      <SingleNode
        allData={allData}
        person={spouse}
        setPopup={setPopup}
        isSpouse
      />
    </div>
  );
};

const SingleNode = ({
  person,
  isSpouse = false,
  setPopup,
}: // popup,
{
  allData: any;
  person: any;
  isSpouse?: any;
  setPopup?: any;
  popup?: any;
}) => {
  const {
    mutate: markAsRootPersonMutation,
    isPending: isMarkAsRootPersonPending,
  } = useMarkAsRootPerson({ useServiceResponse: false });

  const queryClient = useQueryClient();
  const { id } = useParams({ from: "/myTree/$id" });
  const { showToast } = useAppToast();

  const markAsRootPersonFn = ({ user }: { user?: any }) => {
    queryClient.setQueryData(["tree", id], (old: any) => {
      const newData = {
        ...old,
        data: {
          ...old?.data,
          meta: { ...old?.data?.meta, rootMemberIds: [user] },
        },
      };

      return newData;
    });
  };

  return person ? (
    <div
      className={`relative bg-white group border px-4 py-6 rounded-xl shadow-md flex flex-col items-center justify-center w-[200px] h-[180px] cursor-auto ${
        isSpouse && "bg-blue-100!"
      }`}
    >
      <button
        title="Edit Person"
        className="text-primary/60 hover:text-primary hidden group-hover:flex items-center justify-center rounded-full absolute right-2 top-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setPopup({ data: person, state: true, form: "editMember" });
        }}
      >
        <Edit size={32} />
      </button>
      <img
        src={person?.data?.gender === "F" ? women : men}
        className="w-[70px] h-[70px] rounded-full object-cover mb-1"
      />
      <p className="text-sm font-medium">{person?.data?.name}</p>

      {isSpouse && (person?.data?.father || person?.data?.mother) && (
        <button
          title="View Spouse's Tree"
          onClick={(e) => {
            e.stopPropagation();

            markAsRootPersonMutation(
              {
                treeId: person?.data?.treeId,
                personId: person?.data?._id,
              },
              {
                onSuccess: (res) => {
                  if (res?.status) {
                    markAsRootPersonFn({ user: person?.data?._id });
                  }
                },
                onError: (err: any) => {
                  if (err?.message) {
                    showToast({
                      description: err?.message,
                      status: err?.status,
                    });
                  }
                },
              },
            );
          }}
          className="text-primary/60 bg-white p-2 hover:text-primary items-center justify-center rounded-full absolute right-1 -bottom-3 cursor-pointer"
        >
          {isMarkAsRootPersonPending ? (
            <Spinner className="!size-7" loading />
          ) : (
            <Sprout size={32} />
          )}
        </button>
      )}
    </div>
  ) : (
    <EmptySingleNode setPopup={setPopup} />
  );
};

const EmptySingleNode = ({ setPopup }: { setPopup?: any }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setPopup({ data: {}, state: true, form: "addMember" });
      }}
      className="p-5 flex flex-col gap-5 w-[200px] h-[180px] border border-dashed border-black/50 rounded-lg shadow-lg items-center justify-center hover:border-black/70 cursor-pointer hover:bg-white"
    >
      <span className="bg-black/10 rounded-full p-4">
        <Plus size={30} className="text-muted-foreground" />
      </span>
      <div className="flex flex-col text-center">
        <span className="text-md font-semibold">Add A Member</span>
      </div>
    </div>
  );
};
