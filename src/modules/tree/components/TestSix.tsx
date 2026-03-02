import { useParams } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import Tree, { type RawNodeDatum } from "react-d3-tree";
import { getFamilyTree } from "../services/service";

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

  const { treeData } = getFamilyTree(id);

  if (!treeData) return null;

  const getPersonById = (id: any) => {
    return treeData?.connectedPeople?.filter(
      (item: any) => item?._id === id,
    )?.[0];
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
    treeData?.meta?.rootMemberIds?.find(
      (item: any) =>
        getPersonById(item)?.gender === "M" && !getPersonById(item)?.father,
    ) ||
    treeData?.meta?.rootMemberIds?.find(
      (item: any) =>
        getPersonById(item)?.gender === "F" && !getPersonById(item)?.father,
    );

  const structuredData: FamilyNode | any = rootPersonId
    ? getStructuredPerson(getPersonById(rootPersonId))
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
            <foreignObject
              width={300}
              height={150}
              x={type === "couple" ? -150 : -60}
              y={-60}
            >
              <div onClick={toggleNode}>
                {" "}
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

      <div className="h-0.5 w-13 mt-0 bg-black/50 rounded-full"></div>

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
}) => (
  <div
    className={`relative bg-white group border px-4 py-6 rounded-xl shadow-md flex flex-col items-center w-[140px] cursor-auto ${
      isSpouse && "bg-blue-100!"
    }`}
  >
    <button
      className="size-8 text-primary/60 hover:text-primary hidden group-hover:flex items-center justify-center rounded-full absolute right-1 top-1 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setPopup({ data: person, state: true, form: "editMember" });
      }}
    >
      <Edit />
    </button>
    <img
      src={
        "https://media.istockphoto.com/id/1473780957/vector/default-avatar-profile-user-profile-icon-business-people-profile-picture-portrait-user.jpg?s=2048x2048&w=is&k=20&c=0WrcouAz2sHJscVO004qoRnNXLXDCFF18kje2Rl7nRA="
      }
      className="w-12 h-12 rounded-full object-cover mb-1"
    />
    <p className="text-sm font-medium">{person?.data?.name}</p>
  </div>
);
