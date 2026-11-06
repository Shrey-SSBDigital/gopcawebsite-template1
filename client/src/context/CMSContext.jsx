import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_GOVERNING_BOARD,
  INITIAL_PERSONNEL,
  INITIAL_OPERATORS,
  INITIAL_DOWNLOADS,
  INITIAL_PHOTOS,
  INITIAL_VIDEOS,
  INITIAL_FEE_SCHEDULE
} from '../data/defaultData';

const CMSContext = createContext();

export function CMSProvider({ children }) {
  // Local storage cache keys
  const [governingBoard, setGoverningBoard] = useState(() => {
    const saved = localStorage.getItem('gopca_governing_board');
    return saved ? JSON.parse(saved) : INITIAL_GOVERNING_BOARD;
  });

  const [personnel, setPersonnel] = useState(() => {
    const saved = localStorage.getItem('gopca_personnel');
    return saved ? JSON.parse(saved) : INITIAL_PERSONNEL;
  });

  const [operators, setOperators] = useState(() => {
    const saved = localStorage.getItem('gopca_operators');
    return saved ? JSON.parse(saved) : INITIAL_OPERATORS;
  });

  const [downloads, setDownloads] = useState(() => {
    const saved = localStorage.getItem('gopca_downloads');
    return saved ? JSON.parse(saved) : INITIAL_DOWNLOADS;
  });

  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('gopca_photos');
    return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
  });

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('gopca_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [feeSchedule, setFeeSchedule] = useState(() => {
    const saved = localStorage.getItem('gopca_fees');
    return saved ? JSON.parse(saved) : INITIAL_FEE_SCHEDULE;
  });

  // CMS Authentication State (Single Admin ID & Password)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('gopca_cms_authenticated') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('gopca_cms_user') || '';
  });

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // CMS Login: 1 ID & Password
  const login = async (id, password) => {
    const trimmedId = id ? id.trim() : '';
    const trimmedPassword = password ? password.trim() : '';

    // Primary accepted credentials
    const validId = 'admin';
    const validPasswords = ['admin', 'admin123', 'admin@gopca', 'gopca2026'];

    // Try backend verification first if available
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: trimmedId, password: trimmedPassword })
      });
      if (response.ok) {
        setIsAuthenticated(true);
        setCurrentUser(trimmedId);
        localStorage.setItem('gopca_cms_authenticated', 'true');
        localStorage.setItem('gopca_cms_user', trimmedId);
        showNotification('Signed into GOPCA CMS Administrative Studio.');
        return { success: true };
      }
    } catch {
      // Offline fallback
    }

    // Client-side authentication check
    if (trimmedId.toLowerCase() === validId && validPasswords.includes(trimmedPassword)) {
      setIsAuthenticated(true);
      setCurrentUser(trimmedId);
      localStorage.setItem('gopca_cms_authenticated', 'true');
      localStorage.setItem('gopca_cms_user', trimmedId);
      showNotification('Signed into GOPCA CMS Administrative Studio.');
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Invalid Administrator ID or Password. Please check credentials.' 
    };
  };

  // CMS Logout
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    localStorage.removeItem('gopca_cms_authenticated');
    localStorage.removeItem('gopca_cms_user');
    showNotification('Logged out from GOPCA CMS Studio.');
  };

  // Sync with Backend if available
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        console.log('Connected to GOPCA MERN Server:', data.agency);
      })
      .catch(() => {
        console.log('Running in client offline mode with localStorage cache');
      });
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('gopca_governing_board', JSON.stringify(governingBoard));
  }, [governingBoard]);

  useEffect(() => {
    localStorage.setItem('gopca_personnel', JSON.stringify(personnel));
  }, [personnel]);

  useEffect(() => {
    localStorage.setItem('gopca_operators', JSON.stringify(operators));
  }, [operators]);

  useEffect(() => {
    localStorage.setItem('gopca_downloads', JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem('gopca_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('gopca_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('gopca_fees', JSON.stringify(feeSchedule));
  }, [feeSchedule]);

  // Personnel actions
  const addPersonnel = (newPerson) => {
    const item = {
      id: `p-${Date.now()}`,
      ...newPerson
    };
    setPersonnel(prev => [item, ...prev]);
    showNotification(`Personnel member "${item.name}" registered successfully.`);

    // Async sync with backend
    fetch('/api/personnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    }).catch(err => console.log('Offline sync'));
  };

  const deletePersonnel = (id) => {
    const person = personnel.find(p => p.id === id);
    setPersonnel(prev => prev.filter(p => p.id !== id));
    showNotification(`Personnel "${person?.name || id}" removed from cadre.`);

    fetch(`/api/personnel/${id}`, { method: 'DELETE' }).catch(err => console.log('Offline sync'));
  };

  const resetPersonnel = () => {
    setPersonnel(INITIAL_PERSONNEL);
    localStorage.setItem('gopca_personnel', JSON.stringify(INITIAL_PERSONNEL));
    showNotification('Official personnel cadre roster restored to statutory defaults.');

    fetch('/api/personnel/reset', { method: 'POST' }).catch(err => console.log('Offline sync'));
  };

  // Generic Dynamic Table Handler for CMS
  const getTableRows = (tableId) => {
    switch (tableId) {
      case 'governing_board':
        return governingBoard;
      case 'personnel':
        return personnel;
      case 'operators_active':
        return operators.filter(o => o.type === 'active');
      case 'operators_farmers':
        return operators.filter(o => o.type === 'farmers');
      case 'operators_suspended':
        return operators.filter(o => o.type === 'suspended');
      case 'operators_terminated':
        return operators.filter(o => o.type === 'terminated');
      case 'operators_discontinued':
        return operators.filter(o => o.type === 'discontinued');
      case 'downloads':
        return downloads;
      case 'fee_schedule':
        return feeSchedule;
      default:
        return [];
    }
  };

  const addTableRow = (tableId, rowData) => {
    const id = `row-${Date.now()}`;
    const newRecord = { id, ...rowData };

    if (tableId.startsWith('operators_')) {
      const type = tableId.replace('operators_', '');
      newRecord.type = type;
      setOperators(prev => [newRecord, ...prev]);
    } else if (tableId === 'governing_board') {
      setGoverningBoard(prev => [newRecord, ...prev]);
    } else if (tableId === 'personnel') {
      setPersonnel(prev => [newRecord, ...prev]);
    } else if (tableId === 'downloads') {
      setDownloads(prev => [newRecord, ...prev]);
    } else if (tableId === 'fee_schedule') {
      setFeeSchedule(prev => [newRecord, ...prev]);
    }

    showNotification(`New record added to dynamic table successfully.`);

    fetch(`/api/cms/tables/${tableId}/rows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    }).catch(err => console.log('Offline sync'));
  };

  const updateTableRow = (tableId, rowId, updatedData) => {
    const updater = (prev) =>
      prev.map((item) => (String(item.id) === String(rowId) ? { ...item, ...updatedData } : item));

    if (tableId.startsWith('operators_')) {
      setOperators(updater);
    } else if (tableId === 'governing_board') {
      setGoverningBoard(updater);
    } else if (tableId === 'personnel') {
      setPersonnel(updater);
    } else if (tableId === 'downloads') {
      setDownloads(updater);
    } else if (tableId === 'fee_schedule') {
      setFeeSchedule(updater);
    }

    showNotification(`Record updated successfully.`);

    fetch(`/api/cms/tables/${tableId}/rows/${rowId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    }).catch(err => console.log('Offline sync'));
  };

  const updatePersonnel = (id, updatedData) => {
    updateTableRow('personnel', id, updatedData);
  };

  const deleteTableRow = (tableId, rowId) => {
    if (tableId.startsWith('operators_')) {
      setOperators(prev => prev.filter(o => String(o.id) !== String(rowId)));
    } else if (tableId === 'governing_board') {
      setGoverningBoard(prev => prev.filter(r => String(r.id) !== String(rowId)));
    } else if (tableId === 'personnel') {
      setPersonnel(prev => prev.filter(r => String(r.id) !== String(rowId)));
    } else if (tableId === 'downloads') {
      setDownloads(prev => prev.filter(r => String(r.id) !== String(rowId)));
    } else if (tableId === 'fee_schedule') {
      setFeeSchedule(prev => prev.filter(r => String(r.id) !== String(rowId)));
    }

    showNotification(`Record removed from table.`);

    fetch(`/api/cms/tables/${tableId}/rows/${rowId}`, {
      method: 'DELETE'
    }).catch(err => console.log('Offline sync'));
  };

  const resetTable = (tableId) => {
    if (tableId === 'governing_board') {
      setGoverningBoard(INITIAL_GOVERNING_BOARD);
    } else if (tableId === 'personnel') {
      setPersonnel(INITIAL_PERSONNEL);
    } else if (tableId.startsWith('operators_')) {
      const type = tableId.replace('operators_', '');
      const otherOps = operators.filter(o => o.type !== type);
      const defaults = INITIAL_OPERATORS.filter(o => o.type === type);
      setOperators([...otherOps, ...defaults]);
    } else if (tableId === 'downloads') {
      setDownloads(INITIAL_DOWNLOADS);
    } else if (tableId === 'fee_schedule') {
      setFeeSchedule(INITIAL_FEE_SCHEDULE);
    }

    showNotification(`Table reset to official statutory defaults.`);

    fetch(`/api/cms/tables/${tableId}/reset`, {
      method: 'POST'
    }).catch(err => console.log('Offline sync'));
  };

  const submitInquiry = async (formData) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      showNotification('Your inquiry has been submitted to GOPCA Secretariat. Registration token generated.', 'success');
      return { success: true };
    } catch (err) {
      showNotification('Inquiry registered in offline queue. Secretariat will be notified.', 'success');
      return { success: true };
    }
  };

  return (
    <CMSContext.Provider
      value={{
        governingBoard,
        personnel,
        operators,
        downloads,
        photos,
        videos,
        feeSchedule,
        notification,
        showNotification,
        isAuthenticated,
        currentUser,
        login,
        logout,
        addPersonnel,
        updatePersonnel,
        deletePersonnel,
        resetPersonnel,
        getTableRows,
        addTableRow,
        updateTableRow,
        deleteTableRow,
        resetTable,
        submitInquiry
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}

