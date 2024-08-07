import styles from "./App.module.scss"
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Chip } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import { yellow } from "@mui/material/colors"


const columns: GridColDef[] = [
  { field: 'title', headerName: 'Название', flex: 1},
  { field: 'language', headerName: 'Язык', flex: 1 },
  { field: 'forkCount', headerName: 'Число форков', flex: 1 },
  { field: 'starCount', headerName: 'Число звезд', flex: 1 },
  { field: 'update', headerName: 'Дата обновления', flex: 1 },
]

const rows = [
  {
    id: 1,
    title: 1,
    language: 1,
    forkCount: 1,
    starCount: 1,
    update: 1
  }, {
    id: 2,
    title: 1,
    language: 1,
    forkCount: 1,
    starCount: 1,
    update: 1
  }, {
    id: 3,
    title: 1,
    language: 1,
    forkCount: 1,
    starCount: 1,
    update: 1
  },
]
function App() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <input type="search" />
        <Button variant="contained">Поиск</Button>
      </div>
      <main className={styles.page_inner}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight={true}
          style={{ height: '100%', width: '100%' }}
        />
        <aside className={styles.sidebar}>
          <div className={styles.repository_title}>
            Название репозитория
          </div>
          <div className={styles.repository_meta}>
            <Chip label="Python" color="primary"/>
            <div className={styles.repository_meta_inner}><StarIcon sx={{ fontSize: "2rem", color: yellow[500] }}/>9 800 000</div>
          </div>
          <div className={styles.repository_tags}>
            <Chip label="Python"/>
            <Chip label="cli"/>
            <Chip label="ARV"/>
            <Chip label="data"/>
          </div>
          <div>GPL-3.0 license</div>
        </aside>
      </main>
    </div>
  );
}

export default App;