import Tree from "react-d3-tree";

// attributes: {
//   department: "Production",
// },

const FamilyTree = () => {
  const orgChart = {
    name: "Par Dada",
    children: [
      {
        name: "Abdul Razzaque",
        children: [
          {
            name: "Mohammad Abdul Fahim",
            children: [
              {
                name: "Mohammad Wasim",
              },
              {
                name: "Mohammad Mohsin",
              },
            ],
          },
        ],
      },
      {
        name: "Nana",
        children: [
          {
            name: "Abdul Ahad",
            children: [
              {
                name: "Shaikhu Bhaiya",
                children: [
                  {
                    name: "Bhatija",
                  },
                ],
              },
              {
                name: "Aquib Ahmad",
              },
            ],
          },
          {
            name: "Abdul Rab",
            children: [
              {
                name: "Wasfi bhaiya",
                children: [
                  {
                    name: "Bhatija",
                    children: [
                      {
                        name: "Bhatija",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Abdul Haq",
          },
          {
            name: "Abdul Sattar",
            children: [
              {
                name: "Umar",
              },
              {
                name: "Faisal",
              },
            ],
          },
        ],
      },
    ],
  };

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

  //   return <>asd</>;
  return (
    <div className="bg-green-200 h-lvh w-lvw" id="treeWrapper">
      <Tree
        orientation="vertical"
        // pathFunc="straight"
        //
        data={orgChart}
        renderCustomNodeElement={(rd3tProps) => (
          <CustomNodeOne nodeData={rd3tProps.nodeDatum} />
        )}
        //
        // data={familyData}
        // renderCustomNodeElement={(props) => (
        //   <CustomNode nodeDatum={props.nodeDatum} />
        // )}

        // rootNodeClassName="node__root"
        // branchNodeClassName="node__branch"
        // leafNodeClassName="node__leaf"
      />
    </div>
  );
};

export default FamilyTree;

const CustomNodeOne = ({ nodeData }) => {
  console.log("fff", nodeData);
  return (
    <foreignObject width={150} height={80} x={-75} y={-40}>
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          padding: "8px",
          border: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
        // onClick={() => alert(nodeData.name)}
      >
        {/* Photo */}
        <img
          src={
            "https://media.istockphoto.com/id/1473780957/vector/default-avatar-profile-user-profile-icon-business-people-profile-picture-portrait-user.jpg?s=2048x2048&w=is&k=20&c=0WrcouAz2sHJscVO004qoRnNXLXDCFF18kje2Rl7nRA="
          }
          alt={nodeData.name}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        {/* Info */}
        <div>
          <div style={{ fontWeight: "bold", fontSize: "14px", color: "red" }}>
            {nodeData.name}
          </div>
          <div style={{ fontSize: "12px", color: "#555" }}>
            {nodeData.relation || ""}
          </div>
        </div>
      </div>
    </foreignObject>
  );
};

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
        member.photo ||
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
