import Tree from "react-d3-tree";

// attributes: {
//   department: "Production",
// },

const TestOne = () => {
  const familyData = [
    {
      type: "couple",
      husband: {
        name: "John",
        photo: "/john.jpg",
      },
      wife: {
        name: "Mary",
        photo: "/mary.jpg",
      },
      children: [
        {
          type: "person",
          name: "David",
          photo: "/david.jpg",
        },
        {
          type: "couple",
          husband: { name: "Alex", photo: "/alex.jpg" },
          wife: { name: "Sara", photo: "/sara.jpg" },
          children: [{ type: "person", name: "John Jr" }],
        },
      ],
    },
  ];
  return (
    <div className="bg-green-200 h-lvh w-lvw" id="treeWrapper">
      <Tree
        orientation="vertical"
        // pathFunc="straight"
        //
        // data={orgChart}
        // renderCustomNodeElement={(rd3tProps) => (
        //   <CustomNodeOne nodeData={rd3tProps.nodeDatum} />
        // )}
        //
        data={familyData}
        renderCustomNodeElement={(props) => (
          <CustomNode nodeDatum={props.nodeDatum} />
        )}

        // rootNodeClassName="node__root"
        // branchNodeClassName="node__branch"
        // leafNodeClassName="node__leaf"
      />
    </div>
  );
};

export default TestOne;

const CustomNode = ({ nodeDatum }) => {
  if (nodeDatum.type === "couple") {
    return (
      <foreignObject width={220} height={100} x={-110} y={-50}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* Husband */}
          <PersonCard member={nodeDatum.husband} />

          {/* Link line */}
          <div style={{ width: "40px", height: "2px", background: "#aaa" }} />

          {/* Wife */}
          <PersonCard member={nodeDatum.wife} />
        </div>
      </foreignObject>
    );
  }

  // For normal (single) persons
  return (
    <foreignObject width={120} height={70} x={-60} y={-35}>
      <PersonCard member={nodeDatum} />
    </foreignObject>
  );
};

const PersonCard = ({ member }) => (
  <div style={{ textAlign: "center" }}>
    <img
      src={
        "https://media.istockphoto.com/id/1473780957/vector/default-avatar-profile-user-profile-icon-business-people-profile-picture-portrait-user.jpg?s=2048x2048&w=is&k=20&c=0WrcouAz2sHJscVO004qoRnNXLXDCFF18kje2Rl7nRA="
      }
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
    <div style={{ fontSize: 12, marginTop: 4 }}>{member.name}</div>
  </div>
);
