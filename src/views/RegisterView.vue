<template>
    <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Kayıt Ol</p>

                                    <form class="mx-1 mx-md-4">

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" class="form-control" placeholder="Ad"
                                                    v-model="User.userName" />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" class="form-control" placeholder="Soyad"
                                                    v-model="User.userSurname" />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="email" class="form-control" placeholder="E-Posta"
                                                    v-model="User.userEmail" />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-solid fa-at fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="email" class="form-control" placeholder="Kullanıcı Adı"
                                                    v-model="User.userNick" />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="password" class="form-control" placeholder="******"
                                                    v-model="User.userPassword" />
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-end">
                                            <button type="button" class="btn btn-primary" @click="userRegister()">Kayıt
                                                Ol</button>

                                        </div>
                                        <br>
                                        <div class="d-flex justify-content-start mx-4 mb-3 mb-lg-4">
                                            <RouterLink to="/Login" class="badge text-bg-success text-decoration-none">Zaten
                                                bir hesabım var.</RouterLink>
                                        </div>

                                    </form>
                                    <div class="alert alert-info" role="alert" id="infoAlert" style="display: none;">


                                    </div>
                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid" alt="Sample image">

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

import axios from "axios";
export default {
    data() {
        return {
            User: {
                userName: null,
                userSurname: null,
                userEmail: null,
                userNick: null,
                userPassword: null
            },
            url: "http://localhost:3000/api/"
        }
    },
    methods: {
        userRegister() {
            let newUser = {
                userName: this.User.userName,
                userSurname: this.User.userSurname,
                userEmail: this.User.userEmail,
                userNick: this.User.userNick,
                userPassword: this.User.userPassword
            }

            axios.post(this.url + "addNewUser", newUser).then(res => {
                let item = document.getElementById("infoAlert");
                item.innerHTML = '<i class="fa-solid fa-circle-info" style="margin-right: 15px"></i>' + res.data.message;
                item.style.display = "block";

            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
            

        }
    },
    created() {
        if (localStorage.getItem("token") !== null) {
            this.$router.push("/");
        }
    }
}
</script>