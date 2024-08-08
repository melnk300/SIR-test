import styles from "./App.module.scss"
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Chip } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import { yellow } from "@mui/material/colors"
import useRepositories from "./hooks/useRepositories"
import { Repository } from "./models/Repository"
import { useState } from "react"


const columns: GridColDef[] = [
  { field: 'title', headerName: 'Название', flex: 1},
  { field: 'language', headerName: 'Язык', flex: 1 },
  { field: 'forks', headerName: 'Число форков', flex: 1 },
  { field: 'stars', headerName: 'Число звезд', flex: 1 },
  { field: 'update', headerName: 'Дата обновления', flex: 1 },
]

function App() {
  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    transformedData,
    error,
    isLoading,
  } = useRepositories();

  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = (id: string) => {
    setSelectedRepository(transformedData.find(repo => repo.id === id));
    setSidebarOpen(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поисковый запрос"
        />
        <Button onClick={handleSearch} disabled={isLoading} variant="contained">
          {isLoading ? "Идёт поиск..." : "Искать"}
        </Button>
      </div>
      {transformedData.length > 0 ? <>
        <main className={styles.page_inner}>
          <div className={styles.main}>
            <h1>Результаты поиска</h1>
            <DataGrid
              rows={transformedData}
              columns={columns}
              pageSizeOptions={[10]}
              style={{width: '100%' }}
              disableMultipleRowSelection={true}
              onRowSelectionModelChange={(e) => handleOpenSidebar(e[0])}
            />
          </div>
          <aside className={styles.sidebar}>
            {sidebarOpen ? (<>
              <div className={styles.repository_title}>
                {selectedRepository?.title}
              </div>
              <div className={styles.repository_meta}>
                <Chip label={selectedRepository?.language} color="primary" />
                <div className={styles.repository_meta_inner}><StarIcon
                  sx={{ fontSize: "2rem", color: yellow[500] }} />{selectedRepository?.stars}</div>
              </div>
              <div className={styles.repository_tags}>
                {selectedRepository?.tags.map(tag => {
                  return <Chip label={tag} />
                })}
              </div>
              <div>{selectedRepository?.license}</div>
            </>) : <div className={styles.sidebar_empty}>Выберите репозиторий</div>}
          </aside>
        </main>
      </> : <h1 className={styles.main_empty}>Добро пожаловать</h1>}
          </div>
        );
      }

export default App;