<template>
    <div class="container mt-5">
        <h1 class="text-center">Users Lists</h1>
        <button type="button" class="btn btn-success mb-3 ms-auto d-block" @click="openModal">Create</button>
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>
                        <a href="#" @click.prevent="getUserData(user.id)" class="btn btn-info me-2">Edit</a>
                        <a href="#" @click.prevent="deleteUser(user.id)" class="btn btn-danger">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Modal -->
        <div class="modal fade" ref="exampleModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-3 p-3">
                        <div class="mb-3 row">
                            <label for="email" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" v-model="user.name" class="form-control" id="name">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="email" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="text" v-model="user.email" class="form-control" id="email">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="phone" class="col-sm-2 col-form-label">Phone</label>
                            <div class="col-sm-10">
                                <input type="text" v-model="user.phone" class="form-control" id="phone">
                            </div>
                        </div>
                        <button v-if="!user.id" type="submit" @click.prevent="sumbit" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Save</button>
                        <button v-if="user.id" type="submit" @click.prevent="updateUser(user.id)" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Update</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Modal } from 'bootstrap';
import axios from "axios";
import { IsUser } from '@/types/user';
import { UserModule } from '@/store/modules/user';

@Component({
  name: 'HomeView',
})
export default class Home extends Vue {
    public users: IsUser[] = [];
    public user: IsUser = {
        name: "",
        email: "",
        phone: 0
    };
    public modal: any;

    created(){
        this.getUsers();
    }

    private async getUsers(){
        await UserModule.getUsers();
        this.users = UserModule.users;
    }

    public openModal(){
        this.user = {
            name: "",
            email: "",
            phone: 0
        };

        this.modal = new Modal(document.getElementById('exampleModal')!, {
            keyboard: false
        });
        this.modal.show();
    }

    private sumbit(){
        UserModule.submitUser(this.user).then((response) => {
            this.getUsers();
            this.modal.hide();
            console.log(response.data.message);
        }).catch((error) => {
            console.log(error);
        });
    }
    // get a  user by id for update
    public getUserData(id: number){
        this.openModal();
        this.modal.show();
        UserModule.getUserData(id).then((response) => {
            this.user = response.data.user;
        }).catch((error) => {
            console.log(error);
        });
    }
    public updateUser(id: number){
        UserModule.updateUser(this.user).then((response) => {
            console.log(response.data.message);
            this.getUsers();
            this.modal.hide();
        }).catch((error) => {
            console.log(error);
        });
    }
    private deleteUser(id: number){
        UserModule.deleteUser(id).then((response) => {
            console.log(response.data.message);
            this.getUsers();
        }).catch((error) => {
            console.log(error);
        });
    }
}

</script>
