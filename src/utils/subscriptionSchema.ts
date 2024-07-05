import mongoose, { Document, Schema } from 'mongoose';


interface AISchemaDocument extends Document {
  email: string;
  userName: string;
  active: boolean;
  paymentId: string,
}

const subscriptionSchema = new Schema<AISchemaDocument>({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  paymentId : {
    type: String,
    required: true,
  },
},
{
  timestamps : true
});


const SaveSubscriptionDetails = mongoose.models.SaveSubscriptionDetails || mongoose.model("SaveSubscriptionDetails",subscriptionSchema);

// Define the Mongoose model
// let AISchemaD: Model<AISchemaDocument>;
// try {
//   AISchemaD = mongoose.model<AISchemaDocument>('AISchemaD', AISchema);
// } catch (error) {
//   AISchemaD = mongoose.models.AISchemaDB as Model<AISchemaDocument>;
// }

export default SaveSubscriptionDetails;
