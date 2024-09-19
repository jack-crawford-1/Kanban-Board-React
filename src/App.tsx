import KanbanBoard from './components/KanbanBoard';
import './index.css';

function App() {
  return (
    <>
      <div className=" text-white w-screen h-screen mx-auto items-center justify-center flex flex-col bg-black">
        <KanbanBoard />
      </div>
    </>
  );
}

export default App;
