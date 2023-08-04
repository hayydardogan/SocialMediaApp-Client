<script setup>
import Navbar from '../components/Navbar.vue'
import moment from 'moment'
</script>

<style>
.card {
    box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
}

.avatar.sm {
    width: 2.25rem;
    height: 2.25rem;
    font-size: .818125rem;
}

.table-nowrap .table td,
.table-nowrap .table th {
    white-space: nowrap;
}

.table>:not(caption)>*>* {
    padding: 0.75rem 1.25rem;
    border-bottom-width: 1px;
}

table th {
    font-weight: 600;
    background-color: #eeecfd !important;
}
</style>

<template>
    <Navbar />


    <div class="container mt-5">
        <div class="row">
            <div class="col-12 mb-3 mb-lg-5">
                <div class="overflow-hidden card table-nowrap table-card">
                    <div class="card-header d-flex justify-content-center align-items-center p-3">
                        <h5 class="mb-0"><i class="fa-solid fa-bell"></i> BİLDİRİMLER</h5>
                    </div>
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead class="small text-uppercase bg-body text-muted">
                                <tr>
                                    <th>BİLDİRİM</th>
                                    <th>TARİH</th>
                                    <th class="text-end">İŞLEMLER</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="notifications.length > 0" v-for="x in notifications" class="align-middle">
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <RouterLink :to="'/Profile/' + x.notificationSender.userNick">
                                                <img :src="x.notificationSender.userImage"
                                                    class="avatar sm rounded-pill me-3 flex-shrink-0">
                                            </RouterLink>
                                            <div>
                                                <RouterLink :to="'/Profile/' + x.notificationSender.userNick"
                                                    class="h6 mb-0 lh-1 text-decoration-none">{{
                                                        x.notificationSender.userName }} {{ x.notificationSender.userSurname }}
                                                </RouterLink>
                                                {{ x.notificationContent }}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{{ moment(x.notificationDate).format("DD/MM/YYYY HH:mm") }}</td>
                                    <td class="text-end">
                                        <div class="drodown">
                                            <a data-bs-toggle="dropdown" href="#" class="btn p-1" aria-expanded="false">
                                                <i class="fa fa-bars" aria-hidden="true"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-end" style="">
                                                <a @click="deleteNotification(x._id)" style="cursor: pointer;"
                                                    class="dropdown-item"><i class="fa-solid fa-trash"></i>
                                                    Bildirimi Sil</a>
                                                <RouterLink v-if="x.isPostNotification" class="dropdown-item"
                                                    :to="'/PostDetails/' + x.postID"><i class="fa-solid fa-eye"></i> Gönderiyi Gör</RouterLink>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else>
                                    <td>Görüntülenecek bir bildirim yok.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            notifications: {},
            url: "http://localhost:3000/api/",
            activeUser: {
                userName: null,
                userSurname: null,
                userID: null,
                userNick: null
            }
        }
    },
    methods: {
        getUserInfo() {

            axios.get(this.url + "getUserInfo", { headers: { token: localStorage.getItem("token") } }).then(res => {
                if (res.status === 200) {
                    this.activeUser.userName = res.data.user.userName
                    this.activeUser.userSurname = res.data.user.userSurname
                    this.activeUser.userID = res.data.user._id,
                        this.activeUser.userNick = res.data.user.userNick
                    this.getNotifications();
                }

                if (res.status === 401) {
                    console.log("Token geçersiz veya süresi dolmuş.");
                    this.$router.push("/Login");
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        getNotifications() {

            axios.get(this.url + "getNotifications" + "/" + this.activeUser.userID).then(res => {
                this.notifications = res.data.notifications

            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        deleteNotification(ntf_id) {
            axios.put(this.url + "deleteNotification" + "/" + ntf_id).then(res => {
                if(res.status === 200) {
                    this.getNotifications();
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        }
    },
    created() {
        this.getUserInfo();
    }
}
</script>