const DoorDesign = require('../models/doorDesignModel');

exports.getDoorDesign = async (req, res) => {
  try {
    const { designId } = req.params;
    const design = await DoorDesign.findById(designId);
    if (!design) {
      console.log(`Door design with ID ${designId} not found.`);
      return res.status(404).json({ message: 'Design not found' });
    }
    console.log(`Fetched door design with ID ${designId} successfully.`);
    res.json(design);
  } catch (error) {
    console.error('Error fetching door design:', error.message, error.stack);
    res.status(500).json({ message: 'Error fetching design' });
  }
};