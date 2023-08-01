<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<template>
    <Navbar />
    <section class="h-100 gradient-custom-2">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col ">
                    <div class="card">
                        <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
                            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                    alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                                    style="width: 150px; z-index: 1">
                                <button type="button" class="btn btn-outline-success" data-mdb-ripple-color="dark"
                                    style="z-index: 1;">
                                    Ayarlar
                                </button>
                            </div>
                            <div class="ms-3" style="margin-top: 130px;">
                                <h5>{{ userInfo.userName }} {{ userInfo.userSurname }}</h5>
                                <p>{{ userInfo.userNick }}</p>
                            </div>
                        </div>
                        <div class="p-4 text-black" style="background-color: #f8f9fa;">
                            <div class="d-flex justify-content-end text-center py-1">
                                <div>
                                    <p class="mb-1 h5">16</p>
                                    <p class="small text-muted mb-0">Paylaşım</p>
                                </div>
                                <div class="px-3">
                                    <p class="mb-1 h5">5</p>
                                    <p class="small text-muted mb-0">Takipçi</p>
                                </div>
                                <div>
                                    <p class="mb-1 h5">8</p>
                                    <p class="small text-muted mb-0">Takip Edilen</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-4 text-black">

                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <p class="lead fw-normal mb-0">Son paylaşımlar</p>
                            </div>
                            <div class="row g-2">
                                <div class="card bg-light mb-3">
                                    <div class="card-header d-flex justify-content-between">
                                        <div style="display: flex; gap: 15px; align-items: center;">
                                            <img class="rounded-circle" style="width: 30px;" />
                                            <span>Test User</span>
                                        </div>
                                        <div style="display: flex;align-items: center;">
                                            <span><i class="fa-regular fa-clock"></i> 01.08.2023</span>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">Test içerik</p>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between">
                                        <div class="post-info d-flex" style="gap: 15px; align-items: center;">
                                            <span><i class="fa-solid fa-heart"></i> 17</span>
                                            <span><i class="fa-solid fa-comment"></i> 5</span>
                                        </div>
                                        <div class="show-post">
                                            <RouterLink to="" class="btn btn-primary btn-sm text-white"><i
                                                    class="fa-regular fa-eye"></i>
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
                userImage: null
            },
            url: "http://localhost:3000/api/",
        }
    },
    methods: {
        getUserInfo() {
            let nick = this.$route.params.nick;
            axios.get(this.url + "getUserInfoByNick/" + nick).then(res => {
                this.userInfo.userName = res.data.user.userName,
                    this.userInfo.userSurname = res.data.user.userSurname,
                    this.userInfo.userEmail = res.data.user.userEmail,
                    this.userInfo.userNick = res.data.user.userNick,
                    this.userInfo.userImage = res.data.user.userImage
            }).catch(err => {
                console.log("There is an error  :" + err.message);
            })
        }
    },
    created() {
        this.getUserInfo();
    }
}
</script>