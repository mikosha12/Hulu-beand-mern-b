import { v4 as uuidv4 } from "uuid"; // Import UUID library

export const generateTicketNumber = (): string => {
  const uuid = uuidv4(); // Generate a UUID
  const shortId = uuid.slice(0, 8); // Take the first 12 characters of the UUID
  const timestamp = Date.now().toString(16).padStart(8, "0"); // Get current timestamp as 8 hex digits
  return `HULU-${timestamp}${shortId}`; // Combine with prefix, timestamp, and UUID segment
};
