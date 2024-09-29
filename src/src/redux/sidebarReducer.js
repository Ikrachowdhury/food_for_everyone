// Action types
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

// Initial state
const initialState = {
  isOpen: false
};

// Reducer function
const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
};

// Action creator
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
});

export default sidebarReducer;
