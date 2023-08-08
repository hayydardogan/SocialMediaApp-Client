<script setup>
import Navbar from '../components/Navbar.vue'
import moment from 'moment'
</script>

<template>
    <Navbar />
    <section class="h-100 gradient-custom-2">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col ">
                    <div class="card">
                        <div class="rounded-top text-white d-flex flex-row"
                            :style="{ backgroundImage: `url(${userInfo.userCoverImage})`, height: '200px', backgroundSize: 'cover' }">
                            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                                <img :src="userInfo.userImage" alt="Generic placeholder image"
                                    class="img-fluid img-thumbnail mt-4 mb-2" style="width: 150px; z-index: 1">
                                <RouterLink v-if="userInfo.userNick == activeUser.userNick" to="/Settings" type="button"
                                    class="btn btn-outline-success" data-mdb-ripple-color="dark" style="z-index: 1;">
                                    <i class="fa-solid fa-gear"></i>
                                    Ayarlar
                                </RouterLink>
                                <button id="followButton" v-else type="button" class="btn btn-outline-success"
                                    data-mdb-ripple-color="dark" style="z-index: 1;"
                                    @click="followRelation ? followUser() : unfollowUser()">

                                </button>
                            </div>
                            <div class="ms-3" style="margin-top: 100px; display: flex; flex-direction: column;">
                                <div>
                                    <h5 class="badge text-bg-light border" style="font-size: 10pt;">{{ userInfo.userName }}
                                        {{ userInfo.userSurname }}</h5>
                                </div>
                                <div>
                                    <p class="badge text-bg-light border" style="font-size: 9pt;">@{{ userInfo.userNick }}
                                    </p>
                                </div>
                                <div>
                                    <p class="badge text-bg-light border" style="font-size: 8pt;">{{ userInfo.userBiography
                                    }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 text-black" style="background-color: #f8f9fa;">
                            <div class="d-flex justify-content-end text-center py-1">
                                <div>
                                    <p class="mb-1 h5">{{ posts.length }}</p>
                                    <p class="small text-muted mb-0">Paylaşım</p>
                                </div>
                                <div class="px-3">
                                    <p class="mb-1 h5"> {{ userInfo.userFollowerCount }}</p>
                                    <p class="small text-muted mb-0">Takipçi</p>
                                </div>
                                <div>
                                    <p class="mb-1 h5">{{ userInfo.userFollowingCount }}</p>
                                    <p class="small text-muted mb-0">Takip Edilen</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-4 text-black">

                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <p class="lead fw-normal mb-0">Son paylaşımlar</p>
                            </div>
                            <div v-if="posts.length <= 0">
                                <div class="alert alert-info">Henüz hiç paylaşım yapmadın.</div>
                            </div>
                            <div v-else class="row g-2">
                                <div v-for="x in posts" class="card bg-light mb-3">
                                    <div class="card-header d-flex justify-content-between">
                                        <div style="display: flex; gap: 15px; align-items: center;">
                                            <img :src="x.postOwner.userImage" class="rounded-circle" style="width: 30px;" />
                                            <span>{{ x.postOwner.userName }} {{ x.postOwner.userSurname }}</span>
                                        </div>
                                        <div style="display: flex;align-items: center;">
                                            <span><i class="fa-regular fa-clock"></i> {{
                                                moment(x.postDate).format("DD/MM/YYYY HH:mm") }}</span>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">{{ x.postContent }}</p>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between">
                                        <div class="post-info d-flex" style="gap: 15px; align-items: center;">
                                            <span><i class="fa-solid fa-heart text-danger"></i> {{ getLikeCount(x._id)
                                            }}</span>
                                            <span><i class="fa-solid fa-comment text-primary"></i> {{ getCommentCount(x.id)
                                            }}</span>
                                        </div>
                                        <div class="show-post">
                                            <RouterLink :to="'/PostDetails/' + x._id"
                                                class="btn btn-primary btn-sm text-white"><i class="fa-regular fa-eye"></i>
                                                Paylaşımı
                                                gör </RouterLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            userInfo: {
                userName: null,
                userSurname: null,
                userEmail: null,
                userNick: null,
                userImage: null,
                userCoverImage: null,
                userID: null,
                userBiography: null,
                userFollowerCount: 0, // Takipçi sayısı
                userFollowingCount: 0 // Takip edilen syısı
            },
            url: "http://localhost:3000/api/",
            posts: {},
            activeUser: {
                userName: null,
                userSurname: null,
                userID: null,
                userNick: null
            },
            likeCount: 0,
            commentCount: 0,
            followRelation: false
        }
    },
    methods: {
        getUserInfoByNick() {
            let nick = this.$route.params.nick;
            axios.get(this.url + "getUserInfoByNick/" + nick).then(res => {
                if (res.status === 200) {
                    this.userInfo.userName = res.data.user.userName,
                        this.userInfo.userSurname = res.data.user.userSurname,
                        this.userInfo.userEmail = res.data.user.userEmail,
                        this.userInfo.userNick = res.data.user.userNick,
                        this.userInfo.userImage = res.data.user.userImage,
                        this.userInfo.userID = res.data.user._id,
                        this.userInfo.userBiography = res.data.user.userBiography
                    this.userInfo.userCoverImage = res.data.user.userCoverImage

                    this.getPosts();
                }
            }).catch(err => {
                console.log("There is an error  :" + err.message);
            })
        },
        getFollowCount() {
            axios.get(this.url + "getFollowCount" + "/" + this.activeUser.userID).then(res => {
                if (res.status === 200) {
                    this.userInfo.userFollowerCount = res.data.count.followerCount;
                    this.userInfo.userFollowingCount = res.data.count.followingCount;

                    this.getRelation();
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        getUserInfo() {
            axios.get(this.url + "getUserInfo", { headers: { token: localStorage.getItem("token") } }).then(res => {
                if (res.status === 200) {
                    this.activeUser.userName = res.data.user.userName
                    this.activeUser.userSurname = res.data.user.userSurname
                    this.activeUser.userID = res.data.user._id,
                        this.activeUser.userNick = res.data.user.userNick

                    this.getFollowCount();

                }

                if (res.status === 401) {
                    console.log("Token geçersiz veya süresi dolmuş.");
                    this.$router.push("/Login");
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })



        },
        getPosts() {
            let userID = this.userInfo.userID;
            axios.get(this.url + "getMyPosts" + "/" + userID).then(res => {
                this.posts = res.data.myPosts;
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        getLikeCount(post_id) {
            axios.get(this.url + "getLikeCount" + "/" + post_id).then(res => {
                return res.data.count;
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        getCommentCount(post_id) {

        },
        getRelation() {
            if (this.userInfo.userNick != this.activeUser.userNick) {
                axios.get(this.url + "/getFollowerRelation" + "/" + this.activeUser.userID + "&" + this.userInfo.userID).then(res => {
                    if (res.status === 200 && res.data.result == true) {
                        let item = document.getElementById("followButton");
                        item.innerHTML = '<i class="fa-solid fa-xmark"></i> Takibi Bırak';
                        this.followRelation = false;
                    } else {
                        let item = document.getElementById("followButton");
                        item.innerHTML = '<i class="fa-solid fa-plus"></i> Takip Et';
                        this.followRelation = true;
                    }
                }).catch(err => {
                    console.log("There is an error : " + err.message);
                })
            }

        },
        followUser() {
            axios.post(this.url + "addFollowerRelation" + "/" + this.activeUser.userID + "&" + this.userInfo.userID).then(res => {
                if (res.status === 200 && res.data.result == true) {
                    this.followRelation = false;
                    this.getRelation();
                }
            })
        },
        unfollowUser() {
            axios.delete(this.url + "removeFollowerRelation" + "/" + this.activeUser.userID + "&" + this.userInfo.userID).then(res => {
                if (res.status === 200 && res.data.result == true) {
                    this.followRelation = true;
                    this.getRelation();
                }
            })
        }
    },
    created() {
        this.getUserInfo();
        this.getUserInfoByNick();

    }
}
</script>