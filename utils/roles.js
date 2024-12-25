const roles = {
    woman: ['seeJobs', 'seeCourses', 'seeMentors'],
    mentor: ['seeWomen', 'putUpJobs'],
    org: ['seeWomen', 'seeMentors', 'putUpJobs']
};
module.exports = roles;