import {
  UserType,
  HotelType,
  NotificationTypee,
  RoomType,
} from "../../backend/shared/types";
import { RegisterFormData } from "../src/components/AddUser"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export interface SignInFormData {
  email: string;
  password: string;
}

export const fetchAllUsers = async (): Promise<UserType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/users/users`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching users");
  }

  return response.json();
};

export const updateUser = async (user: UserType): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/users/${user.email}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error updating user");
  }
};

export const fetchPendingHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/pending-hotels`, {});

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error deleting user");
  }
};
// hotels

export const fetchAllHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchHotelCount = async (): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/count`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotel count");
  }

  const data = await response.json();
  return data.totalHotels; // Access the count directly from the response
};

// Update a hotel
export const updateHotel = async (
  hotelId: string,
  updatedHotel: HotelType
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/edit/${hotelId}`,
    {
      method: "PUT", // Use PUT for updating
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(updatedHotel),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error updating hotel");
  }
};

export const deleteHotel = async (hotelId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error deleting hotel");
  }
};

// admin add hotel
export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotel details");
  }

  return response.json();
};

// pending hotels

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

// Fetch notifications for the admin
export const fetchNotifications = async (): Promise<NotificationTypee[]> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching notifications");
  }

  return response.json();
};

// Mark a specific notification as read
export const markNotificationAsRead = async (
  notificationId: string
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/api/notifications/${notificationId}/read`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error marking notification as read");
  }
};

// fetch by id

export const fetchUserById = async (userId: string): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching user details");
  }

  return response.json();
};
// admin hotel fetch

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};
/// trasaction
// Fetch all transactions
export const fetchAllTransactions = async () => {
  const response = await fetch(`${API_BASE_URL}/api/transactions`, {
    method: "GET",
  }); 

  if (!response.ok) {
    throw new Error("Error fetching transactions");
  }

  return response.json();
};

// Fetch a specific transaction by ID

// Delete a transaction
export const deleteTransaction = async (
  transactionId: string
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/api/transactions/${transactionId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error deleting transaction");
  }
};
// rooms

export const fetchRoomById = async (roomId: string): Promise<RoomType> => {
  const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}`);
  if (!response.ok) {
    throw new Error("Error fetching Room");
  }

  return response.json();
};

export const fetchRoomsByHotelId = async (hotelId: string): Promise<RoomType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/rooms/hotels/${hotelId}/rooms`);
  if (!response.ok) {
    throw new Error("Error fetching Rooms");
  }

  return response.json();
};
export const fetchAllRooms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rooms/rooms/hotel`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Error fetching rooms');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch all rooms failed:', error);
    throw error; // Re-throw the error after logging
  }
};
export const updateRoom = async (id: string, roomData: Partial<RoomType>) => {
  const response = await fetch(`${API_BASE_URL}/api/rooms/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roomData),
  });
  if (!response.ok) {
    throw new Error('Error updating room');
  }
  return response.json();
};

export const deleteRoom = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/rooms/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting room');
  }
  return response.json();
};

// admin register
export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register/admin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
export const deactivateAccount = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/deactivate`, {
    method: "PUT",
    credentials: "include", // Ensures cookies (auth token) are included
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};
export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login/admin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body; // Ensure this contains `isAdmin`
};