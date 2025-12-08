import Tree from "react-d3-tree";
import { myFamilyTree } from "../constants/constants";

const TestThree = ({
  setPopup,
  popup,
  setPopover,
}: {
  setPopup?: any;
  popup?: any;
  setPopover?: any;
}) => {
  // const familyTree: any = {
  //   name: "Grandpa",
  //   attributes: { type: "single", person: { id: "H1", name: "Grandpa" } },
  //   children: [
  //     {
  //       name: "Max",
  //       attributes: {
  //         type: "couple",
  //         person: { id: "H1", name: "Max" },
  //         spouse: { id: "W1", name: "Maxine" },
  //       },
  //       children: [
  //         {
  //           name: "John",
  //           attributes: {
  //             type: "couple",
  //             person: { id: "H2", name: "John" },
  //             spouse: { id: "W2", name: "Chloe" },
  //           },
  //           children: [],
  //         },
  //         {
  //           name: "Chris",
  //           attributes: {
  //             type: "single",
  //             person: { id: "P3", name: "Chris" },
  //             //   husband: { id: "H2", name: "John" },
  //             //   spouse: { id: "W2", name: "Bella" },
  //           },
  //           children: [],
  //         },
  //         {
  //           name: "Jeff",
  //           attributes: {
  //             type: "couple",
  //             person: { id: "H2", name: "Jeff" },
  //             spouse: { id: "W2", name: "Jackie" },
  //           },
  //           children: [],
  //         },
  //       ],
  //     },

  //     {
  //       name: "Shawn",
  //       attributes: {
  //         type: "single",
  //         person: { id: "P3", name: "Shawn" },
  //       },
  //       children: [],
  //     },
  //   ],
  // };

  return (
    <div className="bg-black/70 h-lvh w-lvw" id="">
      <Tree
        data={myFamilyTree}
        /////////////////////
        orientation="vertical"
        zoomable={true} // enable mousewheel zoom
        draggable={true} // enable click+drag panning
        translate={{ x: 700, y: 100 }} // initial position
        zoom={0.5} // initial zoom level
        nodeSize={{ x: 200, y: 300 }}
        onNodeClick={() => alert("yeet")}
        separation={{ siblings: 2, nonSiblings: 2 }}
        pathFunc={"step"}
        onLinkClick={() => alert("yeet")}
        /////////////////////
        renderCustomNodeElement={({ nodeDatum }) => {
          const { type, person, spouse } = nodeDatum.attributes || {};

          return (
            <foreignObject
              width={300}
              height={150}
              x={type === "couple" ? -150 : -60}
              y={-60}
            >
              {type === "couple" ? (
                <CoupleNode
                  allData={nodeDatum.attributes}
                  person={person}
                  spouse={spouse}
                  setPopup={setPopup}
                  popup={popup}
                  setPopover={setPopover}
                />
              ) : (
                <SingleNode
                  allData={nodeDatum.attributes}
                  person={person}
                  setPopup={setPopup}
                  popup={popup}
                />
              )}
            </foreignObject>
          );
        }}
      />
    </div>
  );
};

export default TestThree;

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
    <div
      className="flex items-center justify-between rounded-xl cursor-pointer"
      // onClick={() => setPopover(true)}
      // onClick={() => setPopup({ data: {}, state: true })}
    >
      {/* person */}
      <SingleNode allData={allData} person={person} setPopup={setPopup} />

      <div className="h-0.5 w-13 mt-6 bg-black/50 rounded-full"></div>

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
  allData,
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
    className={`bg-white border px-4 py-3 rounded-xl shadow-md flex flex-col items-center w-[120px] ${
      isSpouse && "bg-blue-100!"
    }`}
    onClick={() => setPopup({ data: allData, state: true })}
    // onDoubleClick={}
  >
    <img
      src={
        "https://media.istockphoto.com/id/1473780957/vector/default-avatar-profile-user-profile-icon-business-people-profile-picture-portrait-user.jpg?s=2048x2048&w=is&k=20&c=0WrcouAz2sHJscVO004qoRnNXLXDCFF18kje2Rl7nRA="
      }
      className="w-12 h-12 rounded-full object-cover mb-1"
    />
    <p className="text-sm font-medium">{person?.name}</p>
  </div>
);
