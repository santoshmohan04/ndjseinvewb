const dataSchema = new mongoose.Schema({
    gstin: {
        required: true,
        type: String
    },
    fileToUpload: {
        required: true,
        type: Array
    }
})