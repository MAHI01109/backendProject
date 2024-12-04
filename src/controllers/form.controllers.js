import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { FormModel } from "../models/form.models.js";


const tandAData = asyncHandler(async (req, res) => {
    {
        try {
            // Extract data from the request body
            const formData = req.body;
            // Create a new instance of the FormModel
            const newForm = new FormModel({
                startDate: new Date(formData.startDate), // Ensure proper Date format
                endDate: new Date(formData.endDate), // Ensure proper Date format
                productionPerDayPerMachine: formData.productionPerDayPerMachine,
                totalOrderQuantity: formData.totalOrderQuantity,
                fabricSection: formData.fabricSection, // Directly assigning array
                isChinaFabricPresent: formData.isChinaFabricPresent,
                selectChinaFabric: formData.selectChinaFabric,
                accessories: formData.accessories,
                trims: formData.trims,
            });

            // Save the document to the database
            const savedForm = await newForm.save();

            // Respond with success
            return res.status(200).json(
                new ApiResponse(200, savedForm, "Form data saved successfully!")
            );
        } catch (error) {
            // Handle errors (e.g., validation errors)
            console.error("Error saving form data:", error);
            res.status(400).json(ApiError(400, error.message, "Failed to save form data."));
        }
    }
})

const getTAndAData = asyncHandler(async (req, res) => {
    try {
        // Fetch all documents from the Form collection
        const forms = await FormModel.find();
        // Respond with the retrieved data
        res.status(200).json(new ApiResponse(200, forms, "Forms retrieved successfully!"));
    } catch (error) {
        // Handle errors
        console.error("Error fetching forms:", error);
        res.status(500).json(new ApiError(500, error.message, "Failed to fetch forms."));
    }
})

export { tandAData, getTAndAData }
