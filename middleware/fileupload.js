import multer from "multer";
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
     cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})
const file =upload.single('file')
export default file