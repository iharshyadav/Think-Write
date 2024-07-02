import mongoose, { Document, Model, Schema } from 'mongoose';
import { connectToDB } from './database';

// Define the interface for your document
interface AISchemaDocument extends Document {
  input1: string;
  input2: string;
  aiResponse: string;
  slug: string;
  user: string
}

// Define the Mongoose schema
const AISchema = new Schema<AISchemaDocument>({
  input1: {
    type: String,
    required: true,
  },
  input2: {
    type: String,
    required: true,
  },
  aiResponse: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  user : {
    type: String,
    required: true,
  }
},
{
  timestamps : true
});


const AISchemadetails = mongoose.models.AISchemadetails || mongoose.model("AISchemadetails",AISchema);

// Define the Mongoose model
// let AISchemaD: Model<AISchemaDocument>;
// try {
//   AISchemaD = mongoose.model<AISchemaDocument>('AISchemaD', AISchema);
// } catch (error) {
//   AISchemaD = mongoose.models.AISchemaDB as Model<AISchemaDocument>;
// }

export default AISchemadetails;
