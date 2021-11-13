<template>
  <div class="container">
    <form autocomplete="off" class="form" @submit.prevent="formSubmit">
      <h2 class="mb-4">Личные данные</h2>
      <div class="row mb-4">
        <div class="col-md-4">
          <Input
            v-model="formData.personalData.lastname"
            :validators="[validators.onlyCyrilic, validators.nonEmpty]"
            :validForm.sync="validForm"
            :bus="bus"
            type="text"
            label="Фамилия"
          />
        </div>
        <div class="col-md-4">
          <Input
            v-model="formData.personalData.firstname"
            :validators="[validators.onlyCyrilic, validators.nonEmpty]"
            :validForm.sync="validForm"
            :bus="bus"
            type="text"
            label="Имя"
          />
        </div>
        <div class="col-md-4">
          <Input
            v-model="formData.personalData.middlename"
            :validators="[validators.onlyCyrilic, validators.nonEmpty]"
            :validForm.sync="validForm"
            :bus="bus"
            type="text"
            label="Отчество"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <Datepicker
            v-model="formData.personalData.birthday"
            :validators="[validators.date, validators.nonEmpty]"
            :validForm.sync="validForm"
            :bus="bus"
            label="Дата рождения"
          />
        </div>
        <div class="col-md-4">
          <Input
            v-model="formData.personalData.email"
            :validators="[validators.email, validators.nonEmpty]"
            :validForm.sync="validForm"
            :bus="bus"
            type="text"
            label="Email"
          />
        </div>
        <div class="col-md-4">
          <p>Пол</p>
          <RadioButton
            v-model="formData.personalData.gender"
            name="gender"
            value="male"
            label="Мужской"
          />
          <RadioButton
            v-model="formData.personalData.gender"
            name="gender"
            value="female"
            label="Женский"
          />
        </div>
      </div>
      <h2 class="mb-4 mt-4">Паспортные данные</h2>
      <div class="row mb-4">
        <div class="col-md-4">
          <Autocomplete
            v-model="formData.passportData.citizenship"
            label="Гражданство"
            textValue="nationality"
            :items="citizenshipsAll"
            :validators="[validators.nonEmpty]"
            :validForm.sync="validForm"
            :bus="bus"
          />
        </div>
      </div>
      <div
        v-if="
          formData.passportData.citizenship &&
          formData.passportData.citizenship.id == 8604
        "
      >
        <div class="row">
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.series"
              :validators="[validators.passportSeries, validators.nonEmpty]"
              :validForm.sync="validForm"
              :bus="bus"
              type="number"
              label="Серия паспорта"
            />
          </div>
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.number"
              :validators="[validators.passportNumber, validators.nonEmpty]"
              :validForm.sync="validForm"
              :bus="bus"
              type="number"
              label="Номер паспорта"
            />
          </div>
          <div class="col-md-4">
            <Datepicker
              v-model="formData.passportData.date"
              :validators="[validators.date, validators.nonEmpty]"
              :validForm.sync="validForm"
              :bus="bus"
              label="Дата выдачи"
            />
          </div>
        </div>
      </div>
      <div
        v-else-if="
          formData.passportData.citizenship &&
          formData.passportData.citizenship.id !== 8604
        "
      >
        <div class="row mb-4">
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.foreignСitizen.lastname"
              :validators="[validators.onlyLatin, validators.nonEmpty]"
              :validForm.sync="validForm"
              :bus="bus"
              type="text"
              label="Фамилия на латинице"
            />
          </div>
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.foreignСitizen.firstname"
              :validators="[validators.onlyLatin, validators.nonEmpty]"
              :validForm.sync="validForm"
              :bus="bus"
              type="text"
              label="Имя на латинице"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.foreignСitizen.passportnumber"
              :validators="[validators.passportNumber, validators.nonEmpty]"
              :validForm.sync="validForm"
              :bus="bus"
              type="number"
              label="Номер паспорта"
            />
          </div>
          <div class="col-md-4">
            <Autocomplete
              v-model="formData.passportData.foreignСitizen.countryissue"
              label="Страна выдачи"
              textValue="nationality"
              :validators="[validators.nonEmpty]"
              :items="countryIssue"
              :validForm.sync="validForm"
              :bus="bus"
            />
          </div>
          <div class="col-md-4">
            <Autocomplete
              v-model="formData.passportData.foreignСitizen.passporttype"
              label="Тип паспорта"
              textValue="type"
              :validators="[validators.nonEmpty]"
              :items="passportTypes"
              :validForm.sync="validForm"
              :bus="bus"
            />
          </div>
        </div>
      </div>
      <div class="row changed-name-block">
        <div class="col-md-4">
          <p>Меняли ли фамилию или имя?</p>
          <RadioButton
            v-model="formData.passportData.changedname"
            name="changedname"
            :value="false"
            label="Нет"
          />
          <RadioButton
            v-model="formData.passportData.changedname"
            name="changedname"
            :value="true"
            label="Да"
          />
        </div>
        <div class="col-md-4" v-if="formData.passportData.changedname">
          <Input
            v-model="formData.passportData.previousname.lastname"
            :validators="[validators.onlyCyrilic, validators.nonEmpty]"
            :validForm.sync="validForm"
            :bus="bus"
            type="text"
            label="Предыдущая Фамилия"
          />
        </div>
        <div class="col-md-4" v-if="formData.passportData.changedname">
          <Input
            v-model="formData.passportData.previousname.firstname"
            :validators="[validators.onlyCyrilic, validators.nonEmpty]"
            :validForm.sync="validForm"
            :bus="bus"
            type="text"
            label="Предыдущее Имя"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block">
        Отправить
      </button>
    </form>
  </div>
