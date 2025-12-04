import Tree from "react-d3-tree";

const TestThree = () => {
  const familyTree = {
    name: "Grandpa",
    attributes: { type: "single", person: { id: "H1", name: "Grandpa" } },
    children: [
      {
        name: "Max",
        attributes: {
          type: "couple",
          person: { id: "H1", name: "Max" },
          spouse: { id: "W1", name: "Maxine" },
        },
        children: [
          {
            name: "John",
            attributes: {
              type: "couple",
              person: { id: "H2", name: "John" },
              spouse: { id: "W2", name: "Chloe" },
            },
            children: [],
          },
          {
            name: "Chris",
            attributes: {
              type: "single",
              person: { id: "P3", name: "Chris" },
              //   husband: { id: "H2", name: "John" },
              //   spouse: { id: "W2", name: "Bella" },
            },
            children: [],
          },
          {
            name: "Jeff",
            attributes: {
              type: "couple",
              person: { id: "H2", name: "Jeff" },
              spouse: { id: "W2", name: "Jackie" },
            },
            children: [],
          },
        ],
      },

      {
        name: "Shawn",
        attributes: {
          type: "single",
          person: { id: "P3", name: "Shawn" },
        },
        children: [],
      },
    ],
  };

  return (
    <div className="bg-green-200 h-lvh w-lvw" id="treeWrapper">
      <Tree
        data={familyTree}
        /////////////////////
        orientation="vertical"
        zoomable={true} // enable mousewheel zoom
        draggable={true} // enable click+drag panning
        translate={{ x: 700, y: 100 }} // initial position
        zoom={0.75} // initial zoom level
        nodeSize={{ x: 200, y: 200 }}
        separation={{ siblings: 2, nonSiblings: 2 }}
        /////////////////////
        renderCustomNodeElement={({ nodeDatum }: { nodeDatum?: any }) => {
          const { type, person, spouse } = nodeDatum.attributes || {};

          return (
            <foreignObject width={250} height={120} x={-125} y={-60}>
              {type === "couple" ? (
                <CoupleNode person={person} spouse={spouse} />
              ) : (
                <SingleNode person={person} />
              )}
            </foreignObject>
          );
        }}
      />
    </div>
  );
};

export default TestThree;

const CoupleNode = ({ person, spouse }: { person?: any; spouse?: any }) => {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-300 shadow-md rounded-xl px-3 py-2 w-[230px] cursor-pointer">
      {/* person */}
      <PersonCard member={person} />

      {/* Link bar */}
      <div className="h-[2px] w-10 bg-gray-400 rounded-full"></div>

      {/* spouse */}
      <PersonCard member={spouse} isSpouse />
    </div>
  );
};

const PersonCard = ({
  member,
  isSpouse,
}: {
  member?: any;
  isSpouse?: Boolean;
}) => {
  return (
    <div className={`flex flex-col items-center ${isSpouse && "bg-blue-200"}`}>
      <img
        src={
          "https://media.istockphoto.com/id/1473780957/vector/default-avatar-profile-user-profile-icon-business-people-profile-picture-portrait-user.jpg?s=2048x2048&w=is&k=20&c=0WrcouAz2sHJscVO004qoRnNXLXDCFF18kje2Rl7nRA="
        }
        className="w-12 h-12 rounded-full object-cover border"
      />
      <p className="text-xs mt-1 font-medium">{member?.name}</p>
    </div>
  );
};

const SingleNode = ({ person }: { person?: any }) => (
  <div className="bg-white border px-4 py-3 rounded-xl shadow-md flex flex-col items-center w-[120px]">
    <img
      src={
        "https://media.istockphoto.com/id/1473780957/vector/default-avatar-profile-user-profile-icon-business-people-profile-picture-portrait-user.jpg?s=2048x2048&w=is&k=20&c=0WrcouAz2sHJscVO004qoRnNXLXDCFF18kje2Rl7nRA="
      }
      className="w-12 h-12 rounded-full object-cover mb-1"
    />
    <p className="text-sm font-medium">{person?.name}</p>
  </div>
);
