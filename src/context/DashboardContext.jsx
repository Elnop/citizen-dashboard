import React, { createContext, useContext, useReducer, useEffect } from 'react';
import mockData from '../data/mockData.json';

const DashboardContext = createContext();

// Actions
const ACTIONS = {
  SET_DATA: 'SET_DATA',
  SET_FILTERS: 'SET_FILTERS',
  SET_DATE_RANGE: 'SET_DATE_RANGE',
  SET_THEME_FILTER: 'SET_THEME_FILTER',
  SET_DEPARTMENT_FILTER: 'SET_DEPARTMENT_FILTER',
  SET_TEAM_FILTER: 'SET_TEAM_FILTER',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_LOADING: 'SET_LOADING',
  UPDATE_COMPUTED_DATA: 'UPDATE_COMPUTED_DATA' // Ajout de l'action manquante
};

// Initial state
const initialState = {
  // Data
  employees: [],
  missions: [],
  themes: [],
  departments: [],
  
  // Filters
  filters: {
    dateRange: 'all', // 'all', 'month', 'quarter', 'year'
    theme: 'all',
    department: 'all',
    team: 'all',
    startDate: null,
    endDate: null
  },
  
  // UI State
  darkMode: false,
  loading: true,
  
  // Computed data (will be calculated)
  filteredMissions: [],
  filteredEmployees: [],
  metrics: {
    totalHours: 0,
    engagedEmployees: 0,
    engagementRate: 0,
    totalMissions: 0,
    completedMissions: 0
  }
};

// Reducer
function dashboardReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DATA:
      return {
        ...state,
        employees: action.payload.employees,
        missions: action.payload.missions,
        themes: action.payload.themes,
        departments: action.payload.departments,
        loading: false
      };
      
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
      
    case ACTIONS.SET_DATE_RANGE:
      return {
        ...state,
        filters: { 
          ...state.filters, 
          dateRange: action.payload.range,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate
        }
      };
      
    case ACTIONS.SET_THEME_FILTER:
      return {
        ...state,
        filters: { ...state.filters, theme: action.payload }
      };
      
    case ACTIONS.SET_DEPARTMENT_FILTER:
      return {
        ...state,
        filters: { 
          ...state.filters, 
          department: action.payload,
          team: 'all' // Reset team when department changes
        }
      };
      
    case ACTIONS.SET_TEAM_FILTER:
      return {
        ...state,
        filters: { ...state.filters, team: action.payload }
      };
      
    case ACTIONS.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode
      };
      
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ACTIONS.UPDATE_COMPUTED_DATA: // Ajout du case manquant
      return {
        ...state,
        filteredMissions: action.payload.filteredMissions,
        filteredEmployees: action.payload.filteredEmployees,
        metrics: action.payload.metrics
      };
    default:
      return state;
  }
}

// Helper functions for filtering and calculations
function filterMissions(missions, employees, filters) {
  return missions.filter(mission => {
    // Date filter
    if (filters.dateRange !== 'all' && filters.startDate && filters.endDate) {
      const missionDate = new Date(mission.date);
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      if (missionDate < startDate || missionDate > endDate) {
        return false;
      }
    }
    
    // Theme filter
    if (filters.theme !== 'all' && mission.theme !== filters.theme) {
      return false;
    }
    
    // Department/Team filter
    if (filters.department !== 'all' || filters.team !== 'all') {
      const employee = employees.find(emp => emp.id === mission.employeeId);
      if (!employee) return false;
      
      if (filters.department !== 'all' && employee.department !== filters.department) {
        return false;
      }
      
      if (filters.team !== 'all' && employee.team !== filters.team) {
        return false;
      }
    }
    
    return true;
  });
}

function calculateMetrics(filteredMissions, allEmployees, filteredEmployees) {
  const totalHours = filteredMissions.reduce((sum, mission) => sum + mission.hours, 0);
  const engagedEmployees = new Set(filteredMissions.map(mission => mission.employeeId)).size;
  const totalMissions = filteredMissions.length;
  const completedMissions = filteredMissions.filter(mission => mission.status === 'completed').length;
  
  // Calculate engagement rate (employees with certifications / total employees)
  const employeesWithCertifications = allEmployees.filter(emp => emp.certifications.length > 0).length;
  const engagementRate = allEmployees.length > 0 ? (employeesWithCertifications / allEmployees.length) * 100 : 0;
  
  return {
    totalHours,
    engagedEmployees,
    engagementRate: Math.round(engagementRate),
    totalMissions,
    completedMissions
  };
}

// Provider component
export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  
  // Load initial data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      dispatch({
        type: ACTIONS.SET_DATA,
        payload: mockData
      });
    }, 500);
  }, []);
  
  // Calculate filtered data and metrics when state changes
  useEffect(() => {
    if (state.employees.length > 0 && state.missions.length > 0) {
      const filteredMissions = filterMissions(state.missions, state.employees, state.filters);
      const filteredEmployeeIds = new Set(filteredMissions.map(mission => mission.employeeId));
      const filteredEmployees = state.employees.filter(emp => filteredEmployeeIds.has(emp.id));
      const metrics = calculateMetrics(filteredMissions, state.employees, filteredEmployees);
      
      // Update state with computed values
      dispatch({
        type: ACTIONS.UPDATE_COMPUTED_DATA,
        payload: {
          filteredMissions,
          filteredEmployees,
          metrics
        }
      });
    }
  }, [state.employees, state.missions, state.filters]);
  
  // Actions
  const actions = {
    setFilters: (filters) => dispatch({ type: ACTIONS.SET_FILTERS, payload: filters }),
    setDateRange: (range, startDate, endDate) => dispatch({ 
      type: ACTIONS.SET_DATE_RANGE, 
      payload: { range, startDate, endDate } 
    }),
    setThemeFilter: (theme) => dispatch({ type: ACTIONS.SET_THEME_FILTER, payload: theme }),
    setDepartmentFilter: (department) => dispatch({ type: ACTIONS.SET_DEPARTMENT_FILTER, payload: department }),
    setTeamFilter: (team) => dispatch({ type: ACTIONS.SET_TEAM_FILTER, payload: team }),
    toggleDarkMode: () => dispatch({ type: ACTIONS.TOGGLE_DARK_MODE }),
    setLoading: (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading })
  };
  
  return (
    <DashboardContext.Provider value={{ state, actions }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Hook to use the dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}