</template>

<script>
import citizenships from "@/assets/data/citizenships.json";
import passporttypes from "@/assets/data/passport-types.json";
import Input from "../components/Input/Input.vue";
import Datepicker from "@/components/Datepicker/Datepicker.vue";
import RadioButton from "@/components/RadioButton/RadioButton.vue";
import Autocomplete from "@/components/Autocomplete/Autocomplete.vue";
import { validators } from "@/validators";
import { eventBus } from "@/main";

export default {
  data() {
    return {
      bus: eventBus,
      formData: {
        personalData: {
          lastname: "",
          firstname: "",
          middlename: "",
          birthday: "",
          email: "",
          gender: "male",
        },
        passportData: {
          citizenship: null,
          series: "",
          number: "",
          date: "",
          foreignСitizen: {
            firstname: "",
            lastname: "",
            passportnumber: "",
            countryissue: null,
            passporttype: null,
          },
          changedname: false,
          previousname: {
            firstname: "",
            lastname: "",
          },
        },
      },
      validForm: true,
      validators: validators,
      citizenshipsAll: citizenships,
      passportTypes: passporttypes,
      countryIssue: citizenships,
    };
  },
  components: {
    Input,
    RadioButton,
    Autocomplete,
    Datepicker,
  },
  methods: {
    async updateProfileInfo() {
      try {
        console.log("UPDATE API EVENT DONE", this.formData);
        this.$notify({
          group: "foo",
          type: "success",
          title: "OK",
          text: "Всё хорошо",
        });
      } catch (error) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "UPDATE FAILD",
          text: "Подробно: " + error,
        });
      }
    },
    async formSubmit() {
      this.validForm = true;
      this.bus.$emit("submit");
      if (this.validForm) {
        await this.updateProfileInfo();
      } else {
        this.$notify({
          group: "foo",
          type: "warn",
          title: "DATA IS NOT VALID",
          text: "Проверьте данные",
        });
      }
    },
  },
};
</script>

<style scoped>
.radio-inline {
  margin-right: 10px;
}
.changed-name-block {
  margin-top: 25px;
}
p {
  margin-bottom: 0.5rem;
}
.btn {
  margin-top: 25px;
  cursor: pointer;
}
</style>
