import { useState } from 'react'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css'

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};

function App() {
  const [keyword, setKeyword] = useState("");
  const [repodata, setRepodata] = useState<Repository[]>([]);

  const handleClick = () => {
    //REST API CALL
    //const url = `https://api.github.com/search/repositories?q=${keyword}`;
    axios.get<{items: Repository[]}> (`https://api.github.com/search/repositories?q=${keyword}`)
      .then(response => setRepodata(response.data.items))
      .catch(err => console.error(err));
  }

  const [columnDefs] = useState<ColDef[]>([
    {field: 'full_name', headerName: "Author", sortable: true, filter: true},
    {field: 'owner.login', headerName: "Owenr Login", sortable: true, filter: true},
    {field: 'html_url', headerName: "Repo URL", sortable: true, filter: true, cellRenderer: (params: ICellRendererParams) => (<a href={params.value} target="_blank" rel="noreferrer">{params.value}</a>)},
    {
      field: "id",
      headerName: "",
      cellRenderer: (params: ICellRendererParams) => (
        <button onClick={() => alert(`GET '/api/users/${params.value}'`)}>Edit</button>
      ),
      sortable: false, 
      filter: false
    }
  ]);

  return (
    <div className='App'>
      <input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <button onClick={handleClick}>So Fetch</button>
      <div className='ag-theme-material' style={{height: 500, width: 850}}>
        <AgGridReact 
          rowData={repodata}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={8}
        />
      </div>
    </div>
  )
}

export default App
