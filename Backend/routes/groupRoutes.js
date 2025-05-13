import express from 'express'

import groupController from '../controllers/groupController.js'
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router()

router.route('/:company')
	.get(authenticate, authorizeAdmin, groupController.getAllGroups)
	.post(authenticate, authorizeAdmin, groupController.createGroup)

router.route('/:id')
	.delete(authenticate, authorizeAdmin, groupController.deleteGroup)

router.route('/addMember/:id')
	.patch(authenticate, authorizeAdmin, groupController.addMemberToGroup)
router.route('/removeMember/:id')
	.patch(authenticate, authorizeAdmin, groupController.removeMemberFromGroup)


router.route("/user/:id")
	.get(authenticate, groupController.getGroupByUser)
export default router