import express from 'express'
import { deleteJob, getAllJobs, getSingleJob, getmyJobs, postJob, updateJob } from '../controller/jobController.js'
import { isAuthorized } from '../middlewares/auth.js'

const router=express.Router()
router.get("/getall",getAllJobs)
router.post("/post",isAuthorized, postJob)
router.get("/getmyjob",isAuthorized, getmyJobs)
router.put("/update/:id",isAuthorized, updateJob)
router.delete("/delete/:id",isAuthorized, deleteJob)
router.get("/:id",isAuthorized, getSingleJob )
export default router