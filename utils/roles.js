const roles = {
    woman: ['seeJobs', 'seeCourses', 'seeMentors'],
    mentor: ['seeWomen',],
    org: ['seeWomen', 'seeMentors', 'putUpJobs', 'seeJobs']
};
module.exports = roles;