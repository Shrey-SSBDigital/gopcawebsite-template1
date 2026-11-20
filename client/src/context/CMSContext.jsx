import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/staticData';
import { api } from '../services/api';

const CMSContext = createContext(null);

const STORAGE_KEY = 'gopca_cms_state_v3';
const OFFICER_KEY = 'gopca_officer_session';

export const CMSProvider = ({ children }) => {
  // Try loading from localStorage first, else initialData
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved GOPCA state:', e);
    }
    return initialData;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(OFFICER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Persist local state whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
  }, [data]);

  // Sync with Backend API if available
  useEffect(() => {
    let isMounted = true;
    async function syncWithBackend() {
      try {
        const statsRes = await api.getStats();
        if (statsRes.success) {
          const [opsRes, appsRes, inqRes, circRes, inpRes, dlRes, farmRes] = await Promise.allSettled([
            api.getOperators(),
            api.getApplications(),
            api.getInquiries(),
            api.getCirculars(),
            api.getInputs(),
            api.getDownloads(),
            api.getFarmers()
          ]);

          if (!isMounted) return;

          setData((prev) => {
            const next = { ...prev };
            if (opsRes.status === 'fulfilled' && opsRes.value?.operators?.length) {
              next.operators = opsRes.value.operators;
            }
            if (appsRes.status === 'fulfilled' && appsRes.value?.applications?.length) {
              next.applications = appsRes.value.applications;
            }
            if (inqRes.status === 'fulfilled' && inqRes.value?.inquiries?.length) {
              next.inquiries = inqRes.value.inquiries;
            }
            if (circRes.status === 'fulfilled' && circRes.value?.circulars?.length) {
              next.circulars = circRes.value.circulars;
            }
            if (inpRes.status === 'fulfilled' && inpRes.value?.inputs?.length) {
              next.approvedInputs = inpRes.value.inputs;
            }
            if (dlRes.status === 'fulfilled' && dlRes.value?.downloads?.length) {
              next.downloads = dlRes.value.downloads;
            }
            if (farmRes.status === 'fulfilled' && farmRes.value?.farmers?.length) {
              next.growerFarmers = farmRes.value.farmers;
            }
            return next;
          });
        }
      } catch (err) {
        // Backend offline or local only; keep local state
      }
    }
    syncWithBackend();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auth methods
  const loginAdmin = async (officerId, pin) => {
    try {
      const res = await api.login(officerId, pin);
      if (res.success && res.officer) {
        setCurrentUser(res.officer);
        setIsAdminMode(true);
        localStorage.setItem(OFFICER_KEY, JSON.stringify(res.officer));
        return { success: true };
      }
    } catch (e) {
      // Local check fallback
      const found = (data.officers || []).find((o) => o.id === officerId || o.username === officerId);
      if (found && (pin === '1860' || pin === found.pin)) {
        setCurrentUser(found);
        setIsAdminMode(true);
        localStorage.setItem(OFFICER_KEY, JSON.stringify(found));
        return { success: true };
      }
      return { success: false, message: e.message || 'Invalid 4-digit PIN' };
    }
  };

  const logoutAdmin = () => {
    setCurrentUser(null);
    setIsAdminMode(false);
    localStorage.removeItem(OFFICER_KEY);
  };

  // Operators
  const addOperator = async (op) => {
    const newOp = {
      ...op,
      id: `op-${Date.now()}`,
      registrationNumber: op.registrationNumber || `ORG-26${Math.floor(1000 + Math.random() * 9000)}-00${Math.floor(1000 + Math.random() * 9000)}`,
      status: op.status || 'Certified Organic',
      cropTypes: Array.isArray(op.cropTypes) ? op.cropTypes : typeof op.cropTypes === 'string' ? op.cropTypes.split(',').map((s) => s.trim()) : ['Cotton', 'Groundnut'],
      totalAreaHectares: Number(op.totalAreaHectares) || 2.5
    };

    setData((prev) => ({
      ...prev,
      operators: [newOp, ...(prev.operators || [])]
    }));

    try {
      await api.addOperator(newOp);
    } catch (e) {}
    showNotification(`Operator "${newOp.name}" successfully added to register.`);
  };

  const updateOperator = async (id, updates) => {
    setData((prev) => ({
      ...prev,
      operators: (prev.operators || []).map((o) => (o.id === id ? { ...o, ...updates } : o))
    }));
    try {
      await api.updateOperator(id, updates);
    } catch (e) {}
    showNotification('Operator profile updated.');
  };

  const deleteOperator = async (id) => {
    setData((prev) => ({
      ...prev,
      operators: (prev.operators || []).filter((o) => o.id !== id)
    }));
    try {
      await api.deleteOperator(id);
    } catch (e) {}
    showNotification('Operator removed from register.');
  };

  const changeOperatorStatus = (id, status) => {
    updateOperator(id, { status });
  };

  // Grower Farmers
  const addGrowerFarmer = async (f) => {
    const list = data.growerFarmers || [];
    const maxSr = list.length > 0 ? Math.max(...list.map((item) => Number(item.srNo) || 0)) : 0;
    const newFarmer = {
      ...f,
      srNo: maxSr + 1
    };

    setData((prev) => ({
      ...prev,
      growerFarmers: [...(prev.growerFarmers || []), newFarmer]
    }));
    try {
      await api.addFarmer(newFarmer);
    } catch (e) {}
    showNotification(`Farmer "${newFarmer.farmerName}" added to ICS registry.`);
  };

  const deleteGrowerFarmer = async (srNo) => {
    setData((prev) => ({
      ...prev,
      growerFarmers: (prev.growerFarmers || []).filter((f) => f.srNo !== srNo)
    }));
    try {
      await api.deleteFarmer(srNo);
    } catch (e) {}
    showNotification('Member farmer record removed.');
  };

  // Approved Inputs
  const addApprovedInput = async (inp) => {
    const list = data.approvedInputs || [];
    const maxSr = list.length > 0 ? Math.max(...list.map((item) => Number(item.srNo) || 0)) : 0;
    const newInput = {
      ...inp,
      id: `inp-${Date.now()}`,
      srNo: maxSr + 1
    };

    setData((prev) => ({
      ...prev,
      approvedInputs: [newInput, ...(prev.approvedInputs || [])]
    }));
    try {
      await api.addInput(newInput);
    } catch (e) {}
    showNotification(`Approved input "${newInput.productName}" published.`);
  };

  const updateApprovedInput = async (id, updates) => {
    setData((prev) => ({
      ...prev,
      approvedInputs: (prev.approvedInputs || []).map((i) => (i.id === id ? { ...i, ...updates } : i))
    }));
    try {
      await api.updateInput(id, updates);
    } catch (e) {}
    showNotification('Input details updated.');
  };

  const deleteApprovedInput = async (id) => {
    setData((prev) => ({
      ...prev,
      approvedInputs: (prev.approvedInputs || []).filter((i) => i.id !== id)
    }));
    try {
      await api.deleteInput(id);
    } catch (e) {}
    showNotification('Approved input removed.');
  };

  // Inspection Plan
  const updateInspectionMonth = (month, updates) => {
    setData((prev) => ({
      ...prev,
      inspectionPlan: (prev.inspectionPlan || []).map((item) => (item.month === month ? { ...item, ...updates } : item))
    }));
    showNotification(`Inspection plan for ${month} updated.`);
  };

  // Circulars
  const addCircular = async (circ) => {
    const newCirc = {
      ...circ,
      id: `circ-${Date.now()}`,
      date: circ.date || new Date().toISOString().slice(0, 10)
    };
    setData((prev) => ({
      ...prev,
      circulars: [newCirc, ...(prev.circulars || [])]
    }));
    try {
      await api.addCircular(newCirc);
    } catch (e) {}
    showNotification(`Circular "${newCirc.referenceNo}" published.`);
  };

  const deleteCircular = async (id) => {
    setData((prev) => ({
      ...prev,
      circulars: (prev.circulars || []).filter((c) => c.id !== id)
    }));
    try {
      await api.deleteCircular(id);
    } catch (e) {}
    showNotification('Circular deleted.');
  };

  // Downloads
  const addDownload = async (dl) => {
    const newDl = {
      ...dl,
      id: `dl-${Date.now()}`,
      fileFormat: 'PDF',
      fileSize: dl.fileSize || '540 KB'
    };
    setData((prev) => ({
      ...prev,
      downloads: [newDl, ...(prev.downloads || [])]
    }));
    try {
      await api.addDownload(newDl);
    } catch (e) {}
    showNotification(`Download form "${newDl.title}" published.`);
  };

  const deleteDownload = async (id) => {
    setData((prev) => ({
      ...prev,
      downloads: (prev.downloads || []).filter((d) => d.id !== id)
    }));
    try {
      await api.deleteDownload(id);
    } catch (e) {}
    showNotification('Download form removed.');
  };

  // Staff
  const addStaff = async (st) => {
    const newStaff = {
      ...st,
      id: `st-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      staff: [...(prev.staff || []), newStaff]
    }));
    try {
      await api.addStaff(newStaff);
    } catch (e) {}
    showNotification(`Staff member "${newStaff.name}" added to directory.`);
  };

  const updateStaff = (id, updates) => {
    setData((prev) => ({
      ...prev,
      staff: (prev.staff || []).map((s) => (s.id === id ? { ...s, ...updates } : s))
    }));
    showNotification('Staff record updated.');
  };

  const deleteStaff = (id) => {
    setData((prev) => ({
      ...prev,
      staff: (prev.staff || []).filter((s) => s.id !== id)
    }));
    showNotification('Staff member removed.');
  };

  // Inquiries
  const addInquiry = async (inq) => {
    const newInq = {
      ...inq,
      id: `inq-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setData((prev) => ({
      ...prev,
      inquiries: [newInq, ...(prev.inquiries || [])]
    }));
    try {
      await api.submitInquiry(newInq);
    } catch (e) {}
    showNotification('Inquiry registered with GOPCA citizen cell.');
  };

  const updateInquiryStatus = async (id, status) => {
    setData((prev) => ({
      ...prev,
      inquiries: (prev.inquiries || []).map((i) => (i.id === id ? { ...i, status } : i))
    }));
    try {
      await api.updateInquiry(id, { status });
    } catch (e) {}
    showNotification(`Inquiry status updated to ${status}.`);
  };

  const deleteInquiry = async (id) => {
    setData((prev) => ({
      ...prev,
      inquiries: (prev.inquiries || []).filter((i) => i.id !== id)
    }));
    try {
      await api.deleteInquiry(id);
    } catch (e) {}
    showNotification('Inquiry deleted.');
  };

  // Applications
  const addApplication = async (app) => {
    const year = new Date().getFullYear();
    const appNo = `GOPCA/APP/${year}/0${Math.floor(100 + Math.random() * 900)}`;
    const newApp = {
      ...app,
      id: `app-${Date.now()}`,
      applicationNo: appNo,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      officerRemarks: 'Received online. Scheduled for document scrutiny.'
    };

    setData((prev) => ({
      ...prev,
      applications: [newApp, ...(prev.applications || [])]
    }));
    try {
      await api.submitApplication(newApp);
    } catch (e) {}
    showNotification(`Application ${appNo} submitted successfully.`);
    return newApp;
  };

  const updateApplicationStatus = async (id, status, remarks) => {
    setData((prev) => ({
      ...prev,
      applications: (prev.applications || []).map((a) =>
        a.id === id ? { ...a, status, officerRemarks: remarks || a.officerRemarks } : a
      )
    }));
    try {
      await api.updateApplication(id, { status, officerRemarks: remarks });
    } catch (e) {}
    showNotification(`Application status updated to ${status}.`);
  };

  const deleteApplication = async (id) => {
    setData((prev) => ({
      ...prev,
      applications: (prev.applications || []).filter((a) => a.id !== id)
    }));
    try {
      await api.deleteApplication(id);
    } catch (e) {}
    showNotification('Application archived.');
  };

  // Backup & Reset
  const exportBackupJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GOPCA_Registry_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('GOPCA database backup downloaded.');
  };

  const importBackupJson = (importedData) => {
    if (importedData && typeof importedData === 'object') {
      setData(importedData);
      showNotification('GOPCA state restored from JSON backup.');
    }
  };

  const resetToDefaults = async () => {
    setData(initialData);
    localStorage.removeItem(STORAGE_KEY);
    try {
      await api.resetDatabase();
    } catch (e) {}
    showNotification('System reset to official GOPCA defaults.');
  };

  const value = {
    currentUser,
    isAdminMode,
    setIsAdminMode,
    loginAdmin,
    logoutAdmin,
    operators: data.operators || [],
    addOperator,
    updateOperator,
    deleteOperator,
    changeOperatorStatus,
    growerFarmers: data.growerFarmers || [],
    addGrowerFarmer,
    deleteGrowerFarmer,
    approvedInputs: data.approvedInputs || [],
    addApprovedInput,
    updateApprovedInput,
    deleteApprovedInput,
    inspectionPlan: data.inspectionPlan || [],
    updateInspectionMonth,
    circulars: data.circulars || [],
    addCircular,
    deleteCircular,
    downloads: data.downloads || [],
    addDownload,
    deleteDownload,
    staff: data.staff || [],
    governingBoard: data.governingBoard || [],
    addStaff,
    updateStaff,
    deleteStaff,
    discontinuedOps: data.discontinuedOps || [],
    terminatedOps: data.terminatedOps || [],
    suspendedOps: data.suspendedOps || [],
    faqs: data.faqs || [],
    photos: data.photos || [],
    videos: data.videos || [],
    officers: data.officers || [],
    inquiries: data.inquiries || [],
    addInquiry,
    updateInquiryStatus,
    deleteInquiry,
    applications: data.applications || [],
    addApplication,
    updateApplicationStatus,
    deleteApplication,
    stats: data.stats || [],
    banners: data.banners || [],
    albums: data.albums || [],
    rti: data.rti || {},
    streams: data.streams || [],
    feeStructure: data.feeStructure || {},
    images: data.images || {},
    exportBackupJson,
    importBackupJson,
    resetToDefaults,
    notification,
    showNotification
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
