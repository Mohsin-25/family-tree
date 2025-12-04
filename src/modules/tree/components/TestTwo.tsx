import Tree from "react-d3-tree";

// attributes: {
//   department: "Production",
// },

const TestTwo = () => {
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
        name: "Abdul Wadood",
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

        // rootNodeClassName="node__root"
        // branchNodeClassName="node__branch"
        // leafNodeClassName="node__leaf"
      />
    </div>
  );
};

export default TestTwo;

const CustomNodeOne = ({ nodeData }: { nodeData?: any }) => {
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
