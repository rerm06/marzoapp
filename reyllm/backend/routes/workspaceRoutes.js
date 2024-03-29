const express = require('express');
const { createWorkspace, listWorkspaces, deleteWorkspace } = require('../controllers/workspaceController');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const result = await createWorkspace(req);
        console.log(`Workspace created successfully: ${result._id}`);
        res.status(201).json(result);
    } catch (error) {
        console.error(`Error creating workspace: ${error}`, error);
        res.status(500).json({ message: 'Failed to create workspace', error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const workspaces = await listWorkspaces(req);
        console.log(`Retrieved ${workspaces.length} workspaces successfully`);
        res.status(200).json(workspaces);
    } catch (error) {
        console.error(`Error listing workspaces: ${error}`, error);
        res.status(500).json({ message: 'Failed to list workspaces', error: error.message });
    }
});

router.delete('/delete/:workspaceId', async (req, res) => {
    try {
        const { workspaceId } = req.params;
        await deleteWorkspace(workspaceId);
        console.log(`Workspace deleted successfully: ${workspaceId}`);
        res.status(200).json({ message: 'Workspace deleted successfully' });
    } catch (error) {
        console.error(`Error deleting workspace: ${error}`, error);
        res.status(500).json({ message: 'Failed to delete workspace', error: error.message });
    }
});

module.exports = router;