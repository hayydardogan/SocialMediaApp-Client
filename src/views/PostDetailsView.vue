<script setup>
import Navbar from '../components/Navbar.vue'
import moment from 'moment'
</script>
<template>
    <div class="vl-parent">
        <loading v-model:active="isLoading" loader="bars" color="#198754" />

    </div>
    <Navbar />
    <div class="container mt-5">
        <div class="card bg-light mb-3">
            <div class="card-header d-flex justify-content-between">
                <div style="display: flex; gap: 15px; align-items: center;">
                    <RouterLink :to="'/Profile/' + postDetails.postOwnerNick">
                        <img :src="postDetails.postOwnerImage" class="rounded-circle" style="width: 30px;" />
                    </RouterLink>
                    <RouterLink class="text-decoration-none text-dark" :to="'/Profile/' + postDetails.postOwnerNick">{{
                        postDetails.postOwnerName }} {{ postDetails.postOwnerSurname }} </RouterLink>
                </div>
                <div v-if="(postDetails.postOwnerID === userID)" style="display: flex;align-items: center; gap: 25px;">
                    <span class="badge rounded-pill text-bg-dark"><i class="fa-regular fa-clock"></i> {{
                        moment(postDetails.postDate).format("DD/MM/YYYY HH:mm") }} </span>

                    <button class="btn btn-sm btn-danger" @click="deletePost(postDetails.postID)"><i
                            class="fa-regular fa-trash-can"></i></button>
                </div>
                <div v-else style="display: flex;align-items: center;">
                    <span class="badge rounded-pill text-bg-dark"><i class="fa-regular fa-clock"></i> {{
                        moment(postDetails.postDate).format("DD/MM/YYYY HH:mm") }}</span>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text">{{ postDetails.postContent }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <div class="post-info d-flex" style="gap: 15px; align-items: center;">
                    <span><i class="fa-solid fa-heart text-danger"></i> {{ postDetails.postLikeCount }}</span>
                    <span><i class="fa-solid fa-comment text-primary"></i> {{ postDetails.postCommentCount }}</span>
                </div>
                <div>
                    <button class="btn btn-success btn-sm" @click="likeStatus ? dislikePost() : likePost()" id="likeButton"></button>
                </div>
            </div>
        </div>

        <div class="toComment form-outline mb-3" style="position: relative;">
            <textarea placeholder="Yorum yap" class="form-control" id="commentTextArea" style="width: 100%; resize: none;"
                v-model="commentContent"></textarea>
            <button @click="toComment()" class="btn btn-success btn-sm"
                style="position: absolute; right: 5px; bottom: 5px;">Yorum yap</button>
        </div>

        <div class="row d-flex justify-content-center mb-5">
            <div>
                <div v-if="comments.length <= 0" class="alert alert-info">Bu gönderiye henüz hiç yorum yapılmamış.</div>
                <div v-else class="card text-dark">
                    <div class="card-body" v-for="x in comments">
                        <div class="d-flex flex-start">
                            <img class="rounded-circle shadow-1-strong me-3" :src="x.commentOwner.userImage" width="60"
                                height="60" />
                            <div>
                                <div class="d-flex gap-2">
                                    <div class="d-flex gap-2">
                                        <h6 class="fw-bold mb-1">{{ x.commentOwner.userName }} {{ x.commentOwner.userSurname
                                        }} </h6>
                                        <p class="mb-0 badge text-bg-success" style="height: 25px;">{{
                                            moment(x.commentDate).format("DD/MM/YYYY HH:mm") }}</p>
                                        <button
                                            v-if="(x.commentOwner._id === userID) || (postDetails.postOwnerID === userID)"
                                            @click="deleteComment(x._id)" class="btn btn-sm btn-danger"><i
                                                class="fa-regular fa-trash-can"></i></button>
                                    </div>

                                </div>
                                <p class="mb-0">{{ x.commentContent }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
export default {

    data() {
        return {
            postID: this.$route.params.id,
            userID: null,
            postDetails: {
                postID: null,
                postOwnerID: null,
                postOwnerName: null,
                postOwnerSurname: null,
                postOwnerNick: null,
                postOwnerImage: null,
                postDate: null,
                postContent: null,
                postLikeCount: null,
                postCommentCount: null
            },
            url: "http://localhost:3000/api/",
            commentContent: null,
            comments: {},
            isLoading: false,
            fullPage: true,
            likeStatus: null
        }
    },
    created() {
        this.getPostInfo();


    },
    methods: {
        getComments() {
            axios.get(this.url + "getComment/" + this.postID).then(res => {
                if (res.status === 200) {
                    this.comments = res.data;
                    this.getLikeStatus();
                    
                }
            }).catch(err => {
                console.log("There is an error." + err.message);
            })
        },
        toComment() {
            const newComment = {
                commentOwner: this.userID,
                commentPost: this.postID,
                commentContent: this.commentContent
            }

            axios.post(this.url + "toComment", { newComment: newComment }).then(res => {
                if (res.status === 200) {
                    this.getComments();
                    this.getCommentCount();
                    this.commentContent = "";
                }
            }).catch(err => {
                console.log("There is an error." + err.message);
            })
        },
        getPostInfo() {
            this.isLoading = true;
            axios.get(this.url + "getPostInfo" + "/" + this.postID).then(
                res => {
                    if (res.status === 200) {
                        this.postDetails.postOwnerName = res.data.post[0].postOwner.userName,
                            this.postDetails.postOwnerSurname = res.data.post[0].postOwner.userSurname,
                            this.postDetails.postOwnerImage = res.data.post[0].postOwner.userImage
                        this.postDetails.postContent = res.data.post[0].postContent,
                            this.postDetails.postDate = res.data.post[0].postDate,
                            this.postDetails.postOwnerID = res.data.post[0].postOwner._id,
                            this.postDetails.postOwnerNick = res.data.post[0].postOwner.userNick,
                            this.postDetails.postID = res.data.post[0]._id;
                        this.getUserInfo();
                    }
                }
            ).catch(err => {
                console.log("There is an error." + err.message);
            })

            // Post beğeni sayısını çekme
            this.getLikeCount();


        },
        getLikeCount() {
            axios.get(this.url + "getLikeCount" + "/" + this.postID).then(res => {
                if (res.status === 200) {
                    this.postDetails.postLikeCount = res.data.count;
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })

            // Post yorum sayısını çekme
            this.getCommentCount();
        },
        getCommentCount() {
            axios.get(this.url + "getCommentCount" + "/" + this.postID).then(res => {
                if (res.status === 200) {
                    this.postDetails.postCommentCount = res.data.count;

                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        getUserInfo() {
            axios.get(this.url + "getUserInfo", { headers: { token: localStorage.getItem("token") } }).then(res => {
                if (res.status === 200) {
                    this.userID = res.data.user._id
                    this.getComments();
                }

                if (res.status === 401) {
                    console.log("Token geçersiz veya süresi dolmuş.");
                    this.$router.push("/Login");
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        deletePost(post_id) {
            axios.post(this.url + "deletePost" + "/" + post_id).then(res => {
                if (res.status === 200) {
                    this.$router.push("/");
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        async deleteComment(comment_id) {
            await axios.put(this.url + "deleteComment" + "/" + comment_id).then(res => {
                if (res.status === 200) {
                    this.getComments();
                    this.getCommentCount();
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        likePost() {
            let data = {
                postID: this.postID,
                userID: this.userID
            }
            axios.post(this.url + "/likePost", { data: data }).then(res => {
                if (res.status === 200) {
                    this.likeStatus = true
                    this.getLikeStatus();
                    this.getLikeCount();
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        dislikePost() {
            let data = {
                postID: this.postID,
                userID: this.userID
            }
            axios.delete(this.url + "/dislikePost" + "/" + this.userID + "&" + this.postID).then(res => {
                if (res.status === 200) {
                    this.likeStatus = false
                    this.getLikeStatus();
                    this.getLikeCount();
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        getLikeStatus() {
            axios.get(this.url + "/getLikeStatus" + "/" + this.userID + "&" + this.postID).then(res => {
                if (res.status === 200 && res.data.result == true) {
                    let item = document.getElementById("likeButton");
                    item.innerHTML = '<i class="fa-solid fa-heart"></i> Beğenmekten Vazgeç';
                    this.likeStatus = true;
                }
                else {
                    let item = document.getElementById("likeButton");
                    item.innerHTML = '<i class="fa-solid fa-heart"></i> Beğen';
                    this.likeStatus = false;
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
            this.isLoading = false;
        }
    }
}

</script>