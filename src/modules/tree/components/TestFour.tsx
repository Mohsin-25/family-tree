// import Tree from "react-d3-tree";
// import PROFILE from "../../../assets/profile.png";

// const TestFour = ({
//   setPopup,
// }: // popup,
// // setPopover,
// {
//   setPopup?: any;
//   popup?: any;
//   setPopover?: any;
// }) => {
//   // const { data: treeData } = getFamilyTree();
//   // console.log("eee", treeData);

//   const treeData = {
//     meta: {
//       rootMemberIds: ["694a35aa66454d7024b528ce", "694a35b666454d7024b528d0"],
//       connectedPeopleCount: 5,
//       disConnectedPeopleCount: 1,
//       totalCount: 6,
//     },
//     connectedPeople: [
//       {
//         _id: "694a35b666454d7024b528d0",
//         name: "Fahim",
//         gender: "M",
//         maritalStatus: "S",
//         dob: "25-08-1998",
//         profession: "S",
//         children: ["694a35bb66454d7024b528d2", "694a35be66454d7024b528d4"],
//         createdAt: "2025-12-23T06:24:54.526Z",
//         updatedAt: "2025-12-23T13:28:47.136Z",
//         __v: 13,
//         spouse: "694a35aa66454d7024b528ce",
//         father: null,
//         mother: null,
//       },
//       {
//         _id: "694a35aa66454d7024b528ce",
//         name: "Shahenaz",
//         gender: "F",
//         maritalStatus: "S",
//         dob: "25-08-1998",
//         profession: "S",
//         children: ["694a35bb66454d7024b528d2", "694a35be66454d7024b528d4"],
//         createdAt: "2025-12-23T06:24:42.696Z",
//         updatedAt: "2025-12-23T13:28:47.149Z",
//         __v: 12,
//         spouse: "694a35b666454d7024b528d0",
//         father: null,
//         mother: null,
//       },
//       {
//         _id: "694a35bb66454d7024b528d2",
//         name: "Wasim",
//         gender: "M",
//         maritalStatus: "S",
//         dob: "25-08-1998",
//         profession: "S",
//         children: [],
//         createdAt: "2025-12-23T06:24:59.059Z",
//         updatedAt: "2025-12-27T10:47:59.175Z",
//         __v: 0,
//         father: "694a35b666454d7024b528d0",
//         mother: "694a35aa66454d7024b528ce",
//         spouse: "694fb92e3d69bd1bf9023cc9",
//       },
//       {
//         _id: "694a35be66454d7024b528d4",
//         name: "Mohsin",
//         gender: "M",
//         maritalStatus: "S",
//         dob: "25-08-1998",
//         profession: "S",
//         children: [],
//         createdAt: "2025-12-23T06:25:02.957Z",
//         updatedAt: "2025-12-23T13:28:47.125Z",
//         __v: 0,
//         mother: "694a35aa66454d7024b528ce",
//         father: "694a35b666454d7024b528d0",
//         spouse: null,
//       },
//       {
//         _id: "694fb92e3d69bd1bf9023cc9",
//         name: "Anam",
//         gender: "F",
//         maritalStatus: "M",
//         dob: "25-04-1998",
//         profession: "S",
//         children: [],
//         createdAt: "2025-12-27T10:47:10.841Z",
//         updatedAt: "2025-12-27T10:47:59.192Z",
//         __v: 0,
//         spouse: "694a35bb66454d7024b528d2",
//       },
//     ],
//     disConnectedPeople: [
//       {
//         _id: "694e33434d1b28b970dd9977",
//         name: "Son",
//         gender: "M",
//         maritalStatus: "S",
//         dob: "25-04-2026",
//         profession: "S",
//         children: [],
//         createdAt: "2025-12-26T07:03:31.446Z",
//         updatedAt: "2025-12-26T07:03:31.446Z",
//         __v: 0,
//       },
//     ],
//   };

//   const buildPeopleMap = (people) =>
//     Object.fromEntries(people.map((p) => [p._id, p]));

//   const buildTreeNode = (person, peopleMap, visited = new Set()) => {
//     if (!person || visited.has(person._id)) return null;

//     visited.add(person._id);

