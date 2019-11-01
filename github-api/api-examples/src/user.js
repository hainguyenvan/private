const axios = require('axios');
const assignAll = require('lodash/fp/assignAll');

const Constant = require('./constant');
const PER_PAGE = 42;
const token = Constant.ACCESS_TOKEN;

const github = axios.create({
    baseURL: 'https://api.github.com/',
});
github.defaults.headers.common.Authorization = `token ${token}`;

const getProfile = username => {
    return new Promise((resolve, reject) => {
        github
            .get(`/users/${username}`)
            .then(res => {
                if (res.status !== 200) {
                    console.log(res);
                    reject(res);
                }
                const profile = res.data;
                console.log('profile: ', profile);
                resolve(profile);
            })
            .catch(err => {
                console.log('err: ', err);
                reject(err);
            });
    });
};

const searchUsersByName = name => {
    return new Promise((resolve, reject) => {
        const defaultParams = {
            per_page: PER_PAGE,
        };
        github
            .get(`/search/users?q=${name}`, {
                params: assignAll([defaultParams]),
            })
            .then(res => {
                if (res.status !== 200) {
                    console.log(res);
                    reject(res);
                }
                const users = res.data;
                console.log('users: ', res.data);
                resolve(users);
            })
            .catch(err => {
                console.log('err: ', err);
                reject(err);
            });
    });
};

const username = 'hai213k57@gmail.com';
// getProfile(username);
const name = 'hai';
searchUsersByName(name);