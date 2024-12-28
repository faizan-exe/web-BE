const roles = {
    woman: ['seeJobs', 'seeCourses', 'seeMentors'],
    mentor: ['seeWomen',],
    org: ['seeWomen', 'seeMentors', 'putUpJobs']
};
module.exports = roles;