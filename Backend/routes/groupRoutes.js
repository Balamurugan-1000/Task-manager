import express from 'express'

import groupController from '../controllers/groupController.js'
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router()

router.route(authenticate, authorizeAdmin, '/')
	.get(groupController.getAllGroups)
	.post(groupController.createGroup)
router.route(authenticate, authorizeAdmin, '/:id')
	.patch(groupController.updateGroup)
	.delete(groupController.deleteGroup)

router.route(authenticate, authorizeAdmin, '/:id')
	.get(groupController.getGroupById)

router.route(authenticate, authorizeAdmin, '/:id/tasks')
	.get(groupController.getGroupTasks)

router.route(authenticate, authorizeAdmin, '/:id/members/:userId')
	.delete(groupController.removeMemberFromGroup)

router.route(authenticate, authorizeAdmin, '/:id/members')
	.post(groupController.addMemberToGroup)



export default router