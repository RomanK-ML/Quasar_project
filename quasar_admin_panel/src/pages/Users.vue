<template>
  <div class="body-container">
    <q-table
      ref="UsersTable"
      class="table-body"
      flat bordered
      :columns="columns"
      :rows="rows"
      row-key="id"
      :raw="true"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :pagination="pagination"
      :rows-per-page="pagination.rowsPerPage"
      @update:rows-per-page="this.pagination.rowsPerPage = $event"
      :rows-per-page-options="pagination.rowsPerPageOptions"
      :rows-per-page-label="'Количество записей на странице'"
    >
      <template v-slot:body-cell-action="props">
        <q-btn color="info" label="Редактировать" @click="openModalEditUser(props.row)"></q-btn>
        <q-btn color="negative" label="Удалить" @click="deleteRow(props.row.id)"></q-btn>
      </template>


      <template v-slot:top>
        <div class="table-top">
          <!--        <div class="tableHeader-container">-->
          <!--          <div>-->
          <!--            <q-select-->
          <!--              class="header-label"-->
          <!--              v-model="pagination.rowsPerPage"-->
          <!--              :options="pagination.rowsPerPageOptions"-->
          <!--              label="Количество записей на странице"-->
          <!--            />-->
          <!--          </div>-->
          <!--        </div>-->
          <div class="tableHeader-container">
            <q-btn color="positive" label="Добавить" @click="openModalAddUser"/>
            <q-btn :disabled="this.selected.length === 0" color="negative" label="Удалить выделенное"
                   @click="deleteSelectedRow"></q-btn>
          </div>
          <div class="tableHeader-container">
            <div style="text-align: right">
              <q-input @change="modalSearchTextUpdate" label="Поиск:" class="header-label" borderless dense
                       :debounce=300
                       v-model="modalSearch"/>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:pagination="scope">
        <div class="q-table__control">
          <q-btn
            icon="chevron_left"
            @click="scope.prevPage"
            :disable="scope.isFirstPage"
          />
        </div>

        <div class="q-table__control">
          <q-btn
            icon="chevron_right"
            @click="scope.nextPage"
            :disable="scope.isLastPage"
          />
        </div>
      </template>

    </q-table>
    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>
    <q-dialog v-model="modalEditUserShown" persistent>
      <q-card class="modalEditUser fade-modal show-modal">
        <q-card-section class="modalEditUser-section">
          <q-form>
            <div class="modal-edit-user-header">
              <h5 class="modal-title">{{ modalHeaderTitle }}</h5>
              <button class="modal-btn-close" @click.prevent="modalEditUserClose"/>
            </div>
            <div class="modal-edit-user-body">
              <q-input style="opacity: 0; position: absolute" type="hidden" v-model="modalUserId"/>
              <div class="form-input-container"
                   :class="{'form-input-container-valid': nameInputIsValid, 'form-input-container-invalid' : !nameInputIsValid}">
                <label class="input-label">Имя</label>
                <input type="text" class="modal-edit-user-input" v-model="modalName" required/>
                <div class="valid-label">Looks good!</div>
              </div>
              <div class="form-input-container"
                   :class="{'form-input-container-valid': emailInputIsValid, 'form-input-container-invalid' : !emailInputIsValid}">
                <label class="input-label">Email</label>
                <input type="text" class="modal-edit-user-input" v-model="modalEmail" required/>
                <div class="valid-label">Looks good!</div>
              </div>
              <div class="form-input-container"
                   :class="{'form-input-container-valid': phoneInputIsValid, 'form-input-container-invalid' : !phoneInputIsValid}">
                <label class="input-label">Телефон</label>
                <input type="text" class="modal-edit-user-input" v-model="modalPhone" required/>
                <div class="valid-label">Looks good!</div>
              </div>
              <div class="form-input-container"
                   :class="{'form-input-container-valid': sipInputIsValid, 'form-input-container-invalid' : !sipInputIsValid}">
                <label class="input-label">Sip</label>
                <input type="text" class="modal-edit-user-input" v-model="modalSip" required/>
                <div class="valid-label">Looks good!</div>
              </div>
              <div class="form-input-container"
                   :class="{'form-input-container-valid': passwordInputIsValid, 'form-input-container-invalid' : !passwordInputIsValid}">
                <label class="input-label">Пароль</label>
                <input type="text" class="modal-edit-user-input" v-model="modalPassword" required/>
                <div class="valid-label">Looks good!</div>
              </div>
              <div class="form-input-container"
                   :class="{'form-input-container-valid': roleInputIsValid, 'form-input-container-invalid' : !roleInputIsValid}">
                <label class="input-label">Роль</label>
                <select class="modal-edit-user-input" v-model="modalRole" required>
                  <option>admin</option>
                  <option>subadmin</option>
                  <option>user</option>
                </select>
                <div class="valid-label">Looks good!</div>
              </div>
              <!--            <q-input class="modal-edit-user-input" v-model="modalName" label="Имя"/>-->
              <!--            <q-input class="modal-edit-user-input" v-model="modalEmail" label="Email"/>-->
              <!--            <q-input class="modal-edit-user-input" v-model="modalPhone" label="Телефон"/>-->
              <!--            <q-input class="modal-edit-user-input" v-model="modalPassword" label="Пароль"/>-->
              <!--            <q-input class="modal-edit-user-input" v-model="modalRole" label="Роль"/>-->
            </div>
            <div class="modal-edit-user-footer">
              <q-btn @click.prevent="modalEditUserClose" class="modal-footer-close" type="close" label="Закрыть"/>
              <q-btn v-if="!modalAddOrEditUser" @click.prevent="modalEditUserSubmit" class="modal-footer-save" type="submit" label="Сохранить"/>
              <q-btn v-if="modalAddOrEditUser" @click.prevent="modalAddUserSubmit" class="modal-footer-save" type="submit" label="Добавить"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import db from "src/db";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Users',
  data() {
    return {
      modalUserId: 0,
      modalSip: '',
      modalName: '',
      modalEmail: '',
      modalPhone: '',
      modalPassword: '',
      modalRole: '',
      modalSearch: '',
      searchMinCharacters: 0,
      modalEditUserShown: false,
      selectedString: '',
      modalHeaderTitle: '',
      nameInputIsValid: true,
      emailInputIsValid: true,
      phoneInputIsValid: true,
      sipInputIsValid: true,
      passwordInputIsValid: true,
      roleInputIsValid: true,
      modalAddOrEditUser: false,
      pagination: {
        align: "left",
        sortBy: 'id',
        descending: false,
        page: 2,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30, 40],
        totalRows: 20,
      },
      columns: [
        {
          name: 'id', // название колонки
          label: 'Id',
          field: 'id', // поле данных, на которое ссылается колонка
          align: 'left', // выравнивание текста в колонке
          sortable: true, // возможность сортировки по колонке
          required: true, //(необязательно) столбец всегда будет видимым
        },
        {
          name: 'userId',
          label: 'UserId',
          field: 'userId',
          align: 'left',
          sortable: false,
          required: true,
        },
        {
          name: 'sip',
          label: 'Sip',
          field: 'sip',
          align: 'left',
          sortable: true,
          required: false,
        },

        {
          name: "name",
          label: 'Имя',
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "email",
          label: 'Email',
          field: "email",
          align: "left",
          sortable: true,
        },
        {
          name: "phone",
          label: 'Телефон',
          field: "phone",
          align: "left",
          sortable: true,
        },
        {
          name: "password",
          label: 'Пароль',
          field: "password",
          align: "left",
          sortable: true,
        },
        {
          name: "role",
          label: 'Роль',
          field: "role",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: 'Action',
          field: "id",
          align: "left",
          sortable: false,
          required: true,
        },
      ],
      rows: [],
      selected: [],
    }
  },
  computed: {
    maxPages() {
      return Math.ceil(this.pagination.totalRows / this.pagination.rowsPerPage)
    },
    paginationLabel() {
      const {from, to, total} = this.$q.pagination.normalize(this.pagination, this.rows.length)
      return `Showing ${from}-${to} of ${total}`
    }
  },
  mounted() {
    db.updateDb()
    this.rows = db.usersList
    this.pagination.totalRows = this.rows.length
  },
  watch: {
    selected: {
      handler() {
        this.selectedString = this.selected.length === 0 ? '' : `${this.selected.length} пользовател${this.selected.length > 1 ? (this.selected.length > 4 ? 'ей' : 'я') : 'ь'} выбран${this.selected.length > 1 ? 'о' : ''} из ${this.rows.length}`;
      },
      immediate: true,
    },
  },
  methods: {
    getSelectedString() {
      return this.selectedString;
    },
    deleteItemForSelectedList(id) {
      console.log('ID: ' + id);
      if (this.selected.length > 0) {
        for (let i = 0; i < this.selected.length; i++) {
          if (this.selected[i].id === id) {
            this.selected.splice(i, 1);
            break;
          }
        }
      }
    },
    deleteRow(id) {
      console.log('delete')
      console.log(id)
      console.log(db.usersList)
      db.deleteUsers([id])
      this.deleteItemForSelectedList(id)
      console.log(db.usersList)
    },
    deleteSelectedRow() {
      const idList = this.selected.map(item => item.id);
      if (idList.length > 0) {
        db.deleteUsers(idList)
        this.selected = []
      }
    },
    openModalAddUser(){
      this.modalAddOrEditUser = true;
      this.modalHeaderTitle = 'Добавить пользователя'
      this.modalUserId = 0
      this.modalSip = ''
      this.modalName = ''
      this.modalEmail = ''
      this.modalPhone = ''
      this.modalPassword = ''
      this.modalRole = 'user'
      this.modalEditUserShown = true;
    },
    openModalEditUser(rowItem) {
      if (rowItem) {
        this.modalAddOrEditUser = false;
        this.modalUserId = rowItem.userId
        this.modalSip = rowItem.sip
        this.modalName = rowItem.name
        this.modalEmail = rowItem.email
        this.modalPhone = rowItem.phone
        this.modalPassword = rowItem.password
        this.modalRole = rowItem.role
        this.modalHeaderTitle = 'Редактировать пользователя'
        this.modalEditUserShown = true;
      }
      console.log('modalUserId: ' + this.modalUserId)
      console.log('modalSip: ' + this.modalSip)
      console.log('modalName: ' + this.modalName)
      console.log('modalEmail: ' + this.modalEmail)
      console.log('modalPhone: ' + this.modalPhone)
      console.log('modalPassword: ' + this.modalPassword)
      console.log('modalRole: ' + this.modalRole)
    },
    modalAddUserSubmit(){

      db.addUser(this.modalSip, this.modalName, this.modalEmail, this.modalPhone, this.modalPassword, this.modalRole)
      this.modalEditUserShown = false;
    },
    modalEditUserSubmit() {
      db.editUser(this.modalUserId, this.modalSip, this.modalName, this.modalEmail, this.modalPhone, this.modalPassword, this.modalRole)
      console.log('modalId: ' + this.modalUserId)
      console.log('modalSip: ' + this.modalSip)
      console.log('modalName: ' + this.modalName)
      console.log('modalEmail: ' + this.modalEmail)
      console.log('modalPhone: ' + this.modalPhone)
      console.log('modalPassword: ' + this.modalPassword)
      console.log('modalRole: ' + this.modalRole)
      this.modalEditUserShown = false;
    },
    modalEditUserClose(){
      this.modalEditUserShown = false;
    },
    modalSearchTextUpdate() {
      console.log('modalSearchTextUpdate')
      if (this.modalSearch.length >= this.searchMinCharacters) {
        db.searchUsers(this.modalSearch)
      }
      this.rows = db.usersList
      this.pagination.totalRows = this.rows.length;
    }
  }
}
</script>

