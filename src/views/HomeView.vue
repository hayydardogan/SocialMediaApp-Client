<script setup>

import { RouterLink } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import moment from 'moment'
</script>

<style>
/* The actual timeline (the vertical ruler) */
.main-timeline {
    position: relative;
}

/* The actual timeline (the vertical ruler) */
.main-timeline::after {
    content: "";
    position: absolute;
    width: 6px;
    background-color: #939597;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
}

/* Container around content */
.timeline {
    position: relative;
    background-color: inherit;
    width: 50%;
}

/* The circles on the timeline */
.timeline::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 25px;
    right: -13px;
    background-color: #939597;
    border: 5px solid #f5df4d;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
}

/* Place the container to the left */
.left {
    padding: 0px 40px 20px 0px;
    left: 0;
}

/* Place the container to the right */
.right {
    padding: 0px 0px 20px 40px;
    left: 50%;
}

/* Add arrows to the left container (pointing right) */
.left::before {
    content: " ";
    position: absolute;
    top: 18px;
    z-index: 1;
    right: 30px;
    border: medium solid white;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent white;
}

/* Add arrows to the right container (pointing left) */
.right::before {
    content: " ";
    position: absolute;
    top: 18px;
    z-index: 1;
    left: 30px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
    left: -12px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {

    /* Place the timelime to the left */
    .main-timeline::after {
        left: 31px;
    }

    /* Full-width containers */
    .timeline {
        width: 100%;
        padding-left: 70px;
        padding-right: 25px;
    }

    /* Make sure that all arrows are pointing leftwards */
    .timeline::before {
        left: 60px;
        border: medium solid white;
        border-width: 10px 10px 10px 0;
        border-color: transparent white transparent transparent;
    }

    /* Make sure all circles are at the same spot */
    .left::after,
    .right::after {
        left: 18px;
    }

    .left::before {
        right: auto;
    }

    /* Make all right containers behave like the left ones */
    .right {
        left: 0%;
    }
}
</style>
<template >
    <Navbar />



    <section style="background-color: #F0F2F5; height: 100vh;">

        <div class="container py-5" >
            <div class="new-post d-flex justify-content-end mb-3">
                <!-- Yeni gönderi modal açma butonu -->
                <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#newPostModal">
                    <i class="fa-solid fa-plus" style="margin-right: 15px;"></i>Yeni Gönderi
                </button>

                <!-- Yeni Gönderi Modal -->
                <div class="modal fade" id="newPostModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5 text-sm" id="exampleModalLabel">Yeni Gönderi</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="d-flex flex-row align-items-center mb-4">
                                    <div class="form-outline flex-fill mb-0">
                                        <textarea type="text" class="form-control" placeholder="Bugün nasıl hissediyorsun?"
                                            style="resize: none;" rows="3" v-model="newPost.postContent" />
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm"
                                    data-bs-dismiss="modal">Vazgeç</button>
                                <button type="button" class="btn btn-primary btn-sm" @click="sharePost()">Paylaş</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-timeline">
                <div v-for="(x, index) in posts" class="timeline" :class="{ left: index % 2 == 0, right: index % 2 != 0 }">
                    <div class="card">
                        <div class="card-body p-2 d-flex justify-content-between" style="border-bottom: 1px solid #d9e1ec;">
                            <div style="display: flex; gap: 15px; align-items: center;">
                                <RouterLink :to="'/Profile/' + x.postOwner.userNick"><img :src="x.postOwner.userImage"
                                        class="rounded-circle" style="width: 30px;" /></RouterLink>
                                <RouterLink class="text-decoration-none text-dark" :to="'/Profile/' + x.postOwner.userNick">
                                    <strong class="font-bold">{{
                                        x.postOwner.userName }} {{ x.postOwner.userSurname }}</strong>
                                </RouterLink>
                            </div>
                            <div style="display: flex;align-items: center;">
                                <span><i class="fa-regular fa-clock"></i> {{ moment(x.postDate).format("DD/MM/YYYY HH:mm")
                                }}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">{{ x.postContent }}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <div class="post-info d-flex" style="gap: 15px; align-items: center;">
                                <span><i class="fa-solid fa-heart text-danger"></i> 17</span>
                                <span><i class="fa-solid fa-comment text-primary"></i> 5</span>
                            </div>
                            <div class="show-post">
                                <RouterLink :to="{ name: 'postdetailswithid', params: { id: x._id } }"
                                    class="btn btn-primary btn-sm text-white"><i class="fa-regular fa-eye"></i> Paylaşımı
                                    gör </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- <div class="container mt-5">

        <div class="card bg-light mb-3" v-for="x in posts">
            <div class="card-header d-flex justify-content-between">
                <div style="display: flex; gap: 15px; align-items: center;">
                    <RouterLink :to="'/Profile/' + x.postOwner.userNick"><img :src="x.postOwner.userImage"
                            class="rounded-circle" style="width: 30px;" /></RouterLink>
                    <RouterLink class="text-decoration-none text-dark" :to="'/Profile/' + x.postOwner.userNick"><span>{{
                        x.postOwner.userName }} {{ x.postOwner.userSurname }}</span></RouterLink>
                </div>
                <div style="display: flex;align-items: center;">
                    <span><i class="fa-regular fa-clock"></i> {{ moment(x.postDate).format("DD/MM/YYYY HH:mm") }}</span>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text">{{ x.postContent }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <div class="post-info d-flex" style="gap: 15px; align-items: center;">
                    <span><i class="fa-solid fa-heart"></i> 17</span>
                    <span><i class="fa-solid fa-comment"></i> 5</span>
                </div>
                <div class="show-post">
                    <RouterLink :to="{ name: 'postdetailswithid', params: { id: x._id } }"
                        class="btn btn-primary btn-sm text-white"><i class="fa-regular fa-eye"></i> Paylaşımı
                        gör </RouterLink>
                </div>
            </div>
        </div>

    </div> -->
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            url: "http://localhost:3000/api/",
            newPost: {
                postContent: null,
                postOwner: null,
            },
            userID: null,
            posts: {}
        }
    },
    created() {
        this.getPosts();
        this.getUserInfo();
    },
    methods: {
        sharePost() {
            this.newPost.postOwner = this.userID;

            axios.post(this.url + "addNewPost", { newPost: this.newPost }).then(res => {
                if (res.status === 200) {
                    $('#newPostModal').modal('hide');
                    this.$router.push("/PostDetails/" + res.data.post._id);
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        getPosts() {
            axios.get(this.url + "getPosts").then(res => {
                if (res.status === 200) {
                    this.posts = res.data
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        getUserInfo() {
            axios.get(this.url + "getUserInfo", { headers: { token: localStorage.getItem("token") } }).then(res => {
                if (res.status === 200) {
                    this.userID = res.data.user._id
                }

                if (res.status === 401) {
                    console.log("Token geçersiz veya süresi dolmuş.");
                    this.$router.push("/Login");
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        }
    }
}
</script>
