import mongoose, {Schema} from "mongoose";


// Schema for Color and Quantity
const colorAndQuantitySchema = new Schema({
  color: { type: String, required: [true, 'Color is required.'] },
  quantity: { type: Number, required: [true, 'Quantity is required.'] },
});

// Schema for Fabric Section
const fabricSectionSchema = new Schema({
  fabricName: { type: String, required: [true, 'Fabric name is required.'] },
  perPieceRequirement: {
    type: Number,
    required: [true, 'Per piece requirement is required.'],
  },
  chooseUnit: {
    type: String,
    enum: ['Metre', 'Kg'],
    required: [true, 'Unit is required.'],
  },
  processes: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'At least one process must be selected.',
    },
  },
  colorAndQuantity: [colorAndQuantitySchema],
  stagesToBeSkipped: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'At least one stage must be selected.',
    },
  },
});

// Main Schema
const formSchema = new Schema({
  startDate: { type: Date, required: [true, 'Start date is required.'] },
  endDate: { type: Date, required: [true, 'End date is required.'] },
  productionPerDayPerMachine: {
    type: Number,
    required: [true, 'Production per day per machine is required.'],
  },
  totalOrderQuantity: {
    type: Number,
    required: [true, 'Total order quantity is required.'],
  },
  fabricSection: [fabricSectionSchema],
  isChinaFabricPresent: {
    type: String,
    enum: ['Yes', 'No'],
    required: [true, 'China fabric presence is required.'],
  },
  selectChinaFabric: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'At least one selection must be made for China fabric.',
    },
  },
  accessories: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'At least one accessory must be selected.',
    },
  },
  trims: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'At least one trim must be selected.',
    },
  },
});

// Create Mongoose model
export const FormModel = mongoose.model('Form', formSchema);
