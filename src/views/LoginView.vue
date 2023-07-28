<template>
    <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-9 col-lg-6 col-xl-5">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        class="img-fluid" alt="Sample image">
                                </div>
                                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Giriş Yap</p>
                                    <form>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" class="form-control" placeholder="ornek@datateam.com"
                                                    v-model="User.userEmail" />
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-solid fa-key fa-lg me-3 fa-fw "></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="password" class="form-control" placeholder="******"
                                                    v-model="User.userPassword" />
                                            </div>
                                        </div>

                                        <div class="text-center text-lg-start mt-4 pt-2 d-flex justify-content-end">
                                            <button type="button" class="btn btn-primary"
                                                style="padding-left: 2.5rem; padding-right: 2.5rem;"
                                                @click="userLogin()">Giriş Yap</button>
                                        </div>
                                        <br>
                                        <div class="d-flex justify-content-start mx-4 mb-3 mb-lg-4">
                                            <RouterLink to="/Register" class="badge text-bg-success text-decoration-none">
                                                Henüz bir hesabım yok.</RouterLink>
                                        </div>
                                    </form>
                                    <div class="alert alert-info" role="alert" id="infoAlert" style="display: none;">


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
import axios from "axios"
export default {
    data() {
        return {
            User: {
                userEmail: null,
                userPassword: null
            },
            url: "http://localhost:3000/api/"
        }
    },
    methods: {
        userLogin() {
            let user = {
                userEmail: this.User.userEmail,
                userPassword: this.User.userPassword
            }

            axios.post(this.url + "login", user).then(res => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);
                    this.$router.push("/");
                }
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
