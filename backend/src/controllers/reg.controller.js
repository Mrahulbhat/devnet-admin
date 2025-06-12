import Registration from '../models/reg.model.js'

export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.status(200).json(registrations);
    }
    catch (error) {
        console.log("Error in getAllRegistrations: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}