<style scoped>
.body-container{
  --bs-card-spacer-y: 1.25rem;
  --bs-card-spacer-x: 1.25rem;
  --bs-card-title-spacer-y: 0.5rem;
  --bs-card-border-width: 0;
  --bs-card-border-color: transparent;
  --bs-card-border-radius: 0.25rem;
  --bs-card-inner-border-radius: 0.25rem;
  --bs-card-cap-padding-y: 1rem;
  --bs-card-cap-padding-x: 1.25rem;
  --bs-card-cap-bg: #222e3c;
  --bs-card-bg: #222e3c;
  --bs-card-img-overlay-padding: 1rem;
  --bs-card-group-margin: 12px;
  word-wrap: break-word;
  background-clip: border-box;
  background-color: #222e3c;
  border: 0;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
  box-shadow: 0 0 .875rem 0 rgba(34,46,60,.05);
  margin-bottom: 24px;
}

.table-body {
  flex: 1 1 auto;
  padding: 1.25rem;
  background-color: #222e3c;
  color: #bdc0c5;
}

.table-top {
  width: 100%;
  --bs-gutter-x: 12px;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
}

.tableHeader-container {
  flex-shrink: 0;
  margin-top: 0;
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
}

@media (min-width: 576px) {
  .tableHeader-container {
    flex: 0 0 auto;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .tableHeader-container {
    flex: 0 0 auto;
    width: 50%;
  }
}

.header-label {
  display: inline-block;
  font-weight: 400;
  text-align: left;
  white-space: nowrap;
}

.header-label input, .header-label i, .q-field__native input {
  color: #bdc0c5;
}

@media (min-width: 576px) {
  .modal-dialog {
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
  }
}


.modalEditUser {
  margin: 1.75rem;
  pointer-events: none;
  position: relative;
  width: 600px;
}
.show-modal .modalEditUser{
  transform: none;
}
.fade-modal .modalEditUser{
  transform: translateY(-50px);
  transition: transform .25s ease-out;
}
.modalEditUser-section{
  background-clip: padding-box;
  background-color: #222e3c;
  border: 0 hsla(0,0%,100%,.175);
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  outline: 0;
  pointer-events: auto;
  position: relative;
  width: 100%;
}

.modal-edit-user-header {
  align-items: center;
  border-bottom: 1px solid #4e5863;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 1rem;
  direction: ltr;
}
.modal-title{
  line-height: 1.5;
  margin-bottom: 0;
  color: #fff;
  font-weight: 400;
  margin-top: 0;
  font-size: .875rem;
}
.modal-btn-close{
  margin: calc(1rem*-.5) calc(1rem*-.5) calc(1rem*-.5) auto;
  padding: calc(1rem*.5) calc(1rem*.5);
  background: transparent url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3E%3Cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E") 50%/1em auto no-repeat;
  border: 0;
  border-radius: .2rem;
  box-sizing: content-box;
  color: #fff;
  height: 1em;
  opacity: .5;
  width: 1em;
  cursor: pointer;
}
.modal-btn-close:hover{
  color: #fff;
  opacity: .75;
  text-decoration: none;
}

.modal-edit-user-body {
  flex: 1 1 auto;
  position: relative;
  margin: 1rem !important;
}
.form-input-container{
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: calc(1rem*.5);
  padding-right: calc(1rem*.5);
  margin-top: 1rem;
}

.form-input-container .input-label{
  margin-bottom: .5rem;
  display: inline-block;
  direction:ltr;
}
.form-input-container .modal-edit-user-input{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-clip: padding-box;
  background-color: #222e3c;
  border: 1px solid #7a828a;
  border-radius: .2rem;
  color: #bdc0c5;
  display: block;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: .3rem .85rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  width: 100%;
  font-family: inherit;
  margin: 0;
  direction: ltr;
}
.form-input-container .modal-edit-user-input:focus{
  background-color: #222e3c;
  border-color: #9dbeee;
  box-shadow: 0 0 0 .2rem rgba(59,125,221,.25);
  color: #bdc0c5;
  outline: 0;
}
.form-input-container-valid .modal-edit-user-input{
  border-color: #1cbb8c;
}
.form-input-container-invalid .modal-edit-user-input{
  border-color: #dc3545;
}
.form-input-container .valid-label{
  color: #1cbb8c;
  display: none;
  font-size: 80%;
  margin-top: .25rem;
  width: 100%;
}
.form-input-container-valid .valid-label, .form-input-container-invalid .valid-label{
  display: block;
}
.form-input-container-invalid .valid-label{
  color: #dc3545;
  display: none;
  font-size: 80%;
  margin-top: .25rem;
  width: 100%;
}


.modal-edit-user-footer {
  align-items: center;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  border-top: 1px solid #4e5863;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: calc(1rem - 0.5rem * .5);
  direction: ltr;
}

.modal-footer-close {
  background-color: #62686e;
  border-color: #5c6268;
  color: #fff;
  cursor: pointer;
  margin: calc(0.5rem * .5);
}
.modal-footer-close:hover{
  background-color: #62686e;
  border-color: #62686e;
  color: #fff;
}

.modal-footer-save {
  background-color: #3b7ddd;
  border: 1px solid #3b7ddd;
  border-radius: 0.2rem;
  cursor: pointer;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 0.3rem 0.85rem;
  text-align: center;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  -webkit-user-select: none;
  -webkit-appearance: button;
  -moz-user-select: none;
  user-select: none;
  vertical-align: middle;
  text-transform: none;
  margin: calc(0.5rem * .5);
}
.modal-footer-save:hover{
  background-color: #326abc;
  border-color: #2f64b1;
  color: #fff;
}
</style>
