import { useEffect, useState } from 'react';

import { Button, CircularProgress, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Checkbox, ListItemText, TextField, IconButton } from '@mui/material';
import { useStore } from './hooks/useStore';
import Header from './components/header/Header';
import type { Log } from './types/log.types';
import Log_Card from './components/card/logCard';
import Footer from './components/footer/Footer';
import Alert_Dialog from './components/alert/Alert_Dialog';
import { RiFilter2Fill, RiFilter2Line } from "react-icons/ri";
import { GETAllLogs } from './api/logsAPI';
import Add_LogForm from './components/form/Add_LogForm';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ToolTip from './components/tooltip/CustomToolTip';

const LEVELS = ['error', 'warn', 'info', 'debug'];

const App = () => {
  // Constants
  const logsPerPage = 10;

  type FilterState = {
    message: string;
    levels: string[];
    resourceId: string;
    start: Date | null;
    end: Date | null;
    open: boolean;
  };

  const defaultFilter: FilterState = {
    message: '',
    levels: [],
    resourceId: '',
    start: null,
    end: null,
    open: false,
  };

  // Enhanced filter state
  const [filter, setFilter] = useState<FilterState>(defaultFilter);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [logsData, setLogsData] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { state, dispatch } = useStore();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0)
  }, [state.page]);

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(filteredData().length / logsPerPage);
    dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages });
    // eslint-disable-next-line
  }, [logsData, filter, dispatch]);


  // Fetch logs
  const fetchLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await GETAllLogs();
      setLogsData(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtering logic
  const filteredData = () => {
    return logsData.filter(log => {
      // Message filter (full-text)
      if (filter.message && !log.message.toLowerCase().includes(filter.message.toLowerCase())) return false;
      // Level filter (multi-select)
      if (filter.levels.length > 0 && !filter.levels.includes(log.level)) return false;
      // Resource ID filter
      if (filter.resourceId && !log.resourceId.toLowerCase().includes(filter.resourceId.toLowerCase())) return false;
      // Datetime range filter
      if (filter.start && new Date(log.timestamp) < filter.start) return false;
      if (filter.end && new Date(log.timestamp) > filter.end) return false;
      return true;
    });
  };

  const paginateData = () => {
    const start = (state.page - 1) * logsPerPage;
    return filteredData().slice().reverse().slice(start, start + logsPerPage);
  };

  // Handler for Search button
  const handleApplyFilters = () => {
    dispatch({ type: 'CHANGE_PAGE', payload: 1 });

  };

  // Handler for toggling filter bar
  const handleToggleFilter = () => {
    if (showFilter) {
      setFilter(defaultFilter); // Reset filters when hiding
    }
    setShowFilter((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <CircularProgress disableShrink thickness={4} color='primary' size={100} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-red-500">Error: {error}</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="w-full h-full p-3">
        {/* Responsive Filter Toggle and Bar */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 mb-4 min-h-[88px]">
          <div className="w-full sm:w-auto flex justify-start">
            <ToolTip
              title='Filter'
            >
              <IconButton
                onClick={handleToggleFilter}
                aria-label="Toggle filter bar"
                size="large"
                sx={{ display: { xs: 'none', sm: 'block' }, color: '#000' }}
              >
                {showFilter ? <RiFilter2Fill color='#000' size={24} /> : <RiFilter2Line color='#000' size={24} />}
              </IconButton>
            </ToolTip>
            <Button
              variant="contained"
              sx={{
                display: { xs: 'flex', sm: 'none' },
                color: '#fff',
                backgroundColor: '#1976d2',
                borderRadius: 2,
                py: 1.2,
                fontWeight: 600,
                fontSize: '1rem',
                gap: 1,
                boxShadow: 1,
                '&:hover': { backgroundColor: '#1565c0' },
              }}
              onClick={handleToggleFilter}
              aria-label="Toggle filter bar"
              size="large"
              fullWidth
              startIcon={showFilter ? <RiFilter2Fill size={22} /> : <RiFilter2Line size={22} />}
            >
              Filter
            </Button>
          </div>
          <div className="flex-1 w-full">
            {showFilter ? (
              <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-row items-stretch md:items-center justify-between gap-4 border border-black rounded-xl p-4 bg-white sticky top-0 z-10">
                {/* Message Search */}
                <TextField
                  label="Search Message"
                  variant="outlined"
                  size="small"
                  className="w-full sm:w-1/2 md:w-1/4"
                  value={filter.message}
                  onChange={e => setFilter(f => ({ ...f, message: e.target.value }))}
                  inputProps={{ 'aria-label': 'Search by message' }}
                />
                {/* Level Multi-select */}
                <FormControl className="w-full sm:w-1/2 md:w-1/5" size="small">
                  <InputLabel id="level-multiselect-label">Level</InputLabel>
                  <Select
                    labelId="level-multiselect-label"
                    multiple
                    value={filter.levels}
                    onChange={e => setFilter(f => ({ ...f, levels: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value }))}
                    input={<OutlinedInput label="Level" />}
                    renderValue={selected => (selected as string[]).join(', ')}
                    MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                  >
                    {LEVELS.map(level => (
                      <MenuItem key={level} value={level}>
                        <Checkbox checked={filter.levels.indexOf(level) > -1} />
                        <ListItemText primary={level} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* Resource ID */}
                <TextField
                  label="Resource ID"
                  variant="outlined"
                  size="small"
                  className="w-full sm:w-1/2 md:w-1/5"
                  value={filter.resourceId}
                  onChange={e => setFilter(f => ({ ...f, resourceId: e.target.value }))}
                  inputProps={{ 'aria-label': 'Resource ID' }}
                />
                {/* DateTime Pickers */}
                <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 md:w-auto">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Start Time"
                      value={filter.start}
                      onChange={date => setFilter(f => ({ ...f, start: date }))}
                      slotProps={{
                        textField: { size: "small", className: "w-full sm:w-40 md:w-32" }
                      }}
                    />
                    <DateTimePicker
                      label="End Time"
                      value={filter.end}
                      onChange={date => setFilter(f => ({ ...f, end: date }))}
                      slotProps={{
                        textField: { size: "small", className: "w-full sm:w-40 md:w-32" }
                      }}
                    />
                  </LocalizationProvider>
                </div>
                {/* Search Button */}
                <Button
                  variant="contained"
                  color="primary"
                  className="w-full sm:w-auto"
                  onClick={handleApplyFilters}
                  aria-label="Apply filters"
                >
                  Search
                </Button>
              </div>
            ) : (
              // Empty div with same height as filter bar for layout stability
              <div className="h-[72px]" />
            )}
          </div>
        </div>

        {/* Log List */}
        <div className="w-full h-full flex flex-wrap items-center 2xl:items-center justify-center 2xl:justify-start gap-10 p-3">
          {paginateData().length === 0 ? (
            <div className="w-full flex justify-center items-center text-3xl text-black capitalize font-semibold py-10">
              No logs found
            </div>
          ) : (
            paginateData().map((Log: Log) => (
              <Log_Card key={Log.id} Log={Log} />
            ))
          )}
        </div>
      </main>
      <Alert_Dialog />
      <Add_LogForm onLogAdded={fetchLogs} />
      {
        logsData.length > 10 && <Footer />
      }

    </>
  );
};

export default App;
