import { CarCard, CarList, Table } from "./components";

function App() {
  return (
    <div className="flex justify-center">
      <div className="w-8/12 h-full bg-gray-100 max-h-max overflow-auto">
        <Table />
      </div>

      <div className="w-4/12 h-full bg-black text-white">
        <CarList />
      </div>
    </div>
  );
}

export default App;
