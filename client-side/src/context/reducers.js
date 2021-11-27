import constant from "./constant";

const {
  APP_SET_ALERT_MESSAGE,
  APP_CLOSE_ALERT_MESSAGE,
  SET_LOADING_STATUS,
  SET_ADMIN_LOGGED_IN,
  FETCH_FOODS_DATA_SUCCESS,
  FETCH_SINGLE_FOOD_DATA_SUCCESS,
  ADD_FOOD_SUCCESS,
  DELETE_FOOD_SUCCESS,
  UPDATE_FOOD_SUCCESS,
  USER_CHANGE_FOOD_QUANTITY,
  USER_ORDER_CONFIRM_SUCCESS,
  FETCH_USER_ORDERS_SUCCESS,
  ORDER_DELETE_SUCCESS,
  FETCH_ALL_ORDERS_SUCCESS,
  CHANGE_ORDER_STATUS_SUCCESS,
} = constant;

const reducer = (state, actions) => {
  switch (actions.type) {
    case APP_SET_ALERT_MESSAGE:
      state = {
        ...state,
        messageInfo: {
          isOpen: true,
          ...actions.payload,
        },
      };
      return state;
    case APP_CLOSE_ALERT_MESSAGE:
      state = {
        ...state,
        messageInfo: {
          isOpen: false,
          status: null,
          message: null,
        },
      };
      return state;
    case SET_LOADING_STATUS:
      state = {
        ...state,
        isLoading: actions.payload,
      };
      return state;
    case SET_ADMIN_LOGGED_IN:
      state = {
        ...state,
        admin: {
          ...state.admin,
          ...actions.payload,
        },
      };
      return state;
    case FETCH_FOODS_DATA_SUCCESS:
      state = {
        ...state,
        foods: [...actions.payload],
      };
      return state;
    case FETCH_SINGLE_FOOD_DATA_SUCCESS:
      state = {
        ...state,
        singleFood: actions.payload,
      };
      return state;
    case ADD_FOOD_SUCCESS:
      state = {
        ...state,
        foods: [...state.foods, { ...actions.payload }],
      };
      return state;

    case UPDATE_FOOD_SUCCESS:
      const updatedFoods = state.foods.map((food) => {
        if (food._id === actions.payload._id) {
          return {
            ...food,
            ...actions.payload,
          };
        }
        return { ...food };
      });
      state = {
        ...state,
        foods: updatedFoods,
      };
      return state;
    case DELETE_FOOD_SUCCESS:
      let filteredFoods = state.foods.filter(
        (food) => food._id !== actions.payload
      );
      state = {
        ...state,
        foods: filteredFoods,
      };
      return state;
    case USER_CHANGE_FOOD_QUANTITY:
      state = {
        ...state,
        orderFoodQuantity: actions.payload,
      };
      return state;
    case USER_ORDER_CONFIRM_SUCCESS:
      state = {
        ...state,
        userOrders: [...state.userOrders, { ...actions.payload }],
        orderFoodQuantity: 1,
      };
      return state;
    case FETCH_USER_ORDERS_SUCCESS:
      state = {
        ...state,
        userOrders: [...actions.payload],
      };
      return state;
    case ORDER_DELETE_SUCCESS:
      let filteredOrders = state.userOrders.filter(
        (order) => order._id !== actions.payload
      );
      let orders = state.orders.filter(
        (order) => order._id !== actions.payload
      );
      state = {
        ...state,
        userOrders: filteredOrders,
        orders,
      };
      return state;
    case FETCH_ALL_ORDERS_SUCCESS:
      state = {
        ...state,
        orders: [...actions.payload],
      };
      return state;
    case CHANGE_ORDER_STATUS_SUCCESS:
      const updatedOrders = state.orders.map((order) => {
        if (order._id === actions.payload.id) {
          return {
            ...order,
            status: actions.payload.status,
          };
        }
        return { ...order };
      });

      state = {
        ...state,
        orders: updatedOrders,
      };
      return state;
    default:
      return state;
  }
};

export default reducer;
