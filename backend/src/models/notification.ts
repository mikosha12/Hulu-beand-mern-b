import mongoose, { Document, Schema } from 'mongoose';

// Define the Notification interface
export interface INotification extends Document {
  hotelId: mongoose.Types.ObjectId;
  status: 'Pending' | 'Approved' | 'Rejected';
  isRead: boolean;
  createdAt: Date;
}

// Define the Notification schema
const notificationSchema: Schema = new Schema({
  hotelId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hotel', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Static method to count notifications by status
notificationSchema.statics.countByStatus = async function(status: 'Pending' | 'Approved' | 'Rejected') {
  return this.countDocuments({ status });
};

// Static method to count unread notifications
notificationSchema.statics.countUnread = async function() {
  return this.countDocuments({ isRead: false });
};

// Define the Notification model using the schema and interface
const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;
