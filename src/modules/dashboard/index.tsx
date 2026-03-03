import GroupTrees from "./components/GroupTrees";

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-2xl font-semibold">Your Family Trees</p>
        <p className="">
          Select a tree to explore or create a new one to start documenting your
          family history.
        </p>
      </div>
      <GroupTrees />
    </div>
  );
};

export default Dashboard;
