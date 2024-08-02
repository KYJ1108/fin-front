
import { Route, Routes } from 'react-router-dom';
import './App.css';
import BoardDetailPage from './views/detail/board-detail';
import BoardListPage from './views/list/board-list';
import BoardModifyPage from './views/modify/board-modify';
import BoardWritePage from './views/write/board-write';

function App() {
  return (
    <Routes>
      <Route path="/" element= {<BoardListPage/>} />
      <Route path="/write" element= {<BoardWritePage/>} />
      <Route path="/modify/:boardId" element= {<BoardModifyPage/>} />
      <Route path="/detail/:boardId" element= {<BoardDetailPage/>} />
    </Routes>
  );
}

export default App;