//     return {
//       name: person.name,
//       attributes: {
//         _id: person._id,
//         gender: person.gender,
//         maritalStatus: person.maritalStatus,
//         dob: person.dob,
//         profession: person.profession,
//         spouse: person.spouse ? peopleMap[person.spouse] : null,
//         father: person.father,
//         mother: person.mother,
//       },
//       children: (person.children || [])
//         .map((childId) => buildTreeNode(peopleMap[childId], peopleMap, visited))
//         .filter(Boolean),
//     };
//   };

//   const getTreeStructure = (treeData) => {
//     const peopleMap = buildPeopleMap(treeData.connectedPeople);

//     return treeData.meta.rootMemberIds
//       .map((rootId) => buildTreeNode(peopleMap[rootId], peopleMap))
//       .filter(Boolean);
//   };

//   const structuredTreeData = getTreeStructure(treeData);

//   console.log("www", structuredTreeData);

//   return (
//     <div className="bg-yellow-100 h-lvh w-lvw" id="">
//       <Tree
//         data={structuredTreeData}
//         collapsible={true}
//         /////////////////////
//         orientation="vertical"
//         zoomable={true} // enable mousewheel zoom
//         draggable={true} // enable click+drag panning
//         translate={{ x: 700, y: 100 }} // initial position
//         zoom={0.5} // initial zoom level
//         nodeSize={{ x: 200, y: 300 }}
//         onNodeClick={() => alert("yeet")}
//         separation={{ siblings: 2, nonSiblings: 2 }}
//         pathFunc={"step"}
//         onLinkClick={() => alert("yeet")}
//         /////////////////////
//         renderCustomNodeElement={({ nodeDatum, toggleNode }) => {
//           const personData = nodeDatum?.attributes;
//           const spouseData = personData?.spouse;
//           const isMarried = !!personData?.spouse?.name;

//           console.log("qqq", personData?.name, {
//             personData,
//             spouseData,
//             isMarried,
//           });

//           return (
//             <foreignObject
//               width={300}
//               height={150}
//               x={isMarried ? -150 : -60}
//               y={-70}
//             >
//               {/* ✅ THIS enables collapse */}
//               <div onClick={toggleNode}>
//                 {" "}
//                 {/* ✅ THIS enables collapse */}
//                 {isMarried ? (
//                   <CoupleNode
//                     allData={nodeDatum}
//                     person={personData}
//                     spouse={spouseData}
//                     setPopup={setPopup}
//                   />
//                 ) : (
//                   <SingleNode
//                     allData={nodeDatum}
//                     person={personData}
//                     setPopup={setPopup}
//                   />
//                 )}
//               </div>
//             </foreignObject>
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default TestFour;

// const CoupleNode = ({
//   allData,
//   person,
//   spouse,
//   setPopup,
// }: // popup,
// // setPopover,
// {
//   allData?: any;
//   person?: any;
//   spouse?: any;
//   setPopup?: any;
//   popup?: any;
//   setPopover?: any;
// }) => {
//   return (
//     <div
//       className="flex items-center justify-between rounded-xl cursor-pointer"
//       // onClick={() => setPopover(true)}
//       // onClick={() => setPopup({ data: {}, state: true })}
//     >
//       {/* person */}
//       <SingleNode allData={allData} person={person} setPopup={setPopup} />

//       <div className="h-0.5 w-13 mt-6 bg-black/50 rounded-full"></div>

//       {/* spouse */}
//       <SingleNode
//         allData={allData}
//         person={spouse}
//         setPopup={setPopup}
//         isSpouse
//       />
//     </div>
//   );
// };

// const SingleNode = ({
//   allData,
//   person,
//   isSpouse = false,
//   setPopup,
// }: // popup,
// {
//   allData: any;
//   person: any;
//   isSpouse?: any;
//   setPopup?: any;
//   popup?: any;
// }) => (
//   <div
//     className={`relative bg-white border px-4 py-3 rounded-xl shadow-md flex flex-col items-center w-[120px] ${
//       isSpouse && "bg-blue-100!"
//     }`}
//   >
//     <button
//       className="bg-red-500 w-5 h-5 text-white flex items-center justify-center rounded ml-18"
//       onClick={(e) => {
//         e.stopPropagation();
//         setPopup({ data: allData, state: true });
//       }}
//     >
//       +
//     </button>
//     <img src={PROFILE} className="w-12 h-12 object-cover mb-1" />
//     <p className="text-sm font-medium">{person?.name}</p>
//   </div>
// );
