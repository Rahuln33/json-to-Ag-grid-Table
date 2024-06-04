import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const getRainbowColor = (index, totalRows) => {
  const hue = (index / totalRows) * 360;
  return `hsl(${hue}, 100%, 90%)`; // Adjusted lightness for a lighter color
};

const getHeaderColor = (field) => {
  const colors = {
    'workspace_domain': 'hsl(0, 100%, 75%)', // red
    'no_of_dashboards': 'hsl(60, 100%, 75%)', // yellow
    'workspace_name': 'hsl(120, 100%, 75%)', // green
    'no_of_reports': 'hsl(180, 100%, 75%)', // cyan
    'no_of_users': 'hsl(0, 100%, 75%)', // red
    // 'email': 'hsl(240, 100%, 75%)', // blue
    // 'name': 'hsl(300, 100%, 75%)' // magenta
  };
  return colors[field] || 'hsl(0, 0%, 75%)'; // default grey color
};

const DataGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        const uniqueData = filterDuplicates(data);
        setRowData(uniqueData);
      })
      .catch(error => setError(error.message));
  }, []);

  const filterDuplicates = (data) => {
    const seen = new Set();
    return data.filter(item => {
      const identifier = item.workspace_domain; // change this to the unique identifier for your data
      if (seen.has(identifier)) {
        return false;
      }
      seen.add(identifier);
      return true;
    });
  };

  const columnDefs = [
    { headerName: 'Workspace Domain', field: 'workspace_domain' },
    { headerName: 'No. of Dashboards', field: 'no_of_dashboards' },
    { headerName: 'Workspace Name', field: 'workspace_name' },
    { headerName: 'No. of Reports', field: 'no_of_reports' },
    { headerName: 'No. of Users', field: 'no_of_users' },
    // { headerName: 'Email', field: 'email' },
    // { headerName: 'Name', field: 'name' },
  ];

  const getRowStyle = params => {
    const color = getRainbowColor(params.node.rowIndex, rowData.length);
    return { backgroundColor: color };
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: 1300 }}>
      {error && <div>Error: {error}</div>}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, minWidth: 150 }}
        getRowStyle={getRowStyle}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default DataGrid;
