const LazyLoader = () => {
  return (
    <div className="!h-[100vh] !w-[80%] flex items-center fixed inset-0 !left-[20%]">
      <div className="flex items-center ml-[30%] w-[200px]">
        <div className="loading-text-loader"></div>
        <div className="dot-loader ml-8 mt-1"></div>
      </div>
    </div>
  );
};

export default LazyLoader;
