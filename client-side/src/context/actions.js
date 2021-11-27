import constant from "./constant";

const {
  APP_SET_ALERT_MESSAGE,
  APP_CLOSE_ALERT_MESSAGE,
  SET_LOADING_STATUS,
  SET_ADMIN_LOGGED_IN,
  FETCH_FOODS_DATA_SUCCESS,
  FETCH_SINGLE_FOOD_DATA_SUCCESS,
  ADD_FOOD_SUCCESS,
  UPDATE_FOOD_SUCCESS,
  DELETE_FOOD_SUCCESS,
  USER_CHANGE_FOOD_QUANTITY,
  USER_ORDER_CONFIRM_SUCCESS,
  FETCH_USER_ORDERS_SUCCESS,
  ORDER_DELETE_SUCCESS,
  FETCH_ALL_ORDERS_SUCCESS,
  CHANGE_ORDER_STATUS_SUCCESS,
} = constant;
const main = (dispatch) => {
  const methods = {};

  // Take status to return the color for determination of status for visualization
  methods.getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "primary";
      case "rejected":
        return "error";
      case "delivered":
        return "green";
      default:
        return "text.secondary";
    }
  };
  // Set an alert message with the app to show anywhere
  methods.setAlertMessage = (status, message) => {
    dispatch({
      type: APP_SET_ALERT_MESSAGE,
      payload: {
        status,
        message,
      },
    });
  };
  // Close an alert message with the app to invisible anywhere
  methods.closeAlertMessage = () => {
    dispatch({
      type: APP_CLOSE_ALERT_MESSAGE,
    });
  };
  // To login admin
  methods.adminLoginHandleSubmit = async (
    email,
    password,
    history,
    location
  ) => {
    if (!email || !password) {
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "warning",
          message: "Please provide email and password to login",
        },
      });
      return;
    }
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("admin-auth-token", data.token);
        history.push(location?.state?.from?.pathname || "/admin/profile");
        dispatch({
          type: SET_ADMIN_LOGGED_IN,
          payload: {
            isLoggedIn: data.isLoggedIn,
            ...data.admin,
          },
        });
      }
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: res.status === 200 ? "success" : "error",
          message: data.message,
        },
      });
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  // To verify admin auth token from the server to set authentication status with context
  methods.adminLoginVerify = async () => {
    try {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: true,
      });
      const res = await fetch("/api/admin/login/verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth-token": localStorage.getItem("admin-auth-token"),
        },
      });
      const data = await res.json();
      if (res.status !== 200) {
        localStorage.removeItem("admin-auth-token");
        dispatch({
          type: SET_ADMIN_LOGGED_IN,
          payload: {
            isLoggedIn: false,
            name: null,
            email: null,
          },
        });
      } else {
        dispatch({
          type: SET_ADMIN_LOGGED_IN,
          payload: {
            isLoggedIn: data.isLoggedIn,
            ...data.admin,
          },
        });
      }
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  // To logout admin
  methods.adminLogout = (history) => {
    localStorage.removeItem("admin-auth-token");
    history.push("/admin/login");
    dispatch({
      type: SET_ADMIN_LOGGED_IN,
      payload: {
        isLoggedIn: false,
        name: null,
        email: null,
      },
    });
  };

  // Fetch Food Data
  methods.fetchFoodsData = async () => {
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch("/api/food/all", {
        method: "GET",
      });
      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: FETCH_FOODS_DATA_SUCCESS,
          payload: data.foods,
        });
      }
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  // Fetch Single Food
  methods.fetchSingleFoodById = async (id) => {
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch(`/api/food/single/${id}`, {
        methods: "GET",
      });
      const data = await res.json();

      if (res.status === 200) {
        dispatch({
          type: FETCH_SINGLE_FOOD_DATA_SUCCESS,
          payload: data.food,
        });
      }
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  // Add food by Admin
  methods.addFoodHandleSubmit = async ({
    name,
    price,
    stockStatus,
    description,
    img,
    ratings,
  }) => {
    if (!name || !price || !stockStatus || !description || !img || !ratings) {
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "warning",
          message: "Please provide the all required fields to add a food",
        },
      });
      return;
    }
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch("/api/food/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth-token": localStorage.getItem("admin-auth-token"),
        },
        body: JSON.stringify({
          name,
          price,
          stockStatus,
          description,
          img,
          ratings,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        dispatch({
          type: ADD_FOOD_SUCCESS,
          payload: data.food,
        });
      }
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: res.status === 201 ? "success" : "error",
          message: data.message,
        },
      });
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  // Update food by Admin
  methods.updateFoodHandleSubmit = async ({
    name,
    price,
    stockStatus,
    description,
    img,
    ratings,
    _id,
  }) => {
    if (!name || !price || !stockStatus || !description || !img || !ratings) {
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "warning",
          message: "Please prov_e the all required fields to add a food",
        },
      });
      return;
    }
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch(`/api/food/update/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth-token": localStorage.getItem("admin-auth-token"),
        },
        body: JSON.stringify({
          name,
          price,
          stockStatus,
          description,
          img,
          ratings,
        }),
      });
      const data = await res.json();

      if (res.status === 200) {
        dispatch({
          type: UPDATE_FOOD_SUCCESS,
          payload: data.food,
        });
      }
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: res.status === 200 ? "success" : "error",
          message: data.message,
        },
      });
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  // Delete food by Admin
  methods.deleteFoodHandleSubmit = async (id) => {
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch(`/api/food/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth-token": localStorage.getItem("admin-auth-token"),
        },
      });
      const data = await res.json();

      if (res.status === 200) {
        dispatch({
          type: DELETE_FOOD_SUCCESS,
          payload: id,
        });
      }
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: res.status === 200 ? "success" : "error",
          message: data.message,
        },
      });
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };

  // Change Order Quantity By User
  methods.handleChangeOrderQuantity = (qty) => {
    dispatch({
      type: USER_CHANGE_FOOD_QUANTITY,
      payload: qty,
    });
  };
  // Food Order By User
  methods.handleSubmitOrderFood = async (
    { fullname, address, phone, email, food, quantity },
    history
  ) => {
    if (!fullname || !address || !phone || !email) {
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "warning",
          message:
            "Please provide all required fields to confirm the order of a food",
        },
      });
      return;
    }
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch("/api/order/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          address,
          phone,
          email,
          food,
          quantity,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        dispatch({
          type: USER_ORDER_CONFIRM_SUCCESS,
          payload: data.order,
        });
        history.push("/user/orders");
      }
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: res.status === 201 ? "success" : "error",
          message: data.message,
        },
      });
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  // Fetch user orders
  methods.fetchUserOrdersByEmail = async (email) => {
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch(`/api/order/user/all?email=${email}`, {
        methods: "GET",
      });
      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: FETCH_USER_ORDERS_SUCCESS,
          payload: data.orders,
        });
      }
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  // Delete order
  methods.handleClickDeletOrder = async (id) => {
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch(`/api/order/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: ORDER_DELETE_SUCCESS,
          payload: data.id,
        });
      }
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: res.status === 200 ? "success" : "error",
          message: data.message,
        },
      });
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  // Fetch all orders
  methods.fetchAllOrders = async (email) => {
    try {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: true,
      });
      const res = await fetch("/api/order/all", {
        method: "GET",
      });
      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: FETCH_ALL_ORDERS_SUCCESS,
          payload: data.orders,
        });
      }
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };
  //Change the status of the order by the admin, the admin may be rejecting or pending or delivering the order
  methods.changeOrderStatus = async (id, status) => {
    dispatch({
      type: SET_LOADING_STATUS,
      payload: true,
    });
    try {
      const res = await fetch(`/api/order/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth-token": localStorage.getItem("admin-auth-token"),
        },
        body: JSON.stringify({
          status,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: CHANGE_ORDER_STATUS_SUCCESS,
          payload: { id, status },
        });
        dispatch({
          type: APP_SET_ALERT_MESSAGE,
          payload: {
            status: "success",
            message: data.message,
          },
        });
      }
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } catch (e) {
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
      dispatch({
        type: APP_SET_ALERT_MESSAGE,
        payload: {
          status: "error",
          message: e.message,
        },
      });
    }
  };

  return methods;
};

export default main;
