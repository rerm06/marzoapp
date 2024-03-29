const Workspace = require('../models/workspaceModel');

exports.createWorkspace = async (req, res) => {
    try {
        const { members, sharedDocuments, mode } = req.body;
        const newWorkspace = new Workspace({ members, sharedDocuments, mode });
        const savedWorkspace = await newWorkspace.save();
        console.log(`Workspace created successfully: ${savedWorkspace._id}`);
        res.status(201).json(savedWorkspace);
    } catch (error) {
        console.error(`Error creating workspace: ${error.message}`, error);
        res.status(500).json({ message: 'Failed to create workspace', error: error.message });
    }
};

exports.listWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find({}).populate('members').populate('sharedDocuments');
        console.log(`Retrieved ${workspaces.length} workspaces successfully`);
        res.status(200).json(workspaces);
    } catch (error) {
        console.error(`Error listing workspaces: ${error.message}`, error);
        res.status(500).json({ message: 'Failed to list workspaces', error: error.message });
    }
};

exports.deleteWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const deletedWorkspace = await Workspace.findByIdAndDelete(workspaceId);
        if (!deletedWorkspace) {
            console.log(`Workspace not found: ${workspaceId}`);
            return res.status(404).json({ message: 'Workspace not found' });
        }
        console.log(`Workspace deleted successfully: ${workspaceId}`);
        res.status(200).json({ message: 'Workspace deleted successfully' });
    } catch (error) {
        console.error(`Error deleting workspace: ${error.message}`, error);
        res.status(500).json({ message: 'Failed to delete workspace', error: error.message });
    }
};