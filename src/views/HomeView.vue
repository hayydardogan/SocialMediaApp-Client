<script setup>

import { RouterLink } from 'vue-router';
import  Navbar  from '../components/Navbar.vue';
</script>

<template >
    <Navbar />

    <div class="container mt-5">
        <div class="new-post d-flex justify-content-end mb-3">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#newPostModal">
                <i class="fa-solid fa-plus" style="margin-right: 15px;"></i>Yeni Gönderi
            </button>

            <!-- Modal -->
            <div class="modal fade" id="newPostModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Vazgeç</button>
                            <button type="button" class="btn btn-primary btn-sm" @click="sharePost()">Paylaş</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-light mb-3" v-for="x in posts">
            <div class="card-header d-flex justify-content-between">
                <div style="display: flex; gap: 15px; align-items: center;">
                    <img :src="x.postOwner.userImage" class="rounded-circle" style="width: 30px;" />
                    <span>{{ x.postOwner.userName }} {{ x.postOwner.userSurname }}</span>
                </div>
                <div style="display: flex;align-items: center;">
                    <span><i class="fa-regular fa-clock"></i> {{ x.postDate }}</span>
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
                    <RouterLink :to="{ name: 'postdetailswithid', params: { id: x._id }}" class="btn btn-primary btn-sm text-white"><i
                            class="fa-regular fa-eye"></i> Paylaşımı
                        gör </RouterLink>
                </div>
            </div>
        </div>

    </div>
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
            posts: {}
        }
    },
    created() {
        this.getPosts();
    },
    methods: {
        sharePost() {
            this.newPost.postOwner = this.$refs.Navbar.activeUser.userID;
            console.log(this.newPost.postOwner);

            // axios.post(this.url + "addNewPost", this.newPost).then(res => {
            //     if(res.status === 200){
            //         console.log(res.data.message);
            //     }
            // }).catch(err => {
            //     console.log("There is an error : " + err.message);
            // })
        },
        getPosts() {
            axios.get(this.url + "getPosts").then(res => {
                if (res.status === 200) {
                    this.posts = res.data
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        }
    }
}
</script>
