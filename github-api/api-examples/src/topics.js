const axios = require('axios');
const assignAll = require('lodash/fp/assignAll');

const Constant = require('./constant');
const PER_PAGE = 42;
const token = Constant.ACCESS_TOKEN;

const github = axios.create({
    baseURL: 'https://api.github.com/',
});
// github.defaults.headers.common.Authorization = `token ${token}`;

const searchTopics = (topic, type) => {
    return new Promise((resolve, reject) => {
        github
            .get(`/search/topics?q=${topic}+is:${type}`, {
                headers: {
                    Accept: 'application/vnd.github.mercy-preview+json',
                },
            })
            .then(res => {
                if (res.status !== 200) {
                    console.log(res);
                    reject(res);
                }
                const topics = res.data;
                console.log('topics: ', topics);
                resolve(topics);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

const topic = 'javascript';
const type = 'curated';
searchTopics(topic, type);