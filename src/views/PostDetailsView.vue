<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<template>
    <Navbar />
    <div class="container mt-5">
        <div class="card bg-light mb-3">
            <div class="card-header d-flex justify-content-between">
                <div style="display: flex; gap: 15px; align-items: center;">
                    <img :src="postDetails.postOwnerImage" class="rounded-circle" style="width: 30px;" />
                    <span>{{ postDetails.postOwnerName }} {{ postDetails.postOwnerSurname }}</span>
                </div>
                <div style="display: flex;align-items: center;">
                    <span><i class="fa-regular fa-clock"></i> {{ postDetails.postDate }}</span>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text">{{ postDetails.postContent }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <div class="post-info d-flex" style="gap: 15px; align-items: center;">
                    <span><i class="fa-solid fa-heart"></i> 17</span>
                    <span><i class="fa-solid fa-comment"></i> 5</span>
                </div>
                <div class="show-post">
                    <button class="btn btn-primary btn-sm text-white"><i class="fa-regular fa-eye"></i> Paylaşımı
                        gör</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    
    data() {
        return {
            postID: this.$route.params.id,
            postDetails: {
                postOwnerName: null,
                postOwnerSurname: null,
                postOwnerImage: null,
                postDate: null,
                postContent: null
            },
            url: "http://localhost:3000/api/"
        }
    },
    created() {
        this.getPostInfo();
    },
    methods:{
        getPostInfo(){
            axios.get(this.url + "getPostInfo" + "/" + this.postID).then(
                res => {
                    if(res.status === 200 ){
                        this.postDetails.postOwnerName = res.data.post[0].postOwner.userName,
                        this.postDetails.postOwnerSurname = res.data.post[0].postOwner.userSurname,
                        this.postDetails.postOwnerImage = res.data.post[0].postOwner.userImage
                        this.postDetails.postContent = res.data.post[0].postContent,
                        this.postDetails.postDate = res.data.post[0].postDate
                    }
                }
            ).catch(err => {
                console.log("There is an error." + err.message);
            })
        }
    }
}

</script>