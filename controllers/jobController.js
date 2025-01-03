const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            price, 
            stockQuantity, 
            category, 
            sku, 
            tags, 
            discount, 
            launchDate, 
            warrantyInfo, 
            image 
        } = req.body;
        const formattedTags = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()) : []);

        //cannot add two jobs with the same sku
        const existingJob = await Job.findOne({ sku });
        if (existingJob) {
            return res.status(400).json({ message: 'Job with the same SKU already exists' });
        }

        // Create a new Job object with all the provided data
        const newJob = new Job({
            title, 
            description, 
            price, 
            stockQuantity, 
            category, 
            sku, 
            tags: tags ? formattedTags: [], // Default to empty array if tags are not provided
            discount: discount || 0, // Default to 0 if discount is not provided
            launchDate: launchDate || new Date(), // Default to current date if launchDate is not provided
            warrantyInfo: warrantyInfo || '', // Default to empty string if warrantyInfo is not provided
            image: image || null, // Default to null if image is not provided
            postedBy: req.user.id
        });

        if (!newJob) {
            return res.status(400).json({ message: 'Invalid job data' });
        }
        

        // Save the job to the database
        await newJob.save();

        // Respond with the newly created job data
        res.status(201).json(newJob);
    } catch (error) {
        // Handle errors and send a response
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const userId = req.user.id;
       const jobs = await Job.find({ postedBy: userId });
        if (!jobs) {
            return res.status(404).json({ message: 'No jobs found for this Org' });
        }
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        if (!jobs) {
            return res.status(404).json({ message: 'No jobs found' });
        }
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

exports.deleteJob = async (req, res) => {
    try {
        console.log(req.params);
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        if (job.postedBy.toString() !== req.user.id) {
            console.log(job.postedBy.toString(), req.user.id);
            return res.status(403).json({ message: 'Unauthorized' });
        }
        console.log('deleting job',job);
        await job.deleteOne();
        console.log('deleted job',job);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.editJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.id;

        // Fetch the job to check ownership
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if the user is authorized to edit the job
        if (job.postedBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to edit this job' });
        }

        const {
            title,
            description,
            price,
            stockQuantity,
            category,
            sku,
            tags,
            discount,
            launchDate,
            warrantyInfo,
            image
        } = req.body;

        // Format the tags if provided
        const formattedTags = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()) : []);

        // Update the job details
        job.title = title || job.title;
        job.description = description || job.description;
        job.price = price || job.price;
        job.stockQuantity = stockQuantity || job.stockQuantity;
        job.category = category || job.category;
        job.sku = sku || job.sku;
        job.tags = tags ? formattedTags : job.tags;
        job.discount = discount || job.discount;
        job.launchDate = launchDate || job.launchDate;
        job.warrantyInfo = warrantyInfo || job.warrantyInfo;
        job.image = image || job.image;

        // Save the updated job to the database
        const updatedJob = await job.save();

        // Respond with the updated job data
        res.status(200).json(updatedJob);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
